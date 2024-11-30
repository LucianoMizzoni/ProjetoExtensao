// app/index.tsx
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { ProductProvider } from '../contexts/ProductContext';  

const HomeScreen = () => {
  const router = useRouter();

  const navigateToLogin = () => {
    router.push('/LoginScreen');
  };

  return (
    <ProductProvider>
      <View style={styles.container}>
        <Text style={styles.header}>Bem-vindo ao Cardápio App!</Text>
        <Button
          title="Ir para Login"
          onPress={navigateToLogin} 
        />
      </View>
    </ProductProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default HomeScreen;
