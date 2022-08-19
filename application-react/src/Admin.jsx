import React, { useContext, useState } from 'react'
import { TransactionContext } from './context/TransactionContext';
import TimeRangePicker from '@wojtekmaj/react-timerange-picker';
import { shortenAddress } from "./Shortadd";


const Input = ({ placeholder, name, type, value, handleChange }) => (
    <input
      placeholder={placeholder}
      type={type}
      step="0.0001"
      value={value}
      onChange={(e) => handleChange(e, name)}
      className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-black border-none text-sm white-glassmorphism"
    />
  );
export default function Admin() {
    const [val, onChange] = useState(['10:00', '11:00']);
    // console.log('data', value);
    const [show, setShow] =  useState(true);
    // reqDist = 5km;
    const { connectWallet, currentAccount, sendTransaction, view, formData, sendPay, transfer, getContractBalance, balance, handleChange, transactions, transact, getTransactionDetails } = useContext(TransactionContext);
    // console.log('scre',currentAccount);
    // console.log('bye',transact);
   
    const handleSubmit = (e) => {
      // const timelimit = value;
      const { address, empName, long, lat, requiredDistance, startHour, endHour } = formData;
      // console.log('daata',formData);
      e.preventDefault();
  
      if (!address || !empName || !long || !lat || !requiredDistance || !startHour || !endHour ) return;
  
      sendTransaction();
    };
    const handSubmit = (index,e) => {
        getTransactionDetails(transactions[index].transaction);
    }
    const changePage = () => {
       setShow(!show);
    }

  return (
    <>
 
    <div className='flex justify-between mb-4'>
    <div>
     <button
              type="button"
              onClick={connectWallet}
              className="flex flex-row justify-center items-center my-5 bg-[#000] ml-4 p-3 rounded-full cursor-pointer"
            >
             
              <p className="btn text-white text-base font-semibold">
                Connect Wallet
              </p>
            </button>
   
     </div>

     <div className='mr-5 cursor-pointer z-10 hover:translate-y-1 px-4 py-4 mt-1 h-5 hover:text-white'>
        <ul>
        <li className='-mt-3 bg-[#a76900] p-3 rounded text-white hover:brightness-150' onClick={changePage}>View</li>
        <li className='-mt-3 bg-[#a76900] p-3 rounded text-white hover:brightness-150' onClick={sendPay}>SendToContract</li>
        <li className='-mt-3 bg-[#a76900] p-3 rounded text-white hover:brightness-150' onClick={transfer}>TransferFee</li>
        <li className='-mt-3 bg-[#a76900] p-3 rounded text-white hover:brightness-150' onClick={getContractBalance}>Balance</li>
        </ul>
        { view ?
         <div>{balance} Ethers</div> :
         <p></p>
        } 
     </div>     
  </div>

  
   { show ?
    <div className='text-center justify-center flex -mt-2 pl-0 pr-0'>
    <div className='box text-center flex justify-center shadow-xl rounded-lg'>
        <div>
        <h1 className='text-5xl -mt-16 ml-28 mb-9'>Device Registration</h1> 
        <div className='boxin box2 mt-42 bg-[#000]'>
        <div className="field">
            <Input placeholder="Employee Public Address To" name="address" type="text" className='' handleChange={handleChange} />
        </div>
        <div className='field'>
            <Input type="text" name="empName" placeholder='Enter employee name' className='' handleChange={handleChange} />
        </div>
        <div className='field'>
            <Input type="text" name="long" placeholder='Enter Geographical Boundary longitude' className='' handleChange={handleChange} />
        </div>
        <div className='field'>
            <Input type="text" name="lat" placeholder='Enter Geographical Boundary latitude' className='' handleChange={handleChange} />
        </div>
        <div className='field'>
            <Input type="number" name="requiredDistance" placeholder='Enter required distance' className='' handleChange={handleChange} />
        </div>
        <div className='field'>
            <Input type="number" name="startHour" placeholder='Enter start hour' className='' handleChange={handleChange} />
        </div>
        <div className='field'>
            <Input type="number" name="endHour" placeholder='Enter end hour' className='' handleChange={handleChange} />
        </div>
        {/* <div className='field'>
            <Input type="text" name="timelimit" placeholder='Release Time' className='' value={val} id="" handleChange={handleChange} />
        </div>
        <div>
        <TimeRangePicker onChange={onChange} value={val} />
        </div> */}

        </div>
        <div className='btn mt-6'>
        <button onClick={handleSubmit} className='py-3 -ml-8 px-7 w-52 text-2xl bg-[#a76900] rounded text-white cursor-pointer'>Add</button>
        </div>
        </div>
    </div>
</div>
:
<div className='h-screen'>
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
              <td><button onClick={e => handSubmit(index,e)} className='coursor-ponter p-2 rounded hover:brightness-110 text-white bg-[#000]'>Info</button></td>
            </tr>
         ))
         }
         
        </tbody>
      </table>  
    </div>
      <div className='contain-box bg-white w-52 mr-96 mt-10 px-4'>
        <div className='bg-[#a76900] py-2'>
        <h1 className='text-center text-whitepx-2'>Details</h1>
        </div>
        <div>
        <p className='text-white mt-1 text-center'>values respectively</p> <br></br>
        {transact.map((item) => (
           <ul className='text-red-500 text-center'>
            <li className='list'>{item['transact']} </li>
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

