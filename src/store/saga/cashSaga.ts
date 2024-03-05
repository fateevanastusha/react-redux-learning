import {put, takeEvery} from 'redux-saga/effects'
import {addCashAction, ASYNC_ADD_CASH, ASYNC_GET_CASH, getCashAction, TActionCash} from "../cashReducer";
const delay = (ms : number) => new Promise(res => setTimeout(res,ms))
function* addCashWorker (action : TActionCash) {
    yield delay(1000)
    yield put(addCashAction(action.payload))
}

function* getCashWorker(action : TActionCash) {
    yield delay(1000)
    yield put(getCashAction(action.payload))
}

export function* cashWatcher () {
    yield takeEvery(ASYNC_ADD_CASH, addCashWorker)
    yield takeEvery(ASYNC_GET_CASH, getCashWorker)
}