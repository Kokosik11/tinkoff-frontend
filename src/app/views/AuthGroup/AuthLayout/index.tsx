import { Outlet } from "react-router-dom"
import { AuthForm } from "../../../components/AuthForm"

export const AuthLayout = () => {

    return (
        <section className="auth-page w-full">
            <AuthForm>
                <Outlet />
            </AuthForm>
        </section>
    )
}