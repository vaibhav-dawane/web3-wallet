import React, { useEffect, useRef, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import SolanaKeys from './SolanaKeys';
import axios from 'axios';
import EtheriumKeys from './EtheriumKeys';
import AllWallets from './AllWallets';

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

    const [showSolWallet, setShowSolWallet] = useState(false);
    const [showEthWallet, setShowEthWallet] = useState(false);

    const targetRef = useRef<HTMLDivElement>(null);
    
    const solWallet = async() => {
        // console.log(seedPhrase);
        try {
            await axios.post("http://localhost:3000/seed", {data: seedPhrase});
            // console.log('Success');
        } catch (error) {
            console.error('Error:', error);
        }
        setShowSolWallet(true);
    }
    
    const ethWallet = async() => {
        console.log(seedPhrase);
        try {
            await axios.post("http://localhost:3000/seed", {data: seedPhrase});
            // console.log('Success');
        } catch (error) {
            console.error('Error:', error);
        }
        setShowEthWallet(true);
    }

    // to scroll automatically after Sol Wallet component rendered
    useEffect(() => {
        if (showSolWallet) {
            targetRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [showSolWallet]);

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
    
    const openWalletModal = () => {
        const dialog = document.getElementById('my_modal_4') as HTMLDialogElement;
        dialog?.showModal();
    }
    return (
        <div>
            <div onClick={openWalletModal}
             className='mt-8 ml-8 border border-blue-400 w-44 h-10 hover:bg-blue-400 hover:bg-opacity-20 flex items-center justify-center text-white rounded-lg cursor-pointer select-none font-semibold hover:scale-105'>
                View All Wallets
                <div className='ml-1 text-white'>
                    <svg
                        fill="currentColor"
                        viewBox="0 0 16 16"
                        height="1em"
                        width="1em"
                        >
                        <path
                            fillRule="evenodd"
                            d="M1 8a.5.5 0 01.5-.5h11.793l-3.147-3.146a.5.5 0 01.708-.708l4 4a.5.5 0 010 .708l-4 4a.5.5 0 01-.708-.708L13.293 8.5H1.5A.5.5 0 011 8z"
                        />
                    </svg>
                </div>
                <dialog id="my_modal_4" className="modal cursor-default">
                    <div className="modal-box max-h-3xl max-w-3xl">
                        <div className='flex justify-between'>
                            <div className='text-xl'>
                                All Solana Wallets
                            </div>
                            <div className=''>
                                <form method="dialog">
                                    {/* if there is a button, it will close the modal */}
                                    <button className="">
                                        <svg fill="none" viewBox="0 0 15 15" height="2em" width="2em">
                                        <path
                                            fill="currentColor"
                                            fillRule="evenodd"
                                            d="M.877 7.5a6.623 6.623 0 1113.246 0 6.623 6.623 0 01-13.246 0zM7.5 1.827a5.673 5.673 0 100 11.346 5.673 5.673 0 000-11.346zm2.354 3.32a.5.5 0 010 .707L8.207 7.5l1.647 1.646a.5.5 0 01-.708.708L7.5 8.207 5.854 9.854a.5.5 0 01-.708-.708L6.793 7.5 5.146 5.854a.5.5 0 01.708-.708L7.5 6.793l1.646-1.647a.5.5 0 01.708 0z"
                                            clipRule="evenodd"
                                        />
                                        </svg>
                                    </button>
                                    
                                </form>
                            </div>
                        </div>
                        <AllWallets />
                        
                    </div>
                </dialog>
            </div>

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
                                <ToastContainer />
                            </div>
                            
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
                                            <div className='select-none'>
                                                <button onClick={solWallet} className="bg-white p-3 mx-4 rounded-2xl text-gray-600 hover:scale-110 duration-300 font-semibold select-none">Solana Wallet</button>

                                                <button onClick={ethWallet} className="bg-white p-3 mx-4 rounded-2xl text-gray-600 hover:scale-110 duration-300 font-semibold select-none">Etherium Wallet</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </dialog>
                        </div>
                    }
                </div>   
            </div>

            {showSolWallet && 
                <div ref={targetRef} className='flex justify-center select-none mb-8'>
                    <div className='w-[700px] mt-10 shadow-[0_0_0_0.5px_rgba(128,128,128,1)] p-4 rounded-lg'>
                        <div className='flex justify-center'>
                            <div className='p-2 border border-purple-500 rounded-md mx-4 hover:scale-105 cursor-pointer hover:bg-purple-400 hover:bg-opacity-15 text-white font-semibold'>Solana Wallet</div>
                        </div>
                        <div className='w-full'>
                                <SolanaKeys />
                        </div>
                    </div>
                </div>
            }
            
            {showEthWallet && 
                <div ref={targetRef} className='flex justify-center select-none mb-8'>
                    <div className='w-[700px] mt-10 shadow-[0_0_0_0.5px_rgba(128,128,128,1)] p-4 rounded-lg'>
                        <div className='flex justify-center'>
                            <div className='p-2 border border-yellow-700 rounded-md mx-4 hover:scale-105 cursor-pointer hover:bg-yellow-200 hover:bg-opacity-15 text-white font-semibold'>Etherium Wallet</div>
                        </div>
                        <div className='w-full'>
                                <EtheriumKeys />
                        </div>
                    </div>
                </div>
            }
        </div>
    );

    
}
export default Main
