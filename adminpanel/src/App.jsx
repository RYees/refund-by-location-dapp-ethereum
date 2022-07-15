import React, { useContext } from 'react'
import { TransactionContext } from './context/TransactionContext'
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
    const { connectWallet, currentAccount, sendTransaction, formData, handleChange } = useContext(TransactionContext);
    // console.log('late800');
    // console.log(getAllTransactions);
    const handleSubmit = (e) => {
      const { address, age, fName, lName } = formData;
  
      e.preventDefault();
  
      if (!address || !age || !fName || !lName) return;
  
      sendTransaction();
    };
   
  return (
    <>
     {!currentAccount && ( <button
              type="button"
              onClick={connectWallet}
              className="flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]"
            >
             
              <p className="text-white text-base font-semibold">
                Connect Wallet
              </p>
            </button>
     )}
   
    <div className='text-center justify-center flex pt-36 pl-0 pr-0'>
    <div className='text-center flex justify-center h-96 w-96 shadow-xl rounded-lg bg-gray-200'>
        <div>
        <h1 className='text-4xl mt-5'>Device Registration</h1>
        <div className='mt-12'>
        <div className="p-5">
            <Input placeholder="Address To" name="address" type="text" handleChange={handleChange} />
        </div>
        <div className='p-5'>
            <Input type="text" name="age" placeholder='enter age' className='p-3 rounded inset-0 shadow-xl' handleChange={handleChange} />
        </div>
        <div>
            <Input type="text" name="fName" placeholder='enter fname' className='p-3 rounded inset-0 mb-5 shadow-xl' id="" handleChange={handleChange} />
        </div>
        <div>
            <Input type="text" name="lName" placeholder='enter lname' className='p-3 rounded inset-0 shadow-xl' id="" handleChange={handleChange} />
        </div>
        </div>
        <div className='mt-14'>
        <button onClick={handleSubmit} className='py-5 px-7 w-32 text-xl bg-yellow-600 rounded-full cursor-pointer'>Add</button>
        </div>
        </div>
    </div>
</div>
</>

  )
}
