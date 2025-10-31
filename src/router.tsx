import { createBrowserRouter } from "react-router-dom";

import SignUp from "./views/page/auth/signUp.tsx";
import SignIn from "./views/page/auth/signIn.tsx";
import HomePage from "./views/page/homePage.tsx";


const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage />
    },

    {
        path: "/signin",
        element: <SignIn />
    },
    {
        path: "/signup",
        element: <SignUp />
    }
])

export default router;