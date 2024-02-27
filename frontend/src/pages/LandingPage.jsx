import React from "react";
import {Link} from "react-router-dom";


function LandingPage(){
    return (
        <div className="container-md">
            <header>
                    <div className=" center text-center">
                        <h1 className="text-center">Welcome!</h1>
                    </div>
            </header>
                <br/>
                <br/>
                <br/>

            <div className=" row text-center">
                    <div className="col">
                        <Link to={`/vadmin`}>
                            <button className="btn btn-dark">Voucher Admin</button>
                        </Link>

                    </div>
                <div className="col">
                    <Link to={`/vredeem`}>
                        <button className="btn btn-dark">Reedem a Voucher</button>
                    </Link>
                </div>
            </div>

        </div>

    )

}

export default LandingPage