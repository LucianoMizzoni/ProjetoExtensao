// app/login.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, useColorScheme } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'expo-router';
import { auth } from '../firebaseConfig';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter(); 
  const colorScheme = useColorScheme(); 

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        router.push('/ProductScreen'); 
      })
      .catch((error) => {
        const errorMessage = error.message;
        Alert.alert('Erro no login', errorMessage);
      });
  };

  const isDarkMode = colorScheme === 'dark';

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? '#000' : '#fff' }, 
      ]}
    >
      <Text
        style={[
          styles.title,
          { color: isDarkMode ? '#fff' : '#000' }, 
        ]}
      >
        Login
      </Text>
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: isDarkMode ? '#222' : '#fff', 
            color: isDarkMode ? '#fff' : '#000', 
            borderColor: isDarkMode ? '#444' : '#ccc', 
          },
        ]}
        placeholder="Email"
        placeholderTextColor={isDarkMode ? '#888' : '#666'} 
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: isDarkMode ? '#222' : '#fff',
            color: isDarkMode ? '#fff' : '#000',
            borderColor: isDarkMode ? '#444' : '#ccc',
          },
        ]}
        placeholder="Senha"
        placeholderTextColor={isDarkMode ? '#888' : '#666'}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Entrar" onPress={handleLogin} />

      <Text
        style={[
          styles.text,
          { color: isDarkMode ? '#fff' : '#000' }, 
        ]}
      >
        Esqueceu sua senha?
      </Text>
      <Button
        title="Recuperar senha"
        onPress={() => router.push('/ForgotPasswordScreen')} 
      />

      <Text
        style={[
          styles.text,
          { color: isDarkMode ? '#fff' : '#000' },
        ]}
      >
        Não tem uma conta?
      </Text>
      <Button
        title="Criar conta"
        onPress={() => router.push('/RegisterScreen')} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
    borderRadius: 4,
  },
  text: {
    textAlign: 'center',
    marginVertical: 10,
  },
});

export default LoginScreen;
