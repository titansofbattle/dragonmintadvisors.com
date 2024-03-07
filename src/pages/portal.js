import React, { useEffect, useState } from 'react'
import { useAccount, useConnect } from 'wagmi'
import loading from '../assets/Infinity-1s-200px.svg'
import useNFTCollection from '../hooks/useNFTCollection'
import { Tabs, Tab } from './tabs'


export default function Portal() {
  const { address, isConnected } = useAccount()
  const [inputAddress, setInputAddress] = useState('')
  const { isLoading, collection, fetchNFTs } = useNFTCollection(address);

  useEffect(() => {
    if (isConnected) {
      fetchNFTs(address)
    }
  }, [])

  const { connect, connectors } = useConnect({
    onError(e) {
      console.log(e)
    },
  })
  const connector = connectors[0];

  const handleAddressChange = (event) => {
    setInputAddress(event.target.value)
  }

  const handleAddressSubmit = (event) => {
    event.preventDefault()

    // Basic validation for an Ethereum address
    if (/^0x[a-fA-F0-9]{40}$/.test(inputAddress)) {
      console.log("Valid Ethereum address:", inputAddress);
      fetchNFTs(inputAddress);
    } else {
      alert("Please enter a valid Ethereum address.");
    }
  }

  return (
    <div className="flex flex-col items-center w-full text-white pt-20">
      <div className="flex flex-col w-full lg:w-1/3 justify-center items-start px-12 mb-4">
        <h1 className="mx-auto text-xl text-yellow-300 tracking-loose">Dragon Mint Council</h1>
      </div>

      <Tabs className="mx-auto w-3/4">
        <Tab label="Connect Wallet" className="mx-auto w-full flex justify-center items-center">
          {!isConnected ? (
            <button onClick={() => connect({ connector })} className="w-1/2 mt-4 bg-transparent hover:bg-yellow-300 text-yellow-300 hover:text-black rounded shadow hover:shadow-lg py-2 px-4 border border-yellow-300 hover:border-transparent">
              connect
            </button>
          ) : (
            <div>
              <div>Connected as: <span className="text-yellow-300">{address}</span></div>
              <div>DMC Balance: <span className="text-yellow-300">{collection.length}</span></div>
            </div>
          )}
        </Tab>
        <Tab label="Enter Address">
          <form onSubmit={handleAddressSubmit} className="flex flex-col justify-center items-center w-full">
            <input
              type="text"
              placeholder="Enter address"
              value={inputAddress}
              onChange={handleAddressChange}
              className="text-gray-500 py-3 px-4 w-full lg:w-1/2 rounded shadow font-thin focus:outline-none focus:shadow-lg focus:shadow-slate-200 duration-100 shadow-gray-100"
            />
            <button type="submit" className="mt-4 bg-transparent hover:bg-yellow-300 text-yellow-300 hover:text-black rounded shadow hover:shadow-lg py-2 px-4 border border-yellow-300 hover:border-transparent">
              Query NFTs
            </button>
          </form>
        </Tab>
      </Tabs>

      {isLoading ? (
        <img src={loading} alt="Loading..." />
      ) : (
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-x-10 xl-grid-cols-4 gap-y-10 gap-x-6"> 
          {collection.map((council, index) => (

            <div key={index} className="group h-[420px] w-80 [perspective:1000px]">
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
      )}
    </div>
  );

}
