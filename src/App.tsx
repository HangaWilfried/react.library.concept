import { createBrowserRouter, RouterProvider } from "react-router"
import { AuthProvider } from "./context/auth.context"
import routes from "./routes"

export default function App() {
    const router = createBrowserRouter(routes);

    return (
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
    )
}