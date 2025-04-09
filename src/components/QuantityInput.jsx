import { useState, useEffect } from "react"

const QuantityInput = ({ value, onChange, onBlur, min = 1, max = 99 }) => {
  const [inputValue, setInputValue] = useState(value.toString())

  useEffect(() => {
    setInputValue(value.toString())
  }, [value])

  const handleChange = (e) => {
    setInputValue(e.target.value)
    onChange(e.target.value)
  }

  const handleBlur = () => {
    let newValue = Number.parseInt(inputValue)

    if (isNaN(newValue) || newValue < min) {
      newValue = min
      setInputValue(min.toString())
    } else if (max && newValue > max) {
      newValue = max
      setInputValue(max.toString())
    }

    onBlur(newValue)
  }

  const increment = () => {
    const newValue = Number.parseInt(inputValue) + 1
    if (!max || newValue <= max) {
      setInputValue(newValue.toString())
      onChange(newValue.toString())
      onBlur(newValue)
    }
  }

  const decrement = () => {
    const newValue = Math.max(min, Number.parseInt(inputValue) - 1)
    setInputValue(newValue.toString())
    onChange(newValue.toString())
    onBlur(newValue)
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.target.blur()
    }
  }

  return (
    <div className="relative flex w-24 h-10 border">
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        onBlur={handleBlur}
        onKeyPress={handleKeyPress}
        className="w-full h-full text-center px-2"
      />
      <div className="absolute right-0 inset-y-0 flex flex-col border-l">
        <button
          type="button"
          onClick={increment}
          className="flex-1 flex items-center justify-center hover:bg-gray-100 px-1"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <div className="border-t w-full"></div>
        <button
          type="button"
          onClick={decrement}
          className="flex-1 flex items-center justify-center hover:bg-gray-100 px-1"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default QuantityInput

