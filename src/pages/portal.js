import React, { useEffect, useState } from 'react';
import { useAccount, useConnect, useEnsName } from 'wagmi'
import { ethers } from 'ethers'
import nftabi from '../assets/erc404.abi.json'
import loading from '../assets/Infinity-1s-200px.svg'

export default function Portal() {
  const [isLoading, setIsLoading] = useState(true)
  const [collection, setCollection] = useState([])
  const { address, isConnected } = useAccount()

  const { connect, connectors } = useConnect({
    onError(e) {
      console.log(e)
    },
  })

  const connector = connectors[0]
  const { data: ensName } = useEnsName({ address })

  useEffect(() => {
    async function getCollection() {
      const provider = new ethers.BrowserProvider(ethereum)
      const signer = await provider.getSigner()
      const dmc_address = process.env.REACT_APP_DMC_CONTRACT

      const dmc = new ethers.Contract(dmc_address, nftabi, signer)
      const receivedFilter = dmc.filters.Transfer(null, address);
      const receivedEvents = await dmc.queryFilter(receivedFilter, 19593175, 'latest');
  
      const sentFilter = dmc.filters.Transfer(address, null);
      const sentEvents = await dmc.queryFilter(sentFilter, 19593175, 'latest');
      
      const ownershipMap = new Map();

      for (const event of receivedEvents) {
        const tokenId = event.args[2].toString();
        ownershipMap.set(tokenId, true);
      }
  
      for (const event of sentEvents) {
        const tokenId = event.args[2].toString();
        if (ownershipMap.has(tokenId)) {
          ownershipMap.delete(tokenId);
        }
      }

      const ownedTokenIds = Array.from(ownershipMap.keys());
      const dataset = []

      for (const tokenID of ownedTokenIds) {
        dataset.push(JSON.parse(String(await dmc.tokenURI(tokenID)).replace('data:application/json;utf8,', '')))
      }

      setCollection(dataset)
      setIsLoading(false)
    }

    if (window.ethereum && isConnected) {
      getCollection()
    }
  }, [])

  if (isLoading) {
    return (
      <div className="flex flex-col items-center w-full text-white pt-20">
        <div className="flex flex-col w-full lg:w-1/3 justify-center items-start px-12">
          <h1 className="mx-auto text-xl text-yellow-300 tracking-loose">Dragon Mint Council</h1>
          
          {isConnected ? 
            <img src={loading} alt="Loading..." className="mx-auto w-28" />
            : 
            <button onClick={() => connect({ connector })} className="mx-auto mt-4 bg-transparent hover:bg-yellow-300 text-yellow-300 hover:text-black rounded shadow hover:shadow-lg py-2 px-4 border border-yellow-300 hover:border-transparent">
              connect
            </button>
          }
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center w-full text-white pt-20">
      <div className="flex flex-col w-full lg:w-1/3 justify-center items-start px-12">
        <h1 className="mx-auto text-xl text-yellow-300 tracking-loose">Dragon Mint Council</h1>
      </div>

      <div className="hidden flex flex-col w-full lg:w-1/3 justify-center items-start px-12">
        <label className="block uppercase tracking-wide text-gray-400 text-xs font-bold mb-2" htmlFor="addresses">
        Enter your wallet address
        </label>
        <textarea id="addresses"
          className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-yellow-300">
        </textarea>
        <a target="_blank" href=""
          className="mt-4 bg-transparent hover:bg-yellow-300 text-yellow-300 hover:text-black rounded shadow hover:shadow-lg py-2 px-4 border border-yellow-300 hover:border-transparent">
          Claim Yours Now
        </a>
      </div>

      <div className="flex">
        <div className="w-full flex flex-col">
          
          <div class="mt-12 px-10 flex flex-col justify-center items-center">
            <h1 className="text-white mb-4 text-2xl">View your Council Members</h1>

            {isConnected ? 
                <div class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-x-10 xl-grid-cols-4 gap-y-10 gap-x-6"> 
                {collection.map((council, index) => (
                  
                  <div className="group h-[460px] w-80 [perspective:1000px]">
                  <div
                    className={`relative h-full w-full shadow-xl transition-all duration-500 [transform-style:preserve-3d]`}>
                    <div className="absolute inset-0 p-8 bg-[#fdfcf7] bg-opacity-10 rounded-xl">
                      <div className="flex flex-col justify-between h-full">            
            
                        <a target="_blank" href={``}>
                          <img
                            className="w-full h-64 rounded-md transition hover:bg-cyan-300"
                            src={council.image.replace('.mp4', '.png')}
                            alt="" />
                        </a>
                        
                        <div id="description" className="space-y-4 mt-4">
                          <a className="" target="_blank" href={``}>
                              <h2 className="text-white font-semibold text-xl transition hover:text-cyan-300">
                                {council.name}
                              </h2>
                          </a>
                          <p className="text-slate-500 text-sm select-none overflow-y-auto max-h-20">
                            <a href={`/titans/`}>
                              {council.description}
                            </a>
                          </p>
                        </div>
            
                      </div>
                    </div>
            
                  </div>
                </div>

                ))}
              </div> 
              : 
              <button onClick={() => connect({ connector })} className="mt-4 bg-transparent hover:bg-yellow-300 text-yellow-300 hover:text-black rounded shadow hover:shadow-lg py-2 px-4 border border-yellow-300 hover:border-transparent">
                connect
              </button>
            }

          </div>

        </div>
      </div>


    </div>
  )
}