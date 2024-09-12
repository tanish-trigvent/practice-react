const Products = () => {

    const products = [
        {
            id: 1,
            productName: 'Ring',
            productPrice: '$200',
            productImage: 'p1.png'
        },
        {
            id: 2,
            productName: 'Watch',
            productPrice: '$200',
            productImage: 'p2.png'
        }
        , {
            id: 3,
            productName: 'Teddy Bear',
            productPrice: '$200',
            productImage: 'p3.png'
        },
        {
            id: 4,
            productName: 'Flower Bouquet',
            productPrice: '$200',
            productImage: 'p4.png'
        },
        {
            id: 5,
            productName: 'Teddy Bear',
            productPrice: '$500',
            productImage: 'p5.png'
        },
        {
            id: 6,
            productName: 'Flower Bouquet',
            productPrice: '$300',
            productImage: 'p6.png'
        },
        {
            id: 7,
            productName: 'Watch',
            productPrice: '$300',
            productImage: 'p7.png'
        },
        {
            id: 8,
            productName: 'Watch',
            productPrice: '$300',
            productImage: 'p8.png'
        }
    ]



    return (
        <section className="shop_section layout_padding">
            <div className="container">
                <div className="heading_container heading_center">
                    <h2>
                        Latest Products
                    </h2>
                </div>
                <div className="row">
                    {products?.map((product: any) => (
                        <div className="col-sm-6 col-md-4 col-lg-3">
                            <div className="box">
                                <a href="/#">
                                    <div className="img-box">
                                        <img src={require(`../assets/images/${product?.productImage}`)} alt="productImage" />
                                    </div>
                                    <div className="detail-box">
                                        <h6>
                                            {product?.productName}
                                        </h6>
                                        <h6>
                                            Price
                                            <span>
                                                {product?.productPrice}
                                            </span>
                                        </h6>
                                    </div>
                                    <div className="new">
                                        <span>
                                            New
                                        </span>
                                    </div>
                                </a>
                            </div>
                        </div>
                    ))}

                </div>
                <div className="btn-box">
                    <a href="/#">
                        View All Products
                    </a>
                </div>
            </div>
        </section>
    )
}

export default Products