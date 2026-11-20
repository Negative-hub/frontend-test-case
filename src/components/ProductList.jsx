import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchProducts,
  selectProducts,
  selectProductsStatus,
  selectProductsError,
} from '../store'
import ProductFilters from './ProductFilters'
import ProductGrid from './ProductGrid'

function ProductList() {
  const dispatch = useDispatch()
  const products = useSelector(selectProducts)
  const status = useSelector(selectProductsStatus)
  const error = useSelector(selectProductsError)

  const [searchTerm, setSearchTerm] = useState('')
  const [category, setCategory] = useState('all')
  const [sortBy, setSortBy] = useState('name')

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  const filteredProducts = useMemo(() => {
    const search = searchTerm.toLowerCase()

    return products
      .filter((product) => product.name.toLowerCase().includes(search))
      .filter((product) => category === 'all' || product.category === category)
      .sort((a, b) => {
        if (sortBy === 'name') return a.name.localeCompare(b.name)
        if (sortBy === 'price') return a.price - b.price
        return 0
      })
  }, [products, searchTerm, category, sortBy])

  return (
    <div className="product-list">
      <ProductFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        category={category}
        onCategoryChange={setCategory}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />
      <ProductGrid products={filteredProducts} status={status} error={error} />
    </div>
  )
}

export default ProductList
