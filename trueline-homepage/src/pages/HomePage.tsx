import React from "react";
import Slider from "../layout/Slider";

const HomePage = ({ showMenu, setShowMenu }: any) => {
  return (
    <>
      <Slider showMenu={showMenu} setShowMenu={setShowMenu} />
    </>
  );
};

export default HomePage;
