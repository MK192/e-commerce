import { useEffect, useState } from 'react';
import { useFetch } from './DataProvider';
import { useCategory } from './DataProvider';
import { Items } from './DataProvider';
import { StyledMain } from './ComponentStyles/Main.styled';
import Header from './Header';
import ItemCard from './ItemCard';
import Category from './Category';
const Main = () => {
  const data = useFetch();
  const { category } = useCategory();
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <Header setSearch={setSearch} setShowModal={setShowModal} />
      {showModal && <Category setShowModal={setShowModal} />}
      <StyledMain>
        {data?.map((item: Items) => {
          if (!search && category === '') {
            return <ItemCard key={item.id} item={item} />;
          }

          if (
            (!category || category == item.category) &&
            item.title.toUpperCase().includes(search.toUpperCase())
          ) {
            return <ItemCard key={item.id} item={item} />;
          }
        })}
      </StyledMain>
    </>
  );
};

export default Main;
