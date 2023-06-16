import { useEffect, useState } from 'react';
import { StyledCartModal } from './ComponentStyles/CartModal.styled';
import { deleteItem, handleChange } from '../utils/functions';
import { Items, useCart } from './DataProvider';
import Image from 'next/image';

type Props = {
  setShowModalCart: (showModal: boolean) => void;
};
const CartModal = ({ setShowModalCart }: Props) => {
  const [cartItems, setCartItems] = useState<Items[] | null>([]);
  const [newValue, setNewValue] = useState(null);
  const [total, setTotal] = useState<number>(0);
  const { setCart } = useCart();
  useEffect(() => {
    const cart = localStorage.getItem('cart');
    setCartItems(JSON.parse(cart || '{}'));
  }, []);

  useEffect(() => {
    let totalPay = 0;

    if (cartItems?.length > 0 && cartItems) {
      cartItems.forEach((item) => {
        totalPay +=
          item.quantity === undefined ? item.price : item.price * item.quantity;
      });
      setTotal(Number(totalPay.toFixed(2)));
    }
  }, [cartItems, total]);

  return (
    <StyledCartModal>
      <div className="overlay">
        <div className="modal">
          <div className="cart-and-close">
            <strong>Cart</strong>
            <button
              className="close-modal"
              onClick={() => setShowModalCart(false)}
            >
              x
            </button>
          </div>

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
                          localStorage.setItem(
                            'cart',
                            deleteItem(item.id, cartItems)
                          );
                          setCartItems(
                            cartItems.filter(
                              (cartItem) => item.id !== cartItem.id
                            )
                          );
                          setCart(
                            cartItems.filter(
                              (cartItem) => item.id !== cartItem.id
                            )
                          );
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
                          value={
                            item.quantity === undefined ? 1 : item.quantity
                          }
                          onChange={(e) => {
                            if (Number(e.target.value) > 0)
                              handleChange(
                                item.id,
                                Number(e.target.value),
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
                    localStorage.clear();
                    setCartItems([]);
                    setCart([]);
                  }}
                  className="clear-button"
                >
                  Clear
                </button>
                <button
                  onClick={() => {
                    localStorage.clear();
                    setCartItems([]);
                    setCart([]);
                  }}
                  className="buy-button"
                >
                  Buy
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </StyledCartModal>
  );
};

export default CartModal;
