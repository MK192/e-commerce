import { useEffect, useState } from 'react';
import { useCategory } from './DataProvider';
import { Items } from './DataProvider';
import { StyledMain } from './ComponentStyles/Main.styled';
import Header from './Header';
import ItemCard from './ItemCard';
import Category from './Category';
import CartModal from './CartModal';
import Nav from './Nav';
const Main = () => {
  const { category } = useCategory();
  const [search, setSearch] = useState('');
  const [showModalCategory, setShowModalCategory] = useState(false);
  const [showModalCart, setShowModalCart] = useState(false);
  const [active, setActive] = useState(false);
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
    <>
      <Nav setShowModalCart={setShowModalCart} active={active} />
      <Header
        setSearch={setSearch}
        setShowModalCategory={setShowModalCategory}
      />
      {showModalCategory && (
        <Category setShowModalCategory={setShowModalCategory} />
      )}
      {showModalCart && <CartModal setShowModalCart={setShowModalCart} />}

      <StyledMain>
        {items?.map((item: Items) => {
          if (!search && category === '') {
            return <ItemCard key={item.id} item={item} setActive={setActive} />;
          }

          if (
            (!category || category == item.category) &&
            item.title.toUpperCase().includes(search.toUpperCase())
          ) {
            return <ItemCard key={item.id} item={item} setActive={setActive} />;
          }
        })}
      </StyledMain>
    </>
  );
};

export default Main;
