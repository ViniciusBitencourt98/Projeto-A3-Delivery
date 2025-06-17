import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartVisible, setIsCartVisible] = useState(false);
  const [cartRestaurantId, setCartRestaurantId] = useState(null); // 🔍 controlar restaurante do carrinho

  const addToCart = (item) => {
    // Se carrinho vazio, aceita qualquer restaurante e define o ID dele:
    if (cartItems.length === 0) {
      setCartItems([{ ...item, quantity: 1 }]);
      setCartRestaurantId(item.restaurant_id);
      setIsCartVisible(true);
      return;
    }

    // Se carrinho já tem itens:
    if (item.restaurant_id !== cartRestaurantId) {
      alert('Você só pode adicionar itens do mesmo restaurante no carrinho.');
      return; // impede adição de outro restaurante
    }

    // Adiciona ou incrementa quantidade:
    setCartItems(prevItems => {
      const itemExists = prevItems.find(i => i.id === item.id);
      if (itemExists) {
        return prevItems.map(i =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prevItems, { ...item, quantity: 1 }];
    });

    setIsCartVisible(true); // abre carrinho automaticamente
  };

  const removeFromCart = (id) => {
    setCartItems(prevItems => {
      const newItems = prevItems.filter(item => item.id !== id);
      if (newItems.length === 0) setCartRestaurantId(null); // esvaziou, libera restaurante
      return newItems;
    });
  };

  const updateQuantity = (id, quantity) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    setCartRestaurantId(null); // limpou, libera restaurante
  };

  const toggleCart = () => setIsCartVisible(prev => !prev);
  const closeCart = () => setIsCartVisible(false);

  return (
    <CartContext.Provider value={{
      cartItems,
      isCartVisible,
      cartRestaurantId,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      toggleCart,
      closeCart,
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
