// import React, { useState, useEffect, useRef } from 'react';
// import Dygraph from 'dygraphs';

// const ThresholdAnalysis = ({ isVisible, onClose }) => {
//   const [criticalThreshold, setCriticalThreshold] = useState('');
//   const [warningThreshold, setWarningThreshold] = useState('');
//   const [normalThreshold, setNormalThreshold] = useState('');
//   const [fileData, setFileData] = useState([]);
//   const graphRef = useRef(null);
//   const containerRef = useRef(null);

//   const handleThresholdChange = (e, setThreshold) => {
//     setThreshold(e.target.value);
//   };

//   const handleFileUpload = (e) => {
//     const file = e.target.files[0];
//     const reader = new FileReader();
//     reader.onload = (event) => {
//       const text = event.target.result;
//       const parsedData = parseData(text);
//       setFileData(parsedData);
//     };
//     reader.readAsText(file);
//   };

//   const parseData = (text) => {
//     const rows = text.split('\n').filter((row) => row && !row.startsWith('#'));
//     return rows.map((row) => {
//       const [tension, torsion, bendingMomentX, bendingMomentY, time, temperature] = row.split(';').map(parseFloat);
//       return { tension, torsion, bendingMomentX, bendingMomentY, time, temperature };
//     });
//   };

//   const generateAveragedChartData = () => {
//     let normalSum = 0;
//     let warningSum = 0;
//     let criticalSum = 0;
//     const data = [];

//     fileData.forEach(({ tension, bendingMomentX, bendingMomentY }, index) => {
//       const maxValue = Math.max(tension, bendingMomentX, bendingMomentY);

//       if (maxValue >= parseFloat(criticalThreshold)) {
//         criticalSum += maxValue;
//       } else if (maxValue >= parseFloat(warningThreshold)) {
//         warningSum += maxValue;
//       } else if (maxValue >= parseFloat(normalThreshold)) {
//         normalSum += maxValue;
//       }

//       const normalAvg = normalSum / (index + 1);
//       const warningAvg = warningSum / (index + 1);
//       const criticalAvg = criticalSum / (index + 1);

//       data.push([index + 1, normalAvg, warningAvg, criticalAvg]);
//     });

//     return data;
//   };

//   const handlePlotGraph = () => {
//     const data = generateAveragedChartData();

//     new Dygraph(graphRef.current, data, {
//       labels: ['Data Point', 'Normal Avg', 'Warning Avg', 'Critical Avg'],
//       stackedGraph: true,
//       colors: ['green', 'yellow', 'red'],
//       drawGrid: true,
//       fillGraph: true,
//       strokeWidth: 0,
//       legend: 'always',
//       labelsDivStyles: { 'font-size': '14px' },
//       axes: {
//         x: { pixelsPerLabel: 60 },
//         y: { pixelsPerLabel: 30 },
//       },
//     });
//   };

//   const renderStaticGraph = () => {
//     const staticData = [[0, 0, 0, 0]];
//     new Dygraph(graphRef.current, staticData, {
//       labels: ['Data Point', 'Normal Avg', 'Warning Avg', 'Critical Avg'],
//       stackedGraph: true,
//       colors: ['green', 'yellow', 'red'],
//       drawGrid: true,
//       fillGraph: true,
//       strokeWidth: 0,
//       legend: 'always',
//       valueRange: [0, 100],
//       dateWindow: [0, 100],
//       axes: {
//         x: {
//           ticker: Dygraph.numericTicks,
//           pixelsPerLabel: 60,
//         },
//         y: {
//           ticker: Dygraph.numericTicks,
//           pixelsPerLabel: 30,
//         },
//       },
//       labelsDivStyles: { 'font-size': '14px' },
//     });
//   };

//   useEffect(() => {
//     if (fileData.length > 0) {
//       handlePlotGraph();
//     } else {
//       renderStaticGraph();
//     }
//   }, [fileData]);

//   useEffect(() => {
//     const handleResize = () => {
//       if (graphRef.current) {
//         graphRef.current.style.width = '100%';
//         graphRef.current.style.height = `${containerRef.current.clientHeight - 250}px`;
//       }
//     };

