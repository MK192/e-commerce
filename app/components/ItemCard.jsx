import { useEffect } from 'react';
import { useFetch } from './DataProvider';
import { StyledItem } from './ComponentStyles/Item.styled';
import Image from 'next/image';

const ItemCard = ({ item }) => {
  useEffect(() => {
    // console.log(item);
  });
  if (item) {
    return (
      <StyledItem>
        <button type="button">+</button>
        <img src={item?.image} alt="article 2" />
        <p className="price">{item?.price} $</p>
        <p className="title">{item?.title}</p>
        <p className="description">{item?.description}</p>
        <p className="category">{item?.category}</p>
      </StyledItem>
    );
  } else {
    return <p>Loading...</p>;
  }
};
export default ItemCard;
