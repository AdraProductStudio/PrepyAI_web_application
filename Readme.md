# 🧩 Project Setup Guide

This project is based on React and uses a shared layout repository as a submodule. It also includes several essential packages for development, state management, UI rendering, routing, and utility functions.

---

## 🔄 Replace `src` Folder with Git Submodule

If you're integrating the common layout from another repository:

### Steps:

1. **Delete the actual `src` folder** (optional, or move it somewhere as backup):

    ```bash
    rm -rf src
    ```

2. **Add the submodule:**

    ```bash
    git submodule add https://github.com/AdraProductStudio/adra-frontend-layout.git src
    ```

3. **Commit the changes:**

    ```bash
    git commit -m "Replaced src with submodule"
    ```

4. **Push to your repository:**

    ```bash
    git push origin main
    ```

---

## 📦 Required Basic Packages

This project requires the following packages:

### ✅ Package List

- [@reduxjs/toolkit](https://www.npmjs.com/package/@reduxjs/toolkit) – Redux state management
- [axios](https://www.npmjs.com/package/axios) – Promise-based HTTP client
- [bootstrap](https://www.npmjs.com/package/bootstrap) – Front-end CSS framework
- [crypto-js](https://www.npmjs.com/package/crypto-js) – Cryptographic algorithms
- [js-cookie](https://www.npmjs.com/package/js-cookie) – Cookie utilities
- [react-dropdown-select](https://www.npmjs.com/package/react-dropdown-select) – Dropdown component
- [react-icons](https://www.npmjs.com/package/react-icons) – Popular icon library
- [react-paginate](https://www.npmjs.com/package/react-paginate) – Pagination component
- [react-redux](https://www.npmjs.com/package/react-redux) – React bindings for Redux
- [react-router-dom](https://www.npmjs.com/package/react-router-dom) – React routing
- [react-toastify](https://www.npmjs.com/package/react-toastify) – Toast notifications
- [react-bootstrap](https://www.npmjs.com/package/react-bootstrap) – Bootstrap components in React

---

## 📥 Installation

To install all required packages, run:

```bash
  npm install @reduxjs/toolkit axios bootstrap crypto-js js-cookie react-dropdown-select react-icons react-paginate react-redux react-toastify react-router-dom react-bootstrap --save
 ```
---

## Add jsconfig.json in the root folder

```bash
'{
  "compilerOptions": {
    "baseUrl": "src",
    "paths": {
      "Components/*": ["Components/*"],
      "ResuableFunctions/*": ["ResuableFunctions/*"],
      "Stylesheet/*": ["Stylesheet/*"],
      "Assets/*": ["Assets/*"],
      "Services/*": ["Services/*"],
      "Security/*":["Security/*"],
      "Utils/*": ["Utils/*"],
      "Views/*": ["Views/*"]
    }
  },
  "include": ["src"]
}'
```
---

## Add vite.config.js in the root folder
```bash
'
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
  }
})
'
```
---

## Basic env 

```bash
  VITE_APP_API_URL = 
  VITE_APP_CRYPTO_SECRET_KEY =
```
---