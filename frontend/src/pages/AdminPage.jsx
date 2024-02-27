import React from "react";
import {useEffect,useState} from "react";
import ListItem from "../components/ListItem";
import {Link} from "react-router-dom";
import axios from "axios";

function AdminPage(){
    // Voucher List Initialization
    const [voucherData,setVoucherData] = useState([])

    // API endpoint from Backend
    const endpoint = `http://127.0.0.1:8000/voucherlist/`

    // Voucher List data fetch from backend and Voucher List update
    const fetchData = async () => {
        const response = await axios.get(endpoint)
        const {data} = response
        setVoucherData(data)
        return data
    }
    useEffect(() => {
        fetchData()
    },[])

    // Voucher List Render
    return(
        <div className="container-md">
            <header>
                <div className=" center text-center">
                    <h1 className="text-center">Voucher Admin</h1>
                </div>
            </header>
            <br/>
            <br/>
            <br/>
            <div className=" row text-center">
                <div className="col">
                    <Link to={`/`}>
                        <button className="btn btn-dark">Back</button>
                    </Link>

                </div>
                <div className="col">
                    <Link to={`/vcreate`}>
                        <button className="btn btn-dark">Create a Voucher</button>
                    </Link>
                </div>
            </div>
            <br/>
            <br/>
            <br/>
            <div className="list-group">
                {voucherData.map(el => <ListItem key ={el.id} el={el}/>)}
            </div>

        </div>

    )
}

export default AdminPage;