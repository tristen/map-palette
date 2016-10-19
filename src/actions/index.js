'use strict';

import * as types from '../constants/action_types';

export function updateSwatch(index, hex) {
  return {
    type: types.SWATCH,
    index,
    hex
  };
}

export function updateAllSwatches(swatches) {
  return {
    type: types.UPDATE_ALL_SWATCHES,
    swatches
  };
}

export function toggleColorPicker(index) {
  return {
    type: types.TOGGLE_COLORPICKER,
    index
  };
}

export function reverseSwatches(swatches) {
  return {
    type: types.UPDATE_ALL_SWATCHES,
    swatches
  };
}
