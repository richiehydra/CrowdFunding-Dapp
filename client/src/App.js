import abi from "./contract.json"
import profile from "./crowd.jpg"
import {useState,useEffect} from "react";
import {ethers} from "ethers";
import './App.css';

import Fund from "./components/Fund";
import GetUsers from "./components/GetUsers"

function App() {
  const [account,setAccount]=useState(" ");
  const [State,setState]=useState(
    {
      provider:null,
      signer:null,
     contract:null
    }
  )

  useEffect(()=>
  {
    const connectWallet=async()=>
    {
      const contractAddress="0x05E3d6749b108de10D38c7377a3F063F341F3755";
      const contractabi=abi.abi;

      try
      {
        const {ethereum}=window;

        if(ethereum)
        {
          const accounts=await ethereum.request({method:"eth_requestAccounts"});
          const account=accounts[0];
          setAccount(account)
        }
          
          const provider=new ethers.providers.Web3Provider(ethereum);
          console.log(provider)
          const signer=provider.getSigner();
          const contract=new ethers.Contract(contractAddress,contractabi,signer);
          // console.log(provider,signer,contract)
          setState({provider,signer,contract})
          
        
      }
      catch(err)
      {
        console.log(err)
      }
    }
    connectWallet()
  },[])




  return (

    <div style={{ backgroundColor: "#EFEFEF", height: "100%" }}>
      
      <p
        class="text-muted lead "
        style={{ marginTop: "10px", marginLeft: "5px" }}
      >
        <small>Connected Account - {account}</small>
      </p>
    <div className="App">
      <Fund State={State}/>
      <GetUsers State={State}/>
    </div>
    </div>
  );
}

export default App;
