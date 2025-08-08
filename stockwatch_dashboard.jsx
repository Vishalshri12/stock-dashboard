// StockWatch Dashboard: Minimal React App for Vercel (Vite-compatible)

import React, { useState } from 'react';

export default function App() {
  const [symbol, setSymbol] = useState('RELIANCE.BO');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchStock = async () => {
    setLoading(true);
    try {
      const res = await fetch(`https://query1.finance.yahoo.com/v7/finance/quote?symbols=${symbol}`);
      const json = await res.json();
      setData(json.quoteResponse.result[0]);
    } catch (err) {
      alert('Error fetching data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f3f4f6', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>📈 StockWatch Dashboard</h1>

      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
        <input
          placeholder="Enter stock symbol (e.g. RELIANCE.BO)"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          style={{ padding: '0.5rem', border: '1px solid #ccc', borderRadius: '0.25rem' }}
        />
        <button
          onClick={fetchStock}
          style={{ backgroundColor: '#3b82f6', color: 'white', padding: '0.5rem 1rem', borderRadius: '0.25rem', border: 'none' }}
        >
          {loading ? 'Loading...' : 'Fetch'}
        </button>
      </div>

      {data && (
        <div style={{ backgroundColor: 'white', padding: '1rem', borderRadius: '0.5rem', width: '100%', maxWidth: '400px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '600' }}>{data.shortName}</h2>
          <p style={{ marginTop: '0.5rem' }}>Symbol: {data.symbol}</p>
          <p>Price: ₹{data.regularMarketPrice}</p>
          <p>Day High: ₹{data.regularMarketDayHigh}</p>
          <p>Day Low: ₹{data.regularMarketDayLow}</p>
          <p>% Change: {data.regularMarketChangePercent?.toFixed(2)}%</p>
        </div>
      )}
    </div>
  );
}
