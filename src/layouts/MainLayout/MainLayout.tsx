import { ThemeContext } from '@/contexts/ThemeContext'
import ProtectedRoute from '@/routes/ProtectedRoute/ProtectedRoute'
import { useContext } from 'react'

import styles from './styles.module.scss'
import { Outlet } from 'react-router-dom'
import usePageDetails from '@/hooks/usePageDetails'
import { Switch } from '@/components/Switch'
import { Button } from '@/components/Button'

function MainLayout() {
  const { onThemeChange } = useContext(ThemeContext)
  const { pageTitle, backTo } = usePageDetails()

  return (
    <ProtectedRoute>
      <header className={styles['c-main-layout__header']}>
        <h1 className={styles['c-main-layout__page-title']}>{pageTitle}</h1>
        <div className={styles['c-main-layout__buttons-wrapper']}>
          {backTo && (
            <Button variant="secondary" to={backTo} title="navigate back">
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
