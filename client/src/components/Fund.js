import React from 'react'
import {ethers} from "ethers"
const Fund = ({State})=>{
    async function Funding(event)
    {
      event.preventDefault();
      console.log("hii")
        const {contract}=State;
        
        const name=document.querySelector("#Name").value;
        const message=document.querySelector("#message").value;
        console.log(name,message)
        const amount={value:ethers.utils.parseEther("0.001")};
        console.log(amount)
        const tx= await contract.payment(name,message,amount);
        await tx.wait();
        alert("Transaction Done Succesfully!!")
    }

  return (
    <>
  <div className="container-md" style={{ width: "50%", marginTop: "25px" }}>
        <form onSubmit={Funding}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              id="Name"
              placeholder="Enter Your Name"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Message</label>
            <input
              type="text"
              className="form-control"
              id="message"
              placeholder="Enter Your Message"
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={!State.contract}
          >
            Pay
          </button>
        </form>
      </div>
   </>
  )
}

export default Fund