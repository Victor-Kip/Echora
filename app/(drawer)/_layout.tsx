import { useAuth } from "@/context/auth";
import { Feather } from "@expo/vector-icons";
import { Drawer } from "expo-router/drawer";

export default function DrawerLayout() {
  const { role } = useAuth();
  return (
    <Drawer
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: "#a5b4fc",
        drawerInactiveTintColor: "#e0e7ff",
        drawerStyle: {
          backgroundColor: "#4338ca",
        },
      }}
    >
      {role === "artist" && (
        <Drawer.Screen
          name="(artist)"
          options={{
            drawerItemStyle: { display: "none" },
            title: "artist dashboard",
          }}
        />
      )}
      {role === "user" && (
        <Drawer.Screen
          name="(tabs)"
          options={{
            drawerItemStyle: { display: "none" },
            title: "user dashboard",
          }}
        />
      )}
      <Drawer.Screen
        name="account"
        options={{
          drawerLabel: "Account",
          title: "Account",
          drawerIcon: ({ color }) => (
            <Feather name="user" size={24} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="settings"
        options={{
          drawerLabel: "Settings",
          title: "Settings",
          drawerIcon: ({ color }) => (
            <Feather name="settings" size={24} color={color} />
          ),
        }}
      />
    </Drawer>
  );
}
