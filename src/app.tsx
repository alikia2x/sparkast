import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./i18n";
import Homepage from "pages";
import AboutPage from "pages/about";
import LicensePage from "pages/about/license";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Homepage />
    },
    {
        path: "about",
        element: <AboutPage />,
        children: [
            {
                path: "license",
                element: <LicensePage />
            }
        ]
    }
]);

export function App() {
    return (
        <div className="relative bg-white dark:bg-black dark:text-white min-h-screen w-screen">
            <RouterProvider router={router} />
        </div>
    );
}
