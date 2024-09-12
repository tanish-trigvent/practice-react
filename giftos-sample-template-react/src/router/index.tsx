import MainLayout from '../views/layout/index'
import {
  createBrowserRouter,
} from "react-router-dom";
import Products from "../pages/Products";
import WhyUs from "../pages/WhyUs";
import Testimonials from "../pages/Testimonials";
import ContactUs from "../pages/ContactUs";



export const routers = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: '/shop',
        element: <Products />
      },
      {
        path: '/why',
        element: <WhyUs />
      },
      {
        path: '/testimonial',
        element: <Testimonials />
      },
      {
        path: '/contact',
        element: <ContactUs />
      }
    ]
  },
]);
