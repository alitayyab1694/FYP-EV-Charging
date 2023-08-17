import { toast, Zoom } from 'react-toastify';
export const Toaster = (version, msg) => {
  if (version === 'success') {
    return toast.success(msg, {
      containerId: 'D',
      transition: Zoom
    });
  }
  if (version === 'error') {
    return toast.error(msg, {
      containerId: 'D',
      transition: Zoom
    });
  }
  if (version === 'primary') {
    toast(msg, { containerId: 'D' });
  }
  if (version === 'info') {
    toast.info(msg, {
      containerId: 'D',
      transition: Zoom
    });
  }
  if (version === 'warn') {
    toast.warn(msg, {
      containerId: 'D',
      transition: Zoom
    });
  }
};
export const setLocalStorage = (name, value, strigify = true) => {
  if (strigify) {
    return localStorage.setItem(name, JSON.stringify(value));
  } else {
    return localStorage.setItem(name, value);
  }
};

export const getLocalStorage = (name, parse = true, changeReturn = false) => {
  try {
    if (parse) {
      if (changeReturn) {
        return JSON.parse(
          localStorage.getItem(name) ? localStorage.getItem(name) : undefined
        );
      } else {
        return JSON.parse(
          localStorage.getItem(name) ? localStorage.getItem(name) : '{}'
        );
      }
    } else {
      return localStorage.getItem(name);
    }
  } catch (e) {
    return undefined;
  }
};
export const getHourArray = (start, end) => {
  let arr = [];
  for (let index = start.split(':')[0]; index < end.split(':')[0]; index++) {
    arr.push({
      value: Number(index),
      name: Number(index)
    });
  }
  return arr;
};
export const convertTimeformat = (testArr) => {
  return testArr.map((t) => {
    if (t.value === 13) {
      t.name = 1;
      t.zone = 'PM';
    } else if (t.value === 14) {
      t.name = 2;

      t.zone = 'PM';
    } else if (t.value === 15) {
      t.name = 3;

      t.zone = 'PM';
    } else if (t.value === 16) {
      t.name = 4;

      t.zone = 'PM';
    } else if (t.value === 17) {
      t.name = 5;

      t.zone = 'PM';
    } else if (t.value === 18) {
      t.name = 6;

      t.zone = 'PM';
    } else if (t.value === 19) {
      t.name = 7;

      t.zone = 'PM';
    } else if (t.value === 20) {
      t.name = 8;

      t.zone = 'PM';
    } else if (t.value === 21) {
      t.name = 9;

      t.zone = 'PM';
    } else if (t.value === 22) {
      t.name = 10;
      t.zone = 'PM';
    } else if (t.value === 23) {
      t.name = 11;
      t.zone = 'PM';
    } else if (t.value === 24) {
      t.name = 12;
      t.zone = 'PM';
    } else {
      t.zone = 'AM';
    }
    return t;
  });
};
export const removeLocalStorage = (name) => {
  localStorage.removeItem(name);
};

export const isJson = (str) => {
  try {
    return JSON.parse(str);
  } catch (e) {
    return false;
  }
};

export const CustomReturnTransactionResponseSuccess = (response, data) => {
  switch (response) {
    case 'Got Status Notificaion': {
      return;
    }
    case 'Remote Transaction request has been sent': {
      const user = getLocalStorage('evapUser', true, true);
      if (user) {
        user.startTransaction = true;
        delete user.enableTryAgain;
        setLocalStorage('evapUser', user);
      }
      return;
    }
    case 'Something went wrong in starting transaction, want to try again?': {
      const user = getLocalStorage('evapUser', true, true);
      if (user) {
        user.enableTryAgain = true;
        setLocalStorage('evapUser', user);
      }

      return;
    }
    case 'Payment was unsuccessful, please try again...': {
      const user = getLocalStorage('evapUser', true, true);
      if (user) {
        user.enableTryAgain = true;
        setLocalStorage('evapUser', user);
      }

      return;
    }
    case 'Transaction Completed': {
      const user = getLocalStorage('evapUser', true, true);
      delete user.enableTryAgain;
      delete user.startTransaction;
      delete user.startTransaction;
      delete user.checkStatusStop;
      delete user.stopTransaction;
      delete user.startCharging;
      setLocalStorage('evapUser', user);
      return;
    }
    case 'Transaction Started, do not take out the plug while the car is charging': {
      const user = getLocalStorage('evapUser', true, true);
      if (user) {
        user.startCharging = true;
        user.startTransaction = true;
        delete user.enableTryAgain;
        setLocalStorage('evapUser', user);
      }
      return;
    }
    case 'Remote Stop Transaction request has been sent': {
      const user = getLocalStorage('evapUser', true, true);
      delete user.enableTryAgain;
      delete user.startTransaction;
      delete user.startCharging;
      // user.stopTransaction = true;
      setLocalStorage('evapUser', user);
      return;
    }
    default:
      return;
  }
};
export const get24HourTimeArray = () => {
  const hoursArray = [];
  for (let hour = 0; hour < 24; hour++) {
    const formattedHour = hour.toString().padStart(2, '0');
    hoursArray.push(`${formattedHour}:00`);
  }
  return hoursArray;
};
