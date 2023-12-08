import { useEffect, useState } from 'react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getStorageValue(key: string, defaultValue?: any) {
  const saved = localStorage.getItem(key)
  const initial = saved && JSON.parse(saved)
  return initial || defaultValue
}

export const useLocalStorage = (
  key: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  defaultValue?: any
) => {
  const [value, setValue] = useState(() => getStorageValue(key, defaultValue))

  useEffect(() => {
    value && localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue, () => localStorage.removeItem(key)]
}
