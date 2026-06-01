import { Feather } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

const TabIcon = ({ focused, title }: any) => {
  return (
    <View
      style={{
        alignItems: "center",
        margin: "auto",
      }}
    >
      <Text
        style={{
          fontSize: 10,
          color: "white",
        }}
      >
        {title}
      </Text>
    </View>
  );
};

const _Layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#3B82F6",
        tabBarInactiveTintColor: "#94a3b8",
        tabBarItemStyle: {
          borderRadius: 32,
          height: 40,
          marginHorizontal: 5,
          alignItems: "center",
          justifyContent: "center",
          backgroundImage: "url(../../assets/highlight.png)",
        },
        tabBarStyle: {
          backgroundColor: "#312d70",
          borderRadius: 32,
          height: 42,
          marginHorizontal: 5,
          position: "absolute",
          alignItems: "center",
          justifyContent: "center",
          borderTopWidth: 0,
          bottom: 40,
          left: 20,
          right: 20,
          paddingBottom: 0,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color }) => (
            <>
              <Feather
                name="home"
                size={focused ? 28 : 22}
                color={color}
                style={{ position: "absolute", top: 2 }}
              />
            </>
          ),
        }}
      />
      <Tabs.Screen
        name="discover"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color }) => (
            <>
              <Feather
                name="search"
                size={focused ? 28 : 22}
                color={color}
                style={{ position: "absolute", top: 2 }}
              />
            </>
          ),
        }}
      />
      <Tabs.Screen
        name="items"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color }) => (
            <>
              <Feather
                name="shopping-cart"
                size={focused ? 28 : 22}
                color={color}
                style={{ position: "absolute", top: 2 }}
              />
            </>
          ),
        }}
      />
    </Tabs>
  );
};
export default _Layout;
