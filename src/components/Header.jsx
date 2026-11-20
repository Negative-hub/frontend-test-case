import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUser, selectUser } from '../store'

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
        <span>{user ? `Привет, ${user.name}!` : 'Загрузка...'}</span>
      </div>
    </header>
  )
}

export default Header
