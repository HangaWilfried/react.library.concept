import { lazy } from "react";
import { RouteObject } from "react-router";
import AuthGuard from "../components/guards/AuthGuard";
import Guard from "../components/guards/ComponentGuard";

const UserListPage = lazy(() => import("./UserListPage"));
const UserDetailsPage = lazy(() => import("./UserDetailsPage"));


export default [
    {
        path: "/",
        Component: AuthGuard,
        children: [
            {
                index: true,
                element: <Guard requiredScope="user:read:all"><UserListPage /></Guard>
            },
            {
                path: ":id",
                element: <Guard requiredScope="user:read"><UserDetailsPage /></Guard>
            }
        ],
    },
    {
        path: "/login",
        lazy: {
            Component: async () => (await import("./LoginPage")).default
        },
    },
    {
        path: "/register",
        lazy: {
            Component: async () => (await import("./RegisterPage")).default
        },
    },
    {
        path: "/403",
        lazy: {
            Component: async () => (await import("./ForbiddenPage")).default
        }
    },
    {
        path: "*",
        lazy: {
            Component: async () => (await import("./NotFoundPage")).default
        }
    }
] as const satisfies RouteObject[];