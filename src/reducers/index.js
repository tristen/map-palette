'use strict';

import * as types from '../constants/action_types';
import { deepMap } from '../utils';
import defaultStyle from '../data/default_style';

// Colors based on those found in the default style.
const initialState = {
  picker: false,
  style: defaultStyle,
  swatches: {
    Vibrant: '#fff',
    Muted: '#cbd3d4',
    DarkVibrant: '#e8edeb',
    DarkMuted: '#f0f5f3',
    LightVibrant: '#dee2e3',
    LightMuted: '#78888a'
  }
};

const data = (state = initialState, action) => {
  switch (action.type) {

    case types.UPDATE_ALL_SWATCHES:
      return Object.assign({}, state, {
      style: deepMap(state.style, (v) => {
        for (let prop in action.swatches) {
          if (v === state.swatches[prop]) v = action.swatches[prop];
        }
        return v;
      }),
      swatches: Object.assign({}, state.swatches, action.swatches)
    });

    case types.SWATCH:
      return Object.assign({}, state, {
      style: deepMap(state.style, (v) => {
        if (v === state.swatches[action.prop]) v = `${action.hex}`;
        return v;
      }),
      swatches: Object.assign({}, state.swatches, {
        [action.prop]: action.hex
      })
    });

    case types.TOGGLE_COLORPICKER:
      return Object.assign({}, state, {
        picker: action.picker
      })

    case types.SWATCH:
    default:
      return state;
  }
};

export default data;
