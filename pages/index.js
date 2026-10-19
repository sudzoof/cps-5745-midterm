import dynamic from 'next/dynamic';
import { parse } from 'csv-parse/sync';
import fs from 'fs';
import path from 'path';

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
  return (
    <div>
      <h1>Developed for CPS*5745</h1>

      <ul>
        {data.map((row, i) => (
          <li key={i}>
            {JSON.stringify(row)}
          </li>
        ))}
      </ul>
    </div>
  );
}