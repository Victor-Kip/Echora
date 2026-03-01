import { Stack} from "expo-router";
import React from "react";

const _Layout = ()=>{
    return(
        <Stack
        screenOptions={{
        }}>
            <Stack.Screen
                name="dashboard"
                options={{
                    headerShown: false
                }}/>
        </Stack>
    )
}
export default _Layout;