import { Stack, useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { AuthProvider, useAuth } from '../context/auth';
import './global.css';

const RootLayoutNav = () => {
  const { loading, role } = useAuth();
  const segments = useSegments();
  const router = useRouter();
  console.log(`Current role in layout: ${role}`);

  useEffect(() => {
    if (loading) return;
    const inAuthGroup = segments[0] === '(auth)';
    const inArtistGroup = segments[0] === '(artist)';
    const inUserGroup = segments[0] === '(tabs)';
    const isAuthenticated = !!role;
    if (!isAuthenticated && !inAuthGroup) {
      router.replace('/(auth)/userlogin');
    } else if (isAuthenticated && inAuthGroup) {
      if (role === 'artist' && !inArtistGroup) {
        router.replace('/(artist)/dashboard');
      } else if (role === 'user' && !inUserGroup) {
        router.replace('/(tabs)');
      }
    }
  }, [loading, segments, role]);

  if (loading) {
    return (
      <>
        <View className='flex-1 justify-center items-center'>
          <ActivityIndicator size="large" />
        </View>
      </>
    );
  }

  let initialRouteName = undefined;
  if (role === 'artist') {
    initialRouteName = '(artist)';
  } else if (role === 'user') {
    initialRouteName = '(tabs)';
  }

  return (
    <Stack initialRouteName={initialRouteName}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="songs/[id]" options={{ headerShown: false }} />
      <Stack.Screen name="(artist)" options={{ headerShown: false }} />
    </Stack>
  );
};

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  );
}
