const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const newItem = action.payload;
      // Check if the item is already in the cart
      const itemInCart = state.cart.find((item) => item.id === newItem.id);

      if (itemInCart) {
        // If the item is already in the cart, update the quantity
        const updatedCart = state.cart.map((item) =>
          item.id === newItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        return { ...state, cart: updatedCart };
      } else {
        // If the item is not in the cart, add it with quantity = 1
        return { ...state, cart: [...state.cart, { ...newItem, quantity: 1 }] };
      }
    case 'CLEAR_CART':
      return { ...state, cart: [], totalQuantity: 0, totalPrice: 0 };
    case 'REMOVE_ITEM':
      const filteredItems = state.cart.filter(
        (item) => item.id !== action.payload.id
      );
      return { ...state, cart: filteredItems };
    case 'INCREASE_ITEM':
      const increasedItem = state.cart.map((item) =>
        item.id === action.payload.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      return { ...state, cart: increasedItem };
    case 'DECREASE_ITEM':
      const decreasedItem = state.cart
        .map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0);
      return { ...state, cart: decreasedItem };
    case 'UPDATE_TOTAL':
      const updatedQuantity = state.cart.reduce((prev, curr) => {
        return prev + curr.quantity;
      }, 0);
      const updatedPrice = state.cart.reduce((prev, curr) => {
        const amount = curr.quantity * curr.price;
        return prev + amount;
      }, 0);
      return {
        ...state,
        totalQuantity: updatedQuantity,
        totalPrice: updatedPrice,
      };

    default:
      return state;
  }
};

export { cartReducer };
