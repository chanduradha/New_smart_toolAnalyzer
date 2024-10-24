// import React from 'react';

// const ReportPopup = ({ isVisible, onClose, reportData }) => {
//   if (!isVisible) return null;

//   return (
//     <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
//       <h2 className="text-2xl font-bold mb-4">Report</h2>
//       {reportData ? (
//         <div className="grid grid-cols-2 gap-4">
//           {Object.entries(reportData).map(([key, value]) => (
//             <div key={key} className="mb-2">
//               <span className="font-semibold">{key}: </span>
//               <span>{value}</span>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p>No report data available.</p>
//       )}
//       <button
//         className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//         onClick={onClose}
//       >
//         Close
//       </button>
//     </div>
//   );
// };

// export default ReportPopup;

// import React from 'react';

// const ReportPopup = ({ isVisible, onClose, reportData }) => {
//   if (!isVisible) return null;

//   const fieldOrder = [
//     'date', 'operator', 'process', 'tool', 'material', 'tool gage',
//     'd', 'z', 'ap', 'ae', 'vc', 'n', 'f', 'vf', 'x', 'cooling', 'unit type', 'note'
//   ];

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//       <div className="bg-white p-6 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
//         <h2 className="text-2xl font-bold mb-4">Report Data</h2>
//         {reportData ? (
//           <div className="grid grid-cols-2 gap-4">
//             {fieldOrder.map(key => (
//               <div key={key} className="mb-2">
//                 <strong className="capitalize">{key.replace(/_/g, ' ')}:</strong> {reportData[key] || 'N/A'}
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p>No report data available.</p>
//         )}
//         <button
//           className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//           onClick={onClose}
//         >
//           Close
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ReportPopup;

// import React from 'react';

// const ReportPopup = ({ isVisible, onClose, reportData }) => {
//   if (!isVisible) return null;

//   const fieldOrder = [
//     'date', 'operator', 'process', 'tool', 'material', 'tool gage',
//     'd', 'z', 'ap', 'ae', 'vc', 'n', 'f', 'vf', 'x', 'cooling', 'unit type', 'note'
//   ];

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//       <div className="bg-white p-6 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
//         <h2 className="text-2xl font-bold mb-4">Report Data</h2>
//         {reportData ? (
//           <div className="grid grid-cols-2 gap-4">
//             {fieldOrder.map(key => (
//               <div key={key} className="mb-2">
//                 <strong className="capitalize">{key.replace(/_/g, ' ')}:</strong> {reportData[key] || 'N/A'}
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p>No report data available.</p>
//         )}
//         <button
//           className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//           onClick={onClose}
//         >
//           Close
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ReportPopup;



// import React from 'react';

// const ReportPopup = ({ isVisible, onClose, reportData }) => {
//   if (!isVisible) return null;

//   const fieldOrder = [
//     'date', 'operator', 'process', 'tool', 'material', 'tool gage',
//     'd', 'z', 'ap', 'ae', 'vc', 'n', 'f', 'vf', 'x', 'cooling', 'unit type', 'note'
//   ];

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//       <div className="bg-white p-6 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
//         <h2 className="text-2xl font-bold mb-4">Report Data</h2>
//         {reportData ? (
//           <div className="grid grid-cols-2 gap-4">
//             {fieldOrder.map(key => (
//               <div key={key} className="mb-2">
//                 <strong className="capitalize">{key.replace(/_/g, ' ')}:</strong> {reportData[key] || 'N/A'}
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p>No report data available.</p>
//         )}
//         <button
//           className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//           onClick={onClose}
//         >
//           Close
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ReportPopup;


//''''''''''correct code '''''''''''''''
// import React from 'react';

// const ReportPopup = ({ isVisible, onClose, reportData }) => {
//   if (!isVisible) return null;

//   const fieldOrder = [
//     'date', 'operator', 'process', 'tool', 'material', 'tool gage',
//     'd', 'z', 'ap', 'ae', 'vc', 'n', 'f', 'vf', 'x', 'cooling', 'unit type', 'note'
//   ];

//   const formatValue = (value) => {
//     if (value === '=' || value === '') return '-';
//     return value || 'N/A';
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//       <div className="bg-white p-6 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
//         <h2 className="text-2xl font-bold mb-4">Report Data</h2>
//         {reportData ? (
//           <div className="grid grid-cols-2 gap-4">
//             {fieldOrder.map(key => (
//               <div key={key} className="mb-2">
//                 <strong className="capitalize">{key.replace(/_/g, ' ')}:</strong> {formatValue(reportData[key])}
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p>No report data available.</p>
//         )}
//         <button
//           className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//           onClick={onClose}
//         >
//           Close
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ReportPopup;


// import React, { useState, useEffect, useRef } from 'react';
// import Plotly from 'plotly.js-dist';

// const ReportPopup = ({ isVisible, onClose, reportData }) => {
//   const [plotType, setPlotType] = useState('single');
//   const chartRefs = useRef([]);
//   const [debugInfo, setDebugInfo] = useState('');

//   useEffect(() => {
//     if (isVisible && reportData) {
//       generateCharts();
//     }
//   }, [isVisible, reportData, plotType]);

//   useEffect(() => {
//     // Clean up charts when component unmounts
//     return () => {
//       chartRefs.current.forEach(ref => {
//         if (ref) Plotly.purge(ref);
//       });
//     };
//   }, []);

//   const generateCharts = () => {
//     if (!reportData || !reportData.measurements) {
//       setDebugInfo('No report data or measurements available');
//       return;
//     }

//     const measurements = reportData.measurements;
//     const parameters = ['Tension', 'Torsion', 'Bending moment X', 'Bending moment Y', 'Temperature'];
//     const colors = ['blue', 'purple', 'green', 'orange', 'red'];

//     try {
//       // Clear existing charts
//       chartRefs.current.forEach(ref => {
//         if (ref) Plotly.purge(ref);
//       });
//       chartRefs.current = [];

//       if (plotType === 'single') {
//         parameters.forEach((param, index) => {
//           const chartDiv = document.createElement('div');
//           chartDiv.style.width = '100%';
//           chartDiv.style.height = '400px';
//           document.getElementById('charts-container').appendChild(chartDiv);
//           chartRefs.current.push(chartDiv);

//           const data = [{
//             x: measurements.map(row => row.Time),
//             y: measurements.map(row => row[param]),
//             type: 'scatter',
//             mode: 'lines',
//             name: param,
//             line: { color: colors[index] }
//           }];

//           const layout = {
//             title: param,
//             xaxis: { title: 'Time (s)' },
//             yaxis: { title: param }
//           };

//           Plotly.newPlot(chartDiv, data, layout);
//         });
//         setDebugInfo(`Generated ${parameters.length} single charts`);
//       } else {
//         const chartDiv = document.createElement('div');
//         chartDiv.style.width = '100%';
//         chartDiv.style.height = '600px';
//         document.getElementById('charts-container').appendChild(chartDiv);
//         chartRefs.current.push(chartDiv);

//         const data = parameters.map((param, index) => ({
//           x: measurements.map(row => row.Time),
//           y: measurements.map(row => row[param]),
//           type: 'scatter',
//           mode: 'lines',
//           name: param,
//           line: { color: colors[index] },
//           yaxis: `y${index + 1}`
//         }));

//         const layout = {
//           title: 'All Parameters',
//           xaxis: { title: 'Time (s)' },
//           yaxis: { title: 'Tension' },
//           yaxis2: { title: 'Torsion', overlaying: 'y', side: 'right' },
//           yaxis3: { title: 'Bending moment X', overlaying: 'y', side: 'left', position: 0.05 },
//           yaxis4: { title: 'Bending moment Y', overlaying: 'y', side: 'right', position: 0.95 },
//           yaxis5: { title: 'Temperature', overlaying: 'y', side: 'right', position: 1.0 },
//           legend: { orientation: 'h', y: -0.2 },
//           height: 600
//         };

//         Plotly.newPlot(chartDiv, data, layout);
//         setDebugInfo('Generated 1 multiple chart');
//       }
//     } catch (error) {
//       setDebugInfo(`Error generating charts: ${error.message}`);
//     }
//   };

