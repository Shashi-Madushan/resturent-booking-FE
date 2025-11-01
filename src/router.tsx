import { createBrowserRouter } from "react-router-dom";

import SignUp from "./views/page/auth/signUp.tsx";
import SignIn from "./views/page/auth/signIn.tsx";
/*
import HomePage from "./views/page/homePage.tsx";
*/
import Resturent from "./views/page/resturent.tsx";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Resturent />
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