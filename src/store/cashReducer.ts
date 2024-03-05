import { type TAction } from './types'

export interface TCashState {
  cash: number
}

export interface TActionCash extends TAction {
  payload: number
}

const defaultState: TCashState = {
  cash: 0
}

export const ADD_CASH = 'ADD_CASH'
export const ASYNC_ADD_CASH = 'ASYNC_ADD_CASH'
export const GET_CASH = 'GET_CASH'
export const ASYNC_GET_CASH = 'ASYNC_GET_CASH'
export const cashReducer = (state: TCashState = defaultState, action: TActionCash) => {
  switch (action.type) {
    case ADD_CASH :
      return { ...state, cash: state.cash + action.payload }
    case GET_CASH :
      return { ...state, cash: state.cash - action.payload }
    default:
      return state
  }
}

export const addCashAction = (payload: number) => ({ type: ADD_CASH, payload })
export const asyncAddCashAction = (payload: number) => ({ type: ASYNC_ADD_CASH, payload })
export const getCashAction = (payload: number) => ({ type: GET_CASH, payload })
export const asyncGetCashAction = (payload: number) => ({ type: ASYNC_GET_CASH, payload })
