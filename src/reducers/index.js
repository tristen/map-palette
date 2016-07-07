'use strict';

import * as types from '../constants/action_types.js';
import defaultStyle from '../data/default_style.json';

const initialState = {
  loading: false,
  style: defaultStyle
};

const data = (state = initialState, action) => {
  switch (action.type) {

    case types.LOADING:
      return Object.assign({}, state, {
      loading: action.loading
    });

    default:
      return state;
  }
};

export default data;
