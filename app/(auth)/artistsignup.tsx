import axios from "axios";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import api from "../services/api";

const ArtistSignup = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [genre, setGenre] = useState("");

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      const response = await api.post("/auth/artist-register", {
        username,
        email,
        password,
        genre,
      });
      if (response.data.success) {
        alert("Signup successful! Please log in.");
        router.replace("/(auth)/artistlogin");
      }
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        const errorMsg = error.response?.data?.message || "Signup failed";
        alert(errorMsg);
      } else {
        alert("An unexpected error occurred during signup.");
      }
    }
  };
  return (
    <SafeAreaView className="flex-1 justify-center items-center bg-indigo-900">
      <Text className="text-5xl text-white font-bold mb-3">ECHORA</Text>
      <Text className="text-lg text-white  mb-8">Music with Community</Text>
      <Text className="text-2xl text-white font-bold mb-5">
        Artist Registration
      </Text>
      <Text className="text-white font-bold mb-4">
        Create an account using your email and password
      </Text>
      <View className="flex-row items-center mb-4 "></View>
      <TextInput
        value={genre}
        onChangeText={setGenre}
        placeholder="Genre"
        keyboardType="default"
        autoCapitalize="none"
        className="w-72 h-12 bg-white text-black rounded px-4 mb-4 border border-blue-700"
        placeholderTextColor="#cbd5e1"
      />
      <TextInput
        value={username}
        onChangeText={setUsername}
        placeholder="Username"
        keyboardType="default"
        autoCapitalize="none"
        className="w-72 h-12 bg-white text-black rounded px-4 mb-4 border border-blue-700"
        placeholderTextColor="#cbd5e1"
      />
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        className="w-72 h-12 bg-white text-black rounded px-4 mb-4 border border-blue-700"
        placeholderTextColor="#cbd5e1"
      />
      <View>
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          secureTextEntry={!showPassword}
          className="w-72 h-12 bg-white text-black rounded px-4 mb-1 border border-blue-700"
          placeholderTextColor="#cbd5e1"
        />
        <TouchableOpacity
          onPress={() => setShowPassword((prev) => !prev)}
          className="absolute right-2 top-[12] z-10"
        >
          <Text className="text-blue-400">
            {showPassword ? "Hide" : "Show"}
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <TextInput
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="Confirm Password"
          secureTextEntry={!showPassword}
          className="w-72 h-12 bg-white text-black rounded px-4 mb-1 border border-blue-700"
          placeholderTextColor="#cbd5e1"
        />
      </View>
      <TouchableOpacity
        onPress={handleSignUp}
        className="bg-blue-400 px-4 py-2 rounded mt-2 w-72"
      >
        <Text className="text-white text-lg text-center font-bold">
          Sign Up
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
export default ArtistSignup;
