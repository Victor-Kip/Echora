import { Stack, useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { AuthProvider, useAuth } from '../context/auth';
import './global.css';

const RootLayoutNav = () => {
  const {loading,role} = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    const inAuthGroup = segments[0] === '(auth)';
    const isAuthenticated = !!role;
    if ( !isAuthenticated && !inAuthGroup) {
      router.replace('/(auth)/userlogin' );
    } else if (isAuthenticated && inAuthGroup) {
      // Redirect based on role
      if (role === 'artist') {
        router.replace('/(artist)/dashboard' );
      } else {
        router.replace('/(tabs)');
      }
    }
  }, [loading, segments, role]);
  if(loading){
    return <>
    <View className='flex-1 justify-center items-center'>
      <ActivityIndicator size="large" />
    </View>
    </>;
  }
  return (
  <Stack>
    <Stack.Screen
    name="(tabs)"
    options={{headerShown:false}}
    />
      <Stack.Screen
    name="(auth)"
    options={{headerShown:false}}
    />
    <Stack.Screen
    name="songs/[id]"
    options={{headerShown:false}}
    />
          <Stack.Screen
    name="(artist)"
    options={{headerShown:false}}
    />
  </Stack>);
}
export default function RootLayout(){
  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  );
};
