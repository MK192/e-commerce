import Nav from './Nav';
import Header from './Header';
import Main from './Main';
import Item from './ItemCard';
import DataProvider from './DataProvider';
import { useState, useEffect } from 'react';

const App = () => {
  /*
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
*/
  return (
    <>
      <DataProvider>
        <Nav />
        <Header />
        <Main />
      </DataProvider>
    </>
  );
};
export default App;
