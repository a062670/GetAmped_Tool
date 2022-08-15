import lib from '@/lib';
import moment from 'moment';
import path from 'path';
import fs from 'fs';
import os from 'os';

export default {
  setVm({ commit }, data) {
    commit('set_vm', data);
  },

  // 停止執行續
  stopThread({ commit, state }) {
    if (state.thread.isRunning) {
      state.thread.cancellation.cancel();
    }
    commit('set_thread', {
      isRunning: false,
      action: '',
      actionName: '',
      cancellation: null,
    });
  },

  // 建立執行續
  createThread({ commit, state, dispatch }, action) {
    // 先取消之前的執行
    dispatch('stopThread');

    // 如果沒有句柄
    if (!state.hwnd) {
      lib.notify.error('沒有句柄');
      return;
    }

    const cancellation = {};
    cancellation.promise = new Promise((_, reject) => {
      cancellation.cancel = () => reject(new Error('cancelled'));
    });

    commit('set_thread', {
      isRunning: true,
      action: action,
      actionName: state.actions.find(a => a.value === action)?.label || '',
      cancellation: cancellation,
    });
  },

  // Log
  log({ state, commit }, text) {
    let logs = JSON.parse(JSON.stringify(state.logs));
    logs.unshift({
      text: `${moment().format('YYYY-MM-DD HH:mm:ss')}: ${text}`,
      time: Date.now(),
    });
    commit(
      'set_logs',
      logs.filter((item, idx) => idx < 100),
    );
  },
};
