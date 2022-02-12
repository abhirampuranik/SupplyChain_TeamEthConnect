// import React, { Component } from "react";
// import SimpleStorageContract from "./contracts/SimpleStorage.json";
// import getWeb3 from "./getWeb3";

// import "./App.css";

// class App extends Component {
//   state = { storageValue: 0, web3: null, accounts: null, contract: null };

//   componentDidMount = async () => {
//     try {
//       // Get network provider and web3 instance.
//       const web3 = await getWeb3();

//       // Use web3 to get the user's accounts.
//       const accounts = await web3.eth.getAccounts();

//       // Get the contract instance.
//       const networkId = await web3.eth.net.getId();
//       const deployedNetwork = SimpleStorageContract.networks[networkId];
//       const instance = new web3.eth.Contract(
//         SimpleStorageContract.abi,
//         deployedNetwork && deployedNetwork.address,
//       );

//       // Set web3, accounts, and contract to the state, and then proceed with an
//       // example of interacting with the contract's methods.
//       this.setState({ web3, accounts, contract: instance }, this.runExample);
//     } catch (error) {
//       // Catch any errors for any of the above operations.
//       alert(
//         `Failed to load web3, accounts, or contract. Check console for details.`,
//       );
//       console.error(error);
//     }
//   };

//   runExample = async () => {
//     const { accounts, contract } = this.state;

//     // Stores a given value, 5 by default.
//     await contract.methods.set(7).send({ from: accounts[0] });

//     // Get the value from the contract to prove it worked.
//     const response = await contract.methods.get().call();

//     // Update state with the result.
//     this.setState({ storageValue: response });
//   };

//   render() {
//     if (!this.state.web3) {
//       return <div>Loading Web3, accounts, and contract...</div>;
//     }
//     return (
//       <div className="App">
//         <h1>Good to Go!</h1>
//         <p>Your Truffle Box is installed and ready.</p>
//         <h2>Smart Contract Example</h2>
//         <p>
//           If your contracts compiled and migrated successfully, below will show
//           a stored value of 5 (by default).
//         </p>
//         <p>
//           Try changing the value stored on <strong>line 42</strong> of App.js.
//         </p>
//         <div>The stored value is: {this.state.storageValue}</div>
//       </div>
//     );
//   }
// }
import React from 'react';
import './App.scss';
//import 'boxicons/css/boxicons.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import Region from './loginPages/Regional';
import Manufacturer from './loginPages/Manufacturer'
import Distributer from './loginPages/Distributer'
import Transporter from './loginPages/Transporter'
import User from './loginPages/User'
import Login from './loginPages/Userlogin'
import UserDash from "./dashboards/userDashboard"
import ManuDash from "./dashboards/manufacturerDashboard"
import TranDash from "./dashboards/transporterDashboard"
import RegionDash from "./dashboards/regionDashboard"
import DistDash from "./dashboards/distributorDashboard"



function App() {
    return (
        <BrowserRouter>
            <Routes>
            <Route path='/' element={<AppLayout />}>
                    <Route index element={<Manufacturer />} />
                    <Route path='/transporter' element={<Transporter />} />
                    <Route path='/distributor' element={<Distributer />} />
                    <Route path='/user' element={<User />} />
                    <Route path='/region' element={<Region />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/udashboard' element={<UserDash />} />
                    <Route path='/mdashboard' element={<ManuDash />} />
                    <Route path='/tdashboard' element={<TranDash />} />
                    <Route path='/ddashboard' element={<DistDash />} />
                    <Route path='/rdashboard' element={<RegionDash />} />


                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
