import React, { useState } from 'react'
import axios from 'axios'
const App = () => {
  const [originalUrl,setOriginalUrl]=useState('');
  const [shortUrl,setshortUrl]=useState('');

  const handleSubmit =()=>{
    axios.post('http://localhost:3001/api/short',{originalUrl})
    .then((res)=>{
      setshortUrl(res.data)
      console.log("Api response", res.data)
    })
    .catch((err)=>console.log(err))
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg w-full">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">URL Shortener</h1>
        <div onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input
            placeholder="Enter URL to Shorten"
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            required
            type="text"
            name="originalUrl"
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue"
          />
  
          <button
            onClick={handleSubmit}
            type="button"
            className="bg-blue-600 text-white rounded-md py-2 font-semibold hover:bg-blue-700"
          >
            Shorten
          </button>
  
          {shortUrl && (
            <div className="mt-6 text-center">
              <p className="text-lg font-medium">Shortened URL:</p>
              <a
                href={shortUrl?.shortUrl}
                rel="noopener noreferrer"
                className="text-blue-500 underline mt-2"
                target="_blank"
              >
                {shortUrl?.shortUrl}
              </a>
  
              {/* QR Code Image in the middle */}
              {shortUrl.qrCodeImg && (
                <div className="flex justify-center mt-4">
                  <img src={shortUrl.qrCodeImg} alt="Generated QR Code" className="max-w-[150px]"/>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
  
}

export default App
