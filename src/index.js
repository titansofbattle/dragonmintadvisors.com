import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';

import './assets/main.css';
import App from './App';

import { WagmiConfig, createConfig, configureChains } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import { localhost, pulsechain } from 'wagmi/chains'
import { InjectedConnector } from 'wagmi/connectors/injected'
const { chains, publicClient } = configureChains(
  [localhost, pulsechain],
  [publicProvider()],
)

const config = createConfig({
  autoConnect: true,
  connectors: [
    new InjectedConnector({
      chains,
      options: {
        name: 'Injected',
        shimDisconnect: true,
      },
    }),
  ],
  publicClient,
})

const root = createRoot(document.getElementById('root'))
root.render(
  // <StrictMode>
    <WagmiConfig config={config}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </WagmiConfig>
  // </StrictMode>
)
