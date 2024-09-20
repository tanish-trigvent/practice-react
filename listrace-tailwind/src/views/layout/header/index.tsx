import React from "react";

const Header = () => {
  const navItems = [
    {
      label: "Home",
      link: "/",
    },
    {
      label: "How It Works",
      link: "/how-it-works",
    },
    {
      label: "Explore",
      link: "/Explore",
    },
    {
      label: "Review",
      link: "/review",
    },
    {
      label: "Blog",
      link: "/blog",
    },
    {
      label: "Contact",
      link: "/contact",
    },
  ];

  return (
    <>
      <header className="header-top flex w-full border justify-between p-2  align-center">
        <div className="header-top-left  float-left">
          <select name="language" className="m-2 text-gray-400 ">
            <option value="EN">EN</option>
            <option value="BN">BN</option>
            <option value="AB">AB</option>
          </select>
          <select name="currency" className="text-gray-400 m-2">
            <option value="USD">USD</option>
            <option value="EURO">EURO</option>
            <option value="BDT">BDT</option>
          </select>
        </div>
        <div className="header-top-right float-right w-1/4 justify-between flex ">
          <span className="p-2 text-gray-400 text-sm ">+1 222 777 6565</span>
          <a href="/" className="border-l p-2 text-gray-400 text-sm ">
            Sign In
          </a>
          <a href="/" className="border-l p-2 text-gray-400 text-sm ">
            Register
          </a>
        </div>
      </header>
      <section className="header flex w-full  p-4 jusify-between">
        <span className="font-bold text-lg w-1/2 text-left ms-8 ">
          <a href="/">
            LIST<span className="text-red-500">RACE</span>
          </a>
        </span>
        <ul className="flex w-1/2   float-right jusify-between float-right">
          {navItems?.map((item) => (
            <li className=" uppercase w-40 text-center font-semibold text-gray-500 align-right text-sm  cursor-pointer hover:text-red-500">
              {item?.label}
            </li>
          ))}
        </ul>
      </section>
    </>
  );
};

export default Header;
