import React, { useState } from 'react';
import { getFactoryContractWithSigner } from '../constants/factoryconfig';

function AddCoins() {
  const [memeCoinTitle, setMemeCoinTitle] = useState('');
  const [tickerTitle, setTickerTitle] = useState('');
  const [description, setDescription] = useState('');
  const [transactionStatus, setTransactionStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    setTransactionStatus('Connecting to wallet...');

    try {
      const contract = await getFactoryContractWithSigner();

      if (!contract) {
        setTransactionStatus('Error: Failed to connect to contract.');
        return;
      }

      const signerAddress = await contract.signer.getAddress();
      console.log('Using wallet address:', signerAddress);

      setTransactionStatus('Sending transaction...');
      console.log('Calling createProject with:', memeCoinTitle, tickerTitle);

      const tx = await contract.createProject(memeCoinTitle, tickerTitle, {
        value: BigInt('20000000000000000'), // 0.02 SEI
      });
      

      if (!tx || !tx.hash) {
        setTransactionStatus('Transaction was not sent.');
        console.error('Transaction object is invalid:', tx);
        return;
      }

      console.log('Transaction sent:', tx.hash);
      setTransactionStatus(`Transaction sent! Hash: ${tx.hash}`);

      const receipt = await tx.wait();

      console.log('Transaction receipt:', receipt);
      if (receipt.status === 1) {
        setTransactionStatus('Transaction confirmed! 🎉');
        setMemeCoinTitle('');
        setTickerTitle('');
        setDescription('');
      } else {
        setTransactionStatus('Transaction failed.');
      }
    } catch (error) {
      console.error('Transaction error:', error);
      setTransactionStatus(`Transaction failed: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen mt-12 flex flex-col items-center">
      <form className="max-w-md w-full" onSubmit={handleSubmit}>
        {/* Meme Coin Title */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="title"
            id="title"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 focus:border-blue-600 peer"
            placeholder=" "
            required
            value={memeCoinTitle}
            onChange={(e) => setMemeCoinTitle(e.target.value)}
          />
          <label htmlFor="title" className="absolute text-sm text-gray-500 dark:text-gray-400 top-3 scale-75 origin-[0] peer-focus:scale-75 peer-focus:-translate-y-6">
            Meme Coin Title
          </label>
        </div>

        {/* Ticker Title */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="ticker"
            id="ticker"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 focus:border-blue-600 peer"
            placeholder=" "
            required
            value={tickerTitle}
            onChange={(e) => setTickerTitle(e.target.value)}
          />
          <label htmlFor="ticker" className="absolute text-sm text-gray-500 dark:text-gray-400 top-3 scale-75 origin-[0] peer-focus:scale-75 peer-focus:-translate-y-6">
            Ticker Title
          </label>
        </div>

        {/* Description */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="description"
            id="description"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 focus:border-blue-600 peer"
            placeholder=" "
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <label htmlFor="description" className="absolute text-sm text-gray-500 dark:text-gray-400 top-3 scale-75 origin-[0] peer-focus:scale-75 peer-focus:-translate-y-6">
            Description
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="min-w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Submit
        </button>
      </form>

      {/* Transaction Status */}
      {transactionStatus && (
        <div className="mt-4 p-4 border rounded-md bg-gray-100 dark:bg-gray-800 dark:border-gray-700">
          <p className="text-sm text-gray-900 dark:text-white">{transactionStatus}</p>
        </div>
      )}
    </div>
  );
}

export default AddCoins;
