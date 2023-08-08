import { createBrowserRouter } from 'react-router-dom'

import {
  LOGIN_PATH_DETAILS,
  SUPPLIERS_PATH_DETAILS,
  SUPPLIER_DETAILS_PATH_DETAILS,
} from '../constants/routes'
import { ListSuppliersPage } from '@/pages/list-suppliers'
import { SupplierDetailsPage } from '@/pages/supplier-details'
import { LoginPage } from '@/pages/login'
import { MainLayout } from '@/layouts/MainLayout'

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
