import { useEffect, useState } from 'react';
import { StyledCartModal } from './ComponentStyles/CartModal.styled';
import { deleteItem, handleChange } from '../utils/functions';
import { useCart } from './DataProvider';
import Image from 'next/image';
const CartModal = ({ setShowModalCart }: any) => {
  const [cartItems, setCartItems] = useState<string[]>([]);
  const [newValue, setNewValue] = useState(null);
  const [total, setTotal] = useState<number>(0);
  const { setCart } = useCart();
  useEffect(() => {
    const cart = localStorage.getItem('cart');
    setCartItems(JSON.parse(cart));
  }, []);

  useEffect(() => {
    let totalPay = 0;
    if (cartItems) {
      cartItems.forEach((item) => {
        totalPay +=
          item.quantity === undefined ? item.price : item.price * item.quantity;
      });
      setTotal(totalPay.toFixed(2));
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
              <img src="/cart.png" alt="empty-cart-image" />
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
                      <img src={item.image} alt="item from cart image" />{' '}
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
                          onChange={(e) =>
                            handleChange(
                              item.id,
                              e.target.value,
                              cartItems,
                              setNewValue,
                              setTotal,
                              setCartItems
                            )
                          }
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
                    setCart(null);
                  }}
                  className="clear-button"
                >
                  Clear
                </button>
                <button
                  onClick={() => {
                    localStorage.clear();
                    setCartItems([]);
                    setCart(null);
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
