import { Notify } from 'quasar';

class MyNotify {
  error(msg) {
    Notify.create({
      timeout: 5000,
      color: 'red-5',
      textColor: 'white',
      icon: 'fas fa-exclamation-triangle',
      message: msg,
      position: 'top',
    });
  }

  success(msg, time = 1000) {
    Notify.create({
      timeout: time,
      color: 'positive',
      textColor: 'white',
      icon: 'far fa-check-circle',
      message: msg,
      position: 'top',
    });
  }
}

export default MyNotify;
