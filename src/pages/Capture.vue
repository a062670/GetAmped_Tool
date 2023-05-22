<template>
  <div>
    <div class="q-mb-sm">截圖(各種測試)</div>
    <q-form @submit="moveTo()">
      <div class="row items-center">
        <div class="col">
          <q-input
            dense
            outlined
            mask="#"
            fill-mask="0"
            reverse-fill-mask
            v-model="setting.mX"
            label="游標 X"
          />
        </div>
        <div class="col">
          <q-input
            dense
            outlined
            mask="#"
            fill-mask="0"
            reverse-fill-mask
            v-model="setting.mY"
            label="游標 Y"
          />
        </div>
        <div class="col-auto">
          <q-btn type="submit" color="accent" label="移動" />
          <q-btn type="button" color="info" label="點擊" @click="leftClick" />
          <q-btn type="button" color="info" label="按下" @click="leftDown" />
          <q-btn type="button" color="info" label="放開" @click="leftUp" />
        </div>
      </div>
    </q-form>
    <q-form @submit="getColor()">
      <div class="row items-center">
        <div class="col">
          <q-input
            dense
            outlined
            mask="#"
            fill-mask="0"
            reverse-fill-mask
            v-model="setting.cX"
            label="X"
          />
        </div>
        <div class="col">
          <q-input
            dense
            outlined
            mask="#"
            fill-mask="0"
            reverse-fill-mask
            v-model="setting.cY"
            label="Y"
          />
        </div>
        <div class="col">
          <q-input dense outlined :value="color" label="顏色" />
        </div>
        <div class="col-auto">
          <q-btn type="submit" color="accent" label="取色" />
        </div>
      </div>
    </q-form>
    <q-form @submit="capture()">
      <div class="row items-center">
        <div class="col">
          <q-input
            dense
            outlined
            mask="#"
            fill-mask="0"
            reverse-fill-mask
            v-model="setting.x1"
            label="X1"
          />
        </div>
        <div class="col">
          <q-input
            dense
            outlined
            mask="#"
            fill-mask="0"
            reverse-fill-mask
            v-model="setting.y1"
            label="Y1"
          />
        </div>
        <div class="col">
          <q-input
            dense
            outlined
            mask="#"
            fill-mask="0"
            reverse-fill-mask
            v-model="setting.w"
            label="W"
          />
        </div>
        <div class="col">
          <q-input
            dense
            outlined
            mask="#"
            fill-mask="0"
            reverse-fill-mask
            v-model="setting.h"
            label="H"
          />
        </div>
        <div class="col-auto">
          <q-btn type="submit" color="accent" label="截圖" />
          <q-btn color="primary" label="儲存" @click="save" />
        </div>
      </div>
    </q-form>
    <q-form @submit="fetchWord()">
      <div class="row items-center">
        <div class="col">
          <q-input dense outlined v-model="setting.color" label="顏色" />
        </div>
        <div class="col">
          <q-input dense outlined v-model="setting.word" label="字" />
        </div>
        <div class="col-auto">
          <q-btn type="submit" color="primary" label="生成" />
        </div>
      </div>
    </q-form>
    <q-form @submit="orc()">
      <div class="row items-center">
        <div class="col">
          <q-input
            dense
            outlined
            mask="#"
            fill-mask="0"
            reverse-fill-mask
            v-model="setting.rict"
            label="字庫"
          />
        </div>
        <div class="col-auto">
          <q-btn type="submit" color="primary" label="檢測" />
        </div>
        <div class="col-auto">
          <q-btn color="info" label="重載" @click="reloadFont" />
        </div>

        <div class="col">
          <div class="q-px-sm">
            {{ word }}
          </div>
        </div>
      </div>
    </q-form>
    <q-form @submit="testKeyPressChar">
      <div class="row items-center">
        <div class="col">
          <q-input dense outlined v-model="testKey" label="按鍵名稱" />
        </div>
        <div class="col-auto">
          <q-btn type="submit" color="primary" label="測試按鍵" />
        </div>
      </div>
    </q-form>
    <div>
      <q-btn color="info" label="點擊" @click="testLeftClick" />
    </div>
    <div>
      {{ dictStr }}
    </div>
    <div class="image q-mt-sm">
      <canvas
        ref="canvas"
        class="canvas"
        :width="canvasWidth"
        :height="canvasHeight"
      ></canvas>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageCapture',
  data() {
    return {
      setting: {
        mX: '1280',
        mY: '720',
        cX: '200',
        cY: '200',
        x1: '0',
        y1: '0',
        w: '1280',
        h: '720',
        color: '',
        word: '',
        rict: '0',
      },
      color: '',
      word: '',
      dictStr: '',
      image: '',
      canvasWidth: 100,
      canvasHeight: 100,

      testKey: 'F9',
    };
  },
  computed: {
    dm() {
      return this.$store.getters.dm;
    },
  },
  async mounted() {},
  methods: {
    moveTo() {
      this.$store.dispatch('createThread', this.$route.name);

      this.dm.MoveTo(this.setting.mX, this.setting.mY);

      this.$store.dispatch('stopThread');
    },
    leftClick() {
      this.$store.dispatch('createThread', this.$route.name);

      this.dm.LeftClick();

      this.$store.dispatch('stopThread');
    },
    leftDown() {
      this.$store.dispatch('createThread', this.$route.name);

      this.dm.LeftDown();

      this.$store.dispatch('stopThread');
    },
    leftUp() {
      this.$store.dispatch('createThread', this.$route.name);

      this.dm.LeftUp();

      this.$store.dispatch('stopThread');
    },
    capture(filename) {
      // this.$store.dispatch('createThread', this.$route.name);

      filename = filename || `tmp/${Date.now()}.bmp`;
      const filePath = this.$lib.script.assets(filename);
      const imagePath = `assets/${filename}`;

      this.dm.Capture(
        this.setting.x1,
        this.setting.y1,
        parseInt(this.setting.x1) + parseInt(this.setting.w),
        parseInt(this.setting.y1) + parseInt(this.setting.h),
        filePath,
      );

      this.image = imagePath;
      this.setCanvas();

      // this.$store.dispatch('stopThread');

      return filePath;
    },
    setCanvas() {
      this.canvasWidth = this.setting.w * 5;
      this.canvasHeight = this.setting.h * 5;

      this.$nextTick(() => {
        let canvas = this.$refs.canvas;
        let ctx = canvas.getContext('2d');
        ctx.imageSmoothingEnabled = false;
        // ctx.imageSmoothingQuality = 'low';
        // 清空畫布
        ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
        let img = new Image();
        img.onload = async () => {
          ctx.drawImage(img, 0, 0, this.canvasWidth, this.canvasHeight);
        };
        img.src = this.image;
        console.log(this.image);
      });
    },
    save() {
      const filePath = this.capture('save/capture.bmp');
      this.$lib.notify.success(filePath, 10000);
    },
    fetchWord() {
      this.capture();
      this.dictStr = this.dm.FetchWord(
        this.setting.x1,
        this.setting.y1,
        parseInt(this.setting.x1) + parseInt(this.setting.w),
        parseInt(this.setting.y1) + parseInt(this.setting.h),
        this.setting.color,
        this.setting.word,
      );
    },
    orc() {
      this.capture();
      this.dm.UseDict(this.setting.rict);
      this.word = this.dm.Ocr(
        this.setting.x1,
        this.setting.y1,
        parseInt(this.setting.x1) + parseInt(this.setting.w),
        parseInt(this.setting.y1) + parseInt(this.setting.h),
        this.setting.color,
        0.85,
      );
      console.log('check', this.word);
    },
    reloadFont() {
      this.$dm.SetDict(
        this.setting.rict,
        this.$lib.script.assets(`font${this.setting.rict}.txt`),
      );
    },
    getColor() {
      this.color = this.dm.GetColor(this.setting.cX, this.setting.cY);
    },
    testLeftClick() {
      this.dm.LeftDoubleClick();
    },
    testKeyPressChar() {
      this.dm.KeyPressChar(this.testKey);
    },
  },
};
</script>

<style lang="scss" scoped>
.image {
  width: 100%;
  padding-bottom: 50%;
  position: relative;
  .canvas {
    max-width: 100%;
    height: auto;
  }
}
</style>
