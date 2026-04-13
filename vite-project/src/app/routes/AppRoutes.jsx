import { Routes, Route } from 'react-router-dom' 
import { AuthPage } from '../../features/Auth/Page/AuthPage.jsx'

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />
    </Routes>
  )
}
