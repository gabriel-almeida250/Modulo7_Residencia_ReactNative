import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const { Screen, Navigator} = createNativeStackNavigator();

import Home from "../pages/Home";
import Login from "../pages/Login";

const StackRoutes = () => {
    return(
    <Navigator>
        <Screen 
        name='home'
        component={Home}
        />
        <Screen 
        name='login'
        component={Login}
        />
    </Navigator>
    )
}

export default StackRoutes;