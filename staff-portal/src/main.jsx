import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './components/shared/Layout.jsx'
import ImportScreen from './pages/ImportScreen.jsx'

const router = createBrowserRouter([{
  
  path:"/",
  element: <Layout/>,
  children:[{
path:"import",element:<ImportScreen/>,
  },],
}
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
