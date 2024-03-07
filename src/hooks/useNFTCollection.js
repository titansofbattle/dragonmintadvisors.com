import { useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';
import nftabi from '../assets/erc404.abi.json';
import { data } from 'autoprefixer';

function useNFTCollection(initialAddress) {
  const [address, setAddress] = useState(initialAddress);
  const [isLoading, setIsLoading] = useState(false);
  const [collection, setCollection] = useState([]);

  const fetchNFTs = useCallback(async (fetchAddress) => {
    setIsLoading(true);
    setCollection([]); // Optionally clear the previous collection
    try {
      // Using the provider as you've specified
      const provider = new ethers.BrowserProvider(ethereum);
      const signer = await provider.getSigner();
      const dmc_address = process.env.REACT_APP_DMC_CONTRACT;
      const dmc = new ethers.Contract(dmc_address, nftabi, signer);
      
      const receivedFilter = dmc.filters.Transfer(null, fetchAddress);
      const receivedEvents = await dmc.queryFilter(receivedFilter, 19593175, 'latest');
      
      const sentFilter = dmc.filters.Transfer(fetchAddress, null);
      const sentEvents = await dmc.queryFilter(sentFilter, 19593175, 'latest');
      
      const ownershipMap = new Map();
      
      receivedEvents.forEach(event => {
        const tokenId = event.args[2].toString();
        ownershipMap.set(tokenId, true);
      });
      
      sentEvents.forEach(event => {
        const tokenId = event.args[2].toString();
        if (ownershipMap.has(tokenId)) {
          ownershipMap.delete(tokenId);
        }
      });
      
      const ownedTokenIds = Array.from(ownershipMap.keys());
      const dataset = await Promise.all(ownedTokenIds.map(async tokenId => {
        const tokenURI = await dmc.tokenURI(tokenId);
        return JSON.parse(String(tokenURI).replace('data:application/json;utf8,', ''));
      }));

      console.log('address:', fetchAddress)
      console.log('dataset length:', dataset.length)

      setCollection(dataset);
    } catch (error) {
      console.error('Failed to fetch NFT collection:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (address) {
      fetchNFTs(address);
    }
  }, [address, fetchNFTs]);

  return { isLoading, collection, setAddress };
}

export default useNFTCollection;
