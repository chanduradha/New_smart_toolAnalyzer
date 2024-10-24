// import React, { useEffect, useRef, useState } from 'react';
// import Plotly from 'plotly.js-dist';
// import FilterComponent from './FilterComponent';
// import CursorValuesTable from './CursorValuesTable'; 

// import ViewBoundsToggle from './ViewBoundsToggle';

// // import ChartViewBoundsToggle from './ChartViewBoundsToggle ';
// import 'tailwindcss/tailwind.css';
// import Popup from './Popup ';
// import SaveFiles from './SaveFiles';


// const LineGraph = ({ data, isOtherWindowOpen, importedFileName, selectedFiles: propSelectedFiles , selectedFilesNew }) => {
//   const chartRef = useRef(null);
//   const [cursorValues, setCursorValues] = useState([]);
//   const [filteredSeries, setFilteredSeries] = useState({
//     tension: true,
//     torsion: true,
//     bendingMomentY: true,
//     temperature: true,
//   });
//   const [chartData, setChartData] = useState([]);
//   const [windowSize, setWindowSize] = useState(100);
//   const [calculationType, setCalculationType] = useState('average');
//   const [averagingEnabled, setAveragingEnabled] = useState(false);
//   const [savedFiles, setSavedFiles] = useState([]);
//   const [originalChartData, setOriginalChartData] = useState(null); 
//   const [initialOriginalChartData, setInitialOriginalChartData] = useState(null);
//   const [leftLinePosition, setLeftLinePosition] = useState(0.1);
//   const [rightLinePosition, setRightLinePosition] = useState(0.9);
//   const [resolution, setResolution] = useState(1);  // New state for resolution
//   const [isPopupOpen, setPopupOpen] = useState(false);
//   console.log("initialOriginalChartData");
//   console.log(initialOriginalChartData)
// const [selectedFilesForSaving, setSelectedFilesForSaving] = useState([]);
// const [selectedFilesInTable, setSelectedFilesInTable] = useState([]);
// const [deletedFiles, setDeletedFiles] = useState([]);


// useEffect(() => {
//   // Set initial/original chart data when chart data is set for the first time
//   if (chartData.length > 0 && !initialOriginalChartData) {
//     setInitialOriginalChartData(chartData);
//   }
// }, [chartData]);

// // Add this function inside your LineGraph component
// const takeScreenshot = () => {
//   // Get the chart as a base64 encoded PNG image
//   const plotlyElement = chartRef.current;
//   return Plotly.toImage(plotlyElement, { format: 'png', height: 700, width: 1800 });
// };



//  // Function to reload chart data using initial/original chart data
//  const reloadChartData = () => {
//   if (initialOriginalChartData) {
//     setChartData(initialOriginalChartData);
//   }
// };
// const handleDeleteFile = (file) => {
//   // Add the deleted file to the list of deleted files
//   setDeletedFiles([...deletedFiles, file]);
//   // Remove the file from the list of saved files
//   const updatedSavedFiles = savedFiles.filter((savedFile) => savedFile !== file);
//   setSavedFiles(updatedSavedFiles);
 
// };

// const handleSaveRecords = () => {
//   // Update the selected files for saving
//   const updatedSelectedFiles = [...deletedFiles, ...selectedFilesNew];
//   setSelectedFilesForSaving(updatedSelectedFiles);
//   // Update the saved files
//   setSavedFiles(updatedSelectedFiles);
//   // Clear the list of deleted files
//   setDeletedFiles([]);

// };

// // Function to handle saving files in the table
// const handleSaveInTable = (selectedFiles) => {
//   // Update the selected files in the table
//   setSelectedFilesInTable(selectedFiles);
  
// };

// useEffect(() => {
//   // When files are selected in the table, update the selected files for saving
//   setSelectedFilesForSaving(selectedFilesInTable);
// }, [selectedFilesInTable]);


//   const handleOpenPopup = () => {
//     setPopupOpen(true);
//   };

//   const handleClosePopup = () => {
//     setPopupOpen(false);
//   };

//   useEffect(() => {
//     const handleResize = () => {
//       // Calculate resolution based on window width
//       const screenWidth = window.innerWidth;
//       let newResolution;
//       if (screenWidth <= 640) {
//         newResolution = 1; // Set resolution for mobile screens
//       } else {
//         newResolution = 2; // Set resolution for larger screens
//       }
//       setResolution(newResolution);
//     };

//     // Initial call to set resolution
//     handleResize();

//     // Add event listener for window resize
//     window.addEventListener('resize', handleResize);

//     // Cleanup function to remove event listener
//     return () => {
//       window.removeEventListener('resize', handleResize);
//     };
//   }, []);

//   const handleSaveRecordsFromButton = () => {
//     // Function to call handleSaveRecords from SaveRecordsButton component
//     console.log('Saving records from LineGraph...');
    
//     // Example: Save the entire dataset
//     const newSavedFiles = [...savedFiles, ...data]; // Assuming `data` is an array of data points
//     setSavedFiles(newSavedFiles);
//   };
  
// const initialTimePoints = [
//   38, 40, 42, 44, 46, 48, 50, 52, 54, 56
// ];
// const yConstantValue = 10;
// const formattedTimePoints = initialTimePoints.map(time => {
//   const hours = Math.floor(time / 3600);
//   const minutes = Math.floor((time % 3600) / 60);
//   const seconds = time % 60;
//   return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.000`;
// });
// console.log('Formatted Time Points:', formattedTimePoints);


// useEffect(() => {
//   if (!chartRef.current) {
//       return;
//   }
 
//   // Define traces with zero data initially
//   const traceTension = {
//     type: 'scatter',
//     mode: 'lines',
//     name: 'Tension',
//     x: formattedTimePoints,
//     y: Array(formattedTimePoints.length).fill(yConstantValue),// Initialize with zeros or constant data
//     line: { color: '#000080' },
//     yaxis: 'y',
//     stroke: {
//         width: 1, // Set your desired stroke width
//     },
// };
//   const traceTorsion = {
//       type: 'scatter',
//       mode: 'lines',
//       name: 'Torsion',
//       x: formattedTimePoints,
//       y: Array(formattedTimePoints.length).fill(yConstantValue),// Initialize with zeros
//       line: { color: '#800080' },
//       yaxis: 'y2',

//       stroke: {
//           width: 0.5, // Set your desired stroke width
//       },
//   };

//   const traceBendingMomentY = {
//       type: 'scatter',
//       mode: 'lines',
//       name: 'Bending Moment Y ',
//       x: formattedTimePoints,
//       y: Array(formattedTimePoints.length).fill(yConstantValue),// Initialize with zeros
//       yaxis: 'y3',
//       line: { color: '#ADD8E6' },
//       stroke: {
//           width: 0.5, // Set your desired stroke width
//       },
//   };

//   const traceTemperature = {
//       type: 'scatter',
//       mode: 'lines',
//       name: 'Temperature',
//       x: formattedTimePoints,
//       y: Array(formattedTimePoints.length).fill(yConstantValue),// Initialize with zeros
//       line: { color: '#ff0000' },
//       yaxis: 'y4',
//       stroke: {
//           width: 0.5, // Set your desired stroke width
//       }, // Assign to the fourth y-axis
//   };

//   const layout = {
//     height: 700,
//     width: 1750,
//     position: 'relative',
//     left: '100px',
  

//     xaxis: {
//       type: 'linear',
//       tickformat: '%H:%M:%S.%L',
//       tickmode: 'array',
//       tickvals: formattedTimePoints, // Use formattedTimePoints as tick values
//       ticktext: formattedTimePoints,
//   },
    
//   yaxis: {
//     // title: 'Tension',
//     title: 'Bending Moment ',
//     titlefont: { color: '#1f77b4' },
//     tickfont: { color: '#1f77b4' },
//     side: 'left',
//   },
//   yaxis2: {
//     title: 'Torsion',
//     titlefont: { color: '#800080' },
//     tickfont: { color: '#800080' },
//     anchor: "free",
//     overlaying: "y",
//     position: 0.04,
//     side: "left",
//     range: [0, 9], // Set the range for torsion
//     tickAmount: 18,
    
//   },
//   yaxis3: {
//     title: 'Tension',
//     titlefont: { color: '#006400' },
//     tickfont: { color: '#006400' },
//     anchor: "free",
//     overlaying: "y",
//     position: 0.10,
//     side: "left",
//     range: [-190, 1050], // Set the range for tension
//     // Adjust as needed // Adjust this value as needed
   
//   },
//   yaxis4: {
//     title: 'Temperature',
//     titlefont: { color: '#ff0000' },
//     tickfont: { color: '#ff0000' },
//     overlaying: 'y',
  
//     side: 'right',
//     showgrid: false,
//   },
//   margin: { t: 10 },
  
// };

//   const options = {
//       scrollZoom: true,
//   };
//   console.log('Layout:', layout);
//   Plotly.newPlot(chartRef.current, [traceTension, traceTorsion, traceBendingMomentY, traceTemperature], layout, options);

//   const base = chartRef.current;
//   base.on('plotly_hover', (eventData) => {
//       if (eventData.points && eventData.points.length > 0) {
//           const closestPoint = eventData.points[0];
//           const cursorValue = {
//               yAxis: closestPoint.y.toFixed(3),
//               tension: closestPoint.data.tension[closestPoint.pointNumber].toFixed(3),
//               torsion: closestPoint.data.torsion[closestPoint.pointNumber].toFixed(3),
//               bendingMomentY: closestPoint.data.bendingMomentY[closestPoint.pointNumber].toFixed(3),
//               temperature: closestPoint.data.temperature[closestPoint.pointNumber].toFixed(3),
//               xAxis: closestPoint.x,
//           };

//           // Log cursor value to check if it's correctly set
//           console.log('Cursor Value:', cursorValue);

//           setCursorValues([cursorValue]);
//       } else {
//           // If no points, set an empty array
//           setCursorValues([]);
//       }
//   });

//   return () => {
//       if (base) {
//           base.removeAllListeners('plotly_hover');
//       }
//   };
// }, [formattedTimePoints]); //Include chartData in the dependency array


// useEffect(() => {
//   if (!chartRef.current || !data || typeof data !== 'string') {
//     return;
//   }

//   const processData = () => {
//       // Split the data into lines
//       const lines = data.split('\n');

//       // Process each line of data
//       const newChartData = lines
//           .filter((line) => !line.startsWith('#') && line.trim() !== '' && !isNaN(line.trim().split(';')[0]))
//           .map((line, index) => {
//               const values = line.split(';').map((value) => parseFloat(value.replace(',', '.')));

//               if (values.length < 6 || values.some(isNaN)) {
//                   console.error(`Error parsing values at line ${index + 1}: ${line}`);
//                   return null;
//               }

//               const timeIndex = 4;
//               const time = values[timeIndex];

//               if (isNaN(time)) {
//                   console.error(`Error parsing time at line ${index + 1}: ${line}`);
//                   return null;
//               }

//               return {
//                   x: time,
//                   tension: values[0],
//                   torsion: values[1],
//                   bendingMomentX: values[2],
//                   bendingMomentY: values[3],
//                   temperature: values[5],
//               };
//           })
//           .filter((row) => row !== null);

//       console.log('ChartData:', newChartData);
//       setChartData(newChartData);
//   };