//     window.addEventListener('resize', handleResize);
//     handleResize();

//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   return isVisible ? (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4" onClick={onClose}>
//       <div
//         ref={containerRef}
//         className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col"
//         onClick={(e) => e.stopPropagation()}
//         style={{ width: '95%', height: '90%', maxWidth: '1200px', maxHeight: '800px' }}
//       >
//         <div className="p-4 bg-gray-100">
//           <h2 className="text-2xl font-bold mb-2">Threshold Analysis</h2>
//         </div>

//         <div className="flex-grow overflow-auto p-4">
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
//             <div>
//               <label className="block mb-2 text-sm font-medium">Critical Threshold:</label>
//               <input
//                 type="number"
//                 value={criticalThreshold}
//                 onChange={(e) => handleThresholdChange(e, setCriticalThreshold)}
//                 className="border rounded p-2 w-full"
//               />
//             </div>
//             <div>
//               <label className="block mb-2 text-sm font-medium">Warning Threshold:</label>
//               <input
//                 type="number"
//                 value={warningThreshold}
//                 onChange={(e) => handleThresholdChange(e, setWarningThreshold)}
//                 className="border rounded p-2 w-full"
//               />
//             </div>
//             <div>
//               <label className="block mb-2 text-sm font-medium">Normal Threshold:</label>
//               <input
//                 type="number"
//                 value={normalThreshold}
//                 onChange={(e) => handleThresholdChange(e, setNormalThreshold)}
//                 className="border rounded p-2 w-full"
//               />
//             </div>
//           </div>

//           <div className="mb-4">
//             <input type="file" onChange={handleFileUpload} accept=".txt" className="border rounded p-2 w-full" />
//           </div>

//           <div ref={graphRef} style={{ width: '100%', height: 'calc(100% - 180px)' }}></div>
//         </div>

//         <div className="p-4 bg-gray-100 flex justify-end">
//           <button onClick={onClose} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors">
//             Close
//           </button>
//         </div>
//       </div>
//     </div>
//   ) : null;
// };

// export default ThresholdAnalysis;



// import React, { useState, useEffect, useRef } from 'react';
// import Dygraph from 'dygraphs';

// const ThresholdAnalysis = ({ isVisible, onClose }) => {
//   const [criticalThreshold, setCriticalThreshold] = useState('');
//   const [warningThreshold, setWarningThreshold] = useState('');
//   const [normalThreshold, setNormalThreshold] = useState('');
//   const [fileData, setFileData] = useState([]);
//   const [selectedOption, setSelectedOption] = useState('tension');
//   const graphRef = useRef(null);
//   const containerRef = useRef(null);

//   const handleThresholdChange = (e, setThreshold) => {
//     setThreshold(e.target.value);
//   };

//   const handleOptionChange = (e) => {
//     setSelectedOption(e.target.value);
//   };

//   const handleFileUpload = (e) => {
//     const file = e.target.files[0];
//     const reader = new FileReader();
//     reader.onload = (event) => {
//       const text = event.target.result;
//       const parsedData = parseData(text);
//       setFileData(parsedData);
//     };
//     reader.readAsText(file);
//   };

//   const parseData = (text) => {
//     const rows = text.split('\n').filter((row) => row && !row.startsWith('#'));
//     return rows.map((row) => {
//       const [tension, torsion, bendingMomentX, bendingMomentY, time, temperature] = row.split(';').map(parseFloat);
//       return { tension, torsion, bendingMomentX, bendingMomentY, time, temperature };
//     });
//   };

//   const generateAveragedChartData = () => {
//     let normalSum = 0;
//     let warningSum = 0;
//     let criticalSum = 0;
//     const data = [];

//     fileData.forEach((item, index) => {
//       const value = item[selectedOption];

//       if (value >= parseFloat(criticalThreshold)) {
//         criticalSum += value;
//       } else if (value >= parseFloat(warningThreshold)) {
//         warningSum += value;
//       } else if (value >= parseFloat(normalThreshold)) {
//         normalSum += value;
//       }

