import store from '@/store';

class Script {
  dm = null;
  setDm() {
    this.dm = store.getters.dm;
  }
  log(text) {
    store.dispatch('log', text);
  }
  assets(filename) {
    return `${process.env.ASSETS_FOLDER}/${filename}`;
  }
  createPromiseRace(fun) {
    return Promise.race([
      store.getters.thread.cancellation.promise,
      new Promise(fun),
    ]);
  }
  delay(ms, randomRange = 100) {
    return this.createPromiseRace(resolve => {
      const num = Math.random() * randomRange;
      setTimeout(() => {
        resolve();
      }, ms + num);
    });
  }
  // 移動滑鼠
  moveToEx(x, y, w, h) {
    return this.createPromiseRace((resolve, reject) => {
      this.dm.MoveToEx(x, y, w, h);
      resolve();
    });
  }
  // 播放音效
  playWav(name) {
    this.dm.Play(this.assets(`wav/${name}.wav`));
  }
  // 取得圖片位置
  findPicE(
    image,
    {
      x1 = 0,
      y1 = 0,
      x2 = 960,
      y2 = 540,
      delta_color = '000000',
      sim = 0.7,
      dir = 0,
    },
  ) {
    return this.createPromiseRace((resolve, reject) => {
      let imageStr;
      if (Array.isArray(image)) {
        imageStr = image.map(img => this.assets(img)).join('|');
      } else {
        imageStr = this.assets(image);
      }
      let pos = this.dm.FindPicE(
        x1,
        y1,
        x2,
        y2,
        imageStr,
        delta_color,
        sim,
        dir,
      );
      const posSplit = pos.split('|');
      if (posSplit[0] === '-1') {
        resolve(null);
      }
      resolve({
        idx: parseInt(posSplit[0]),
        x: parseInt(posSplit[1]),
        y: parseInt(posSplit[2]),
      });
    });
  }
}

export default Script;
