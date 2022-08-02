import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

import { contractABI, contractAddress } from "../utils/constants";

export const TransactionContext = React.createContext();

const { ethereum } = window;

const createEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const transactionsContract = new ethers.Contract(contractAddress, contractABI, signer);

  
  //console.log('types',transactionsContract);
  return transactionsContract;
};

export const TransactionsProvider = ({ children }) => {
  const [formData, setformData] = useState({ address:"", empName: "", long: "", lat: "", requiredDistance: "", startHour: "", endHour: "" });
  const [currentAccount, setCurrentAccount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [transactionCount, setTransactionCount] = useState(localStorage.getItem("transactionCount"));
  const [transactions, setTransactions] = useState([]);
  const [transact, setTransact] = useState([]);
  const [data, setContractdata] = useState([]);

  const handleChange = (e, name) => {
    setformData((prevState) => ({ ...prevState, [name]: e.target.value }));
  };

  const getAllTransactions = async () => {
    try {
      if (ethereum) {
        const transactionsContract = createEthereumContract();

        const availableTransactions = await transactionsContract.getAllEmployees();

        const structuredTransactions = availableTransactions.map((transaction) => ({
          transaction
        }));
         
        // console.log('accounts',availableTransactions[0]._hex);

        setTransactions(structuredTransactions);
      } else {
        console.log("Ethereum is not present");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getTransactionDetails = async (add) => {
    try {
      if (ethereum) {
        const transactionsContract = createEthereumContract();

        const availableTransact = await transactionsContract.getEmployee(add);

        const structuredTransact = availableTransact.map((transact) => ({
          transact
        }));
         
        // console.log('home', structuredTransact);
        //  return availableTransact;

       setTransact(structuredTransact);
      } else { 
        console.log("Ethereum is not present");
      }
    } catch (error) {
      console.log(error);
    }

  };


  const setContract = async (add, distance, fetchedHour) => {
    try {
      if (ethereum) {
       // console.log(add, distance, fetchedHour);
        const transactionsContract = createEthereumContract();

        const availableContractdata = await transactionsContract.setContract(add, distance, fetchedHour);

        const structuredTransact = availableContractdata.map((data) => ({
          data
        }));
         
        // console.log('home', structuredTransact);
        //  return availableTransact;

       setContractdata(structuredTransact);
      } else { 
        console.log("Ethereum is not present");
      }
    } catch (error) {
      console.log(error);
    }

  };

  const checkIfWalletIsConnect = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask.");

      const accounts = await ethereum.request({ method: "eth_accounts" });
      // console.log(accounts);
      if (accounts.length) {
        setCurrentAccount(accounts[0]);

        getAllTransactions();
      } else {
        console.log("No accounts found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkIfTransactionsExists = async () => {
    try {
      if (ethereum) {
        const transactionsContract = createEthereumContract();
        const currentTransactionCount = await transactionsContract.countEmployees();

        window.localStorage.setItem("transactionCount", currentTransactionCount);
      }
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object");
    }
  };

  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask.");

      const accounts = await ethereum.request({ method: "eth_requestAccounts", });

      setCurrentAccount(accounts[0]);
      window.location.reload();
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object");
    }
  };

  const sendTransaction = async () => {
    try {
      // if(!ethereum) return alert('please install metamask');
      // const { age, fName, lName } = formData;
      // createEthereumContract();
    
      if (ethereum) {
        const { address, empName, long, lat, requiredDistance, startHour, endHour} = formData;
        const transactionsContract = createEthereumContract();
        // const parsedAmount = ethers.utils.parseEther(amount);

        // await ethereum.request({
        //   method: "eth_sendTransaction",
        //   params: [{
        //     // from: currentAccount,
        //     from: addressTo
        //     // to: ,
        //     // gas: "0x5208",
        //     // value: parsedAmount._hex,
        //   }],
        // });
//console.log(transactionsContract)
        const transactionHash = await transactionsContract.setEmployee(address, empName, long, lat, requiredDistance, startHour, endHour);

        setIsLoading(true);
        console.log(`Loading - ${transactionHash.hash}`);
        await transactionHash.wait();
        console.log(`Success - ${transactionHash.hash}`);
        setIsLoading(false);

        const transactionsCount = await transactionsContract.countEmployees();

        setTransactionCount(transactionsCount.toNumber());
        window.location.reload();
      } else {
        console.log("No ethereum object now");
      }
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object");
    }
  };

  // const sendLocation = async () => {
  //   try {
   
  //     if (ethereum) {
  //       const { address, distance,fetchedHour} = sendData;
  //       const transactionsContract = createEthereumContract();
   
  //       const transactionHash = await transactionsContract.setContract(address, empName, long, lat, requiredDistance, startHour, endHour);

  //       setIsLoading(true);
  //       console.log(`Loading - ${transactionHash.hash}`);
  //       await transactionHash.wait();
  //       console.log(`Success - ${transactionHash.hash}`);
  //       setIsLoading(false);

  //       const transactionsCount = await transactionsContract.countEmployees();

  //       setTransactionCount(transactionsCount.toNumber());
  //       window.location.reload();
  //     } else {
  //       console.log("No ethereum object now");
  //     }
  //   } catch (error) {
  //     console.log(error);

  //     throw new Error("No ethereum object");
  //   }
  // };

  useEffect(() => {
    checkIfWalletIsConnect();
    checkIfTransactionsExists();
  }, []);

// export const TransactionsProvider = ({children}) =>{
  return (
    <TransactionContext.Provider
    value={{
      connectWallet,
      currentAccount,
      sendTransaction, 
      formData, 
      handleChange,
      transactions,
      getTransactionDetails,
      transact,
      setContract,
      data
     
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
}
