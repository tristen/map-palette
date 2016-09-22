'use strict';

import * as types from '../constants/action_types';
import { deepMap } from '../utils';

const fs = require('fs'); // substack/brfs#39

const swatches = {
  Vibrant: '#fff',
  Muted: '#cbd3d4',
  DarkVibrant: '#e8edeb',
  DarkMuted: '#f0f5f3',
  LightVibrant: '#dee2e3',
  LightMuted: '#78888a'
};

const defaultStyle = JSON.parse(fs.readFileSync(__dirname + '/../data/default_style.json', 'utf8'), (p, v) => {
  // Conditions are ordered light to dark
  if (v === '#fff') v = `${swatches.Vibrant}`;
  if (v === '#f0f5f3') v = `${swatches.DarkMuted}`;
  if (v === '#e8edeb') v = `${swatches.DarkVibrant}`;
  if (v === '#dee2e3') v = `${swatches.LightVibrant}`;
  if (v === '#cbd3d4') v = `${swatches.Muted}`;
  if (v === '#78888a') v = `${swatches.LightMuted}`;
  return v;
});

const initialState = {
  swatches: swatches,
  style: defaultStyle
};

const data = (state = initialState, action) => {
  switch (action.type) {

    case types.SWATCH:
      return Object.assign({}, state, {
      style: deepMap(state.style, (p, v) => {
        if (p === state.swatches[action.prop]) p = `${action.hex}`;
        return p;
      }),
      swatches: Object.assign({}, state.swatches, {
        [action.prop]: action.hex
      })
    });

    default:
      return state;
  }
};

export default data;
