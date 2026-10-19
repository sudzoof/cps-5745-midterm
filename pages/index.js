import dynamic from 'next/dynamic';
import { parse } from 'csv-parse/sync';
import fs from 'fs';
import path from 'path';
import { useState } from 'react';

const Plotly = dynamic(
  () => import('plotly.js-dist-min'),
  { ssr: false }
);

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
  const [stock, setStock] = useState([]);

  const stockList = ['MSFT', 'IBM', 'SBUX', 'AAPL', 'GSPC'];

  return (
    <div>
      <h1>Developed for CPS*5745</h1>

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
      
    </div>
  );
}