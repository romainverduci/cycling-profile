import { useEffect, useState } from 'react'

function getStorageValue(key: string, defaultValue: string | undefined) {
  const saved = localStorage.getItem(key)
  const initial = saved && JSON.parse(saved)
  return initial || defaultValue
}

export const useLocalStorage = (
  key: string,
  defaultValue: string | undefined
) => {
  const [value, setValue] = useState(() => getStorageValue(key, defaultValue))

  useEffect(() => {
    value && localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue, () => localStorage.removeItem(key)]
}
