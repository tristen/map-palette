'use strict';

import * as types from '../constants/action_types.js';
import defaultStyle from '../data/default_style.json';

const initialState = {
  loading: false,
  swatches: {
    Vibrant: '',
    Muted: '',
    DarkVibrant: '',
    DarkMuted: '',
    LightVibrant: '',
    LightMuted: ''
  },
  style: defaultStyle
};

const data = (state = initialState, action) => {
  switch (action.type) {

    case types.LOADING:
      return Object.assign({}, state, {
      loading: action.loading
    });

    case types.SWATCH:
      let foo = {};
      foo[action.prop] = action.hex;
      return Object.assign({}, state, {
      swatches: Object.assign({}, state.swatches, {
        [action.prop]: action.hex
      })
    });

    default:
      return state;
  }
};

export default data;
