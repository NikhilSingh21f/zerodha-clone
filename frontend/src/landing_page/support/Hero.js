import React from "react";
function Hero() {
    return (
        <section className="container-fluid bg-primary text-white" id="supportHero">
            <div className="container py-4">
                <div className="d-flex justify-content-between align-items-center">
                    <h4 className="mb-0">Support Portal</h4>
                    <a href="" className="text-white">Track Tickets</a>
                </div>
            </div>
            <div className="container py-5">
                <div className="row">
                    <div className="col-md-7 px-4">
                        <h1 className="fs-3 fw-normal mb-4">Search for an answer or browse help topicsto create a ticket</h1>
                        <input type="text" className="form-control form-control-lg mb-3"
                            placeholder="Eg. how do I activate F&O, why is my order getting rejected..."/>
                        <div className="d-flex flex-wrap gap-3">
                            <a href="" className="text-white">Track account opening</a>
                            <a href="" className="text-white">Track segment activation</a>
                            <a href="" className="text-white">Intraday margins  </a>
                            <a href="" className="text-white">Kite user manual </a>
                        </div>
                    </div>
                    <div className="col-md-5 px-5">
                        <h2 className="fs-4 fw-normal mb-3">Featured</h2>
                        <div className="mb-3">
                            <a href="" className="text-white">1. Current Takeovers and Delisting - January 2024</a>
                        </div>
                        <div>
                            <a href="" className="text-white">2. Latest Intraday leverages - MIS & CO</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
export default Hero;