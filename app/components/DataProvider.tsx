import { createContext, useContext, useState, useReducer } from 'react';
import {
  addSingleItem,
  deleteItem,
  clearCart,
  addToCart,
  isLocalStorageAccessible,
} from '../utils/functions';
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
  dispatch: (action: any) => void;
}
export const CategoryContext = createContext<CategoryContextDefaultValue>({
  category: '',
  setCategory: function (newCategory: string): void {
    throw new Error('Function not implemented.');
  },
});
const CartContext = createContext<CartContextDefaultValue>({
  cart: '[]',
  dispatch: () => {},
});

export function useCart() {
  return useContext(CartContext);
}
export function useCategory() {
  return useContext(CategoryContext);
}

// note: move outside component
function reducer(state: [], action: any) {
  switch (action.type) {
    case 'add_single_item':
      return JSON.parse(
        addSingleItem(
          action.payload.id,
          action.payload.numberOfItems,
          action.payload.item
        )
      );
    case 'add_items':
      return JSON.parse(addToCart(action.payload.newItem));
    case 'delete_item':
      return JSON.parse(deleteItem(action.payload.id, action.payload.items));
    case 'empty_cart':
      return clearCart();
    default:
      return state;
  }
}

const DataProvider = ({ children }: any) => {
  const [category, setCategory] = useState('');

  const [cart, dispatch] = useReducer(
    reducer,

    isLocalStorageAccessible()
      ? JSON.parse(localStorage.getItem('cart') || '[]')
      : '[]'
  );

  return (
    <CategoryContext.Provider value={{ category, setCategory }}>
      <CartContext.Provider value={{ cart, dispatch }}>
        {children}
      </CartContext.Provider>
    </CategoryContext.Provider>
  );
};
export default DataProvider;
