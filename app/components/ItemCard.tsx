import { StyledItemCard } from './ComponentStyles/ItemCard.styled';
import { Link } from 'react-router-dom';
import { useCategory } from './DataProvider';
import { addToCart } from '../utils/functions';
import { useCart } from './DataProvider';
import Image from 'next/image';
import { useState } from 'react';

const ItemCard = ({ item, setActive, handleActive }) => {
  const { setCategory } = useCategory();
  const { setCart } = useCart();

  if (item) {
    return (
      <>
        <StyledItemCard>
          <button
            type="button"
            onClick={() => {
              localStorage.setItem('cart', addToCart(JSON.stringify(item)));
              setCart(JSON.parse(localStorage.getItem('cart')));
              handleActive();
            }}
          >
            +
          </button>
          <Link to={`/item/${item.id}`}>
            <img src={item?.image} alt="article-image" />
          </Link>
          <p className="price">{item?.price} $</p>
          <Link to={`/item/${item.id}`}>
            <p className="title">{item?.title}</p>
          </Link>
          <p className="description">{item?.description}</p>
          <p
            className="category"
            onClick={() => {
              setCategory(item.category);
            }}
          >
            {item?.category}
          </p>
        </StyledItemCard>
      </>
    );
  } else {
    return <p>Loading...</p>;
  }
};
export default ItemCard;
