import React, {useState} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import Message from "../components/Message";

function CreatePage(){

    const customStylingDiv = {
        width: '250px'
    }
    // Minimum Date Allowed for Setting Expiry
    function currentDate(){
        var final_date;
        var today = new Date()
        var YYYY = today.getFullYear() ;
        var MM = today.getMonth() +1;
        if(MM < 10){
            MM = '0'+ MM;
        }
        var DD = today.getDate()
        if(DD < 10){
            DD = '0'+ DD;
        }

        final_date = YYYY+'-'+MM+'-'+DD

        return final_date
    }
    const min_date = currentDate()

    //Message Display Intialization
    const[msg,setMsg] = useState({
        message:'',
    })

    // API endpoint from Backend
    const endpoint = 'http://127.0.0.1:8000/mkevoucher/'

    // Voucher Initialization and Handlers
    const [voucher,setVoucher] = useState({
        redemptions:'',
        created_at:'',
        expires_at:'',
        pin:''
    })

    const handleInput = (e) => {
        setVoucher({...voucher,[e.target.name]:e.target.value})
        e.target.setCustomValidity('')
    }

    function handleSubmit(event){
        event.preventDefault()
        axios.post(endpoint,voucher)
           .then(
                response => {
                    if(response.statusText === 'Created'){
                        console.log(response)
                        setMsg({...msg,
                            message:'Voucher created successfully with:\n Pin: '+response.data.pin+'\n Expiry Date: '+response.data.expires_at+'  Redemptions : '+response.data.redemptions,})
                        }
                }
                )
            .catch(
                err => err
            )
    }

    // Voucher List Component render
    return(
        <div className='container'>
            <header>
                <div className=" d-flex justify-content-center">
                    <h1 className="text-center">Create Voucher</h1>
                </div>
            </header>
            <br/>
            <br/>
            <div className="container text-center align-items-center" >
                <form className='d-flex flex-column align-items-center' onSubmit={handleSubmit}>
                    <div className='row'  style={customStylingDiv}>
                        <label htmlFor="pin" className="form-label">Pin</label>
                        <input type="text" minLength={4} maxLength={4} required onChange={handleInput} className="form-control col-md-2 text-center"
                               onInvalid={(e)=>
                                   {e.target.setCustomValidity("Enter a 4 digit pin")}}  name="pin"/>
                        <label htmlFor="expires_at" className="form-label">Expiry Date</label>
                        <input type="date" required min={min_date} className="form-control col-md-2 text-center" onChange={handleInput}
                               name="expires_at"  onInvalid={(e)=>
                                   {e.target.setCustomValidity("Date not inserted")}}/>
                        <label htmlFor="redemptions" className="form-label">Redemptions</label>
                        <input type="number" required min={1} className="form-control col-md-2 text-center" onChange={handleInput} placeholder='Insert a number Eg: 5' name="redemptions"
                                onInvalid={(e)=>
                                   {e.target.setCustomValidity("Number not Inserted")}}
                        />
                    </div>
                    <br/>
                    <br/>
                    <div className="d-flex justify-content-center">
                        <button className="btn btn-outline-dark">Create Voucher</button>

                        <Link to={`/vadmin`}>
                            <button type="submit" className="btn btn-outline-dark offset-3">Back</button>
                        </Link>
                    </div>

                </form>
                <br/>
                {msg?.message && <Message message={msg.message}/>}
            </div>


        </div>

    )

}

export default CreatePage