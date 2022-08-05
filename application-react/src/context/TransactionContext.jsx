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
  const [balance, setBalance] = useState([]);

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


  const contractCondition = async (add, distance, fetchedHour) => {
    // (contractCondition(address payable _to, address _address, string memory distance, string memory fetchedHour))
    try {
      if (ethereum) {
       // console.log(add, distance, fetchedHour);
        const transactionsContract = createEthereumContract();

        const availableContractdata = await transactionsContract.contractCondition(add, distance, fetchedHour);

        // const structuredTransact = availableContractdata.map((data) => ({
        //   data
        // }));
         
         console.log('home',  availableContractdata);
        //  return availableTransact;

       //setContractdata(structuredTransact);
      } else { 
        console.log("Ethereum is not present");
      }
    } catch (error) {
      console.log(error);
    }
 };


 const sendTransact = async () => {
  try {
    if (ethereum) {
      const { addressTo, amount, keyword, message } = formData;
      const transactionsContract = createEthereumContract();
      const parsedAmount = ethers.utils.parseEther(amount);

      await ethereum.request({
        method: "eth_sendTransaction",
        params: [{
          // from: currentAccount,
          to: addressTo,
          gas: "0x5208",
          value: parsedAmount._hex,
        }],
      });

      const transactionHash = await transactionsContract.addToBlockchain(addressTo, parsedAmount, message, keyword);

      setIsLoading(true);
      console.log(`Loading - ${transactionHash.hash}`);
      await transactionHash.wait();
      console.log(`Success - ${transactionHash.hash}`);
      setIsLoading(false);

      const transactionsCount = await transactionsContract.transfer();

      //setTransactionCount(transactionsCount.toNumber());
      window.location.reload();
    } else {
      console.log("No ethereum object");
    }
  } catch (error) {
    console.log(error);

    throw new Error("No ethereum object");
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
    //  let owedAmount = await transactionsContract.getOwedAmount();
    //   owedAmount=owedAmount.toString()
       let owedAmount = '1000000000';

      await ethereum.request({
        method: "eth_sendTransaction",
        params: [{
          from: currentAccount,
          to: contractAddress,
          gas: "0x5208",
          value: owedAmount,
        }],
      });

//      const transactionHash = await transactionsContract.addToBlockchain(addressTo, parsedAmount, message, keyword);

      let transactioned=await transactionsContract.deposit({value:owedAmount})
      let transactione= await transactionsContract.getBalance();
   //   const structuredTransact = transactioned.map((transact1) => ({
     //   transact1
     // }));
       
      await transactioned.wait();
      console.log('jada',structuredTransact);
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
     // let owedAmount = await transactionsContract.getOwedAmount();
      //owedAmount=owedAmount.toString()
      // let owedAmount = '1000000';
      let addressi = '0x030a2336256E22Ba0c99747aeeD5bb1fb16De27f';
      let amounti = 1000000000000000;
      // await ethereum.request({
      //   method: "eth_sendTransaction",
      //   params: [{
      //     from: currentAccount,
      //     to: contractAddress,
      //     gas: "0x5208",
      //     value: owedAmount,
      //   }],
      // });

//      const transactionHash = await transactionsContract.addToBlockchain(addressTo, parsedAmount, message, keyword);

      let transactioned=await transactionsContract.transfer(addressi, amounti)
      //let transactione= await transactionsContract.getBalance();
   //   const structuredTransact = transactioned.map((transact1) => ({
     //   transact1
     // }));
       
      await transactioned.wait();
      console.log('jada',structuredTransact);
        }
      } catch (error) {
        console.log(error);
  
        throw new Error("No ethereum object");
      }
    };
  
    const getBalance = async () => {
      try {
        if (ethereum) {
          const transactionsContract = createEthereumContract();
  
          const availableTransactbalance = await transactionsContract.getBalance();
  
          // const structuredTransact = availableTransact.map((transact) => ({
          //   transact
          // }));
          let num = parseInt(Number(availableTransactbalance['_hex']));
          // BigNumber {_hex: '0x038d7ea4d5c240', _isBigNumber: true}
          // _hex: "0x038d7ea4d5c240"
          // _isBigNumber: true
           getResults('0x8F449854A5d6aD8958D43E0266a9399E208A2cc5');
           console.log('home', num);
          //  return availableTransact;
  
        //  setTransact(structuredTransact);
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
  
          // let num = parseInt(Number(availableTransactbalance['_hex']));
                  
           console.log('get', availableTransactres.accept);
           console.log('getiin', availableTransactres.decline);
      ;
  
        //  setTransact(structuredTransact);
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
      data,
      sendPay,
      contractCondition,
      getBalance,
      transfer,
      getResults
     
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
}
