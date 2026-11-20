import React, { useState, useEffect } from 'react'
import { Provider, useSelector, useDispatch } from 'react-redux'
import {
  store,
  fetchProducts,
  selectProducts,
  selectProductsStatus,
  selectProductsError,
  addToCart,
  removeFromCart,
  updateQuantity,
  checkout,
  selectIsCheckingOut,
  selectCartItems,
  selectCartCount,
  selectCartTotal,
  fetchUser,
  selectUser,
} from './store'

import './App.css'

function App() {
  return (
    <Provider store={store}>
      <div className="app">
        <Header />
        <div className="main-content">
          <ProductList />
          <Cart />
        </div>
      </div>
    </Provider>
  )
}

function ProductList() {
  const dispatch = useDispatch()
  const products = useSelector(selectProducts)
  const status = useSelector(selectProductsStatus)
  const error = useSelector(selectProductsError)
  
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('name')
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
    return matchesSearch && matchesCategory
  }).sort((a, b) => {
    if (sortBy === 'name') return a.name.localeCompare(b.name)
    if (sortBy === 'price') return a.price - b.price
    return 0
  })

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value)
  }

  const handleSortChange = (e) => {
    setSortBy(e.target.value)
  }

  if (status === 'idle' || status === 'loading') {
    return <div className="loading">Загрузка товаров...</div>
  }

  if (status === 'failed') {
    return <div className="error">Не удалось загрузить товары: {error}</div>
  }

  return (
    <div className="product-list">
      <div className="filters">
        <div className="search">
          <input
            type="text"
            placeholder="Поиск товаров..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        
        <div className="filter-controls">
          <select value={selectedCategory} onChange={handleCategoryChange}>
            <option value="all">Все категории</option>
            <option value="phones">Телефоны</option>
            <option value="laptops">Ноутбуки</option>
            <option value="tablets">Планшеты</option>
          </select>
          
          <select value={sortBy} onChange={handleSortChange}>
            <option value="name">По названию</option>
            <option value="price">По цене</option>
          </select>
          
          <button onClick={() => setShowFilters(!showFilters)}>
            {showFilters ? 'Скрыть фильтры' : 'Показать фильтры'}
          </button>
        </div>
      </div>

      <div className="products">
        {filteredProducts.map(product => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <div className="price">${product.price}</div>
            <button 
              onClick={() => dispatch(addToCart(product))}
            >
              Добавить в корзину
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

function Cart() {
  const dispatch = useDispatch()
  const cart = useSelector(selectCartItems)
  const cartCount = useSelector(selectCartCount)
  const totalPrice = useSelector(selectCartTotal)
  
  const [isOpen, setIsOpen] = useState(false)
  const isCheckingOut = useSelector(selectIsCheckingOut)

  const handleRemoveItem = (id) => {
    dispatch(removeFromCart(id))
  }

  const handleUpdateQuantity = (id, quantity) => {
    dispatch(updateQuantity({ id, quantity }))
  }

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
        onClick={() => setIsOpen(!isOpen)}
      >
        Корзина ({cartCount})
      </button>

      {isOpen && (
        <div className="cart-dropdown">
          <div className="cart-header">
            <h3>Корзина</h3>
            <button onClick={() => setIsOpen(false)}>×</button>
          </div>

          <div className="cart-items">
            {cart.length === 0 ? (
              <p>Корзина пуста</p>
            ) : (
              cart.map(item => (
                <div key={item.id} className="cart-item">
                  <img src={item.image} alt={item.name} />
                  <div className="item-details">
                    <h4>{item.name}</h4>
                    <p>${item.price}</p>
                    <div className="quantity-controls">
                      <button onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}>
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}>
                        +
                      </button>
                    </div>
                  </div>
                  <button 
                    className="remove-btn"
                    onClick={() => handleRemoveItem(item.id)}
                  >
                    Удалить
                  </button>
                </div>
              ))
            )}
          </div>

          <div className="cart-footer">
            <div className="total">Итого: ${totalPrice}</div>
            <button 
              className="checkout-btn"
              onClick={handleCheckout}
              disabled={cart.length === 0 || isCheckingOut}
            >
              {isCheckingOut ? 'Оформляем...' : 'Оформить заказ'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

function Header() {
  const dispatch = useDispatch()
  const user = useSelector(selectUser)
  
  useEffect(() => {
    dispatch(fetchUser())
  }, [dispatch])

  return (
    <header className="header">
      <h1>🛒 Интернет-магазин</h1>
      <div className="user-info">
        {user ? (
          <span>Привет, {user.name}!</span>
        ) : (
          <span>Загрузка...</span>
        )}
      </div>
    </header>
  )
}

export default App
