import { QueryClient, QueryClientProvider } from "react-query";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import Footer from "./components/footer/Footer";
import Menu from "./components/menu/Menu";
import Navbar from "./components/navbar/Navbar";
import Categories from "./pages/categories/Categories";
import Category from "./pages/category/Category";
import Contacts from "./pages/contacts/Contacts";
import { default as Login, default as LoginPage } from "./pages/login/Login";
import Orders from "./pages/orders/Orders";
import Product from "./pages/product/Product";
import Products from "./pages/products/Products";
import "./styles/global.scss";

const queryClient = new QueryClient();

function App() {
  const Layout = () => {
    return (
      <div className="main">
        <Navbar />
        <div className="container">
          <div className="menuContainer">
            <Menu />
          </div>
          <div className="contentContainer">
            <Outlet />
          </div>
        </div>
        <Footer />
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/home",
      element: <Layout />,
      children: [
        {
          path: "/home/products",
          element: <Products />,
        },
        {
          path: "/home/categories",
          element: <Categories />,
        },
        {
          path: "/home/categories/:id",
          element: <Category/>,
        },
        {
          path: "/home/contacts",
          element: <Contacts />,
        },
        {
          path: "/home/products/:id",
          element: <Product />,
        },
        {
          path: "/home/orders",
          element: <Orders />,
        }
      ],
    },
    {
      path: "/",
      element: <Login />,
    },
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
