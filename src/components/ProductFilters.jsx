import { useState } from 'react'
import { CATEGORIES, SORT_OPTIONS } from '../constants/products'

function ProductFilters({
  searchTerm,
  onSearchChange,
  category,
  onCategoryChange,
  sortBy,
  onSortChange,
}) {
  const [showFilters, setShowFilters] = useState(false)

  return (
    <div className="filters">
      <div className="search">
        <input
          type="text"
          placeholder="Поиск товаров..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <div className="filter-controls">
        {showFilters && (
          <>
            <select
              value={category}
              onChange={(e) => onCategoryChange(e.target.value)}
            >
              {CATEGORIES.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
            >
              {SORT_OPTIONS.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </>
        )}

        <button onClick={() => setShowFilters((prev) => !prev)}>
          {showFilters ? 'Скрыть фильтры' : 'Показать фильтры'}
        </button>
      </div>
    </div>
  )
}

export default ProductFilters
