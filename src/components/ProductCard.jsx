import { useDispatch, useSelector } from 'react-redux'
import { addToCart, selectIsCheckingOut } from '../store'

function ProductCard({ product }) {
  const dispatch = useDispatch()
  const isCheckingOut = useSelector(selectIsCheckingOut)

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <div className="price">${product.price}</div>
      <button
        onClick={() => dispatch(addToCart(product))}
        disabled={isCheckingOut}
      >
        Добавить в корзину
      </button>
    </div>
  )
}

export default ProductCard
