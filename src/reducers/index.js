'use strict';

import * as types from '../constants/action_types';
import traverse from 'traverse';
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
        style: traverse(state.style).map(function(d) {
          state.swatches.forEach((swatch, i) => {
            if (d === swatch) this.update(action.swatches[i]);
          });
        }),
        swatches: action.swatches
    });

    case types.SWATCH:
      const swatches = state.swatches.slice(0);
      swatches[action.index] = action.hex;
      return Object.assign({}, state, {
      style: traverse(state.style).map(function(d) {
        if (d === state.swatches[action.index]) this.update(action.hex);
      }),
      swatches
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
