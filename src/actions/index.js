'use strict';

import * as types from '../constants/action_types';

export function updateSwatch(prop, hex) {
  return {
    type: types.SWATCH,
    prop,
    hex
  };
}

export function updateAllSwatches(swatches) {
  return {
    type: types.UPDATE_ALL_SWATCHES,
    swatches
  };
}

export function toggleColorPicker(picker) {
  return {
    type: types.TOGGLE_COLORPICKER,
    picker
  };
}
