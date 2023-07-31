import ReactDOM from 'react-dom/client';
import App from './App';
import { store } from './store/store';
// import { Provider } from 'react-redux';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import List from './page/List';
import { Provider } from 'react-redux';
import Layout from './component/Layout';
import Details from './page/Details';


export const routeConfig = [
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <Layout />,
        children: [
          {
            path: "/list",
            element: <List />,
            index: true,
          },
          {
            path: "/list/:type/:id",
            element: <Details />
          },
    ]
      }
    ],
  },

]

const router = createBrowserRouter(routeConfig, {
  future: {
    v7_normalizeFormMethod: true,
  }
});

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
  // </React.StrictMode>
);