//   const fieldOrder = [
//     'date', 'operator', 'process', 'tool', 'material', 'tool gage',
//     'd', 'z', 'ap', 'ae', 'vc', 'n', 'f', 'vf', 'x', 'cooling', 'unit type', 'note'
//   ];

//   const formatValue = (value) => {
//     if (value === '=' || value === '') return '-';
//     return value || 'N/A';
//   };

//   if (!isVisible) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//       <div className="bg-white p-6 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
//         <h2 className="text-2xl font-bold mb-4">Report Data</h2>
//         {reportData ? (
//           <>
//             <div className="grid grid-cols-2 gap-4 mb-4">
//               {fieldOrder.map(key => (
//                 <div key={key} className="mb-2">
//                   <strong className="capitalize">{key.replace(/_/g, ' ')}:</strong> {formatValue(reportData[key])}
//                 </div>
//               ))}
//             </div>
//             <div className="mb-4">
//               <label className="mr-4">
//                 <input
//                   type="radio"
//                   value="single"
//                   checked={plotType === 'single'}
//                   onChange={() => setPlotType('single')}
//                   className="mr-2"
//                 />
//                 Single Plot
//               </label>
//               <label>
//                 <input
//                   type="radio"
//                   value="multiple"
//                   checked={plotType === 'multiple'}
//                   onChange={() => setPlotType('multiple')}
//                   className="mr-2"
//                 />
//                 Multiple Plot
//               </label>
//             </div>
//             <div id="charts-container" className="charts-container"></div>
//             <div className="mt-4 p-2 bg-gray-100 rounded">
//               <strong>Debug Info:</strong> {debugInfo}
//             </div>
//           </>
//         ) : (
//           <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4" role="alert">
//             <p className="font-bold">No Data Available</p>
//             <p>There is no report data available to display.</p>
//           </div>
//         )}
//         <button
//           className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//           onClick={onClose}
//         >
//           Close
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ReportPopup;
//''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
// import React, { useState, useEffect, useRef } from 'react';
// import Plotly from 'plotly.js-dist';
// import { jsPDF } from "jspdf";
// import "jspdf-autotable";
// import { Document, Packer, Paragraph, Table, TableCell, TableRow } from "docx";
// import { saveAs } from "file-saver";

// const ReportPopup = ({ isVisible, onClose, reportData, fileData }) => {
//   const [editableData, setEditableData] = useState({});
//   const [statistics, setStatistics] = useState({});
//   const chartRef = useRef(null);

//   useEffect(() => {
//     if (isVisible && reportData) {
//       setEditableData(reportData);
//       calculateStatistics();
//       generateChart();
//     }
//   }, [isVisible, reportData, fileData]);

//   const calculateStatistics = () => {
//     if (!fileData || !fileData.measurements) return;

//     const stats = {};
//     const parameters = ['Tension', 'Torsion', 'Bending moment X', 'Bending moment Y', 'Temperature'];

//     parameters.forEach(param => {
//       const values = fileData.measurements.map(m => m[param]);
//       stats[param] = {
//         min: Math.min(...values),
//         max: Math.max(...values),
//         mean: values.reduce((sum, val) => sum + val, 0) / values.length,
//         slope: calculateSlope(fileData.measurements.map(m => m.Time), values)
//       };
//     });

//     setStatistics(stats);
//   };

//   const calculateSlope = (x, y) => {
//     const n = x.length;
//     const sumX = x.reduce((a, b) => a + b, 0);
//     const sumY = y.reduce((a, b) => a + b, 0);
//     const sumXY = x.reduce((sum, xi, i) => sum + xi * y[i], 0);
//     const sumXX = x.reduce((sum, xi) => sum + xi * xi, 0);

//     return (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
//   };

//   const generateChart = () => {
//     if (!fileData || !fileData.measurements) return;

//     const parameters = ['Tension', 'Torsion', 'Bending moment X', 'Bending moment Y', 'Temperature'];
//     const colors = ['blue', 'red', 'green', 'orange', 'purple'];

//     const data = parameters.map((param, index) => ({
//       x: fileData.measurements.map(m => m.Time),
//       y: fileData.measurements.map(m => m[param]),
//       type: 'scatter',
//       mode: 'lines',
//       name: param,
//       line: { color: colors[index] }
//     }));

//     const layout = {
//       title: 'Measurement Data',
//       xaxis: { title: 'Time (s)' },
//       yaxis: { title: 'Values' },
//       height: 500,
//       width: 700
//     };

//     Plotly.newPlot(chartRef.current, data, layout);
//   };

//   const handleInputChange = (key, value) => {
//     setEditableData(prev => ({ ...prev, [key]: value }));
//   };

//   const generatePDF = () => {
//     const doc = new jsPDF();

//     // Add title
//     doc.setFontSize(18);
//     doc.text("Measurement Report", 105, 15, null, null, "center");

//     // Add editable data
//     doc.setFontSize(12);
//     let yPos = 30;
//     Object.entries(editableData).forEach(([key, value]) => {
//       doc.text(`${key}: ${value}`, 20, yPos);
//       yPos += 10;
//     });

//     // Add statistics table
//     doc.autoTable({
//       head: [['Parameter', 'Min', 'Max', 'Mean', 'Slope']],
//       body: Object.entries(statistics).map(([param, stats]) => [
//         param,
//         stats.min.toFixed(2),
//         stats.max.toFixed(2),
//         stats.mean.toFixed(2),
//         stats.slope.toExponential(2)
//       ]),
//       startY: yPos + 10
//     });

//     // Add chart
//     const chartImg = chartRef.current.toDataURL('image/png');
//     doc.addPage();
//     doc.addImage(chartImg, 'PNG', 10, 10, 190, 140);

//     doc.save("measurement_report.pdf");
//   };

//   const generateWord = async () => {
//     const doc = new Document({
//       sections: [{
//         properties: {},
//         children: [
//           new Paragraph("Measurement Report"),
//           ...Object.entries(editableData).map(([key, value]) => 
//             new Paragraph(`${key}: ${value}`)
//           ),
//           new Table({
//             rows: [
//               new TableRow({
//                 children: ['Parameter', 'Min', 'Max', 'Mean', 'Slope'].map(text => 
//                   new TableCell({ children: [new Paragraph(text)] })
//                 )
//               }),
//               ...Object.entries(statistics).map(([param, stats]) => 
//                 new TableRow({
//                   children: [
//                     param,
//                     stats.min.toFixed(2),
//                     stats.max.toFixed(2),
//                     stats.mean.toFixed(2),
//                     stats.slope.toExponential(2)
//                   ].map(text => new TableCell({ children: [new Paragraph(text)] }))
//                 })
//               )
//             ]
//           }),
//           new Paragraph("Chart is not included in Word document due to limitations.")
//         ]
//       }]
//     });

//     const blob = await Packer.toBlob(doc);
//     saveAs(blob, "measurement_report.docx");
//   };

//   if (!isVisible) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//       <div className="bg-white p-6 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
//         <h2 className="text-2xl font-bold mb-4">Report Data</h2>
//         <div className="grid grid-cols-2 gap-4 mb-4">
//           {Object.entries(editableData).map(([key, value]) => (
//             <div key={key} className="mb-2">
//               <label className="block text-sm font-medium text-gray-700">{key}</label>
//               <input
//                 type="text"
//                 value={value}
//                 onChange={(e) => handleInputChange(key, e.target.value)}
//                 className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//               />
//             </div>
//           ))}
//         </div>
//         <div className="mb-4">
//           <h3 className="text-lg font-semibold mb-2">Statistics</h3>
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th>Parameter</th>
//                 <th>Min</th>
//                 <th>Max</th>
//                 <th>Mean</th>
//                 <th>Slope</th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {Object.entries(statistics).map(([param, stats]) => (
//                 <tr key={param}>
//                   <td>{param}</td>
//                   <td>{stats.min.toFixed(2)}</td>
//                   <td>{stats.max.toFixed(2)}</td>
//                   <td>{stats.mean.toFixed(2)}</td>
//                   <td>{stats.slope.toExponential(2)}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//         <div ref={chartRef} className="mb-4"></div>
//         <div className="flex justify-between">
//           <button
//             className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//             onClick={generatePDF}
//           >
//             Generate PDF
//           </button>
//           <button
//             className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
//             onClick={generateWord}
//           >
//             Generate Word
//           </button>
//           <button
//             className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
//             onClick={onClose}
//           >
//             Close
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ReportPopup;

