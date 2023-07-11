import { useEffect, useState } from 'react';
import { useCategory } from './DataProvider';
import { Items } from './DataProvider';
import { StyledMain } from './ComponentStyles/Main.styled';
import Image from 'next/image';
import Header from './Header';
import ItemCard from './ItemCard';
import Category from './Category';
import CartModal from './CartModal';
import Nav from './Nav';
import ErrorBoundary from './ErrorBoundary';

const Main = () => {
  // states
  const [search, setSearch] = useState('');
  const [showModalCategory, setShowModalCategory] = useState(false);
  const [showModalCart, setShowModalCart] = useState(false);
  const [active, setActive] = useState(false);
  const [items, setItems] = useState<undefined | Items[]>();
  const [isLoading, setIsLoading] = useState(true);
  //hooks
  const { category } = useCategory();
  useEffect(() => {
    const abortCont = new AbortController();

    const fetchData = async () => {
      try {
        let fetchedData = await fetch('https://fakestoreapi.com/products');
        if (!fetchedData.ok) {
          throw Error('Could not fetch the data');
        }
        const res = await fetchedData.json();
        setItems(res);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
    return () => abortCont.abort();
  }, []);

  return (
    <>
      <ErrorBoundary>
        <Nav setShowModalCart={setShowModalCart} active={active} />

        <Header
          setSearch={setSearch}
          setShowModalCategory={setShowModalCategory}
        />
        {showModalCategory && (
          <Category setShowModalCategory={setShowModalCategory} />
        )}
        {showModalCart && <CartModal setShowModalCart={setShowModalCart} />}
        {isLoading ? (
          <StyledMain>
            <Image
              src="/Ellipse.png"
              className="loading"
              height={100}
              width={100}
              alt="loading-image"
            />
          </StyledMain>
        ) : (
          <StyledMain>
            {items?.map((item: Items) => {
              if (!search && category === '') {
                return (
                  <ItemCard key={item.id} item={item} setActive={setActive} />
                );
              }

              if (
                (!category || category == item.category) &&
                item.title.toUpperCase().includes(search.toUpperCase())
              ) {
                return (
                  <ItemCard key={item.id} item={item} setActive={setActive} />
                );
              }
            })}
          </StyledMain>
        )}
      </ErrorBoundary>
    </>
  );
};

export default Main;