//       const normalAvg = normalSum / (index + 1);
//       const warningAvg = warningSum / (index + 1);
//       const criticalAvg = criticalSum / (index + 1);

//       data.push([index + 1, normalAvg, warningAvg, criticalAvg]);
//     });

//     return data;
//   };

//   const handlePlotGraph = () => {
//     const data = generateAveragedChartData();

//     new Dygraph(graphRef.current, data, {
//       labels: ['Data Point', 'Normal Avg', 'Warning Avg', 'Critical Avg'],
//       stackedGraph: true,
//       colors: ['green', 'yellow', 'red'],
//       drawGrid: true,
//       fillGraph: true,
//       strokeWidth: 0,
//       legend: 'always',
//       labelsDivStyles: { 'font-size': '14px' },
//       axes: {
//         x: { pixelsPerLabel: 60 },
//         y: { pixelsPerLabel: 30 },
//       },
//       title: `Threshold Analysis for ${selectedOption}`,
//     });
//   };

//   const renderStaticGraph = () => {
//     const staticData = [[0, 0, 0, 0]];
//     new Dygraph(graphRef.current, staticData, {
//       labels: ['Data Point', 'Normal Avg', 'Warning Avg', 'Critical Avg'],
//       stackedGraph: true,
//       colors: ['green', 'yellow', 'red'],
//       drawGrid: true,
//       fillGraph: true,
//       strokeWidth: 0,
//       legend: 'always',
//       valueRange: [0, 100],
//       dateWindow: [0, 100],
//       axes: {
//         x: {
//           ticker: Dygraph.numericTicks,
//           pixelsPerLabel: 60,
//         },
//         y: {
//           ticker: Dygraph.numericTicks,
//           pixelsPerLabel: 30,
//         },
//       },
//       labelsDivStyles: { 'font-size': '14px' },
//       title: 'Threshold Analysis',
//     });
//   };

//   useEffect(() => {
//     if (fileData.length > 0) {
//       handlePlotGraph();
//     } else {
//       renderStaticGraph();
//     }
//   }, [fileData, selectedOption, criticalThreshold, warningThreshold, normalThreshold]);

//   useEffect(() => {
//     const handleResize = () => {
//       if (graphRef.current) {
//         graphRef.current.style.width = '100%';
//         graphRef.current.style.height = `${containerRef.current.clientHeight - 250}px`;
//       }
//     };

//     window.addEventListener('resize', handleResize);
//     handleResize();

//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   return isVisible ? (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4" onClick={onClose}>
//       <div
//         ref={containerRef}
//         className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col"
//         onClick={(e) => e.stopPropagation()}
//         style={{ width: '95%', height: '90%', maxWidth: '1200px', maxHeight: '800px' }}
//       >
//         <div className="p-4 bg-gray-100">
//           <h2 className="text-2xl font-bold mb-2">Threshold Analysis</h2>
//         </div>

//         <div className="flex-grow overflow-auto p-4">
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
//             <div>
//               <label className="block mb-2 text-sm font-medium">Critical Threshold:</label>
//               <input
//                 type="number"
//                 value={criticalThreshold}
//                 onChange={(e) => handleThresholdChange(e, setCriticalThreshold)}
//                 className="border rounded p-2 w-full"
//               />
//             </div>
//             <div>
//               <label className="block mb-2 text-sm font-medium">Warning Threshold:</label>
//               <input
//                 type="number"
//                 value={warningThreshold}
//                 onChange={(e) => handleThresholdChange(e, setWarningThreshold)}
//                 className="border rounded p-2 w-full"
//               />
//             </div>
//             <div>
//               <label className="block mb-2 text-sm font-medium">Normal Threshold:</label>
//               <input
//                 type="number"
//                 value={normalThreshold}
//                 onChange={(e) => handleThresholdChange(e, setNormalThreshold)}
//                 className="border rounded p-2 w-full"
//               />
//             </div>
//           </div>

//           <div className="mb-4">
//             <input type="file" onChange={handleFileUpload} accept=".txt" className="border rounded p-2 w-full" />
//           </div>

