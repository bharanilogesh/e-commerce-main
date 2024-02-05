import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './routes/root.jsx';
import { CartProvider } from './context/context';
import { StateProvider } from './context/stateProvider.jsx';
import {
  ErrorPage,
  Watch,
  Mobile,
  WashingMachines,
  Products,
  Audio,
  SignUp,
  Cart,
  Tv,
  Camera,
  Laptop,
  Ac,
  LogIn,
  User,
  Faq,
} from './routes/index.js';
import userReducer from './utils/reducers/userReducer.js';
import { AuthProvider } from './context/auth.jsx';
import { StoreProvider } from '../src/context/storeProvider.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,

    children: [
      {
        path: '/',
        element: <LogIn />,
      },
      {
        path: 'products',
        element: <Products />,
      },

      {
        path: 'productWatches',
        element: <Watch />,
      },
      {
        path: 'mobile',
        element: <Mobile />,
      },
      {
        path: 'washingMachine',
        element: <WashingMachines />,
      },
      {
        path: 'audio',
        element: <Audio />,
      },
      {
        path: 'tv',
        element: <Tv />,
      },
      {
        path: 'camera',
        element: <Camera />,
      },
      {
        path: 'laptop',
        element: <Laptop />,
      },
      {
        path: 'ac',
        element: <Ac />,
      },

      {
        path: 'cart',
        element: <Cart />,
      },
      {
        path: 'signUp',
        element: <SignUp />,
      },
      {
        path: 'user',
        element: <User/>,
      },
      {
        path: 'faq',
        element: <Faq />,
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CartProvider>
      <StateProvider userReducer={userReducer}>
        <AuthProvider>
          <StoreProvider>
            <RouterProvider router={router} />
          </StoreProvider>
        </AuthProvider>
      </StateProvider>
    </CartProvider>
  </React.StrictMode>
);
