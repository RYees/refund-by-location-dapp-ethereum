import React, { useContext, useState } from 'react'
import { TransactionContext } from './context/TransactionContext';
import TimeRangePicker from '@wojtekmaj/react-timerange-picker';
import { shortenAddress } from "./Shortadd";

import './App.css'
const Input = ({ placeholder, name, type, value, handleChange }) => (
    <input
      placeholder={placeholder}
      type={type}
      step="0.0001"
      value={value}
      onChange={(e) => handleChange(e, name)}
      className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
    />
  );
export default function App() {
    const [val, onChange] = useState(['10:00', '11:00']);
    // console.log('data', value);
    const [show, setShow ] =  useState(true);
    const { connectWallet, currentAccount, sendTransaction, formData, handleChange, transactions, transact, getTransactionDetails } = useContext(TransactionContext);
    // console.log('late800');
    console.log('bye',transact);
    const handleSubmit = (e) => {
      // const timelimit = value;
      const { address, longitude, latitude, timelimit } = formData;
      // console.log('daata',formData);
      e.preventDefault();
  
      if (!address || !longitude || !latitude || !timelimit) return;
  
      sendTransaction();
    };
    const handSubmit = (index,e) => {
         console.log(transactions[index].transaction);
         getTransactionDetails(transactions[index].transaction);
   }
    const changePage = () => {
       setShow(!show);
    }

    const datas = [
      { id: 1, address: "RBAWCKKRQQSP5HVTSSSZSMWZZFKREGYMXIJ6PDERWGVTCSZCHAJZB76JKY", geoboundary: "RBAWCKKRQQSP-AWCKKRQQSP",  timelimit: "10:00-11:00"},
      { id: 2, address: "RBAWCKKRQQSP5HVTSSSZSMWZZFKREGYMXIJ6PDERWGVTCSZCHAJZB76JKY", geoboundary: "RBAWCKKRQQSP-AWCKKRQQSP",  timelimit: "10:00-11:00"},
      { id: 3, address: "RBAWCKKRQQSP5HVTSSSZSMWZZFKREGYMXIJ6PDERWGVTCSZCHAJZB76JKY", geoboundary: "RBAWCKKRQQSP-AWCKKRQQSP",  timelimit: "10:00-11:00"},
    ];
   console.log(transactions.map((i)=>(
    i
   )));
  return (
    <>
 
    <div className='flex justify-between mb-4'>
    <div>
     <button
              type="button"
              onClick={connectWallet}
              className="flex flex-row justify-center items-center my-5 bg-[#30414b] ml-4 p-3 rounded-full cursor-pointer"
            >
             
              <p className="btn text-white text-base font-semibold">
                Connect Wallet
              </p>
            </button>
   
     </div>

     <div className='mr-5 cursor-pointer z-10 hover:translate-y-1 hover:rounded hover:bg-[#30414b] px-4 py-4 mt-1 h-5 hover:text-white'>
        <ul><li className='-mt-3' onClick={changePage}>View</li></ul>
     </div>     
  </div>

  
   { show ?
    <div className='text-center justify-center flex -mt-12 pl-0 pr-0'>
    <div className='box text-center flex justify-center h-96 w-96 shadow-xl rounded-lg bg-gray-200'>
        <div>
        <h1 className='text-4xl -mt-16  mb-9'>Device Registration</h1> 
        <div className='box2 mt-42 bg-gray-100'>
        <div className="field">
            <Input placeholder="Employee Public Address To" name="address" type="text" className='' handleChange={handleChange} />
        </div>
        <div className='field'>
            <Input type="text" name="longitude" placeholder='Enter Geographical Boundary longitude' className='' handleChange={handleChange} />
        </div>
        <div className='field'>
            <Input type="text" name="latitude" placeholder='Enter Geographical Boundary latitude' className='' handleChange={handleChange} />
        </div>
        <div className='field'>
            <Input type="text" name="timelimit" placeholder='Release Time' className='' value={val} id="" handleChange={handleChange} />
        </div>
        <div>
        <TimeRangePicker onChange={onChange} value={val} />
        </div>

        </div>
        <div className='btn mt-6'>
        <button onClick={handleSubmit} className='py-3 px-7 w-52 text-2xl bg-[#30414b] rounded text-white cursor-pointer'>Add</button>
        </div>
        </div>
    </div>
</div>
:
<div className='bg-gray-200 h-screen'>
 <h1 className='text-4xl ml-5'> Device Information </h1>
<div className='flex ml-24 gap-4'>
<div className='container ml-10 mt-10'>
      <table className='table table-striped'>
        <thead>
          <tr className='text-white'>
            <th>ID</th>
            <th> Employee Public Key </th>
            <th> Detail </th>
          </tr>
        </thead>
        <tbody className='bg-gray-100'>

         {transactions.map((item,index) => ( 
            <tr key={index}>
              <td>{index}</td>
              <td>{item.transaction}</td>              
              <td><button onClick={e => handSubmit(index,e)} className='coursor-ponter p-2 rounded hover:brightness-110 text-white bg-[#304b41]'>Info</button></td>
            </tr>
         ))
         }
         
        </tbody>
      </table>  
    </div>
      <div className='contain-box bg-black w-52 mr-96 mt-10 px-4'>
        <div className='bg-[#30414b] py-2'>
        <h1 className='text-center text-white'>Details</h1>
        </div>
        <div>
        <p className='text-white text-center'>longitude, latitude and timelimit values respectively</p> <br></br>
        {transact.map((item,index) => (
           <ul className='text-red-500 text-center'>
            <li className='list'>{item.transact} </li>
          </ul>
        ))}
        </div>
      </div>
   </div> 
</div> 
}
</>

  )
}

