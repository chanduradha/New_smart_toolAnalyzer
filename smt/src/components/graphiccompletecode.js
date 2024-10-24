
// //""""""complete correct working code including showzeropoint,ditsancepoint,Angle also correctly calculating and displaying """"""""""""""
// import React, { useEffect, useRef, useState } from 'react';
// import Dygraph from 'dygraphs';

// const PolarPlot = ({ isVisible, onClose }) => {
//   const [files, setFiles] = useState([]);
//   const [selectedFiles, setSelectedFiles] = useState([]);
//   const graphContainerRef = useRef([]);
//   const [distances, setDistances] = useState(Array(6).fill(0));
//   const [calculateDistances, setCalculateDistances] = useState(false);
//   const [graphData, setGraphData] = useState(Array(6).fill(null));
//   const [dataStatus, setDataStatus] = useState(Array(6).fill(''));
//   const [showCenterPoint, setShowCenterPoint] = useState(false);
//   const [centerOfGravity, setCenterOfGravity] = useState(Array(6).fill({ x: 0, y: 0 }));
//   const [showAngle, setShowAngle] = useState(false);
//   const [angles, setAngles] = useState(Array(6).fill(0));
//   const colorPalette = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF'];

//   const zoomFactor = 1.2;

//   const placeholderData = Array(6).fill().map(() => [
//     [0, 0], [1, 1], [-1, -1], [1, -1], [-1, 1]
//   ]);

//   const handleFolderUpload = (e) => {
//     const selectedFiles = Array.from(e.target.files);
//     setFiles(selectedFiles);
//   };

//   const handleFileSelection = (file, index) => {
//     const reader = new FileReader();
//     reader.onload = (e) => {
//       const fileData = e.target.result;
//       processFileData(fileData, file.name, index);
//     };
//     reader.readAsText(file);
//   };

//   const processFileData = (fileData, fileName, index) => {
//     const rows = fileData.split('\n');
//     let data = [];
//     let minX = Infinity;
//     let maxX = -Infinity;
//     let minY = Infinity;
//     let maxY = -Infinity;

//     for (let i = 0; i < rows.length; i++) {
//       const line = rows[i].trim();
//       if (line.startsWith('Tension;Torsion;Bending moment X;Bending moment Y;Time;Temperature')) {
//         for (let j = i + 1; j < rows.length; j++) {
//           const rowData = rows[j].split(';').map(item => parseFloat(item.replace(',', '.')));
//           if (rowData.length === 6) {
//             const xValue = rowData[2]; // Bending moment X
//             const yValue = rowData[3]; // Bending moment Y
//             if (!isNaN(xValue) && !isNaN(yValue)) {
//               data.push([xValue, yValue]);
//               minX = Math.min(minX, xValue);
//               maxX = Math.max(maxX, xValue);
//               minY = Math.min(minY, yValue);
//               maxY = Math.max(maxY, yValue);
//             }
//           }
//         }
//         break;
//       }
//     }

//     if (data.length > 0) {
//       setGraphData(prevData => {
//         const newData = [...prevData];
//         newData[index] = { data, fileName, minX, maxX, minY, maxY };
//         return newData;
//       });
//       setDataStatus(prevStatus => {
//         const newStatus = [...prevStatus];
//         newStatus[index] = 'ALL';
//         return newStatus;
//       });
//     }
//   };

//   const createOrUpdateGraph = (index) => {
//     const graphContainer = graphContainerRef.current[index];
//     const data = graphData[index];
  
//     if (graphContainer) {
//       const existingDygraph = graphContainer.dygraph;
//       const plotData = data ? data.data : placeholderData[index];
//       const fileName = data ? data.fileName : `Placeholder ${index + 1}`;
//       const minX = data ? data.minX : -1;
//       const maxX = data ? data.maxX : 1;
//       const minY = data ? data.minY : -1;
//       const maxY = data ? data.maxY : 1;

//       // Calculate the distance to center of gravity
//       let distanceToCoG = 0;
//       let centerX = 0;
//       let centerY = 0;
//       if (data) {
//         centerX = plotData.reduce((sum, point) => sum + point[0], 0) / plotData.length;
//         centerY = plotData.reduce((sum, point) => sum + point[1], 0) / plotData.length;
//         distanceToCoG = Math.sqrt(Math.pow(centerX, 2) + Math.pow(centerY, 2));
//       }

//       // Set the y-axis range to include the distance value
//       const yAxisMax = Math.max(maxY, distanceToCoG, centerY);
//       const yAxisMin = Math.min(minY, -distanceToCoG, centerY);
  
//       const graphOptions = {
//         labels: ['Bending moment X', 'Bending moment Y', 'Distance', 'Center Point'],
//         series: {
//           'Bending moment Y': {
//             strokeWidth: 0.0,
//             drawPoints: true,
//             pointSize: 1.5,
//             highlightCircleSize: 7,
//           },
//           'Distance': {
//             strokeWidth: 0,
//             drawPoints: true,
//             pointSize: 5,
//             color: 'green',
//           },
//           'Center Point': {
//             strokeWidth: 0,
//             drawPoints: true,
//             pointSize: 5,
//             color: 'red',
//           },
//         },
//         title: `Polar Plot - ${fileName}`,
//         showLabelsOnHighlight: false,
//         xlabel: 'Bending moment X',
//         ylabel: 'Bending moment Y / Distance',
//         ylabelWidth: 100,
//         drawPoints: true,
//         strokeWidth: 0.0,
//         pointSize: 1.5,
//         highlightCircleSize: 7,
//         colors: [colorPalette[index % colorPalette.length], 'green', 'red'],
//         width: 300,
//         height: 300,
//         gridLineColor: 'transparent',
//         dateWindow: [minX, maxX],
//         axes: {
//           x: {
//             axisLabelFormatter: (d) => isNaN(d) ? '' : d.toFixed(3),
//             valueFormatter: (x) => isNaN(x) ? '' : x.toFixed(3),
//             drawGrid: false,
//             valueRange: [minX, maxX],
//             pixelsPerLabel: 30,
//             axisLabelWidth: 50,
//           },
//           y: {
//             axisLabelFormatter: (d) => isNaN(d) ? '' : d.toFixed(3),
//             valueFormatter: (y) => isNaN(y) ? '' : y.toFixed(3),
//             drawGrid: false,
//             valueRange: [yAxisMin, yAxisMax],
//             pixelsPerLabel: 30,
//             axisLabelWidth: 50,
//           }
//         },
//          underlayCallback: (canvas, area, g) => {
//           canvas.save();
//           canvas.setLineDash([5, 5]);
//           canvas.strokeStyle = 'rgba(128, 128, 128, 0.5)';
//           canvas.lineWidth = 1;

