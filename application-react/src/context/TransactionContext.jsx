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
  const [output, setOutput] = useState([]);
  const [balance, setBalance] = useState([]);
  const [urbalance, setUrBalance] = useState([]);
  const [view, setView] =  useState(false);
  const [visible, setVisible] =  useState(false);

  const handleChange = (e, name) => {
    setformData((prevState) => ({ ...prevState, [name]: e.target.value }));
  };
  
    
  const handleWalletBalance = async () => {
    const { ethereum } = window;
    
    if(ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum, "any");
      const accounts = await provider.send("eth_requestAccounts", []);
      const balance = await provider.getBalance(accounts[0])
      ethers.utils.formatEther(balance)
      let bal = balance['_hex'];
      let valbalance = parseInt(bal)
      setUrBalance(valbalance)
      console.log(valbalance)
  }
  }
  const getAllTransactions = async () => {
    try {
      if (ethereum) {
        const transactionsContract = createEthereumContract();

        const availableTransactions = await transactionsContract.getAllEmployees();

        const structuredTransactions = availableTransactions.map((transaction) => ({
          transaction
        }));

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

        setTransact(structuredTransact);
      } else { 
        console.log("Ethereum is not present");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const contractCondition = async (add, distance, fetchedHour) => {
    try {
      if (ethereum) {
        const transactionsContract = createEthereumContract();
        const availableContractdata = await transactionsContract.contractCondition(add, distance, fetchedHour);
        console.log('home',  availableContractdata.message);
        getResults(currentAccount);
      } else { 
        getResults(currentAccount);
        console.log("Ethereum is not present");
      }
    } catch (error) {
      setOutput('Out of time');
      console.log(error)    
    }
    setOutput('Inform the admin');
  };

  const checkIfWalletIsConnect = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask.");
      const accounts = await ethereum.request({ method: "eth_accounts" });
      //window.location.reload();
      console.log(accounts);
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
        setTransactionCount(currentTransactionCount);
        //window.localStorage.setItem("transactionCount", currentTransactionCount);
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
      if (ethereum) {
        const { address, empName, long, lat, requiredDistance, startHour, endHour} = formData;
        const transactionsContract = createEthereumContract();
    
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

  const sendPay = async () => {
    try {
      if (ethereum) {
      const transactionsContract = createEthereumContract();
      let owedAmount = '100000000000000';  //15
      await ethereum.request({
        method: "eth_sendTransaction",
        params: [{
          from: currentAccount,
          to: contractAddress,
          gas: "0x5208",
          value: owedAmount,
        }],
    });

    let transactioned=await transactionsContract.deposit({value:owedAmount})     
      await transactioned.wait();
        }
      } catch (error) {
        console.log(error);
  
        throw new Error("No ethereum object");
      }
    };
  
  const transfer = async () => {
    try {
    if (ethereum) {
    const transactionsContract = createEthereumContract();
    let addressi = '0x030a2336256E22Ba0c99747aeeD5bb1fb16De27f';
    let amounti = 1000000000;
    let transactioned=await transactionsContract.transfer(addressi, amounti)
    // await transactioned.wait();
    }
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object");
    }
  };

  const getContractBalance = async () => {
    try {
      if (ethereum) {
        const transactionsContract = createEthereumContract();  
        const availableTransactbalance = await transactionsContract.getBalance();
        let val = availableTransactbalance['_hex'];
        let num = parseInt(val);
          setBalance(num)
          setView(!view);

          if(num < 100000000000000){
            setVisible(true);
            console.log('low')
          } else {
            console.log('high')
          }
      } else { 
        console.log("Ethereum is not present");
      }
    } catch (error) {
      console.log(error);
    }  
  };
  
   
  const getResults = async (add) => {
    try {
      if (ethereum) {
        const transactionsContract = createEthereumContract();

        const availableTransactres = await transactionsContract.getResults(add);
        
        setOutput(availableTransactres.status);
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
    handleWalletBalance()
  }, []);

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
      sendPay,
      contractCondition,
      getContractBalance,
      getResults,
      balance,
      view,
      output,
      urbalance,
      transfer,
      visible   
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
}
