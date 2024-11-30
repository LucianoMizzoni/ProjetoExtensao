import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Image,
  Alert,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useProducts } from '../contexts/ProductContext';
import { Product } from '../contexts/ProductContext';
import { useRouter } from 'expo-router';

const ProductScreen = () => {
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const router = useRouter();

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const saveProduct = () => {
    if (!productName || !productPrice || !productDescription) {
      Alert.alert('Erro', 'Todos os campos devem ser preenchidos!');
      return;
    }

    // Verifica se a URI da imagem é válida (URL ou caminho local)
    const isValidImage =
      image && (image.startsWith('http') || image.startsWith('https') || image.startsWith('file:///'));
    const productImage = isValidImage ? image : null;

    const newProduct = {
      name: productName,
      price: productPrice,
      description: productDescription,
      image: productImage, // Usa a URI válida ou define como null
    };

    if (editIndex !== null) {
      updateProduct(editIndex, newProduct);
      setEditIndex(null);
    } else {
      addProduct(newProduct);
    }

    setProductName('');
    setProductPrice('');
    setProductDescription('');
    setImage(null);
  };

  const handleEdit = (index: number) => {
    const product = products[index];
    setProductName(product.name);
    setProductPrice(product.price);
    setProductDescription(product.description);
    setImage(product.image);
    setEditIndex(index);
  };

  const handleDelete = (index: number) => {
    deleteProduct(index);
  };

  const renderItem = (product: Product, index: number) => (
    <View style={styles.productCard} key={index}>
      {product.image && (product.image.startsWith('http') || product.image.startsWith('https') || product.image.startsWith('file:///')) ? (
        <Image source={{ uri: product.image }} style={styles.image} />
      ) : (
        <Image source={require('../assets/images/default-image.png')} style={styles.image} />
      )}
      <Text style={styles.productName}>{product.name}</Text>
      <Text style={styles.productPrice}>R$ {product.price}</Text>
      <Text style={styles.productDescription}>{product.description}</Text>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity onPress={() => handleEdit(index)} style={styles.button}>
          <Text style={styles.buttonText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDelete(index)} style={styles.button}>
          <Text style={styles.buttonText}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const navigateToCardapio = () => {
    router.push('/CardapioScreen');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{editIndex !== null ? 'Editar Produto' : 'Adicionar Produto'}</Text>
      <TextInput
        placeholder="Nome do Produto"
        placeholderTextColor="#888"
        value={productName}
        onChangeText={setProductName}
        style={styles.input}
      />
      <TextInput
        placeholder="Preço do Produto (R$)"
        placeholderTextColor="#888"
        value={productPrice}
        onChangeText={setProductPrice}
        style={styles.input}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="Descrição do Produto"
        placeholderTextColor="#888"
        value={productDescription}
        onChangeText={setProductDescription}
        style={styles.input}
        multiline
      />
      <Button title="Escolher Foto" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={styles.image} />}
      <Button title={editIndex !== null ? 'Salvar Alterações' : 'Salvar Produto'} onPress={saveProduct} />

      <Text style={styles.title}>Lista de Produtos</Text>
      {products.length === 0 ? (
        <Text style={styles.noProducts}>Nenhum produto adicionado ainda.</Text>
      ) : (
        products.map((product, index) => renderItem(product, index))
      )}

      <Button title="Criar Cardápio" onPress={navigateToCardapio} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#000',
  },
  input: {
    borderWidth: 1,
    padding: 8,
    marginBottom: 12,
    borderColor: '#ccc',
    color: '#000',
    backgroundColor: '#fff',
  },
  image: {
    width: 100,
    height: 100,
    marginTop: 10,
  },
  productCard: {
    marginBottom: 20,
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#f9f9f9',
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
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
  buttonsContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  button: {
    padding: 8,
    backgroundColor: '#007BFF',
    borderRadius: 5,
    marginRight: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  noProducts: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default ProductScreen;
