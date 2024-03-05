import './Main.module.css'
import { useDispatch, useSelector } from 'react-redux'
import {
  addCustomerAction, asyncAddCustomerAction, asyncCreateManyCustomersAction,
  deleteCustomerAction,
  type TCustomer
} from '../../store/customerReducer'
import { addCashAction, asyncAddCashAction, asyncGetCashAction, getCashAction } from '../../store/cashReducer'
import { fetchCustomers } from '../../store/asyncActions/customers'
import { type IState } from '../../store/types'
const Main = () => {
  const dispatch = useDispatch()
  const cash = useSelector((state: IState) => state.cash.cash)
  const customers = useSelector((state: IState) => state.customers.customers)
  const addCustomer = (name: string) => {
    const customer = {
      name,
      id: Date.now()
    }
    dispatch(addCustomerAction(customer))
  }
  const addCustomerSaga = (name: string) => {
    const customer = {
      name,
      id: Date.now()
    }
    dispatch(asyncAddCustomerAction(customer))
  }
  return (
        <div className={'wrapper'}>
            <div className={'container'}>
                Баланс : {cash}
                <div className={'buttons'}>
                    <button onClick={() => dispatch(addCashAction(Number(prompt())))}>Пополнить счет</button>
                    <button onClick={() => dispatch(asyncAddCashAction(Number(prompt())))}>Пополнить счет асинхронно</button>
                    <button onClick={() => dispatch(getCashAction(Number(prompt())))}>Снять со счета</button>
                    <button onClick={() => dispatch(asyncGetCashAction(Number(prompt())))}>Снять со счета асинхронно</button>
                </div>
                <div className={'customers'}>
                    {customers.length > 0
                      ? customers.map((customer: TCustomer) => {
                        return (<p key={customer.id} onClick={() => dispatch(deleteCustomerAction(customer.id))}>
                            id - {customer.id} name - {customer.name}
                        </p>)
                      })
                      : <span>Клиенты отсутствуют!</span>}
                    <div className={'buttons'}>
                        <button onClick={() => { addCustomer(String(prompt())) }}>Добавить клиента</button>
                        <button onClick={() => { addCustomerSaga(String(prompt())) }}>Добавить клиента асинхронно</button>
                        {/* @ts-expect-error */}
                        <button onClick={() => dispatch(fetchCustomers())}>Загрузить клиентов</button>
                        {/* @ts-expect-error */}
                        <button onClick={() => dispatch(asyncCreateManyCustomersAction())}>Загрузить клиентов асинхронно</button>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default Main
