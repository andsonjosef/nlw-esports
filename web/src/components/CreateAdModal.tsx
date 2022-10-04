import * as Dialog from '@radix-ui/react-dialog';
import * as Checkbox from '@radix-ui/react-checkbox'

import { Check, GameController } from 'phosphor-react';
import { Input } from './Form/Input';
import { useState, useEffect, FormEvent } from 'react';
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import axios from 'axios'
interface Game {
  id: string;
  title: string;
}

export function CreateAdModal() {

  const [games, setGames] = useState<Game[]>([]);
  const [weekDays, setWeekDays] = useState<string[]>([]);
  const [useVoiceChannel, setUseVoiceChannel] = useState<boolean>(false);

  useEffect(() => {
    axios('http://localhost:3333/games')
      .then(res => {
        setGames(res.data);
      });
  }, []);

  const days = [
    { value: '0', label: 'S', title: 'Sunday' },
    { value: '1', label: 'M', title: 'Monday' },
    { value: '2', label: 'T', title: 'Tuesday' },
    { value: '3', label: 'W', title: 'Wednesday' },
    { value: '4', label: 'T', title: 'Thursday' },
    { value: '5', label: 'F', title: 'Friday' },
    { value: '6', label: 'S', title: 'Saturday' }
  ]

  async function handleCreateAd(event: FormEvent) {
    event.preventDefault();
    try {
      const formData = new FormData(event.target as HTMLFormElement);
      const data = Object.fromEntries(formData);

      await axios.post(`http://localhost:3333/games/${data.game}/ads`, {
        name: data.name,
        yearsPlaying: +data.yearsPlaying,
        discord: data.discord,
        weekDays: weekDays.map(Number),
        hourStart: data.hourStart,
        hourEnd: data.hourEnd,
        useVoiceChannel: useVoiceChannel
      });
      alert('Ad successfully created');
    } catch (error) {
      alert('Error creating ad');
      console.error(error);
    }
  }

  return (
    <Dialog.Portal>
      <Dialog.Overlay className='bg-black/60 inset-0 fixed' />
      <Dialog.Content
        className='fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[620px] shadow-black/25'>
        <Dialog.Title className='text-3xl font-black'>Publish an ad</Dialog.Title>
        <form onSubmit={handleCreateAd} className='mt-8 flex flex-col gap-4'>
          <div className='flex flex-col gap-2'>
            <label className='font-semibold' htmlFor='game'>What is the game?</label>
            <select
              className='bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500 appearance-none'
              name='game' id='game'
              defaultValue=''
            >
              <option disabled>Select the game you wanna play</option>
              {games.map(game => {
                return <option key={game.id} value={game.id}>{game.title}</option>
              })}
            </select>
          </div>

          <div className='flex flex-col gap-2'>
            <label htmlFor='name'>Your name (or nickname)</label>
            <Input name='name' id='name' placeholder='How they call you in the game?' />
          </div>

          <div className='grid grid-cols-2 gap-6'>
            <div className='flex flex-col gap-2'>
              <label htmlFor='yearsPlaying'>How long have you been playing?</label>
              <Input name='yearsPlaying' id='yearsPlaying' type='number' placeholder='It is okay to be ZERO' />
            </div>

            <div className='flex flex-col gap-2'>
              <label htmlFor='discord'>What is your Discord?</label>
              <Input name='discord' id='discord' placeholder='User#0000' />
            </div>
          </div>

          <div className='flex gap-6'>
            <div className='flex flex-col gap-2'>
              <label htmlFor='weekDays'>When you use to play?</label>
              <ToggleGroup.Root
                type='multiple'
                className='flex gap-1 m-auto'
                value={weekDays}
                onValueChange={setWeekDays}
              >
                {days.map(day => {
                  return <ToggleGroup.Item
                    key={day.value}
                    value={day.value}
                    className={`w-10 h-10 rounded ${weekDays.includes(day.value) ? 'bg-violet-500' : 'bg-zinc-900'}`}
                    title={day.title}>{day.label}</ToggleGroup.Item>
                })}
              </ToggleGroup.Root>
            </div>

            <div className='flex flex-col gap-2 flex-1'>
              <label htmlFor='hourStart'>What time of the day?</label>
              <div className='grid grid-cols-2 gap-2'>
                <Input name='hourStart' id='hourStart' type='time' placeholder='De' />
                <Input name='hourEnd' id='hourEnd' type='time' placeholder='Até' />
              </div>
            </div>
          </div>

          <label className='mt-2 flex gap-2 text-sm items-center'>
            <Checkbox.Root className='w-6 h-6 rounded bg-zinc-900'
              checked={useVoiceChannel}
              onCheckedChange={checked => {
                setUseVoiceChannel(checked === true ? true : false);
              }}>
              <Checkbox.Indicator >
                <Check className='w-4 h-4 m-auto text-emerald-400' />
              </Checkbox.Indicator>
            </Checkbox.Root>
            I use to connect to the voice chat
          </label>

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
    </Dialog.Portal>
  )
}