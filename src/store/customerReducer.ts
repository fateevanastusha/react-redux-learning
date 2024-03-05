import { type TAction } from './types'

export interface TCustomer { name: string, id: number }
export interface TCustomersState {
  customers: TCustomer[]
}
const defaultState: TCustomersState = {
  customers: []
}

export interface TActionCustomers extends TAction {
  payload: TCustomer[] | number | undefined | TCustomer
}
export const ADD_CUSTOMER = 'ADD_CUSTOMER'
export const ASYNC_ADD_CUSTOMER = 'ASYNC_ADD_CUSTOMER'
export const GET_CUSTOMERS = 'GET_CUSTOMERS'
export const ASYNC_DELETE_CUSTOMER = 'ASYNC_DELETE_CUSTOMER'
export const DELETE_CUSTOMER = 'DELETE_CUSTOMER'
export const CREATE_MANY_CUSTOMERS = 'CREATE_MANY_CUSTOMERS'
export const ASYNC_CREATE_MANY_CUSTOMERS = 'ASYNC_CREATE_MANY_CUSTOMERS'

export const customerReducer = (state: TCustomersState = defaultState, action: TActionCustomers) => {
  switch (action.type) {
    case CREATE_MANY_CUSTOMERS :
      const newCustomers: TCustomer[] = (action.payload as TCustomer[]).map((customer: any) => {
        return {
          id: customer.id,
          name: customer.name
        }
      })
      return { ...state, customers: [...state.customers, ...newCustomers] }
    case ADD_CUSTOMER :
      return { ...state, customers: [...state.customers, (action.payload as TCustomer[])] }
    case GET_CUSTOMERS :
      return { ...state, customers: [...state.customers] }
    case DELETE_CUSTOMER :
      return { ...state, customers: state.customers.filter((customer: TCustomer) => customer.id !== action.payload) }
    default:
      return state
  }
}

export const addCustomerAction = (payload: TCustomer) => ({ type: ADD_CUSTOMER, payload })
export const asyncAddCustomerAction = (payload: TCustomer) => ({ type: ASYNC_ADD_CUSTOMER, payload })
export const deleteCustomerAction = (payload: number) => ({ type: DELETE_CUSTOMER, payload })
export const asyncDeleteCustomerAction = (payload: number) => ({ type: ASYNC_DELETE_CUSTOMER, payload })
export const createManyCustomersAction = (payload: any) => ({ type: CREATE_MANY_CUSTOMERS, payload })
export const asyncCreateManyCustomersAction = (payload: any) => ({ type: ASYNC_CREATE_MANY_CUSTOMERS, payload })
