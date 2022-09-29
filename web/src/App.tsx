import './styles/main.css';

import logoImg from './assets/logo-nlw-esports.svg';
import { GameBanner } from './components/GameBanner';
import { CreatedAdBanner } from './components/CreatedAdBanner';
import { useEffect, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { GameController } from 'phosphor-react';
import { Input } from './components/Form/Input';

interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  }
}

function App() {

  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    fetch('http://localhost:3333/games')
      .then(res => res.json())
      .then(data => {
        setGames(data);
      });
  });

  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
      <img src={logoImg} alt="" />

      <h1 className="text-6xl text-white font-black mt-20">
        Your <span className="text-transparent bg-nlw-gradient bg-clip-text">duo</span> is here.
      </h1>

      <div className="grid grid-cols-6 gap-6 mt-16">
        {games.map((game) => {
          return (
            <GameBanner
              bannerUrl={game.bannerUrl}
              title={game.title}
              adsCount={game._count.ads}
              key={game.id} />
          )
        })}
      </div>

      <Dialog.Root>
        <CreatedAdBanner />
        <Dialog.Overlay className="bg-black/60 inset-0 fixed" />
        <Dialog.Content
          className='fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[620px] shadow-black/25'>
          <Dialog.Title className='text-3xl font-black'>Publish an AD</Dialog.Title>
          <form className='mt-8 flex flex-col gap-4'>
            <div className='flex flex-col gap-2'>
              <label className='font-semibold' htmlFor='game'>What is the gaame?</label>
              <Input
                id="game"
                placeholder='Select the game you wanna play' />
            </div>

            <div className='flex flex-col gap-2'>
              <label htmlFor='name'>Your name (or nickname)</label>
              <Input id="name" placeholder='How they call you in the game?' />
            </div>

            <div className='grid grid-cols-2 gap-6'>
              <div className='flex flex-col gap-2'>
                <label htmlFor='yeasPlaying'>How long have you been playing?</label>
                <Input id="yeasPlaying" type="number" placeholder='It is okay to be ZERO' />
              </div>

              <div className='flex flex-col gap-2'>
                <label htmlFor='discord'>What is your Discord?</label>
                <Input id="discord" placeholder='User#0000' />
              </div>
            </div>

            <div className='flex gap-6'>
              <div className='flex flex-col gap-2'>
                <label htmlFor='weekDays'>When you use to play?</label>
                <div className='flex gap-1 m-auto'>
                  <button
                    className='w-10 h-10 rounded bg-zinc-900'
                    title='Sunday'>S</button>
                  <button
                    className='w-10 h-10 rounded bg-zinc-900'
                    title='Monday'>M</button>
                  <button
                    className='w-10 h-10 rounded bg-zinc-900'
                    title='Tuesday'>T</button>
                  <button
                    className='w-10 h-10 rounded bg-zinc-900'
                    title='Wednesday'>W</button>
                  <button
                    className='w-10 h-10 rounded bg-zinc-900'
                    title='Thursday'>T</button>
                  <button
                    className='w-10 h-10 rounded bg-zinc-900'
                    title='Friday'>F</button>
                  <button
                    className='w-10 h-10 rounded bg-zinc-900'
                    title='Saturday'>S</button>

                </div>
              </div>

              <div className='flex flex-col gap-2 flex-1'>
                <label htmlFor='hourStart'>What time of the day?</label>
                <div className='grid grid-cols-2 gap-2'>
                  <Input id="hourStart" type="time" placeholder='De' />
                  <Input id="hourEnd" type="time" placeholder='Até' />
                </div>
              </div>
            </div>

            <div className='mt-2 flex gap-2 text-sm'>
              <Input type="checkbox" />
              I use to connect to the voice chaaat
            </div>

            <footer className='mt-4 flex justify-end gap-4'>
              <Dialog.Close type='button' className='bg-zinc-500 px-5 h-12 rounded-md text-semibold hover:bg-zinc-600'>Cancel</Dialog.Close>
              <button
                className='bg-violet-500 px-5 h-12 rounded-md text-semibold flex items-center gap-3 hover:bg-violet-600'
                type='submit'>
                <GameController className='w-6 h-6' />
                Find your duo
              </button>
            </footer>
          </form>
        </Dialog.Content>
        <Dialog.Portal>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  )
}



export default App
