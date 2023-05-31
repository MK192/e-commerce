import { useEffect } from 'react';
import { useFetch } from './DataProvider';
import { Items } from './DataProvider';
import { StyledMain } from './ComponentStyles/Main.styled';
import ItemCard from './ItemCard';
const Main = () => {
  const data = useFetch();
  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <StyledMain>
      {data?.map((item: Items) => {
        return <ItemCard key={item.id} item={item} />;
      })}
    </StyledMain>
  );
};

export default Main;
