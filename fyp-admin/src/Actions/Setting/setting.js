import * as Type from 'Actions/type';

export function setSettings(value) {
  return {
    type: Type.SET_SETTINGS,
    value
  };
}

export function setDefaultSettings(value) {
  return {
    type: Type.SET_DEFAULT_SETTINGS,
    value
  };
}

export function setInitialSettings() {
  return {
    type: Type.SET_INITIAL_SETTINGS
  };
}

export function resetSettings(value) {
  return {
    type: Type.RESET_DEFAULT_SETTINGS,
    value
  };
}
