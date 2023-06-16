import React, { useContext, useState } from 'react';
export type Items = {
  id: number;
  image: string;
  category: string;
  rating: { rate: number; count: number };
  title: string;
  price: number;
  description: string;
  quantity?: number;
};
interface CategoryContextDefaultValue {
  category: string;
  setCategory: (newCategory: string) => void;
}

interface CartContextDefaultValue {
  cart: string | Items[];
  setCart: (newCartValue: string | Items[]) => void;
}
export const CategoryContext = React.createContext<CategoryContextDefaultValue>(
  {
    category: '',
    setCategory: function (newCategory: string): void {
      throw new Error('Function not implemented.');
    },
  }
);
const CartContext = React.createContext<CartContextDefaultValue>({
  cart: JSON.parse(localStorage.getItem('cart') || '{}'),
  setCart: function (newCartValue: Items[] | string): void {
    throw new Error('Function not implemented.');
  },
});

export function useCart() {
  return useContext(CartContext);
}
export function useCategory() {
  return useContext(CategoryContext);
}

const DataProvider = ({ children }: any) => {
  const [category, setCategory] = useState('');
  const [cart, setCart] = useState<string | Items[]>(
    JSON.parse(localStorage.getItem('cart'))
  );

  return (
    <CategoryContext.Provider value={{ category, setCategory }}>
      <CartContext.Provider value={{ cart, setCart }}>
        {children}
      </CartContext.Provider>
    </CategoryContext.Provider>
  );
};
export default DataProvider;
