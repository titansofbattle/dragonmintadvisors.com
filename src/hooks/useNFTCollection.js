import { useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';
import nftabi from '../assets/erc404.abi.json';
import { useAccount } from 'wagmi'

function useNFTCollection(initialAddress) {
  const [isLoading, setIsLoading] = useState(false);
  const [collection, setCollection] = useState([]);
  const { isConnected } = useAccount()

  const fetchNFTs = useCallback(async (fetchAddress) => {
    setIsLoading(true);
    setCollection([]);

    try {
      const dmc_address = process.env.REACT_APP_DMC_CONTRACT
      let dmc;
      if (isConnected) {
        const provider = new ethers.BrowserProvider(ethereum)
        const signer = await provider.getSigner()
        dmc = new ethers.Contract(dmc_address, nftabi, signer)
      } else {
        const rpcurl = 'https://rpc-pulsechain.g4mm4.io'
        const provider = new ethers.JsonRpcProvider(rpcurl)
        dmc = new ethers.Contract(dmc_address, nftabi, provider)
      }

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

      setCollection(dataset);
    } catch (error) {
      console.error('Failed to fetch NFT collection:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { isLoading, collection, fetchNFTs };
}

export default useNFTCollection;
