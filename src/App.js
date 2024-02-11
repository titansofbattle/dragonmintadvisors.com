import React from 'react';

import left from './assets/left.webp'
import main from './assets/main.webp'
import right from './assets/right.webp'


function App() {
  return (
    <section>
      <div className="bg-black text-white md:py-20 min-h-screen flex flex-col md:justify-center">
        <div className="container mx-auto flex flex-col md:flex-row items-center my-12 md:my-24">
          <div className="flex flex-col w-full lg:w-1/3 justify-center items-start p-12">
            <h1 className="text-xl md:text-xl text-yellow-300 tracking-loose">Dragon Mint Advisors</h1>
            <h2 className="hidden text-3xl md:text-5xl leading-relaxed md:leading-snug mb-2">Headline</h2>
            <p className="text-sm md:text-base text-gray-50 mb-4">Unlock a World of Digital Excellence in ERC404 with Dragon Mint Advisors</p>
            <a target="_blank" href="https://app.uniswap.org/swap?inputCurrency=0xF19308F923582A6f7c465e5CE7a9Dc1BEC6665B1&outputCurrency=0x2c47e4ad6C1c512c5890877f6a3108431d79A53f"
              className="bg-transparent hover:bg-yellow-300 text-yellow-300 hover:text-black rounded shadow hover:shadow-lg py-2 px-4 border border-yellow-300 hover:border-transparent">
            Claim Yours Now</a>
            <a className="hover:scale-125 duration-300 mt-4" href="https://t.me/dragonmintadvisors" target="_blank" rel="noreferrer" aria-label="telegram">
              <svg className="fill-current h-7 text-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="m20.665 3.717-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42 10.532-6.645c.498-.303.953-.14.579.192l-8.533 7.701h-.002l.002.001-.314 4.692c.46 0 .663-.211.921-.46l2.211-2.15 4.599 3.397c.848.467 1.457.227 1.668-.785l3.019-14.228c.309-1.239-.473-1.8-1.282-1.434z"></path>
              </svg>
            </a>
          </div>
          <div className="p-8 mt-12 mb-6 md:mb-0 md:mt-0 ml-0 md:ml-12 lg:w-2/3 justify-center">
            <div className="h-48 flex flex-wrap content-center">
              <div>
                <img className="inline-block mt-28 hidden xl:block" src={left} />
              </div>
              <div>
                <img className="inline-block mt-24 md:mt-0 p-8 md:p-0" src={main} />
              </div>
              <div>
                <img className="inline-block mt-28 hidden lg:block" src={right} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default App;
