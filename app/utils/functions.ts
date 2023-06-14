/* this function add object from parametar to localStorage 'cart' object 
and add new quantity property if there is more then 1 item with same id */

export const addToCart = (newItem: string) => {
  let cart: Item[] = [];
  let cartArray = JSON.parse(localStorage.getItem('cart'));

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

type Item = {
  id: number;
  image: string;
  category: string;
  rating: { rate: number; count: number };
  title: string;
  price: number;
  description: string;
  quantity: number;
};
/* this function change value of input field, also create new
cart object with updates about quantity */
export const handleChange = (
  id: number,
  value: number,
  cartItems: [],
  setNewValue: (quantity: number) => void,
  setTotal: (quantity: number) => void,
  setCartItems: (cartItems: Item[]) => void
) => {
  cartItems.forEach((item: Item) => {
    if (item.id === id) {
      item.quantity = Number(value);
      setNewValue(item.quantity);
      setTotal((prev) => prev + value);
      localStorage.setItem('cart', JSON.stringify(cartItems));
    }
  });
  setCartItems(cartItems);
};

export const deleteItem = (id: number, cartItems: string[]) => {
  const newArray = cartItems.filter((item) => item.id !== id);

  return JSON.stringify(newArray);
};

/* this function add single or multiple items to cart, function is used in 
single item page */

export const addSingleItem = (
  id: number,
  numberOfItems: number,
  selected: Item | null
) => {
  let cart = [];
  let cartArray = JSON.parse(localStorage.getItem('cart'));
  console.log(cartArray);

  if (!cartArray) {
    selected.quantity = numberOfItems;

    cart.push(selected);

    return JSON.stringify(cart);
  } else {
    let selectedItem = cartArray.find((item) => item.id === id);
    if (selectedItem) {
      selectedItem.quantity
        ? (selectedItem.quantity =
            Number(selectedItem.quantity) + Number(numberOfItems))
        : (selectedItem.quantity = numberOfItems);
    } else {
      selected.quantity = numberOfItems;
      cartArray.push(selected);
    }

    return JSON.stringify(cartArray);
  }
};
