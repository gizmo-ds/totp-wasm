<script setup lang="ts">
import { watch, computed } from "vue";
import { darkTheme } from "naive-ui";
import { UseDark } from "@vueuse/components";
import { init, hotp, totp, steam, wasmUrl } from "./totp";
import { generateSecret, totpSearchParams } from "./utils";
import QrcodeVue from "qrcode.vue";

const searchParams = new URL(location.href).searchParams

let initialized = $ref(false);
let secret = $ref(searchParams.get("secret") ?? generateSecret());
let hotp_counter = $ref(123456);
let period = $ref(30);
let digits = $ref(6);

let hotp_value = $ref("000000");
let totp_value = $ref("000000");
let steam_value = $ref("00000");

const timestamp = () => Math.round(new Date().getTime() / 1000);

function updateValue() {
  if (!initialized) return;
  const t = timestamp();
  hotp_value = hotp(
    new TextEncoder().encode(secret),
    BigInt(hotp_counter),
    digits
  );
  totp_value = totp(secret, t, digits, period);
  steam_value = steam(secret, t);
}

init(wasmUrl).then(() => {
  initialized = true;
  updateValue();
});

let tr = $ref(period - (timestamp() % period));
setInterval(() => (tr = period - (timestamp() % period)), 1000);

watch($$(tr), (v) => {
  if (v === period) updateValue();
});
watch($$(hotp_counter), () => updateValue());
watch($$(secret), () => updateValue());
watch($$(digits), () => updateValue());
watch($$(period), () => updateValue());

let issuer = $ref("Example");
let account = $ref("alice@google.com");
const totp_uri = computed(() => {
  const u = new URL(`otpauth://totp/${encodeURIComponent(issuer)}:${account}`);
  u.search = totpSearchParams({
    secret,
    algorithm: "SHA1",
    digits: digits.toString(),
    period: period.toString(),
    issuer,
  });
  return u.toString();
});
</script>

<template>
  <use-dark v-slot="{ isDark }">
    <n-config-provider
      :theme="isDark ? darkTheme : undefined"
      :style="{ colorScheme: isDark ? 'dark' : 'light' }"
    >
      <n-notification-provider placement="bottom-right">
        <n-layout embedded class="layout" style="height: 100vh">
          <GitHubCorners />

          <h1>
            <img src="/favicon.png" alt="logo" />
            <span>totp-wasm</span>
          </h1>

          <div class="content">
            <n-space vertical>
              <n-input-group>
                <n-input-group-label style="width: 120px">
                  Secret Key
                </n-input-group-label>
                <n-input v-model:value="secret" type="text" clearable />
                <n-button type="primary" @click="secret = generateSecret()">
                  Generate
                </n-button>
              </n-input-group>

              <n-input-group>
                <n-input-group-label style="width: 120px">
                  Digits
                </n-input-group-label>
                <n-input-number
                  v-model:value="digits"
                  :max="9"
                  style="width: 100%"
                />
              </n-input-group>

              <n-input-group>
                <n-input-group-label style="width: 120px">
                  Period
                </n-input-group-label>
                <n-input-number v-model:value="period" style="width: 100%">
                  <template #suffix> sec </template>
                </n-input-number>
              </n-input-group>

              <n-input-group>
                <n-input-group-label style="width: 120px">
                  HOTP Counter
                </n-input-group-label>
                <n-input-number
                  v-model:value="hotp_counter"
                  :show-button="false"
                  style="width: 100%"
                />
              </n-input-group>
            </n-space>

            <n-divider />

            <n-space vertical>
              <n-progress
                type="line"
                :percentage="Math.round((tr / period) * 100)"
              >
                {{ tr }} sec
              </n-progress>

              <n-input-group>
                <n-input-group-label style="width: 120px">
                  HOTP Value
                </n-input-group-label>
                <n-input v-model:value="hotp_value" type="text" readonly />
              </n-input-group>

              <n-input-group>
                <n-input-group-label style="width: 120px">
                  TOTP Value
                </n-input-group-label>
                <n-input v-model:value="totp_value" type="text" readonly />
              </n-input-group>

              <n-input-group>
                <n-input-group-label style="width: 120px">
                  Steam Value
                </n-input-group-label>
                <n-input v-model:value="steam_value" type="text" readonly />
              </n-input-group>
            </n-space>

            <n-divider />

            <n-space vertical>
              <n-input-group>
                <n-input-group-label style="width: 120px">
                  Issuer
                </n-input-group-label>
                <n-input v-model:value="issuer" type="text" clearable />
              </n-input-group>

              <n-input-group>
                <n-input-group-label style="width: 120px">
                  Account
                </n-input-group-label>
                <n-input v-model:value="account" type="text" clearable />
              </n-input-group>

              <div class="qrcode">
                <qrcode-vue
                  :value="totp_uri"
                  render-as="svg"
                  :size="300"
                  :margin="3"
                  level="L"
                />
              </div>
            </n-space>
          </div>
        </n-layout>
      </n-notification-provider>
    </n-config-provider>
  </use-dark>
</template>

<style scoped lang="scss">
h1 {
  text-align: center;
  * {
    vertical-align: middle;
  }
  img {
    height: 30px;
    border-radius: 4px;
    margin-right: 8px;
  }
}
.content {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 8px;
  .qrcode {
    padding-top: 8px;
  }
}
</style>
