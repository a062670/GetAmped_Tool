<template>
  <div>
    <div class="row items-center">
      <div class="col-auto">釣魚/挖礦</div>
      <div class="col-auto">
        <q-btn
          dense
          flat
          round
          color="primary"
          size="sm"
          :icon="`fas fa-${isShowTips ? 'times' : 'plus'}`"
          @click="isShowTips = !isShowTips"
        ></q-btn>
      </div>
    </div>
    <div v-if="isShowTips">走到可以採集的位置，開啟採集和背包，按開始</div>
    <hr />
    <div class="row items-center">
      <div class="col q-pr-md">
        <q-input
          dense
          outlined
          mask="#"
          fill-mask="0"
          reverse-fill-mask
          v-model.number="delayF9"
          label="幾秒按一次 F9(秒)"
        />
      </div>
      <div class="col q-pr-md">
        <q-input
          dense
          outlined
          mask="#"
          fill-mask="0"
          reverse-fill-mask
          v-model.number="delaySell"
          label="幾秒賣出一次(秒)"
        />
      </div>
      <div class="col-auto">
        <q-btn color="info" label="開始" @click="start" />
      </div>
    </div>
    <hr />
  </div>
</template>

<script>
import moment from 'moment';

export default {
  name: 'PageStore',
  data() {
    return {
      isShowTips: false,

      /** 幾秒一次 F9 */
      delayF9: 2,

      /** 幾秒賣一次 */
      delaySell: 300,

      /** 計時器：F9 */
      timerF9: null,

      /** 計時器：賣出 */
      timerSell: null,
    };
  },
  computed: {
    dm() {
      return this.$store.getters.dm;
    },
    thread() {
      return this.$store.getters.thread;
    },
  },
  async mounted() {},
  methods: {
    async start() {
      this.$store.dispatch('createThread', this.$route.name);

      clearInterval(this.timerF9);
      this.dm.KeyPressChar('F9');
      this.timerF9 = setInterval(() => {
        if (!this.thread.isRunning) {
          clearInterval(this.timerF9);
          return;
        }
        this.dm.KeyPressChar('F9');
      }, this.delayF9 * 1000);

      clearInterval(this.timerSell);
      this.timerSell = setInterval(async () => {
        if (!this.thread.isRunning) {
          clearInterval(this.timerSell);
          return;
        }
        await this.sell();
      }, this.delaySell * 1000);

      // this.$store.dispatch('stopThread');
    },

    async sell() {
      return this.$lib.script.createPromiseRace(async (resolve, reject) => {
        // 點全部交換
        await this.$lib.script.moveToEx(60, 420, 30, 5);
        await this.$lib.script.delay(100, 10);
        this.dm.LeftDown();
        await this.$lib.script.delay(100, 10);
        this.dm.LeftUp();
        await this.$lib.script.delay(2000, 100);

        // 點確定
        await this.$lib.script.moveToEx(525, 385, 30, 5);
        await this.$lib.script.delay(100, 10);
        this.dm.LeftDown();
        await this.$lib.script.delay(100, 10);
        this.dm.LeftUp();
        await this.$lib.script.delay(3000, 100);

        // 點關閉
        await this.$lib.script.moveToEx(560, 440, 30, 5);
        await this.$lib.script.delay(100, 10);
        this.dm.LeftDown();
        await this.$lib.script.delay(100, 10);
        this.dm.LeftUp();
        await this.$lib.script.delay(1000, 100);

        resolve();
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
