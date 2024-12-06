import Silderbar from "./Silderbar"


const Dashborad = () => {
  return (
    <>
    <div className="flex h-screen">
      <div className="w-1/3 bg-gray-100 dark:bg-gray-900 text-white ">
       <Silderbar/>
      </div>
      <div className="w-full bg-gray-200 flex items-center justify-center">
        <h1 className="text-2xl font-bold">Right Side</h1>
      </div>
    </div>
    </>
  )
}

export default Dashborad