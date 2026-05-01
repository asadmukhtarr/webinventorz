import React from 'react'

export default function newslistners() {
    return (
        <div>
            < section className="section bg-white" >
                <div className="container">
                    <div className="news-alert" data-aos="zoom-in">
                        <div className="row align-items-center">
                            <div className="col-md-8">
                                <div className="d-flex align-items-center gap-3 flex-wrap">
                                    <span className="badge bg-danger px-3 py-2 rounded-pill">
                                        <i className="fa fa-bell"></i> Breaking News
                                    </span>
                                    <span>
                                        <i className="fa fa-circle" style={{ fontSize: '0.5rem', color: '#FE171B' }}></i>
                                        New Feature Release: AI-Powered Analytics Dashboard now available for all Pro plans!
                                    </span>
                                </div>
                            </div>
                            <div className="col-md-4 text-md-end mt-3 mt-md-0">
                                <a href="#" className="btn btn-sm btn-outline-custom">
                                    Learn More <i className="fa fa-arrow-right"></i>
                                </a>
                            </div>
                        </div>
                        <hr className="my-3 opacity-25" />
                        <div className="row align-items-center">
                            <div className="col-md-5">
                                <h6 className="fw-bold mb-1">
                                    <i className="fa fa-envelope me-2" style={{ color: '#FE171B' }}></i> Stay Updated
                                </h6>
                                <p className="small text-secondary mb-0">Get the latest news and offers straight to your inbox.</p>
                            </div>
                            <div className="col-md-7">
                                <form className="d-flex flex-wrap gap-2 justify-content-md-end">
                                    <div className="flex-grow-1" style={{ minWidth: '180px' }}>
                                        <input
                                            type="text"
                                            className="form-control form-control-sm rounded-pill"
                                            placeholder="Your Name"
                                            style={{ border: '1px solid #e2e8f0', padding: '8px 16px' }}
                                        />
                                    </div>
                                    <div className="flex-grow-1" style={{ minWidth: '200px' }}>
                                        <input
                                            type="email"
                                            className="form-control form-control-sm rounded-pill"
                                            placeholder="Email Address"
                                            style={{ border: '1px solid #e2e8f0', padding: '8px 16px' }}
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="btn btn-custom btn-sm px-4"
                                        style={{ padding: '8px 20px', fontSize: '0.85rem' }}
                                    >
                                        Subscribe <i className="fa fa-paper-plane ms-1"></i>
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section >
        </div>
    )
}
