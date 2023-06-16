import { StyledItemCard } from './ComponentStyles/ItemCard.styled';
import { Link } from 'react-router-dom';
import { useCategory } from './DataProvider';
import { addToCart, handleActive } from '../utils/functions';
import { useCart } from './DataProvider';
import { Items } from './DataProvider';
import Image from 'next/image';
type Props = {
  item: Items;
  setActive: (active: boolean) => void;
};
const ItemCard = ({ item, setActive }: Props) => {
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
              setCart(JSON.parse(localStorage.getItem('cart') || '{}'));
              handleActive(setActive);
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
