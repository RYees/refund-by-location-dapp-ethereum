import React, { useContext, useState } from 'react'
import { TransactionContext } from './context/TransactionContext'
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
    const [value, onChange] = useState(['10:00', '11:00']);
    console.log('data', value);
    const [show, setShow ] =  useState(true);
    const { connectWallet, currentAccount, sendTransaction, formData, handleChange, transactions } = useContext(TransactionContext);
    console.log('late800');
    console.log(transactions.length);
    const handleSubmit = (e) => {
      // const timelimit = value;
      const { address, longitude, latitude, timelimit } = formData;
      // console.log('daata',formData);
      e.preventDefault();
  
      if (!address || !longitude || !latitude || !timelimit) return;
  
      sendTransaction();
    };

    const handSubmit = (add) => {
      console.log(add);
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

     <div className='mr-5 cursor-pointer z-10 hover:translate-y-1 hover:bg-[#30414b] px-4 py-4 mt-1 h-5 hover:text-white'>
        <ul><li className='-mt-3' onClick={changePage}>View</li></ul>
     </div>     
  </div>

  
   { show ?
    <div className='text-center justify-center flex -mt-14 pl-0 pr-0'>
    <div className='box text-center flex justify-center h-96 w-96 shadow-xl rounded-lg bg-gray-200'>
        <div>
        <h1 className='text-4xl mt-5 mb-9'>Device Registration</h1> 
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
        <div className=''>
            <Input type="text" name="timelimit" placeholder='Release Time' className='' id="" handleChange={handleChange} />
         {/* <lable>Time Limit</lable> */}
        </div>
   
        </div>
        <div className='btn mt-6'>
        <button onClick={handleSubmit} className='py-3 px-7 w-52 text-2xl bg-[#30414b] rounded text-white cursor-pointer'>Add</button>
        </div>
        </div>
    </div>
</div>
: <div className='container ml-10 mt-10'>
      <table className='table table-striped'>
        <thead>
          <tr className='text-white'>
            <th> ID </th>
            <th> Address </th>
            <th> Geographical-Boundary </th>
            <th> Time-Limit </th>
            <th> Detail </th>
          </tr>
        </thead>
        <tbody className='bg-gray-100'>

         {datas.map((item,index) => ( 
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{shortenAddress(item.address)}</td>
              <td>{item.geoboundary}</td>
              <td>{item.timelimit}</td>
              <td><button onClick={handSubmit(2, index)}>Detail</button></td>
            </tr>
         ))
         }
         
        </tbody>
      </table> 
   </div> 
}
</>

  )
}

