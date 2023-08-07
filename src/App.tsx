import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { routes } from './routes'
import ThemeContextProvider from './contexts/ThemeContext'

import './styles/global.module.scss'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeContextProvider>
        <RouterProvider router={routes} />
        <ToastContainer />
        <ReactQueryDevtools />
      </ThemeContextProvider>
    </QueryClientProvider>
  )
}

export default App
