import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Items } from './DataProvider';
import { StyledItem } from './ComponentStyles/Item.styled';
import { useNavigate } from 'react-router-dom';
import { addSingleItem } from '../utils/functions';
import { useCart } from './DataProvider';
import Nav from './Nav';
import BackArrow from './BackArrow';
import CartModal from './CartModal';
const Item = () => {
  const { id } = useParams();
  const [selected, setSelected] = useState(null);
  const [numberOfItems, setNumberOfItems] = useState(1);
  const [showModalCart, setShowModalCart] = useState(false);
  const [active, setActive] = useState(false);

  const handleActive = () => {
    setActive(true);
    setTimeout(() => {
      setActive(false);
    }, 3000);
  };
  const { setCart } = useCart();
  const navigate = useNavigate();
  useEffect(() => {
    const abortCont = new AbortController();
    const fetchData = async () => {
      setTimeout(async () => {
        try {
          let fetchedData = await fetch(
            `https://fakestoreapi.com/products/${id}`
          );
          if (!fetchedData.ok) {
            throw Error('Could not fetch the data');
          }
          fetchedData = await fetchedData.json();

          setSelected(fetchedData);
        } catch (error) {
          console.error(error);
        }
      }, 100);
    };
    fetchData();
    return () => abortCont.abort();
  }, [id]);

  return (
    <>
      <Nav setShowModalCart={setShowModalCart} active={active} />
      {showModalCart && <CartModal setShowModalCart={setShowModalCart} />}
      <StyledItem>
        <figure className="item-image">
          <BackArrow className="arrow" onClick={() => navigate('/')} />
          <img src={selected?.image} alt="image of selected item" />
        </figure>
        <div className="selected-details">
          <span>{selected?.price}&nbsp;$</span>
          <div className="number-of-items">
            <input
              type="number"
              value={numberOfItems}
              min={1}
              onChange={(e) => setNumberOfItems(e.target.value)}
            />
            {numberOfItems * selected?.price}&nbsp;$
          </div>
          <button
            type="button"
            onClick={() => {
              localStorage.setItem(
                'cart',
                addSingleItem(selected.id, numberOfItems, selected)
              );
              setCart(JSON.parse(localStorage.getItem('cart')));
              handleActive();
            }}
          >
            Add to cart
          </button>
          <p className="selected-category">{selected?.category}</p>
          <strong>{selected?.title}</strong>
          <p className="selected-description">{selected?.description}</p>
        </div>
      </StyledItem>
    </>
  );
};

export default Item;
