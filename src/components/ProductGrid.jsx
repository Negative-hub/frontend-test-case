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
    <ul className="products">
      {products.map((product) => (
        <li key={product.id}>
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  )
}

export default ProductGrid
