import { faCopy } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface SolWallet {
  id: number;
  publickey: string;
  privatekey: string;
}

interface EthWallet {
  id: number;
  publickey: string;
  privatekey: string;
}

interface SolKeyPairsResponse {
  solKeyPairs: SolWallet[];
}

interface EthKeyPairsResponse {
  ethKeyPairs: EthWallet[];
}

const AllWallets:React.FC = () => {

  const [solData, setSolData] = useState<SolWallet[]>([]);
  const [ethData, setEthData] = useState<EthWallet[]>([]);

  const [isSolOpen, setIsSolOpen] = useState(true); // Solana tab is open by default
  const [isEthOpen, setIsEthOpen] = useState(false);

  const solTab = async () => {
    try{
        const response = await fetch("https://web3-wallet-7263.onrender.com/getSolWalletKeys");
        const data: SolKeyPairsResponse = await response.json()
        setSolData(data.solKeyPairs);
        // console.log(data.solKeyPairs);
      }catch (error) {
        console.log("Error Occured");
    }
    setIsEthOpen(false);
    setIsSolOpen(true);
  }
  
  const ethTab = async () => {
    try{
      const response = await fetch("https://web3-wallet-7263.onrender.com/getEthWalletKeys");
      const data: EthKeyPairsResponse = await response.json()
      setEthData(data.ethKeyPairs);
    }catch (error) {
      console.log("Error Occured");
  }
    setIsSolOpen(false);
    setIsEthOpen(true);
  }


  // by default, at first time we want to show sol keys, thats why fetch it automatically, when the components are rendered
  useEffect(() => {
    solTab();
    ethTab();
  }, []);

  // to only show one private key, and hide others
  const [showPrivateKeys, setShowPrivateKeys] = useState<{ [id: number]: boolean }>({});
  // showPrivateKeys is an object where each key corresponds to a wallet ID, and the value is a boolean indicating whether the private key is visible or not.

  // it will take previous state of the togglePrivateKey(EyeIcon) and will make it opposite
  const togglePrivateKey = (id: number) => {
    setShowPrivateKeys((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const copyPublicKey = (index:number) => {
    if(solData[index])
    {
        navigator.clipboard.writeText(solData[index].publickey)
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

  const copyPrivateKey = (index:number) => {
    if(solData[index])
    {
        navigator.clipboard.writeText(solData[index].privatekey)
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

  const  hiddenText = '•••'.repeat(32);

  return (
    <div className="mx-auto">
        <div className="mb-4 mt-4">
            <div className="w-full flex space-x-2">
              <div onClick={solTab} className={`w-1/2 flex justify-center cursor-pointer border border-gray-500 rounded-xl py-2 select-none ${isSolOpen && `bg-blue-500 border-blue-500 bg-opacity-20`}`}>
                SOLANA Wallet
              </div>

              <div onClick={ethTab} className={`w-1/2 flex justify-center cursor-pointer border border-gray-500 rounded-xl py-2 select-none ${isEthOpen && `bg-blue-500 border-blue-500 bg-opacity-20`}`}>
                ETHERIUM Wallet
              </div>
            </div>

          {isSolOpen &&
          <div className="w-full border border-white mt-6 rounded">
            {
              solData?.map((item, index) => (
                <div className="mt-4 mx-4 border border-gray-500 px-4 pb-4 mb-4 rounded-sm" key={item.id}>
                  <div className='mt-4'>
                      <h4 className='text-sm ml-1 mb-1 select-none'>Public Address</h4>
                      <div className="input input-bordered w-full cursor-text flex justify-end items-center overflow-auto whitespace-nowrap h-10">
                          <div className="flex items-center overflow-hidden w-full" >
                              <input type="text" className='bg-transparent text-white flex-grow pr-2 hover:outline-none w-full text-[14px]' readOnly value={item.publickey}/>
                          </div>
                          <div className="ml-auto">
                              <FontAwesomeIcon className="cursor-pointer" icon={faCopy} onClick={() => copyPublicKey(index)} />
                          </div>
                      </div>
                  </div>
                  <div className='mt-4'>
                      <h4 className='text-sm ml-1 mb-1 select-none'>Private Address</h4>
                      <div className="input input-bordered w-full cursor-text flex justify-end items-center overflow-x-auto whitespace-nowrap h-10"> 
                          <div className="flex items-center overflow-hidden w-full">
                              <input type="text" className='bg-transparent text-white flex-grow pr-3 py2 hover:outline-none w-full' readOnly value={
                                  showPrivateKeys[item.id] ? item.privatekey : hiddenText
                                  }/>
                                  {/* if that particular private key eyeIcon is clicked then only show private key */}
                          </div>
                          <div className="ml-auto flex space-x-3">
                              <div onClick={() => togglePrivateKey(item.id)} className="cursor-pointer">
                                  {
                                      showPrivateKeys[item.id] ? (
                                          <EyeIcon className="h-5 w-5 text-gray-500" />
                                      ) : (
                                          <EyeSlashIcon className="h-5 w-5 text-gray-500" />
                                      )
                                  }
                              </div>
                              <FontAwesomeIcon className="cursor-pointer" icon={faCopy} onClick={() => copyPrivateKey(index)}/>
                          </div>
                      </div>  
                  </div>
                </div>
              ))
            }
          </div>
          }

          {isEthOpen &&
          <div className="w-full border border-white mt-6 rounded">
          {
            ethData?.map((item, index) => (
              <div className="mt-4 mx-4 border border-gray-500 px-4 pb-4 mb-4 rounded-sm" key={item.id}>
                <div className='mt-4'>
                    <h4 className='text-sm ml-1 mb-1 select-none'>Public Address</h4>
                    <div className="input input-bordered w-full cursor-text flex justify-end items-center overflow-auto whitespace-nowrap h-10">
                        <div className="flex items-center overflow-hidden w-full" >
                            <input type="text" className='bg-transparent text-white flex-grow pr-2 hover:outline-none w-full text-[14px]' readOnly value={item.publickey}/>
                        </div>
                        <div className="ml-auto">
                            <FontAwesomeIcon className="cursor-pointer" icon={faCopy} onClick={() => copyPublicKey(index)} />
                        </div>
                    </div>
                </div>
                <div className='mt-4'>
                    <h4 className='text-sm ml-1 mb-1 select-none'>Private Address</h4>
                    <div className="input input-bordered w-full cursor-text flex justify-end items-center overflow-x-auto whitespace-nowrap h-10"> 
                        <div className="flex items-center overflow-hidden w-full">
                            <input type="text" className='bg-transparent text-white flex-grow pr-3 py2 hover:outline-none w-full' readOnly value={
                                showPrivateKeys[item.id] ? item.privatekey : hiddenText
                                }/>
                                {/* if that particular private key eyeIcon is clicked then only show private key */}
                        </div>
                        <div className="ml-auto flex space-x-3">
                            <div onClick={() => togglePrivateKey(item.id)} className="cursor-pointer">
                                {
                                    showPrivateKeys[item.id] ? (
                                        <EyeIcon className="h-5 w-5 text-gray-500" />
                                    ) : (
                                        <EyeSlashIcon className="h-5 w-5 text-gray-500" />
                                    )
                                }
                            </div>
                            <FontAwesomeIcon className="cursor-pointer" icon={faCopy} onClick={() => copyPrivateKey(index)}/>
                        </div>
                    </div>  
                </div>
              </div>
            ))
          }
        </div>
          }

        </div>
    </div>
  );
};

export default AllWallets;
