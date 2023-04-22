import { AuthLayout } from "../views/AuthGroup/AuthLayout";
import { LoginPage } from "../views/AuthGroup/LoginPage";
import { SignupPage } from "../views/AuthGroup/SignupPage";
import { HistoryPage } from "../views/HistoryPage";
import { HomePage } from "../views/HomePage";
import { MainLayout } from "../views/layouts/MainLayout";

export const protectedRoutes = [
    { path: '/', element: <MainLayout />, children: [
        { index: true, element: <HomePage /> },
        { path: 'history', element: <HistoryPage /> },
    ]}
]

export const router = [
    { path: '/', element: <AuthLayout />, children: [
        { index: true, element: <LoginPage /> },
        { path: 'signup', element: <SignupPage /> }
    ]},
]
