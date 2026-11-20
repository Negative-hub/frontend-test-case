import Header from './components/Header'
import ProductList from './components/ProductList'
import Cart from './components/Cart'

import './App.css'

function App() {
  return (
    <div className="app">
      <Header />
      <div className="main-content">
        <ProductList />
        <Cart />
      </div>
    </div>
  )
}

export default App