//           // Draw vertical line at x = 0
//           const centerX = g.toDomXCoord(0);
//           canvas.beginPath();
//           canvas.moveTo(centerX, area.y);
//           canvas.lineTo(centerX, area.y + area.h);
//           canvas.stroke();

//           // Draw horizontal line at y = 0
//           const centerY = g.toDomYCoord(0);
//           canvas.beginPath();
//           canvas.moveTo(area.x, centerY);
//           canvas.lineTo(area.x + area.w, centerY);
//           canvas.stroke();

//           canvas.restore();
//         },
//         highlightCallback: (event, x, points) => {
//           const existingTooltip = document.querySelector('.tooltip');
//           if (existingTooltip) {
//             existingTooltip.remove();
//           }

//           if (points.length > 0) {
//             const tooltip = document.createElement('div');
//             tooltip.className = 'tooltip fixed bg-white border border-gray-300 p-2 rounded shadow-md text-sm';
//             tooltip.style.position = 'absolute';
//             tooltip.style.left = `${event.pageX + 10}px`;
//             tooltip.style.top = `${event.pageY + 10}px`;
//             tooltip.innerHTML = `X: ${points[0].xval.toFixed(3)}, Y: ${points[0].yval.toFixed(3)}`;
//             document.body.appendChild(tooltip);

//             const removeTooltip = () => {
//               if (document.body.contains(tooltip)) {
//                 document.body.removeChild(tooltip);
//               }
//               graphContainer.removeEventListener('mouseout', removeTooltip);
//             };

//             graphContainer.addEventListener('mouseout', removeTooltip);
//           }
//         },
//         drawCallback: (g) => {
//           if (showAngle) {
//             const canvas = g.hidden_;
//             const ctx = canvas.getContext('2d');
//             const centerX = g.toDomXCoord(centerOfGravity[index].x);
//             const centerY = g.toDomYCoord(centerOfGravity[index].y);
            
//             ctx.beginPath();
//             ctx.moveTo(centerX, centerY);
//             const angle = angles[index] * (Math.PI / 180);
//             const lineLength = 100;
//             const endX = centerX + lineLength * Math.cos(angle);
//             const endY = centerY - lineLength * Math.sin(angle);
//             ctx.lineTo(endX, endY);
//             ctx.strokeStyle = 'purple';
//             ctx.lineWidth = 2;
//             ctx.stroke();
//           }
//         }
//       };

//       // Prepare the data for Dygraph, including the distance line and center point
//       const dygraphData = plotData.map(point => [point[0], point[1], null, null]);
//       if (calculateDistances && !showCenterPoint && data) {
//         dygraphData.push([0, null, distanceToCoG, null]);
//         dygraphData.push([maxX, null, distanceToCoG, null]);
//       }
//       if (showCenterPoint && !calculateDistances) {
//         dygraphData.push([centerX, null, null, centerY]);
//       }

//       if (existingDygraph) {
//         existingDygraph.updateOptions({
//           file: dygraphData,
//           ...graphOptions
//         });
//       } else {
//         const dygraph = new Dygraph(graphContainer, dygraphData, graphOptions);

//         graphContainer.dygraph = dygraph;

//         graphContainer.addEventListener('wheel', (e) => {
//           e.preventDefault();
//           const zoomAmount = e.deltaY < 0 ? zoomFactor : 1 / zoomFactor;
//           const xRange = dygraph.xAxisRange()[1] - dygraph.xAxisRange()[0];
//           const yRange = dygraph.yAxisRange()[1] - dygraph.yAxisRange()[0];

//           const newXRange = xRange * zoomAmount;
//           const newYRange = yRange * zoomAmount;

//           const mouseX = e.offsetX / graphContainer.clientWidth;
//           const mouseY = e.offsetY / graphContainer.clientHeight;

//           const newXRangeStart = dygraph.xAxisRange()[0] + (xRange - newXRange) * mouseX;
//           const newXRangeEnd = dygraph.xAxisRange()[1] - (xRange - newXRange) * (1 - mouseX);

//           const newYRangeStart = dygraph.yAxisRange()[0] + (yRange - newYRange) * mouseY;
//           const newYRangeEnd = dygraph.yAxisRange()[1] - (yRange - newYRange) * (1 - mouseY);

//           dygraph.updateOptions({
//             dateWindow: [newXRangeStart, newXRangeEnd],
//             valueRange: [newYRangeStart, newYRangeEnd],
//           });
//         });
//       }

//       if (data) {
//         setCenterOfGravity(prev => {
//           const newCenterOfGravity = [...prev];
//           newCenterOfGravity[index] = {y: centerY };
//           return newCenterOfGravity;
//         });

//         setDistances(prev => {
//           const updatedDistances = [...prev];
//           updatedDistances[index] = distanceToCoG;
//           return updatedDistances;
//         });

//         graphContainer.addEventListener('mousemove', (e) => {
//           if (showAngle) {
//             const rect = graphContainer.getBoundingClientRect();
//             const x = e.clientX - rect.left;
//             const y = e.clientY - rect.top;
//             const centerX = existingDygraph.toDomXCoord(centerOfGravity[index].x);
//             const centerY = existingDygraph.toDomYCoord(centerOfGravity[index].y);
            
//             let angle = Math.atan2(centerY - y, x - centerX) * (180 / Math.PI);
//             angle = (angle + 360) % 360;
            
//             setAngles(prev => {
//               const newAngles = [...prev];
//               newAngles[index] = angle;
//               return newAngles;
//             });
            
