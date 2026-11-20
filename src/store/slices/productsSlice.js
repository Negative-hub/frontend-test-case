import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getProducts } from '../../api/products'

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  getProducts,
  {
    condition: (_, { getState }) => {
      const state = getState()
      return state.products.status === 'idle'
    },
  },
)

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed'
        state.error =
          action.error.message || 'Неизвестная ошибка. Попробуйте позже'
      })
  },
})

export const selectProducts = (state) => state.products.items
export const selectProductsStatus = (state) => state.products.status
export const selectProductsError = (state) => state.products.error

export default productsSlice.reducer
