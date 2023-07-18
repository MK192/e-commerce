import { useEffect, useState } from 'react';
import { StyledCartModal } from './ComponentStyles/CartModal.styled';
import { deleteItem, handleChange } from '../utils/functions';
import { Items, useCart } from './DataProvider';
import { isLocalStorageAccessible } from '../utils/functions';

import Modal from './Modal';
import Image from 'next/image';

type Props = {
  setShowModalCart: (showModal: boolean) => void;
  domNode: HTMLElement | Element | DocumentFragment | null;
};
const CartModal = ({ setShowModalCart, domNode }: Props) => {
  //states
  const [cartItems, setCartItems] = useState<Items[]>([]);
  const [newValue, setNewValue] = useState<number | null>(null);
  const [total, setTotal] = useState<number>(0);

  //hooks
  const { dispatch } = useCart();
  useEffect(() => {
    if (isLocalStorageAccessible()) {
      const cart = localStorage.getItem('cart');
      setCartItems(JSON.parse(cart || '[]'));
    } else {
      alert('localstorage is unavailable');
    }
  }, []);

  useEffect(() => {
    const totalPay = cartItems.reduce((total, cart) => {
      total +=
        cart.quantity === undefined ? cart.price : cart.price * cart.quantity;
      return total;
    }, 0);

    setTotal(Number(totalPay.toFixed(2)));
  }, [cartItems, total]);
  return (
    <Modal title={'Cart'} setShowModal={setShowModalCart} domNode={domNode}>
      <StyledCartModal>
        {!cartItems?.length ? (
          <div className="empty-cart">
            <Image
              src="/cart.png"
              alt="empty-cart-image"
              height={200}
              width={100}
              unoptimized={true}
              priority
            />
            <p>Cart empty</p>
          </div>
        ) : (
          <div className="cart">
            {cartItems.map((item) => {
              if (item.id)
                return (
                  <div className="cart-item" key={item.id}>
                    <button
                      onClick={() => {
                        if (isLocalStorageAccessible()) {
                          localStorage.setItem(
                            'cart',
                            deleteItem(item.id, cartItems)
                          );
                          setCartItems(
                            cartItems.filter(
                              (cartItem) => item.id !== cartItem.id
                            )
                          );

                          dispatch({
                            type: 'delete_item',
                            payload: { id: item.id, items: cartItems },
                          });
                        } else {
                          alert('locaststorage is unavailable');
                        }
                      }}
                    >
                      x
                    </button>
                    <Image
                      src={item.image}
                      alt="item from cart image"
                      height={100}
                      width={100}
                    />{' '}
                    <div className="middle-div">
                      <p>{item.title}</p>
                      <p>Price : {item.price} $</p>
                    </div>
                    <div className="right-div">
                      <input
                        type="number"
                        min="1"
                        value={item.quantity === undefined ? 1 : item.quantity}
                        onChange={(e) => {
                          if (Number(e.target.value) > 0)
                            handleChange(
                              item.id,
                              Number(e.target.value),
                              total,
                              cartItems,
                              setNewValue,
                              setTotal,
                              setCartItems
                            );
                        }}
                      />
                      <strong>
                        {item.quantity === undefined
                          ? item.price
                          : (item.quantity * item.price).toFixed(2)}{' '}
                        $
                      </strong>
                    </div>
                  </div>
                );
            })}

            <div className="total">{total} $</div>
            <div className="buttons-div">
              <button
                onClick={() => {
                  if (isLocalStorageAccessible()) {
                    setCartItems([]);
                    dispatch({ type: 'empty_cart' });
                  } else {
                    alert('localstorage is unavailable');
                  }
                }}
                className="clear-button"
              >
                Clear
              </button>
              <button
                onClick={() => {
                  if (isLocalStorageAccessible()) {
                    setCartItems([]);
                    dispatch({ type: 'empty_cart' });
                  } else {
                    alert('localstorage is unavailable');
                  }
                }}
                className="buy-button"
              >
                Buy
              </button>
            </div>
          </div>
        )}
      </StyledCartModal>
    </Modal>
  );
};

export default CartModal;