//             existingDygraph.updateOptions({});
//           }
//         });
//       }
//     }
//   };

//   useEffect(() => {
//     graphData.forEach((data, index) => {
//       createOrUpdateGraph(index);
//     });
//   }, [graphData, calculateDistances, showCenterPoint, showAngle, angles]);

//   useEffect(() => {
//     const newGraphData = Array(6).fill(null);
//     selectedFiles.forEach((file, index) => {
//       handleFileSelection(file, index);
//     });
//     setGraphData(newGraphData);
//   }, [selectedFiles]);

//   const handleFileToggle = (file) => {
//     setSelectedFiles(prev => {
//       const isSelected = prev.includes(file);
//       let newSelectedFiles;
//       if (isSelected) {
//         newSelectedFiles = prev.filter(f => f !== file);
//       } else {
//         newSelectedFiles = [...prev, file];
//       }
      
//       const newGraphData = Array(6).fill(null);
//       newSelectedFiles.forEach((selectedFile, index) => {
//         const existingDataIndex = graphData.findIndex(data => data && data.fileName === selectedFile.name);
//         if (existingDataIndex !== -1) {
//           newGraphData[index] = graphData[existingDataIndex];
//         }
//       });
      
//       setGraphData(newGraphData);
//       return newSelectedFiles;
//     });
//   };

// return (
//     <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center ${isVisible ? '' : 'hidden'}`}>
//       <div className="bg-[#f1f1f1] p-4 rounded-md relative" style={{ width: '100%', maxWidth: '3000px', height: '100%', maxHeight: '1400px' }} onClick={(e) => e.stopPropagation()}>
//         <div className="grid grid-cols-3 gap-4" style={{ height: '900px', position: 'absolute', top: '100px', width: '2200px' }}>
//           {Array.from({ length: 6 }).map((_, index) => (
//             <div key={index} className="my-4" style={{border:'5px groove lightgray'}}>
//               <h2 className="text-xl font-bold">Graph {index + 1}</h2>
//               <div ref={(el) => graphContainerRef.current[index] = el} style={{ width: '100%', height: '500px' }}></div>
//               <div className="mt-2 flex justify-between">
//                 <div>
//                   <span className="font-bold">Distance to CoG:</span>
//                   <input
//                     type="text"
//                     value={calculateDistances ? distances[index].toFixed(2) : 'N/A'}
//                     readOnly
//                     className="ml-2 p-1 border border-gray-300 rounded-md"
//                   />
//                 </div>
//                 <div>
//                   <span className="font-bold mr-2">Data Status:</span>
//                   <input
//                     type="text"
//                     value={dataStatus[index] || ''}
//                     readOnly
//                     className="p-1 border border-300 rounded-md"
//                   />
//                 </div>
//                 <div>
//                   <span className="font-bold mr-2">Filter:</span>
//                   <input
//                     type="text"
//                     value="1"
//                     readOnly
//                     className="p-1 border border-gray-300 rounded-md w-8 text-center"
//                   />
//                 </div>
//                 {showAngle && (
//                   <div>
//                     <span className="font-bold mr-2">Angle:</span>
//                     <input
//                       type="text"
//                       value={angles[index].toFixed(2)}
//                       readOnly
//                       className="p-1 border border-gray-300 rounded-md w-16 text-center"
//                     />
//                   </div>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//         <div className="absolute top-0 right-0 mt-4 mr-4 flex flex-col border-2 border-gray-800 p-2 rounded-md" style={{ width: '500px' }}>
//           <input
//             type="file"
//             webkitdirectory="true"
//             multiple
//             onChange={handleFolderUpload}
//             className="mb-4"
//           />
//           <div className="overflow-y-auto h-32 mb-4 border border-gray-400 rounded-md p-2">
//             {files.map((file, index) => (
//               <div key={index} className="flex items-center mb-2">
//                 <input
//                   type="checkbox"
//                   checked={selectedFiles.includes(file)}
//                   onChange={() => handleFileToggle(file)}
//                   className="mr-2"
//                 />
//                 <span>{file.name}</span>
//               </div>
//             ))}
//           </div>
//           <div className="flex justify-end">
//             <button onClick={onClose} className="p-2 text-white bg-gray-800 rounded-md">
//               Close
//             </button>
//           </div>
//         </div>
//         <button
//           onClick={() => {
//             setCalculateDistances(prev => !prev);
//             if (showCenterPoint) setShowCenterPoint(false);
//             if (showAngle) setShowAngle(false);
//           }}
//           className="p-2 mt-4 text-white bg-blue-600 rounded-md"
//           style={{ position: 'absolute', left: '90%', top: '1000px', width: '200px', height: '60px' }}
//         >
//           {calculateDistances ? 'Hide Distances' : 'Show Distances'}
//         </button>
//         <button
//           onClick={() => {
//             setShowCenterPoint(prev => !prev);
//             if (calculateDistances) setCalculateDistances(false);
//             if (showAngle) setShowAngle(false);
//           }}
//           className="p-2 mt-4 text-white bg-green-600 rounded-md"
//           style={{ position: 'absolute', left: '90%', top: '1080px', width: '200px', height: '60px' }}
//         >
//           {showCenterPoint ? 'Hide Center Point' : 'Show Center Point'}
//         </button>
//         <button
//           onClick={() => {
//             setShowAngle(prev => !prev);
//             if (calculateDistances) setCalculateDistances(false);
//             if (showCenterPoint) setShowCenterPoint(false);
//           }}
//           className="p-2 mt-4 text-white bg-purple-600 rounded-md"
//           style={{ position: 'absolute', left: '90%', top: '1160px', width: '200px', height: '60px' }}
//         >
//           {showAngle ? 'Hide Angle' : 'Show Angle'}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default PolarPlot;




//"""""""""this below code is distance trace calulated and dashedline which is plotting on graph behind the graphdata"""""""""""""
// import React, { useEffect, useRef, useState } from 'react';
// import Dygraph from 'dygraphs';

