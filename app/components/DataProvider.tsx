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

export function useFetch() {
  return useContext(FetchContext);
}
const DataProvider = ({ children }) => {
  const [items, setItems] = useState<undefined | Items[]>();

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
    <FetchContext.Provider value={items}>{children}</FetchContext.Provider>
  );
};
export default DataProvider;
