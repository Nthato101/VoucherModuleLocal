import React from "react";

function  Message({message}){
   return (
       <div className="alert alert-light container d-flex justify-content-center" role="alert">
           {message}
       </div>


   )
}

export default Message