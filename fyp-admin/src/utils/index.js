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

export const returnArrayInSelectFormat = (obj) => {
  let arr = [];
  for (const keys in obj) {
    arr.push({ label: keys, value: keys });
  }
  return arr;
};

export const getLocalStorage = (name, parse = true) => {
  try {
    if (parse) {
      return JSON.parse(localStorage.getItem(name) || '{}');
    } else {
      return localStorage.getItem(name);
    }
  } catch (e) {
    return undefined;
  }
};

export const removeLocalStorage = (name) => {
  localStorage.removeItem(name);
};
export const getBase64 = async (file) => {
  var reader = new FileReader();
  reader.readAsDataURL(file);

  return new Promise((reslove, reject) => {
    reader.onload = () => reslove(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

export const CalculateACPrice = (consumption, rate, maxCharge) => {
  const temp = consumption / maxCharge;
  temp = temp * 60;
  temp = temp * parseFloat(rate);
  return temp;
};

export const CalculateDCPrice = (consumption, rate) => {
  return consumption * 60 * rate;
};
