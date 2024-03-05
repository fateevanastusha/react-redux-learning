import { createManyCustomersAction } from '../customerReducer'

export const fetchCustomers = () => {
  return (dispatch: any) => {
    void fetch('https://jsonplaceholder.typicode.com/users')
      .then(async response => await response.json())
      .then(json => dispatch(createManyCustomersAction(json)))
  }
}