//   // Call processData to process the data
//   processData();
// }, [data, resolution]);

// useEffect(() => {
//   if (!chartRef.current || !chartData || chartData.length === 0) {
//     return;
//   }
//   if (chartData && !originalChartData) {
//     setOriginalChartData(chartData);
//   }
//   // console.log('Temperature data:', chartData.map(item => item.temperature));
//   const filteredChartData = chartData.map((item) => ({
//     x: item.x,
//     tension: filteredSeries.tension ? item.tension : null,
//     torsion: filteredSeries.torsion ? item.torsion : null,
//     bendingMomentX: filteredSeries.bendingMomentX ? item.bendingMomentX : null,
//     bendingMomentY: filteredSeries.bendingMomentY ? item.bendingMomentY : null,
//     temperature: filteredSeries.temperature ? item.temperature : null,
//   }));

//   const cleanedChartData = filteredChartData.map((item) => ({
//     x: item.x,
//     tension: isNaN(item.tension) ? 0 : item.tension,
//     torsion: isNaN(item.torsion) ? 0 : item.torsion,
//     bendingMomentX: isNaN(item.bendingMomentX) ? 0 : item.bendingMomentX,
//     bendingMomentY: isNaN(item.bendingMomentY) ? 0 : item.bendingMomentY,
//     temperature: isNaN(item.temperature) ? 0 : item.temperature,
//   }));

//   const traces = [];
//   const traceTension = {
//     type: 'scatter',
//     mode: 'lines',
//     name: 'Tension',
//     x: cleanedChartData.map((item) => item.x),
//     y: cleanedChartData.map((item) => item.tension),
//     line: { color: '#000080' },
//     yaxis: 'y3',
//     // mode: "lines+markers",
//     stroke: {
//       width: 1,
//     },
//   };
//   const traceTorsion = {
//     type: 'scatter',
//     mode: 'lines',
//     name: 'Torsion',
//     x: cleanedChartData.map((item) => item.x),
//     y: cleanedChartData.map((item) => item.torsion),
//     line: { color: '#800080' },
//     yaxis: 'y2',
//     // mode: "lines+markers",
//     stroke: {
//       width: 0.5,
//     },
//   };

//   const traceBendingMomentY = {
//     type: 'scatter',
//     mode: 'lines',
//     name: 'Bending Moment Y',
//     x: cleanedChartData.map((item) => item.x),
//     y: cleanedChartData.map((item) => item.bendingMomentY),
//     yaxis: 'y',
//     line: { color: '#006400' },
//     // mode: "lines+markers",
//     stroke: {
//       width: 0.5,
//     },
//   };
//   const traceBendingMomentX = {
//     type: 'scatter',
//     mode: 'lines',
//     name: 'Bending Moment X',
//     x: cleanedChartData.map((item) => item.x),
//     y: cleanedChartData.map((item) => item.bendingMomentX),
//     yaxis: 'y',
//     // mode: "lines+markers",
//     line: { color: '#FFA500' },
//     stroke: {
//       width: 0.5,
//     },
//   };

//   const traceTemperature = {
//     type: 'scatter',
//     mode: 'lines',
//     name: 'Temperature',
//     x: cleanedChartData.map((item) => item.x),
//     y: cleanedChartData.map((item) => item.temperature),
//     line: { color: '#ff0000' },
//     yaxis: 'y4',
//     stroke: {
//       width: 0.5,
//     },
//   };

//   if (filteredSeries.combinedSquaredBendingMoments) {
//     const combinedSquaredBendingMoments = cleanedChartData.map((item) => ({
//       x: item.x,
//       combinedSquaredBendingMoments: Math.pow(item.bendingMomentX, 2) + Math.pow(item.bendingMomentY, 2),
//     }));

//     const traceCombinedSquaredBendingMoments = {
//       type: 'scatter',
//       mode: 'lines',
//       name: 'Combined Squared Bending Moments',
//       x: combinedSquaredBendingMoments.map((item) => item.x),
//       y: combinedSquaredBendingMoments.map((item) => item.combinedSquaredBendingMoments),
//       line: { color: '#FF4500' },
//       yaxis: 'y',
//       stroke: {
//         width: 0.5,
//       },
//     };
//     traces.push(traceCombinedSquaredBendingMoments);
//   }

//   const layout = {
//     height: 700,
//     width: 1750,
//     // left: '100px',
//     position: 'relative',


//     xaxis: {
//       type: 'numeric',
//       tickformat: '%H:%M:%S,%L',
//       tickmode: 'array',
//       nticks: 15,

//       tickvals: cleanedChartData
//         .filter((item, index) => index % Math.ceil(cleanedChartData.length / 15) === 0)
//         .map(item => item.x), // Use the actual x values from your data
//       ticktext: cleanedChartData
//         .filter((item, index) => index % Math.ceil(cleanedChartData.length / 15) === 0)
//         .map(item => {
//           const date = new Date(item.x * 1000);
//           const hours = date.getUTCHours();
//           const minutes = date.getUTCMinutes();
//           const seconds = date.getUTCSeconds();
//           const milliseconds = date.getUTCMilliseconds();
//           return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')},${milliseconds}`;
//         }),
//     },

//     yaxis: {
//       title: 'Bending Moment',
//       titlefont: { color: '#1f77b4' },
//       tickfont: { color: '#1f77b4' },
//       side: 'left',
//     },
//     yaxis2: {
//       title: 'Torsion',
//       titlefont: { color: '#800080' },
//       tickfont: { color: '#800080' },
//       anchor: "free",
//       overlaying: "y",
//       position: 0.05,
//       side: "left",
//     },
//     yaxis3: {
//       title: 'Tension',
//       titlefont: { color: '#006400' },
//       tickfont: { color: '#006400' },
//       anchor: "free",
//       overlaying: "y",
//       position: 0.10,
//       side: "left",
//     },
//     yaxis4: {
//       title: 'Temperature',
//       titlefont: { color: '#ff0000' },
//       tickfont: { color: '#ff0000' },
//       overlaying: 'y',
//       side: 'right',
//       showgrid: false,
//     },
//     margin: { t: 10 },
//   };

//   const options = {
//     scrollZoom: true,
//     zoom: false, // Disable zoom by default
//     zoomOut: 40
    
//   };

//   Plotly.newPlot(chartRef.current, [traceTension, traceTorsion, traceBendingMomentY, traceBendingMomentX, traceTemperature, ...traces], layout, options);
// }, [chartData, filteredSeries, originalChartData, initialOriginalChartData]);



//   const handleFilterChange = (filters) => {
//     setFilteredSeries(filters);
//   };


//   const handleCalculateRollingAverage = () => {
 
//     const filteredChartData = chartData.map((item) => ({
//       x: item.x,
//       tension: filteredSeries.tension ? item.tension : null,
//       torsion: filteredSeries.torsion ? item.torsion : null,
//       bendingMomentY: filteredSeries.bendingMomentY ? item.bendingMomentY : null,
//       bendingMomentX: filteredSeries.bendingMomentX ? item.bendingMomentX : null,
//       temperature: filteredSeries.temperature ? item.temperature : null,
//     }));
//     const tensionData = filteredChartData.map(item => item.tension);
//     const torsionData = filteredChartData.map(item => item.torsion);
//     const bendingMomentYData = filteredChartData.map(item => item.bendingMomentY);
//     const bendingMomentXData = filteredChartData.map(item => item.bendingMomentX); 
//     const temperatureData = filteredChartData.map(item => item.temperature);
  
//     let rollingTensionData, rollingTorsionData, rollingBendingMomentYData, rollingBendingMomentXData,rollingTemperatureData;

//     if (calculationType === 'average') {
//       rollingTensionData = calculateRollingAverage(tensionData, windowSize);
//       rollingTorsionData = calculateRollingAverage(torsionData, windowSize);
//       rollingBendingMomentYData = calculateRollingAverage(bendingMomentYData, windowSize);
//       rollingBendingMomentXData = calculateRollingAverage(bendingMomentXData, windowSize);
//       rollingTemperatureData = calculateRollingAverage(temperatureData, windowSize);
//     } else if (calculationType === 'median') {
//       rollingTensionData = calculateRollingMedian(tensionData, windowSize);
//       rollingTorsionData = calculateRollingMedian(torsionData, windowSize);
//       rollingBendingMomentYData = calculateRollingMedian(bendingMomentYData, windowSize);
//       rollingBendingMomentXData = calculateRollingMedian(bendingMomentXData, windowSize); 
//       rollingTemperatureData = calculateRollingMedian(temperatureData, windowSize);
//     }
  
//     const updatedChartData = chartData.map((item, index) => ({
//       ...item,
//       tension: filteredSeries.tension ? rollingTensionData[index] : item.tension,
//       torsion: filteredSeries.torsion ? rollingTorsionData[index] : item.torsion,
//       bendingMomentX: filteredSeries.bendingMomentX ? rollingBendingMomentXData[index] : item.bendingMomentX,
//       bendingMomentY: filteredSeries.bendingMomentY ? rollingBendingMomentYData[index] : item.bendingMomentY,
//       temperature: filteredSeries.temperature ? rollingTemperatureData[index] : item.temperature,
//     }));

  
  
//     setChartData(updatedChartData);
  
//     const updatedTraceTension = {
//       type: 'scatter',
//       mode: 'lines',
//       name: 'Tension',
//       x: updatedChartData.map(item => item.x),
//       y: updatedChartData.map(item => item.tension),
//       line: { color: '#000080' },
    
//       yaxis: 'y',
//       stroke: {
//         width: 1,
//       },
//     };
  
//     const updatedTraceTorsion = {
//       type: 'scatter',
//       mode: 'lines',
//       name: 'Torsion',
//       x: updatedChartData.map(item => item.x),
//       y: updatedChartData.map(item => item.torsion),
//       line: { color: '#800080' },
//       yaxis: 'y2',
   
//       stroke: {
//         width: 1,
//       },
//     };
  
//     const updatedTraceBendingMomentY = {
//       type: 'scatter',
//       mode: 'lines',
//       name: 'Bending Moment Y',
//       x: updatedChartData.map(item => item.x),
//       y: updatedChartData.map(item => item.bendingMomentY),
//       line: { color: '#006400' },
//       yaxis: 'y3',
      
//       stroke: {
//         width: 1,
//       },
//     };
//     const updatedTraceBendingMomentX = {
//       type: 'scatter',
//       mode: 'lines',
//       name: 'Bending Moment X',
//       x: updatedChartData.map(item => item.x),
//       y: updatedChartData.map(item => item.bendingMomentX),
//       line: { color: '#FFA500' },
    
//       yaxis: 'y3', // Share the y-axis with bending moment Y
//       stroke: { width: 1 },
//     };
//     const updatedTraceTemperature = {
//       type: 'scatter',
//       mode: 'lines',
//       name: 'Temperature',
//       x: updatedChartData.map(item => item.x),
//       y: updatedChartData.map(item => item.temperature),
//       line: { color: '#ff0000' },
      
//       yaxis: 'y4',
//       stroke: {
//         width: 1,
//       },
//     };
  
//     Plotly.addTraces(chartRef.current, [updatedTraceTension, updatedTraceTorsion, updatedTraceBendingMomentY, updatedTraceBendingMomentX, updatedTraceTemperature]);
 
//   };

