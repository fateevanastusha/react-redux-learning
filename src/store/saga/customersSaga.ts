import { put, takeEvery, call } from 'redux-saga/effects'
import {
  addCustomerAction,
  ASYNC_ADD_CUSTOMER, ASYNC_CREATE_MANY_CUSTOMERS,
  ASYNC_DELETE_CUSTOMER, createManyCustomersAction,
  deleteCustomerAction, type TActionCustomers,
  type TCustomer
} from '../customerReducer'

const delay = async (ms: number) => await new Promise(res => setTimeout(res, ms))
const fetchUsersFromApi = async () => await fetch('https://jsonplaceholder.typicode.com/users')

function * addCustomerWorker (action: TActionCustomers) {
  yield delay(1000)
  yield put(addCustomerAction(action.payload as TCustomer))
}

function * deleteCustomerWorker (action: TActionCustomers) {
  yield delay(1000)
  yield put(deleteCustomerAction(action.payload as number))
}

function * loadCustomers (): Generator<any, void, { json: () => Promise<any> }> {
  const data = yield call(fetchUsersFromApi)
  const json = yield call(async () => await new Promise(res => { res(data.json()) }))
  yield put(createManyCustomersAction(json))
}

export function * customersWatcher () {
  yield takeEvery(ASYNC_ADD_CUSTOMER, addCustomerWorker)
  yield takeEvery(ASYNC_DELETE_CUSTOMER, deleteCustomerWorker)
  yield takeEvery(ASYNC_CREATE_MANY_CUSTOMERS, loadCustomers)
}
