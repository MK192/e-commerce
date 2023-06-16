import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Items } from './DataProvider';
import { StyledItem } from './ComponentStyles/Item.styled';
import { useNavigate } from 'react-router-dom';
import { addSingleItem } from '../utils/functions';
import { useCart } from './DataProvider';
import { handleActive } from '../utils/functions';
import Image from 'next/image';
import Nav from './Nav';
import BackArrow from './BackArrow';
import CartModal from './CartModal';
const Item = () => {
  const { id } = useParams();
  const [selected, setSelected] = useState<Items | null>(null);
  const [numberOfItems, setNumberOfItems] = useState(1);
  const [showModalCart, setShowModalCart] = useState(false);
  const [active, setActive] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
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
          setIsLoading(false);
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
      {isLoading ? (
        <StyledItem>
          <Image
            src="/Ellipse.png"
            className="loading"
            height={100}
            width={100}
            alt="loading-image"
          />
        </StyledItem>
      ) : (
        <StyledItem>
          <figure className="item-image">
            <BackArrow className="arrow" onClick={() => navigate('/')} />
            {selected?.image && (
              <Image
                src={selected?.image}
                alt="image of selected item"
                height={100}
                width={100}
                unoptimized={true}
                priority
              />
            )}
          </figure>
          <div className="selected-details">
            <span>{selected?.price}&nbsp;$</span>
            <div className="number-of-items">
              <input
                type="number"
                value={numberOfItems}
                min={1}
                onChange={(e) => {
                  if (Number(e.target.value) > 0) {
                    setNumberOfItems(Number(e.target.value));
                  }
                }}
              />
              {(numberOfItems * selected?.price).toFixed(2)}&nbsp;$
            </div>
            <button
              type="button"
              onClick={() => {
                if (numberOfItems > 0) {
                  localStorage.setItem(
                    'cart',
                    addSingleItem(selected.id, numberOfItems, selected)
                  );
                  setCart(JSON.parse(localStorage.getItem('cart') || '{}'));
                  handleActive(setActive);
                } else {
                  alert('Invalid number of items');
                }
              }}
            >
              Add to cart
            </button>
            <p className="selected-category">{selected?.category}</p>
            <strong>{selected?.title}</strong>
            <p className="selected-description">{selected?.description}</p>
          </div>
        </StyledItem>
      )}
    </>
  );
};

export default Item;
