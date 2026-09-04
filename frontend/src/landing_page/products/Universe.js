import React from 'react';

function Universe() {
    return (
        <div className="container mt-5">
            <div className="row text-center">
                <h1>The Zerodha Universe</h1>
                <p className="text-muted mt-3">
                    Extend your trading and investment experience even further
                    with our partner platforms
                </p>

                <div className="col-12 col-md-6 col-lg-4 p-4 mt-5">
                    <div
                        className="d-flex justify-content-center align-items-center mx-auto"
                        style={{ height: "100px", width: "220px" }}
                    >
                        <img
                            src="/media/zerodhaFundhouse.png"
                            alt="Zerodha Fund House"
                            className="img-fluid"
                            style={{maxWidth: "200px",maxHeight: "80px",objectFit: "contain"}}
                        />
                    </div>

                    <p className="text-muted mt-4 mx-auto" style={{ maxWidth: "330px" }}>
                        Our asset management venture that is creating simple and
                        transparent index funds to help you save for your goals.
                    </p>
                </div>
                <div className="col-12 col-md-6 col-lg-4 p-4 mt-5">
                    <div
                        className="d-flex justify-content-center align-items-center mx-auto"
                        style={{ height: "100px", width: "220px" }}
                    >
                        <img
                            src="/media/sensibullLogo.svg"
                            alt="Sensibull"
                            className="img-fluid"
                            style={{maxWidth: "200px",maxHeight: "80px",objectFit: "contain"}}
                        />
                    </div>

                    <p className="text-muted mt-4 mx-auto" style={{ maxWidth: "330px" }}>
                        Options trading platform that lets you create strategies,
                        analyze positions, and examine data points like open
                        interest, FII/DII, and more.
                    </p>
                </div>
                <div className="col-12 col-md-6 col-lg-4 p-4 mt-5">
                    <div
                        className="d-flex justify-content-center align-items-center mx-auto"
                        style={{ height: "100px", width: "220px" }}
                    >
                        <img
                            src="/media/tijori.png"
                            alt="Tijori"
                            className="img-fluid"
                            style={{maxWidth: "200px",maxHeight: "80px",objectFit: "contain"}}
                        />
                    </div>

                    <p className="text-muted mt-4 mx-auto" style={{ maxWidth: "330px" }}>
                        Investment research platform that offers detailed insights
                        on stocks, sectors, supply chains, and more.
                    </p>
                </div>
                <div className="col-12 col-md-6 col-lg-4 p-4 mt-3 mb-5">
                    <div
                        className="d-flex justify-content-center align-items-center mx-auto"
                        style={{ height: "100px", width: "220px" }}
                    >
                        <img
                            src="/media/streakLogo.png"
                            alt="Streak"
                            className="img-fluid"
                            style={{maxWidth: "200px",maxHeight: "80px",objectFit: "contain"}}
                        />
                    </div>

                    <p className="text-muted mt-4 mx-auto" style={{ maxWidth: "330px" }}>
                        Systematic trading platform that allows you to create and
                        backtest strategies without coding.
                    </p>
                </div>
                <div className="col-12 col-md-6 col-lg-4 p-4 mt-3 mb-5">
                    <div
                        className="d-flex justify-content-center align-items-center mx-auto"
                        style={{ height: "100px", width: "220px" }}
                    >
                        <img
                            src="/media/smallcaseLogo.png"
                            alt="Smallcase"
                            className="img-fluid"
                            style={{maxWidth: "200px",maxHeight: "80px",objectFit: "contain"}}
                        />
                    </div>

                    <p className="text-muted mt-4 mx-auto" style={{ maxWidth: "330px" }}>
                        Thematic investing platform that helps you invest in
                        diversified baskets of stocks on ETFs.
                    </p>
                </div>
                <div className="col-12 col-md-6 col-lg-4 p-4 mt-3 mb-5">
                    <div
                        className="d-flex justify-content-center align-items-center mx-auto"
                        style={{ height: "100px", width: "220px" }}
                    >
                        <img
                            src="/media/dittoLogo.png"
                            alt="Ditto"
                            className="img-fluid"
                            style={{maxWidth: "200px",maxHeight: "80px",objectFit: "contain"}}
                        />
                    </div>

                    <p className="text-muted mt-4 mx-auto" style={{ maxWidth: "330px" }}>
                        Personalized advice on life and health insurance.
                        No spam and no mis-selling.
                    </p>
                </div>
                <button className='p-2 btn btn-primary fs-5 mb-5' style={{width:"20%",margin:"0 auto"}}>Signup</button>
            </div>
        </div>
    );
}
export default Universe;