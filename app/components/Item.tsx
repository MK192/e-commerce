import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Items } from './DataProvider';
import { StyledItem } from './ComponentStyles/Item.styled';
import { useNavigate } from 'react-router-dom';
import { addSingleItem } from '../utils/functions';
import { useCart } from './DataProvider';
import { handleActive } from '../utils/functions';
import { isLocalStorageAccessible } from '../utils/functions';

import Image from 'next/image';
import Nav from './Nav';
import BackArrow from './BackArrow';
import CartModal from './CartModal';
const Item = () => {
  // states
  const [selected, setSelected] = useState<Items | null>(null);
  const [numberOfItems, setNumberOfItems] = useState(1);
  const [showModalCart, setShowModalCart] = useState(false);
  const [active, setActive] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [animationReady, setAnimationReady] = useState(true);
  // hooks
  const { id } = useParams();
  const { cart, dispatch } = useCart();
  const ref = useRef(null);
  const navigate = useNavigate();
  useEffect(() => {
    const abortCont = new AbortController();

    const fetchData = async () => {
      try {
        let fetched = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!fetched.ok) {
          throw Error('Could not fetch the data');
        }
        let fetchedData = await fetched.json();

        setSelected(fetchedData);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
    return () => abortCont.abort();
  }, [id]);

  return (
    <>
      <Nav setShowModalCart={setShowModalCart} active={active} ref={ref} />
      {showModalCart && (
        <CartModal setShowModalCart={setShowModalCart} domNode={ref.current} />
      )}
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
              {selected && (numberOfItems * selected?.price).toFixed(2)}&nbsp;$
            </div>
            <button
              type="button"
              onClick={() => {
                if (isLocalStorageAccessible() && selected) {
                  localStorage.setItem(
                    'cart',
                    addSingleItem(selected.id, numberOfItems, selected)
                  );
                  dispatch({
                    type: 'add_single_item',
                    payload: { id: selected.id, numberOfItems, item: selected },
                  });
                  if (animationReady) {
                    handleActive(setActive);
                    setAnimationReady(false);
                    setTimeout(() => {
                      setAnimationReady(true);
                    }, 2000);
                  }
                } else {
                  alert('localstorage unavailable');
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
