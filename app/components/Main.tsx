import { useEffect, useState } from 'react';
import { useFetch } from './DataProvider';
import { Items } from './DataProvider';
import { StyledMain } from './ComponentStyles/Main.styled';
import Header from './Header';
import ItemCard from './ItemCard';
const Main = () => {
  const data = useFetch();
  const [search, setSearch] = useState(null);

  return (
    <>
      <Header setSearch={setSearch} />
      <StyledMain>
        {data?.map((item: Items) => {
          if (!search) {
            return <ItemCard key={item.id} item={item} />;
          }
          if (item.title.toUpperCase().includes(search.toUpperCase())) {
            return <ItemCard key={item.id} item={item} />;
          }
        })}
      </StyledMain>
    </>
  );
};

export default Main;
