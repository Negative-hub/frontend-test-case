import { createSlice } from '@reduxjs/toolkit'

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    loading: false,
  },
  reducers: {
    setProducts: (state, action) => {
      state.items = action.payload
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
  },
})

export const selectProducts = (state) => state.products.items
export const selectProductsLoading = (state) => state.products.loading

export const { setProducts, setLoading } = productsSlice.actions
export default productsSlice.reducer
