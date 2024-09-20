const Home = () => {
  return (
    <>
      <section>
        <div className="welcome-hero ">
          <div className="w-full  flex flex-col opacity-100">
            <h2 className="text-4xl uppercase font-black text-white w-3/4 tracking-widest  self-center">
              best place to find and explore that all you need
            </h2>
            <h4 className="text-lg text-white mt-6">
              Find Best Place, Restaurant, Hotel, Real State and many more think
              in just One click
            </h4>
            <div className="w-4/5 self-center flex lg:flex-row  p-4 mt-20 ">
              <div className="bg-white w-full flex  p-3">
                <span className="flex w-1/2 border-r-2 ">
                  <span className="text-left   w-3/4">
                    <span className="m-1 text-lg text-gray-600 font-semibold">
                      What?
                    </span>
                    <input
                      className="w-3/4 font-sm  text-gray-600"
                      type="text"
                      placeholder="Ex: Place, Restaurent, Food, Automobile"
                    />
                  </span>
                  <span className="w-5 self-center m-1">
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fas"
                      data-icon="list-ul"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      className="svg-inline--fa fa-list-ul fa-lg"
                    >
                      <path
                        fill="currentColor"
                        d="M64 144a48 48 0 1 0 0-96 48 48 0 1 0 0 96zM192 64c-17.7 0-32 14.3-32 32s14.3 32 32 32l288 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L192 64zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32l288 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-288 0zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32l288 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-288 0zM64 464a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm48-208a48 48 0 1 0 -96 0 48 48 0 1 0 96 0z"
                        className=""
                      ></path>
                    </svg>
                  </span>
                </span>
                <span className="flex w-1/2 ml-4">
                  <span className="text-left  w-3/4">
                    <span className="m-1 text-lg text-gray-600 font-semibold">
                      Location
                    </span>
                    <input
                      className="w-3/4 font-sm  text-gray-600"
                      type="text"
                      placeholder="Ex: London, Newyork, Rome"
                    />
                  </span>
                  <span className="w-5 self-center ml-20">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <path d="M256 0c17.7 0 32 14.3 32 32l0 34.7C368.4 80.1 431.9 143.6 445.3 224l34.7 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-34.7 0C431.9 368.4 368.4 431.9 288 445.3l0 34.7c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-34.7C143.6 431.9 80.1 368.4 66.7 288L32 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l34.7 0C80.1 143.6 143.6 80.1 224 66.7L224 32c0-17.7 14.3-32 32-32zM128 256a128 128 0 1 0 256 0 128 128 0 1 0 -256 0zm128-80a80 80 0 1 1 0 160 80 80 0 1 1 0-160z" />
                    </svg>
                  </span>
                </span>
              </div>
              <span className="ml-5  w-1/6">
                <button className="bg-red-500 hover:bg-red-600 w-full h-full font-semibold text-white ">
                  Search
                </button>
              </span>
            </div>
          </div>
        </div>
        <div className="cards grid  xl:grid-rows-1 lg:grid-rows-2  sm:grid-rows-3 xs:grid-rows-4 md:grid-rows-2  grid-flow-col w-full self-center justify-evenly">
          <div className="card rounded  lg:-mt-8  xl:-mt-8 z-10 h-50 bg-white w-52 p-4 shadow-xl flex flex-col ">
            <span className="self-center">
              <img
                src={require("../../assets/images/restaurant.png")}
                alt=""
                className="w-12"
              />
            </span>
            <span className="self-center font-bold text-gray-600">
              Restaurant
            </span>
            <span className="self-center text-gray-400 text-sm">
              150 listings
            </span>
          </div>
          <div className="card rounded  lg:mt-5 xl:-mt-8 z-10 h-40 bg-white w-52 p-4 shadow-xl  flex flex-col">
            <span className="self-center">
              <img
                src={require("../../assets/images/restaurant.png")}
                alt=""
                className="w-12"
              />
            </span>
            <span className="self-center font-bold text-gray-600">
              Restaurant
            </span>
            <span className="self-center text-gray-400 text-sm">
              150 listings
            </span>
          </div>
          <div className="card rounded lg:-mt-8 z-10 h-18 bg-white w-52 p-4  shadow-xl  flex flex-col">
            <span className="self-center">
              <img
                src={require("../../assets/images/restaurant.png")}
                alt=""
                className="w-12"
              />
            </span>
            <span className="self-center font-bold text-gray-600">
              Restaurant
            </span>
            <span className="self-center text-gray-400 text-sm">
              150 listings
            </span>
          </div>
          <div className="card rounded  lg:mt-5  xl:-mt-8 z-10 h-18 bg-white w-52 p-4  shadow-xl  flex flex-col">
            <span className="self-center">
              <img
                src={require("../../assets/images/restaurant.png")}
                alt=""
                className="w-12"
              />
            </span>
            <span className="self-center font-bold text-gray-600">
              Restaurant
            </span>
            <span className="self-center text-gray-400 text-sm">
              150 listings
            </span>
          </div>
          <div className="card rounded lg:-mt-8 z-10 h-18 bg-white w-52  p-4 shadow-xl  flex flex-col">
            <span className="self-center">
              <img
                src={require("../../assets/images/restaurant.png")}
                alt=""
                className="w-12"
              />
            </span>
            <span className="self-center font-bold text-gray-600">
              Restaurant
            </span>
            <span className="self-center text-gray-400 text-sm">
              150 listings
            </span>
          </div>
        </div>
        <div className="w-full h-52 flex flex-col mt-20">
          <h2 className="self-center text-2xl font-semibold text-gray-500 mt-10 ">
            HOW IT WORK
          </h2>
          <span className="self-center text-lg mt-10 font-semibold text-gray-500 ">
            Learn More about how our website works
          </span>
        </div>
      </section>
    </>
  );
};

export default Home;
