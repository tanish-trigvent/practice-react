import React from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import './slider.css'

const Slider = () => {
    return (
        <Slide>
            <div className="each-slide-effect">
                <div className="carousel-item active">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-7">
                                <div className="detail-box">
                                    <h1>
                                        Welcome To Our <br />
                                        Gift Shop
                                    </h1>
                                    <p>
                                        Sequi perspiciatis nulla reiciendis, rem, tenetur impedit, eveniet non necessitatibus error distinctio mollitia suscipit. Nostrum fugit doloribus consequatur distinctio esse, possimus maiores aliquid repellat beatae cum, perspiciatis enim, accusantium perferendis.
                                    </p>
                                    <a href="/contact">
                                        Contact Us
                                    </a>
                                </div>
                            </div>
                            <div className="col-md-5 ">
                                <div className="img-box">
                                    <img src={require(`../../../assets/images/slider-img.png`)} alt="slider" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Slide>
    );
};

export default Slider;