import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'
import Website from './pages/MainPage/components/Website.tsx'
import { Provider } from 'react-redux'
import { store } from './store/store.ts'
import Expense from './components/dashboard/Expense.tsx'
import Income from './components/dashboard/Income.tsx'
import Calendar from './components/dashboard/Calendar.tsx'
import Settings from './components/dashboard/Settings.tsx'
import Profile from './components/dashboard/Profile.tsx'
import Logout from './components/dashboard/Logout.tsx'
import LoginPage from './pages/LoginPage/components/LoginPage.tsx'
import RegisterPage from './pages/RegisterPage/components/RegisterPage.tsx'
import DashboardPage from './pages/DashboardPage/components/DashboardPage.tsx'
import { AuthLayout } from './modules/AuthLayout/index.ts'
import { DashboardMain } from './modules/DashboardMainContent/index.ts'

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <BrowserRouter>
            <Routes>
                <Route index element={<Website />}></Route>
                <Route element={<AuthLayout />}>
                    <Route path='login' element={<LoginPage />}></Route>
                    <Route path='register' element={<RegisterPage />}></Route>
                </Route>
                <Route path='dashboard' element={<DashboardPage />}>
                    <Route path='Main' element={<DashboardMain />} />
                    <Route path='expense' element={<Expense />} />
                    <Route path='income' element={<Income />} />
                    <Route path='calendar' element={<Calendar />} />
                    <Route path='settings' element={<Settings />} />
                    <Route path='profile' element={<Profile />} />
                    <Route path='logout' element={<Logout />} />
                </Route>
            </Routes>
        </BrowserRouter>
    </Provider>
)
