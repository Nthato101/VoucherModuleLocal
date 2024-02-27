import React from "react";

function  ListItem({el}){
   return (
       <div>
                <button  className="list-group-item list-group-item-action ">
                    <div className="d-flex w-100 justify-content-between">
                        <h5 className="mb-1">Voucher ID: {el.id},Status: {el.status}</h5>
                        <small>Date: {el.created_at}</small>
                    </div>
                    <p className="mb-1"> Redemptions Left: {el.redemptions}</p>
                    <small>This voucher expires {el.expires_at}</small>
                </button>
       </div>


   )
}

export default ListItem