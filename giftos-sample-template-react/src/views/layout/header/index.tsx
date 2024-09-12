import React, { useState } from 'react'
import Logo from './Logo'
import { Link } from 'react-router-dom'
import Slider from './Slider'

const Index = () => {

  const [show, setShow] = useState(false)
  const navItems = [{
    id: 1,
    name: 'HOME',
    navLinks: '/'
  },
  {
    id: 2,
    name: 'SHOP',
    navLinks: '/shop'
  },
  {
    id: 3,
    name: 'WHY US',
    navLinks: '/why'
  },
  {
    id: 4,
    name: 'TESTIMONIAL',
    navLinks: '/testimonial'
  },
  {
    id: 5,
    name: 'CONTACT US',
    navLinks: '/contact'
  }
  ]

  const handleToggler = () => {
    setShow(!show)
  }
  return (
    <div className="hero_area">
      <header className="header_section">
        <nav className="navbar navbar-expand-lg custom_nav-container " >
          <Logo />
          <button onClick={handleToggler} className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded={show} aria-label="Toggle navigation">
            <span className=""></span>
          </button>
          <div className={`collapse navbar-collapse ${window?.location?.pathname !== '/' && 'innerpage_navbar'} ${show && 'show'} `} id="navbarSupportedContent"  >
            <ul className="navbar-nav  ">
              {navItems?.map((item: any) => (
                <li className={`nav-item ${window?.location?.pathname === item?.navLinks && 'active'}`} key={item?.id} >
                  <Link className="nav-link" to={item?.navLinks}>{item?.name}</Link>
                </li>
              ))}
            </ul>
            {/* <div className="user_option">
              <a href="">
                <i className="fa fa-user" aria-hidden="true"></i>
                <span>
                  Login
                </span>
              </a>
              <a href="">
                <i className="fa fa-shopping-bag" aria-hidden="true"></i>
              </a>
              <form className="form-inline ">
                <button className="btn nav_search-btn" type="submit">
                  <i className="fa fa-search" aria-hidden="true"></i>
                </button>
              </form>
            </div> */}
          </div>
        </nav>
      </header>
      {
        window.location.pathname === '/' && (
          <section className="slider_section">
            <div className="slider_container">
              <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                <div className="carousel-inner">
                  <Slider />
                </div>
              </div>
            </div>
          </section>)
      }

    </div>
  )
}

export default Index