// const PolarPlot = ({ isVisible, onClose }) => {
//   const [files, setFiles] = useState([]);
//   const [selectedFiles, setSelectedFiles] = useState([]);
//   const graphContainerRef = useRef([]);
//   const [distances, setDistances] = useState(Array(6).fill(0));
//   const [calculateDistances, setCalculateDistances] = useState(false);
//   const [graphData, setGraphData] = useState(Array(6).fill(null));
//   const [dataStatus, setDataStatus] = useState(Array(6).fill(''));
//   const [showCenterPoint, setShowCenterPoint] = useState(false);
//   const [centerOfGravity, setCenterOfGravity] = useState(Array(6).fill({ x: 0, y: 0 }));

//   const zoomFactor = 1.2;

//   const placeholderData = Array(6).fill().map(() => [
//     [0, 0], [1, 1], [-1, -1], [1, -1], [-1, 1]
//   ]);

//   const handleFolderUpload = (e) => {
//     const selectedFiles = Array.from(e.target.files);
//     setFiles(selectedFiles);
//   };

//   const handleFileSelection = (file, index) => {
//     const reader = new FileReader();
//     reader.onload = (e) => {
//       const fileData = e.target.result;
//       processFileData(fileData, file.name, index);
//     };
//     reader.readAsText(file);
//   };

//   const processFileData = (fileData, fileName, index) => {
//     const rows = fileData.split('\n');
//     let data = [];
//     let minX = Infinity;
//     let maxX = -Infinity;
//     let minY = Infinity;
//     let maxY = -Infinity;

//     for (let i = 0; i < rows.length; i++) {
//       const line = rows[i].trim();
//       if (line.startsWith('Tension;Torsion;Bending moment X;Bending moment Y;Time;Temperature')) {
//         for (let j = i + 1; j < rows.length; j++) {
//           const rowData = rows[j].split(';').map(item => parseFloat(item.replace(',', '.')));
//           if (rowData.length === 6) {
//             const xValue = rowData[2]; // Bending moment X
//             const yValue = rowData[3]; // Bending moment Y
//             if (!isNaN(xValue) && !isNaN(yValue)) {
//               data.push([xValue, yValue]);
//               minX = Math.min(minX, xValue);
//               maxX = Math.max(maxX, xValue);
//               minY = Math.min(minY, yValue);
//               maxY = Math.max(maxY, yValue);
//             }
//           }
//         }
//         break;
//       }
//     }

//     if (data.length > 0) {
//       setGraphData(prevData => {
//         const newData = [...prevData];
//         newData[index] = { data, fileName, minX, maxX, minY, maxY };
//         return newData;
//       });
//       setDataStatus(prevStatus => {
//         const newStatus = [...prevStatus];
//         newStatus[index] = 'ALL';
//         return newStatus;
//       });
//     }
//   };

//   const createOrUpdateGraph = (index) => {
//     const graphContainer = graphContainerRef.current[index];
//     const data = graphData[index];
  
//     if (graphContainer) {
//       const existingDygraph = graphContainer.dygraph;
//       const plotData = data ? data.data : placeholderData[index];
//       const fileName = data ? data.fileName : `Placeholder ${index + 1}`;
//       const minX = data ? data.minX : -1;
//       const maxX = data ? data.maxX : 1;
//       const minY = data ? data.minY : -1;
//       const maxY = data ? data.maxY : 1;

//       // Calculate the distance to center of gravity
//       let distanceToCoG = 0;
//       if (data) {
//         const centerX = plotData.reduce((sum, point) => sum + point[0], 0) / plotData.length;
//         const centerY = plotData.reduce((sum, point) => sum + point[1], 0) / plotData.length;
//         distanceToCoG = Math.sqrt(Math.pow(centerX, 2) + Math.pow(centerY, 2));
//       }

//       // Set the y-axis range to include the distance value
//       const yAxisMax = Math.max(maxY, distanceToCoG);
//       const yAxisMin = Math.min(minY, -distanceToCoG);
  
//       const graphOptions = {
//         labels: ['Bending moment X', 'Bending moment Y'],
//         title: `Polar Plot - ${fileName}`,
//         showLabelsOnHighlight: false,
//         xlabel: 'Bending moment X',
//         ylabel: 'Bending moment Y / Distance',
//         ylabelWidth: 100,
//         drawPoints: true,
//         strokeWidth: 0.0,
//         pointSize: 1.5,
//         highlightCircleSize: 7,
//         colors: ['#a01dc0'],
//         width: 300,
//         height: 300,
//         gridLineColor: 'transparent',
//         dateWindow: [minX, maxX],
//         axes: {
//           x: {
//             axisLabelFormatter: (d) => isNaN(d) ? '' : d.toFixed(3),
//             valueFormatter: (x) => isNaN(x) ? '' : x.toFixed(3),
//             drawGrid: false,
//             valueRange: [minX, maxX],
//             pixelsPerLabel: 30,
//             axisLabelWidth: 50,
//           },
//           y: {
//             axisLabelFormatter: (d) => isNaN(d) ? '' : d.toFixed(3),
//             valueFormatter: (y) => isNaN(y) ? '' : y.toFixed(3),
//             drawGrid: false,
//             valueRange: [yAxisMin, yAxisMax],
//             pixelsPerLabel: 30,
//             axisLabelWidth: 50,
//           }
//         },
//         underlayCallback: (canvas, area, g) => {
//           const zeroX = g.toDomXCoord(0);
//           const zeroY = g.toDomYCoord(0);
//           canvas.beginPath();
//           canvas.setLineDash([5, 5]);
//           canvas.strokeStyle = 'red';
//           canvas.moveTo(area.x, zeroY);
//           canvas.lineTo(area.x + area.w, zeroY);
//           canvas.stroke();
//           canvas.moveTo(zeroX, area.y);
//           canvas.lineTo(zeroX, area.y + area.h);
//           canvas.stroke();

//           if (showCenterPoint) {
//             canvas.beginPath();
//             canvas.arc(zeroX, zeroY, 8, 0, 2 * Math.PI);
//             canvas.fillStyle = 'red';
//             canvas.fill();
//           }

