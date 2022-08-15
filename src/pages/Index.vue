<template>
  <div>
    <div>功能</div>
    <q-btn
      flat
      v-for="action in actions"
      :key="action.value"
      :to="{ name: action.value }"
      :label="action.label"
    />
    <div>
      <a
        href="https://github.com/a062670/GetAmped_Tool/blob/main/README.md"
        target="_blank"
      >
        說明文件
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageIndex',
  data() {
    return {};
  },
  computed: {
    actions() {
      return this.$store.getters.actions;
    },
  },
  methods: {},
};
</script>
