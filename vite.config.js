import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'Components': path.resolve(__dirname, 'src/Components'),
      'ResuableFunctions': path.resolve(__dirname, 'src/ResuableFunctions'),
      'Stylesheet': path.resolve(__dirname, 'src/Stylesheet'),
      'Assets': path.resolve(__dirname, 'src/Assets'),
      'Services': path.resolve(__dirname, 'src/Services'),
      'Security': path.resolve(__dirname, 'src/Security'),
      'Utils': path.resolve(__dirname, 'src/Utils'),
      'Views': path.resolve(__dirname, 'src/Views'),
    }
  },
  extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
})