//   function calculateRollingAverage(data, windowSize) {
//     const rollingAverage = [];

//     for (let i = 0; i < data.length; i++) {
//       if (i < windowSize - 1) {
//         rollingAverage.push(null);
//       } else {
//         const window = data.slice(i - windowSize + 1, i + 1);
//         const average = window.reduce((acc, val) => acc + val, 0) / windowSize;
//         rollingAverage.push(average);
//       }
//     }

//     return rollingAverage;
//   }
//   function calculateRollingMedian(data, windowSize) {
//     const rollingMedian = [];
  
//     for (let i = 0; i < data.length; i++) {
//       if (i < windowSize - 1) {
//         // rollingMedian.push(null);
//       } else {
//         const window = data.slice(i - windowSize + 1, i + 1);
//         const sortedWindow = window.slice().sort((a, b) => a - b); // Sort window data
//         const mid = Math.floor(windowSize / 2); // Find middle index
  
//         if (windowSize % 2 === 0) {
//           // If even number of elements in window, take average of middle two elements
//           const median = (sortedWindow[mid - 1] + sortedWindow[mid]) / 2;
//           rollingMedian.push(median);
//         } else {
//           // If odd number of elements in window, take middle element
//           rollingMedian.push(sortedWindow[mid]);
//         }
//       }
//     }
  
//     return rollingMedian;
//   }
//   const toggleAveraging = () => {
//     setAveragingEnabled(!averagingEnabled); // Toggle averaging state
  
//     // If averaging is enabled, initiate rolling average calculation
//     if (!averagingEnabled) {
//       // Save the original chart data if it's not already saved
//       if (!originalChartData) {
//         setOriginalChartData(chartData);
//       }
//       handleCalculateRollingAverage();
//     } else {
//       // If averaging is disabled, revert to the original chart data
//       setChartData(originalChartData);
//       // Clear original chart data
//       setOriginalChartData(null);
//     }
//   };

//   LineGraph.handleDownloadImage = () => {
//     // Get the chart as a base64 encoded PNG image
//     const plotlyElement = chartRef.current;
//     Plotly.toImage(plotlyElement, { format: 'png', height: 700, width: 1800 })
//       .then(function (url) {
//         // Create an anchor element to trigger the download
//         const link = document.createElement('a');
//         link.href = url;
//         link.download = 'chart.png'; // You can change the filename as needed
//         document.body.appendChild(link);
//         link.click();
//         document.body.removeChild(link);
    
//         // Log the URL of the image
//         console.log('Chart screenshot URL:', url);
        
//         return Plotly.toImage(plotlyElement, { format: 'png', height: 700, width: 1800 });
//       });
//   };
  
//   return (

//     <div 
//       style={{
//         display: isOtherWindowOpen ? 'none' : 'block',
//         position: 'relative',
//         zIndex: 2,
//         opacity: 1,
//         top: '100px',
//         left:'70px',
//         Resolution: {resolution},
      
//       }}
    
//       className={isOtherWindowOpen ? 'hidden' : 'block' } 
//     >   
 
//       <div ref={chartRef}/>
    
//       <div>
//       <CursorValuesTable cursorValues={cursorValues}  />
//       <div style={{position:'relative',bottom:'470px',left:'75%'}}>
//       <FilterComponent  onFilterChange={handleFilterChange} />
//       </div>
//       <input
//         type="number"
//         value={windowSize}
//         onChange={(e) => setWindowSize(parseInt(e.target.value))}
//         className={`border border-black text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-black` }
//         style={{position:'relative', left:'70%',width:'150px',height:'40px',bottom:'520px' }}
//       />
//      <button
//   onClick={toggleAveraging}
//   className={`border border-black text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-black` }
//   style={{ background: averagingEnabled ? 'green' : 'white', position:'relative', left:'79%',width:'150px',height:'40px',bottom:'520px' }}
// >
//   {averagingEnabled ? 'Averaging off' : 'Averaging On'}
// </button>

//        <select value={calculationType} onChange={(e) => setCalculationType(e.target.value)} style={{position:'relative', left:'66%',width:'150px',height:'40px',bottom:'520px' }}
//        className={`border border-black text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black-300 focus:ring-black` }>
//         <option value="average">Average</option>
//         <option value="median">Median</option>
//       </select>
//       {/* <SaveRecordsButton savedFiles={savedFiles} setSavedFiles={setSavedFiles} data={data} onHandleSaveRecords={handleSaveRecordsFromButton}  resolution={resolution}/> */}

//       <div>
//       <ViewBoundsToggle 
//   chartRef={chartRef} 
//   leftLinePosition={leftLinePosition} 
//   setLeftLinePosition={setLeftLinePosition} 
//   rightLinePosition={rightLinePosition} 
//   setRightLinePosition={setRightLinePosition}  
//   chartData={chartData} 
//   resolution={resolution}
//   setChartData={setChartData}
//   originalChartData={originalChartData} // Pass the originalChartData state here
//   setOriginalChartData={setOriginalChartData} 
// /> 

//    </div>
//    <div className="border border-black p-4 rounded-lg shadow-lg bg-[#bbb8ba]" style={{ border: '2px solid #000', display: 'inline-block', position: 'relative', left:'50%',bottom:'1195px', width:'1150px', height:'400px'}}>  
//    <button onClick={LineGraph.handleDownloadImage}  className={`border border-black text-sm font-medium rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-black` } style={{position:'relative',left:'79%',bottom:'70%',width:'150px',height:'10%'}}>Image clipboard</button>
//    <button onClick={reloadChartData} className={`border border-black text-sm font-medium rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-black` } style={{position:'relative',width:'150px',height:'10%',bottom:'70%',left:'48%'}}>Reload Chart Data</button>   

// <button onClick={handleSaveRecords} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded absolute top-0 right-0 mt-4 mr-4  focus:outline-none focus:ring-2 focus:ring-offset-2" style={{position:'absolute',top:'80px',right:'50px',width:'150px'}}>Record</button>
//       <SaveFiles selectedFiles={selectedFilesForSaving}   />
//       <Popup isOpen={isPopupOpen} onClose={handleClosePopup} selectedFiles={selectedFilesForSaving} />
//       {/* Button to compare selected files */}
//       <button onClick={handleOpenPopup} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded absolute top-0 right-0 mt-4 mr-4  focus:outline-none focus:ring-2 focus:ring-offset-2" style={{position:'absolute',top:'190px',right:'50px',width:'150px'}}>
//         Compare
//       </button>


//     </div>
//     {/* // Add this onClick handler to your button in the return statement of LineGraph component */}

//     </div>
//     </div>
//   );
// };

// export { LineGraph };


//''''''final code'''''''//

// import React, { useEffect, useRef, useState } from 'react';
// import Plotly from 'plotly.js-dist';
// import FilterComponent from './FilterComponent';
// import CursorValuesTable from './CursorValuesTable'; 

// import ViewBoundsToggle from './ViewBoundsToggle';

// // import ChartViewBoundsToggle from './ChartViewBoundsToggle ';
// import 'tailwindcss/tailwind.css';
// import Popup from './Popup ';
// import SaveFiles from './SaveFiles';
// // import ReportPopup from './ReportPopup';

// const Toast = ({ message, onClose }) => (
//   <div className="fixed top-4 right-4 bg-gray-800 text-white px-4 py-2 rounded-md shadow-lg">
//     {message}
//     <button onClick={onClose} className="ml-2 text-sm">&times;</button>
//   </div>
// );

// const LineGraph = ({ data, isOtherWindowOpen, importedFileName, selectedFiles: propSelectedFiles , selectedFilesNew }) => {
//   const chartRef = useRef(null);
//   const [cursorValues, setCursorValues] = useState([]);
//   const [filteredSeries, setFilteredSeries] = useState({
//     tension: true,
//     torsion: true,
//     bendingMomentY: true,
//     temperature: true,
//   });
//   const [chartData, setChartData] = useState([]);
//   const [windowSize, setWindowSize] = useState(100);
//   const [calculationType, setCalculationType] = useState('average');
//   const [averagingEnabled, setAveragingEnabled] = useState(false);
//   const [savedFiles, setSavedFiles] = useState([]);
//   const [originalChartData, setOriginalChartData] = useState(null); 
//   const [initialOriginalChartData, setInitialOriginalChartData] = useState(null);
//   const [leftLinePosition, setLeftLinePosition] = useState(0.1);
//   const [rightLinePosition, setRightLinePosition] = useState(0.9);
//   const [resolution, setResolution] = useState(1);  // New state for resolution
//   const [isPopupOpen, setPopupOpen] = useState(false);
//   console.log("initialOriginalChartData");
//   console.log(initialOriginalChartData)
// const [selectedFilesForSaving, setSelectedFilesForSaving] = useState([]);
// const [selectedFilesInTable, setSelectedFilesInTable] = useState([]);
// const [deletedFiles, setDeletedFiles] = useState([]);
// const [showToast, setShowToast] = useState(false);
// const [toastMessage, setToastMessage] = useState('');
// // const [isReportPopupOpen, setIsReportPopupOpen] = useState(false);

// // const handleOpenReportPopup = () => {
// //   setIsReportPopupOpen(true);
// // };

// // const handleCloseReportPopup = () => {
// //   setIsReportPopupOpen(false);
// // };

// useEffect(() => {
//   // Set initial/original chart data when chart data is set for the first time
//   if (chartData.length > 0 && !initialOriginalChartData) {
//     setInitialOriginalChartData(chartData);
//   }
// }, [chartData]);

// // Add this function inside your LineGraph component
// const takeScreenshot = () => {
//   // Get the chart as a base64 encoded PNG image
//   const plotlyElement = chartRef.current;
//   return Plotly.toImage(plotlyElement, { format: 'png', height: 700, width: 1800 });
// };



//  // Function to reload chart data using initial/original chart data
//  const reloadChartData = () => {
//   if (initialOriginalChartData) {
//     setChartData(initialOriginalChartData);
//   }
// };
// const handleDeleteFile = (file) => {
//   // Add the deleted file to the list of deleted files
//   setDeletedFiles([...deletedFiles, file]);
//   // Remove the file from the list of saved files
//   const updatedSavedFiles = savedFiles.filter((savedFile) => savedFile !== file);
//   setSavedFiles(updatedSavedFiles);
 
// };

// const handleSaveRecords = () => {
//   // Update the selected files for saving
//   const updatedSelectedFiles = [...deletedFiles, ...selectedFilesNew];
//   setSelectedFilesForSaving(updatedSelectedFiles);
//   // Update the saved files
//   setSavedFiles(updatedSelectedFiles);
//   // Clear the list of deleted files
//   setDeletedFiles([]);

// };

// // Function to handle saving files in the table
// const handleSaveInTable = (selectedFiles) => {
//   // Update the selected files in the table
//   setSelectedFilesInTable(selectedFiles);
  
// };

// useEffect(() => {
//   // When files are selected in the table, update the selected files for saving
//   setSelectedFilesForSaving(selectedFilesInTable);
// }, [selectedFilesInTable]);


//   const handleOpenPopup = () => {
//     setPopupOpen(true);
//   };

//   const handleClosePopup = () => {
//     setPopupOpen(false);
//   };

