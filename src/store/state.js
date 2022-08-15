export default {
  vm: null,
  dm: null,
  hwnd: null,

  user: null,
  users: [],
  tmpSetting: {},

  thread: {
    isRunning: false,
    action: '',
    cancellation: null,
  },

  actions: [
    {
      label: '首頁',
      value: 'home',
    },
    {
      label: '釣魚',
      value: 'fishing',
    },
    {
      label: '截圖',
      value: 'capture',
    },
  ],

  logs: [],
};
