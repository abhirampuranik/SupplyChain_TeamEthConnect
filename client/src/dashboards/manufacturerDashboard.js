import React from "react";
import getWeb3 from "../getWeb3";
import { useState, useEffect } from 'react';
import document from "../contracts/Manufacturer.json";

function ManuDash(){

    const [account,setAccount]=useState('');
    const [contract,setContract]=useState(null);

    useEffect(()=>{
    const loadContract= async()=>{
    const web3 = await getWeb3();
    const accounts = await web3.eth.getAccounts()
    console.log(accounts)
    setAccount(accounts[0])

    const networkId = await web3.eth.net.getId()
    const networkData = document.networks[networkId]
        if(networkData){            
            const abi = document.abi
            const address = networkData.address
            const contract = new web3.eth.Contract(abi, address)
            setContract(contract)
        }else{
            window.alert('Smart Contract not deployed to detected network')
        }
    }

    const contract=loadContract();
    },[]);


    const details = contract.methods.getManuDetails(account).call()
    console.log(details)

    return <h1>Hi</h1>
}
export default ManuDash