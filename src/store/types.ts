import { type TCashState } from './cashReducer'
import { type TCustomersState } from './customerReducer'

export interface TAction {
  type: string
}

export interface IState {
  cash: TCashState
  customers: TCustomersState
}
