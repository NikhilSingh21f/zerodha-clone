/*import React from 'react';

function LeftSection({imageURL,productName,productDescription,tryDemo,learnMore,googlePlay,appStore,}) {
    return (
        <div className='container mt-5 p-5'>
            <div className='row'>
                <div className='col-6 p-3'>
                    <img src={imageURL} />
                </div>
                <div className='col-6 mt-5 p-5'>
                    <h1>{productName}</h1>
                    <p>{productDescription}</p>
                    <div className='col-6 d-flex gap-3'>
                        <a href={tryDemo} className="text-decoration-none">Try Demo <i className="fa-solid fa-arrow-right" aria-hidden="true"></i></a>
                        <a href={learnMore} className="text-decoration-none"style={{ marginLeft: '50px' }}>Learn More <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
                        </a>
                    </div>
                    <div className='mt-3'>
                        <a href={googlePlay}>
                            <img src='media\googlePlayBadge.svg' />
                        </a>
                        <a href={appStore}>
                            <img src='media\appstoreBadge.svg' />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LeftSection;*/

import React from 'react';
function LeftSection({imageURL,productName,productDescription,tryDemo,learnMore,googlePlay,appStore,}) {
    return (
        <div className="container mt-5 mb-5">
            <div className="row align-items-center">
                <div className="col-6">
                    <img src={imageURL} className="img-fluid" alt={productName}/>
                </div>

                <div className="col-6">
                    <h1>{productName}</h1>
                    <p className="fs-5 lh-lg">
                        {productDescription}
                    </p>
                    <div className="d-flex gap-5 mt-5">
                        <a href={tryDemo} className="text-decoration-none">Try Demo<i className="fa-solid fa-arrow-right ms-2"></i></a>
                        <a href={learnMore}className="text-decoration-none">Learn More<i className="fa-solid fa-arrow-right ms-2"></i></a>
                    </div>
                    <div className="d-flex gap-2 mt-4">
                        <a href={googlePlay}>
                            <img src="media/googlePlayBadge.svg"alt="Google Play"/>
                        </a>
                        <a href={appStore}>
                            <img src="media/appstoreBadge.svg" alt="App Store"/>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default LeftSection;