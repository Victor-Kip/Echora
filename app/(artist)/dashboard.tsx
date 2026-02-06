import { Feather } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import React, { useState } from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from '@/context/auth';
import Stats from './stats'
import Earnings from './earnings'

const url = 'http://10.218.252.202:5000/audio/new';
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
                    <View className='border-2 border-solid border-blue-300 rounded-2xl items-center justify-center py-10 mb-6 bg-gray-100'>
                        <Feather name="upload" size={48} color="gray" className='mb-3' />
                        <Text className='text-gray-400 text-center px-8 py-3 mb-4'>Drag and drop your audio files here</Text>
                        <TouchableOpacity className='bg-blue-100 px-8 py-3 rounded-xl'
                        onPress={handlePickDocument}>
                            <Text className='font-bold text-gray-700'>Upload Audio</Text>
                        </TouchableOpacity>
                        {selectedFile && (
                            <Text className='text-green-600 mt-4'>Selected File: {selectedFile.name}</Text>
                        )}
                    </View>
                    <Text className="text-white text-lg font-semibold mb-2">Song Name</Text>
                    <TextInput
                    className='bg-gray-100 rounded-xl p-4 mb-6 text-white border border-gray-100'
                    placeholder='input song name'
                    value={songName}
                    onChangeText={setSongName}
                    placeholderTextColor="gray-400"/>
                    <View className='flex-row justify-between mb-8'>
                        <View className='flex-1 mr-4'>
                            <Text className='text-white font-semibold text-lg mb-2 mt-2 ml-1'>Genre</Text>
                            <View className='border-2 border-solid  border-blue-300 rounded-xl bg-gray-50 p-2 '>
                                <TextInput
                                    placeholder="input genre"
                                className='text-black'
                                value={genre}
                                onChangeText={setGenre}
                                placeholderTextColor="gray-400"/>
                            </View>
                        </View>
                        <View className='w-1/3'>
                            <Text className='text-white font-semibold mb-3 text-center text-xs'>Upload cover image (optional)</Text>
                            <TouchableOpacity onPress={handlePickCoverImage}  className="items-center">
                                <View className="bg-white border-2 p-2 rounded-xl border-blue-300 border-solid">
                                {selectedCoverImage ? (<Text className='text-white text-center'>{selectedCoverImage.name}</Text>) : <Feather name="image" size={32} color="gray" />}
                                </View>
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
                    <Stats/>
                );
            case 'earnings':
                return (
                    <Earnings/>
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
                        <TouchableOpacity className={`px-6 py-2 rounded-full ${activeTab === "dashboard" ? "bg-blue-500":""}`}
                        onPress={() => setActiveTab('dashboard')}>
                            <Text className='text-white font-semibold'>Dashboard</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className={`px-6 py-2 rounded-full ${activeTab === "stats" ? "bg-blue-500":""}`}
                        onPress={() => setActiveTab('stats')}>
                            <Text className='text-white font-semibold'>Stats</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className={`px-6 py-2 rounded-full ${activeTab === "earnings" ? "bg-blue-500":""}`}
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