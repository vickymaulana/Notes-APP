import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home: React.FC = () => {
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card mt-4">
                        <div className="card-body">
                            <h5 className="card-title">Notes</h5>
                            <p className="card-text">Notes APP Using React and Bootsrap</p>
                            <a href="/notes" className="btn btn-primary">Klik</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
