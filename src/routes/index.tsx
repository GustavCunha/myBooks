import { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";

import { AppRoutes } from "./app.routes";
import { SignIn } from "../screens/SignIn";

export function Routes() {
    const [user, setUser] = useState(false)

    return (
        <NavigationContainer>
            {!user ? <AppRoutes /> : <SignIn /> }
        </NavigationContainer>
    )
}