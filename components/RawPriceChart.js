import dynamic from 'next/dynamic';
const Plot = dynamic(() => import('react-plotly.js'), {
  ssr: false,
  loading: () => <p>Loading chart...</p>,
});

export default function RawPriceChart({data, stock}) {
  const parsedData = stock.map(
    (s) => 
      ({
        x: data.map(r => r.Date),
        y: data.map(r => Number(r[s])),
        type: 'line',
        name: s,
      })
  );

  const layout = {
    xaxis: { title: { text: 'Day' }},
    yaxis: { title: { text: 'Value (USD)' }},
  }

  return (
    <Plot
      data={parsedData}
      layout={layout}
      style={{ width: '100%', height: '100%' }}
    />
  )

}