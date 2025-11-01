import { createBrowserRouter } from "react-router-dom";
import SignUp from "./views/page/auth/signUp.tsx";
import SignIn from "./views/page/auth/signIn.tsx";
/*
import HomePage from "./views/page/homePage.tsx";
*/
import RestaurantDetail from "./views/page/restaurantDetail.tsx";
import RestaurantPage from "./views/page/resturent.tsx";


const router = createBrowserRouter([
    {
        path: "/",
        element: <RestaurantPage />
    },
    {
        path: "/restaurant/:id",
        element: <RestaurantDetail />
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