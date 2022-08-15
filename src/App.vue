<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script>
export default {
  name: 'App',
  computed: {
    users() {
      return this.$store.getters.users;
    },
  },
  async mounted() {
    // this.$store.commit('set_vm', this);
    this.$store.commit('set_dm', this.$dm);
    this.$lib.script.setDm();

    this.$dm.SetDict(0, this.$lib.script.assets('font0.txt'));
  },
};
</script>
