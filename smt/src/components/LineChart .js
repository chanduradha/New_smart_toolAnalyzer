import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';

const LineChart = ({ data }) => {
  const [chartData, setChartData] = useState(null);
  const [windowSize, setWindowSize] = useState(10); // Default window size
  const [calculationType, setCalculationType] = useState('average');
  const [isAveragingActive, setIsAveragingActive] = useState(false);

  function calculateRollingData(data, windowSize, calculationType) {
    const rollingData = {};
  
    // Calculate rolling statistics based on calculation type for each variable
    Object.keys(data).forEach(key => {
      if (key !== 'time') {
        const rollingStats = calculationType === 'average'
          ? calculateRollingAverage(data[key], windowSize)
          : calculateRollingMedian(data[key], windowSize);
        rollingData[`rolling${key.replace(/^\w/, c => c.toUpperCase())}`] = rollingStats;
      }
    });
  
    return rollingData;
  }
  
  function calculateRollingAverage(data, windowSize) {
    const rollingAverage = [];
  
    for (let i = 0; i < data.length; i++) {
      if (i < windowSize - 1) {
        rollingAverage.push(null);
      } else {
        const window = data.slice(i - windowSize + 1, i + 1);
        const average = window.reduce((acc, val) => acc + val, 0) / windowSize;
        rollingAverage.push(average);
      }
    }
  
    return rollingAverage;
  }
  
  function calculateRollingMedian(data, windowSize) {
    const rollingMedian = [];
  
    for (let i = 0; i < data.length; i++) {
      if (i < windowSize - 1) {
        // rollingMedian.push(null);
      } else {
        const window = data.slice(i - windowSize + 1, i + 1);
        const sortedWindow = window.slice().sort((a, b) => a - b); // Sort window data
        const mid = Math.floor(windowSize / 2); // Find middle index
  
        if (windowSize % 2 === 0) {
          // If even number of elements in window, take average of middle two elements
          const median = (sortedWindow[mid - 1] + sortedWindow[mid]) / 2;
          rollingMedian.push(median);
        } else {
          // If odd number of elements in window, take middle element
          rollingMedian.push(sortedWindow[mid]);
        }
      }
    }
  
    return rollingMedian;
  }
  
  useEffect(() => {
    if (typeof data !== 'string') return;
  
    const rows = data.split('\n').slice(28); // Skip metadata lines
    const chartData = {
      time: [],
      tension: [],
      torsion: [],
      bendingMomentX: [],
      bendingMomentY: [],
      temperature: [],
    };
  
    rows.forEach(row => {
      const columns = row.split(';');
      chartData.time.push(parseFloat(columns[4]));
      chartData.tension.push(parseFloat(columns[0]));
      chartData.torsion.push(parseFloat(columns[1]));
      chartData.bendingMomentX.push(parseFloat(columns[2]));
      chartData.bendingMomentY.push(parseFloat(columns[3]));
      chartData.temperature.push(parseFloat(columns[5]));
    });
  
    // Calculate rolling statistics based on selected calculation type
    const rollingData = calculateRollingData(chartData, windowSize, calculationType);
  
    // Update chart data with rolling statistics
    setChartData({
      ...chartData,
      ...rollingData,
    });
  }, [data, windowSize, calculationType]);

  const layout = {
    title: 'Tool Measurements',
   
    xaxis: {
      title: 'Time',
      domain: [0.14, 1],
    },
    yaxis: {
      title: 'Torsion',
      titlefont: { color: '#23b7e5' },
      tickfont: { color: '#23b7e5' },
      range: [0, chartData ? Math.max(...chartData.torsion) : 1],
    },
    yaxis2: {
      title: 'Tension',
      titlefont: { color: '#1b5e20' },
      tickfont: { color: '#1b5e20' },
      range: [0, chartData ? Math.max(...chartData.tension) : 1],
      anchor: 'free',
      overlaying: 'y',
      position: 0.05,
      side: 'left',
    },
    yaxis3: {
      title: 'Bending Moment',
      titlefont: { color: '#cc5500' },
      tickfont: { color: '#cc5500' },
      range: [0, chartData ? Math.max(...chartData.bendingMomentX, ...chartData.bendingMomentY) : 1],
      anchor: 'free',
      overlaying: 'y',
      position: 0.1,
      side: 'left',
    },
    yaxis4: {
      title: 'Temperature',
      titlefont: { color: '#ff0000' },
      tickfont: { color: '#ff0000' },
      range: [0, chartData ? Math.max(...chartData.temperature) : 1],
      anchor: 'x',
      overlaying: 'y',
      position: 0.95,
      side: 'right',
    },
  };

  if (!chartData) return null;

  const trace1 = {
    x: chartData.time,
    y: chartData.torsion,
    name: 'Torsion',
    type: 'scatter',
    yaxis: 'y',
    marker: {
      color: '#23b7e5',
    },
    line: {
        width: 1,
      },
  };

  const trace2 = {
    x: chartData.time,
    y: chartData.tension,
    name: 'Tension',
    type: 'scatter',
    yaxis: 'y2',
    marker: {
      color: '#1b5e20',
    },
    line: {
        width: 1,
      },
  };

  const trace3 = {
    x: chartData.time,
    y: chartData.bendingMomentX,
    name: 'Bending Moment X',
    type: 'line',
    yaxis: 'y3',
    marker: {
      color: '#cc5500',
    },
    line: {
        width: 1,
      },
  };

  const trace4 = {
    x: chartData.time,
    y: chartData.bendingMomentY,
    name: 'Bending Moment Y',
    type: 'line',
    yaxis: 'y3',
    marker: {
      color: '#ff00ff',
    },
    line: {
        width: 1,
      },
  };

  const trace5 = {
    x: chartData.time,
    y: chartData.temperature,
    name: 'Temperature',
    type: 'line',
    yaxis: 'y4',
    marker: {
      color: '#ff0000',
    },
    line: {
        width: 1,
      },
  };

  const rollingTraceTension = {
    x: chartData.time,
    y: isAveragingActive ? chartData.rollingTension : chartData.tension,
    name: 'Rolling Tension',
    type: 'scatter',
    yaxis: 'y2',
    marker: {
      color:'#1b5e20',
    },
    line: {
      width: 1,
    },
  };

  const rollingTraceTorsion = {
    x: chartData.time,
    y: isAveragingActive ? chartData.rollingTorsion : chartData.torsion,
    name: 'Rolling Torsion',
    type: 'scatter',
    yaxis: 'y',
    marker: {
      color:  '#23b7e5',
    },
    line: {
      width: 1,
    },
  };

  const rollingTraceBendingMomentX = {
    x: chartData.time,
    y: isAveragingActive ? chartData.rollingBendingMomentX : chartData.bendingMomentX,
    name: 'Rolling Bending Moment X',
    type: 'line',
    yaxis: 'y3',
    marker: {
      color: '#cc5500',
    },
    line: {
      width: 1,
    },
  };

  const rollingTraceBendingMomentY = {
    x: chartData.time,
    y: isAveragingActive ? chartData.rollingBendingMomentY : chartData.bendingMomentY,
    name: 'Rolling Bending Moment Y',
    type: 'line',
    yaxis: 'y3',
    marker: {
      color: '#ff00ff',
    },
    line: {
      width: 1,
    },
  };
//   const rollingTracetemperature = {
//     x: chartData.time,
//     y: isAveragingActive ? chartData.rollingTracetemperature : chartData.temperature,
//     name: 'Rolling temperature',
//     type: 'line',
//     yaxis: 'y4',
//     marker: {
//       color: '#ff00ff',
//     },
//     line: {
//       width: 1,
//     },
//   };

  return (
<div>
    <div>
        <label htmlFor="windowSize">Window Size:</label>
        <input
          type="number"
          id="windowSize"
          value={windowSize}
          onChange={e => setWindowSize(parseInt(e.target.value))}
        />
      </div>
      <div>
        <label htmlFor="calculationType">Calculation Type:</label>
        <select
          id="calculationType"
          value={calculationType}
          onChange={e => setCalculationType(e.target.value)}
        >
          <option value="average">Average</option>
          <option value="median">Median</option>
        </select>
      </div>
      <div>
        <label htmlFor="toggleAverage">Toggle Averaging:</label>
        <input
          type="checkbox"
          id="toggleAverage"
          checked={isAveragingActive}
          onChange={() => setIsAveragingActive(prevState => !prevState)}
        />
      </div>
      <Plot
      data={isAveragingActive ? 
        [
          rollingTraceTension,
          rollingTraceTorsion,
          rollingTraceBendingMomentX,
          rollingTraceBendingMomentY,
        //   rollingTracetemperature,
          
        ] : 
        [
          trace1, trace2, trace3, trace4, trace5
        ]}
      layout={layout}
      config={{ responsive: true }}
      style={{ width: '80%', height: '50%' }}
    />
    </div>


  );
};


export default LineChart;
