import React from 'react';
function RightSection({ imageURL, productName, productDescription, learnMore }) {
    return (
        <div className="container mt-5 mb-5">
            <div className="row align-items-center">
                <div className="col-6">
                    <h1>{productName}</h1>
                    <p className="fs-5 lh-lg">
                        {productDescription}
                    </p>
                    <div className="mt-4">
                        <a href={learnMore}className="text-decoration-none">Learn More
                            <i className="fa-solid fa-arrow-right ms-2"></i>
                        </a>
                    </div>
                </div>
                <div className="col-6">
                    <img src={imageURL} className="img-fluid" alt={productName}/>
                </div>
            </div>
        </div>
    );
}
export default RightSection;