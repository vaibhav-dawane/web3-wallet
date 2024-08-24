import React, { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

const Main:React.FC = () => {
    const [showComponent, setShowComponent] = useState(false);
    const showButtons = () => {
        setShowComponent(true);
    }
    
    // open dialog to select sol, eth wallet
    const openModal = () => {
        const dialog = document.getElementById('my_modal_5') as HTMLDialogElement;
        dialog?.showModal();
    }

    const [seedPhrase, setSeedPhrase] = useState('');

    const generatePhrase = async () => {
        try {
            const response = await fetch("http://localhost:3000/");
            const data = await response.json()
            setSeedPhrase(data.seedphrase);
        } catch (error) {
            console.log("Error Occured");
        }
        showButtons()
    }

    const copyPhrase = () => {
        if(seedPhrase)
        {
            navigator.clipboard.writeText(seedPhrase)
                .then(() => {
                    toast.success('Seed phrase copied to clipboard!', {
                        position: "bottom-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                })
                .catch((error) => {
                    console.error('Error copying seed phrase:', error);
                });
        }
    }
    
    return (
        <div className='flex justify-center mt-20'>
            <div className='shadow-[0_0_0_0.5px_rgba(128,128,128,1)] w-[700px] rounded-lg'>
                <div className='flex justify-center'>
                    <button type='submit' onClick={generatePhrase} className='m-4 my-6 p-2 shadow-sm shadow-gray-800 rounded-md w-full bg-blue-400 text-xl text-white font-semibold'>Generate Mnemonics</button>
                </div>
                
                <div className='mx-4'>
                    <p className=''>Mnemonics Phrases:</p>
                    <div className='my-4 h-56 w-full bg-base-200 rounded-md shadow-[0_0_0_0.5px_rgba(128,128,128,1)] relative'>
                        {seedPhrase && 
                        <div className='grid grid-cols-4 gap-4 p-4 text-gray-300'>
                            {seedPhrase.split(' ').map((word, index) => (
                                <span key={index} className="px-3 py-2 border hover:bg-gray-400 hover:bg-opacity-40 font-medium rounded-md text-center">
                                    {word}
                                </span>
                            ))}
                        </div>
                        }
                        <div className='flex justify-end absolute bottom-2 right-4'>
                            <button onClick={copyPhrase} className='text-sm p-1 rounded-md cursor-pointer hover:bg-gray-400 hover:bg-opacity-40'>Copy Phrase</button>  
                        </div>
                        <ToastContainer />
                        
                    </div>
                </div>

                {showComponent && 
                    <div className='flex justify-center'>
                        <button type='submit' onClick={openModal} className='m-4 my-6 p-2 shadow-sm shadow-gray-800 rounded-md w-full bg-green-500 text-xl text-white font-semibold'>Create Wallet</button>
                        <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle w-[450px] h-96 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <div className="modal-box border">
                                <div className="modal-action flex justify-center">
                                    <form method="dialog">
                                        {/* if there is a button in form, it will close the modal */}
                                        <div className=''>
                                            <button className="bg-white p-3 mx-4 rounded-2xl text-gray-600 hover:scale-110 duration-300 font-semibold">Solana Wallet</button>
                                            <button className="bg-white p-3 mx-4 rounded-2xl text-gray-600 hover:scale-110 duration-300 font-semibold">Etherium Wallet</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </dialog>
                    </div>
                }
            </div>
            
        </div>
    );
}
export default Main
