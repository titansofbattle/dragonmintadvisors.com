import React, { useEffect, useState } from 'react';
import { useAccount, useConnect } from 'wagmi'
import { ethers } from 'ethers'
import nftabi from '../assets/erc404.abi.json'
import { data } from 'autoprefixer';

export default function Portal() {
  const { address, isConnected } = useAccount()
  const [collection, setCollection] = useState([])

  useEffect(() => {
    async function getCollection() {
      const provider = new ethers.BrowserProvider(ethereum)
      const signer = await provider.getSigner()
      const dmc_address = process.env.REACT_APP_DMC_CONTRACT

      const dmc = new ethers.Contract(dmc_address, nftabi, signer)

      console.log(`user balance: ${await dmc.balanceOf(address)}`)

      const receivedFilter = dmc.filters.Transfer(null, address);
      const receivedEvents = await dmc.queryFilter(receivedFilter, 19593175, 'latest');
  
      const sentFilter = dmc.filters.Transfer(address, null);
      const sentEvents = await dmc.queryFilter(sentFilter, 19593175, 'latest');
      
      const ownershipMap = new Map();

      // Process received events - mark the NFTs as owned
      for (const event of receivedEvents) {
        const tokenId = event.args[2].toString();
        ownershipMap.set(tokenId, true);
      }
  
      // Process sent events - if the NFT was sent away, remove it from the map
      for (const event of sentEvents) {
        const tokenId = event.args[2].toString();
        if (ownershipMap.has(tokenId)) {
          ownershipMap.delete(tokenId);
        }
      }

      const ownedTokenIds = Array.from(ownershipMap.keys());
      console.log('Owned Token IDs:', ownedTokenIds);
      console.log('ownedTokenIds.length:', ownedTokenIds.length)

      // console.log(`token dataURI: \x1b[36m${await dmc.tokenURI(ownedTokenIds[0])}\x1b[0m`)
      // console.log(`token dataURI: \x1b[36m${await dmc.tokenURI(ownedTokenIds[1])}\x1b[0m`)

      const dataset = []

      for (const tokenID of ownedTokenIds) {
        dataset.push(JSON.parse(String(await dmc.tokenURI(tokenID)).replace('data:application/json;utf8,', '')))
      }

      console.log(dataset)
      setCollection(dataset)

      //       const contract_address = process.env.REACT_APP_DMC_CONTRACT
// console.log('contract_address:', contract_address)
//       const options = {method: 'GET', headers: {accept: 'application/json'}};
//       const apiKey = 'bwtqHjpYPEcc9NgNHsThMMNh0YkRvbWA'
//       const url = `https://eth-mainnet.g.alchemy.com/nft/v3/${apiKey}/getNFTsForOwner?owner=${address}&contractAddresses[]=${contract_address}&withMetadata=true&pageSize=100`;

//       const dataset = await fetch(url, options)
//         .then(response => response.json())
// console.log(dataset)

//         setCollection(dataset.ownedNfts)
    }

    if (window.ethereum && isConnected) {
      getCollection()
    }
  }, [])


  console.log(isConnected)
  console.log(address)

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
          </div>

        </div>
      </div>


    </div>
  )
}