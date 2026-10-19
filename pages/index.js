import { parse } from 'csv-parse/sync';
import fs from 'fs';
import path from 'path';
import { useState } from 'react';
import RawPriceChart from '../components/RawPriceChart';
import NormalizedReturnChart from '../components/NormalizedReturnChart';

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'data/stockdata.csv');
  const csvContent = fs.readFileSync(filePath, 'utf8');
  
  const records = parse(csvContent, {
    columns: true,
    skip_empty_lines: true,
  });

  return {
    props: { data: records },
  };
}

export default function Home({data}) {
  const [stock, setStock] = useState(['MSFT', 'IBM', 'SBUX', 'AAPL', 'GSPC']);
  const [chartType, setChartType] = useState('RawPriceChart');

  const stockList = ['MSFT', 'IBM', 'SBUX', 'AAPL', 'GSPC'];

  return (
    <div>
      <h1>Developed for CPS*5745</h1>

      <select value={chartType} onChange={(e) => setChartType(event.target.value)}>
        <option value="RawPriceChart">Raw Price (line graph)</option>
        <option value="NormalizedReturnChart">Normalized Return (line graph)</option>
      </select>

      {stockList.map((s) => (
        <label>
          <input
            type="checkbox"
            value={s}
            checked={stock.includes(s)}
            onChange={() => setStock((prev) => prev.includes(s) 
              ? prev.filter((k) => k !== s)
              : [...prev, s])
            }  
          />
        {s}
        </label>
      ))}

      {
        chartType === "RawPriceChart" ? (
          <RawPriceChart
            data={data}
            stock={stock}
          />
        )
        : chartType === "NormalizedReturnChart" ? (
          <NormalizedReturnChart
            data={data}
            stock={stock}
          />
        )
        : (
          <></>
        )
      }

      <b>Analysis: </b>
      
      AAPL had the highest spike in returns by far over the recorded period of time, even though it started from the lowest initial stock price.
    </div>
  );
}