import { faCopy } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from "react";
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios'

const SolanaKeys = () => {

    const [showPrivateKey, setShowPrivateKey] = useState(false);
    const [showText, setShowText] = useState(false);

    const keyShow = () => {
        setShowPrivateKey(!showPrivateKey);
        setShowText(!showText);
    }

    const [solKeys, setSolKeys] = useState({publicKey: '', privateKey: ''});
    
    // get keys from backend to frontend
    const getKeys = async() => {
        try {
            const response = await fetch("http://localhost:3000/solana-keypair");
            const data = await response.json()
            const keyPairs = data.SolanaKeyPair;
            // console.log(keyPairs);  
            setSolKeys({publicKey:keyPairs.publicKey, privateKey:keyPairs.privateKey});
        } catch (error) {
            console.error('Error:', error);
        }
    }

    let hiddenText = '';
    const keyLength = solKeys.privateKey?.length;
    for(let i = 0; i < keyLength; i++)
    {
        hiddenText += '••';
    }

    useEffect(() => {
        getKeys();
    }, []);

    const copyPublicKey = () => {
        if(solKeys.publicKey)
        {
            navigator.clipboard.writeText(solKeys.publicKey)
                .then(() => {
                    toast.success('Public Key copied to clipboard!', {
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

    const copyPrivateKey = () => {
        if(solKeys.privateKey)
        {
            navigator.clipboard.writeText(solKeys.privateKey)
                .then(() => {
                    toast.success('Private Key copied to clipboard!', {
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

    // to save keys at backend database
    const saveKeys = async () => {
        console.log("Save Keys button Pressed");
        try {
            await axios.post("http://localhost:3000/saveSolKeys", {data: solKeys});    
            console.log("Data Sent Successfully", solKeys);            
            toast.success('Keys Saved Successfully', {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

            setTimeout(() => {
                console.log("Refreshing the page...");
                window.location.reload();
            }, 4000);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <div>
            
            <div>
            <div className='mt-4'>
                <h4 className='text-sm ml-1 mb-1 select-none'>Public Address</h4>
                <div className="input input-bordered w-full cursor-text flex justify-end items-center overflow-auto whitespace-nowrap">
                    <div className="flex items-center overflow-hidden w-full">
                        <input type="text" className='bg-transparent text-white flex-grow pr-2 py2 hover:outline-none w-full' placeholder="hello" readOnly value={solKeys.publicKey}/>
                    </div>
                    <div className="ml-auto">
                        <FontAwesomeIcon className="cursor-pointer" icon={faCopy} onClick={copyPublicKey} />
                    </div>
                </div>
            </div>
            <div className='mt-6'>
                <h4 className='text-sm ml-1 mb-1 select-none'>Private Address</h4>
                <div className="input input-bordered w-full cursor-text flex justify-end items-center overflow-x-auto whitespace-nowrap"> 
                    <div className="flex items-center overflow-hidden w-full">
                        <input type="text" className='bg-transparent text-white flex-grow pr-3 py2 hover:outline-none w-full' placeholder="hello" readOnly value={
                            showText ? solKeys.privateKey : hiddenText
                            }/>
                    </div>
                    <div className="ml-auto flex space-x-3">
                        <div onClick={keyShow} className="cursor-pointer">
                            {
                                showPrivateKey ? (
                                    <EyeIcon className="h-5 w-5 text-gray-500" />
                                ) : (
                                    <EyeSlashIcon className="h-5 w-5 text-gray-500" />
                                )
                            }
                        </div>
                        <FontAwesomeIcon className="cursor-pointer" icon={faCopy} onClick={copyPrivateKey}/>
                    </div>
                </div>  
            </div>
            </div>
            
            <div className="mt-6 flex justify-center">
                <button onClick={saveKeys} className="p-2 px-4 border border-purple-500 rounded-md mx-4 hover:scale-105 cursor-pointer hover:bg-purple-400 hover:bg-opacity-15 text-white font-semibold">Save Keys</button>
                <ToastContainer />
            </div>

        </div>
    );
}
export default SolanaKeys