//           if (calculateDistances && data) {
//             const centerX = centerOfGravity[index].x;
//             const centerY = centerOfGravity[index].y;
//             const centerXPx = g.toDomXCoord(centerX);
//             const centerYPx = g.toDomYCoord(centerY);

//             // Draw the center of gravity point
//             canvas.beginPath();
//             canvas.arc(centerXPx, centerYPx, 5, 0, 2 * Math.PI);
//             canvas.fillStyle = 'green';
//             canvas.fill();

//             // Draw the distance point
//             const distanceXPx = g.toDomXCoord(0);
//             const distanceYPx = g.toDomYCoord(distanceToCoG);
//             canvas.beginPath();
//             canvas.arc(distanceXPx, distanceYPx, 5, 0, 2 * Math.PI);
//             canvas.fillStyle = 'green';
//             canvas.fill();

//             // Draw the distance line
//             canvas.beginPath();
//             canvas.setLineDash([5, 5]);
//             canvas.strokeStyle = 'green';
//             canvas.moveTo(area.x, distanceYPx);
//             canvas.lineTo(area.x + area.w, distanceYPx);
//             canvas.stroke();

//             // Label the distance line
//             canvas.fillStyle = 'green';
//             canvas.fillText(`Distance: ${distanceToCoG.toFixed(2)}`, area.x + 10, distanceYPx - 5);
//           }
//         },
//         highlightCallback: (event, x, points) => {
//           const existingTooltip = document.querySelector('.tooltip');
//           if (existingTooltip) {
//             existingTooltip.remove();
//           }

//           if (points.length > 0) {
//             const tooltip = document.createElement('div');
//             tooltip.className = 'tooltip fixed bg-white border border-gray-300 p-2 rounded shadow-md text-sm';
//             tooltip.style.position = 'absolute';
//             tooltip.style.left = `${event.pageX + 10}px`;
//             tooltip.style.top = `${event.pageY + 10}px`;
//             tooltip.innerHTML = `X: ${points[0].xval.toFixed(3)}, Y: ${points[0].yval.toFixed(3)}`;
//             document.body.appendChild(tooltip);

//             const removeTooltip = () => {
//               if (document.body.contains(tooltip)) {
//                 document.body.removeChild(tooltip);
//               }
//               graphContainer.removeEventListener('mouseout', removeTooltip);
//             };

//             graphContainer.addEventListener('mouseout', removeTooltip);
//           }
//         }
//       };

//       if (existingDygraph) {
//         existingDygraph.updateOptions({
//           file: plotData,
//           ...graphOptions
//         });
//       } else {
//         const dygraph = new Dygraph(graphContainer, plotData, graphOptions);

//         graphContainer.dygraph = dygraph;

//         graphContainer.addEventListener('wheel', (e) => {
//           e.preventDefault();
//           const zoomAmount = e.deltaY < 0 ? zoomFactor : 1 / zoomFactor;
//           const xRange = dygraph.xAxisRange()[1] - dygraph.xAxisRange()[0];
//           const yRange = dygraph.yAxisRange()[1] - dygraph.yAxisRange()[0];

//           const newXRange = xRange * zoomAmount;
//           const newYRange = yRange * zoomAmount;

//           const mouseX = e.offsetX / graphContainer.clientWidth;
//           const mouseY = e.offsetY / graphContainer.clientHeight;

//           const newXRangeStart = dygraph.xAxisRange()[0] + (xRange - newXRange) * mouseX;
//           const newXRangeEnd = dygraph.xAxisRange()[1] - (xRange - newXRange) * (1 - mouseX);

//           const newYRangeStart = dygraph.yAxisRange()[0] + (yRange - newYRange) * mouseY;
//           const newYRangeEnd = dygraph.yAxisRange()[1] - (yRange - newYRange) * (1 - mouseY);

//           dygraph.updateOptions({
//             dateWindow: [newXRangeStart, newXRangeEnd],
//             valueRange: [newYRangeStart, newYRangeEnd],
//           });
//         });
//       }

//       if (data) {
//         const centerX = plotData.reduce((sum, point) => sum + point[0], 0) / plotData.length;
//         const centerY = plotData.reduce((sum, point) => sum + point[1], 0) / plotData.length;

//         setCenterOfGravity(prev => {
//           const newCenterOfGravity = [...prev];
//           newCenterOfGravity[index] = { x: centerX, y: centerY };
//           return newCenterOfGravity;
//         });

//         setDistances(prev => {
//           const updatedDistances = [...prev];
//           updatedDistances[index] = distanceToCoG;
//           return updatedDistances;
//         });
//       }
//     }
//   };

//   useEffect(() => {
//     graphData.forEach((data, index) => {
//       createOrUpdateGraph(index);
//     });
//   }, [graphData, calculateDistances, showCenterPoint]);

//   useEffect(() => {
//     const newGraphData = Array(6).fill(null);
//     selectedFiles.forEach((file, index) => {
//       handleFileSelection(file, index);
//     });
//     setGraphData(newGraphData);
//   }, [selectedFiles]);

//   const handleFileToggle = (file) => {
//     setSelectedFiles(prev => {
//       const isSelected = prev.includes(file);
//       let newSelectedFiles;
//       if (isSelected) {
//         newSelectedFiles = prev.filter(f => f !== file);
//       } else {
//         newSelectedFiles = [...prev, file];
//       }
      
//       const newGraphData = Array(6).fill(null);
//       newSelectedFiles.forEach((selectedFile, index) => {
//         const existingDataIndex = graphData.findIndex(data => data && data.fileName === selectedFile.name);
//         if (existingDataIndex !== -1) {
//           newGraphData[index] = graphData[existingDataIndex];
//         }
//       });
      
//       setGraphData(newGraphData);
//       return newSelectedFiles;
//     });
//   };

