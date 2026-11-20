import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  checkout,
  selectCartItems,
  selectCartCount,
  selectCartTotal,
  selectIsCheckingOut,
} from '../store'
import CartItem from './CartItem'

function Cart() {
  const dispatch = useDispatch()
  const items = useSelector(selectCartItems)
  const cartCount = useSelector(selectCartCount)
  const totalPrice = useSelector(selectCartTotal)
  const isCheckingOut = useSelector(selectIsCheckingOut)

  const [isOpen, setIsOpen] = useState(false)

  const handleCheckout = async () => {
    try {
      await dispatch(checkout()).unwrap()
      alert('Заказ оформлен!')
      setIsOpen(false)
    } catch {
      alert('Не удалось оформить заказ')
    }
  }

  return (
    <div className="cart">
      <button
        className="cart-toggle"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        Корзина ({cartCount})
      </button>

      {isOpen && (
        <div className="cart-dropdown">
          <div className="cart-header">
            <h3>Корзина</h3>
            <button onClick={() => setIsOpen(false)}>×</button>
          </div>

          {items.length === 0 ? (
            <p>Корзина пуста</p>
          ) : (
            <ul className="cart-items">
              {items.map((item) => (
                <li key={item.id}>
                  <CartItem item={item} />
                </li>
              ))}
            </ul>
          )}

          <div className="cart-footer">
            <div className="total">Итого: ${totalPrice}</div>
            <button
              className="checkout-btn"
              onClick={handleCheckout}
              disabled={items.length === 0 || isCheckingOut}
            >
              {isCheckingOut ? 'Оформляем...' : 'Оформить заказ'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Cart
