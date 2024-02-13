import React from 'react';

import left from './assets/left.webp'
import main from './assets/main.webp'
import right from './assets/right.webp'


function App() {
  return (
    <section>
      <div className="bg-black text-white md:pt-20 min-h-screen flex flex-col md:justify-center">
        <div className="container mx-auto flex flex-col md:flex-row items-center my-12 md:mt-24">
          <div className="flex flex-col w-full lg:w-1/3 justify-center items-start p-12">
            <h1 className="text-xl text-yellow-300 tracking-loose">Dragon Mint Council</h1>
            <h2 className="hidden text-3xl md:text-5xl leading-relaxed md:leading-snug mb-2">Headline</h2>
            <p className="text-sm md:text-base text-gray-50 mb-4">Unlock a World of Digital Excellence in ERC404 with Dragon Mint Council</p>
            <a target="_blank" href="https://pulsex.mypinata.cloud/ipfs/bafybeidea3ibq4lu5t6vk6ihp4iuznjb3ltsdm5y2shv4atxgyd3d33aim/#/?outputCurrency=0x47cd1790BBA178894ce245D022ce869C674275dE&inputCurrency=0xA1077a294dDE1B09bB078844df40758a5D0f9a27"
              className="bg-transparent hover:bg-yellow-300 text-yellow-300 hover:text-black rounded shadow hover:shadow-lg py-2 px-4 border border-yellow-300 hover:border-transparent">
            Claim Yours Now</a>
            <a className="hover:scale-125 duration-300 mt-4 z-20" href="https://t.me/dragonmintadvisors" target="_blank" rel="noreferrer" aria-label="telegram">
              <svg className="fill-current h-7 text-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="m20.665 3.717-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42 10.532-6.645c.498-.303.953-.14.579.192l-8.533 7.701h-.002l.002.001-.314 4.692c.46 0 .663-.211.921-.46l2.211-2.15 4.599 3.397c.848.467 1.457.227 1.668-.785l3.019-14.228c.309-1.239-.473-1.8-1.282-1.434z"></path>
              </svg>
            </a>
          </div>
          <div className="p-8 mt-12 mb-6 md:mb-0 md:mt-0 ml-0 md:ml-12 lg:w-2/3 justify-center">
            <div className="h-48 flex flex-wrap content-center">
              <div>
                <img className="rounded-lg mt-28 hidden xl:block" src={left} />
              </div>
              <div>
                <img className="rounded-[10px] mt-24 md:mt-0 p-8 md:p-0" src={main} />
              </div>
              <div>
                <img className="rounded-lg mt-28 hidden lg:block" src={right} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="md:w-3/5 flex flex-col justify-left text-white my-24 mx-16 md:mx-auto">
        <h1 className="text-xl text-yellow-300 mb-4">Prologue:</h1>
        <p className="pb-4">
          In the ancient times, there existed a legendary assembly known as "The Council of Six", 
          guardians of the cosmic equilibrium and the custodians of the draconic essence.
          Comprised of six elite dragons, each member was chosen for their unique powers and wisdom. 
          However, as ages passed and the Titans fell into slumber, the Council faded into myth, their existence lost to time.
        </p>

        <p className="pb-2">🐉 The Awakening of the Dragon Mint Council 🐉</p>

        <p className="pb-4">As the fabric of reality begins to shift, awakening ancient powers long dormant awakes. 
          Among these are the six dragons of The Dragon Mint Council, 
          each bound to an elemental essence and a guardian of the realm's balance.
          Their awakening marks the beginning of the Journey.
        </p>

        <p className="pb-2">🐉 The Members of the Council of Six 🐉</p>
        <ul>
          <li><p className="text-yellow-300">Sapphire 'Moon Sentinel' Skyguard: Guardian of the Night Sky</p> This dragon brings balance through the mastery of lunar magic and aerial supremacy.
            <img src="https://dma.dragonmintcouncil.com/skyguard.jpg" className="md:w-1/2 mx-0 my-8" />
          </li>
          <li><p className="text-yellow-300">Twilight 'Aurora Bane' Scaleward: Protector of the Dusk and Dawn</p> wielding the ethereal energies of transitions and change.
            <img src="https://dma.dragonmintcouncil.com/scaleward.jpg" className="md:w-1/2 mx-0 my-8" />
          </li>
          <li><p className="text-yellow-300">Ember 'Crescent Guardian' Nightstrider: Keeper of the Eternal Flame</p> this dragon embodies the spirit of courage and renewal.
            <img src="https://dma.dragonmintcouncil.com/nightstrider.jpg" className="md:w-1/2 mx-0 my-8" />
          </li>
          <li><p className="text-yellow-300">Neon 'Skyline Sovereign' Drakemaster: Overlord of the Celestial Horizons</p> commanding the forces of weather and the heavens.
            <img src="https://dma.dragonmintcouncil.com/drakemaster.jpg" className="md:w-1/2 mx-0 my-8" />
          </li>
          <li><p className="text-yellow-300">Inferno 'Prism Breaker' Flameheart: Warrior of the Blazing Core</p> channeling the raw power of fire and transformation.
            <img src="https://dma.dragonmintcouncil.com/flameheart.jpg" className="md:w-1/2 mx-0 my-8" />
          </li>
          <li><p className="text-yellow-300">Cerulean 'Mystic Monarch' Celestine: Sage of the Mystic Seas</p> harnessing the deep magics of water and the Arcane.
            <img src="https://dma.dragonmintcouncil.com/celestine.jpg" className="md:w-1/2 mx-0 my-8" />
          </li>
        </ul>
      </div>

      <div className="w-full flex items-center justify-center">
        <div id="dexscreener-embed" className="w-11/12 md:!w-3/5 h-[700px] md:h-1/2">
          <iframe src="https://dexscreener.com/pulsechain/0xA8ab175Bcea7C4F539cD1c8F971421af9497ac65?embed=1&theme=dark"></iframe>
        </div>
      </div>

    </section>
  );
}

export default App;