//   useEffect(() => {
//     const handleResize = () => {
//       // Calculate resolution based on window width
//       const screenWidth = window.innerWidth;
//       let newResolution;
//       if (screenWidth <= 640) {
//         newResolution = 1; // Set resolution for mobile screens
//       } else {
//         newResolution = 2; // Set resolution for larger screens
//       }
//       setResolution(newResolution);
//     };

//     // Initial call to set resolution
//     handleResize();

//     // Add event listener for window resize
//     window.addEventListener('resize', handleResize);

//     // Cleanup function to remove event listener
//     return () => {
//       window.removeEventListener('resize', handleResize);
//     };
//   }, []);

//   const handleSaveRecordsFromButton = () => {
//     // Function to call handleSaveRecords from SaveRecordsButton component
//     console.log('Saving records from LineGraph...');
    
//     // Example: Save the entire dataset
//     const newSavedFiles = [...savedFiles, ...data]; // Assuming `data` is an array of data points
//     setSavedFiles(newSavedFiles);
//   };
  
// const initialTimePoints = [
//   38, 40, 42, 44, 46, 48, 50, 52, 54, 56
// ];
// const yConstantValue = 10;
// const formattedTimePoints = initialTimePoints.map(time => {
//   const hours = Math.floor(time / 3600);
//   const minutes = Math.floor((time % 3600) / 60);
//   const seconds = time % 60;
//   return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.000`;
// });
// console.log('Formatted Time Points:', formattedTimePoints);


// useEffect(() => {
//   if (!chartRef.current) {
//       return;
//   }
 
//   // Define traces with zero data initially
//   const traceTension = {
//     type: 'scatter',
//     mode: 'lines',
//     name: 'Tension',
//     x: formattedTimePoints,
//     y: Array(formattedTimePoints.length).fill(yConstantValue),// Initialize with zeros or constant data
//     line: { color: '#000080' },
//     yaxis: 'y',
//     stroke: {
//         width: 1, // Set your desired stroke width
//     },
// };
//   const traceTorsion = {
//       type: 'scatter',
//       mode: 'lines',
//       name: 'Torsion',
//       x: formattedTimePoints,
//       y: Array(formattedTimePoints.length).fill(yConstantValue),// Initialize with zeros
//       line: { color: '#800080' },
//       yaxis: 'y2',

//       stroke: {
//           width: 0.5, // Set your desired stroke width
//       },
//   };

//   const traceBendingMomentY = {
//       type: 'scatter',
//       mode: 'lines',
//       name: 'Bending Moment Y ',
//       x: formattedTimePoints,
//       y: Array(formattedTimePoints.length).fill(yConstantValue),// Initialize with zeros
//       yaxis: 'y3',
//       line: { color: '#ADD8E6' },
//       stroke: {
//           width: 0.5, // Set your desired stroke width
//       },
//   };

//   const traceTemperature = {
//       type: 'scatter',
//       mode: 'lines',
//       name: 'Temperature',
//       x: formattedTimePoints,
//       y: Array(formattedTimePoints.length).fill(yConstantValue),// Initialize with zeros
//       line: { color: '#ff0000' },
//       yaxis: 'y4',
//       stroke: {
//           width: 0.5, // Set your desired stroke width
//       }, // Assign to the fourth y-axis
//   };

//   const layout = {
//     height: 580,
//     width: 1400,
//     position: 'relative',
    
  

//     xaxis: {
//       type: 'linear',
//       tickformat: '%H:%M:%S.%L',
//       tickmode: 'array',
//       tickvals: formattedTimePoints, // Use formattedTimePoints as tick values
//       ticktext: formattedTimePoints,
//       nticks: 10, // Adjust this value to control the number of ticks
//       range: [38, 56], // Set the initial x-axis range
//       tickvals: [38, 40, 42, 44, 46, 48, 50, 52, 54, 56], // Specify tick values
//       ticktext: ['00:00:00,000', '00:00:20,000', '00:00:40,000', '00:00:60,000', '00:00:70,000', 
//                  '00:00:80,000', '00:00:90,000', '00:00:100,000', '00:00:120,000', '00:00:140,000'],
//   },
    
//   yaxis: {
//     // title: 'Tension',
//     title: 'Bending Moment [Nm] ',
//     titlefont: { color: '#1f77b4' },
//     tickfont: { color: '#1f77b4' },
//     side: 'left',
//     zeroline: false,
//     showline: false
//   },
//   yaxis2: {
//     title: 'Torsion [Nm]',
//     titlefont: { color: '#800080' },
//     tickfont: { color: '#800080' },
//     anchor: "free",
//     overlaying: "y",
//     position: 0.04,
//     side: "left",
//     range: [0, 9], // Set the range for torsion
//     tickAmount: 18,
//     zeroline: false,
//     showline: false
    
//   },
//   yaxis3: {
//     title: 'Tension [N]',
//     titlefont: { color: '#006400' },
//     tickfont: { color: '#006400' },
//     anchor: "free",
//     overlaying: "y",
//     position: 0.10,
//     side: "left",
//     range: [-190, 1050], // Set the range for tension
//     // Adjust as needed // Adjust this value as needed
//     zeroline: false,
//     showline: false
//   },
//   yaxis4: {
//     title: 'Temperature [°C]',
//     titlefont: { color: '#ff0000' },
//     tickfont: { color: '#ff0000' },
//     overlaying: 'y',
  
//     side: 'right',
//     showgrid: false,
//     zeroline: false,
//     showline: false
//   },
//   margin: { t: 10 },
  
// };

//   const options = {
//       scrollZoom: true,
//   };
//   console.log('Layout:', layout);
//   Plotly.newPlot(chartRef.current, [traceTension, traceTorsion, traceBendingMomentY, traceTemperature], layout, options);

//   const base = chartRef.current;
//   base.on('plotly_hover', (eventData) => {
//       if (eventData.points && eventData.points.length > 0) {
//           const closestPoint = eventData.points[0];
//           const cursorValue = {
//               yAxis: closestPoint.y.toFixed(3),
//               tension: closestPoint.data.tension[closestPoint.pointNumber].toFixed(3),
//               torsion: closestPoint.data.torsion[closestPoint.pointNumber].toFixed(3),
//               bendingMomentY: closestPoint.data.bendingMomentY[closestPoint.pointNumber].toFixed(3),
//               temperature: closestPoint.data.temperature[closestPoint.pointNumber].toFixed(3),
//               xAxis: closestPoint.x,
//           };

//           // Log cursor value to check if it's correctly set
//           console.log('Cursor Value:', cursorValue);

//           setCursorValues([cursorValue]);
//       } else {
//           // If no points, set an empty array
//           setCursorValues([]);
//       }
//   });

//   return () => {
//       if (base) {
//           base.removeAllListeners('plotly_hover');
//       }
//   };
// }, [formattedTimePoints]); //Include chartData in the dependency array


// useEffect(() => {
//   if (!chartRef.current || !data || typeof data !== 'string') {
//     return;
//   }

//   const processData = () => {
//       // Split the data into lines
//       const lines = data.split('\n');

//       // Process each line of data
//       const newChartData = lines
//           .filter((line) => !line.startsWith('#') && line.trim() !== '' && !isNaN(line.trim().split(';')[0]))
//           .map((line, index) => {
//               const values = line.split(';').map((value) => parseFloat(value.replace(',', '.')));

//               if (values.length < 6 || values.some(isNaN)) {
//                   console.error(`Error parsing values at line ${index + 1}: ${line}`);
//                   return null;
//               }

//               const timeIndex = 4;
//               const time = values[timeIndex];

//               if (isNaN(time)) {
//                   console.error(`Error parsing time at line ${index + 1}: ${line}`);
//                   return null;
//               }

//               return {
//                   x: time,
//                   tension: values[0],
//                   torsion: values[1],
//                   bendingMomentX: values[2],
//                   bendingMomentY: values[3],
//                   temperature: values[5],
//               };
//           })
//           .filter((row) => row !== null);

//       console.log('ChartData:', newChartData);
//       setChartData(newChartData);
     
//   };

//   // Call processData to process the data
//   processData();
// }, [data, resolution]);

// useEffect(() => {
//   if (!chartRef.current || !chartData || chartData.length === 0) {
//     return;
//   }
//   if (chartData && !originalChartData) {
//     setOriginalChartData(chartData);
//   }
//   // console.log('Temperature data:', chartData.map(item => item.temperature));
//   const filteredChartData = chartData.map((item) => ({
//     x: item.x,
//     tension: filteredSeries.tension ? item.tension : null,
//     torsion: filteredSeries.torsion ? item.torsion : null,
//     bendingMomentX: filteredSeries.bendingMomentX ? item.bendingMomentX : null,
//     bendingMomentY: filteredSeries.bendingMomentY ? item.bendingMomentY : null,
//     temperature: filteredSeries.temperature ? item.temperature : null,
//   }));

//   const cleanedChartData = filteredChartData.map((item) => ({
//     x: item.x,
//     tension: isNaN(item.tension) ? 0 : item.tension,
//     torsion: isNaN(item.torsion) ? 0 : item.torsion,
//     bendingMomentX: isNaN(item.bendingMomentX) ? 0 : item.bendingMomentX,
//     bendingMomentY: isNaN(item.bendingMomentY) ? 0 : item.bendingMomentY,
//     temperature: isNaN(item.temperature) ? 0 : item.temperature,
//   }));

//   const traces = [];
//   const traceTension = {
//     type: 'scatter',
//     mode: 'lines',
//     name: 'Tension [N]',
//     x: cleanedChartData.map((item) => item.x),
//     y: cleanedChartData.map((item) => item.tension),
//     line: { color: '#000080' },
//     yaxis: 'y3',
//     // mode: "lines+markers",
//     stroke: {
//       width: 1,
//     },
//   };
//   const traceTorsion = {
//     type: 'scatter',
//     mode: 'lines',
//     name: 'Torsion [Nm]',
//     x: cleanedChartData.map((item) => item.x),
//     y: cleanedChartData.map((item) => item.torsion),
//     line: { color: '#800080' },
//     yaxis: 'y2',
//     // mode: "lines+markers",
//     stroke: {
//       width: 0.5,
//     },
//   };

//   const traceBendingMomentY = {
//     type: 'scatter',
//     mode: 'lines',
//     name: 'Bending Moment Y [Nm]',
//     x: cleanedChartData.map((item) => item.x),
//     y: cleanedChartData.map((item) => item.bendingMomentY),
//     yaxis: 'y',
//     line: { color: '#006400' },
//     // mode: "lines+markers",
//     stroke: {
//       width: 0.5,
//     },
//   };
//   const traceBendingMomentX = {
//     type: 'scatter',
//     mode: 'lines',
//     name: 'Bending Moment X [Nm]',
//     x: cleanedChartData.map((item) => item.x),
//     y: cleanedChartData.map((item) => item.bendingMomentX),
//     yaxis: 'y',
//     // mode: "lines+markers",
//     line: { color: '#FFA500' },
//     stroke: {
//       width: 0.5,
//     },
//   };

//   const traceTemperature = {
//     type: 'scatter',
//     mode: 'lines',
//     name: 'Temperature [°C]',
//     x: cleanedChartData.map((item) => item.x),
//     y: cleanedChartData.map((item) => item.temperature),
//     line: { color: '#ff0000' },
//     yaxis: 'y4',
//     stroke: {
//       width: 0.5,
//     },
//   };

