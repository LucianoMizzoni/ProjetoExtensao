import React, { useRef } from 'react';
import {
  View,
  FlatList,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Linking,
} from 'react-native';
import { useRouter } from 'expo-router'; // Usando o hook do expo-router
import { Product, useProducts } from '@/contexts/ProductContext';
import * as Sharing from 'expo-sharing';
import ViewShot from 'react-native-view-shot';

const CardapioScreen = ({ route }: { route: any }) => {
  const { products } = useProducts();
  const router = useRouter();

  // Referência para o componente ViewShot (captura da tela)
  const viewShotRef = useRef<ViewShot>(null);

  const renderItem = ({ item }: { item: Product }) => (
    <View style={styles.productContainer}>
      <Image
        source={{ uri: item.image || 'default-image-uri.png' }} // Garantir que item.image não seja null
        style={styles.productImage}
      />
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productPrice}>R$ {item.price}</Text>
      <Text style={styles.productDescription}>{item.description}</Text>
    </View>
  );

  // Função para capturar a tela e compartilhar via WhatsApp
  const shareScreenCapture = async () => {
    try {
      // Verifique se a referência viewShotRef está definida
      if (viewShotRef.current) {
        // Verifique se o método 'capture' está disponível
        const uri = await viewShotRef.current.capture?.(); // Usando capture com verificação opcional

        if (uri) {
          console.log('URI da captura:', uri); // Log do URI para verificar

          // Compartilhe a captura via WhatsApp
          await Sharing.shareAsync(uri, {
            dialogTitle: 'Compartilhar Cardápio',
            UTI: 'public.image',
            mimeType: 'image/png',
          });

          // Gerar a URL do WhatsApp com o texto do cardápio
          const message = `Confira nosso cardápio!`;
          const encodedMessage = encodeURIComponent(message);
          const imageUri = encodeURIComponent(uri);

          // Compartilhar via WhatsApp
          Linking.openURL(
            `whatsapp://send?text=${encodedMessage}&attachment=${imageUri}`
          );
        } else {
          console.error("Não foi possível capturar a tela.");
          Alert.alert('Erro', 'Falha ao capturar a tela.');
        }
      } else {
        console.log("viewShotRef.current é undefined");
      }
    } catch (error) {
      console.error('Erro ao compartilhar:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao compartilhar o cardápio.');
    }
  };

  return (
    <View style={styles.container}>
      <ViewShot ref={viewShotRef} style={styles.captureContainer} options={{ format: 'png', quality: 1.0 }}>
        <FlatList
          data={products}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </ViewShot>

      <TouchableOpacity style={styles.shareButton} onPress={shareScreenCapture}>
        <Text style={styles.shareButtonText}>Compartilhar via WhatsApp</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 16,
  },
  captureContainer: {
    flex: 1,
    marginBottom: 20,
  },
  productContainer: {
    marginBottom: 20,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  productImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 10,
    resizeMode: 'cover',
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 16,
    color: '#008000',
  },
  productDescription: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
  },
  shareButton: {
    backgroundColor: '#25D366',
    padding: 12,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
  },
  shareButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CardapioScreen;
