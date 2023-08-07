import { createBrowserRouter } from 'react-router-dom'
import { LoginPage } from '@/src/pages/login'
import { ListSuppliersPage } from '@/src/pages/list-suppliers'
import { SupplierDetailsPage } from '@/src/pages/supplier-details'
import MainLayout from '../layouts/MainLayout/MainLayout'
import {
  LOGIN_PATH_DETAILS,
  SUPPLIERS_PATH_DETAILS,
  SUPPLIER_DETAILS_PATH_DETAILS,
} from '../constants/routes'

export const routes = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: SUPPLIERS_PATH_DETAILS.path,
        element: <ListSuppliersPage />,
      },
      {
        path: SUPPLIER_DETAILS_PATH_DETAILS.path,
        element: <SupplierDetailsPage />,
      },
    ],
  },
  {
    path: LOGIN_PATH_DETAILS.path,
    element: <LoginPage />,
  },
])
