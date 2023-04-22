import { Outlet } from "react-router-dom"
import { AppHeader } from "../../components/AppHeader"


export const MainLayout = () => {

    return (
        <>
            <AppHeader />
            <main>
                <Outlet />
            </main>
            <footer>

            </footer>
        </>
    )
}