//   return (
//     <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center ${isVisible ? '' : 'hidden'}`}>
//       <div className="bg-[#f1f1f1] p-4 rounded-md relative" style={{ width: '100%', maxWidth: '3000px', height: '100%', maxHeight: '1400px' }} onClick={(e) => e.stopPropagation()}>
//         <div className="grid grid-cols-3 gap-4" style={{ height: '900px', position: 'absolute', top: '100px', width: '2200px' }}>
//           {Array.from({ length: 6 }).map((_, index) => (
//             <div key={index} className="my-4" style={{border:'5px groove lightgray'}}>
//               <h2 className="text-xl font-bold">Graph {index + 1}</h2>
//               <div ref={(el) => graphContainerRef.current[index] = el} style={{ width: '100%', height: '500px' }}></div>
//               <div className="mt-2 flex justify-between">
//                 <div>
//                   <span className="font-bold">Distance to CoG:</span>
//                   <input
//                     type="text"
//                     value={calculateDistances ? distances[index].toFixed(2) : 'N/A'}
//                     readOnly
//                     className="ml-2 p-1 border border-gray-300 rounded-md"
//                   />
//                 </div>
//                 <div>
//                   <span className="font-bold mr-2">Data Status:</span>
//                   <input
//                     type="text"
//                     value={dataStatus[index] || ''}
//                     readOnly
//                     className="p-1 border border-300 rounded-md"
//                   />
//                 </div>
//                 <div>
//                   <span className="font-bold mr-2">Filter:</span>
//                   <input
//                     type="text"
//                     value="1"
//                     readOnly
//                     className="p-1 border border-gray-300 rounded-md w-8 text-center"
//                   />
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//         <div className="absolute top-0 right-0 mt-4 mr-4 flex flex-col border-2 border-gray-800 p-2 rounded-md" style={{ width: '500px' }}>
//           <input
//             type="file"
//             webkitdirectory="true"
//             multiple
//             onChange={handleFolderUpload}
//             className="mb-4"
//           />
//           <div className="overflow-y-auto h-32 mb-4 border border-gray-400 rounded-md p-2">
//             {files.map((file, index) => (
//               <div key={index} className="flex items-center mb-2">
//                 <input
//                   type="checkbox"
//                   checked={selectedFiles.includes(file)}
//                   onChange={() => handleFileToggle(file)}
//                   className="mr-2"
//                 />
//                 <span>{file.name}</span>
//               </div>
//             ))}
//           </div>
//           <div className="flex justify-end">
//             <button onClick={onClose} className="p-2 text-white bg-gray-800 rounded-md">
//               Close
//             </button>
//           </div>
//         </div>
//         <button
//           onClick={() => setCalculateDistances(prev => !prev)}
//           className="p-2 mt-4 text-white bg-blue-600 rounded-md"
//           style={{ position: 'absolute', left: '90%', top: '1000px', width: '200px', height: '60px' }}
//         >
//           {calculateDistances ? 'Hide Distances' : 'Show Distances'}
//         </button>
//         <button
//           onClick={() => setShowCenterPoint(prev => !prev)}
//           className="p-2 mt-4 text-white bg-green-600 rounded-md"
//           style={{ position: 'absolute', left: '90%', top: '1080px', width: '200px', height: '60px' }}
//         >
//           {showCenterPoint ? 'Hide Center Point' : 'Show Center Point'}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default PolarPlot


//""""in this below code showzero point is coming initially but after graph data plotted above that data it is not showing """"""""//
// import React, { useEffect, useRef, useState } from 'react';
// import Dygraph from 'dygraphs';

// const PolarPlot = ({ isVisible, onClose }) => {
//   const [files, setFiles] = useState([]);
//   const [selectedFiles, setSelectedFiles] = useState([]);
//   const graphContainerRef = useRef([]);
//   const [distances, setDistances] = useState(Array(6).fill(0));
//   const [calculateDistances, setCalculateDistances] = useState(false);
//   const [graphData, setGraphData] = useState(Array(6).fill(null));
//   const [dataStatus, setDataStatus] = useState(Array(6).fill(''));
//   const [showCenterPoint, setShowCenterPoint] = useState(false);
//   const [centerOfGravity, setCenterOfGravity] = useState(Array(6).fill({ x: 0, y: 0 }));
//   const colorPalette = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF'];
//   const zoomFactor = 1.2;

//   const placeholderData = Array(6).fill().map(() => [
//     [0, 0], [1, 1], [-1, -1], [1, -1], [-1, 1]
//   ]);

//   const handleFolderUpload = (e) => {
//     const selectedFiles = Array.from(e.target.files);
//     setFiles(selectedFiles);
//   };

//   const handleFileSelection = (file, index) => {
//     const reader = new FileReader();
//     reader.onload = (e) => {
//       const fileData = e.target.result;
//       processFileData(fileData, file.name, index);
//     };
//     reader.readAsText(file);
//   };

//   const processFileData = (fileData, fileName, index) => {
//     const rows = fileData.split('\n');
//     let data = [];
//     let minX = Infinity;
//     let maxX = -Infinity;
//     let minY = Infinity;
//     let maxY = -Infinity;

//     for (let i = 0; i < rows.length; i++) {
//       const line = rows[i].trim();
//       if (line.startsWith('Tension;Torsion;Bending moment X;Bending moment Y;Time;Temperature')) {
//         for (let j = i + 1; j < rows.length; j++) {
//           const rowData = rows[j].split(';').map(item => parseFloat(item.replace(',', '.')));
//           if (rowData.length === 6) {
//             const xValue = rowData[2]; // Bending moment X
//             const yValue = rowData[3]; // Bending moment Y
//             if (!isNaN(xValue) && !isNaN(yValue)) {
//               data.push([xValue, yValue]);
//               minX = Math.min(minX, xValue);
//               maxX = Math.max(maxX, xValue);
//               minY = Math.min(minY, yValue);
//               maxY = Math.max(maxY, yValue);
//             }
//           }
//         }
//         break;
//       }
//     }

//     if (data.length > 0) {
//       setGraphData(prevData => {
//         const newData = [...prevData];
//         newData[index] = { data, fileName, minX, maxX, minY, maxY };
//         return newData;
//       });
//       setDataStatus(prevStatus => {
//         const newStatus = [...prevStatus];
//         newStatus[index] = 'ALL';
//         return newStatus;
//       });
//     }
//   };