//   if (filteredSeries.combinedSquaredBendingMoments) {
//     const combinedSquaredBendingMoments = cleanedChartData.map((item) => ({
//       x: item.x,
//       combinedSquaredBendingMoments: Math.pow(item.bendingMomentX, 2) + Math.pow(item.bendingMomentY, 2),
//     }));

//     const traceCombinedSquaredBendingMoments = {
//       type: 'scatter',
//       mode: 'lines',
//       name: 'Combined Squared Bending Moments',
//       x: combinedSquaredBendingMoments.map((item) => item.x),
//       y: combinedSquaredBendingMoments.map((item) => item.combinedSquaredBendingMoments),
//       line: { color: '#FF4500' },
//       yaxis: 'y',
//       stroke: {
//         width: 0.5,
//       },
//     };
//     traces.push(traceCombinedSquaredBendingMoments);
//   }

//   const layout = {
//     height: 580,
//     width: 1400,
//     // left: '100px',
//     position: 'relative',


//     xaxis: {
//       type: 'numeric',
//       tickformat: '%H:%M:%S,%L',
//       tickmode: 'array',
//       nticks: 15,

//       tickvals: cleanedChartData
//         .filter((item, index) => index % Math.ceil(cleanedChartData.length / 15) === 0)
//         .map(item => item.x), // Use the actual x values from your data
//       ticktext: cleanedChartData
//         .filter((item, index) => index % Math.ceil(cleanedChartData.length / 15) === 0)
//         .map(item => {
//           const date = new Date(item.x * 1000);
//           const hours = date.getUTCHours();
//           const minutes = date.getUTCMinutes();
//           const seconds = date.getUTCSeconds();
//           const milliseconds = date.getUTCMilliseconds();
//           return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')},${milliseconds}`;
//         }),
//     },

//     yaxis: {
//       title: 'Bending Moment [Nm]',
//       titlefont: { color: '#1f77b4' },
//       tickfont: { color: '#1f77b4' },
//       side: 'left',
//       zeroline: false,
//     showline: false
//     },
//     yaxis2: {
//       title: 'Torsion [Nm]',
//       titlefont: { color: '#800080' },
//       tickfont: { color: '#800080' },
//       anchor: "free",
//       overlaying: "y",
//       position: 0.05,
//       side: "left",
//       zeroline: false,
//     showline: false
//     },
//     yaxis3: {
//       title: 'Tension [N]',
//       titlefont: { color: '#006400' },
//       tickfont: { color: '#006400' },
//       anchor: "free",
//       overlaying: "y",
//       position: 0.10,
//       side: "left",
//       zeroline: false,
//     showline: false,
//     },
//     yaxis4: {
//       title: 'Temperature [°C]',
//       titlefont: { color: '#ff0000' },
//       tickfont: { color: '#ff0000' },
//       overlaying: 'y',
//       side: 'right',
//       showgrid: false,
//       zeroline: false,
//     showline: false
//     },
//     margin: { t: 10 },
//   };

//   const options = {
//     scrollZoom: true,
//     zoom: false, // Disable zoom by default
//     zoomOut: 40
    
//   };

//   Plotly.newPlot(chartRef.current, [traceTension, traceTorsion, traceBendingMomentY, traceBendingMomentX, traceTemperature, ...traces], layout, options);

// }, [chartData, filteredSeries, originalChartData, initialOriginalChartData]);



//   const handleFilterChange = (filters) => {
//     setFilteredSeries(filters);
//   };


//   const handleCalculateRollingAverage = () => {
 
//     const filteredChartData = chartData.map((item) => ({
//       x: item.x,
//       tension: filteredSeries.tension ? item.tension : null,
//       torsion: filteredSeries.torsion ? item.torsion : null,
//       bendingMomentY: filteredSeries.bendingMomentY ? item.bendingMomentY : null,
//       bendingMomentX: filteredSeries.bendingMomentX ? item.bendingMomentX : null,
//       temperature: filteredSeries.temperature ? item.temperature : null,
//     }));
//     const tensionData = filteredChartData.map(item => item.tension);
//     const torsionData = filteredChartData.map(item => item.torsion);
//     const bendingMomentYData = filteredChartData.map(item => item.bendingMomentY);
//     const bendingMomentXData = filteredChartData.map(item => item.bendingMomentX); 
//     const temperatureData = filteredChartData.map(item => item.temperature);
  
//     let rollingTensionData, rollingTorsionData, rollingBendingMomentYData, rollingBendingMomentXData,rollingTemperatureData;

//     if (calculationType === 'average') {
//       rollingTensionData = calculateRollingAverage(tensionData, windowSize);
//       rollingTorsionData = calculateRollingAverage(torsionData, windowSize);
//       rollingBendingMomentYData = calculateRollingAverage(bendingMomentYData, windowSize);
//       rollingBendingMomentXData = calculateRollingAverage(bendingMomentXData, windowSize);
//       rollingTemperatureData = calculateRollingAverage(temperatureData, windowSize);
//     } else if (calculationType === 'median') {
//       rollingTensionData = calculateRollingMedian(tensionData, windowSize);
//       rollingTorsionData = calculateRollingMedian(torsionData, windowSize);
//       rollingBendingMomentYData = calculateRollingMedian(bendingMomentYData, windowSize);
//       rollingBendingMomentXData = calculateRollingMedian(bendingMomentXData, windowSize); 
//       rollingTemperatureData = calculateRollingMedian(temperatureData, windowSize);
//     }
  
//     const updatedChartData = chartData.map((item, index) => ({
//       ...item,
//       tension: filteredSeries.tension ? rollingTensionData[index] : item.tension,
//       torsion: filteredSeries.torsion ? rollingTorsionData[index] : item.torsion,
//       bendingMomentX: filteredSeries.bendingMomentX ? rollingBendingMomentXData[index] : item.bendingMomentX,
//       bendingMomentY: filteredSeries.bendingMomentY ? rollingBendingMomentYData[index] : item.bendingMomentY,
//       temperature: filteredSeries.temperature ? rollingTemperatureData[index] : item.temperature,
//     }));

  
  
//     setChartData(updatedChartData);
  
//     const updatedTraceTension = {
//       type: 'scatter',
//       mode: 'lines',
//       name: 'Tension [N]',
//       x: updatedChartData.map(item => item.x),
//       y: updatedChartData.map(item => item.tension),
//       line: { color: '#000080' },
    
//       yaxis: 'y',
//       stroke: {
//         width: 1,
//       },
//     };
  
//     const updatedTraceTorsion = {
//       type: 'scatter',
//       mode: 'lines',
//       name: 'Torsion [Nm]',
//       x: updatedChartData.map(item => item.x),
//       y: updatedChartData.map(item => item.torsion),
//       line: { color: '#800080' },
//       yaxis: 'y2',
   
//       stroke: {
//         width: 1,
//       },
//     };
  
//     const updatedTraceBendingMomentY = {
//       type: 'scatter',
//       mode: 'lines',
//       name: 'Bending Moment Y [Nm]',
//       x: updatedChartData.map(item => item.x),
//       y: updatedChartData.map(item => item.bendingMomentY),
//       line: { color: '#006400' },
//       yaxis: 'y3',
      
//       stroke: {
//         width: 1,
//       },
//     };
//     const updatedTraceBendingMomentX = {
//       type: 'scatter',
//       mode: 'lines',
//       name: 'Bending Moment X [Nm]',
//       x: updatedChartData.map(item => item.x),
//       y: updatedChartData.map(item => item.bendingMomentX),
//       line: { color: '#FFA500' },
    
//       yaxis: 'y3', // Share the y-axis with bending moment Y
//       stroke: { width: 1 },
//     };
//     const updatedTraceTemperature = {
//       type: 'scatter',
//       mode: 'lines',
//       name: 'Temperature [°C]',
//       x: updatedChartData.map(item => item.x),
//       y: updatedChartData.map(item => item.temperature),
//       line: { color: '#ff0000' },
      
//       yaxis: 'y4',
//       stroke: {
//         width: 1,
//       },
//     };
  
//     Plotly.addTraces(chartRef.current, [updatedTraceTension, updatedTraceTorsion, updatedTraceBendingMomentY, updatedTraceBendingMomentX, updatedTraceTemperature]);
  
//   };

//   function calculateRollingAverage(data, windowSize) {
//     const rollingAverage = [];

//     for (let i = 0; i < data.length; i++) {
//       if (i < windowSize - 1) {
//         rollingAverage.push(null);
//       } else {
//         const window = data.slice(i - windowSize + 1, i + 1);
//         const average = window.reduce((acc, val) => acc + val, 0) / windowSize;
//         rollingAverage.push(average);
//       }
//     }

//     return rollingAverage;
//   }
//   function calculateRollingMedian(data, windowSize) {
//     const rollingMedian = [];
  
//     for (let i = 0; i < data.length; i++) {
//       if (i < windowSize - 1) {
//         // rollingMedian.push(null);
//       } else {
//         const window = data.slice(i - windowSize + 1, i + 1);
//         const sortedWindow = window.slice().sort((a, b) => a - b); // Sort window data
//         const mid = Math.floor(windowSize / 2); // Find middle index
  
//         if (windowSize % 2 === 0) {
//           // If even number of elements in window, take average of middle two elements
//           const median = (sortedWindow[mid - 1] + sortedWindow[mid]) / 2;
//           rollingMedian.push(median);
//         } else {
//           // If odd number of elements in window, take middle element
//           rollingMedian.push(sortedWindow[mid]);
//         }
//       }
//     }
  
//     return rollingMedian;
//   }
//   const toggleAveraging = () => {
//     setAveragingEnabled(!averagingEnabled); // Toggle averaging state
  
//    if (!averagingEnabled) {
//       if (!originalChartData) {
//         setOriginalChartData(chartData);
//       }
//       setShowToast(true);
//       setToastMessage('Processing averaging...');
      
//       // Simulate a delay for processing
//       setTimeout(() => {
//         handleCalculateRollingAverage();
//         setShowToast(false);
//       }, 2000); // Adjust this value based on your actual processing time
//     } else {
//       setChartData(originalChartData);
//       setOriginalChartData(null);
//     }
//   };


//   LineGraph.handleDownloadImage = () => {
//     // Get the chart as a base64 encoded PNG image
//     const plotlyElement = chartRef.current;
//     Plotly.toImage(plotlyElement, { format: 'png', height: 700, width: 1800 })
//       .then(function (url) {
//         // Create an anchor element to trigger the download
//         const link = document.createElement('a');
//         link.href = url;
//         link.download = 'chart.png'; // You can change the filename as needed
//         document.body.appendChild(link);
//         link.click();
//         document.body.removeChild(link);
    
//         // Log the URL of the image
//         console.log('Chart screenshot URL:', url);
        
//         return Plotly.toImage(plotlyElement, { format: 'png', height: 700, width: 1800 });
//       });
//   };
  
//   return (

//     <div 
//       style={{
//         display: isOtherWindowOpen ? 'none' : 'block',
//         position: 'relative',
//         zIndex: 2,
//         opacity: 1,
//         top: '55px',
//         left:'70px',
//         Resolution: {resolution},
//               maxWidth: '95%',
//         maxHeight: '120vh',
//         overflow:'hidden',
     
//       }}
    
//       className= {isOtherWindowOpen ? 'hidden' : 'block' } 
//     >   

