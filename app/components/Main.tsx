import { useEffect, useState } from 'react';
import { useFetch } from './DataProvider';
import { useCategory } from './DataProvider';
import { Items } from './DataProvider';
import { StyledMain } from './ComponentStyles/Main.styled';
import Header from './Header';
import ItemCard from './ItemCard';
import Category from './Category';
import CartModal from './CartModal';
import Nav from './Nav';
const Main = () => {
  const data = useFetch();
  const { category } = useCategory();
  const [search, setSearch] = useState('');
  const [showModalCategory, setShowModalCategory] = useState(false);
  const [showModalCart, setShowModalCart] = useState(false);
  const [active, setActive] = useState(false);

  const handleActive = () => {
    setActive(true);
    setTimeout(() => {
      setActive(false);
    }, 3000);
  };
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
        {data?.map((item: Items) => {
          if (!search && category === '') {
            return (
              <ItemCard
                key={item.id}
                item={item}
                setActive={setActive}
                handleActive={handleActive}
              />
            );
          }

          if (
            (!category || category == item.category) &&
            item.title.toUpperCase().includes(search.toUpperCase())
          ) {
            return (
              <ItemCard
                key={item.id}
                item={item}
                setActive={setActive}
                handleActive={handleActive}
              />
            );
          }
        })}
      </StyledMain>
    </>
  );
};

export default Main;
