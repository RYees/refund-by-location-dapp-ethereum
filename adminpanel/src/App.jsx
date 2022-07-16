import React, { useContext, useState } from 'react'
import { TransactionContext } from './context/TransactionContext'
import TimeRangePicker from '@wojtekmaj/react-timerange-picker';

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
    const [value, onChange] = useState(['10:00', '11:00']);
    const [show, setShow ] =  useState(true);
    const { connectWallet, currentAccount, sendTransaction, formData, handleChange, transactions } = useContext(TransactionContext);
    console.log('late800');
    console.log(transactions);
    const handleSubmit = (e) => {
      const { address, age, fName, lName } = formData;
  
      e.preventDefault();
  
      if (!address || !age || !fName || !lName) return;
  
      sendTransaction();
    };

    const changePage = () => {
       setShow(!show);
    }
   
  return (
    <>
 
    <div className='flex justify-between'>
    <div>
     {!currentAccount && ( <button
              type="button"
              onClick={connectWallet}
              className="flex flex-row justify-center items-center my-5 bg-[#30414b] ml-4 p-3 rounded-full cursor-pointer"
            >
             
              <p className="btn text-white text-base font-semibold">
                Connect Wallet
              </p>
            </button>
     )}
     </div>

     <div className='mr-5 cursor-pointer hover:bg-[#30414b] p-5 h-16 hover:text-white'>
        <ul><li onClick={changePage}>View</li></ul>
     </div>
     
     </div>
   
   { show ?
    <div className='text-center justify-center flex pl-0 pr-0'>
    <div className='box text-center flex justify-center h-96 w-96 shadow-xl rounded-lg bg-gray-200'>
        <div>
        <h1 className='text-4xl mt-5 mb-9'>Device Registration</h1> 
        <div className='box2 mt-42'>
        <div className="field">
            <Input placeholder="Employee Public Address To" name="address" type="text" className='' handleChange={handleChange} />
        </div>
        <div className='field'>
            <Input type="text" name="age" placeholder='Enter Geographical Boundary' className='' handleChange={handleChange} />
        </div>
        <div className=''>
            {/* <Input type="text" name="fName" placeholder='Release Time' className='' id="" handleChange={handleChange} /> */}
         <lable>Time Limit</lable>
        </div>
        <div className=''>
            {/* <Input type="text" name="lName" placeholder='enter lname' className='' id="" handleChange={handleChange} /> */}
            <TimeRangePicker className="h-10 w-96" onChange={onChange} value={value} />
        </div>
        </div>
        <div className='btn mt-14'>
        <button onClick={handleSubmit} className='py-3 px-7 w-52 text-2xl bg-[#30414b] rounded text-white cursor-pointer'>Add</button>
        </div>
        </div>
    </div>
</div>
: null }
</>

  )
}

