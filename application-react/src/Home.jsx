import React from 'react'
import './test.css'
const Input = ({ placeholder, name, type, value, handleChange }) => (
  <input
    placeholder={placeholder}
    type={type}
    step="0.0001"
    value={value}
    onChange={(e) => handleChange(e, name)}
    className="my-2 w-full rounded-sm p-2 bg-[#3282f186] text-black border-none text-sm white-glassmorphism"
  />
);
const Home = () => {
  return (
    <>
    <div className='contained'>

    <div className="side"> 
     <h2 className='title text-4xl italic mt-2 text-center font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-blue-600'>Ethereum</h2>   
     <ul className='text-white'>
      <li className='lists'><button>Users</button></li>
      <li className='lists'><button>Transer to contract</button></li>
      <li className='lists'><button>Contract balance</button></li>
     </ul>  
    </div>

    <div className='btn1'>
      <button className='btn1 py-3 px-3 m-2 text-white absolute'>Connect Wallet</button>
    </div>

    <div className='contains text-white'>
       <div className='one bg-[#000000] h-full '><img className="h-48" src="./pngrb.png"></img></div>
       <div className='two'>
         <div className='mt-3 text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-blue-600'>Your Balance: </div>
         <p className='mb-4'>10000000 <strong className='text-yellow-500'>Ether</strong></p>
         <hr className='mb-4'></hr>
         <div className='text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-blue-600'>Contract Balance: </div>
         <p>10000000 <strong className='text-yellow-500'>Ether</strong></p>
       </div>
    </div>

    <div className='form-contain justify-start flex mt-36 pl-0 pr-0'>
    <div className='flex justify-start shadow-xl rounded-lg'>
        <div>
        <h1 className='text-5xl -mt-16 text-white'>Device Registration</h1> 
  
   <div className='mt-4 flex gap-20 m-4'>
      <div>    
        <div className="mb-4">
         <label className='text-white text-xl'>Employee Public Address </label>
            <Input placeholder="public Address" name="address" type="text" className='bg-blue-400'  />
        </div>
        <div className='mb-4'>
        <label className='text-white text-xl'>Employee Name</label>
            <Input type="text" name="empName" placeholder='employee name' className=''  />
        </div>
        <div className='mb-4'>
        <label className='text-white text-xl'>Geographical Boundary longitude</label>
            <Input type="text" name="long" placeholder='longitude' className=''  />
        </div>
        <div className='mb-4'>
        <label className='text-white text-xl'>Geographical Boundary latitude</label>
            <Input type="text" name="lat" placeholder='latitude' className='' />
        </div>
      </div>    

      <div>
        <div className='mb-4'>
            <label className='text-white text-xl'>Required distance</label>
            <Input type="number" name="requiredDistance" placeholder='distance' className=''/>
        </div>
        <div className='mb-4'>
            <label className='text-white text-xl'>Start hour</label>
            <Input type="number" name="startHour" placeholder='start hour' className='' />
        </div>
        <div className='mb-4'>
            <label className='text-white text-xl'>End hour</label>
            <Input type="number" name="endHour" placeholder='end hour' className='' />
        </div>

        <div className='mt-6'>
             <button className='py-3 w-32 text-2xl bg-[#3282f1] text-white cursor-pointer'>Add</button>
        </div>

       </div>
      </div>
   
        </div>
    </div>
</div>

<div className='mt-24 form-contain2 pl-0 pr-0'>
<h1 className='text-5xl text-white'> Device Information </h1>

<div className='table-contain contain-box mt-3'>
   <div className='contain-table ml-10 mt-10'>
      <table className='table table-striped'>
        <thead>
          <tr className='text-white'>
            <th>ID</th>
            <th> Employee Public Key </th>
            <th> Detail </th>
          </tr>
        </thead>
        <tbody className='bg-gray-100'>
{/* 
         {transactions.map((item,index) => ( 
            <tr key={index}>
              <td>{index}</td>
              <td>{item.transaction}</td>              
              <td><button onClick={e => handSubmit(index,e)} className='coursor-ponter p-2 rounded hover:brightness-110 text-white bg-[#000]'>Info</button></td>
            </tr>
         ))
         } */}
         
        </tbody>
      </table>  
    </div>
      <div className='contain-info mt-10'>
        <div className='bg-[#000000] py-2 text-left'>
        <h1 className='info-head text-white mx-2'>Details</h1>
        </div>
        <div>
        <p className='info-head font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-blue-600 mt-1'>values respectively</p> <br></br>
        {/* {transact.map((item) => (
           <ul className='text-red-500 text-center'>
            <li className='list'>{item['transact']} </li>
          </ul>
        ))} */}
        </div>
      </div>
   </div> 
</div> 

    </div>
    </>

  )
}

export default Home