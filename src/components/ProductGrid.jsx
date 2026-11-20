import ProductCard from './ProductCard'

function ProductGrid({ products, status, error }) {
  if (status === 'idle' || status === 'loading') {
    return <div className="loading">Загрузка товаров...</div>
  }

  if (status === 'failed') {
    return <div className="error">Не удалось загрузить товары: {error}</div>
  }

  if (products.length === 0) {
    return <p>Ничего не найдено</p>
  }

  return (
    <div className="products">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

export default ProductGrid
