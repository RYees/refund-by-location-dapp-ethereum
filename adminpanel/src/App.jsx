
export default function App() {
  return (
    <div className='text-center justify-center flex pt-36 pl-0 pr-0'>
    <div className='text-center flex justify-center h-96 w-96 shadow-xl rounded-lg bg-gray-200'>
        <div>
        <h1 className='text-4xl mt-5'>Device Registration</h1>
        <div className='mt-12'>
        <div className='p-5'>
            <input type="text" placeholder='enter timelimt' className='p-3 rounded inset-0 shadow-xl' />
        </div>
        <div>
            <input type="text" placeholder='enter gps reading range' className='p-3 rounded inset-0 shadow-xl' id="" />
        </div>
        </div>
        <div className='mt-14'>
        <button className='py-5 px-7 w-32 text-xl bg-yellow-600 rounded-full cursor-pointer'>Add</button>
        </div>
        </div>
    </div>
</div>
  )
}
