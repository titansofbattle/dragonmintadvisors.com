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
            <a href="#"
              className="bg-transparent hover:bg-yellow-300 text-yellow-300 hover:text-black rounded shadow hover:shadow-lg py-2 px-4 border border-yellow-300 hover:border-transparent">
            Explore Now</a>
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
