import { createSlice, createSelector, createAsyncThunk } from '@reduxjs/toolkit'
import { createOrder } from '../../api/order'

export const checkout = createAsyncThunk('cart/checkout', (_, { getState }) => {
  const state = getState()
  return createOrder(state.cart.items)
})

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    checkoutStatus: 'idle', // 'idle' | 'loading' | 'failed'
  },
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload
      const existingItem = state.items.find((item) => item.id === product.id)

      if (existingItem) {
        existingItem.quantity += 1
      } else {
        state.items.push({ ...product, quantity: 1 })
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload)
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload

      if (quantity <= 0) {
        state.items = state.items.filter((item) => item.id !== id)
        return
      }

      const item = state.items.find((item) => item.id === id)
      if (item) item.quantity = quantity
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkout.pending, (state) => {
        state.checkoutStatus = 'loading'
      })
      .addCase(checkout.fulfilled, (state) => {
        state.checkoutStatus = 'idle'
        state.items = []
      })
      .addCase(checkout.rejected, (state) => {
        state.checkoutStatus = 'failed'
      })
  },
})

export const selectCartItems = (state) => state.cart.items
export const selectIsCheckingOut = (state) => state.cart.checkoutStatus === 'loading'

export const selectCartCount = createSelector([selectCartItems], (items) =>
  items.reduce((total, item) => total + item.quantity, 0),
)

export const selectCartTotal = createSelector([selectCartItems], (items) =>
  items.reduce((total, item) => total + item.price * item.quantity, 0),
)

export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions
export default cartSlice.reducer