//  <div 
//   style={{
//     boxShadow: '0 6px 8px rgba(0, 0, 0, 0.15), 0 3px 6px rgba(0, 0, 0, 0.1)',
//     width: '70%',
//     border: 'solid 1px gray',
//     overflow: 'hidden',  // Prevents content from spilling out
//     padding: '10px',     // Adds some space inside the border
//     boxSizing: 'border-box'  // Includes padding in the width calculation
//   }}
//   ref={chartRef}
// />

//       <div>
//       <CursorValuesTable cursorValues={cursorValues}  />
//       <div style={{position:'relative',bottom:'470px',left:'75%'}}>
//       <FilterComponent  onFilterChange={handleFilterChange} />
//       </div>
//       <input
//         type="number"
//         value={windowSize}
//         onChange={(e) => setWindowSize(parseInt(e.target.value))}
//         className={`border border-black text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-black` }
//         style={{position:'relative', left:'75%',width:'50px',height:'40px',bottom:'480px' }}
//       />
//      <button
//   onClick={toggleAveraging}
//   className={`border border-black text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-black` }
//   style={{ background: averagingEnabled ? 'green' : 'white', position:'relative', left:'85%',width:'120px',height:'40px',bottom:'480px' }}
// >
//   {averagingEnabled ? 'Averaging off' : 'Averaging On'}
// </button>

//        <select value={calculationType} onChange={(e) => setCalculationType(e.target.value)} style={{position:'relative', left:'70%',width:'120px',height:'40px',bottom:'480px' }}
//        className={`border border-black text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black-300 focus:ring-black` }>
//         <option value="average">Average</option>
//         <option value="median">Median</option>
//       </select>
//       {/* <SaveRecordsButton savedFiles={savedFiles} setSavedFiles={setSavedFiles} data={data} onHandleSaveRecords={handleSaveRecordsFromButton}  resolution={resolution}/> */}

//       <div>
//       <ViewBoundsToggle 
//   chartRef={chartRef} 
//   leftLinePosition={leftLinePosition} 
//   setLeftLinePosition={setLeftLinePosition} 
//   rightLinePosition={rightLinePosition} 
//   setRightLinePosition={setRightLinePosition}  
//   chartData={chartData} 
//   resolution={resolution}
//   setChartData={setChartData}
//   originalChartData={originalChartData} // Pass the originalChartData state here
//   setOriginalChartData={setOriginalChartData} 
// /> 
  
//    </div>
//   {showToast && (
//           <Toast message={toastMessage} onClose={() => setShowToast(false)} />
//         )}

        
//    <div className="border border-black p-4 rounded-lg shadow-lg " style={{ display: 'inline-block', position: 'relative', left:'50%',bottom:'1015px', width:'800px', height:'325px',boxShadow: '0 6px 8px rgba(0, 0, 0, 0.15), 0 3px 6px rgba(0, 0, 0, 0.1)',}}>  
//    <button onClick={LineGraph.handleDownloadImage}  className={`border border-black text-sm font-medium rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-black` } style={{position:'relative',left:'80%',bottom:'50%',width:'150px',height:'15%'}}>Image clipboard</button>
//    <button onClick={reloadChartData} className={`border border-black text-sm font-medium rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-black` } style={{position:'relative',width:'150px',height:'15%',bottom:'50%',left:'38%'}}>Reload Chart Data</button>   

// <button onClick={handleSaveRecords} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded absolute top-0 right-0 mt-4 mr-4  focus:outline-none focus:ring-2 focus:ring-offset-2" style={{position:'absolute',top:'80px',right:'50px',width:'150px'}}>Record</button>
      
    
//       <SaveFiles selectedFiles={selectedFilesForSaving}   />
//       <Popup isOpen={isPopupOpen} onClose={handleClosePopup} selectedFiles={selectedFilesForSaving} />
//       {/* Button to compare selected files */}
   
//       <button onClick={handleOpenPopup} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded absolute top-0 right-0 mt-4 mr-4  focus:outline-none focus:ring-2 focus:ring-offset-2" style={{position:'absolute',top:'190px',right:'50px',width:'150px'}}>
//         Compare
//       </button>
 
//     </div>
  
 
//     </div>
//     </div>
//   );
// };


// export { LineGraph };

import React, { useEffect, useRef, useState ,useMemo } from 'react';
import Plotly from 'plotly.js-dist';
import FilterComponent from './FilterComponent';
import CursorValuesTable from './CursorValuesTable'; 

import ViewBoundsToggle from './ViewBoundsToggle';

// import ChartViewBoundsToggle from './ChartViewBoundsToggle ';
import 'tailwindcss/tailwind.css';
import Popup from './Popup ';
import SaveFiles from './SaveFiles';
// import ReportPopup from './ReportPopup';

const Toast = ({ message, onClose }) => (
  <div className="fixed top-4 right-4 bg-gray-800 text-white px-4 py-2 rounded-md shadow-lg">
    {message}
    <button onClick={onClose} className="ml-2 text-sm">&times;</button>
  </div>
);