//           <div className="flex">
//             <div ref={graphRef} style={{ width: '80%', height: 'calc(100% - 180px)' }}></div>
//             <div className="ml-4" style={{ width: '20%' }}>
//               <table className="border-collapse border border-gray-400 w-full">
//                 <tbody>
//                   <tr>
//                     <td className="p-2 border-b border-gray-600 bg-white">
//                       <input type="radio" value="tension" checked={selectedOption === 'tension'} onChange={handleOptionChange} /> Tension
//                     </td>
//                   </tr>
//                   <tr>
//                     <td className="p-2 border-b border-gray-600 bg-white">
//                       <input type="radio" value="torsion" checked={selectedOption === 'torsion'} onChange={handleOptionChange} /> Torsion
//                     </td>
//                   </tr>
//                   <tr>
//                     <td className="p-2 border-b border-gray-600 bg-white">
//                       <input type="radio" value="bendingMomentX" checked={selectedOption === 'bendingMomentX'} onChange={handleOptionChange} /> Bending Moment X
//                     </td>
//                   </tr>
//                   <tr>
//                     <td className="p-2 border-b border-gray-600 bg-white">
//                       <input type="radio" value="bendingMomentY" checked={selectedOption === 'bendingMomentY'} onChange={handleOptionChange} /> Bending Moment Y
//                     </td>
//                   </tr>
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>

//         <div className="p-4 bg-gray-100 flex justify-end">
//           <button onClick={onClose} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors">
//             Close
//           </button>
//         </div>
//       </div>
//     </div>
//   ) : null;
// };

// export default ThresholdAnalysis;


import React, { useState, useEffect, useRef } from 'react';
import Dygraph from 'dygraphs';

