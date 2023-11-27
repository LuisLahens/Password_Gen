import { useState, useCallback, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [length, setLength] = useState(1)
  const [nums, numsAllowed] = useState(false)
  const [char, charAllowed] = useState(false)
  const [color, setColor] = useState('black')
  const [password, setPassword] = useState('')

  const passGenerate = useCallback(() => {
    let pass = ''
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

    if(nums) str += '0123456789'
    if(char) str += '!@#$%^&*()_+'

    for (let i = 0; i < length; i++){
      let index = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(index)
    }
    setPassword(pass)
  }, [length, nums, char])

  useEffect(() => {
    passGenerate()
  }, [length, nums, char])

  const copy = () => {
    navigator.clipboard.writeText(password) 
   }

  return (
    <div className='flex-row justify-center leading-10 py-52'>
      <h1 className='text-center text-white text-2xl py-10 font-mono'>Password Generator</h1>
      <div className='text-center flex justify-center items-center'>
        <input
        className='px-2 w-64 h-12'
        type='text'
        value={password}
        placeholder='Password'
        readOnly
        >
        </input>
        <button
        className='bg-blue-400 px-2 w-20 h-12 text-white'
        onClick={() => setColor('grey')}
        style={{backgroundColor: color}}
        >copy</button>
      </div>

      <div className='flex-row text-center'>
        <div className='flex justify-center space-x-12'>
        <input
        className='w-40 cursor-pointer'
        type='range'
        value={length}
        min={1}
        max={10}
        onChange={(e) => setLength(e.target.value)}
        >
        </input>
        <label className='text-white' htmlFor="length">Length: {length}</label>
        </div>
        <div>
        <input
        className='w-4 h-4'
        type='checkbox'
        defaultChecked={nums}
        value={nums}
        onChange={() => {
          numsAllowed((prev) => !prev)
        }}
        ></input>
        <label className='text-white px-2 text-xl' htmlFor='nums'>Numbers</label>
        </div>
        <input
        className='w-4 h-4'
        type='checkbox'
        defaultChecked={char}
        onChange={() => {
          charAllowed((prev) => !prev)
        }}
        ></input>
        <label className='text-white px-2 text-xl' htmlFor='char'>Characters</label>
      </div>
    </div>
  )
}

export default App