// import React, { useState, useEffect, useRef } from 'react';
// import Plotly from 'plotly.js-dist';
// import { jsPDF } from "jspdf";
// import "jspdf-autotable";
// import { Document, Packer, Paragraph, Table, TableCell, TableRow } from "docx";
// import { saveAs } from "file-saver";

// const ReportPopup = ({ isVisible, onClose, reportData, fileData }) => {
//   const [editableData, setEditableData] = useState({});
//   const [calculatedValues, setCalculatedValues] = useState({});
//   const [isCalculating, setIsCalculating] = useState(false);
//   const [error, setError] = useState(null);
//   const chartRef = useRef(null);

//   useEffect(() => {
//     if (isVisible && reportData) {
//       const filteredData = Object.fromEntries(
//         Object.entries(reportData).filter(([key]) => ![
//           'btkablue version', 'read version', 'sw-version', 'sn-nr.',
//           'cal tension', 'cal torsion', 'cal bending moment x',
//           'cal bending moment y', 'lever arm', 'spike position',
//           'autobm', 'triggerchannel', '##'
//         ].includes(key))
//       );
//       setEditableData(filteredData);
//       calculateValues();
//       generateChart();
//     }
//   }, [isVisible, reportData, fileData]);

//   const calculateValues = () => {
//     if (!fileData || !fileData.measurements) return;

//     setIsCalculating(true);
//     setError(null);

//     const processChunk = (chunkStart, chunkEnd) => {
//       return new Promise((resolve) => {
//         setTimeout(() => {
//           const chunkData = fileData.measurements.slice(chunkStart, chunkEnd);
//           const chunkResults = {};

//           ['Tension', 'Torsion', 'Bending moment X', 'Bending moment Y', 'Temperature'].forEach(property => {
//             const values = chunkData.map(item => item[property]).filter(value => !isNaN(value));
//             chunkResults[property] = {
//               max: values.length ? Math.max(...values) : -Infinity,
//               min: values.length ? Math.min(...values) : Infinity,
//               sum: values.reduce((acc, curr) => acc + curr, 0),
//               count: values.length
//             };
//           });

//           resolve(chunkResults);
//         }, 0);
//       });
//     };

//     const chunkSize = 10000;
//     const chunks = [];

//     for (let i = 0; i < fileData.measurements.length; i += chunkSize) {
//       chunks.push(processChunk(i, Math.min(i + chunkSize, fileData.measurements.length)));
//     }

//     Promise.all(chunks)
//       .then(results => {
//         const finalResults = {};
//         ['Tension', 'Torsion', 'Bending moment X', 'Bending moment Y', 'Temperature'].forEach(property => {
//           const propertyResults = results.map(chunk => chunk[property]);
//           const max = Math.max(...propertyResults.map(r => r.max));
//           const min = Math.min(...propertyResults.map(r => r.min));
//           const sum = propertyResults.reduce((acc, curr) => acc + curr.sum, 0);
//           const count = propertyResults.reduce((acc, curr) => acc + curr.count, 0);
//           const mean = count > 0 ? sum / count : 0;

//           const firstValue = fileData.measurements[0][property];
//           const lastValue = fileData.measurements[fileData.measurements.length - 1][property];
//           const slope = (lastValue - firstValue) / (fileData.measurements[fileData.measurements.length - 1].Time - fileData.measurements[0].Time);

//           finalResults[property] = {
//             max: max.toFixed(6),
//             min: min.toFixed(6),
//             mean: mean.toFixed(9),
//             slope: slope.toExponential(2)
//           };
//         });

//         setCalculatedValues(finalResults);
//         setIsCalculating(false);
//       })
//       .catch(error => {
//         console.error("Error in calculateValues:", error);
//         setError("An error occurred while calculating values. Please try again.");
//         setIsCalculating(false);
//       });
//   };

//   const generateChart = () => {
//     if (!fileData || !fileData.measurements || !chartRef.current) return;

//     const parameters = ['Tension', 'Torsion', 'Bending moment X', 'Bending moment Y', 'Temperature'];
//     const colors = ['blue', 'red', 'green', 'orange', 'purple'];

//     const data = parameters.map((param, index) => ({
//       x: fileData.measurements.map(m => m.Time),
//       y: fileData.measurements.map(m => m[param]),
//       type: 'scatter',
//       mode: 'lines',
//       name: param,
//       line: { color: colors[index] }
//     }));

//     const layout = {
//       title: 'Measurement Data',
//       xaxis: { title: 'Time (s)' },
//       yaxis: { title: 'Values' },
//       height: 500,
//       width: 700
//     };

//     Plotly.newPlot(chartRef.current, data, layout);
//   };

//   const handleInputChange = (key, value) => {
//     setEditableData(prev => ({ ...prev, [key]: value }));
//   };

//   const generatePDF = () => {
//     const doc = new jsPDF();

//     doc.setFontSize(18);
//     doc.text("Measurement Report", 105, 15, null, null, "center");

//     doc.setFontSize(12);
//     let yPos = 30;
//     Object.entries(editableData).forEach(([key, value]) => {
//       doc.text(`${key}: ${value}`, 20, yPos);
//       yPos += 10;
//     });

//     doc.autoTable({
//       head: [['Parameter', 'Min', 'Max', 'Mean', 'Slope']],
//       body: Object.entries(calculatedValues).map(([param, stats]) => [
//         param,
//         stats.min,
//         stats.max,
//         stats.mean,
//         stats.slope
//       ]),
//       startY: yPos + 10
//     });

//     if (chartRef.current) {
//       Plotly.toImage(chartRef.current, {format: 'png', width: 800, height: 600}).then(function(dataUrl) {
//         doc.addPage();
//         doc.addImage(dataUrl, 'PNG', 10, 10, 190, 140);
//         doc.save("measurement_report.pdf");
//       });
//     } else {
//       doc.save("measurement_report.pdf");
//     }
//   };

//   const generateWord = async () => {
//     const doc = new Document({
//       sections: [{
//         properties: {},
//         children: [
//           new Paragraph("Measurement Report"),
//           ...Object.entries(editableData).map(([key, value]) => 
//             new Paragraph(`${key}: ${value}`)
//           ),
//           new Table({
//             rows: [
//               new TableRow({
//                 children: ['Parameter', 'Min', 'Max', 'Mean', 'Slope'].map(text => 
//                   new TableCell({ children: [new Paragraph(text)] })
//                 )
//               }),
//               ...Object.entries(calculatedValues).map(([param, stats]) => 
//                 new TableRow({
//                   children: [
//                     param,
//                     stats.min,
//                     stats.max,
//                     stats.mean,
//                     stats.slope
//                   ].map(text => new TableCell({ children: [new Paragraph(text)] }))
//                 })
//               )
//             ]
//           }),
//           new Paragraph("Chart is not included in Word document due to limitations.")
//         ]
//       }]
//     });

//     const blob = await Packer.toBlob(doc);
//     saveAs(blob, "measurement_report.docx");
//   };

