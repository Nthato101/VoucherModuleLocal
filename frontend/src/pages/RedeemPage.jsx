import React, {useState} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import Message from "../components/Message";
import message from "../components/Message";

function  RedeemPage(){

    // API endpoint to Backend
    const endpoint = 'http://127.0.0.1:8000/redeemvoucher/'

    // Pin Input intialization and Handlers
    const [pin,setPin] = useState({
        pin:''
    })

    //Message Display Intialization
    const[msg,setMsg] = useState({
        message:'',
    })

    const handleInput = (e) => {
        setPin({...pin,[e.target.name]:e.target.value,})
        e.target.setCustomValidity('')
    }
    function handleSubmit(event){
        event.preventDefault()
        var final_endpoint = endpoint.concat(pin.pin,'/')
        console.log(final_endpoint)
        axios.post(final_endpoint,pin)
            .then(
                response => {
                    if(response.status === 200){
                        console.log(response)
                        setMsg({...msg,
                            message:response.data,})
                        }
                }

            )
            .catch(
                err => console.log(err)
            )

    }


    return (

        <div className='container d-block center-block justify-content-center'>
            <header>
                <div className=" center text-center">
                    <h1 className="text-center">Redeem Your Voucher</h1>
                </div>
            </header>
            <br/>


            <div className='container'>
                <form className='form' onSubmit={handleSubmit}>
                    <div className='row d-flex justify-content-center'>
                        <div className="col-md-2 text-center">
                            <label htmlFor="pin" className="form-label">Pin</label>
                            <input type="text" minLength={4} maxLength={4} onChange={handleInput}
                                   className="form-control text-center" name="pin" required='True'
                                   onInvalid={(e) => {
                                       e.target.setCustomValidity("Enter your 4 digit pin")
                                   }}/>
                        </div>
                    </div>
                    <br/>


                    <div className="d-flex justify-content-center">
                        <button type="submit" className="btn btn-outline-dark">Redeem</button>

                        <Link to={`/`}>
                            <button type="submit" className="btn btn-outline-dark offset-3">Back</button>
                        </Link>
                    </div>
                </form>
                <br/>
                {msg?.message && <Message  message={msg?.message}/>}
            </div>

        </div>
    )
}

export default RedeemPage;