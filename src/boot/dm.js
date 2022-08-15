import Vue from 'vue';
const { remote } = require('electron');

Vue.prototype.$dm = remote.getGlobal('dm');
