import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Product = {
  name: string;
  price: string;
  description: string;
  image: string | null; 
};

const ProductContext = createContext<{
  products: Product[];
  addProduct: (product: Product) => void;
  updateProduct: (index: number, product: Product) => void;
  deleteProduct: (index: number) => void;
}>( {
  products: [],
  addProduct: () => {},
  updateProduct: () => {},
  deleteProduct: () => {},
});

export const useProducts = () => useContext(ProductContext);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);

  const addProduct = (product: Product) => {
    setProducts((prev) => [...prev, product]);
  };

  const updateProduct = (index: number, product: Product) => {
    setProducts((prev) => {
      const updatedProducts = [...prev];
      updatedProducts[index] = product;
      return updatedProducts;
    });
  };

  const deleteProduct = (index: number) => {
    setProducts((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <ProductContext.Provider value={{ products, addProduct, updateProduct, deleteProduct }}>
      {children}
    </ProductContext.Provider>
  );
};
