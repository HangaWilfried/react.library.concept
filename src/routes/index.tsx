import { lazy } from "react";
import { RouteObject } from "react-router";

import { Scope } from "../utils/constants";

import AuthGuard from "../components/guards/AuthGuard";
import Guard from "../components/guards/PageAccessGuard";

const UserListPage = lazy(() => import("./UserListPage"));
const UserDetailsPage = lazy(() => import("./UserDetailsPage"));


export default [
    {
        path: "/",
        Component: AuthGuard,
        children: [
            {
                index: true,
                element: <Guard permission={Scope.UserReadAll}><UserListPage /></Guard>
            },
            {
                path: ":id",
                element: <Guard permission={Scope.UserRead}><UserDetailsPage /></Guard>
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