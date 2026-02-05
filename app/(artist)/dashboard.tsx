import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { Button } from '@react-navigation/elements';
import * as DocumentPicker from 'expo-document-picker';
import React, { useState } from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from '../../context/auth';

const url = 'http://192.168.1.22:5000/audio/new';
const Dashboard = () => {
    const [activeTab,setActiveTab] = useState<'dashboard'|'stats'|'earnings'>('dashboard');
    const {signOut} = useAuth();
    const [selectedFile, setSelectedFile] = useState<DocumentPicker.DocumentPickerAsset| null>(null);
    const [selectedCoverImage, setSelectedCoverImage] = useState<DocumentPicker.DocumentPickerAsset| null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [error,setError] = useState<string | null>(null);
    const [successMessage,setSuccessMessage] = useState<string | null>(null);
    const [songName, setSongName] = useState('');
    const [genre, setGenre] = useState('');

    const handlePickDocument = async () => {
        setSelectedFile(null);
        setError(null);
        setSuccessMessage(null);

        try{
            const result = await DocumentPicker.getDocumentAsync({
                type:'audio/*',
                copyToCacheDirectory:true,
            });
            if(!result.canceled && result.assets && result.assets.length > 0){
                setSelectedFile(result.assets[0]);
                console.log('Selected file:', result.assets[0]);
        }
        }
        catch (err){
            console.log('Document pick error:', err);
            setError('Failed to pick audio file. Please try again.');
        }
    };
    const handlePickCoverImage = async () => {
        setSelectedCoverImage(null);
        try{
            const result = await DocumentPicker.getDocumentAsync({
                type:'image/*',
            copyToCacheDirectory:true,
            });
            if(!result.canceled && result.assets && result.assets.length > 0){
                setSelectedCoverImage(result.assets[0]);
            }
        }
        catch (err){
            console.log('Cover image pick error:', err);
            setError('Failed to pick cover image. Please try again.');
        }
    };
    const handleUpload = async () => {
        if(!selectedFile){
            console.log('No file selected');
            return;
        }
        if(!songName.trim()){
            console.log('Missing song name');
            return;
        }
        if(!genre.trim()){
            console.log('Missing genre');
            return;
        }
    

    const formData = new FormData();
    formData.append('audio', {
        uri: selectedFile.uri,
        name: selectedFile.name,
        type: selectedFile.mimeType || 'application/octet-stream',
    } as any);
    formData.append('songName', songName);
    formData.append('genre', genre);
    if (selectedCoverImage){
        formData.append('coverImage', {
            uri: selectedCoverImage.uri,
            name: selectedCoverImage.name,
            type: selectedCoverImage.mimeType || 'application/octet-stream',
        } as any);
    }
    setIsUploading(true);
    setError(null);
    setSuccessMessage(null);
    try{
        const response = await fetch(url, {
            method:'POST',
            headers:{},
            body: formData,
        })
        
    const responseJson = await response.json();
    if(!response.ok){
        setError(responseJson.message || 'Upload failed');
        console.log('Upload failed:', responseJson);
    }
    setSuccessMessage(`Successfully uploaded ${responseJson.fileName}   `);
    console.log('Upload successful:', responseJson);
    setSelectedFile(null);
    }
    catch (err: any){
        setError(err.message || 'Upload failed');
        console.log('Upload error:', err);
    }
    finally {
        setIsUploading(false);
    }}
    const showContent = () => {
        switch(activeTab){
            case 'dashboard':
                return (
                    <View>
                    <Text className="text-white text-2xl font-bold mb-4">Upload audio</Text>
                    <View className='border-2 border-dashed border-blue-300 rounded-2xl items-center justify-center py-10 mb-6 bg-gray-100'>
                        <Feather name="upload" size={48} color="gray" className='mb-3' />
                        <Text className='text-gray-400 text-center px-8 py-3 mb-4'>Drag and drop your audio files here</Text>
                        <TouchableOpacity className='bg-blue-100 px-8 py-3 rounded-xl'
                        onPress={handlePickDocument}>
                            <Text className='font-bold text-gray-700'>Upload Audio</Text>
                        </TouchableOpacity>
                        {selectedFile && (
                            <Text className='text-green-600 mt-4'>Selected File: {selectedFile.name}</Text>
                        )}
                        <View className='mt-6'>
                            <Button 
                            title = {isUploading ? 'Uploading...' : 'Upload'}
                            onPress={handlePickDocument}
                            disabled = {!selectedFile || isUploading}/>
                        </View>
                    </View>
                    <Text className="text-white text-lg font-semibold mb-2">Song Name</Text>
                    <TextInput
                    className='bg-gray-100 rounded-xl p-4 mb-6 text-white border border-gray-100'
                    placeholder='song name'
                    value={songName}
                    onChangeText={setSongName}
                    placeholderTextColor="gray-50"/>
                    <View className='flex-row justify-between mb-8'>
                        <View className='flex-1 mr-4'>
                            <Text className='text-white font-semibold text-lg mb-2 ml-1'>Genre</Text>
                            <View className='border-2 border-dashed border-blue-300 rounded-xl h-32 bg-gray-50 p-2'>
                                <TextInput
                                className='flex-1 text-black'
                                multiline
                                value={genre}
                                onChangeText={setGenre}/>
                            </View>
                        </View>
                        <View className='w-1/3'>
                            <Text className='text-white font-semibold mb-2 text-center text-xs'>Upload cover image (optional)</Text>
                            <TouchableOpacity onPress={handlePickCoverImage}>
                                {selectedCoverImage ? (<Text className='text-gray-700 text-center'>{selectedCoverImage.name}</Text>) : <Feather name="image" size={32} color="gray" />}
                            </TouchableOpacity>
                        </View>
                    </View>
                    <TouchableOpacity 
                    onPress={handleUpload}
                    disabled={isUploading}
                    className='bg-blue-300 px-6 py-3 rounded-xl items-center  mb-10'>
                        <Text className='text-white font-bold text-lg'>Publish Track</Text>
                    </TouchableOpacity>
                
                    </View>
            );
            case 'stats':
                return (
                    <View className="flex-1 ">
                         <Text className="text-white text-2xl font-bold">Stats </Text>
                         <View className='bg-gray-100 rounded-2xl p-5 mb-4  '>
                            <View className='flex-row justify-between items-center mb-4'>
                                <View className='flex-row items-center'>
                                    <View className='bg-indigo-300 p-3 rounded-full mr-3'>
                                        <Feather name="play" size={24} color="white" className='ml-1'/>
                                    </View>
                                    <Text className='text-indigo-900 font-bold text-lg'>Total Plays</Text>
                                </View>
                                <Text className='text-indigo-900 font-bold text-2xl'>0</Text>
                            </View>
                            <View className='flex-row justify-between items-end mt-2'>
                                <View>
                                    <Text className='text-indigo-900 font-bold text-lg'>Recent Plays</Text>
                                    <Text className='text-indigo-900 text-sm '>(Last 7 days)</Text>
                                </View>
                                    <View className='flex-row items-end justify-between gap-1 h-16'>
                                        {[10, 15, 12, 20, 25, 30, 28, 35].map((h,i) =>( 
                                        <View key={i} style={{height:h,width:12}} className='bg-indigo-900 rounded-t-sm opacity-50'></View>
                                         ))}
                                    </View>
                            </View>
                            <Text className=' text-right text-indigo-400 text-sm mt-4'>30 listeners</Text>
                         </View>    
                         <View className='bg-gray-100 rounded-2xl p-5 mb-6  '>
                            <View className='flex-row justify-between items-center mb-4'>
                                <View className='flex-row items-center'>
                                    <View className='bg-indigo-300 p-3 rounded-full mr-3'>
                                        <MaterialCommunityIcons name="comment-outline" size={24} color="white" className='ml-1'/>
                                    </View>
                                    <Text className='text-indigo-900 font-bold text-lg'>Comments received</Text>
                                </View>
                                <Text className='text-indigo-900 font-bold text-2xl'>0</Text>
                            </View>
                            <View className="flex-row items-end gap-1 h-12 w-full">
                                <View className="flex-1 flex-row items-end justify-between px-2 h-full">
                                    {[ 20, 25, 30, 28, 35, 32, 40].map((h, i) => (
                                        <View key={i} style={{ height: h, width: 12 }} className="bg-indigo-900 rounded-t-sm opacity-50" />
                                         ))}
                                        </View>
                                </View>
                        </View>    
                        <Text className="text-white text-xl font-bold mb-4">Followers</Text>    
                        <View className='bg-gray-100 rounded-2xl p-5 mb-10 '>
                            <View className='flex-row justify-between items-start'>
                                <View className='flex-row items-center'>
                                    <View className='bg-indigo-300 p-3 rounded-full mr-3'>
                                        <Feather name="users" size={24} color="white" className='ml-1'/>
                                    </View>
                                    <Text className='text-indigo-900 font-bold text-lg'>Total Followers</Text>
                                </View>
                                <View className='items-end'>
                                    <Text className='text-indigo-900 font-bold text-2xl'>0</Text>
                                </View>
                            </View>
                            <View className=' flex-row justify-between mt-4 items-end'>
                                <View>
                                <Text className='text-indigo-900 font-bold text-lg'>Recent Followers</Text>
                                <Text className='text-indigo-900 text-sm '>(Last 7 days)</Text>
                                </View>
                                <View className='flex-row items-end justify-between gap-1 h-16'>
                                    {[5,7,11,19,20,23,33].map((h,i) =>( 
                                    <View key={i} style={{height:h,width:14}} className='bg-indigo-900 rounded-t-sm opacity-50'></View>
                                    ))}
                                </View>
                            </View>
                            <Text className=' text-right text-indigo-400 text-sm mt-4'>0 new followers</Text>
                        </View>           
                    </View>

                );
            case 'earnings':
                return (
                    <View className="flex-1  ">
                        <Text className="text-white text-2xl font-bold">Earnings </Text>
                        <View className='bg-gray-100 rounded-xl p-4 flex-row justify-between items-center mb-4 mt-1'>
                            <Text className='text-indigo-900 text-xl font-semibold'>Total Earnings</Text>
                            <Text className='text-indigo-900 font-bold text-2xl '>$0.00</Text>
                        </View>
                        <View className='bg-gray-100 rounded-xl p-4 mb-4'>
                            <View className='flex-row justify-between items-start mb-2'>
                                <View>
                                    <Text className='text-indigo-900 font-semibold text-lg '>Recent Earnings</Text>
                                    <Text className='text-indigo-900 text-sm '>(Last 7 days)</Text>
                                </View>
                                <Text className='text-indigo-900 font-bold text-2xl '>$0.00</Text>
                            </View>
                            <View className='h-16 w-full justify-end'>
                                <View className='flex-row items-end justify-between h-full px-1'>
                                    {[20, 25, 22, 30, 35, 45, 40, 50].map((h,i) =>(
                                    <View key={i} style={{height:h,width:23}} className='bg-indigo-900 rounded-t-sm opacity-50'></View>
                                    ))}
                                </View>
                                <View className='border-b border-indigo-300 w-full'/>
                            </View>
                        </View>   
                        <View className='bg-gray-100 rounded-xl p-4 flex-row justify-between items-center mb-4'>
                            <View className='flex-row items-center'>
                                <MaterialCommunityIcons name = 'wallet-outline' size={24} color="indigo"  className='mr-2'/>
                                <Text className='text-indigo-900 text-lg font-semibold'>Pending Payout</Text>
                            </View>
                            <Text className='text-indigo-900 font-bold text-2xl '>$0.00</Text>
                        </View>     
                        <TouchableOpacity className=' flex-row bg-blue-300 py-4 rounded-xl justify-center items-center mt-2 mb-8'>
                            <Text className='text-white font-bold text-lg mr-2'>Withdraw Funds</Text>
                            <Feather name="arrow-right" size={20} color="white" className='mt-1'/>
                        </TouchableOpacity>
                        <View className='flex-row items-center justify-between mb-4'>
                            <Text className='text-white font-bold text-xl'>Payout History</Text>
                        </View>   
                        {[
                            {amount:'$0.00',date:'Jan 1, 2024' },
                            {amount:'$0.00',date:'Dec 25, 2023' },
                            {amount:'$0.00',date:'Dec 18, 2023'},
                        ].map((payout, index) => (
                            <View key={index} className='bg-gray-100 rounded-xl p-4  items-center mb-4'>
                                <View className='flex-row justify-between mb-1'>
                                    <Text className='text-lg font-bold text-indigo-900'>{payout.amount}</Text>
                                    <Text className='text-indigo-900 text-lg ml-4'>{payout.date}</Text>
                                </View>
                                <Text className='text-indigo-400 text-sm'>Deposited to bank account</Text>
                            </View>
                        ))}  
                        <TouchableOpacity className=' flex-row justify-end items-center py-4 mb-10'>
                            <Text className='text-white font-semibold mr-1'>View all </Text>
                            <Feather name="chevron-right" size={16} color="white" className='mt-1'/>
                        </TouchableOpacity>      
                    </View>
                );
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-indigo-900 ">
                <ScrollView className="px-6 pt-4">
                    <View className="flex-row justify-between items-center mb-6">
                        <Text className="text-3xl font-bold text-white mb-6">Wavrr</Text>
                        <TouchableOpacity className="">
                            <Feather name="bell" size={24} color="white" />
                        </TouchableOpacity>
                    </View>
                    <View className='flex-row justify-between mb-8'>
                        <TouchableOpacity className='bg-blue-300 px-6 py-2 rounded-full'
                        onPress={() => setActiveTab('dashboard')}>
                            <Text className='text-white font-semibold'>Dashboard</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className=' px-6 py-2 rounded-full'
                        onPress={() => setActiveTab('stats')}>
                            <Text className='text-white font-semibold'>Stats</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className=' px-6 py-2 rounded-full'
                        onPress={() => setActiveTab('earnings')}>
                            <Text className='text-white font-semibold'>Earnings</Text>
                        </TouchableOpacity>
                    </View>
                    {showContent()}
                    <TouchableOpacity className='bg-red-500 px-6 py-3 rounded-xl items-center mb-10 mt-4'
                    onPress={signOut}>
                        <Text className='text-white font-bold text-lg'>Logout</Text>
                    </TouchableOpacity>
                </ScrollView>
        </SafeAreaView>
    );
};

export default Dashboard;