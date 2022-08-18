import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

import { contractABI, contractAddress } from "../utils/constants";

export const GeolocationContext = React.createContext();

const { ethereum } = window;

const createEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const transactionsContract = new ethers.Contract(contractAddress, contractABI, signer);
  
  //console.log('types',transactionsContract);
  return transactionsContract;
};

export const TransactionsProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [transact, setTransact] = useState([]);
  const [output, setOutput] = useState([]);

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

  const contractCondition = async (add, distance, fetchedHour) => {
    // (contractCondition(address payable _to, address _address, string memory distance, string memory fetchedHour))
    try {
      if (ethereum) {
        const transactionsContract = createEthereumContract();
        const availableContractdata = await transactionsContract.contractCondition(add, distance, fetchedHour);
        console.log('home',  availableContractdata.message);
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

  
    const getResults = async (add) => {
      try {
        if (ethereum) {
          const transactionsContract = createEthereumContract();
  
          const availableTransactres = await transactionsContract.getResults(add);
  
          // let num = parseInt(Number(availableTransactbalance['_hex']));
                  
           console.log('get', availableTransactres.accept);
           console.log('getiin', availableTransactres.decline);
      ;
  
         setOutput(availableTransactres.accept);
        } else { 
          console.log("Ethereum is not present");
        }
      } catch (error) {
        console.log(error);
      }
  
    };

  useEffect(() => {
    checkIfWalletIsConnect();
    checkIfTransactionsExists();
  }, []);

return (
    <TransactionContext.Provider
    value={{
      connectWallet,
      currentAccount,
      getTransactionDetails,
      transact,
      contractCondition,
      getResults,
    
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
}
