// StockWatch Dashboard: Minimal React App
// You can deploy this to Vercel (free hosting)

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';

export default function StockDashboard() {
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
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold mb-4">📈 StockWatch Dashboard</h1>

      <div className="flex gap-2 mb-4">
        <Input
          placeholder="Enter stock symbol (e.g. RELIANCE.BO)"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
        />
        <button
          onClick={fetchStock}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {loading ? 'Loading...' : 'Fetch'}
        </button>
      </div>

      {data && (
        <Card className="w-full max-w-md">
          <CardContent>
            <h2 className="text-xl font-semibold">{data.shortName}</h2>
            <p className="mt-2">Symbol: {data.symbol}</p>
            <p>Price: ₹{data.regularMarketPrice}</p>
            <p>Day High: ₹{data.regularMarketDayHigh}</p>
            <p>Day Low: ₹{data.regularMarketDayLow}</p>
            <p>% Change: {data.regularMarketChangePercent?.toFixed(2)}%</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