const LineGraph = ({ data, isOtherWindowOpen, importedFileName, selectedFiles: propSelectedFiles , selectedFilesNew }) => {
  const chartRef = useRef(null);
  const [cursorValues, setCursorValues] = useState([]);
  const [filteredSeries, setFilteredSeries] = useState({
    tension: true,
    torsion: true,
    bendingMomentY: true,
    temperature: true,
  });
  const [chartData, setChartData] = useState([]);
  const [windowSize, setWindowSize] = useState(100);
  const [calculationType, setCalculationType] = useState('average');
  const [averagingEnabled, setAveragingEnabled] = useState(false);
  const [savedFiles, setSavedFiles] = useState([]);
  const [originalChartData, setOriginalChartData] = useState(null); 
  const [initialOriginalChartData, setInitialOriginalChartData] = useState(null);
  const [leftLinePosition, setLeftLinePosition] = useState(0.1);
  const [rightLinePosition, setRightLinePosition] = useState(0.9);
  const [resolution, setResolution] = useState(1);  // New state for resolution
  const [isPopupOpen, setPopupOpen] = useState(false);
  console.log("initialOriginalChartData");
  console.log(initialOriginalChartData)
const [selectedFilesForSaving, setSelectedFilesForSaving] = useState([]);
const [selectedFilesInTable, setSelectedFilesInTable] = useState([]);
const [deletedFiles, setDeletedFiles] = useState([]);
const [showToast, setShowToast] = useState(false);
const [toastMessage, setToastMessage] = useState('');

const [windowWidth, setWindowWidth] = useState(window.innerWidth);
useEffect(() => {
  // Set initial/original chart data when chart data is set for the first time
  if (chartData.length > 0 && !initialOriginalChartData) {
    setInitialOriginalChartData(chartData);
  }
}, [chartData]);


 // Function to reload chart data using initial/original chart data
 const reloadChartData = () => {
  if (initialOriginalChartData) {
    setChartData(initialOriginalChartData);
  }
};
const handleDeleteFile = (file) => {
  // Add the deleted file to the list of deleted files
  setDeletedFiles([...deletedFiles, file]);
  // Remove the file from the list of saved files
  const updatedSavedFiles = savedFiles.filter((savedFile) => savedFile !== file);
  setSavedFiles(updatedSavedFiles);
 
};

const handleSaveRecords = () => {
  // Update the selected files for saving
  const updatedSelectedFiles = [...deletedFiles, ...selectedFilesNew];
  setSelectedFilesForSaving(updatedSelectedFiles);
  // Update the saved files
  setSavedFiles(updatedSelectedFiles);
  // Clear the list of deleted files
  setDeletedFiles([]);

};

// Function to handle saving files in the table
const handleSaveInTable = (selectedFiles) => {
  // Update the selected files in the table
  setSelectedFilesInTable(selectedFiles);
  
};

useEffect(() => {
  // When files are selected in the table, update the selected files for saving
  setSelectedFilesForSaving(selectedFilesInTable);
}, [selectedFilesInTable]);


  const handleOpenPopup = () => {
    setPopupOpen(true);
  };

  const handleClosePopup = () => {
    setPopupOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      // Calculate resolution based on window width
      const screenWidth = window.innerWidth;
      let newResolution;
      if (screenWidth <= 640) {
        newResolution = 1; // Set resolution for mobile screens
      } else {
        newResolution = 2; // Set resolution for larger screens
      }
      setResolution(newResolution);
    };

    // Initial call to set resolution
    handleResize();

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleSaveRecordsFromButton = () => {
    // Function to call handleSaveRecords from SaveRecordsButton component
    console.log('Saving records from LineGraph...');
    
    // Example: Save the entire dataset
    const newSavedFiles = [...savedFiles, ...data]; // Assuming `data` is an array of data points
    setSavedFiles(newSavedFiles);
  };
  
const initialTimePoints = [
  38, 40, 42, 44, 46, 48, 50, 52, 54, 56
];
const yConstantValue = 10;
const formattedTimePoints = initialTimePoints.map(time => {
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = time % 60;
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.000`;
});
console.log('Formatted Time Points:', formattedTimePoints);


useEffect(() => {
  if (!chartRef.current) {
      return;
  }
 
  // Define traces with zero data initially
  const traceTension = {
    type: 'scatter',
    mode: 'lines',
    name: 'Tension',
    x: formattedTimePoints,
    y: Array(formattedTimePoints.length).fill(yConstantValue),// Initialize with zeros or constant data
    line: { color: '#000080' },
    yaxis: 'y',
    stroke: {
        width: 1, // Set your desired stroke width
    },
};
  const traceTorsion = {
      type: 'scatter',
      mode: 'lines',
      name: 'Torsion',
      x: formattedTimePoints,
      y: Array(formattedTimePoints.length).fill(yConstantValue),// Initialize with zeros
      line: { color: '#800080' },
      yaxis: 'y2',

      stroke: {
          width: 0.5, // Set your desired stroke width
      },
  };

  const traceBendingMomentY = {
      type: 'scatter',
      mode: 'lines',
      name: 'Bending Moment Y ',
      x: formattedTimePoints,
      y: Array(formattedTimePoints.length).fill(yConstantValue),// Initialize with zeros
      yaxis: 'y3',
      line: { color: '#ADD8E6' },
      stroke: {
          width: 0.5, // Set your desired stroke width
      },
  };

  const traceTemperature = {
      type: 'scatter',
      mode: 'lines',
      name: 'Temperature',
      x: formattedTimePoints,
      y: Array(formattedTimePoints.length).fill(yConstantValue),// Initialize with zeros
      line: { color: '#ff0000' },
      yaxis: 'y4',
      stroke: {
          width: 0.5, // Set your desired stroke width
      }, // Assign to the fourth y-axis
  };

  const layout = {
    height: 580,
    width: 1400,
    position: 'relative',
    
  

    xaxis: {
      type: 'linear',
      tickformat: '%H:%M:%S.%L',
      tickmode: 'array',
      tickvals: formattedTimePoints, // Use formattedTimePoints as tick values
      ticktext: formattedTimePoints,
      nticks: 10, // Adjust this value to control the number of ticks
      range: [38, 56], // Set the initial x-axis range
      tickvals: [38, 40, 42, 44, 46, 48, 50, 52, 54, 56], // Specify tick values
      ticktext: ['00:00:00,000', '00:00:20,000', '00:00:40,000', '00:00:60,000', '00:00:70,000', 
                 '00:00:80,000', '00:00:90,000', '00:00:100,000', '00:00:120,000', '00:00:140,000'],
  },
    
  yaxis: {
    // title: 'Tension',
    title: 'Bending Moment [Nm] ',
    titlefont: { color: '#1f77b4' },
    tickfont: { color: '#1f77b4' },
    side: 'left',
    zeroline: false,
    showline: false
  },
  yaxis2: {
    title: 'Torsion [Nm]',
    titlefont: { color: '#800080' },
    tickfont: { color: '#800080' },
    anchor: "free",
    overlaying: "y",
    position: 0.04,
    side: "left",
    range: [0, 9], // Set the range for torsion
    tickAmount: 18,
    zeroline: false,
    showline: false
    
  },
  yaxis3: {
    title: 'Tension [N]',
    titlefont: { color: '#006400' },
    tickfont: { color: '#006400' },
    anchor: "free",
    overlaying: "y",
    position: 0.10,
    side: "left",
    range: [-190, 1050], // Set the range for tension
    // Adjust as needed // Adjust this value as needed
    zeroline: false,
    showline: false
  },
  yaxis4: {
    title: 'Temperature [°C]',
    titlefont: { color: '#ff0000' },
    tickfont: { color: '#ff0000' },
    overlaying: 'y',
  
    side: 'right',
    showgrid: false,
    zeroline: false,
    showline: false
  },
  margin: { t: 10 },
  
};

  const options = {
      scrollZoom: true,
  };
  console.log('Layout:', layout);
  Plotly.newPlot(chartRef.current, [traceTension, traceTorsion, traceBendingMomentY, traceTemperature], layout, options);

  const base = chartRef.current;
  base.on('plotly_hover', (eventData) => {
      if (eventData.points && eventData.points.length > 0) {
          const closestPoint = eventData.points[0];
          const cursorValue = {
              yAxis: closestPoint.y.toFixed(3),
              tension: closestPoint.data.tension[closestPoint.pointNumber].toFixed(3),
              torsion: closestPoint.data.torsion[closestPoint.pointNumber].toFixed(3),
              bendingMomentY: closestPoint.data.bendingMomentY[closestPoint.pointNumber].toFixed(3),
              temperature: closestPoint.data.temperature[closestPoint.pointNumber].toFixed(3),
              xAxis: closestPoint.x,
          };

          // Log cursor value to check if it's correctly set
          console.log('Cursor Value:', cursorValue);

          setCursorValues([cursorValue]);
      } else {
          // If no points, set an empty array
          setCursorValues([]);
      }
  });

  return () => {
      if (base) {
          base.removeAllListeners('plotly_hover');
      }
  };
}, [formattedTimePoints]); //Include chartData in the dependency array


useEffect(() => {
  if (!chartRef.current || !data || typeof data !== 'string') {
    return;
  }

  const processData = () => {
      // Split the data into lines
      const lines = data.split('\n');

      // Process each line of data
      const newChartData = lines
          .filter((line) => !line.startsWith('#') && line.trim() !== '' && !isNaN(line.trim().split(';')[0]))
          .map((line, index) => {
              const values = line.split(';').map((value) => parseFloat(value.replace(',', '.')));

              if (values.length < 6 || values.some(isNaN)) {
                  console.error(`Error parsing values at line ${index + 1}: ${line}`);
                  return null;
              }

              const timeIndex = 4;
              const time = values[timeIndex];

              if (isNaN(time)) {
                  console.error(`Error parsing time at line ${index + 1}: ${line}`);
                  return null;
              }

              return {
                  x: time,
                  tension: values[0],
                  torsion: values[1],
                  bendingMomentX: values[2],
                  bendingMomentY: values[3],
                  temperature: values[5],
              };
          })
          .filter((row) => row !== null);

      console.log('ChartData:', newChartData);
      setChartData(newChartData);
     
  };

  // Call processData to process the data
  processData();
}, [data, resolution]);

useEffect(() => {
  if (!chartRef.current || !chartData || chartData.length === 0) {
    return;
  }
  if (chartData && !originalChartData) {
    setOriginalChartData(chartData);
  }
  // console.log('Temperature data:', chartData.map(item => item.temperature));
  const filteredChartData = chartData.map((item) => ({
    x: item.x,
    tension: filteredSeries.tension ? item.tension : null,
    torsion: filteredSeries.torsion ? item.torsion : null,
    bendingMomentX: filteredSeries.bendingMomentX ? item.bendingMomentX : null,
    bendingMomentY: filteredSeries.bendingMomentY ? item.bendingMomentY : null,
    temperature: filteredSeries.temperature ? item.temperature : null,
  }));

  const cleanedChartData = filteredChartData.map((item) => ({
    x: item.x,
    tension: isNaN(item.tension) ? 0 : item.tension,
    torsion: isNaN(item.torsion) ? 0 : item.torsion,
    bendingMomentX: isNaN(item.bendingMomentX) ? 0 : item.bendingMomentX,
    bendingMomentY: isNaN(item.bendingMomentY) ? 0 : item.bendingMomentY,
    temperature: isNaN(item.temperature) ? 0 : item.temperature,
  }));

  const traces = [];
  const traceTension = {
    type: 'scatter',
    mode: 'lines',
    name: 'Tension [N]',
    x: cleanedChartData.map((item) => item.x),
    y: cleanedChartData.map((item) => item.tension),
    line: { color: '#000080' },
    yaxis: 'y3',
    // mode: "lines+markers",
    stroke: {
      width: 1,
    },
  };
  const traceTorsion = {
    type: 'scatter',
    mode: 'lines',
    name: 'Torsion [Nm]',
    x: cleanedChartData.map((item) => item.x),
    y: cleanedChartData.map((item) => item.torsion),
    line: { color: '#800080' },
    yaxis: 'y2',
    // mode: "lines+markers",
    stroke: {
      width: 0.5,
    },
  };

  const traceBendingMomentY = {
    type: 'scatter',
    mode: 'lines',
    name: 'Bending Moment Y [Nm]',
    x: cleanedChartData.map((item) => item.x),
    y: cleanedChartData.map((item) => item.bendingMomentY),
    yaxis: 'y',
    line: { color: '#006400' },
    // mode: "lines+markers",
    stroke: {
      width: 0.5,
    },
  };
  const traceBendingMomentX = {
    type: 'scatter',
    mode: 'lines',
    name: 'Bending Moment X [Nm]',
    x: cleanedChartData.map((item) => item.x),
    y: cleanedChartData.map((item) => item.bendingMomentX),
    yaxis: 'y',
    // mode: "lines+markers",
    line: { color: '#FFA500' },
    stroke: {
      width: 0.5,
    },
  };

  const traceTemperature = {
    type: 'scatter',
    mode: 'lines',
    name: 'Temperature [°C]',
    x: cleanedChartData.map((item) => item.x),
    y: cleanedChartData.map((item) => item.temperature),
    line: { color: '#ff0000' },
    yaxis: 'y4',
    stroke: {
      width: 0.5,
    },
  };

  if (filteredSeries.combinedSquaredBendingMoments) {
    const combinedSquaredBendingMoments = cleanedChartData.map((item) => ({
      x: item.x,
      combinedSquaredBendingMoments: Math.pow(item.bendingMomentX, 2) + Math.pow(item.bendingMomentY, 2),
    }));

    const traceCombinedSquaredBendingMoments = {
      type: 'scatter',
      mode: 'lines',
      name: 'Combined Squared Bending Moments',
      x: combinedSquaredBendingMoments.map((item) => item.x),
      y: combinedSquaredBendingMoments.map((item) => item.combinedSquaredBendingMoments),
      line: { color: '#FF4500' },
      yaxis: 'y',
      stroke: {
        width: 0.5,
      },
    };
    traces.push(traceCombinedSquaredBendingMoments);
  }

  const layout = {
    height: 580,
    width: 1400,
    // left: '100px',
    position: 'relative',


    xaxis: {
      type: 'numeric',
      tickformat: '%H:%M:%S,%L',
      tickmode: 'array',
      nticks: 15,

      tickvals: cleanedChartData
        .filter((item, index) => index % Math.ceil(cleanedChartData.length / 15) === 0)
        .map(item => item.x), // Use the actual x values from your data
      ticktext: cleanedChartData
        .filter((item, index) => index % Math.ceil(cleanedChartData.length / 15) === 0)
        .map(item => {
          const date = new Date(item.x * 1000);
          const hours = date.getUTCHours();
          const minutes = date.getUTCMinutes();
          const seconds = date.getUTCSeconds();
          const milliseconds = date.getUTCMilliseconds();
          return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')},${milliseconds}`;
        }),
    },

    yaxis: {
      title: 'Bending Moment [Nm]',
      titlefont: { color: '#1f77b4' },
      tickfont: { color: '#1f77b4' },
      side: 'left',
      zeroline: false,
    showline: false
    },
    yaxis2: {
      title: 'Torsion [Nm]',
      titlefont: { color: '#800080' },
      tickfont: { color: '#800080' },
      anchor: "free",
      overlaying: "y",
      position: 0.05,
      side: "left",
      zeroline: false,
    showline: false
    },
    yaxis3: {
      title: 'Tension [N]',
      titlefont: { color: '#006400' },
      tickfont: { color: '#006400' },
      anchor: "free",
      overlaying: "y",
      position: 0.10,
      side: "left",
      zeroline: false,
    showline: false,
    },
    yaxis4: {
      title: 'Temperature [°C]',
      titlefont: { color: '#ff0000' },
      tickfont: { color: '#ff0000' },
      overlaying: 'y',
      side: 'right',
      showgrid: false,
      zeroline: false,
    showline: false
    },
    margin: { t: 10 },
  };

  const options = {
    scrollZoom: true,
    zoom: false, // Disable zoom by default
    zoomOut: 40
    
  };

  Plotly.newPlot(chartRef.current, [traceTension, traceTorsion, traceBendingMomentY, traceBendingMomentX, traceTemperature, ...traces], layout, options);

}, [chartData, filteredSeries, originalChartData, initialOriginalChartData]);



  const handleFilterChange = (filters) => {
    setFilteredSeries(filters);
  };


  const handleCalculateRollingAverage = () => {
 
    const filteredChartData = chartData.map((item) => ({
      x: item.x,
      tension: filteredSeries.tension ? item.tension : null,
      torsion: filteredSeries.torsion ? item.torsion : null,
      bendingMomentY: filteredSeries.bendingMomentY ? item.bendingMomentY : null,
      bendingMomentX: filteredSeries.bendingMomentX ? item.bendingMomentX : null,
      temperature: filteredSeries.temperature ? item.temperature : null,
    }));
    const tensionData = filteredChartData.map(item => item.tension);
    const torsionData = filteredChartData.map(item => item.torsion);
    const bendingMomentYData = filteredChartData.map(item => item.bendingMomentY);
    const bendingMomentXData = filteredChartData.map(item => item.bendingMomentX); 
    const temperatureData = filteredChartData.map(item => item.temperature);
  
    let rollingTensionData, rollingTorsionData, rollingBendingMomentYData, rollingBendingMomentXData,rollingTemperatureData;

    if (calculationType === 'average') {
      rollingTensionData = calculateRollingAverage(tensionData, windowSize);
      rollingTorsionData = calculateRollingAverage(torsionData, windowSize);
      rollingBendingMomentYData = calculateRollingAverage(bendingMomentYData, windowSize);
      rollingBendingMomentXData = calculateRollingAverage(bendingMomentXData, windowSize);
      rollingTemperatureData = calculateRollingAverage(temperatureData, windowSize);
    } else if (calculationType === 'median') {
      rollingTensionData = calculateRollingMedian(tensionData, windowSize);
      rollingTorsionData = calculateRollingMedian(torsionData, windowSize);
      rollingBendingMomentYData = calculateRollingMedian(bendingMomentYData, windowSize);
      rollingBendingMomentXData = calculateRollingMedian(bendingMomentXData, windowSize); 
      rollingTemperatureData = calculateRollingMedian(temperatureData, windowSize);
    }
  
    const updatedChartData = chartData.map((item, index) => ({
      ...item,
      tension: filteredSeries.tension ? rollingTensionData[index] : item.tension,
      torsion: filteredSeries.torsion ? rollingTorsionData[index] : item.torsion,
      bendingMomentX: filteredSeries.bendingMomentX ? rollingBendingMomentXData[index] : item.bendingMomentX,
      bendingMomentY: filteredSeries.bendingMomentY ? rollingBendingMomentYData[index] : item.bendingMomentY,
      temperature: filteredSeries.temperature ? rollingTemperatureData[index] : item.temperature,
    }));

  
  
    setChartData(updatedChartData);
  
    const updatedTraceTension = {
      type: 'scatter',
      mode: 'lines',
      name: 'Tension [N]',
      x: updatedChartData.map(item => item.x),
      y: updatedChartData.map(item => item.tension),
      line: { color: '#000080' },
    
      yaxis: 'y',
      stroke: {
        width: 1,
      },
    };
  
    const updatedTraceTorsion = {
      type: 'scatter',
      mode: 'lines',
      name: 'Torsion [Nm]',
      x: updatedChartData.map(item => item.x),
      y: updatedChartData.map(item => item.torsion),
      line: { color: '#800080' },
      yaxis: 'y2',
   
      stroke: {
        width: 1,
      },
    };
  
    const updatedTraceBendingMomentY = {
      type: 'scatter',
      mode: 'lines',
      name: 'Bending Moment Y [Nm]',
      x: updatedChartData.map(item => item.x),
      y: updatedChartData.map(item => item.bendingMomentY),
      line: { color: '#006400' },
      yaxis: 'y3',
      
      stroke: {
        width: 1,
      },
    };
    const updatedTraceBendingMomentX = {
      type: 'scatter',
      mode: 'lines',
      name: 'Bending Moment X [Nm]',
      x: updatedChartData.map(item => item.x),
      y: updatedChartData.map(item => item.bendingMomentX),
      line: { color: '#FFA500' },
    
      yaxis: 'y3', // Share the y-axis with bending moment Y
      stroke: { width: 1 },
    };
    const updatedTraceTemperature = {
      type: 'scatter',
      mode: 'lines',
      name: 'Temperature [°C]',
      x: updatedChartData.map(item => item.x),
      y: updatedChartData.map(item => item.temperature),
      line: { color: '#ff0000' },
      
      yaxis: 'y4',
      stroke: {
        width: 1,
      },
    };
  
    Plotly.addTraces(chartRef.current, [updatedTraceTension, updatedTraceTorsion, updatedTraceBendingMomentY, updatedTraceBendingMomentX, updatedTraceTemperature]);
  
  };

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
  const toggleAveraging = () => {
    setAveragingEnabled(!averagingEnabled); // Toggle averaging state
  
   if (!averagingEnabled) {
      if (!originalChartData) {
        setOriginalChartData(chartData);
      }
      setShowToast(true);
      setToastMessage('Processing averaging...');
      
      // Simulate a delay for processing
      setTimeout(() => {
        handleCalculateRollingAverage();
        setShowToast(false);
      }, 2000); // Adjust this value based on your actual processing time
    } else {
      setChartData(originalChartData);
      setOriginalChartData(null);
    }
  };


  LineGraph.handleDownloadImage = () => {
    // Get the chart as a base64 encoded PNG image
    const plotlyElement = chartRef.current;
    Plotly.toImage(plotlyElement, { format: 'png', height: 700, width: 1800 })
      .then(function (url) {
        // Create an anchor element to trigger the download
        const link = document.createElement('a');
        link.href = url;
        link.download = 'chart.png'; // You can change the filename as needed
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    
        // Log the URL of the image
        console.log('Chart screenshot URL:', url);
        
        return Plotly.toImage(plotlyElement, { format: 'png', height: 700, width: 1800 });
      });
  };

