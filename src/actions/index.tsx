import Axios from 'axios'
import {
  FILL_INITIAL_STATE,
  INCREMENT_AMOUNT,
  DECREMENT_AMOUNT,
  INCREMENT_STOCK,
  DECREMENT_STOCK,
  CHECKOUT
} from '../constants'
import { selectIdItem } from '../util'
const incrementStock = (id) => ({ type: INCREMENT_STOCK, id })

const decrementStock = (id) => ({ type: DECREMENT_STOCK, id })

const incrementAmount = (id) => ({ type: INCREMENT_AMOUNT, id })

const decrementAmount = (id) => ({ type: DECREMENT_AMOUNT, id })

export const getInitialState = () => async (dispatch) => {
  try {
    const { data } = await Axios.get('https://fakestoreapi.com/products')
    dispatch({ type: FILL_INITIAL_STATE, payload: data })
  } catch (error) {
    console.log('Network error', error)
  }
}

export const checkOut = () => ({ type: CHECKOUT })

export const incrementAction = (id) => (dispatch, getState) => {
  const { stock } = getState()
  if (selectIdItem(stock, id).stock > 0) {
    console.log('action-in')
    dispatch(decrementStock(id))
    dispatch(incrementAmount(id))
  }
}
export const decrementAction = (id) => (dispatch, getState) => {
  const { cart } = getState()
  if (selectIdItem(cart, id) && selectIdItem(cart, id).amount > 0) {
    dispatch(incrementStock(id))
    dispatch(decrementAmount(id))
  }
}