//   const createOrUpdateGraph = (index) => {
//     const graphContainer = graphContainerRef.current[index];
//     const data = graphData[index];
  
//     if (graphContainer) {
//       const existingDygraph = graphContainer.dygraph;
//       const plotData = data ? data.data : placeholderData[index];
//       const fileName = data ? data.fileName : `Placeholder ${index + 1}`;
//       const minX = data ? data.minX : -1;
//       const maxX = data ? data.maxX : 1;
//       const minY = data ? data.minY : -1;
//       const maxY = data ? data.maxY : 1;

//       // Calculate the distance to center of gravity
//       let distanceToCoG = 0;
//       if (data) {
//         const centerX = plotData.reduce((sum, point) => sum + point[0], 0) / plotData.length;
//         const centerY = plotData.reduce((sum, point) => sum + point[1], 0) / plotData.length;
//         distanceToCoG = Math.sqrt(Math.pow(centerX, 2) + Math.pow(centerY, 2));
//       }

//       // Set the y-axis range to include the distance value
//       const yAxisMax = Math.max(maxY, distanceToCoG);
//       const yAxisMin = Math.min(minY, -distanceToCoG);
  
//       const graphOptions = {
//         labels: ['Bending moment X', 'Bending moment Y'],
//         title: `Polar Plot - ${fileName}`,
//         showLabelsOnHighlight: false,
//         xlabel: 'Bending moment X',
//         ylabel: 'Bending moment Y / Distance',
//         ylabelWidth: 100,
//         drawPoints: true,
//         strokeWidth: 0.0,
//         pointSize: 1.5,
//         highlightCircleSize: 7,
//         colors: [colorPalette[index % colorPalette.length]],
//         width: 300,
//         height: 300,
//         gridLineColor: 'transparent',
//         dateWindow: [minX, maxX],
//         axes: {
//           x: {
//             axisLabelFormatter: (d) => isNaN(d) ? '' : d.toFixed(3),
//             valueFormatter: (x) => isNaN(x) ? '' : x.toFixed(3),
//             drawGrid: false,
//             valueRange: [minX, maxX],
//             pixelsPerLabel: 30,
//             axisLabelWidth: 50,
//           },
//           y: {
//             axisLabelFormatter: (d) => isNaN(d) ? '' : d.toFixed(3),
//             valueFormatter: (y) => isNaN(y) ? '' : y.toFixed(3),
//             drawGrid: false,
//             valueRange: [yAxisMin, yAxisMax],
//             pixelsPerLabel: 30,
//             axisLabelWidth: 50,
//           }
//         },
//         underlayCallback: (canvas, area, g) => {
//           const zeroX = g.toDomXCoord(0);
//           const zeroY = g.toDomYCoord(0);
//           canvas.beginPath();
//           canvas.setLineDash([5, 5]);
//           canvas.strokeStyle = 'red';
//           canvas.moveTo(area.x, zeroY);
//           canvas.lineTo(area.x + area.w, zeroY);
//           canvas.stroke();
//           canvas.moveTo(zeroX, area.y);
//           canvas.lineTo(zeroX, area.y + area.h);
//           canvas.stroke();

//           if (showCenterPoint) {
//             canvas.beginPath();
//             canvas.arc(zeroX, zeroY, 8, 0, 2 * Math.PI);
//             canvas.fillStyle = 'red';
//             canvas.fill();
//           }

//           if (calculateDistances && data) {
//             const centerX = centerOfGravity[index].x;
//             const centerY = centerOfGravity[index].y;
//             const centerXPx = g.toDomXCoord(centerX);
//             const centerYPx = g.toDomYCoord(centerY);

//             canvas.beginPath();
//             canvas.arc(centerXPx, centerYPx, 5, 0, 2 * Math.PI);
//             canvas.fillStyle = 'green';
//             canvas.fill();

//             // Draw the distance line
//             const distanceY = g.toDomYCoord(distanceToCoG);
//             canvas.beginPath();
//             canvas.setLineDash([5, 5]);
//             canvas.strokeStyle = 'green';
//             canvas.moveTo(area.x, distanceY);
//             canvas.lineTo(area.x + area.w, distanceY);
//             canvas.stroke();

//             // Label the distance line
//             canvas.fillStyle = 'green';
//             canvas.fillText(`Distance: ${distanceToCoG.toFixed(2)}`, area.x + 10, distanceY - 5);
//           }
//         },
//         highlightCallback: (event, x, points) => {
//           const existingTooltip = document.querySelector('.tooltip');
//           if (existingTooltip) {
//             existingTooltip.remove();
//           }

//           if (points.length > 0) {
//             const tooltip = document.createElement('div');
//             tooltip.className = 'tooltip fixed bg-white border border-gray-300 p-2 rounded shadow-md text-sm';
//             tooltip.style.position = 'absolute';
//             tooltip.style.left = `${event.pageX + 10}px`;
//             tooltip.style.top = `${event.pageY + 10}px`;
//             tooltip.innerHTML = `X: ${points[0].xval.toFixed(3)}, Y: ${points[0].yval.toFixed(3)}`;
//             document.body.appendChild(tooltip);

//             const removeTooltip = () => {
//               if (document.body.contains(tooltip)) {
//                 document.body.removeChild(tooltip);
//               }
//               graphContainer.removeEventListener('mouseout', removeTooltip);
//             };

//             graphContainer.addEventListener('mouseout', removeTooltip);
//           }
//         }
//       };

//       if (existingDygraph) {
//         existingDygraph.updateOptions({
//           file: plotData,
//           ...graphOptions
//         });
//       } else {
//         const dygraph = new Dygraph(graphContainer, plotData, graphOptions);

//         graphContainer.dygraph = dygraph;

//         graphContainer.addEventListener('wheel', (e) => {
//           e.preventDefault();
//           const zoomAmount = e.deltaY < 0 ? zoomFactor : 1 / zoomFactor;
//           const xRange = dygraph.xAxisRange()[1] - dygraph.xAxisRange()[0];
//           const yRange = dygraph.yAxisRange()[1] - dygraph.yAxisRange()[0];

