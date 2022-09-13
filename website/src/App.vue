<script setup lang="ts">
import { watch } from "vue";
import { darkTheme } from "naive-ui";
import { UseDark } from "@vueuse/components";
import init, { hotp, totp, steam } from "./totp/totp_wasm";
import wasmUrl from "./totp/totp_wasm_bg.wasm?url";

let initialized = $ref(false);
let secret = $ref("GM4VC2CQN5UGS33ZJJVWYUSFMQ4HOQJW");
let hotp_counter = $ref(123456);
let tc = $ref(30);

let hotp_value = $ref("000000");
let totp_value = $ref("000000");
let steam_value = $ref("00000");

const timestamp = () => Math.round(new Date().getTime() / 1000);

function updateValue() {
  if (!initialized) return;
  const t = timestamp();
  hotp_value = hotp(new TextEncoder().encode(secret), BigInt(hotp_counter), 6);
  totp_value = totp(secret, t, 6, tc);
  steam_value = steam(secret, t);
}

init(wasmUrl).then(() => {
  initialized = true;
  updateValue();
});

let tr = $ref(tc - (timestamp() % tc));
setInterval(() => (tr = tc - (timestamp() % tc)), 1000);

watch($$(tr), (v) => {
  if (v === tc) updateValue();
});
watch($$(hotp_counter), () => {
  updateValue();
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
                <n-input-group-label>Secret Key</n-input-group-label>
                <n-input v-model:value="secret" type="text" clearable />
              </n-input-group>

              <n-input-group>
                <n-input-group-label>HOTP Counter</n-input-group-label>
                <n-input-number
                  v-model:value="hotp_counter"
                  :show-button="false"
                  style="width: 100%"
                />
              </n-input-group>

              <n-input-group>
                <n-input-group-label>TC</n-input-group-label>
                <n-input-number v-model:value="tc" style="width: 100%">
                  <template #suffix> sec </template>
                </n-input-number>
              </n-input-group>
            </n-space>

            <n-divider />

            <n-space vertical>
              <n-progress type="line" :percentage="Math.round((tr / tc) * 100)">
                {{ tr }} sec
              </n-progress>

              <n-input-group>
                <n-input-group-label style="width: 120px">
                  HOTP Value
                </n-input-group-label>
                <n-input
                  v-model:value="hotp_value"
                  type="text"
                  readonly
                  style="width: 100%"
                />
              </n-input-group>

              <n-input-group>
                <n-input-group-label style="width: 120px">
                  TOTP Value
                </n-input-group-label>
                <n-input
                  v-model:value="totp_value"
                  type="text"
                  readonly
                  style="width: 100%"
                />
              </n-input-group>

              <n-input-group>
                <n-input-group-label style="width: 120px">
                  Steam Value
                </n-input-group-label>
                <n-input
                  v-model:value="steam_value"
                  type="text"
                  readonly
                  style="width: 100%"
                />
              </n-input-group>
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
}
</style>
