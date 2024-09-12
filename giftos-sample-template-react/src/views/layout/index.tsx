import Header from '../layout/header'
import Products from '../../pages/Products'
import Footer from './footer'
import WhyUs from '../../pages/WhyUs'
import { Outlet, useLocation } from 'react-router-dom'
import Testimonials from '../../pages/Testimonials'
import ContactUs from '../../pages/ContactUs'
import NewArrivals from '../../pages/NewArrivals'
import Gifts from '../../pages/Gifts'

const Index = () => {
  const location = useLocation()
  return (
    <div>
      <Header />
      {location?.pathname === '/' && [<Products />, <NewArrivals />, <WhyUs />, <Gifts />, <ContactUs />, <Testimonials />]}
      <Outlet />
      <Footer />
    </div>
  )
}

export default Index