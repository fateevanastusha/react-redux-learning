import { combineReducers } from 'redux'
import { cashReducer } from './cashReducer'
import { customerReducer } from './customerReducer'
import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import { rootWatcher } from './saga'

const sagaMiddleware = createSagaMiddleware()

const rootReducer = combineReducers({
  cash: cashReducer,
  customers: customerReducer
})
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
  enhancers: (defaultEnhancers) => defaultEnhancers().concat()
})

sagaMiddleware.run(rootWatcher)
