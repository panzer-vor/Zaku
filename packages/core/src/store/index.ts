import { createStore } from 'redux'
import * as R from 'ramda'
import { Action, GlobalState } from '../types'
import * as actionTypes from './action_types'

const initialState: GlobalState = {
  loadingStatus: false,
  cache: {},
  app: {},
}

export const setStateAction = <T = any>(state: T, module: string) => ({
  type: actionTypes.SET_STATE_ACTION,
  payload: {
    module,
    state,
  },
})

export const setCacheAction = <T = any>(state: T) => ({
  type: actionTypes.SET_CACHE_ACTION,
  payload: state,
})

export const setLoadingAction = (loadingStatus: boolean) => ({
  type: actionTypes.SET_LOADING_ACTION,
  payload: loadingStatus,
})

const reducer = (state = initialState, action: Action<any>) => {
  const { type, payload } = action

  const appOperator = R.lensProp('app')
  const cacheOperator = R.lensProp('cache')

  switch(type) {
    case actionTypes.SET_STATE_ACTION:
      return R.over(
        appOperator,
        R.assoc(payload.module, R.dissoc('cacheKey', payload.state)), 
        state,
      )
    case actionTypes.SET_CACHE_ACTION:
      return R.over(
        cacheOperator,
        R.assoc(payload.cacheKey, R.dissoc('cacheKey', payload)),
        state,
      )
    case actionTypes.SET_LOADING_ACTION:
      return {
        ...state,
        loadingStatus: payload,
      }
    default:
      return state
  }
}

export const store = createStore(
  reducer, 
  initialState, 
)
