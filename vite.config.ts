import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'


// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    base: "/cycling-profile/",
    plugins: [react()],
  }
})
