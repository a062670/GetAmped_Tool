<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="q-pl-none">
        <q-btn round flat icon="fas fa-home" :to="{ name: 'home' }" />
        <div class="q-ml-xs">
          <q-btn color="info" label="視窗綁定" @click="getHwnds" />
        </div>
        <div class="q-ml-xs">{{ hwnd }}</div>
        <q-space />
        <div v-if="thread.isRunning" class="q-mr-xs">
          <!-- 執行中 -->
        </div>
        <div class="q-mr-xs" v-if="thread.isRunning">
          <q-btn
            round
            flat
            icon="far fa-stop-circle"
            @click="$store.dispatch('stopThread')"
          />
        </div>
        <div style="min-width: 120px">
          <q-select
            dense
            filled
            bg-color="white"
            :value="$route.name"
            :options="actions"
            label="功能"
            emit-value
            map-options
            @input="changeAction"
          ></q-select>
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container class="bg-white">
      <q-page class="q-pa-sm">
        <router-view />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'MainLayout',
  components: {},
  data() {
    return {};
  },
  computed: {
    hwnd() {
      return this.$store.getters.hwnd;
    },
    actions() {
      return this.$store.getters.actions;
    },
    thread() {
      return this.$store.getters.thread;
    },
  },
  mounted() {
    this.getHwnds();
  },
  methods: {
    getHwnds() {
      let hwnd = this.$dm.FindWindow('runtimetest_win', 'GetAmped');
      // hwnd = parseInt(
      //   this.$dm.EnumWindow(hwnd, 'TheRender', 'RenderWindow', 4),
      // );
      //hwnd = Int32.Parse(dm.EnumWindow(hwnd, "sub", "subWin", 4));

      const dm_ret = this.$dm.BindWindowEx(
        hwnd,
        'gdi',
        'windows',
        'windows',
        '',
        0,
      );
      //int dm_ret = dm.BindWindow(hwnd, "normal", "normal", "dx", 0);
      if (dm_ret != 1) {
        this.$lib.notify.error('找不到視窗！');
        return false;
      }

      this.changeHwnd(hwnd);
    },
    changeHwnd(hwnd) {
      this.$store.commit('set_hwnd', hwnd);
      // let fooberHwnd;
      // fooberHwnd = this.$dm.CreateFoobarRect(this.hwnd, 0, 0, 960, 540);
      // setTimeout(() => {
      //   this.$dm.FoobarClose(fooberHwnd);
      // }, 100);
    },

    changeAction(action) {
      this.$router.push({
        name: action,
      });
    },
  },
};
</script>
