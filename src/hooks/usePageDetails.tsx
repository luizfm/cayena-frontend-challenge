import { matchRoutes, useLocation } from 'react-router-dom'
import { ROUTES_DETAILS_LIST } from '../constants/routes'

function usePageDetails() {
  const location = useLocation()
  const matches = matchRoutes(ROUTES_DETAILS_LIST, location)?.[0]

  const route = matches?.route

  return {
    pageTitle: route?.pageTitle,
    backTo: route?.backTo,
  }
}

export default usePageDetails
