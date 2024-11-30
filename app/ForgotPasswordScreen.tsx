import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, useColorScheme } from 'react-native';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { useRouter } from 'expo-router'; 

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const router = useRouter(); 
  const colorScheme = useColorScheme();

  const handlePasswordReset = async () => {
    const auth = getAuth();
    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert('Verifique seu e-mail', 'Um link de redefinição de senha foi enviado.');
      router.push('/LoginScreen'); 
    } catch (error: any) {
      Alert.alert('Erro', 'Ocorreu um erro ao tentar enviar o e-mail. Tente novamente.');
    }
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
        Recuperar Senha
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
        placeholder="Digite seu e-mail"
        placeholderTextColor={isDarkMode ? '#888' : '#666'} 
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <Button title="Enviar e-mail de recuperação" onPress={handlePasswordReset} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    padding: 8,
    marginVertical: 8,
    borderRadius: 4,
  },
});
