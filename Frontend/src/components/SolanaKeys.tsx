import { faCopy } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from "react";

const SolanaKeys = () => {

    const [showPrivateKey, setShowPrivateKey] = useState(false);

    const keyShow = () => {
        setShowPrivateKey(!showPrivateKey);
    }

    const [solKeys, setSolKeys] = useState({publicKey: '', privateKey: ''});
    const getKeys = async() => {
        try {
            const response = await fetch("http://localhost:3000/solana-keypair");
            const data = await response.json()
            const keyPairs = data.SolanaKeyPair;
            console.log(keyPairs);  
            setSolKeys({publicKey:keyPairs.publicKey, privateKey:keyPairs.privateKey});

        } catch (error) {
            console.error('Error:', error);
        }
    }
    useEffect(() => {
        getKeys();
    }, []);
    return (
        <div>
            <div className='mt-4'>
                <h4 className='text-sm ml-1 mb-1 select-none'>Public Address</h4>
                <div className="input input-bordered w-full cursor-text flex justify-end items-center overflow-auto whitespace-nowrap">
                    <div className="">
                        <p>{solKeys.publicKey}</p>
                    </div>
                    <div className="ml-auto">
                        <FontAwesomeIcon className="cursor-pointer" icon={faCopy} />
                    </div>
                </div>
            </div>
            <div className='mt-6'>
                <h4 className='text-sm ml-1 mb-1 select-none'>Private Address</h4>
                <div className="input input-bordered w-full cursor-text flex justify-end items-center overflow-x-auto whitespace-nowrap"> 
                    <div className="ml-4">
                        <p className="mx-4">{solKeys.privateKey}</p>
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
                        <FontAwesomeIcon className="cursor-pointer" icon={faCopy} />
                    </div>
                </div>  
            </div>
        </div>
    );
}
export default SolanaKeys
