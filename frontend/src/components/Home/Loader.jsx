import  CodeMaster from '../../assets/compiler.png'


const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="relative flex justify-center items-center">
        <div className="absolute animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-blue-500"></div>
        <img src={CodeMaster} alt='Kakatiya University' className="rounded-full h-28 w-28 shadow-lg"/>
      </div>
      <p className="mt-8 text-lg text-gray-600 font-semibold">Loading...</p>
     
      
    </div>
  );
}

export default Loader;