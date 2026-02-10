import { Tabs } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

const TabIcon = ({focused,title}:any)=>{
    return(
    <View style={{
        alignItems:"center",
        margin:"auto"
        }} >
    <Text style={{
        fontSize:10,
        color:"white"
        }}>
        {title}
    </Text>
    </View>
    )
}

const _Layout = ()=>{
    return(
        <Tabs
        screenOptions={{
            tabBarShowLabel:false,
            tabBarItemStyle:{
                alignItems:"center",
                justifyContent:"center",
                width:"100%",
                height:"100%"
            },
            tabBarStyle: {
                backgroundColor:"#312d70",
                borderRadius:10,
                height:52,
                marginHorizontal:5,
                marginBottom:36,
                position:"absolute",
                borderWidth:1,
                borderColor:"gray",
            }
            }
        }>
            <Tabs.Screen
            name="index"
            options={{
                headerShown:false,
                tabBarIcon:({focused})=>(
                    <TabIcon
                    focused = {focused}
                    title = 'Home'/>
                )
            }}
            />
            <Tabs.Screen
            name="discover"
            options={{
                headerShown:false,
                tabBarIcon:({focused})=>(
                    <TabIcon
                    focused = {focused}
                    title = 'Discover'/>
                )
            }}
            />
            <Tabs.Screen
            name="connect"
            options={{
                headerShown:false,
                tabBarIcon:({focused})=>(
                    <TabIcon
                    focused = {focused}
                    title = 'Connect'/>
                )
            }}
            />
            <Tabs.Screen
            name="items"
            
            options={{
                headerShown:false,
                tabBarIcon:({focused})=>(
                    <TabIcon
                    focused = {focused}
                    title = 'Items'/>
                )
            }}
            />
            <Tabs.Screen
            name="settings"
            options={{
                headerShown:false,
                tabBarIcon:({focused})=>(
                    <TabIcon
                    focused = {focused}
                    title = 'Settings'/>
                )
            }}
            />
        </Tabs>
    )
}
export default _Layout;