//''''from here below useeffect is used to resize 
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
//''''below is code to make resposive based on the window size for recordbutton,compare button ,image to clipboard button, reload originaldata button''''//
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
//''below is code to make resposive based on the window size for input box,selectoption button,averaging enable  button''//
  const getResponsiveButtonStyle = useMemo(() => (baseWidth, baseHeight) => {
    const scaleFactor = windowWidth / 1920; // Assuming 1920px as the base width
    return {
      width: `${Math.max(baseWidth * scaleFactor, baseWidth * 0.7)}px`,
      height: `${Math.max(baseHeight * scaleFactor, baseHeight * 0.7)}px`,
      fontSize: `${Math.max(14 * scaleFactor, 10)}px`,
    };
  }, [windowWidth]);

  const getResponsiveStyle = useMemo(() => (baseWidth, baseHeight, fontSize) => {
    const scaleFactor = windowWidth / 1920; // Assuming 1920px as the base width
    return {
      width: `${Math.max(baseWidth * scaleFactor, baseWidth * 0.7)}px`,
      height: `${Math.max(baseHeight * scaleFactor, baseHeight * 0.7)}px`,
      fontSize: `${Math.max(fontSize * scaleFactor, fontSize * 0.7)}px`,
    };
  }, [windowWidth]);

  // Apply responsive styles to buttons
  const imageClipboardStyle = useMemo(() => ({
    ...getResponsiveButtonStyle(150, 48),
    position: 'relative',
    left: '80%',
    bottom: '50%',
  }), [getResponsiveButtonStyle]);

  const reloadChartDataStyle = useMemo(() => ({
    ...getResponsiveButtonStyle(150, 48),
    position: 'relative',
    bottom: '50%',
    left: '38%',
  }), [getResponsiveButtonStyle]);

  const recordButtonStyle = useMemo(() => ({
    ...getResponsiveButtonStyle(150, 40),
    position: 'absolute',
    top: '80px',
    right: '50px',
  }), [getResponsiveButtonStyle]);

  const compareButtonStyle = useMemo(() => ({
    ...getResponsiveButtonStyle(150, 40),
    position: 'absolute',
    top: '190px',
    right: '50px',
  }), [getResponsiveButtonStyle]);
  
  const windowSizeInputStyle = useMemo(() => ({
    ...getResponsiveStyle(50, 40, 14),
    position: 'relative',
    left: '75%',
    bottom: '480px',
  }), [getResponsiveStyle]);

  const averagingButtonStyle = useMemo(() => ({
    ...getResponsiveStyle(120, 40, 14),
    position: 'relative',
    left: '85%',
    bottom: '480px',
    background: averagingEnabled ? 'green' : 'white',
  }), [getResponsiveStyle, averagingEnabled]);

  const selectStyle = useMemo(() => ({
    ...getResponsiveStyle(120, 40, 14),
    position: 'relative',
    left: '70%',
    bottom: '480px',
  }), [getResponsiveStyle]);


  return (
    <div 
      style={{
        display: isOtherWindowOpen ? 'none' : 'block',
        position: 'relative',
        zIndex: 2,
        opacity: 1,
        top: '55px',
        left:'70px',
        Resolution: {resolution},
              maxWidth: '95%',
        maxHeight: '120vh',
        overflow:'hidden',
     
      }}
    
      className= {isOtherWindowOpen ? 'hidden' : 'block' } 
    >   

 <div 
  style={{
    boxShadow: '0 6px 8px rgba(0, 0, 0, 0.15), 0 3px 6px rgba(0, 0, 0, 0.1)',
    width: '70%',
    border: 'solid 1px gray',
    overflow: 'hidden',  // Prevents content from spilling out
    padding: '10px',     // Adds some space inside the border
    boxSizing: 'border-box'  // Includes padding in the width calculation
  }}
  ref={chartRef}
/>

      <div>
      <CursorValuesTable cursorValues={cursorValues}  />
      <div style={{position:'relative',bottom:'470px',left:'75%'}}>
      <FilterComponent  onFilterChange={handleFilterChange} />
      </div>
      
      <input
        type="number"
        value={windowSize}
        onChange={(e) => setWindowSize(parseInt(e.target.value))}
        className="border border-black text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-black"
        style={windowSizeInputStyle}
      />
      
      <button
        onClick={toggleAveraging}
        className="border border-black text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-black"
        style={averagingButtonStyle}
      >
        {averagingEnabled ? 'Averaging off' : 'Averaging On'}
      </button>

      <select 
        value={calculationType} 
        onChange={(e) => setCalculationType(e.target.value)}
        style={selectStyle}
        className="border border-black text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black-300 focus:ring-black"
      >
        <option value="average">Average</option>
        <option value="median">Median</option>
      </select>

      

      <div>
      <ViewBoundsToggle 
  chartRef={chartRef} 
  leftLinePosition={leftLinePosition} 
  setLeftLinePosition={setLeftLinePosition} 
  rightLinePosition={rightLinePosition} 
  setRightLinePosition={setRightLinePosition}  
  chartData={chartData} 
  resolution={resolution}
  setChartData={setChartData}
  originalChartData={originalChartData} // Pass the originalChartData state here
  setOriginalChartData={setOriginalChartData} 
/> 
  
   </div>
  {showToast && (
          <Toast message={toastMessage} onClose={() => setShowToast(false)} />
        )}

        
<div className="border border-black p-4 rounded-lg shadow-lg" style={{ display: 'inline-block', position: 'relative', left:'50%', bottom:'1015px', width:'800px', height:'325px', boxShadow: '0 6px 8px rgba(0, 0, 0, 0.15), 0 3px 6px rgba(0, 0, 0, 0.1)' }}>  
        <button 
          onClick={LineGraph.handleDownloadImage}  
          className="border border-black text-sm font-medium rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-black" 
          style={imageClipboardStyle}
        >
          Image clipboard
        </button>
        
        <button 
          onClick={reloadChartData} 
          className="border border-black text-sm font-medium rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-black" 
          style={reloadChartDataStyle}
        >
          Reload Chart Data
        </button> 
          
        <button 
          onClick={handleSaveRecords} 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-offset-2" 
          style={recordButtonStyle}
        >
          Record
        </button>
      
    
      <SaveFiles selectedFiles={selectedFilesForSaving}   />
      <Popup isOpen={isPopupOpen} onClose={handleClosePopup} selectedFiles={selectedFilesForSaving} />
      {/* Button to compare selected files */}
   
      <button 
          onClick={handleOpenPopup} 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-offset-2" 
          style={compareButtonStyle}
        >
          Compare
        </button>
 
    </div>
  
 
    </div>
    </div>
  );
};


export { LineGraph };