//           const newXRange = xRange * zoomAmount;
//           const newYRange = yRange * zoomAmount;

//           const mouseX = e.offsetX / graphContainer.clientWidth;
//           const mouseY = e.offsetY / graphContainer.clientHeight;

//           const newXRangeStart = dygraph.xAxisRange()[0] + (xRange - newXRange) * mouseX;
//           const newXRangeEnd = dygraph.xAxisRange()[1] - (xRange - newXRange) * (1 - mouseX);

//           const newYRangeStart = dygraph.yAxisRange()[0] + (yRange - newYRange) * mouseY;
//           const newYRangeEnd = dygraph.yAxisRange()[1] - (yRange - newYRange) * (1 - mouseY);

//           dygraph.updateOptions({
//             dateWindow: [newXRangeStart, newXRangeEnd],
//             valueRange: [newYRangeStart, newYRangeEnd],
            
//           });
//         });
//       }

//       if (data) {
//         const centerX = plotData.reduce((sum, point) => sum + point[0], 0) / plotData.length;
//         const centerY = plotData.reduce((sum, point) => sum + point[1], 0) / plotData.length;

//         setCenterOfGravity(prev => {
//           const newCenterOfGravity = [...prev];
//           newCenterOfGravity[index] = { x: centerX, y: centerY };
//           return newCenterOfGravity;
//         });

//         setDistances(prev => {
//           const updatedDistances = [...prev];
//           updatedDistances[index] = distanceToCoG;
//           return updatedDistances;
//         });
//       }
//     }
//   };

//   useEffect(() => {
//     graphData.forEach((data, index) => {
//       createOrUpdateGraph(index);
//     });
//   }, [graphData, calculateDistances, showCenterPoint]);

//   useEffect(() => {
//     const newGraphData = Array(6).fill(null);
//     selectedFiles.forEach((file, index) => {
//       handleFileSelection(file, index);
//     });
//     setGraphData(newGraphData);
//   }, [selectedFiles]);

//   const handleFileToggle = (file) => {
//     setSelectedFiles(prev => {
//       const isSelected = prev.includes(file);
//       let newSelectedFiles;
//       if (isSelected) {
//         newSelectedFiles = prev.filter(f => f !== file);
//       } else {
//         newSelectedFiles = [...prev, file];
//       }
      
//       const newGraphData = Array(6).fill(null);
//       newSelectedFiles.forEach((selectedFile, index) => {
//         const existingDataIndex = graphData.findIndex(data => data && data.fileName === selectedFile.name);
//         if (existingDataIndex !== -1) {
//           newGraphData[index] = graphData[existingDataIndex];
//         }
//       });
      
//       setGraphData(newGraphData);
//       return newSelectedFiles;
//     });
//   };

//   return (
//     <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center ${isVisible ? '' : 'hidden'}`}>
//       <div className="bg-[#f1f1f1] p-4 rounded-md relative" style={{ width: '100%', maxWidth: '3000px', height: '100%', maxHeight: '1400px' }} onClick={(e) => e.stopPropagation()}>
//         <div className="grid grid-cols-3 gap-4" style={{ height: '900px', position: 'absolute', top: '100px', width: '2200px' }}>
//           {Array.from({ length: 6 }).map((_, index) => (
//             <div key={index} className="my-4" style={{border:'5px groove lightgray'}}>
//               <h2 className="text-xl font-bold">Graph {index + 1}</h2>
//               <div ref={(el) => graphContainerRef.current[index] = el} style={{ width: '100%', height: '500px' }}></div>
//               <div className="mt-2 flex justify-between">
//                 <div>
//                   <span className="font-bold">Distance to CoG:</span>
//                   <input
//                     type="text"
//                     value={calculateDistances ? distances[index].toFixed(2) : 'N/A'}
//                     readOnly
//                     className="ml-2 p-1 border border-gray-300 rounded-md"
//                   />
//                 </div>
//                 <div>
//                   <span className="font-bold mr-2">Data Status:</span>
//                   <input
//                     type="text"
//                     value={dataStatus[index] || ''}
//                     readOnly
//                     className="p-1 border border-gray-300 rounded-md"
//                   />
//                 </div>
//                 <div>
//                   <span className="font-bold mr-2">Filter:</span>
//                   <input
//                     type="text"
//                     value="1"
//                     readOnly
//                     className="p-1 border border-gray-300 rounded-md w-8 text-center"
//                   />
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//  <div className="absolute top-0 right-0 mt-4 mr-4 flex flex-col border-2 border-gray-800 p-2 rounded-md" style={{ width: '500px' }}>
//           <input
//             type="file"
//             webkitdirectory="true"
//             multiple
//             onChange={handleFolderUpload}
//             className="mb-4"
//           />
//           <div className="overflow-y-auto h-32 mb-4 border border-gray-400 rounded-md p-2">
//             {files.map((file, index) => (
//               <div key={index} className="flex items-center mb-2">
//                 <input
//                   type="checkbox"
//                   checked={selectedFiles.includes(file)}
//                   onChange={() => handleFileToggle(file)}
//                   className="mr-2"
//                 />
//                 <span>{file.name}</span>
//               </div>
//             ))}
//           </div>
//           <div className="flex justify-end">
//             <button onClick={onClose} className="p-2 text-white bg-gray-800 rounded-md">
//               Close
//             </button>
//           </div>
//         </div>
//         <button
//           onClick={() => setCalculateDistances(prev => !prev)}
//           className="p-2 mt-4 text-white bg-blue-600 rounded-md"
//           style={{ position: 'absolute', left: '90%', top: '1000px', width: '200px', height: '60px' }}
//         >
//           {calculateDistances ? 'Hide Distances' : 'Show Distances'}
//         </button>
//         <button
//           onClick={() => setShowCenterPoint(prev => !prev)}
//           className="p-2 mt-4 text-white bg-green-600 rounded-md"
//           style={{ position: 'absolute', left: '90%', top: '1080px', width: '200px', height: '60px' }}
//         >
//           {showCenterPoint ? 'Hide Center Point' : 'Show Center Point'}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default PolarPlot;

