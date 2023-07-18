import { StyledItemCard } from './ComponentStyles/ItemCard.styled';
import { Link } from 'react-router-dom';
import { useCategory } from './DataProvider';
import { addToCart, handleActive } from '../utils/functions';
import { useCart } from './DataProvider';
import { Items } from './DataProvider';
import { isLocalStorageAccessible } from '../utils/functions';
import { useState } from 'react';

import Image from 'next/image';

type Props = {
  item: Items;
  setActive: (active: boolean) => void;
};
const ItemCard = ({ item, setActive }: Props) => {
  const [animationReady, setAnimationReady] = useState(true);

  const { setCategory } = useCategory();
  const { dispatch } = useCart();
  if (item) {
    return (
      <>
        <StyledItemCard>
          <button
            type="button"
            onClick={() => {
              if (isLocalStorageAccessible()) {
                localStorage.setItem('cart', addToCart(JSON.stringify(item)));
                dispatch({
                  type: 'add_items',
                  payload: { newItem: JSON.stringify(item) },
                });
                if (animationReady) {
                  handleActive(setActive);
                  setAnimationReady(false);
                  setTimeout(() => {
                    setAnimationReady(true);
                  }, 2000);
                }
              } else {
                alert('localstorage is unavailable');
              }
            }}
          >
            +
          </button>
          <Link to={`/item/${item.id}`}>
            <Image
              src={item.image}
              alt="article-image"
              height={100}
              width={100}
              unoptimized={true}
              priority
            />
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