const ThresholdAnalysis = ({ isVisible, onClose }) => {
  const [criticalThreshold, setCriticalThreshold] = useState('');
  const [warningThreshold, setWarningThreshold] = useState('');
  const [normalThreshold, setNormalThreshold] = useState('');
  const [fileData, setFileData] = useState([]);
  const [selectedOption, setSelectedOption] = useState('tension');
  const [isProcessing, setIsProcessing] = useState(false);
  const graphRef = useRef(null);
  const containerRef = useRef(null);

  const handleThresholdChange = (e, setThreshold) => {
    setThreshold(e.target.value);
  };

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target.result;
      const parsedData = parseData(text);
      setFileData(parsedData);
    };
    reader.readAsText(file);
  };

  const parseData = (text) => {
    const rows = text.split('\n').filter((row) => row && !row.startsWith('#'));
    return rows.map((row) => {
      const [tension, torsion, bendingMomentX, bendingMomentY, time, temperature] = row.split(';').map(parseFloat);
      return { tension, torsion, bendingMomentX, bendingMomentY, time, temperature };
    });
  };

  const generateAveragedChartData = () => {
    let normalSum = 0;
    let warningSum = 0;
    let criticalSum = 0;
    const data = [];

    fileData.forEach((item, index) => {
      const value = item[selectedOption];

      if (value >= parseFloat(criticalThreshold)) {
        criticalSum += value;
      } else if (value >= parseFloat(warningThreshold)) {
        warningSum += value;
      } else if (value >= parseFloat(normalThreshold)) {
        normalSum += value;
      }

      const normalAvg = normalSum / (index + 1);
      const warningAvg = warningSum / (index + 1);
      const criticalAvg = criticalSum / (index + 1);

      data.push([index + 1, normalAvg, warningAvg, criticalAvg]);
    });

    return data;
  };

  const handlePlotGraph = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const data = generateAveragedChartData();

      new Dygraph(graphRef.current, data, {
        labels: ['Data Point', 'Normal Avg', 'Warning Avg', 'Critical Avg'],
        stackedGraph: true,
        colors: ['green', 'yellow', 'red'],
        drawGrid: true,
        fillGraph: true,
        strokeWidth: 0,
        legend: 'always',
        labelsDivStyles: { 'font-size': '14px' },
        axes: {
          x: { pixelsPerLabel: 60 },
          y: { pixelsPerLabel: 30 },
        },
        title: `Threshold Analysis for ${selectedOption}`,
      });
      setIsProcessing(false);
    }, 0);
  };

  const renderStaticGraph = () => {
    const staticData = [[0, 0, 0, 0]];
    new Dygraph(graphRef.current, staticData, {
      labels: ['Data Point', 'Normal Avg', 'Warning Avg', 'Critical Avg'],
      stackedGraph: true,
      colors: ['green', 'yellow', 'red'],
      drawGrid: true,
      fillGraph: true,
      strokeWidth: 0,
      legend: 'always',
      valueRange: [0, 100],
      dateWindow: [0, 100],
      axes: {
        x: {
          ticker: Dygraph.numericTicks,
          pixelsPerLabel: 60,
        },
        y: {
          ticker: Dygraph.numericTicks,
          pixelsPerLabel: 30,
        },
      },
      labelsDivStyles: { 'font-size': '14px' },
      title: 'Threshold Analysis',
    });
  };

  useEffect(() => {
    if (fileData.length > 0) {
      handlePlotGraph();
    } else {
      renderStaticGraph();
    }
  }, [fileData, selectedOption, criticalThreshold, warningThreshold, normalThreshold]);

  useEffect(() => {
    const handleResize = () => {
      if (graphRef.current) {
        graphRef.current.style.width = '100%';
        graphRef.current.style.height = `${containerRef.current.clientHeight - 250}px`;
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isVisible ? (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4" onClick={onClose}>
      <div
        ref={containerRef}
        className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
        style={{ width: '95%', height: '90%', maxWidth: '1200px', maxHeight: '800px' }}
      >
        <div className="p-4 bg-gray-100">
          <h2 className="text-2xl font-bold mb-2">Threshold Analysis</h2>
        </div>

        <div className="flex-grow overflow-auto p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block mb-2 text-sm font-medium">Critical Threshold:</label>
              <input
                type="number"
                value={criticalThreshold}
                onChange={(e) => handleThresholdChange(e, setCriticalThreshold)}
                className="border rounded p-2 w-full"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium">Warning Threshold:</label>
              <input
                type="number"
                value={warningThreshold}
                onChange={(e) => handleThresholdChange(e, setWarningThreshold)}
                className="border rounded p-2 w-full"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium">Normal Threshold:</label>
              <input
                type="number"
                value={normalThreshold}
                onChange={(e) => handleThresholdChange(e, setNormalThreshold)}
                className="border rounded p-2 w-full"
              />
            </div>
          </div>

          <div className="mb-4">
            <input type="file" onChange={handleFileUpload} accept=".txt" className="border rounded p-2 w-full" />
          </div>

          <div className="flex">
            <div ref={graphRef} style={{ width: '80%', height: 'calc(100% - 180px)' }}></div>
            <div className="ml-4" style={{ width: '20%' }}>
              <table className="border-collapse border border-gray-400 w-full">
                <tbody>
                  <tr>
                    <td className="p-2 border-b border-gray-600 bg-white">
                      <input type="radio" value="tension" checked={selectedOption === 'tension'} onChange={handleOptionChange} /> Tension
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2 border-b border-gray-600 bg-white">
                      <input type="radio" value="torsion" checked={selectedOption === 'torsion'} onChange={handleOptionChange} /> Torsion
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2 border-b border-gray-600 bg-white">
                      <input type="radio" value="bendingMomentX" checked={selectedOption === 'bendingMomentX'} onChange={handleOptionChange} /> Bending Moment X
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2 border-b border-gray-600 bg-white">
                      <input type="radio" value="bendingMomentY" checked={selectedOption === 'bendingMomentY'} onChange={handleOptionChange} /> Bending Moment Y
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="p-4 bg-gray-100 flex justify-end">
          <button onClick={onClose} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors">
            Close
          </button>
        </div>
      </div>
      {isProcessing && (
        <div className="fixed bottom-2 right-4 bg-black text-white px-4 py-2 rounded shadow-lg flex items-center">
          <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
          Processing data...
        </div>
      )}
    </div>
  ) : null;
};

export default ThresholdAnalysis;