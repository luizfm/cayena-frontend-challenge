import { ThemeContext } from '@/src/contexts/ThemeContext'
import ProtectedRoute from '@/src/routes/ProtectedRoute/ProtectedRoute'
import { useContext } from 'react'

import styles from './styles.module.scss'
import { Outlet } from 'react-router-dom'
import usePageDetails from '@/src/hooks/usePageDetails'
import { Switch } from '@/src/components/Switch'
import { Button } from '@/src/components/Button'

function MainLayout() {
  const { onThemeChange } = useContext(ThemeContext)
  const { pageTitle, backTo } = usePageDetails()

  return (
    <ProtectedRoute>
      <header className={styles['c-main-layout__header']}>
        <h1 className={styles['c-main-layout__page-title']}>{pageTitle}</h1>
        <div className={styles['c-main-layout__buttons-wrapper']}>
          {backTo && (
            <Button variant="secondary" to={backTo}>
              &#x2190;
            </Button>
          )}
          <Switch onCheckedChange={onThemeChange} />
        </div>
      </header>
      <main className={styles['c-main-layout__main-content']}>
        <Outlet />
      </main>
    </ProtectedRoute>
  )
}

export default MainLayout
