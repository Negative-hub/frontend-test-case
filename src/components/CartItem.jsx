import { useDispatch, useSelector } from 'react-redux'
import { removeFromCart, updateQuantity, selectIsCheckingOut } from '../store'

function CartItem({ item }) {
  const dispatch = useDispatch()
  const isCheckingOut = useSelector(selectIsCheckingOut)

  const changeQuantity = (quantity) =>
    dispatch(updateQuantity({ id: item.id, quantity }))

  return (
    <div className="cart-item">
      <img src={item.image} alt={item.name} />
      <div className="item-details">
        <h4>{item.name}</h4>
        <p>${item.price}</p>
        <div className="quantity-controls">
          <button
            onClick={() => changeQuantity(item.quantity - 1)}
            disabled={isCheckingOut}
          >
            -
          </button>
          <span>{item.quantity}</span>
          <button
            onClick={() => changeQuantity(item.quantity + 1)}
            disabled={isCheckingOut}
          >
            +
          </button>
        </div>
      </div>
      <button
        className="remove-btn"
        onClick={() => dispatch(removeFromCart(item.id))}
        disabled={isCheckingOut}
      >
        Удалить
      </button>
    </div>
  )
}

export default CartItem
