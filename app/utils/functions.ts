import { Items } from '../components/DataProvider';

/* this functions checks is localstorage available to read or write */
function isLocalStorageEnabled() {
  try {
    const testKey = '__test__';
    localStorage.setItem(testKey, testKey);
    localStorage.removeItem(testKey);
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
}

export function isLocalStorageAccessible() {
  if (typeof localStorage === 'object' && isLocalStorageEnabled()) {
    try {
      localStorage.setItem('test', 'test');
      localStorage.removeItem('test');
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }
  return false;
}

/* this function add object from parametar to localStorage 'cart' object 
and add new quantity property if there is more then 1 item with same id */
export const addToCart = (newItem: string) => {
  let cart: Items[] = [];

  let cartArray = JSON.parse(localStorage.getItem('cart') || '[]');

  if (!cartArray) {
    cart.push(JSON.parse(newItem));

    return JSON.stringify(cart);
  }
  cart = cartArray;
  let itemId = JSON.parse(newItem);
  let copy = 0;
  cart.forEach((item) => {
    if (item.id === itemId.id) {
      copy += 1;
      item.quantity === undefined ? (item.quantity = 2) : (item.quantity += 1);
    }
  });
  if (copy === 0) {
    cart.push(JSON.parse(newItem));
  }
  return JSON.stringify(cart);
};

/* this function change value of input field, also create new
cart object with updates about quantity */
export const handleChange = (
  id: number,
  value: number,
  prev: number,
  cartItems: Items[],
  setNewValue: (quantity: number | null) => void,
  setTotal: (quantity: number) => void,
  setCartItems: (cartItems: Items[]) => void
) => {
  cartItems.map((item) => {
    if (item.id === id) {
      item.quantity = Number(value);
      setNewValue(item.quantity);
      setTotal(prev + value);
      localStorage.setItem('cart', JSON.stringify(cartItems));
    }
  });
  setCartItems(cartItems);
};
/* this function delete selected item from cart and change 'cart' localstorage object */
export const deleteItem = (id: number, cartItems: Items[]) => {
  const newArray = cartItems.filter((item) => item.id !== id);

  return JSON.stringify(newArray);
};

/* this function add single or multiple items to cart, function is used in 
single item page */

export const addSingleItem = (
  id: number,
  numberOfItems: number,
  selected: Items
) => {
  let cart = [];

  let cartArray = JSON.parse(localStorage.getItem('cart') || '[]');

  if (!cartArray) {
    selected.quantity = numberOfItems;

    cart.push(selected);

    return JSON.stringify(cart);
  } else {
    let selectedItem = cartArray?.find((item: Items) => item.id === id);
    if (selectedItem) {
      selectedItem.quantity
        ? (selectedItem.quantity =
            Number(selectedItem.quantity) + Number(numberOfItems))
        : (selectedItem.quantity = 1 + numberOfItems);
    } else {
      selected ? (selected.quantity = numberOfItems) : null;

      cartArray.push(selected);
    }

    return JSON.stringify(cartArray);
  }
};

/* this function activate animation for new item on cart icon */

export const handleActive = (setActive: (active: boolean) => void) => {
  setActive(true);
  setTimeout(() => {
    setActive(false);
  }, 2000);
};

/* function for deleting all items from cart state and form 'cart localstorage*/

export const clearCart = () => {
  localStorage.clear();
  return [];
};
