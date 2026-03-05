import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../context/auth';

export default function Account() {
  const {user} = useAuth()
  return (
    <SafeAreaView className='p-4 flex-1 bg-primary justify-center items-center'>
      <Text className='text-white text-2xl font-bold'>Account details</Text>
      <Text className='text-white text-lg'>Username:{user?.username || 'N/A'}</Text>
      <Text className='text-white text-lg'>Email:{user?.email || 'N/A'}</Text>
    </SafeAreaView>
  );
}