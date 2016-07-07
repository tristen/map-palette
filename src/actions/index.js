'use strict';

import * as types from '../constants/action_types';

export function isLoading(loading) {
  return {
    type: types.LOADING,
    loading
  };
}
