'use strict';

import * as types from '../constants/action_types';

export function addSwatch(prop, hex) {
  return {
    type: types.SWATCH,
    prop,
    hex
  };
}
