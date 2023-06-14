import React, { useContext, useState, useEffect } from 'react';
export type Items = {
  id: number;
  image: string;
  category: string;
  rating: { rate: number; count: number };
  title: string;
  price: number;
  description: string;
};

const FetchContext = React.createContext();
export const CategoryContext = React.createContext();
const CartContext = React.createContext();

export function useCart() {
  return useContext(CartContext);
}
export function useCategory() {
  return useContext(CategoryContext);
}
export function useFetch() {
  return useContext(FetchContext);
}
const DataProvider = ({ children }) => {
  const [items, setItems] = useState<undefined | Items[]>();
  const [category, setCategory] = useState('');
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')));
  useEffect(() => {
    const abortCont = new AbortController();

    const fetchData = async () => {
      setTimeout(async () => {
        try {
          let fetchedData = await fetch('https://fakestoreapi.com/products');
          if (!fetchedData.ok) {
            throw Error('Could not fetch the data');
          }
          fetchedData = await fetchedData.json();
          const res: Array<Items> = fetchedData;
          setItems(res);
        } catch (error) {
          console.error(error);
        }
      }, 100);
    };
    fetchData();
    return () => abortCont.abort();
  }, []);

  return (
    <FetchContext.Provider value={items}>
      <CategoryContext.Provider value={{ category, setCategory }}>
        <CartContext.Provider value={{ cart, setCart }}>
          {children}
        </CartContext.Provider>
      </CategoryContext.Provider>
    </FetchContext.Provider>
  );
};
export default DataProvider;
