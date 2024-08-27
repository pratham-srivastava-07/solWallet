import { useState } from 'react'
import './App.css'
import { generateMnemonic } from "bip39";
import { SolanaWallet } from './components/SolWallet';
import { EthWallet } from './components/EthWallet';
import PrimaryButton from './components/buttons/PrimaryButton';
import Navbar from './components/Navbar';
import Signup from './pages/Signup';
import { Route, Routes } from 'react-router-dom';
import Signin from './pages/Signin';


function App() {
  const [mnemonic, setMnemonic] = useState("");


  function handleMnemonics() {
    const mnemonics = generateMnemonic();
    setMnemonic(mnemonics);
  }

  const mnemonicWords: any[] = mnemonic.split(' ')
  return (
    <>
    
    {/* <Signup/> */}
    <Routes>
      <Route path='/signup' element={<Signup/>} />
      <Route path='/' element={
        <div>
        <div>
          <Navbar/>
        </div>
        <div className='pt-20 pl-20'>
          <div className='text-3xl font-bold'>
            Welcome to Nova, your own web based wallet
          </div>
          <div className='flex items-center justify-between pt-5'>
            <PrimaryButton onClick={handleMnemonics}>Generate Seed Phrase</PrimaryButton>
            <div>
              {mnemonic && <EthWallet mnemonic={mnemonic}/>}
            </div>
          </div>
          
          <div>{mnemonic && mnemonicWords.map((word, index) => (
            index % 4 === 0 && (
              <div key={index} className='flex flex-wrap pb-2'>{mnemonicWords.slice(index, index+4).map((w, i) => (
                <div key={i} className='w-1/4'>{w}</div>
              ))}</div>
            )
          ))}</div>
          <div>
            {mnemonic && <SolanaWallet mnemonic={mnemonic}/>}
          </div>
       </div>
      </div>
      } />
      <Route path='/login' element={<Signin/>} />
    </Routes>
    </>
  )
}

export default App