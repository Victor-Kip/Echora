import { Feather } from '@expo/vector-icons';
import { Drawer } from 'expo-router/drawer';

export default function DrawerLayout() {
  return (
    <Drawer screenOptions={{headerShown:false}}>
         <Drawer.Screen name="(tabs)" 
         options={{
          drawerItemStyle:{display:'none'}
         }}  />
         <Drawer.Screen name="(artist)" 
         options={{
          drawerItemStyle:{display:'none'}
         }}/>
         <Drawer.Screen name="settings" options={{
             drawerLabel: 'Settings',
             title: 'Settings',
             drawerIcon:()=><Feather name="settings" size={24} color="black" />
             }} 
        />
         <Drawer.Screen name="account" options={{ 
            drawerLabel: 'Account',
            title: 'Account',
            drawerIcon:()=><Feather name="user" size={24} color="black" />
             }} 
        />
    </Drawer>
  );
}