//   if (!isVisible) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//       <div className="bg-white p-6 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
//         <h2 className="text-2xl font-bold mb-4">Report Generation</h2>
//         <div className="grid grid-cols-2 gap-4 mb-4">
//           {Object.entries(editableData).map(([key, value]) => (
//             <div key={key} className="mb-2">
//               <label className="block text-sm font-medium text-gray-700">{key}</label>
//               <input
//                 type="text"
//                 value={value}
//                 onChange={(e) => handleInputChange(key, e.target.value)}
//                 className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//               />
//             </div>
//           ))}
//         </div>
//         <div className="mb-4">
//           <h3 className="text-lg font-semibold mb-2">Calculated Values</h3>
//           {isCalculating ? (
//             <p>Calculating...</p>
//           ) : error ? (
//             <p className="text-red-500">{error}</p>
//           ) : (
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Parameter</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Min</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Max</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mean</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Slope</th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {Object.entries(calculatedValues).map(([param, stats]) => (
//                   <tr key={param}>
//                     <td className="px-6 py-4 whitespace-nowrap">{param}</td>
//                     <td className="px-6 py-4 whitespace-nowrap">{stats.min}</td>
//                     <td className="px-6 py-4 whitespace-nowrap">{stats.max}</td>
//                     <td className="px-6 py-4 whitespace-nowrap">{stats.mean}</td>
//                     <td className="px-6 py-4 whitespace-nowrap">{stats.slope}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}
//         </div>
//         <div ref={chartRef} className="mb-4"></div>
//         <div className="flex justify-between">
//           <button
//             className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//             onClick={generatePDF}
//           >
//             Generate PDF
//           </button>
//           <button
//             className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
//             onClick={generateWord}
//           >
//             Generate Word
//           </button>
//           <button
//             className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
//             onClick={onClose}
//           >
//             Close
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ReportPopup;

//graph plot report code below
// import React, { useState, useEffect, useRef } from 'react';
// import Plotly from 'plotly.js-dist';

// const ReportPopup = ({ isVisible, onClose, reportData, fileData }) => {
//   const [editableData, setEditableData] = useState({});
//   const [calculatedValues, setCalculatedValues] = useState({});
//   const [isCalculating, setIsCalculating] = useState(false);
//   const [error, setError] = useState(null);
//   const [plotType, setPlotType] = useState('multiple');
//   const chartRef = useRef(null);

//   useEffect(() => {
//     if (isVisible && reportData) {
//       setEditableData(reportData);
//       calculateValues();
//     }
//   }, [isVisible, reportData, fileData]);

//   useEffect(() => {
//     if (isVisible && fileData && fileData.length > 0) {
//       generateChart();
//     }
//   }, [isVisible, fileData, plotType]);

//   const calculateValues = () => {
//     if (!fileData || fileData.length === 0) {
//       setError("No measurement data available");
//       return;
//     }

//     setIsCalculating(true);
//     setError(null);

//     try {
//       const results = {};
//       ['Tension', 'Torsion', 'Bending moment X', 'Bending moment Y', 'Temperature'].forEach(property => {
//         const values = fileData.map(item => parseFloat(item[property])).filter(value => !isNaN(value));
//         const max = Math.max(...values);
//         const min = Math.min(...values);
//         const mean = values.reduce((sum, val) => sum + val, 0) / values.length;
//         const firstValue = values[0];
//         const lastValue = values[values.length - 1];
//         const slope = (lastValue - firstValue) / (fileData.length - 1);

//         results[property] = {
//           max: max.toFixed(6),
//           min: min.toFixed(6),
//           mean: mean.toFixed(9),
//           slope: slope.toExponential(2)
//         };
//       });

//       setCalculatedValues(results);
//     } catch (err) {
//       console.error("Error in calculateValues:", err);
//       setError("An error occurred while calculating values. Please check the data format.");
//     } finally {
//       setIsCalculating(false);
//     }
//   };

//   const generateChart = () => {
//     if (!fileData || fileData.length === 0 || !chartRef.current) return;

//     const parameters = ['Tension', 'Torsion', 'Bending moment X', 'Bending moment Y', 'Temperature'];
//     const colors = ['blue', 'red', 'green', 'orange', 'purple'];

//     if (plotType === 'multiple') {
//       const data = parameters.map((param, index) => ({
//         x: fileData.map(m => m.Time),
//         y: fileData.map(m => m[param]),
//         type: 'scatter',
//         mode: 'lines',
//         name: param,
//         line: { color: colors[index] }
//       }));

//       const layout = {
//         title: 'Measurement Data',
//         xaxis: { title: 'Time (s)' },
//         yaxis: { title: 'Values' },
//         height: 500,
//         width: 700
//       };

//       Plotly.newPlot(chartRef.current, data, layout);
//     } else {
//       const plots = parameters.map((param, index) => {
//         return {
//           data: [{
//             x: fileData.map(m => m.Time),
//             y: fileData.map(m => m[param]),
//             type: 'scatter',
//             mode: 'lines',
//             line: { color: colors[index] }
//           }],
//           layout: {
//             title: param,
//             xaxis: { title: 'Time (s)' },
//             yaxis: { title: param },
//             height: 300,
//             width: 700
//           }
//         };
//       });

//       Plotly.newPlot(chartRef.current, plots.flatMap(p => p.data), {
//         grid: {rows: 5, columns: 1, pattern: 'independent'},
//         height: 1500,
//         width: 700
//       });
//     }
//   };

//   const handleInputChange = (key, value) => {
//     setEditableData(prev => ({ ...prev, [key]: value }));
//   };

//   if (!isVisible) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//       <div className="bg-white p-6 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
//         <h2 className="text-2xl font-bold mb-4">Report Generation</h2>
//         <div className="grid grid-cols-2 gap-4 mb-4">
//           {Object.entries(editableData).map(([key, value]) => (
//             <div key={key} className="mb-2">
//               <label className="block text-sm font-medium text-gray-700">{key}</label>
//               <input
//                 type="text"
//                 value={value}
//                 onChange={(e) => handleInputChange(key, e.target.value)}
//                 className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//               />
//             </div>
//           ))}
//         </div>
//         <div className="mb-4">
//           <h3 className="text-lg font-semibold mb-2 bg-blue-500 text-white p-2">Calculated Values</h3>
//           {isCalculating ? (
//             <p>Calculating...</p>
//           ) : error ? (
//             <p className="text-red-500">{error}</p>
//           ) : (
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Parameter</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Min</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Max</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mean</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Slope</th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {Object.entries(calculatedValues).map(([param, stats]) => (
//                   <tr key={param}>
//                     <td className="px-6 py-4 whitespace-nowrap">{param}</td>
//                     <td className="px-6 py-4 whitespace-nowrap">{stats.min}</td>
//                     <td className="px-6 py-4 whitespace-nowrap">{stats.max}</td>
//                     <td className="px-6 py-4 whitespace-nowrap">{stats.mean}</td>
//                     <td className="px-6 py-4 whitespace-nowrap">{stats.slope}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}
//         </div>
//         <div className="mb-4">
//           <label className="inline-flex items-center">
//             <input
//               type="radio"
//               className="form-radio"
//               name="plotType"
//               value="single"
//               checked={plotType === 'single'}
//               onChange={() => setPlotType('single')}
//             />
//             <span className="ml-2">Single Plot</span>
//           </label>
//           <label className="inline-flex items-center ml-6">
//             <input
//               type="radio"
//               className="form-radio"
//               name="plotType"
//               value="multiple"
//               checked={plotType === 'multiple'}
//               onChange={() => setPlotType('multiple')}
//             />
//             <span className="ml-2">Multiple Plot</span>
//           </label>
//         </div>
//         <div ref={chartRef} className="mb-4"></div>
//         <div className="flex justify-end">
//           <button
//             className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
//             onClick={onClose}
//           >
//             Close
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ReportPopup;


//''''''''''''''''''''below is final code ''''''''''''''''''''''//
// import React, { useState, useEffect, useRef } from 'react';
// import Plotly from 'plotly.js-dist';
// import { jsPDF } from 'jspdf';
// import 'jspdf-autotable';



// const CHUNK_SIZE = 1000; // Adjust this value based on your performance needs
// const ReportPopup = ({ isVisible, onClose, reportData, fileData }) => {
//   const [editableData, setEditableData] = useState({});
//   const [calculatedValues, setCalculatedValues] = useState({});
//   const [isCalculating, setIsCalculating] = useState(false);
//   const [error, setError] = useState(null);
//   const [plotType, setPlotType] = useState('multiple');
//   const chartRef = useRef(null);
//   const [progress, setProgress] = useState(0);


//   useEffect(() => {
//     if (isVisible && reportData) {
//       setEditableData(reportData);
//     }
//   }, [isVisible, reportData]);

//   const processChunk = (chunk, property, accumulator) => {
//     return chunk.reduce((acc, item) => {
//       const value = parseFloat(item[property]);
//       if (!isNaN(value)) {
//         acc.sum += value;
//         acc.count++;
//         acc.min = Math.min(acc.min, value);
//         acc.max = Math.max(acc.max, value);
//         acc.values.push(value);
//       }
//       return acc;
//     }, accumulator);
//   };

//   const finalizeCalculations = (property, accumulator, totalCount) => {
//     const { sum, count, min, max, values } = accumulator;
//     const mean = count > 0 ? sum / count : 0;
//     // const slope = count > 1 ? (values[count - 1] - values[0]) / (count - 1) : 0;

//     return {
//       min: min.toFixed(6),
//       max: max.toFixed(6),
//       mean: mean.toFixed(9),
//       validCount: count,
//       totalCount
//     };
//   };

//   const calculateValues = async () => {
//     if (!fileData || fileData.length === 0) {
//       setError("No measurement data available");
//       return;
//     }

//     setIsCalculating(true);
//     setError(null);
//     setProgress(0);

//     const properties = ['Tension', 'Torsion', 'Bending moment X', 'Bending moment Y', 'Temperature'];
//     const results = {};
//     const totalChunks = Math.ceil(fileData.length / CHUNK_SIZE);

//     try {
//       for (let i = 0; i < totalChunks; i++) {
//         const chunk = fileData.slice(i * CHUNK_SIZE, (i + 1) * CHUNK_SIZE);

//         for (const property of properties) {
//           if (!results[property]) {
//             results[property] = { sum: 0, count: 0, min: Infinity, max: -Infinity, values: [] };
//           }
//           results[property] = processChunk(chunk, property, results[property]);
//         }

//         setProgress(((i + 1) / totalChunks) * 100);
        
//         // Allow UI to update
//         await new Promise(resolve => setTimeout(resolve, 0));
//       }

//       const finalResults = {};
//       for (const property of properties) {
//         finalResults[property] = finalizeCalculations(property, results[property], fileData.length);
//       }

//       setCalculatedValues(finalResults);
//       console.log("Data summary:", Object.entries(finalResults).map(([key, value]) => 
//         `${key}: ${value.validCount}/${value.totalCount} valid values`
//       ).join(', '));

//     } catch (err) {
//       console.error("Error in calculateValues:", err);
//       setError(`An error occurred while calculating values: ${err.message}`);
//     } finally {
//       setIsCalculating(false);
//       setProgress(100);
//     }
//   };
 
  
//   const generateChart = () => {
//     if (!fileData || fileData.length === 0 || !chartRef.current) return;
  
//     const parameters = ['Temperature', 'Bending moment Y', 'Bending moment X', 'Torsion', 'Tension'];
//     const colors = ['#ff0000', '#FFA500', '#006400', '#800080', '#000080'];
  
//     // Format time for x-axis
//     const formatTime = (seconds) => {
//       if (isNaN(seconds) || seconds < 0) return "00:00:00.000";
//       const hours = Math.floor(seconds / 3600);
//       const minutes = Math.floor((seconds % 3600) / 60);
//       const secs = Math.floor(seconds % 60);
//       const millisecs = Math.floor((seconds % 1) * 1000);
//       return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}.${millisecs.toString().padStart(3, '0')}`;
//     };
  
//     const xValues = fileData.map(m => formatTime(m.Time));
  
//     if (plotType === 'multiple') {
//       const data = parameters.map((param, index) => ({
//         x: xValues,
//         y: fileData.map(m => m[param]),
//         type: 'scatter',
//         mode: 'lines',
//         name: param,
//         line: { color: colors[index], width: param === 'Tension' ? 2 : 1 },
//         opacity: param === 'Tension' ? 1 : 0.7,
//         yaxis: param === 'Temperature' ? 'y5' : 
//                (param.includes('Bending moment') ? 'y1' : 
//                (param === 'Torsion' ? 'y3' : 'y4')),
//       }));
  
//       const layout = {
//         title: 'Measurement Data',
//         xaxis: { 
//           title: 'Time', 
//           domain: [0.1, 0.9],
//           tickmode: 'array',
//           tickvals: xValues.filter((_, i) => i % Math.floor(xValues.length / 10) === 0),
//           ticktext: xValues.filter((_, i) => i % Math.floor(xValues.length / 10) === 0)
//         },
//         yaxis: { title: 'Bending moment[Nm]', titlefont: { color: colors[1] }, tickfont: { color: colors[1] }, side: 'left', position: 0 },
//         yaxis2: { title: 'Bending moment X[Nm]', titlefont: { color: colors[2] }, tickfont: { color: colors[2] }, overlaying: 'y', side: 'left', showticklabels: false },
//         yaxis3: { title: 'Torsion [Nm]', titlefont: { color: colors[3] }, tickfont: { color: colors[3] }, overlaying: 'y', side: 'left', position: 0.05 },
//         yaxis4: { title: 'Tension [Nm]', titlefont: { color: colors[4] }, tickfont: { color: colors[4] }, overlaying: 'y', side: 'left', position: 0.1 },
//         yaxis5: { title: 'Temperature [°C]', titlefont: { color: colors[0] }, tickfont: { color: colors[0] }, overlaying: 'y', side: 'right', position: 0.95 },
//         height: 600,
//         width: 1000,
//         showlegend: true,
//         legend: { x: 1.1, y: 1 }
//       };
  
//       Plotly.newPlot(chartRef.current, data, layout);
//     } else {
//       // Single plot mode
//       const plots = parameters.map((param, index) => ({
//         x: xValues,
//         y: fileData.map(m => m[param]),
//         type: 'scatter',
//         mode: 'lines',
//         line: { color: colors[index] },
//         name: param,
//         xaxis: `x${index + 1}`,
//         yaxis: `y${index + 1}`
//       }));
  
//       const layout = {
//         grid: { rows: 5, columns: 1, pattern: 'independent' },
//         height: 1500,
//         width: 800,
//         title: 'Measurement Data - Individual Parameters',
//         showlegend: false,
//       };
  
//       // Add individual axis titles with formatted time
//       parameters.forEach((param, index) => {
//         layout[`xaxis${index + 1}`] = { 
//           title: 'Time',
//           tickmode: 'array',
//           tickvals: xValues.filter((_, i) => i % Math.floor(xValues.length / 10) === 0),
//           ticktext: xValues.filter((_, i) => i % Math.floor(xValues.length / 10) === 0)
//         };
//         layout[`yaxis${index + 1}`] = { title: param };
//       });
  
//       Plotly.newPlot(chartRef.current, plots, layout);
//     }
//   };
//   const handleInputChange = (key, value) => {
//     setEditableData(prev => ({ ...prev, [key]: value }));
//   };

//   // const generateReport = () => {
//   //   calculateValues();
//   //   generateChart();
//   // };

//   const generateReport = () => {
//     if (!fileData || fileData.length === 0) {
//       setError("No measurement data available. Please import a file first.");
//       return;
//     }
//     calculateValues();
//     generateChart();
//   };
  
//   const exportToPDF = () => {
//     const doc = new jsPDF();
    
//     // Add title
//     doc.setFontSize(18);
//     doc.text('Report', 105, 15, null, null, 'center');
    
//     // Add editable data
//     doc.setFontSize(12);
//     let yPos = 30;
//     Object.entries(editableData).forEach(([key, value]) => {
//       doc.text(`${key}: ${value}`, 20, yPos);
//       yPos += 10;
//     });
    
//     // Add calculated values table
//     doc.autoTable({
//       head: [['Parameter', 'Min', 'Max', 'Mean',]],
//       body: Object.entries(calculatedValues).map(([param, stats]) => [
//         param, stats.min, stats.max, stats.mean
//       ]),
//       startY: yPos + 10
//     });
    
//     // Add chart
//     Plotly.toImage(chartRef.current, {format: 'png', width: 800, height: 600}).then(function(dataUrl) {
//       const imgWidth = doc.internal.pageSize.getWidth() - 40;
//       const imgHeight = (600 * imgWidth) / 800;
//       doc.addImage(dataUrl, 'PNG', 20, doc.autoTable.previous.finalY + 20, imgWidth, imgHeight);
      
//       // Save the PDF
//       doc.save('report.pdf');
//     });
//   };
//   if (!isVisible) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//       <div className="bg-gray-300 p-6 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
//         <h2 className="text-2xl font-bold mb-4">Report Generation</h2>
//         {(!fileData || fileData.length === 0) ? (
//           <p className="text-red-500 mb-4">No file data available. Please import a file before generating a report.</p>
//         ) : (
//           <>
//         <div className="grid grid-cols-2 gap-4 mb-4">
//           {Object.entries(editableData).map(([key, value]) => (
//             <div key={key} className="mb-2">
//               <label className="block text-sm font-medium text-gray-700">{key}</label>
//               <input
//                 type="text"
//                 value={value}
//                 onChange={(e) => handleInputChange(key, e.target.value)}
//                 className="mt-1 block w-100 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//               />
//             </div>
//           ))}
//         </div>
//         <div className="mb-4">
//           <h3 className="text-lg font-semibold mb-2 bg-blue-500 text-white p-2">Calculated Values</h3>
//           {isCalculating ? (
//             <p>Calculating...</p>
//           ) : error ? (
//             <p className="text-red-500">{error}</p>
//           ) : (
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Parameter</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Min</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Max</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mean</th>
//                   {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Slope</th> */}
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {Object.entries(calculatedValues).map(([param, stats]) => (
//                   <tr key={param}>
//                     <td className="px-6 py-4 whitespace-nowrap">{param}</td>
//                     <td className="px-6 py-4 whitespace-nowrap">{stats.min}</td>
//                     <td className="px-6 py-4 whitespace-nowrap">{stats.max}</td>
//                     <td className="px-6 py-4 whitespace-nowrap">{stats.mean}</td>
//                     {/* <td className="px-6 py-4 whitespace-nowrap">{stats.slope}</td> */}
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}
//         </div>
//         <div className="mb-4">
//           <label className="inline-flex items-center">
//             <input
//               type="radio"
//               className="form-radio"
//               name="plotType"
//               value="single"
//               checked={plotType === 'single'}
//               onChange={() => setPlotType('single')}
//             />
//             <span className="ml-2">Single Plot</span>
//           </label>
//           <label className="inline-flex items-center ml-6">
//             <input
//               type="radio"
//               className="form-radio"
//               name="plotType"
//               value="multiple"
//               checked={plotType === 'multiple'}
//               onChange={() => setPlotType('multiple')}
//             />
//             <span className="ml-2">Multiple Plot</span>
//           </label>
//         </div>
//         <div ref={chartRef} className="mb-4"></div>
//         <div className="flex justify-between">
//           <button
//             className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//             onClick={generateReport}
//           >
//             Build
//           </button>
//           <button
//             className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
//             onClick={exportToPDF}
//           >
//             Export to PDF
//           </button>
//           <button
//             className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
//             onClick={onClose}
//           >
//             Close
//           </button>
//         </div>
//         </>
//       )}
//       </div>

//     </div>
//   );
// };

// export default ReportPopup;

//'''''''''''''''''''''''''''''''''''''''''''''''''''''


import React, { useState, useEffect, useRef } from 'react';
import Plotly from 'plotly.js-dist';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import {Document,Packer, Paragraph,Table,TableCell,TableRow,HeadingLevel,ImageRun,AlignmentType,WidthType,BorderStyle,convertInchesToTwip,TableLayoutType} from 'docx';


const CHUNK_SIZE = 1000; // Adjust this value based on your performance needs
const ReportPopup = ({ isVisible, onClose, reportData, fileData }) => {
  const [editableData, setEditableData] = useState({});
  const [calculatedValues, setCalculatedValues] = useState({});
  const [isCalculating, setIsCalculating] = useState(false);
  const [error, setError] = useState(null);
  const [plotType, setPlotType] = useState('multiple');
  const chartRef = useRef(null);
  const [progress, setProgress] = useState(0);

  const createTable = (calculatedValues) => {
    return new Table({
      width: {
        size: 100,
        type: WidthType.PERCENTAGE,
      },
      borders: {
        top: { style: BorderStyle.SINGLE, size: 1 },
        bottom: { style: BorderStyle.SINGLE, size: 1 },
        left: { style: BorderStyle.SINGLE, size: 1 },
        right: { style: BorderStyle.SINGLE, size: 1 },
      },
      layout: TableLayoutType.FIXED,
      rows: [
        // Header row
        new TableRow({
          tableHeader: true,
          children: [
            'Parameter',
            'Min',
            'Max',
            'Mean'
          ].map(header => 
            new TableCell({
              width: {
                size: 25,
                type: WidthType.PERCENTAGE,
              },
              children: [new Paragraph({
                text: header,
                alignment: AlignmentType.CENTER,
              })],
            })
          ),
        }),
        // Data rows
        ...Object.entries(calculatedValues).map(([param, stats]) =>
          new TableRow({
            children: [
              param,
              stats.min,
              stats.max,
              stats.mean
            ].map(cell =>
              new TableCell({
                width: {
                  size: 25,
                  type: WidthType.PERCENTAGE,
                },
                children: [new Paragraph({
                  text: cell.toString(),
                  alignment: AlignmentType.CENTER,
                })],
              })
            ),
          })
        ),
      ],
    });
  };

  const exportToWord = async () => {
    try {
      // Create a temporary div for plot generation
      const tempDiv = document.createElement('div');
      document.body.appendChild(tempDiv);
      
      const parameters = ['Temperature', 'Bending moment Y', 'Bending moment X', 'Torsion', 'Tension'];
      const colors = ['#ff0000', '#FFA500', '#006400', '#800080', '#000080'];
      
      // Array to store plot images
      const plotImages = [];
      
      if (plotType === 'multiple') {
        // Generate combined plot for multiple view
        const xValues = fileData.map(m => formatTime(m.Time));
        
        const data = parameters.map((param, index) => ({
          x: xValues,
          y: fileData.map(m => m[param]),
          type: 'scatter',
          mode: 'lines',
          name: param,
          line: { color: colors[index], width: param === 'Tension' ? 2 : 1 },
          opacity: param === 'Tension' ? 1 : 0.7,
          yaxis: param === 'Temperature' ? 'y5' : 
                 (param.includes('Bending moment') ? 'y1' : 
                 (param === 'Torsion' ? 'y3' : 'y4')),
        }));
  
        const layout = {
          title: 'Measurement Data',
          xaxis: { 
            title: 'Time', 
            domain: [0.1, 0.9],
            tickmode: 'array',
            tickvals: xValues.filter((_, i) => i % Math.floor(xValues.length / 10) === 0),
            ticktext: xValues.filter((_, i) => i % Math.floor(xValues.length / 10) === 0)
          },
          yaxis: { title: 'Bending moment[Nm]', titlefont: { color: colors[1] }, tickfont: { color: colors[1] }, side: 'left', position: 0 },
          yaxis2: { title: 'Bending moment X[Nm]', titlefont: { color: colors[2] }, tickfont: { color: colors[2] }, overlaying: 'y', side: 'left', showticklabels: false },
          yaxis3: { title: 'Torsion [Nm]', titlefont: { color: colors[3] }, tickfont: { color: colors[3] }, overlaying: 'y', side: 'left', position: 0.05 },
          yaxis4: { title: 'Tension [Nm]', titlefont: { color: colors[4] }, tickfont: { color: colors[4] }, overlaying: 'y', side: 'left', position: 0.1 },
          yaxis5: { title: 'Temperature [°C]', titlefont: { color: colors[0] }, tickfont: { color: colors[0] }, overlaying: 'y', side: 'right', position: 0.95 },
          height: 600,
          width: 1000,
          showlegend: true,
          legend: { x: 1.1, y: 1 }
        };
  
        // Generate combined plot
        await Plotly.newPlot(tempDiv, data, layout);
        const imgData = await Plotly.toImage(tempDiv, {
          format: 'png',
          width: 1000,
          height: 600
        });
        
        // Convert base64 to Uint8Array
        const base64Data = imgData.split(',')[1];
        const binaryString = window.atob(base64Data);
        const imageData = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
          imageData[i] = binaryString.charCodeAt(i);
        }
        
        plotImages.push({
          title: 'Combined Measurement Data',
          data: imageData,
          width: 600,
          height: 400
        });
        
      } else {
        // Generate individual plots for single view
        for (let i = 0; i < parameters.length; i++) {
          const param = parameters[i];
          const xValues = fileData.map(m => formatTime(m.Time));
          
          const plot = {
            x: xValues,
            y: fileData.map(m => m[param]),
            type: 'scatter',
            mode: 'lines',
            line: { color: colors[i] },
            name: param
          };
  
          const layout = {
            title: param,
            xaxis: { 
              title: 'Time',
              tickmode: 'array',
              tickvals: xValues.filter((_, i) => i % Math.floor(xValues.length / 10) === 0),
              ticktext: xValues.filter((_, i) => i % Math.floor(xValues.length / 10) === 0),
              tickangle: 45
            },
            yaxis: { title: param },
            width: 1000,
            height: 200,
            margin: { l: 50, r: 30, t: 30, b: 50 }
          };
  
          await Plotly.newPlot(tempDiv, [plot], layout);
          const imgData = await Plotly.toImage(tempDiv, {
            format: 'png',
            width: 1000,
            height: 200
          });
          
          const base64Data = imgData.split(',')[1];
          const binaryString = window.atob(base64Data);
          const imageData = new Uint8Array(binaryString.length);
          for (let i = 0; i < binaryString.length; i++) {
            imageData[i] = binaryString.charCodeAt(i);
          }
          
          plotImages.push({
            title: param,
            data: imageData,
            width: 600,
            height: 150
          });
        }
      }
      
      // Clean up temporary div
      document.body.removeChild(tempDiv);
  
      // Create document
      const doc = new Document({
        sections: [{
          properties: {},
          children: [
            // Title
            new Paragraph({
              text: "Report",
              heading: HeadingLevel.HEADING_1,
              alignment: AlignmentType.CENTER,
              spacing: {
                after: convertInchesToTwip(0.5),
              },
            }),
  
            // Metadata section
            new Paragraph({
              text: "Metadata",
              heading: HeadingLevel.HEADING_2,
              spacing: {
                before: convertInchesToTwip(0.3),
                after: convertInchesToTwip(0.2),
              },
            }),
            ...Object.entries(editableData).map(([key, value]) => 
              new Paragraph({
                text: `${key}: ${value}`,
                spacing: {
                  after: convertInchesToTwip(0.1),
                },
              })
            ),
  
            // Calculated Values section
            new Paragraph({
              text: "Calculated Values",
              heading: HeadingLevel.HEADING_2,
              spacing: {
                before: convertInchesToTwip(0.3),
                after: convertInchesToTwip(0.2),
              },
            }),
            createTable(calculatedValues),
  
            // Charts section
            new Paragraph({
              text: "Measurement Charts",
              heading: HeadingLevel.HEADING_2,
              spacing: {
                before: convertInchesToTwip(0.5),
                after: convertInchesToTwip(0.2),
              },
            }),
            
            // Add plots with proper spacing
            ...plotImages.map((plot) => [
              new Paragraph({
                text: plot.title,
                spacing: {
                  before: convertInchesToTwip(0.3),
                  after: convertInchesToTwip(0.2),
                },
              }),
              new Paragraph({
                children: [
                  new ImageRun({
                    data: plot.data,
                    transformation: {
                      width: plot.width,
                      height: plot.height,
                    },
                  }),
                ],
                spacing: {
                  after: convertInchesToTwip(0.5),
                },
                alignment: AlignmentType.CENTER,
              }),
            ]).flat(),
          ],
        }],
      });
  
      // Generate and save document
      const blob = await Packer.toBlob(doc);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      document.body.appendChild(a);
      a.style.display = 'none';
      a.href = url;
      a.download = 'measurement_report.docx';
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
  
    } catch (error) {
      console.error('Error generating Word document:', error);
      setError('Failed to generate Word document: ' + error.message);
    }
  };

//'''''''''''''''''''''''''''''





  useEffect(() => {
    if (isVisible && reportData) {
      setEditableData(reportData);
    }
  }, [isVisible, reportData]);

  const processChunk = (chunk, property, accumulator) => {
    return chunk.reduce((acc, item) => {
      const value = parseFloat(item[property]);
      if (!isNaN(value)) {
        acc.sum += value;
        acc.count++;
        acc.min = Math.min(acc.min, value);
        acc.max = Math.max(acc.max, value);
        acc.values.push(value);
      }
      return acc;
    }, accumulator);
  };

  const finalizeCalculations = (property, accumulator, totalCount) => {
    const { sum, count, min, max, values } = accumulator;
    const mean = count > 0 ? sum / count : 0;
    // const slope = count > 1 ? (values[count - 1] - values[0]) / (count - 1) : 0;

    return {
      min: min.toFixed(6),
      max: max.toFixed(6),
      mean: mean.toFixed(9),
      validCount: count,
      totalCount
    };
  };

  const calculateValues = async () => {
    if (!fileData || fileData.length === 0) {
      setError("No measurement data available");
      return;
    }

    setIsCalculating(true);
    setError(null);
    setProgress(0);

    const properties = ['Tension', 'Torsion', 'Bending moment X', 'Bending moment Y', 'Temperature'];
    const results = {};
    const totalChunks = Math.ceil(fileData.length / CHUNK_SIZE);

    try {
      for (let i = 0; i < totalChunks; i++) {
        const chunk = fileData.slice(i * CHUNK_SIZE, (i + 1) * CHUNK_SIZE);

        for (const property of properties) {
          if (!results[property]) {
            results[property] = { sum: 0, count: 0, min: Infinity, max: -Infinity, values: [] };
          }
          results[property] = processChunk(chunk, property, results[property]);
        }

        setProgress(((i + 1) / totalChunks) * 100);
        
        // Allow UI to update
        await new Promise(resolve => setTimeout(resolve, 0));
      }

      const finalResults = {};
      for (const property of properties) {
        finalResults[property] = finalizeCalculations(property, results[property], fileData.length);
      }

      setCalculatedValues(finalResults);
      console.log("Data summary:", Object.entries(finalResults).map(([key, value]) => 
        `${key}: ${value.validCount}/${value.totalCount} valid values`
      ).join(', '));

    } catch (err) {
      console.error("Error in calculateValues:", err);
      setError(`An error occurred while calculating values: ${err.message}`);
    } finally {
      setIsCalculating(false);
      setProgress(100);
    }
  };
 
  
  const generateChart = () => {
    if (!fileData || fileData.length === 0 || !chartRef.current) return;
  
    const parameters = ['Temperature', 'Bending moment Y', 'Bending moment X', 'Torsion', 'Tension'];
    const colors = ['#ff0000', '#FFA500', '#006400', '#800080', '#000080'];
  
    // Format time for x-axis
    const formatTime = (seconds) => {
      if (isNaN(seconds) || seconds < 0) return "00:00:00.000";
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const secs = Math.floor(seconds % 60);
      const millisecs = Math.floor((seconds % 1) * 1000);
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}.${millisecs.toString().padStart(3, '0')}`;
    };
  
    const xValues = fileData.map(m => formatTime(m.Time));
  
    if (plotType === 'multiple') {
      const data = parameters.map((param, index) => ({
        x: xValues,
        y: fileData.map(m => m[param]),
        type: 'scatter',
        mode: 'lines',
        name: param,
        line: { color: colors[index], width: param === 'Tension' ? 2 : 1 },
        opacity: param === 'Tension' ? 1 : 0.7,
        yaxis: param === 'Temperature' ? 'y5' : 
               (param.includes('Bending moment') ? 'y1' : 
               (param === 'Torsion' ? 'y3' : 'y4')),
      }));
  
      const layout = {
        title: 'Measurement Data',
        xaxis: { 
          title: 'Time', 
          domain: [0.1, 0.9],
          tickmode: 'array',
          tickvals: xValues.filter((_, i) => i % Math.floor(xValues.length / 10) === 0),
          ticktext: xValues.filter((_, i) => i % Math.floor(xValues.length / 10) === 0)
        },
        yaxis: { title: 'Bending moment[Nm]', titlefont: { color: colors[1] }, tickfont: { color: colors[1] }, side: 'left', position: 0 },
        yaxis2: { title: 'Bending moment X[Nm]', titlefont: { color: colors[2] }, tickfont: { color: colors[2] }, overlaying: 'y', side: 'left', showticklabels: false },
        yaxis3: { title: 'Torsion [Nm]', titlefont: { color: colors[3] }, tickfont: { color: colors[3] }, overlaying: 'y', side: 'left', position: 0.05 },
        yaxis4: { title: 'Tension [Nm]', titlefont: { color: colors[4] }, tickfont: { color: colors[4] }, overlaying: 'y', side: 'left', position: 0.1 },
        yaxis5: { title: 'Temperature [°C]', titlefont: { color: colors[0] }, tickfont: { color: colors[0] }, overlaying: 'y', side: 'right', position: 0.95 },
        height: 600,
        width: 1000,
        showlegend: true,
        legend: { x: 1.1, y: 1 }
      };
  
      Plotly.newPlot(chartRef.current, data, layout);
    } else {
      // Single plot mode
      const plots = parameters.map((param, index) => ({
        x: xValues,
        y: fileData.map(m => m[param]),
        type: 'scatter',
        mode: 'lines',
        line: { color: colors[index] },
        name: param,
        xaxis: `x${index + 1}`,
        yaxis: `y${index + 1}`
      }));
  
      const layout = {
        grid: {
          rows: 5,
          columns: 1,
          pattern: 'independent',
          roworder: 'top to bottom',
          subplots: parameters.map((_, i) => `xy${i + 1}`),
          rowgap: 0.15  // Increased gap between plots
        },
        height: 2000,  // Increased total height
        width: 800,
        title: {
          text: 'Measurement Data - Individual Parameters',
          font: { size: 24 },
          pad: { t: 20, b: 20 }
        },
        showlegend: false,
        margin: {
          l: 80,
          r: 50,
          t: 100,
          b: 50
        }
      };
  
      parameters.forEach((param, index) => {
        layout[`xaxis${index + 1}`] = {
          title: {
            text: 'Time',
            font: { size: 12 },
            standoff: 20
          },
          tickmode: 'array',
          tickvals: xValues.filter((_, i) => i % Math.floor(xValues.length / 10) === 0),
          ticktext: xValues.filter((_, i) => i % Math.floor(xValues.length / 10) === 0),
          tickangle: 45
        };
        layout[`yaxis${index + 1}`] = {
          title: {
            text: param,
            font: { size: 12 },
            standoff: 20
          },
          zeroline: false
        };
      });
  
      Plotly.newPlot(chartRef.current, plots, layout);
    }
  };
  const handleInputChange = (key, value) => {
    setEditableData(prev => ({ ...prev, [key]: value }));
  };


  const generateReport = () => {
    if (!fileData || fileData.length === 0) {
      setError("No measurement data available. Please import a file first.");
      return;
    }
    calculateValues();
    generateChart();
  };
  
  
  // Add formatted time function
  const formatTime = (seconds) => {
    if (isNaN(seconds) || seconds < 0) return "00:00:00.000";
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    const millisecs = Math.floor((seconds % 1) * 1000);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}.${millisecs.toString().padStart(3, '0')}`;
  };

  const exportToPDF = async () => {
    try {
      const doc = new jsPDF('p', 'mm', 'a4');
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      
      // Add title
      doc.setFontSize(18);
      doc.text('Report', pageWidth / 2, 15, { align: 'center' });
      
      // Add editable data
      doc.setFontSize(12);
      let yPos = 30;
      Object.entries(editableData).forEach(([key, value]) => {
        doc.text(`${key}: ${value}`, 20, yPos);
        yPos += 10;
      });
      
      // Add calculated values table
      doc.autoTable({
        head: [['Parameter', 'Min', 'Max', 'Mean']],
        body: Object.entries(calculatedValues).map(([param, stats]) => [
          param, stats.min, stats.max, stats.mean
        ]),
        startY: yPos + 10,
        margin: { left: 20 }
      });

      // Handle different plot types
      if (plotType === 'single') {
        // Create temporary div for each plot
        const tempDiv = document.createElement('div');
        document.body.appendChild(tempDiv);
        const parameters = ['Temperature', 'Bending moment Y', 'Bending moment X', 'Torsion', 'Tension'];
        const colors = ['#ff0000', '#FFA500', '#006400', '#800080', '#000080'];
        
        let currentY = doc.autoTable.previous.finalY + 20;
        
        // Generate and add each plot separately
        for (let i = 0; i < parameters.length; i++) {
          const param = parameters[i];
          
          // Format time values for x-axis
          const xValues = fileData.map(m => formatTime(m.Time));
          
          // Create individual plot
          const plot = {
            x: xValues,
            y: fileData.map(m => m[param]),
            type: 'scatter',
            mode: 'lines',
            line: { color: colors[i] },
            name: param
          };

          const layout = {
            title: param,
            xaxis: { 
              title: 'Time',
              tickmode: 'array',
              tickvals: xValues.filter((_, i) => i % Math.floor(xValues.length / 10) === 0),
              ticktext: xValues.filter((_, i) => i % Math.floor(xValues.length / 10) === 0),
              tickangle: 45
            },
            yaxis: { title: param },
            width: 800,
            height: 200,
            margin: { l: 50, r: 30, t: 30, b: 50 }
          };

          await Plotly.newPlot(tempDiv, [plot], layout);
          
          // Convert to image and add to PDF
          const imgData = await Plotly.toImage(tempDiv, {
            format: 'png',
            width: 800,
            height: 200
          });

          // Check if we need a new page
          if (currentY + 60 > pageHeight) {
            doc.addPage();
            currentY = 20;
          }

          // Add image to PDF
          const imgWidth = pageWidth - 40;
          const imgHeight = (200 * imgWidth) / 800;
          doc.addImage(imgData, 'PNG', 20, currentY, imgWidth, imgHeight);
          currentY += imgHeight + 10;
        }

        // Clean up
        document.body.removeChild(tempDiv);
      } else {
        // Handle multiple plot type with formatted time
        const imgData = await Plotly.toImage(chartRef.current, {
          format: 'png',
          width: 800,
          height: 600
        });
        
        // Add new page for the chart
        doc.addPage();
        const imgWidth = pageWidth - 40;
        const imgHeight = (600 * imgWidth) / 800;
        doc.addImage(imgData, 'PNG', 20, 20, imgWidth, imgHeight);
      }
      
      // Save the PDF
      doc.save('report.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
      setError('Failed to generate PDF: ' + error.message);
    }
  };
  if (!isVisible) return null;


  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-gray-300 p-6 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Report Generation</h2>
        {(!fileData || fileData.length === 0) ? (
          <p className="text-red-500 mb-4">No file data available. Please import a file before generating a report.</p>
        ) : (
          <>
        <div className="grid grid-cols-2 gap-4 mb-4">
          {Object.entries(editableData).map(([key, value]) => (
            <div key={key} className="mb-2">
              <label className="block text-sm font-medium text-gray-700">{key}</label>
              <input
                type="text"
                value={value}
                onChange={(e) => handleInputChange(key, e.target.value)}
                className="mt-1 block w-100 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
          ))}
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2 bg-blue-500 text-white p-2">Calculated Values</h3>
          {isCalculating ? (
            <p>Calculating...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Parameter</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Min</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Max</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mean</th>
                  {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Slope</th> */}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {Object.entries(calculatedValues).map(([param, stats]) => (
                  <tr key={param}>
                    <td className="px-6 py-4 whitespace-nowrap">{param}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{stats.min}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{stats.max}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{stats.mean}</td>
                    {/* <td className="px-6 py-4 whitespace-nowrap">{stats.slope}</td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        <div className="mb-4">
          <label className="inline-flex items-center">
            <input
              type="radio"
              className="form-radio"
              name="plotType"
              value="single"
              checked={plotType === 'single'}
              onChange={() => setPlotType('single')}
            />
            <span className="ml-2">Single Plot</span>
          </label>
          <label className="inline-flex items-center ml-6">
            <input
              type="radio"
              className="form-radio"
              name="plotType"
              value="multiple"
              checked={plotType === 'multiple'}
              onChange={() => setPlotType('multiple')}
            />
            <span className="ml-2">Multiple Plot</span>
          </label>
        </div>
        <div ref={chartRef} className="mb-4"></div>
        <div className="flex justify-between">
          <button
            className="bg-gray-500 hover:bg-gray-400 text-white font-bold py-2 px-4 rounded"
            onClick={generateReport}
          >
            Build
          </button>
          <button
            className="bg-gray-500 hover:bg-gray-400 text-white font-bold py-2 px-4 rounded"
            onClick={exportToPDF}
          >
             generate PDF
          </button>
     <button
            className="bg-gray-500 hover:bg-gray-400 text-white font-bold py-2 px-4 rounded"
            onClick={exportToWord}
          >
            Build Word
          </button>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={onClose}
          >
            Close
          </button>
        </div>
        </>
      )}
      </div>

    </div>
  );
};

export default ReportPopup;