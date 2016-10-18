'use strict';

import * as types from '../constants/action_types';
import { deepMap } from '../utils/';
import defaultStyle from '../data/default_style';

// Colors based on those found in the default style.
const initialState = {
  picker: false,
  style: defaultStyle,
  swatches: [
    '#fff',
    '#f0f5f3',
    '#e8edeb',
    '#dee2e3',
    '#cbd3d4',
    '#78888a'
  ]
};

const data = (state = initialState, action) => {
  switch (action.type) {

    case types.UPDATE_ALL_SWATCHES:
      return Object.assign({}, state, {
      style: deepMap(state.style, (v) => {
        state.swatches.forEach((d, i) => {
          if (v === d) v = action.swatches[i];
        });

        return v;
      }),
      swatches: action.swatches
    });

    case types.SWATCH:
      state.swatches[action.index] = action.hex;
      return Object.assign({}, state, {
      style: deepMap(state.style, (v) => {
        if (v === state.swatches[action.index]) v = `${action.hex}`;
        return v;
      }),
      swatches: state.swatches
    });

    case types.TOGGLE_COLORPICKER:
      return Object.assign({}, state, {
        picker: action.index
      })

    default:
      return state;
  }
};

export default data;
