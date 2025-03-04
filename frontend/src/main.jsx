import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import Login from "./pages/Auth/Login.jsx";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import Register from "./pages/Auth/Register.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import Profile from "./pages/User/Profile.jsx";
import AdminRoute from "./pages/Admin/AdminRoute.jsx";
import Users from "./pages/Admin/Users.jsx";
import Categories from "./pages/Admin/Categories.jsx";
import CreateProduct from "./pages/Admin/CreateProduct.jsx";
import Products from "./pages/Admin/Products.jsx";
import UpdateProduct from "./pages/Admin/UpdateProduct.jsx";
import Dashboard from "./pages/Admin/Dashboard.jsx";
import Home from "./pages/Home.jsx";
import Favorite from "./pages/Product/Favorite.jsx";
import ProductDetail from "./pages/Product/ProductDetail.jsx";
import Cart from "./pages/Cart.jsx";
import Shop from "./pages/Shop.jsx";
import Shipping from "./pages/Order/Shipping.jsx";
import PlaceOrder from "./pages/Order/PlaceOrder.jsx";
import Order from "./pages/Order/Order.jsx";
import MyOrders from "./pages/User/MyOrders.jsx";
import Orders from "./pages/Admin/Orders.jsx";
import OrderDetail from "./pages/Admin/OrderDetail.jsx";
import LoginAdmin from "./pages/Admin/LoginAdmin.jsx";
import Vouchers from "./pages/Admin/Vouchers.jsx";
import CreateVoucher from "./pages/Admin/createVoucher.jsx";
import ForgotPassword from "./pages/Auth/ForgotPassword.jsx";
import ResetPassword from "./pages/Auth/ResetPassword.jsx";
import NotFound from "./components/NotFound.jsx";

const router = createBrowserRouter([
  {
    path: "",
    element: <App />,
    children: [
      {
        index: true,
        path: "",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "reset-password/:token",
        element: <ResetPassword />,
      },
      {
        path: "register",
        element: <Register />,
      },

      {
        path: "favorite",
        element: <Favorite />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "shop",
        element: <Shop />,
      },
      {
        path: "product/:id",
        element: <ProductDetail />,
      },
      {
        path: "",
        element: <PrivateRoute />,
        children: [
          {
            path: "/profile",
            element: <Profile />,
          },
          {
            path: "shipping",
            element: <Shipping />,
          },
          {
            path: "placeorder",
            element: <PlaceOrder />,
          },
          {
            path: "my-orders",
            element: <MyOrders />,
          },
          {
            path: "order/:id",
            element: <Order />,
          },
        ],
      },
    ],
  },
  {
    path: "/admin/login",
    element: <LoginAdmin />,
  },
  {
    path: "admin",
    element: <AdminRoute />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "users",
        element: <Users />,
      },
      {
        path: "categories",
        element: <Categories />,
      },
      {
        path: "order-detail/:id",
        element: <OrderDetail />,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "orders",
        element: <Orders />,
      },
      {
        path: "products/create",
        element: <CreateProduct />,
      },
      {
        path: "products/update/:_id",
        element: <UpdateProduct />,
      },
      {
        path: "vouchers",
        element: <Vouchers />,
      },
      {
        path: "vouchers/create",
        element: <CreateVoucher />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PayPalScriptProvider>
      <RouterProvider router={router} />
    </PayPalScriptProvider>
  </Provider>
);
