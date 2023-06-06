import { StyledItemCard } from './ComponentStyles/ItemCard.styled';
import { Link } from 'react-router-dom';
import { useCategory } from './DataProvider';

import Image from 'next/image';

const ItemCard = ({ item }) => {
  const { setCategory } = useCategory();
  if (item) {
    return (
      <StyledItemCard>
        <button type="button">+</button>
        <Link to={`/item/${item.id}`}>
          <img src={item?.image} alt="article" />
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
    );
  } else {
    return <p>Loading...</p>;
  }
};
export default ItemCard;
