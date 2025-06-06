// data/products.js
export const products = [
  {
    id: 1,
    name: 'Cappuccino',
    image: require('../assets/cappuccino.jpg'),
    category: 'Hot',
    description: 'A hot coffee drink with milk foam.',
    rating: 4.5,
    price: {
      small: 2.5,
      medium: 3.0,
      large: 3.5
    },
  },
  {
    id: 2,
    name: 'Iced Latte',
    image: require('../assets/iced-latte.jpg'),
    category: 'Cold',
    description: 'A cold coffee drink with milk and ice.',
    rating: 4.7,
    price: {
      small: 3.0,
      medium: 3.5,
      large: 4.0
    },
  },
  {
    id: 3,
    name: 'Espresso',
    image: require('../assets/espresso.jpg'),
    category: 'Hot',
    description: 'Strong and bold coffee shot.',
    rating: 4.8,
    price: {
      small: 2.0,
      medium: 2.5,
      large: 3.0
    },
  },
];
