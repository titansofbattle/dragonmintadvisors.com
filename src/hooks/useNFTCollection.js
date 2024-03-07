import { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import nftabi from '../assets/erc404.abi.json'

function useNFTCollection(address) {
  const [isLoading, setIsLoading] = useState(true);
  const [collection, setCollection] = useState([]);

  useEffect(() => {
    if (!address) return;

    async function fetchNFTs() {
      try {
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
      } catch (error) {
        console.error('Failed to fetch NFT collection:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchNFTs()
  }, [address]);

  return { isLoading, collection };
}

export default useNFTCollection;
