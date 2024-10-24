
// """"""""""""""""""""""""......this below code which is commented  is correct working code......""""""""""""""""""""""""""""""""//
// import React, { useEffect, useRef, useState } from 'react';
// import Dygraph from 'dygraphs';

// const PolarPlot = ({ isVisible, onClose }) => {
//   const [files, setFiles] = useState([]);
//   const [selectedFiles, setSelectedFiles] = useState([]);
//   const graphContainerRef = useRef([]);

//   // Placeholder data for initial graphs
//   const placeholderData = Array(6).fill().map(() => [
//     [0, 0], [1, 1], [-1, -1], [1, -1], [-1, 1] // Example placeholder data
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
//       const maxXAbs = Math.max(Math.abs(minX), Math.abs(maxX));
//       const maxYAbs = Math.max(Math.abs(minY), Math.abs(maxY));
//       const maxRange = Math.max(maxXAbs, maxYAbs);

//       const graphContainer = graphContainerRef.current[index];
//       if (graphContainer) {
//         new Dygraph(graphContainer, data, {
//           labels: ['Bending moment X', 'Bending moment Y'],
//           title: `Polar Plot - ${fileName}`,
//           showLabelsOnHighlight: false,
//           xlabel: 'Bending moment X',
//           ylabel: 'Bending moment Y',
//           ylabelWidth: 100,
//           drawPoints: true,
//           strokeWidth: 0.0,
//           pointSize: 1.5,
//           highlightCircleSize: 7,
//           colors: ['#a01dc0'],
//           width: 400,
//           height: 400,
//           gridLineColor: 'transparent',
//           dateWindow: [-maxRange, maxRange],
//           axes: {
//             x: {
//               axisLabelFormatter: (d) => d.toFixed(3),
//               valueFormatter: (x) => x.toFixed(3),
//               drawGrid: false,
//               valueRange: [-maxRange, maxRange],
//               pixelsPerLabel: 30,
//               axisLabelWidth: 50,
//             },
//             y: {
//               axisLabelFormatter: (d) => d.toFixed(3),
//               valueFormatter: (y) => y.toFixed(3),
//               drawGrid: false,
//               valueRange: [-maxRange, maxRange],
//               pixelsPerLabel: 30,
//               axisLabelWidth: 50,
//             }
//           },
//           underlayCallback: (canvas, area, g) => {
//             const zeroX = g.toDomXCoord(0);
//             const zeroY = g.toDomYCoord(0);
//             canvas.beginPath();
//             canvas.setLineDash([5, 5]);
//             canvas.strokeStyle = '#000';
//             canvas.moveTo(area.x, zeroY);
//             canvas.lineTo(area.x + area.w, zeroY);
//             canvas.stroke();
//             canvas.moveTo(zeroX, area.y);
//             canvas.lineTo(zeroX, area.y + area.h);
//             canvas.stroke();
//           },
//         });
//       }
//     }
//   };

//   useEffect(() => {
//     // Placeholder max range for initial graphs
//     const placeholderMaxRange = 1; // Adjust this value based on the desired range for your placeholders

//     placeholderData.forEach((data, index) => {
//       const graphContainer = graphContainerRef.current[index];
//       if (graphContainer) {
//         new Dygraph(graphContainer, data, {
//           labels: ['Bending moment X', 'Bending moment Y'],
//           title: `Placeholder Plot ${index + 1}`,
//           showLabelsOnHighlight: false,
//           xlabel: 'Bending moment X',
//           ylabel: 'Bending moment Y',
//           ylabelWidth: 100,
//           drawPoints: true,
//           strokeWidth: 0.0,
//           pointSize: 1.5,
//           highlightCircleSize: 7,
//           colors: ['#a01dc0'],
//           width: 400,
//           height: 400,
//           gridLineColor: 'transparent',
//           dateWindow: [-placeholderMaxRange, placeholderMaxRange], // Set the range similar to processed data
//           axes: {
//             x: {
//               axisLabelFormatter: (d) => d.toFixed(3),
//               valueFormatter: (x) => x.toFixed(3),
//               drawGrid: false,
//               valueRange: [-placeholderMaxRange, placeholderMaxRange],
//               pixelsPerLabel: 30,
//               axisLabelWidth: 50,
//             },
//             y: {
//               axisLabelFormatter: (d) => d.toFixed(3),
//               valueFormatter: (y) => y.toFixed(3),
//               drawGrid: false,
//               valueRange: [-placeholderMaxRange, placeholderMaxRange],
//               pixelsPerLabel: 30,
//               axisLabelWidth: 50,
//             }
//           },
//           underlayCallback: (canvas, area, g) => {
//             const zeroX = g.toDomXCoord(0);
//             const zeroY = g.toDomYCoord(0);
//             canvas.beginPath();
//             canvas.setLineDash([5, 5]);
//             canvas.strokeStyle = '#000';
//             canvas.moveTo(area.x, zeroY);
//             canvas.lineTo(area.x + area.w, zeroY);
//             canvas.stroke();
//             canvas.moveTo(zeroX, area.y);
//             canvas.lineTo(zeroX, area.y + area.h);
//             canvas.stroke();
//           },
//         });
//       }
//     });

//     return () => {
//       graphContainerRef.current.forEach((graphContainer) => {
//         if (graphContainer && graphContainer.dygraph) {
//           graphContainer.dygraph.destroy();
//         }
//       });
//     };
//   }, []);

//   useEffect(() => {
//     selectedFiles.forEach((file, index) => {
//       handleFileSelection(file, index);
//     });
//   }, [selectedFiles]);

//   return (
//     <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center ${isVisible ? '' : 'hidden'}`}>
//       <div className="bg-[#b5cad1] p-4 rounded-md" style={{ width: '85%', maxWidth: '2700px' }} onClick={(e) => e.stopPropagation()}>
//         <div className="grid grid-cols-3 gap-4" style={{ height: '900px' }}>
//           {Array.from({ length: 6 }).map((_, index) => (
//             <div key={index} className="my-4">
//               <h2 className="text-xl font-bold">Graph {index + 1}</h2>
//               <div ref={(el) => graphContainerRef.current[index] = el} style={{ width: '100%', height: '400px' }}></div>
//             </div>
//           ))}
//         </div>
//         <div className="flex flex-col mt-4 border-2 border-gray-800 p-2 rounded-md">
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
//                   onChange={() => {
//                     const newSelectedFiles = selectedFiles.includes(file)
//                       ? selectedFiles.filter(f => f !== file)
//                       : [...selectedFiles, file];
//                     setSelectedFiles(newSelectedFiles);
//                   }}
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
//       </div>
//     </div>
//   );
// };

// export default PolarPlot;






//""""""complete correct working code including showzeropoint,ditsancepoint,Angle also correctly calculating and displaying """"""""""""""
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
        // highlightCallback: (event, x, points) => {
        //   const existingTooltip = document.querySelector('.tooltip');
        //   if (existingTooltip) {
        //     existingTooltip.remove();
        //   }

        //   if (points.length > 0) {
        //     const tooltip = document.createElement('div');
        //     tooltip.className = 'tooltip fixed bg-white border border-gray-300 p-2 rounded shadow-md text-sm';
        //     tooltip.style.position = 'absolute';
        //     tooltip.style.left = `${event.pageX + 10}px`;
        //     tooltip.style.top = `${event.pageY + 10}px`;
        //     tooltip.innerHTML = `X: ${points[0].xval.toFixed(3)}, Y: ${points[0].yval.toFixed(3)}`;
        //     document.body.appendChild(tooltip);

        //     const removeTooltip = () => {
        //       if (document.body.contains(tooltip)) {
        //         document.body.removeChild(tooltip);
        //       }
        //       graphContainer.removeEventListener('mouseout', removeTooltip);
        //     };

        //     graphContainer.addEventListener('mouseout', removeTooltip);
        //   }
        // },
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
//   const colorPalette = ['#800080', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF'];

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
      
//       // Calculate the range to ensure the plot is centered at (0, 0)
//       const maxAbsX = data ? Math.max(Math.abs(data.minX), Math.abs(data.maxX)) : 1;
//       const maxAbsY = data ? Math.max(Math.abs(data.minY), Math.abs(data.maxY)) : 1;
//       const maxAbs = Math.max(maxAbsX, maxAbsY);
//       const range = [-maxAbs, maxAbs];

//       // Calculate the center of gravity
//       let centerX = 0;
//       let centerY = 0;
//       if (data) {
//         centerX = plotData.reduce((sum, point) => sum + point[0], 0) / plotData.length;
//         centerY = plotData.reduce((sum, point) => sum + point[1], 0) / plotData.length;
//       }

//       // Calculate the distance to center of gravity
//       const distanceToCoG = Math.sqrt(Math.pow(centerX, 2) + Math.pow(centerY, 2));

//       // Update the distances state
//       setDistances(prev => {
//         const updatedDistances = [...prev];
//         updatedDistances[index] = distanceToCoG;
//         return updatedDistances;
//       });

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
//             color: 'green',
//             pointSize: 6,
          
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
//         dateWindow: range,
//         axes: {
//           x: {
//             axisLabelFormatter: (d) => isNaN(d) ? '' : d.toFixed(3),
//             valueFormatter: (x) => isNaN(x) ? '' : x.toFixed(3),
//             drawGrid: false,
//             valueRange: range,
//             pixelsPerLabel: 30,
//             axisLabelWidth: 50,
//           },
//           y: {
//             axisLabelFormatter: (d) => isNaN(d) ? '' : d.toFixed(3),
//             valueFormatter: (y) => isNaN(y) ? '' : y.toFixed(3),
//             drawGrid: false,
//             valueRange: range,
//             pixelsPerLabel: 30,
//             axisLabelWidth: 50,
//           }
//         },
//         underlayCallback: (canvas, area, g) => {
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
//       if (calculateDistances && data) {
//         dygraphData.push([0, 0, distanceToCoG, null]);
//         dygraphData.push([centerX, centerY, distanceToCoG, null]);
//       }
//       if (showCenterPoint) {
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
//           newCenterOfGravity[index] = { x: centerX, y: centerY };
//           return newCenterOfGravity;
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
//   const colorPalette = ['#800080', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF'];

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
      
//       // Calculate the range to ensure the plot is centered at (0, 0)
//       const maxAbsX = data ? Math.max(Math.abs(data.minX), Math.abs(data.maxX)) : 1;
//       const maxAbsY = data ? Math.max(Math.abs(data.minY), Math.abs(data.maxY)) : 1;
//       const maxAbs = Math.max(maxAbsX, maxAbsY);
//       const range = [-maxAbs, maxAbs];

//       // Calculate the center of gravity
//       let centerX = 0;
//       let centerY = 0;
//       if (data) {
//         centerX = plotData.reduce((sum, point) => sum + point[0], 0) / plotData.length;
//         centerY = plotData.reduce((sum, point) => sum + point[1], 0) / plotData.length;
//       }

//       // Calculate the distance to center of gravity
//       const distanceToCoG = Math.sqrt(Math.pow(centerX, 2) + Math.pow(centerY, 2));

//       // Update the distances state
//       setDistances(prev => {
//         const updatedDistances = [...prev];
//         updatedDistances[index] = distanceToCoG;
//         return updatedDistances;
//       });

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
//             color: 'green',
//             pointSize: 6,
          
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
//         dateWindow: range,
//         axes: {
//           x: {
//             axisLabelFormatter: (d) => isNaN(d) ? '' : d.toFixed(3),
//             valueFormatter: (x) => isNaN(x) ? '' : x.toFixed(3),
//             drawGrid: false,
//             valueRange: range,
//             pixelsPerLabel: 30,
//             axisLabelWidth: 50,
//           },
//           y: {
//             axisLabelFormatter: (d) => isNaN(d) ? '' : d.toFixed(3),
//             valueFormatter: (y) => isNaN(y) ? '' : y.toFixed(3),
//             drawGrid: false,
//             valueRange: range,
//             pixelsPerLabel: 30,
//             axisLabelWidth: 50,
//           }
//         },
//         underlayCallback: (canvas, area, g) => {
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
//             const lineLength = 200;
//             const endX = centerX + lineLength * Math.cos(angle);
//             const endY = centerY - lineLength * Math.sin(angle);
//             ctx.lineTo(endX, endY);
//             ctx.strokeStyle = 'red';
//             ctx.lineWidth = 3;
           
//             ctx.stroke();
//           }
//         }
//       };

//       // Prepare the data for Dygraph, including the distance line and center point
//       const dygraphData = plotData.map(point => [point[0], point[1], null, null]);
//       if (calculateDistances && data) {
//         dygraphData.push([0, 0, distanceToCoG, null]);
//         dygraphData.push([centerX, centerY, distanceToCoG, null]);
//       }
//       if (showCenterPoint) {
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
//           newCenterOfGravity[index] = { x: centerX, y: centerY };
//           return newCenterOfGravity;
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

//   const handleAngleChange = (index, value) => {
//     setAngles(prev => {
//       const newAngles = [...prev];
//       newAngles[index] = value;
//       return newAngles;
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
//                 {showAngle && (
//                   <div className="flex items-center">
//                     <span className="font-bold mr-2">Angle:</span>
//                     <input
//                       type="range"
//                       min="0"
//                       max="359"
//                       value={angles[index]}
//                       onChange={(e) => handleAngleChange(index, parseInt(e.target.value))}
//                       className="w-32 mr-2"
//                     />
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

//here below code showzeropoint angle is showing correctly only distance point is showing two data point 
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
//   const colorPalette = ['#800080', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF'];

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
      
//       // Calculate the range to ensure the plot is centered at (0, 0)
//       const maxAbsX = data ? Math.max(Math.abs(data.minX), Math.abs(data.maxX)) : 1;
//       const maxAbsY = data ? Math.max(Math.abs(data.minY), Math.abs(data.maxY)) : 1;
//       const maxAbs = Math.max(maxAbsX, maxAbsY);
//       const range = [-maxAbs, maxAbs];

//       // Calculate the center of gravity
//       let centerX = 0;
//       let centerY = 0;
//       if (data) {
//         centerX = plotData.reduce((sum, point) => sum + point[0], 0) / plotData.length;
//         centerY = plotData.reduce((sum, point) => sum + point[1], 0) / plotData.length;
//       }

//       // Calculate the distance to center of gravity
//       const distanceToCoG = Math.sqrt(Math.pow(centerX, 2) + Math.pow(centerY, 2));

//       // Update the distances state
//       setDistances(prev => {
//         const updatedDistances = [...prev];
//         updatedDistances[index] = distanceToCoG;
//         return updatedDistances;
//       });
  
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
//             color: 'green',
//             pointSize: 6,
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
//         dateWindow: range,
//         axes: {
//           x: {
//             axisLabelFormatter: (d) => isNaN(d) ? '' : d.toFixed(3),
//             valueFormatter: (x) => isNaN(x) ? '' : x.toFixed(3),
//             drawGrid: false,
//             valueRange: range,
//             pixelsPerLabel: 30,
//             axisLabelWidth: 50,
//           },
//           y: {
//             axisLabelFormatter: (d) => isNaN(d) ? '' : d.toFixed(3),
//             valueFormatter: (y) => isNaN(y) ? '' : y.toFixed(3),
//             drawGrid: false,
//             valueRange: range,
//             pixelsPerLabel: 30,
//             axisLabelWidth: 50,
//           }
//         },
//         underlayCallback: (canvas, area, g) => {
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
//             const centerX = g.toDomXCoord(0);
//             const centerY = g.toDomYCoord(0);
            
//             ctx.beginPath();
//             ctx.moveTo(centerX, centerY);
//             const angle = angles[index] * (Math.PI / 180);
//             const lineLength = 200;
//             const endX = centerX + lineLength * Math.cos(angle);
//             const endY = centerY - lineLength * Math.sin(angle);
//             ctx.lineTo(endX, endY);
//             ctx.strokeStyle = 'red';
//             ctx.lineWidth = 3;
           
//             ctx.stroke();
//           }
//         }
//       };

//       // Prepare the data for Dygraph, including the distance line and center point
//       const dygraphData = plotData.map(point => [point[0], point[1], null, null]);
//       if (calculateDistances && data) {
//         dygraphData.push([0, 0, distanceToCoG, null]);
//         dygraphData.push([centerX, centerY, distanceToCoG, null]);
//       }
//       if (showCenterPoint) {
//         dygraphData.push([0, null, null, 0]);
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
//           newCenterOfGravity[index] = { x: centerX, y: centerY };
//           return newCenterOfGravity;
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

//   const handleAngleChange = (index, value) => {
//     setAngles(prev => {
//       const newAngles = [...prev];
//       newAngles[index] = value;
//       return newAngles;
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
//                   <div className="flex items-center">
//                     <span className="font-bold mr-2">Angle:</span>
//                     <input
//                       type="range"
//                       min="0"
//                       max="359"
//                       value={angles[index]}
//                       onChange={(e) => handleAngleChange(index, parseInt(e.target.value))}
//                       className="w-32 mr-2"
//                     />
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
//   const colorPalette = ['#800080', '#00FF00', '#0000FF', '#bf00ff', '#FF00FF', '#00bfff'];

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
      
//       // Calculate the range to ensure the plot is centered at (0, 0)
//       const maxAbsX = data ? Math.max(Math.abs(data.minX), Math.abs(data.maxX)) : 1;
//       const maxAbsY = data ? Math.max(Math.abs(data.minY), Math.abs(data.maxY)) : 1;
//       const maxAbs = Math.max(maxAbsX, maxAbsY);
//       const range = [-maxAbs, maxAbs];

//       // Calculate the center of gravity
//       let centerX = 0;
//       let centerY = 0;
//       if (data) {
//         centerX = plotData.reduce((sum, point) => sum + point[0], 0) / plotData.length;
//         centerY = plotData.reduce((sum, point) => sum + point[1], 0) / plotData.length;
//       }

//       // Calculate the distance to center of gravity
//       const distanceToCoG = Math.sqrt(Math.pow(centerX, 2) + Math.pow(centerY, 2));

//       // Update the distances state
//       setDistances(prev => {
//         const updatedDistances = [...prev];
//         updatedDistances[index] = distanceToCoG;
//         return updatedDistances;
//       });

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
//             color: 'green',
//             pointSize: 6,
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
//         dateWindow: range,
//         axes: {
//           x: {
//             axisLabelFormatter: (d) => isNaN(d) ? '' : d.toFixed(3),
//             valueFormatter: (x) => isNaN(x) ? '' : x.toFixed(3),
//             drawGrid: false,
//             valueRange: range,
//             pixelsPerLabel: 30,
//             axisLabelWidth: 50,
//           },
//           y: {
//             axisLabelFormatter: (d) => isNaN(d) ? '' : d.toFixed(3),
//             valueFormatter: (y) => isNaN(y) ? '' : y.toFixed(3),
//             drawGrid: false,
//             valueRange: range,
//             pixelsPerLabel: 30,
//             axisLabelWidth: 50,
//           }
//         },
//         underlayCallback: (canvas, area, g) => {
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
//             const centerX = g.toDomXCoord(0);
//             const centerY = g.toDomYCoord(0);
            
//             ctx.beginPath();
//             ctx.moveTo(centerX, centerY);
//             const angle = angles[index] * (Math.PI / 180);
//             const lineLength = 200;
//             const endX = centerX + lineLength * Math.cos(angle);
//             const endY = centerY - lineLength * Math.sin(angle);
//             ctx.lineTo(endX, endY);
//             ctx.strokeStyle = 'red';
//             ctx.lineWidth = 3;
           
//             ctx.stroke();
//           }
//         }
//       };

//       // Prepare the data for Dygraph, including the distance point and center point
//       const dygraphData = plotData.map(point => [point[0], point[1], null, null]);
//       if (calculateDistances && data) {
//         // Add only one point for the distance to CoG
//         dygraphData.push([centerX, centerY, distanceToCoG, null]);
//       }
//       if (showCenterPoint) {
//         dygraphData.push([0, 0, null, 0]);
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
//           newCenterOfGravity[index] = { x: centerX, y: centerY };
//           return newCenterOfGravity;
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

//   const handleAngleChange = (index, value) => {
//     setAngles(prev => {
//       const newAngles = [...prev];
//       newAngles[index] = value;
//       return newAngles;
//     });
//   };

//   return (
//     <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center ${isVisible ? '' : 'hidden'}`}>
//       <div className="bg-[#f1f1f1] p-4 rounded-md relative" style={{ width: '100%', maxWidth: '3000px', height: '100%', maxHeight: '1400px' }} onClick={(e) => e.stopPropagation()}>
//         <div className="grid grid-cols-3 gap-4" style={{ height: '900px', position: 'absolute', top: '100px', width: '2200px' }}>
//           {Array.from({ length: 6 }).map((_, index) => (
//             <div key={index} className="my-4" style={{border:'5px groove lightgray'}}>
//               <h2 className="text-xl font-bold">Graph {index + 1}</h2>
//  <div ref={(el) => graphContainerRef.current[index] = el} style={{ width: '100%', height: '500px' }}></div>
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
//                   <div className="flex items-center">
//                     <span className="font-bold mr-2">Angle:</span>
//                     <input
//                       type="range"
//                       min="0"
//                       max="360"
//                       value={angles[index]}
//                       onChange={(e) => handleAngleChange(index, parseInt(e.target.value))}
//                       className="w-32 mr-2"
//                     />
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
//           {calculateDistances ? 'Hide Distance' : 'Show Distance'}
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



// this below is all button correctly working code showangle,show value,distance,centre point(0,0)
// import React, { useEffect, useRef, useState } from 'react';
// import Dygraph from 'dygraphs';

// import html2canvas from 'html2canvas';
// import jsPDF from 'jspdf';

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
//   const [showValue, setShowValue] = useState(false);
//   const [lineAngles, setLineAngles] = useState(Array(6).fill(0));
//   const [lineLengths, setLineLengths] = useState(Array(6).fill(100));
//   const [lineEndpoints, setLineEndpoints] = useState(Array(6).fill({ x: 0, y: 0 }));
//   const [calculatedHypotenuse, setCalculatedHypotenuse] = useState(Array(6).fill(0));
//   const colorPalette = ['#800080', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF'];
//   const [isGeneratingReport, setIsGeneratingReport] = useState(false);
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
      
//       const maxAbsX = data ? Math.max(Math.abs(data.minX), Math.abs(data.maxX)) : 1;
//       const maxAbsY = data ? Math.max(Math.abs(data.minY), Math.abs(data.maxY)) : 1;
//       const maxAbs = Math.max(maxAbsX, maxAbsY);
//       const range = [-maxAbs, maxAbs];

//       let centerX = 0;
//       let centerY = 0;
//       if (data) {
//         centerX = plotData.reduce((sum, point) => sum + point[0], 0) / plotData.length;
//         centerY = plotData.reduce((sum, point) => sum + point[1], 0) / plotData.length;
//       }

//       const distanceToCoG = Math.sqrt(Math.pow(centerX, 2) + Math.pow(centerY, 2));

//       setDistances(prev => {
//         const updatedDistances = [...prev];
//         updatedDistances[index] = distanceToCoG;
//         return updatedDistances;
//       });

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
//             color: 'green',
//             pointSize: 6,
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
//         dateWindow: range,
//         axes: {
//           x: {
//             axisLabelFormatter: (d) => isNaN(d) ? '' : d.toFixed(3),
//             valueFormatter: (x) => isNaN(x) ? '' : x.toFixed(3),
//             drawGrid: false,
//             valueRange: range,
//             pixelsPerLabel: 30,
//             axisLabelWidth: 50,
//           },
//           y: {
//             axisLabelFormatter: (d) => isNaN(d) ? '' : d.toFixed(3),
//             valueFormatter: (y) => isNaN(y) ? '' : y.toFixed(3),
//             drawGrid: false,
//             valueRange: range,
//             pixelsPerLabel: 30,
//             axisLabelWidth: 50,
//           }
//         },
//         underlayCallback: (canvas, area, g) => {
//           canvas.save();
//           canvas.setLineDash([5, 5]);
//           canvas.strokeStyle = 'rgba(128, 128, 128, 0.5)';
//           canvas.lineWidth = 1;

//           const centerX = g.toDomXCoord(0);
//           canvas.beginPath();
//           canvas.moveTo(centerX, area.y);
//           canvas.lineTo(centerX, area.y + area.h);
//           canvas.stroke();

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
//             const centerX = g.toDomXCoord(0);
//             const centerY = g.toDomYCoord(0);
            
//             ctx.beginPath();
//             ctx.moveTo(centerX, centerY);
//             const angle = angles[index] * (Math.PI / 180);
//             const lineLength = 200;
//             const endX = centerX + lineLength * Math.cos(angle);
//             const endY = centerY - lineLength * Math.sin(angle);
//             ctx.lineTo(endX, endY);
//             ctx.strokeStyle = 'red';
//             ctx.lineWidth = 3;
//             ctx.stroke();
//           }

//           if (showValue) {
//             const canvas = g.hidden_;
//             const ctx = canvas.getContext('2d');
//             const centerX = g.toDomXCoord(0);
//             const centerY = g.toDomYCoord(0);
            
//             ctx.beginPath();
//             ctx.moveTo(centerX, centerY);
//             const angle = lineAngles[index] * (Math.PI / 180);
//             const lineLength = lineLengths[index];
//             const endX = centerX + lineLength * Math.cos(angle);
//             const endY = centerY - lineLength * Math.sin(angle);
//             ctx.lineTo(endX, endY);
//             ctx.strokeStyle = 'black';
//             ctx.lineWidth = 2;
//             ctx.stroke();

//             const xValue = lineLength * Math.cos(angle);
//             const yValue = lineLength * Math.sin(angle);
//             setLineEndpoints(prev => {
//               const newEndpoints = [...prev];
//               newEndpoints[index] = { x: xValue, y: yValue };
//               return newEndpoints;
//             });

//             // Calculate hypotenuse using Pythagorean theorem
//             const calculatedHyp = Math.sqrt(Math.pow(xValue, 2) + Math.pow(yValue, 2));
//             setCalculatedHypotenuse(prev => {
//               const newHypotenuse = [...prev];
//               newHypotenuse[index] = calculatedHyp;
//               return newHypotenuse;
//             });
//           }
//         }
//       };

//       const dygraphData = plotData.map(point => [point[0], point[1], null, null]);
//       if (calculateDistances && data) {
//         dygraphData.push([centerX, centerY, distanceToCoG, null]);
//       }
//       if (showCenterPoint) {
//         dygraphData.push([0, 0, null, 0]);
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
//           newCenterOfGravity[index] = { x: centerX, y: centerY };
//           return newCenterOfGravity;
//         });
//       }
//     }
//   };

//   useEffect(() => {
//     graphData.forEach((data, index) => {
//       createOrUpdateGraph(index);
//     });
//   }, [graphData, calculateDistances, showCenterPoint, showAngle, angles, showValue, lineAngles, lineLengths]);

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
      
//   const newGraphData = Array(6).fill(null);
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

//   const handleAngleChange = (index, value) => {
//     setAngles(prev => {
//       const newAngles = [...prev];
//       newAngles[index] = value;
//       return newAngles;
//     });
//   };

//   const handleLineAngleChange = (index, value) => {
//     setLineAngles(prev => {
//       const newLineAngles = [...prev];
//       newLineAngles[index] = value;
//       return newLineAngles;
//     });
//   };

//   const handleLineLengthChange = (index, value) => {
//     setLineLengths(prev => {
//       const newLineLengths = [...prev];
//       newLineLengths[index] = value;
//       return newLineLengths;
//     });
//   };

//   const generateReport = async () => {
//     console.log("Starting report generation");
//     setIsGeneratingReport(true);
//     try {
//       const pdf = new jsPDF('l', 'mm', 'a4');
//       const pageWidth = pdf.internal.pageSize.width;
//       const pageHeight = pdf.internal.pageSize.height;
//       const margin = 10;
//       const graphWidth = (pageWidth - 4 * margin) / 3;
//       const graphHeight = (pageHeight - 3 * margin) / 2;
  
//       for (let i = 0; i < 6; i++) {
//         const graphContainer = graphContainerRef.current[i];
//         if (!graphContainer) {
//           console.log(`Graph container ${i+1} not found`);
//           continue;
//         }
//         console.log(`Capturing graph ${i+1}`);
//         const canvas = await html2canvas(graphContainer);
//         const imgData = canvas.toDataURL('image/png');
  
//         const row = Math.floor(i / 3);
//         const col = i % 3;
//         const xPosition = margin + col * (graphWidth + margin);
//         const yPosition = margin + row * (graphHeight + margin);
  
//         pdf.addImage(imgData, 'PNG', xPosition, yPosition, graphWidth, graphHeight - 25);
  
//         if (graphData[i]) {
//           pdf.setFontSize(9);
//           pdf.text(`Graph ${i + 1}: ${graphData[i].fileName}`, xPosition, yPosition - 2);
          
//           // Add calculated values
//           pdf.setFontSize(7);
//           const valueY = yPosition + graphHeight - 23;
//           pdf.text(`CoG: ${distances[i].toFixed(2)}`, xPosition, valueY);
//           pdf.text(`Status: ${dataStatus[i] || 'N/A'}`, xPosition, valueY + 4);
//           pdf.text(`Filter: 1`, xPosition, valueY + 8);
//           if (showAngle) {
//             pdf.text(`Angle: ${angles[i].toFixed(2)}°`, xPosition + 40, valueY);
//           }
//           if (showValue) {
//             pdf.text(`Line Angle: ${lineAngles[i].toFixed(2)}°`, xPosition + 40, valueY + 4);
//             pdf.text(`Line Length: ${lineLengths[i].toFixed(2)}`, xPosition + 40, valueY + 8);
//             pdf.text(`Endpoint: (${lineEndpoints[i].x.toFixed(2)}, ${lineEndpoints[i].y.toFixed(2)})`, xPosition, valueY + 12);
//             pdf.text(`Calculated Value: ${calculatedHypotenuse[i].toFixed(2)}`, xPosition, valueY + 16);
//           }
//         }
//       }
  
//       console.log("Saving PDF");
//       pdf.save('polar_plot_report.pdf');
//     } catch (error) {
//       console.error("Error generating report:", error);
//     } finally {
//       setIsGeneratingReport(false);
//     }
//   };
  
//   return (
//     <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center ${isVisible ? '' : 'hidden'}`}>
//       <div className="bg-[#f1f1f1] p-4 rounded-md relative" style={{ width: '100%', maxWidth: '3000px', height: '100%', maxHeight: '1400px' }} onClick={(e) => e.stopPropagation()}>
//         <div className="grid grid-cols-3 gap-4" style={{ height: '900px', position: 'absolute', top: '100px', width: '2200px' }}>
//           {Array.from({ length: 6 }).map((_, index) => (
//             <div key={index} className="my-4" style={{border:'5px groove lightgray'}}>
//               <h2 className="text-xl font-bold">Graph {index + 1}</h2>
//               <div ref={(el) => graphContainerRef.current[index] = el} style={{ width: '100%', height: '480px' }}></div>
//               <div className="mt-2 flex justify-between">
//                 <div>
//                   <span className="font-bold">CoG:</span>
//                   <input
//                     type="text"
//                     value={calculateDistances ? distances[index].toFixed(2) : 'N/A'}
//                     readOnly
//                     className="ml-2 p-1 border border-gray-300 rounded-md w-10"
//                   />
//                 </div>
//                 <div>
//                   <span className="font-bold mr-2">Status:</span>
//                   <input
//                     type="text"
                  
//                     value={dataStatus[index] || ''}
//                     readOnly
//                     className="p-1 border border-300 rounded-md w-10"
//                   />
//                 </div>
//                 <div>
//                   <span className="font-bold mr-2">Filter:</span>
//                   <input
//                     type="text"
//                     value="1"
//                     readOnly
//                     className="p-1 border border-gray-300 rounded-md w-5 text-center"
//                   />
//                 </div>
//                 {showAngle && (
//                   <div className="flex items-center">
//                     <span className="font-bold mr-2">Angle:</span>
//                     <input
//                       type="range"
//                       min="0"
//                       max="360"
//                       value={angles[index]}
//                       onChange={(e) => handleAngleChange(index, parseInt(e.target.value))}
//                       className="w-32 mr-2"
//                     />
//                     <input
//                       type="text"
//                       value={angles[index].toFixed(2)}
//                       readOnly
//                       className="p-1 border border-gray-300 rounded-md w-16 text-center"
//                     />
//                   </div>
//                 )}
//                 {showValue && (
//                   <>
//                     <div className="flex items-center">
//                       <span className="font-bold mr-2">Line Angle:</span>
//                       <input
//                         type="range"
//                         min="0"
//                         max="360"
//                         style={{width:'50px'}}
//                         value={lineAngles[index]}
//                         onChange={(e) => handleLineAngleChange(index, parseInt(e.target.value))}
//                         className="w-32 mr-2"
//                       />
                    
//                     </div>
//                     <div className="flex items-center">
//                       <span className="font-bold mr-2">line Drag:</span>
//                       <input
//                         type="range"
//                         min="0"
//                         max="300"
//                         style={{width:'50px'}}
//                         value={lineLengths[index]}
//                         onChange={(e) => handleLineLengthChange(index, parseInt(e.target.value))}
//                         className="w-32 mr-2"
//                       />
                   
//                     </div>
//                     <div>
//                       <span className="font-bold mr-2">Endpoint:</span>
//                       <input
//                         type="text"
//                         value={`X: ${lineEndpoints[index].x.toFixed(2)}, Y: ${lineEndpoints[index].y.toFixed(2)}`}
//                         readOnly
//                         className="p-1 border border-gray-300 rounded-md w-29  text-center"
//                       />
//                     </div>
//                     <div>
//                       <span className="font-bold mr-2">Calculate value:</span>
//                       <input
//                         type="text"
//                         value={calculatedHypotenuse[index].toFixed(2)}
//                         readOnly
//                         className="p-1 border border-gray-300 rounded-md w-16 text-center"
//                       />
//                     </div>
//                   </>
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
//             if (showValue) setShowValue(false);
//           }}
//           className="p-2 mt-4 text-white bg-blue-600 rounded-md"
//           style={{ position: 'absolute', left: '90%', top: '1000px', width: '200px', height: '60px' }}
//         >
//           {calculateDistances ? 'Hide Distance' : 'Show Distance'}
//         </button>
//         <button
//           onClick={() => {
//             setShowCenterPoint(prev => !prev);
//             if (calculateDistances) setCalculateDistances(false);
//             if (showAngle) setShowAngle(false);
//             if (showValue) setShowValue(false);
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
//             if (showValue) setShowValue(false);
//           }}
//           className="p-2 mt-4 text-white bg-purple-600 rounded-md"
//           style={{ position: 'absolute', left: '90%', top: '1160px', width: '200px', height: '60px' }}
//         >
//           {showAngle ? 'Hide Angle' : 'Show Angle'}
//         </button>
//         <button
//           onClick={() => {
//             setShowValue(prev => !prev);
//             if (calculateDistances) setCalculateDistances(false);
//             if (showCenterPoint) setShowCenterPoint(false);
//             if (showAngle) setShowAngle(false);
//           }}
//           className="p-2 mt-4 text-white bg-yellow-600 rounded-md"
//           style={{ position: 'absolute', left: '90%', top: '1240px', width: '200px', height: '60px' }}
//         >
//           {showValue ? 'Hide Value' : 'Show Value'}
//         </button>


//         <button
//   onClick={generateReport}
//   disabled={isGeneratingReport}
//   className="p-2 mt-4 text-white bg-red-600 rounded-md"
//   style={{ position: 'absolute', left: '90%', top: '1320px', width: '200px', height: '60px' }}
// >
//   {isGeneratingReport ? 'Generating...' : 'Generate Report'}
// </button>
//       </div>
//     </div>
//   );
// };

// export default PolarPlot;
//""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""

// import React, { useEffect, useRef, useState } from 'react';
// import Dygraph from 'dygraphs';
// import html2canvas from 'html2canvas';
// import jsPDF from 'jspdf';

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
//   const [showValue, setShowValue] = useState(false);
//   const [lineAngles, setLineAngles] = useState(Array(6).fill(0));
//   const [lineLengths, setLineLengths] = useState(Array(6).fill(100));
//   const [lineEndpoints, setLineEndpoints] = useState(Array(6).fill({ x: 0, y: 0 }));
//   const [calculatedHypotenuse, setCalculatedHypotenuse] = useState(Array(6).fill(0));
//   const [isGeneratingReport, setIsGeneratingReport] = useState(false);
//   const [overallRange, setOverallRange] = useState([-1, 1]);

//   const colorPalette = ['#800080', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF'];
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

//       // Update overall range
//       setOverallRange(prevRange => {
//         const newMinX = Math.min(prevRange[0], minX);
//         const newMaxX = Math.max(prevRange[1], maxX);
//         const newMinY = Math.min(prevRange[0], minY);
//         const newMaxY = Math.max(prevRange[1], maxY);
//         const newMin = Math.min(newMinX, newMinY);
//         const newMax = Math.max(newMaxX, newMaxY);
//         return [newMin, newMax];
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
      
//       // Use overallRange instead of calculating range for each graph
//       const range = overallRange;

//       let centerX = 0;
//       let centerY = 0;
//       if (data) {
//         centerX = plotData.reduce((sum, point) => sum + point[0], 0) / plotData.length;
//         centerY = plotData.reduce((sum, point) => sum + point[1], 0) / plotData.length;
//       }

//       const distanceToCoG = Math.sqrt(Math.pow(centerX, 2) + Math.pow(centerY, 2));

//       setDistances(prev => {
//         const updatedDistances = [...prev];
//         updatedDistances[index] = distanceToCoG;
//         return updatedDistances;
//       });

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
//             color: 'green',
//             pointSize: 6,
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
//         dateWindow: range,
//         axes: {
//           x: {
//             axisLabelFormatter: (d) => isNaN(d) ? '' : d.toFixed(3),
//             valueFormatter: (x) => isNaN(x) ? '' : x.toFixed(3),
//             drawGrid: false,
//             valueRange: range,
//             pixelsPerLabel: 30,
//             axisLabelWidth: 50,
//           },
//           y: {
//             axisLabelFormatter: (d) => isNaN(d) ? '' : d.toFixed(3),
//             valueFormatter: (y) => isNaN(y) ? '' : y.toFixed(3),
//             drawGrid: false,
//             valueRange: range,
//             pixelsPerLabel: 30,
//             axisLabelWidth: 50,
//           }
//         },
//         underlayCallback: (canvas, area, g) => {
//           canvas.save();
//           canvas.setLineDash([5, 5]);
//           canvas.strokeStyle = 'rgba(128, 128, 128, 0.5)';
//           canvas.lineWidth = 1;

//           const centerX = g.toDomXCoord(0);
//           canvas.beginPath();
//           canvas.moveTo(centerX, area.y);
//           canvas.lineTo(centerX, area.y + area.h);
//           canvas.stroke();

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
//             const centerX = g.toDomXCoord(0);
//             const centerY = g.toDomYCoord(0);
            
//             ctx.beginPath();
//             ctx.moveTo(centerX, centerY);
//             const angle = angles[index] * (Math.PI / 180);
//             const lineLength = 200;
//             const endX = centerX + lineLength * Math.cos(angle);
//             const endY = centerY - lineLength * Math.sin(angle);
//             ctx.lineTo(endX, endY);
//             ctx.strokeStyle = 'red';
//             ctx.lineWidth = 3;
//             ctx.stroke();
//           }

//           if (showValue) {
//             const canvas = g.hidden_;
//             const ctx = canvas.getContext('2d');
//             const centerX = g.toDomXCoord(0);
//             const centerY = g.toDomYCoord(0);
            
//             ctx.beginPath();
//             ctx.moveTo(centerX, centerY);
//             const angle = lineAngles[index] * (Math.PI / 180);
//             const lineLength = lineLengths[index];
//             const endX = centerX + lineLength * Math.cos(angle);
//             const endY = centerY - lineLength * Math.sin(angle);
//             ctx.lineTo(endX, endY);
//             ctx.strokeStyle = 'black';
//             ctx.lineWidth = 2;
//             ctx.stroke();

//             const xValue = lineLength * Math.cos(angle);
//             const yValue = lineLength * Math.sin(angle);
//             setLineEndpoints(prev => {
//               const newEndpoints = [...prev];
//               newEndpoints[index] = { x: xValue, y: yValue };
//               return newEndpoints;
//             });

//             // Calculate hypotenuse using Pythagorean theorem
//             const calculatedHyp = Math.sqrt(Math.pow(xValue, 2) + Math.pow(yValue, 2));
//             setCalculatedHypotenuse(prev => {
//               const newHypotenuse = [...prev];
//               newHypotenuse[index] = calculatedHyp;
//               return newHypotenuse;
//             });
//           }
//         }
//       };

//       const dygraphData = plotData.map(point => [point[0], point[1], null, null]);
//       if (calculateDistances && data) {
//         dygraphData.push([centerX, centerY, distanceToCoG, null]);
//       }
//       if (showCenterPoint) {
//         dygraphData.push([0, 0, null, 0]);
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
//           newCenterOfGravity[index] = { x: centerX, y: centerY };
//           return newCenterOfGravity;
//         });
//       }
//     }
//   };

//   useEffect(() => {
//     graphData.forEach((data, index) => {
//       createOrUpdateGraph(index);
//     });
//   }, [graphData, calculateDistances, showCenterPoint, showAngle, angles, showValue, lineAngles, lineLengths, overallRange]);

//   useEffect(() => {
//     setOverallRange([-1, 1]); // Reset range
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

//   const handleAngleChange = (index, value) => {
//     setAngles(prev => {
//       const newAngles = [...prev];
//       newAngles[index] = value;
//       return newAngles;
//     });
//   };

//   const handleLineAngleChange = (index, value) => {
//     setLineAngles(prev => {
//       const newLineAngles = [...prev];
//       newLineAngles[index] = value;
//       return newLineAngles;
//     });
//   };

//   const handleLineLengthChange = (index, value) => {
//     setLineLengths(prev => {
//       const newLineLengths = [...prev];
//       newLineLengths[index] = value;
//       return newLineLengths;
//     });
//   };

//   const generateReport = async () => {
//     console.log("Starting report generation");
//     setIsGeneratingReport(true);
//     try {
//       const pdf = new jsPDF('l', 'mm', 'a4');
//       const pageWidth = pdf.internal.pageSize.width;
//       const pageHeight = pdf.internal.pageSize.height;
//       const margin = 10;
//       const graphWidth = (pageWidth - 4 * margin) / 3;
//       const graphHeight = (pageHeight - 3 * margin) / 2;
  
//       for (let i = 0; i < 6; i++) {
//         const graphContainer = graphContainerRef.current[i];
//         if (!graphContainer) {
//           console.log(`Graph container ${i+1} not found`);
//           continue;
//         }
//         console.log(`Capturing graph ${i+1}`);
//         const canvas = await html2canvas(graphContainer);
//         const imgData = canvas.toDataURL('image/png');
  
//         const row = Math.floor(i / 3);
//         const col = i % 3;
//         const xPosition = margin + col * (graphWidth + margin);
//         const yPosition = margin + row * (graphHeight + margin);
  
//         pdf.addImage(imgData, 'PNG', xPosition, yPosition, graphWidth, graphHeight - 25);
  
//         if (graphData[i]) {
//           pdf.setFontSize(9);
//           pdf.text(`Graph ${i + 1}: ${graphData[i].fileName}`, xPosition, yPosition - 2);
          
//           // Add calculated values
//           pdf.setFontSize(7);
//           const valueY = yPosition + graphHeight - 23;
//           pdf.text(`CoG: ${distances[i].toFixed(2)}`, xPosition, valueY);
//           pdf.text(`Status: ${dataStatus[i] || 'N/A'}`, xPosition, valueY + 4);
//           pdf.text(`Filter: 1`, xPosition, valueY + 8);
//           if (showAngle) {
//             pdf.text(`Angle: ${angles[i].toFixed(2)}°`, xPosition + 40, valueY);
//           }
//           if (showValue) {
//             pdf.text(`Line Angle: ${lineAngles[i].toFixed(2)}°`, xPosition + 40, valueY + 4);
//             pdf.text(`Line Length: ${lineLengths[i].toFixed(2)}`, xPosition + 40, valueY + 8);
//             pdf.text(`Endpoint: (${lineEndpoints[i].x.toFixed(2)}, ${lineEndpoints[i].y.toFixed(2)})`, xPosition, valueY + 12);
//             pdf.text(`Calculated Value: ${calculatedHypotenuse[i].toFixed(2)}`, xPosition, valueY + 16);
//           }
//         }
//       }
  
//       console.log("Saving PDF");
//       pdf.save('polar_plot_report.pdf');
//     } catch (error) {
//       console.error("Error generating report:", error);
//     } finally {
//       setIsGeneratingReport(false);
//     }
//   };
  
//   return (
//     <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center ${isVisible ? '' : 'hidden'}`}>
//       <div className="bg-[#f1f1f1] p-4 rounded-md relative" style={{ width: '100%', maxWidth: '3000px', height: '100%', maxHeight: '1400px' }} onClick={(e) => e.stopPropagation()}>
//         <div className="grid grid-cols-3 gap-4" style={{ height: '900px', position: 'absolute', top: '100px', width: '2200px' }}>
//           {Array.from({ length: 6 }).map((_, index) => (
//             <div key={index} className="my-4" style={{border:'5px groove lightgray'}}>
//               <h2 className="text-xl font-bold">Graph {index + 1}</h2>
//               <div ref={(el) => graphContainerRef.current[index] = el} style={{ width: '100%', height: '480px' }}></div>
//               <div className="mt-2 flex justify-between">
//                 <div>
//                   <span className="font-bold">CoG:</span>
//                   <input
//                     type="text"
//                     value={calculateDistances ? distances[index].toFixed(2) : 'N/A'}
//                     readOnly
//                     className="ml-2 p-1 border border-gray-300 rounded-md w-10"
//                   />
//                 </div>
//                 <div>
//                   <span className="font-bold mr-2">Status:</span>
//                   <input
//                     type="text"
//                     value={dataStatus[index] || ''}
//                     readOnly
//                     className="p-1 border border-300 rounded-md w-10"
//                   />
//                 </div>
//                 <div>
//                   <span className="font-bold mr-2">Filter:</span>
//                   <input
//                     type="text"
//                     value="1"
//                     readOnly
//                     className="p-1 border border-gray-300 rounded-md w-5 text-center"
//                   />
//                 </div>
//                 {showAngle && (
//                   <div className="flex items-center">
//                     <span className="font-bold mr-2">Angle:</span>
//                     <input
//                       type="range"
//                       min="0"
//                       max="360"
//                       value={angles[index]}
//                       onChange={(e) => handleAngleChange(index, parseInt(e.target.value))}
//                       className="w-32 mr-2"
//                     />
//                     <input
//                       type="text"
//                       value={angles[index].toFixed(2)}
//                       readOnly
//                       className="p-1 border border-gray-300 rounded-md w-16 text-center"
//                     />
//                   </div>
//                 )}
//                 {showValue && (
//                   <>
//                     <div className="flex items-center">
//                       <span className="font-bold mr-2">Line Angle:</span>
//                       <input
//                         type="range"
//                         min="0"
//                         max="360"
//                         style={{width:'50px'}}
//                         value={lineAngles[index]}
//                         onChange={(e) => handleLineAngleChange(index, parseInt(e.target.value))}
//                         className="w-32 mr-2"
//                       />
//                     </div>
//                     <div className="flex items-center">
//                       <span className="font-bold mr-2">line Drag:</span>
//                       <input
//                         type="range"
//                         min="0"
//                         max="300"
//                         style={{width:'50px'}}
//                         value={lineLengths[index]}
//                         onChange={(e) => handleLineLengthChange(index, parseInt(e.target.value))}
//                         className="w-32 mr-2"
//                       />
//                     </div>
//                     <div>
//                       <span className="font-bold mr-2">Endpoint:</span>
//                       <input
//                         type="text"
//                         value={`X: ${lineEndpoints[index].x.toFixed(2)}, Y: ${lineEndpoints[index].y.toFixed(2)}`}
//                         readOnly
//                         className="p-1 border border-gray-300 rounded-md w-29  text-center"
//                       />
//                     </div>
//                     <div>
//                       <span className="font-bold mr-2">Calculate value:</span>
//                       <input
//                         type="text"
//                         value={calculatedHypotenuse[index].toFixed(2)}
//                         readOnly
//                         className="p-1 border border-gray-300 rounded-md w-16 text-center"
//                       />
//                     </div>
//                   </>
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
//             if (showValue) setShowValue(false);
//           }}
//           className="p-2 mt-4 text-white bg-blue-600 rounded-md"
//           style={{ position: 'absolute', left: '90%', top: '1000px', width: '200px', height: '60px' }}
//         >
//           {calculateDistances ? 'Hide Distance' : 'Show Distance'}
//         </button>
//         <button
//           onClick={() => {
//             setShowCenterPoint(prev => !prev);
//             if (calculateDistances) setCalculateDistances(false);
//             if (showAngle) setShowAngle(false);
//             if (showValue) setShowValue(false);
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
//             if (showValue) setShowValue(false);
//           }}
//           className="p-2 mt-4 text-white bg-purple-600 rounded-md"
//           style={{ position: 'absolute', left: '90%', top: '1160px', width: '200px', height: '60px' }}
//         >
//           {showAngle ? 'Hide Angle' : 'Show Angle'}
//         </button>
//         <button
//           onClick={() => {
//             setShowValue(prev => !prev);
//             if (calculateDistances) setCalculateDistances(false);
//             if (showCenterPoint) setShowCenterPoint(false);
//             if (showAngle) setShowAngle(false);
//           }}
//           className="p-2 mt-4 text-white bg-yellow-600 rounded-md"
//           style={{ position: 'absolute', left: '90%', top: '1240px', width: '200px', height: '60px' }}
//         >
//           {showValue ? 'Hide Value' : 'Show Value'}
//         </button>
//         <button
//           onClick={generateReport}
//           disabled={isGeneratingReport}
//           className="p-2 mt-4 text-white bg-red-600 rounded-md"
//           style={{ position: 'absolute', left: '90%', top: '1320px', width: '200px', height: '60px' }}
//         >
//           {isGeneratingReport ? 'Generating...' : 'Generate Report'}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default PolarPlot;


// //""""  below code zoomin and zoomout happening in both x and y axis simultaneously""""
// import React, { useEffect, useRef, useState } from 'react';
// import Dygraph from 'dygraphs';
// import html2canvas from 'html2canvas';
// import jsPDF from 'jspdf';

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
//   const [showValue, setShowValue] = useState(false);
//   const [lineAngles, setLineAngles] = useState(Array(6).fill(0));
//   const [lineLengths, setLineLengths] = useState(Array(6).fill(100));
//   const [lineEndpoints, setLineEndpoints] = useState(Array(6).fill({ x: 0, y: 0 }));
//   const [calculatedHypotenuse, setCalculatedHypotenuse] = useState(Array(6).fill(0));
//   const [isGeneratingReport, setIsGeneratingReport] = useState(false);
//   const [overallRange, setOverallRange] = useState([-1, 1]);

//   const colorPalette = ['#800080', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF'];
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

//       // Update overall range
//       setOverallRange(prevRange => {
//         const newMinX = Math.min(prevRange[0], minX);
//         const newMaxX = Math.max(prevRange[1], maxX);
//         const newMinY = Math.min(prevRange[0], minY);
//         const newMaxY = Math.max(prevRange[1], maxY);
//         const newMin = Math.min(newMinX, newMinY);
//         const newMax = Math.max(newMaxX, newMaxY);
//         return [newMin, newMax];
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
      
//       const range = overallRange;

//       let centerX = 0;
//       let centerY = 0;
//       if (data) {
//         centerX = plotData.reduce((sum, point) => sum + point[0], 0) / plotData.length;
//         centerY = plotData.reduce((sum, point) => sum + point[1], 0) / plotData.length;
//       }

//       const distanceToCoG = Math.sqrt(Math.pow(centerX, 2) + Math.pow(centerY, 2));

//       setDistances(prev => {
//         const updatedDistances = [...prev];
//         updatedDistances[index] = distanceToCoG;
//         return updatedDistances;
//       });

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
//             color: 'green',
//             pointSize: 6,
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
//         dateWindow: range,
//         valueRange: range,
//         axes: {
//           x: {
//             axisLabelFormatter: (d) => isNaN(d) ? '' : d.toFixed(3),
//             valueFormatter: (x) => isNaN(x) ? '' : x.toFixed(3),
//             drawGrid: false,
//             pixelsPerLabel: 30,
//             axisLabelWidth: 50,
//             ticker: (min, max, pixels, opts, dygraph, vals) => {
//               const numberOfTicks = 7;
//               const range = max - min;
//               const step = range / (numberOfTicks - 1);
//               const ticks = [];
//               for (let i = 0; i < numberOfTicks; i++) {
//                 ticks.push({v: min + i * step, label: (min + i * step).toFixed(3)});
//               }
//               return ticks;
//             },
//           },
//           y: {
//             axisLabelFormatter: (d) => isNaN(d) ? '' : d.toFixed(2),
//             valueFormatter: (y) => isNaN(y) ? '' : y.toFixed(2),
//             drawGrid: false,
//             pixelsPerLabel: 30,
//             axisLabelWidth: 50,
//           }
//         },
//         underlayCallback: (canvas, area, g) => {
//           canvas.save();
//           canvas.setLineDash([5, 5]);
//           canvas.strokeStyle = 'rgba(128, 128, 128, 0.5)';
//           canvas.lineWidth = 1;

//           const centerX = g.toDomXCoord(0);
//           canvas.beginPath();
//           canvas.moveTo(centerX, area.y);
//           canvas.lineTo(centerX, area.y + area.h);
//           canvas.stroke();

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
//             const centerX = g.toDomXCoord(0);
//             const centerY = g.toDomYCoord(0);
            
//             ctx.beginPath();
//             ctx.moveTo(centerX, centerY);
//             const angle = angles[index] * (Math.PI / 180);
//             const lineLength = 200;
//             const endX = centerX + lineLength * Math.cos(angle);
//             const endY = centerY - lineLength * Math.sin(angle);
//             ctx.lineTo(endX, endY);
//             ctx.strokeStyle = 'red';
//             ctx.lineWidth = 3;
//             ctx.stroke();
//           }

//           if (showValue) {
//             const canvas = g.hidden_;
//             const ctx = canvas.getContext('2d');
//             const centerX = g.toDomXCoord(0);
//             const centerY = g.toDomYCoord(0);
            
//             ctx.beginPath();
//             ctx.moveTo(centerX, centerY);
//             const angle = lineAngles[index] * (Math.PI / 180);
//             const lineLength = lineLengths[index];
//             const endX = centerX + lineLength * Math.cos(angle);
//             const endY = centerY - lineLength * Math.sin(angle);
//             ctx.lineTo(endX, endY);
//             ctx.strokeStyle = 'black';
//             ctx.lineWidth = 2;
//             ctx.stroke();

//             const xValue = lineLength * Math.cos(angle);
//             const yValue = lineLength * Math.sin(angle);
//             setLineEndpoints(prev => {
//               const newEndpoints = [...prev];
//               newEndpoints[index] = { x: xValue, y: yValue };
//               return newEndpoints;
//             });

//             // Calculate hypotenuse using Pythagorean theorem
//             const calculatedHyp = Math.sqrt(Math.pow(xValue, 2) + Math.pow(yValue, 2));
//             setCalculatedHypotenuse(prev => {
//               const newHypotenuse = [...prev];
//               newHypotenuse[index] = calculatedHyp;
//               return newHypotenuse;
              
//             });
//           }
//         }
//       };

//       const dygraphData = plotData.map(point => [point[0], point[1], null, null]);
//       if (calculateDistances && data) {
//         dygraphData.push([centerX, centerY, distanceToCoG, null]);
//       }
//       if (showCenterPoint) {
//         dygraphData.push([0, 0, null, 0]);
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
          
//           const xRange = dygraph.xAxisRange();
//           const yRange = dygraph.yAxisRange();
//           const xCenter = (xRange[0] + xRange[1]) / 2;
//           const yCenter = (yRange[0] + yRange[1]) / 2;
          
//           const newXRange = [
//             xCenter - (xCenter - xRange[0]) / zoomAmount,
//             xCenter + (xRange[1] - xCenter) / zoomAmount
//           ];
//           const newYRange = [
//             yCenter - (yCenter - yRange[0]) / zoomAmount,
//             yCenter + (yRange[1] - yCenter) / zoomAmount
//           ];

//           dygraph.updateOptions({
//             dateWindow: newXRange,
//             valueRange: newYRange
//           });
//         });
//       }

//       if (data) {
//         setCenterOfGravity(prev => {
//           const newCenterOfGravity = [...prev];
//           newCenterOfGravity[index] = { x: centerX, y: centerY };
//           return newCenterOfGravity;
//         });
//       }
//     }
//   };

//   useEffect(() => {
//     graphData.forEach((data, index) => {
//       createOrUpdateGraph(index);
//     });
//   }, [graphData, calculateDistances, showCenterPoint, showAngle, angles, showValue, lineAngles, lineLengths, overallRange]);

// useEffect(() => {
//     setOverallRange([-1, 1]); // Reset range
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

//   const handleAngleChange = (index, value) => {
//     setAngles(prev => {
//       const newAngles = [...prev];
//       newAngles[index] = value;
//       return newAngles;
//     });
//   };

//   const handleLineAngleChange = (index, value) => {
//     setLineAngles(prev => {
//       const newLineAngles = [...prev];
//       newLineAngles[index] = value;
//       return newLineAngles;
//     });
//   };

//   const handleLineLengthChange = (index, value) => {
//     setLineLengths(prev => {
//       const newLineLengths = [...prev];
//       newLineLengths[index] = value;
//       return newLineLengths;
//     });
//   };

//   const generateReport = async () => {
//     console.log("Starting report generation");
//     setIsGeneratingReport(true);
//     try {
//       const pdf = new jsPDF('l', 'mm', 'a4');
//       const pageWidth = pdf.internal.pageSize.width;
//       const pageHeight = pdf.internal.pageSize.height;
//       const margin = 10;
//       const graphWidth = (pageWidth - 4 * margin) / 3;
//       const graphHeight = (pageHeight - 3 * margin) / 2;
  
//       for (let i = 0; i < 6; i++) {
//         const graphContainer = graphContainerRef.current[i];
//         if (!graphContainer) {
//           console.log(`Graph container ${i+1} not found`);
//           continue;
//         }
//         console.log(`Capturing graph ${i+1}`);
//         const canvas = await html2canvas(graphContainer);
//         const imgData = canvas.toDataURL('image/png');
  
//         const row = Math.floor(i / 3);
//         const col = i % 3;
//         const xPosition = margin + col * (graphWidth + margin);
//         const yPosition = margin + row * (graphHeight + margin);
  
//         pdf.addImage(imgData, 'PNG', xPosition, yPosition, graphWidth, graphHeight - 25);
  
//         if (graphData[i]) {
//           pdf.setFontSize(9);
//           pdf.text(`Graph ${i + 1}: ${graphData[i].fileName}`, xPosition, yPosition - 2);
          
//           // Add calculated values
//           pdf.setFontSize(7);
//           const valueY = yPosition + graphHeight - 23;
//           pdf.text(`CoG: ${distances[i].toFixed(2)}`, xPosition, valueY);
//           pdf.text(`Status: ${dataStatus[i] || 'N/A'}`, xPosition, valueY + 4);
//           pdf.text(`Filter: 1`, xPosition, valueY + 8);
//           if (showAngle) {
//             pdf.text(`Angle: ${angles[i].toFixed(2)}°`, xPosition + 40, valueY);
//           }
//           if (showValue) {
//             pdf.text(`Line Angle: ${lineAngles[i].toFixed(2)}°`, xPosition + 40, valueY + 4);
//             pdf.text(`Line Length: ${lineLengths[i].toFixed(2)}`, xPosition + 40, valueY + 8);
//             pdf.text(`Endpoint: (${lineEndpoints[i].x.toFixed(2)}, ${lineEndpoints[i].y.toFixed(2)})`, xPosition, valueY + 12);
//             pdf.text(`Calculated Value: ${calculatedHypotenuse[i].toFixed(2)}`, xPosition, valueY + 16);
//           }
//         }
//       }
  
//       console.log("Saving PDF");
//       pdf.save('polar_plot_report.pdf');
//     } catch (error) {
//       console.error("Error generating report:", error);
//     } finally {
//       setIsGeneratingReport(false);
//     }
//   };
  
//   return (
//     <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center ${isVisible ? '' : 'hidden'}`}>
//       <div className="bg-[#f1f1f1] p-4 rounded-md relative" style={{ width: '100%', maxWidth: '3000px', height: '100%', maxHeight: '1400px' }} onClick={(e) => e.stopPropagation()}>
//         <div className="grid grid-cols-3 gap-4" style={{ height: '900px', position: 'absolute', top: '100px', width: '2200px' }}>
//           {Array.from({ length: 6 }).map((_, index) => (
//             <div key={index} className="my-4" style={{border:'5px groove lightgray'}}>
//               <h2 className="text-xl font-bold">Graph {index + 1}</h2>
//               <div ref={(el) => graphContainerRef.current[index] = el} style={{ width: '100%', height: '480px' }}></div>
//               <div className="mt-2 flex justify-between">
//                 <div>
//                   <span className="font-bold">CoG:</span>
//                   <input
//                     type="text"
//                     value={calculateDistances ? distances[index].toFixed(2) : 'N/A'}
//                     readOnly
//                     className="ml-2 p-1 border border-gray-300 rounded-md w-10"
//                   />
//                 </div>
//                 <div>
//                   <span className="font-bold mr-2">Status:</span>
//                   <input
//                     type="text"
//                     value={dataStatus[index] || ''}
//                     readOnly
//                     className="p-1 border border-300 rounded-md w-10"
//                   />
//                 </div>
//                 <div>
//                   <span className="font-bold mr-2">Filter:</span>
//                   <input
//                     type="text"
//                     value="1"
//                     readOnly
//                     className="p-1 border border-gray-300 rounded-md w-5 text-center"
//                   />
//                 </div>
//                 {showAngle && (
//                   <div className="flex items-center">
//                     <span className="font-bold mr-2">Angle:</span>
//                     <input
//                       type="range"
//                       min="0"
//                       max="360"
//                       value={angles[index]}
//                       onChange={(e) => handleAngleChange(index, parseInt(e.target.value))}
//                       className="w-32 mr-2"
//                     />
//                     <input
//                       type="text"
//                       value={angles[index].toFixed(2)}
//                       readOnly
//                       className="p-1 border border-gray-300 rounded-md w-16 text-center"
//                     />
//                   </div>
//                 )}
//                 {showValue && (
//                   <>
//                     <div className="flex items-center">
//                       <span className="font-bold mr-2">Line Angle:</span>
//                       <input
//                         type="range"
//                         min="0"
//                         max="360"
//                         style={{width:'50px'}}
//                         value={lineAngles[index]}
//                         onChange={(e) => handleLineAngleChange(index, parseInt(e.target.value))}
//                         className="w-32 mr-2"
//                       />
//                     </div>
//                     <div className="flex items-center">
//                       <span className="font-bold mr-2">line Drag:</span>
//                       <input
//                         type="range"
//                         min="0"
//                         max="300"
//                         style={{width:'50px'}}
//                         value={lineLengths[index]}
//                         onChange={(e) => handleLineLengthChange(index, parseInt(e.target.value))}
//                         className="w-32 mr-2"
//                       />
//                     </div>
//                     <div>
//                       <span className="font-bold mr-2">Endpoint:</span>
//                       <input
//                         type="text"
//                         value={`X: ${lineEndpoints[index].x.toFixed(2)}, Y: ${lineEndpoints[index].y.toFixed(2)}`}
//                         readOnly
//                         className="p-1 border border-gray-300 rounded-md w-29  text-center"
//                       />
//                     </div>
//                     <div>
//                       <span className="font-bold mr-2">Calculate value:</span>
//                       <input
//                         type="text"
//                         value={calculatedHypotenuse[index].toFixed(2)}
//                         readOnly
//                         className="p-1 border border-gray-300 rounded-md w-16 text-center"
//                       />
//                     </div>
//                   </>
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
//             if (showValue) setShowValue(false);
//           }}
//           className="p-2 mt-4 text-white bg-blue-600 rounded-md"
//           style={{ position: 'absolute', left: '90%', top: '1000px', width: '200px', height: '60px' }}
//         >
//           {calculateDistances ? 'Hide Distance' : 'Show Distance'}
//         </button>
//         <button
//           onClick={() => {
//             setShowCenterPoint(prev => !prev);
//             if (calculateDistances) setCalculateDistances(false);
//             if (showAngle) setShowAngle(false);
//             if (showValue) setShowValue(false);
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
//             if (showValue) setShowValue(false);
//           }}
//           className="p-2 mt-4 text-white bg-purple-600 rounded-md"
//           style={{ position: 'absolute', left: '90%', top: '1160px', width: '200px', height: '60px' }}
//         >
//           {showAngle ? 'Hide Angle' : 'Show Angle'}
//         </button>
//         <button
//           onClick={() => {
//             setShowValue(prev => !prev);
//             if (calculateDistances) setCalculateDistances(false);
//             if (showCenterPoint) setShowCenterPoint(false);
//             if (showAngle) setShowAngle(false);
//           }}
//           className="p-2 mt-4 text-white bg-yellow-600 rounded-md"
//           style={{ position: 'absolute', left: '90%', top: '1240px', width: '200px', height: '60px' }}
//         >
//           {showValue ? 'Hide Value' : 'Show Value'}
//         </button>
//         <button
//           onClick={generateReport}
//           disabled={isGeneratingReport}
//           className="p-2 mt-4 text-white bg-red-600 rounded-md"
//           style={{ position: 'absolute', left: '90%', top: '1320px', width: '200px', height: '60px' }}
//         >
//           {isGeneratingReport ? 'Generating...' : 'Generate Report'}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default PolarPlot;

//""below code plus+ line correctly showing at center ,and zoom in and out also correctly working ,show centre,show distance,show angle,show value ,genretae report everything working correctly
// import React, { useEffect, useRef, useState } from 'react';
// import Dygraph from 'dygraphs';
// import html2canvas from 'html2canvas';
// import jsPDF from 'jspdf';

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
//   const [showValue, setShowValue] = useState(false);
//   const [lineAngles, setLineAngles] = useState(Array(6).fill(0));
//   const [lineLengths, setLineLengths] = useState(Array(6).fill(100));
//   const [lineEndpoints, setLineEndpoints] = useState(Array(6).fill({ x: 0, y: 0 }));
//   const [calculatedHypotenuse, setCalculatedHypotenuse] = useState(Array(6).fill(0));
//   const [isGeneratingReport, setIsGeneratingReport] = useState(false);
//   const [overallRange, setOverallRange] = useState([-25, 25]);

//   const colorPalette = ['#800080', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF'];
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

//       // Update overall range
//       setOverallRange(prevRange => {
//         const newMinX = Math.min(prevRange[0], minX);
//         const newMaxX = Math.max(prevRange[1], maxX);
//         const newMinY = Math.min(prevRange[0], minY);
//         const newMaxY = Math.max(prevRange[1], maxY);
//         const newMin = Math.min(newMinX, newMinY);
//         const newMax = Math.max(newMaxX, newMaxY);
//         return [newMin, newMax];
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
      
//       const range = overallRange;

//       let centerX = 0;
//       let centerY = 0;
//       if (data) {
//         centerX = plotData.reduce((sum, point) => sum + point[0], 0) / plotData.length;
//         centerY = plotData.reduce((sum, point) => sum + point[1], 0) / plotData.length;
//       }

//       const distanceToCoG = Math.sqrt(Math.pow(centerX, 2) + Math.pow(centerY, 2));

//       setDistances(prev => {
//         const updatedDistances = [...prev];
//         updatedDistances[index] = distanceToCoG;
//         return updatedDistances;
//       });

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
//             color: 'green',
//             pointSize: 6,
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
//         gridLineColor: 'lightgray',
//         dateWindow: range,
//         valueRange: range,
//         axes: {
//           x: {
//             axisLabelFormatter: (d) => d.toFixed(3),
//             valueFormatter: (x) => x.toFixed(3),
//             drawGrid: true,
//             independentTicks: true,
//           },
//           y: {
//             axisLabelFormatter: (d) => d.toFixed(3),
//             valueFormatter: (y) => y.toFixed(3),
//             drawGrid: true,
//             independentTicks: true,
//           }
//         },
//         underlayCallback: (canvas, area, g) => {
//           // Draw fixed axes
//           canvas.save();
//           canvas.strokeStyle = 'rgba(0, 0, 0, 0.5)';
//           canvas.lineWidth = 1;

//           const centerX = g.toDomXCoord(0);
//           const centerY = g.toDomYCoord(0);

//           // Vertical line
//           canvas.beginPath();
//           canvas.moveTo(centerX, area.y);
//           canvas.lineTo(centerX, area.y + area.h);
//           canvas.stroke();

//           // Horizontal line
//           canvas.beginPath();
//           canvas.moveTo(area.x, centerY);
//           canvas.lineTo(area.x + area.w, centerY);
//           canvas.stroke();

//           // Draw center point
//           if (showCenterPoint) {
//             canvas.fillStyle = 'red';
//             canvas.beginPath();
//             canvas.arc(centerX, centerY, 3, 0, 2 * Math.PI);
//             canvas.fill();
//           }

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
//             const centerX = g.toDomXCoord(0);
//             const centerY = g.toDomYCoord(0);
            
//             ctx.beginPath();
//             ctx.moveTo(centerX, centerY);
//             const angle = angles[index] * (Math.PI / 180);
//             const lineLength = 200;
//             const endX = centerX + lineLength * Math.cos(angle);
//             const endY = centerY - lineLength * Math.sin(angle);
//             ctx.lineTo(endX, endY);
//             ctx.strokeStyle = 'red';
//             ctx.lineWidth = 3;
//             ctx.stroke();
//           }

//           if (showValue) {
//             const canvas = g.hidden_;
//             const ctx = canvas.getContext('2d');
//             const centerX = g.toDomXCoord(0);
//             const centerY = g.toDomYCoord(0);
            
//             ctx.beginPath();
//             ctx.moveTo(centerX, centerY);
//             const angle = lineAngles[index] * (Math.PI / 180);
//             const lineLength = lineLengths[index];
//             const endX = centerX + lineLength * Math.cos(angle);
//             const endY = centerY - lineLength * Math.sin(angle);
//             ctx.lineTo(endX, endY);
//             ctx.strokeStyle = 'black';
//             ctx.lineWidth = 2;
//             ctx.stroke();

//             const xValue = lineLength * Math.cos(angle);
//             const yValue = lineLength * Math.sin(angle);
//             setLineEndpoints(prev => {
//               const newEndpoints = [...prev];
//               newEndpoints[index] = { x: xValue, y: yValue };
//               return newEndpoints;
//             });

//             // Calculate hypotenuse using Pythagorean theorem
//             const calculatedHyp = Math.sqrt(Math.pow(xValue, 2) + Math.pow(yValue, 2));
//             setCalculatedHypotenuse(prev => {
//               const newHypotenuse = [...prev];
//               newHypotenuse[index] = calculatedHyp;
//               return newHypotenuse;
//             });
//           }
//         }
//       };

//       const dygraphData = plotData.map(point => [point[0], point[1], null, null]);
//       if (calculateDistances && data) {
//         dygraphData.push([centerX, centerY, distanceToCoG, null]);
//       }
//       if (showCenterPoint) {
//         dygraphData.push([0, 0, null, 0]);
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
          
//           const xRange = dygraph.xAxisRange();
//           const yRange = dygraph.yAxisRange();
//           const xCenter = (xRange[0] + xRange[1]) / 2;
//           const yCenter = (yRange[0] + yRange[1]) / 2;
          
//           const newXRange = [
//             xCenter - (xCenter - xRange[0]) / zoomAmount,
//             xCenter + (xRange[1] - xCenter) / zoomAmount
//           ];
//           const newYRange = [
//             yCenter - (yCenter - yRange[0]) / zoomAmount,
//             yCenter + (yRange[1] - yCenter) / zoomAmount
//           ];

//           dygraph.updateOptions({
//             dateWindow: newXRange,
//             valueRange: newYRange
//           });
//         });
//       }

//       if (data) {
//         setCenterOfGravity(prev => {
//           const newCenterOfGravity = [...prev];
//           newCenterOfGravity[index] = { x: centerX, y: centerY };
//           return newCenterOfGravity;
//         });
//       }
//     }
//   };



// //''this below useeffect is reolved reloading
//   useEffect(() => {
//     graphData.forEach((data, index) => {
//       const updatedIndex = graphData.findIndex(data => data && data.fileName === selectedFiles[selectedFiles.length - 1].name);
//       if (updatedIndex !== -1) {
//         createOrUpdateGraph(updatedIndex);
//       }
//     });
//   }, [graphData, calculateDistances, showCenterPoint, showAngle, angles, showValue, lineAngles, lineLengths, overallRange]);


//   useEffect(() => {
//     setOverallRange([-25, 25]); // Reset range to initial value
//     const newGraphData = Array(6).fill(null);
//     selectedFiles.forEach((file, index) => {
//       handleFileSelection(file, index);
//     });
//     setGraphData(newGraphData);
//   }, [selectedFiles]);

//   useEffect(() => {
//     // Initialize graphs with placeholder data
//     for (let i = 0; i < 6; i++) {
//       createOrUpdateGraph(i);
//     }
//   }, []);

// const handleFileToggle = (file) => {
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

//   const handleAngleChange = (index, value) => {
//     setAngles(prev => {
//       const newAngles = [...prev];
//       newAngles[index] = value;
//       return newAngles;
//     });
//   };

//   const handleLineAngleChange = (index, value) => {
//     setLineAngles(prev => {
//       const newLineAngles = [...prev];
//       newLineAngles[index] = value;
//       return newLineAngles;
//     });
//   };

//   const handleLineLengthChange = (index, value) => {
//     setLineLengths(prev => {
//       const newLineLengths = [...prev];
//       newLineLengths[index] = value;
//       return newLineLengths;
//     });
//   };

 

// const generateReport = async () => {
//   console.log("Starting report generation");
//   setIsGeneratingReport(true);

//   try {
//     const pdf = new jsPDF('l', 'mm', 'a4');
//     const pageWidth = pdf.internal.pageSize.width;
//     const pageHeight = pdf.internal.pageSize.height;
//     const margin = 10;
//     const graphWidth = (pageWidth - 4 * margin) / 3;
//     const graphHeight = (pageHeight - 3 * margin) / 2;

//     let currentPage = 1; // Track the current page
//     let row = 0;
//     let col = 0;

//     for (let i = 0; i < selectedFiles.length; i++) {
//       const graphContainer = graphContainerRef.current[i];

//       if (!graphContainer) {
//         console.log(`Graph container ${i + 1} not found`);
//         continue;
//       }

//       console.log(`Capturing graph ${i + 1}`);
//       const canvas = await html2canvas(graphContainer);
//       const imgData = canvas.toDataURL('image/png');

//       // Handle page breaks for every 3 graphs
//       if (i % 3 === 0 && i !== 0) { // Check if it's the first graph on a new page
//         pdf.addPage();
//         currentPage++;
//         row = 0;
//         col = 0;
//       }

//       const xPosition = margin + col * (graphWidth + margin);
//       const yPosition = margin + row * (graphHeight + margin);

//       pdf.addImage(imgData, 'PNG', xPosition, yPosition, graphWidth, graphHeight - 25);

//       if (graphData[i]) {
//         pdf.setFontSize(9);
//         pdf.text(`Graph ${i + 1}: ${graphData[i].fileName}`, xPosition, yPosition - 2);

//         pdf.setFontSize(7);
//         let valueY = yPosition + graphHeight - 23;
//         pdf.text(`CoG: ${distances[i].toFixed(2)}`, xPosition, valueY);
//         pdf.text(`Status: ${dataStatus[i] || 'N/A'}`, xPosition, valueY + 4);
//         pdf.text(`Filter: 1`, xPosition, valueY + 8);

//         if (showAngle) {
//           pdf.text(`Angle: ${angles[i].toFixed(2)}°`, xPosition + 40, valueY);
//         }

//         if (showValue) {
//           pdf.text(`Line Angle: ${lineAngles[i].toFixed(2)}°`, xPosition + 40, valueY + 4);
//           pdf.text(`Line Length: ${lineLengths[i].toFixed(2)}`, xPosition + 40, valueY + 8);
//           pdf.text(`Endpoint: (${lineEndpoints[i].x.toFixed(2)}, ${lineEndpoints[i].y.toFixed(2)})`, xPosition, valueY + 12);
//           pdf.text(`Calculated Value: ${calculatedHypotenuse[i].toFixed(2)}`, xPosition, valueY + 16);
//         }

//         const file = selectedFiles[i];
//         if (file) {
//           const reader = new FileReader();
//           reader.onload = (e) => {
//             const fileContent = e.target.result;
//             const lines = fileContent.split('\n');
//             const additionalInfo = {};

//             lines.forEach(line => {
//               if (line.startsWith('#')) {
//                 line = line.substring(1).trim();
//                 if (line.includes(':')) {
//                   const [key, ...values] = line.split(':').map(s => s.trim());
//                   additionalInfo[key] = values.join(':').trim();
//                 } else if (line.includes('=')) {
//                   const parts = line.split(/\s+/).filter(part => part !== '=');
//                   for (let i = 0; i < parts.length; i += 2) {
//                     if (parts[i] && parts[i + 1]) {
//                       additionalInfo[parts[i]] = parts[i + 1];
//                     }
//                   }
//                 }
//               }
//             });

//             // Special handling for vc and n
//             if (additionalInfo['vc'] === '' && additionalInfo['n']) {
//               additionalInfo['vc'] = '';
//               additionalInfo['n'] = additionalInfo['n'];
//             }

//             valueY += 20;
//             pdf.setFontSize(6);
//             pdf.text("File Information:", xPosition, valueY);
//             valueY += 4;

//             const infoToDisplay = [
//               ['date', 'operator'], ['process'], ['tool'], ['material'], ['tool gage'],
//               ['d', 'z'], ['ap', 'ae'], ['vc', 'n'], ['f', 'vf'], ['X'], ['cooling'], ['unit type'], ['note']
//             ];

//             infoToDisplay.forEach((keys, index) => {
//               const displayStrings = keys.map(key => {
//                 const value = additionalInfo[key];
//                 return value !== undefined ? `${key}: ${value}` : '';
//               }).filter(s => s);
//               if (displayStrings.length > 0) {
//                 pdf.text(displayStrings.join('    '), xPosition, valueY + index * 4);
//               }
//             });

//             // If this is the last graph on the current page, save the PDF
//             if (i === selectedFiles.length - 1 || (i % 3 === 2 && i !== selectedFiles.length - 1)) {
//               pdf.save('polar_plot_report.pdf');
//               setIsGeneratingReport(false);
//             }
//           };
//           reader.readAsText(file);
//         } else {
//           // If there's no file for this graph, move on to the next one
//           if (i === selectedFiles.length - 1 || (i % 3 === 2 && i !== selectedFiles.length - 1)) {
//             pdf.save('polar_plot_report.pdf');
//             setIsGeneratingReport(false);
//           }
//         }

//         // Increment row and col for the next graph
//         col++;
//         if (col >= 3) {
//           col = 0;
//           row++;
//         }
//       }
//     }
//   } catch (error) {
//     console.error("Error generating report:", error);
//     setIsGeneratingReport(false);
//   }
// };

//   return (
//     <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center ${isVisible ? '' : 'hidden'}`}>
//       <div className="bg-[#f1f1f1] p-4 rounded-md relative" style={{ width: '100%', maxWidth: '3000px', height: '100%', maxHeight: '1400px' }} onClick={(e) => e.stopPropagation()}>
//         <div className="grid grid-cols-3 gap-4" style={{ height: '900px', position: 'absolute', top: '100px', width: '2200px' }}>
//           {Array.from({ length: 6 }).map((_, index) => (
//             <div key={index} className="my-4" style={{border:'5px groove lightgray'}}>
//               <h2 className="text-xl font-bold">Graph {index + 1}</h2>
//               <div ref={(el) => graphContainerRef.current[index] = el} style={{ width: '100%', height: '480px' }}></div>
//               <div className="mt-2 flex justify-between">
//                 <div>
//                   <span className="font-bold">CoG:</span>
//                   <input
//                     type="text"
//                     value={calculateDistances ? distances[index].toFixed(2) : 'N/A'}
//                     readOnly
//                     className="ml-2 p-1 border border-gray-300 rounded-md w-10"
//                   />
//                 </div>
//                 <div>
//                   <span className="font-bold mr-2">Status:</span>
//                   <input
//                     type="text"
//                     value={dataStatus[index] || ''}
//                     readOnly
//                     className="p-1 border border-300 rounded-md w-10"
//                   />
//                 </div>
//                 <div>
//                   <span className="font-bold mr-2">Filter:</span>
//                   <input
//                     type="text"
//                     value="1"
//                     readOnly
//                     className="p-1 border border-gray-300 rounded-md w-5 text-center"
//                   />
//                 </div>
//                 {showAngle && (
//                   <div className="flex items-center">
//                     <span className="font-bold mr-2">Angle:</span>
//                     <input
//                       type="range"
//                       min="0"
//                       max="360"
//                       value={angles[index]}
//                       onChange={(e) => handleAngleChange(index, parseInt(e.target.value))}
//                       className="w-32 mr-2"
//                     />
//                     <input
//                       type="text"
//                       value={angles[index].toFixed(2)}
//                       readOnly
//                       className="p-1 border border-gray-300 rounded-md w-16 text-center"
//                     />
//                   </div>
//                 )}
//                 {showValue && (
//                   <>
//                     <div className="flex items-center">
//                       <span className="font-bold mr-2">Line Angle:</span>
//                       <input
//                         type="range"
//                         min="0"
//                         max="360"
//                         style={{width:'50px'}}
//                         value={lineAngles[index]}
//                         onChange={(e) => handleLineAngleChange(index, parseInt(e.target.value))}
//                         className="w-32 mr-2"
//                       />
//                     </div>
//                     <div className="flex items-center">
//                       <span className="font-bold mr-2">line Drag:</span>
//                       <input
//                         type="range"
//                         min="0"
//                         max="300"
//                         style={{width:'50px'}}
//                         value={lineLengths[index]}
//                         onChange={(e) => handleLineLengthChange(index, parseInt(e.target.value))}
//                         className="w-32 mr-2"
//                       />
//                     </div>
//                     <div>
//                       <span className="font-bold mr-2">Endpoint:</span>
//                       <input
//                         type="text"
//                         value={`X: ${lineEndpoints[index].x.toFixed(2)}, Y: ${lineEndpoints[index].y.toFixed(2)}`}
//                         readOnly
//                         className="p-1 border border-gray-300 rounded-md w-29  text-center"
//                       />
//                     </div>
//                     <div>
//                       <span className="font-bold mr-2">Calculate value:</span>
//                       <input
//                         type="text"
//                         value={calculatedHypotenuse[index].toFixed(2)}
//                         readOnly
//                         className="p-1 border border-gray-300 rounded-md w-16 text-center"
//                       />
//                     </div>
//                   </>
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
//             if (showValue) setShowValue(false);
//           }}
//           className="p-2 mt-4 text-white bg-blue-600 rounded-md"
//           style={{ position: 'absolute', left: '90%', top: '1000px', width: '200px', height: '60px' }}
//         >
//           {calculateDistances ? 'Hide Distance' : 'Show Distance'}
//         </button>
//         <button
//           onClick={() => {
//             setShowCenterPoint(prev => !prev);
//             if (calculateDistances) setCalculateDistances(false);
//             if (showAngle) setShowAngle(false);
//             if (showValue) setShowValue(false);
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
//             if (showValue) setShowValue(false);
//           }}
//           className="p-2 mt-4 text-white bg-purple-600 rounded-md"
//           style={{ position: 'absolute', left: '90%', top: '1160px', width: '200px', height: '60px' }}
//         >
//           {showAngle ? 'Hide Angle' : 'Show Angle'}
//         </button>
//         <button
//           onClick={() => {
//             setShowValue(prev => !prev);
//             if (calculateDistances) setCalculateDistances(false);
//             if (showCenterPoint) setShowCenterPoint(false);
//             if (showAngle) setShowAngle(false);
//           }}
//           className="p-2 mt-4 text-white bg-yellow-600 rounded-md"
//           style={{ position: 'absolute', left: '90%', top: '1240px', width: '200px', height: '60px' }}
//         >
//           {showValue ? 'Hide Value' : 'Show Value'}
//         </button>
//         <button
//           onClick={generateReport}
//           disabled={isGeneratingReport}
//           className="p-2 mt-4 text-white bg-red-600 rounded-md"
//           style={{ position: 'absolute', left: '90%', top: '1320px', width: '200px', height: '60px' }}
//         >
//           {isGeneratingReport ? 'Generating...' : 'Generate Report'}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default PolarPlot;




// import React, { useEffect, useRef, useState } from 'react';
// import Dygraph from 'dygraphs';
// import html2canvas from 'html2canvas';
// import jsPDF from 'jspdf';

// const PolarPlot = ({ isVisible, onClose }) => {
//   const [files, setFiles] = useState([]);
//   const [selectedFiles, setSelectedFiles] = useState(Array(6).fill(null));
//   const graphContainerRef = useRef([]);
//   const [distances, setDistances] = useState(Array(6).fill(0));
//   const [calculateDistances, setCalculateDistances] = useState(false);
//   const [graphData, setGraphData] = useState(Array(6).fill(null));
//   const [dataStatus, setDataStatus] = useState(Array(6).fill(''));
//   const [showCenterPoint, setShowCenterPoint] = useState(true);
//   const [centerOfGravity, setCenterOfGravity] = useState(Array(6).fill({ x: 0, y: 0 }));
//   const [showAngle, setShowAngle] = useState(true);
//   const [angles, setAngles] = useState(Array(6).fill(45));
//   const [showValue, setShowValue] = useState(true);
//   const [lineAngles, setLineAngles] = useState(Array(6).fill(45));
//   const [lineLengths, setLineLengths] = useState(Array(6).fill(100));
//   const [lineEndpoints, setLineEndpoints] = useState(Array(6).fill({ x: 0, y: 0 }));
//   const [calculatedHypotenuse, setCalculatedHypotenuse] = useState(Array(6).fill(0));
//   const [isGeneratingReport, setIsGeneratingReport] = useState(false);
//   const [overallRange, setOverallRange] = useState([-25, 25]);

//   const colorPalette = ['#800080', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF'];
//   const zoomFactor = 1.2;

//   const placeholderData = Array(6).fill().map(() => [
//     [0, 0], [1, 1], [-1, -1], [1, -1], [-1, 1]
//   ]);

//   const handleFolderUpload = (e) => {
//     const uploadedFiles = Array.from(e.target.files);
//     setFiles(uploadedFiles);
//   };

//   const handleFileSelection = (file, index) => {
//     if (file instanceof File) {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         const fileData = e.target.result;
//         processFileData(fileData, file.name, index);
//       };
//       reader.onerror = (error) => {
//         console.error("FileReader error:", error);
//         setDataStatus(prevStatus => {
//           const newStatus = [...prevStatus];
//           newStatus[index] = 'ERROR';
//           return newStatus;
//         });
//       };
//       reader.readAsText(file);
//     } else {
//       console.error("Invalid file object:", file);
//       setDataStatus(prevStatus => {
//         const newStatus = [...prevStatus];
//         newStatus[index] = 'ERROR';
//         return newStatus;
//       });
//     }
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

//       // Update overall range
//       setOverallRange(prevRange => {
//         const newMinX = Math.min(prevRange[0], minX);
//         const newMaxX = Math.max(prevRange[1], maxX);
//         const newMinY = Math.min(prevRange[0], minY);
//         const newMaxY = Math.max(prevRange[1], maxY);
//         const newMin = Math.min(newMinX, newMinY);
//         const newMax = Math.max(newMaxX, newMaxY);
//         return [newMin, newMax];
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
      
//       const range = overallRange;

//       let centerX = 0;
//       let centerY = 0;
//       if (data) {
//         centerX = plotData.reduce((sum, point) => sum + point[0], 0) / plotData.length;
//         centerY = plotData.reduce((sum, point) => sum + point[1], 0) / plotData.length;
//       }

//       const distanceToCoG = Math.sqrt(Math.pow(centerX, 2) + Math.pow(centerY, 2));

//       setDistances(prev => {
//         const updatedDistances = [...prev];
//         updatedDistances[index] = distanceToCoG;
//         return updatedDistances;
//       });

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
//             color: 'green',
//             pointSize: 6,
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
//         width: 400,
//         height: 400,
//         gridLineColor: 'lightgray',
//         dateWindow: range,
//         valueRange: range,
//         axes: {
//           x: {
//             axisLabelFormatter: (d) => d.toFixed(3),
//             valueFormatter: (x) => x.toFixed(3),
//             drawGrid: true,
//             independentTicks: true,
//           },
//           y: {
//             axisLabelFormatter: (d) => d.toFixed(3),
//             valueFormatter: (y) => y.toFixed(3),
//             drawGrid: true,
//             independentTicks: true,
//           }
//         },
//         underlayCallback: (canvas, area, g) => {
//           // Draw fixed axes
//           canvas.save();
//           canvas.strokeStyle = 'rgba(0, 0, 0, 0.5)';
//           canvas.lineWidth = 1;

//           const centerX = g.toDomXCoord(0);
//           const centerY = g.toDomYCoord(0);

//           // Vertical line
//           canvas.beginPath();
//           canvas.moveTo(centerX, area.y);
//           canvas.lineTo(centerX, area.y + area.h);
//           canvas.stroke();

//           // Horizontal line
//           canvas.beginPath();
//           canvas.moveTo(area.x, centerY);
//           canvas.lineTo(area.x + area.w, centerY);
//           canvas.stroke();

//           // Draw center point
//           if (showCenterPoint) {
//             canvas.fillStyle = 'red';
//             canvas.beginPath();
//             canvas.arc(centerX, centerY, 3, 0, 2 * Math.PI);
//             canvas.fill();
//           }

//           // Draw angle line
//           if (showAngle) {
//             canvas.beginPath();
//             canvas.moveTo(centerX, centerY);
//             const angle = angles[index] * (Math.PI / 180);
//             const lineLength = 200;
//             const endX = centerX + lineLength * Math.cos(angle);
//             const endY = centerY - lineLength * Math.sin(angle);
//             canvas.lineTo(endX, endY);
//             canvas.strokeStyle = 'red';
//             canvas.lineWidth = 2;
//             canvas.stroke();
//           }

//           // Draw value line
//           if (showValue) {
//             canvas.beginPath();
//             canvas.moveTo(centerX, centerY);
//             const angle = lineAngles[index] * (Math.PI / 180);
//             const lineLength = lineLengths[index];
//             const endX = centerX + lineLength * Math.cos(angle);
//             const endY = centerY - lineLength * Math.sin(angle);
//             canvas.lineTo(endX, endY);
//             canvas.strokeStyle = 'black';
//             canvas.lineWidth = 2;
//             canvas.stroke();
//           }

//           // Draw distance text box
//           if (calculateDistances) {
//             canvas.fillStyle = 'rgba(255, 255, 255, 0.8)';
//             canvas.fillRect(area.x + 10, area.y + 10, 150, 30);
//             canvas.fillStyle = 'black';
//             canvas.font = '12px Arial';
//             canvas.fillText(`Distance: ${distanceToCoG.toFixed(3)}`, area.x + 15, area.y + 30);
//           }

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
//           const xValue = lineLengths[index] * Math.cos(lineAngles[index] * (Math.PI / 180));
//           const yValue = lineLengths[index] * Math.sin(lineAngles[index] * (Math.PI / 180));
//           setLineEndpoints(prev => {
//             const newEndpoints = [...prev];
//             newEndpoints[index] = { x: xValue, y: yValue };
//             return newEndpoints;
//           });

//           // Calculate hypotenuse using Pythagorean theorem
//           const calculatedHyp = Math.sqrt(Math.pow(xValue, 2) + Math.pow(yValue, 2));
//           setCalculatedHypotenuse(prev => {
//             const newHypotenuse = [...prev];
//             newHypotenuse[index] = calculatedHyp;
//             return newHypotenuse;
//           });
//         }
//       };

//       const dygraphData = plotData.map(point => [point[0], point[1], null, null]);
//       if (calculateDistances && data) {
//         dygraphData.push([centerX, centerY, distanceToCoG, null]);
//       }
//       if (showCenterPoint) {
//         dygraphData.push([0, 0, null, 0]);
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
          
//           const xRange = dygraph.xAxisRange();
//           const yRange = dygraph.yAxisRange();
//           const xCenter = (xRange[0] + xRange[1]) / 2;
//           const yCenter = (yRange[0] + yRange[1]) / 2;
          
//           const newXRange = [
//             xCenter - (xCenter - xRange[0]) / zoomAmount,
//             xCenter + (xRange[1] - xCenter) / zoomAmount
//           ];
//           const newYRange = [
//             yCenter - (yCenter - yRange[0]) / zoomAmount,
//             yCenter + (yRange[1] - yCenter) / zoomAmount
//           ];

//           dygraph.updateOptions({
//             dateWindow: newXRange,
//             valueRange: newYRange
//           });
//         });
//       }

//       if (data) {
//        setCenterOfGravity(prev => {
//           const newCenterOfGravity = [...prev];
//           newCenterOfGravity[index] = { x: centerX, y: centerY };
//           return newCenterOfGravity;
//         });
//       }
//     }
//   };

//   useEffect(() => {
//     graphData.forEach((data, index) => {
//       createOrUpdateGraph(index);
//     });
//   }, [graphData, calculateDistances, showCenterPoint, showAngle, angles, showValue, lineAngles, lineLengths, overallRange]);

//   useEffect(() => {
//     setOverallRange([-25, 25]); // Reset range to initial value
//     selectedFiles.forEach((file, index) => {
//       if (file) {
//         handleFileSelection(file, index);
//       } else {
//         // Clear the graph data for this index if no file is selected
//         setGraphData(prev => {
//           const newData = [...prev];
//           newData[index] = null;
//           return newData;
//         });
//       }
//     });
//   }, [selectedFiles]);

//   useEffect(() => {
//     // Initialize graphs with placeholder data
//     placeholderData.forEach((_, index) => {
//       createOrUpdateGraph(index);
//     });
//   }, []);

//   const handleGenerateReport = async () => {
//     setIsGeneratingReport(true);
//     const pdf = new jsPDF();
//     let yOffset = 10;

//     // Add title
//     pdf.setFontSize(16);
//     pdf.text('Polar Plot Report', 105, yOffset, { align: 'center' });
//     yOffset += 10;

//     for (let i = 0; i < 6; i++) {
//       if (graphData[i] || placeholderData[i]) {
//         // Capture graph as image
//         const graphElement = graphContainerRef.current[i];
//         const canvas = await html2canvas(graphElement);
//         const imgData = canvas.toDataURL('image/png');

//         // Add graph image to PDF
//         pdf.addImage(imgData, 'PNG', 10, yOffset, 120, 120);

//         // Add graph details
//         pdf.setFontSize(12);
//         pdf.text(`Graph ${i + 1}: ${graphData[i] ? graphData[i].fileName : `Placeholder ${i + 1}`}`, 135, yOffset + 10);
//         pdf.setFontSize(10);
//         pdf.text(`Center of Gravity: (${centerOfGravity[i].x.toFixed(3)}, ${centerOfGravity[i].y.toFixed(3)})`, 135, yOffset + 20);
//         pdf.text(`Distance to Center: ${distances[i].toFixed(3)}`, 135, yOffset + 30);
//         pdf.text(`Angle: ${angles[i].toFixed(2)}°`, 135, yOffset + 40);
//         pdf.text(`Line Endpoint: (${lineEndpoints[i].x.toFixed(3)}, ${lineEndpoints[i].y.toFixed(3)})`, 135, yOffset + 50);
//         pdf.text(`Calculated Hypotenuse: ${calculatedHypotenuse[i].toFixed(3)}`, 135, yOffset + 60);

//         yOffset += 130;

//         // Add a new page if there's not enough space for the next graph
//         if (i < 5 && yOffset > 250) {
//           pdf.addPage();
//           yOffset = 10;
//         }
//       }
//     }

//     pdf.save('polar_plot_report.pdf');
//     setIsGeneratingReport(false);
//   };

//   if (!isVisible) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//       <div className="bg-white p-6 rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
//         <h2 className="text-2xl font-bold mb-4">Polar Plot</h2>
        
//         <div className="mb-4">
//           <input
//             type="file"
//             onChange={handleFolderUpload}
//             webkitdirectory="true"
//             directory="true"
//             multiple
//             className="mb-2"
//           />
//           <div className="flex flex-wrap gap-2">
//             {files.map((file, index) => (
//               <button
//                 key={index}
//                 onClick={() => {
//                   const nextEmptyIndex = selectedFiles.findIndex(f => f === null);
//                   if (nextEmptyIndex !== -1) {
//                     setSelectedFiles(prev => {
//                       const newSelected = [...prev];
//                       newSelected[nextEmptyIndex] = file;
//                       return newSelected;
//                     });
//                   }
//                 }}
//                 className={`px-2 py-1 rounded ${
//                   selectedFiles.includes(file) ? 'bg-blue-500 text-white' : 'bg-gray-200'
//                 }`}
//               >
//                 {file.name}
//               </button>
//             ))}
//           </div>
//         </div>

//         <div className="grid grid-cols-2 gap-4">
//           {Array(6).fill().map((_, index) => (
//             <div key={index} className="border p-2">
//               <div ref={el => graphContainerRef.current[index] = el} style={{ width: '400px', height: '400px' }}></div>
//               <div className="mt-2">
//                 <label className="mr-2">
//                   <input
//                     type="checkbox"
//                     checked={dataStatus[index] === 'ALL'}
//                     onChange={() => setDataStatus(prev => {
//                       const newStatus = [...prev];
//                       newStatus[index] = newStatus[index] === 'ALL' ? '' : 'ALL';
//                       return newStatus;
//                     })}
//                   />
//                   ALL
//                 </label>
//                 {selectedFiles[index] && (
//                   <button
//                     onClick={() => {
//                       setSelectedFiles(prev => {
//                         const newSelected = [...prev];
//                         newSelected[index] = null;
//                         return newSelected;
//                       });
//                     }}
//                     className="ml-2 text-red-500"
//                   >
//                     Remove
//                   </button>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>

//         <div className="mt-4 flex items-center">
//           <label className="mr-4">
//             <input
//               type="checkbox"
//               checked={calculateDistances}
//               onChange={() => setCalculateDistances(!calculateDistances)}
//             />
//             Calculate Distances
//           </label>
//           <label className="mr-4">
//             <input
//               type="checkbox"
//               checked={showCenterPoint}
//               onChange={() => setShowCenterPoint(!showCenterPoint)}
//             />
//             Show Center Point
//           </label>
//           <label className="mr-4">
//             <input
//               type="checkbox"
//               checked={showAngle}
//               onChange={() => setShowAngle(!showAngle)}
//             />
//             Show Angle
//           </label>
//           <label>
//             <input
//               type="checkbox"
//               checked={showValue}
//               onChange={() => setShowValue(!showValue)}
//             />
//             Show Value
//           </label>
//         </div>

//         <div className="mt-4">
//           {Array(6).fill().map((_, index) => (
//             <div key={index} className="mb-2">
//               <label className="mr-2">Angle {index + 1}:</label>
//               <input
//                 type="number"
//                 value={angles[index]}
//                 onChange={(e) => setAngles(prev => {
//                   const newAngles = [...prev];
//                   newAngles[index] = parseFloat(e.target.value);
//                   return newAngles;
//                 })}
//                 className="border px-2 py-1 w-20 mr-2"
//               />
//               <label className="mr-2">Line Angle {index + 1}:</label>
//               <input
//                 type="number"
//                 value={lineAngles[index]}
//                 onChange={(e) => setLineAngles(prev => {
//                   const newAngles = [...prev];
//                   newAngles[index] = parseFloat(e.target.value);
//                   return newAngles;
//                 })}
//                 className="border px-2 py-1 w-20 mr-2"
//               />
//               <label className="mr-2">Line Length {index + 1}:</label>
//               <input
//                 type="number"
//                 value={lineLengths[index]}
//                 onChange={(e) => setLineLengths(prev => {
//                   const newLengths = [...prev];
//                   newLengths[index] = parseFloat(e.target.value);
//                   return newLengths;
//                 })}
//                 className="border px-2 py-1 w-20"
//               />
//             </div>
//           ))}
//         </div>

//         <button
//           onClick={handleGenerateReport}
//           disabled={isGeneratingReport}
//           className="mt-4 bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
//         >
//           {isGeneratingReport ? 'Generating...' : 'Generate Report'}
//         </button>

//         <button
//           onClick={onClose}
//           className="mt-4 ml-4 bg-red-500 text-white px-4 py-2 rounded"
//         >
//           Close
//         </button>
//       </div>
//     </div>
//   );
// };

// export default PolarPlot;


// import React, { useEffect, useRef, useState } from 'react';
// import Dygraph from 'dygraphs';
// import html2canvas from 'html2canvas';
// import jsPDF from 'jspdf';



// const Toast = ({ message, onClose }) => (
//   <div className="fixed top-4 right-4 bg-gray-800 text-white px-4 py-2 rounded-md shadow-lg">
//     {message}
//     <button onClick={onClose} className="ml-2 text-sm">&times;</button>
//   </div>
// );

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
//   const [showValue, setShowValue] = useState(false);
//   const [lineAngles, setLineAngles] = useState(Array(6).fill(0));
//   const [lineLengths, setLineLengths] = useState(Array(6).fill(100));
//   const [lineEndpoints, setLineEndpoints] = useState(Array(6).fill({ x: 0, y: 0 }));
//   const [calculatedHypotenuse, setCalculatedHypotenuse] = useState(Array(6).fill(0));
//   const [isGeneratingReport, setIsGeneratingReport] = useState(false);
//   const [overallRange, setOverallRange] = useState([-1, 1]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [toastMessage, setToastMessage] = useState('');


//   const colorPalette = ['#800080', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF'];
//   const zoomFactor = 1.2;

//   const placeholderData = Array(6).fill().map(() => [
//     [0, 0], [1, 1], [-1, -1], [1, -1], [-1, 1]
//   ]);

//   const handleFolderUpload = (e) => {
//     const selectedFiles = Array.from(e.target.files);
//     setFiles(selectedFiles);
//   };

  
//   const handleFileSelection = async (file, index) => {
//     setIsLoading(true);
//     setToastMessage('Please wait, data is being loaded...');
    
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         const fileData = e.target.result;
//         processFileData(fileData, file.name, index);
//         setIsLoading(false);
//         setToastMessage('');
//         resolve();
//       };
//       reader.onerror = (error) => {
//         setIsLoading(false);
//         setToastMessage('Error loading file. Please try again.');
//         reject(error);
//       };
//       reader.readAsText(file);
//     });
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

//       // Update overall range
//       setOverallRange(prevRange => {
//         const newMinX = Math.min(prevRange[0], minX);
//         const newMaxX = Math.max(prevRange[1], maxX);
//         const newMinY = Math.min(prevRange[0], minY);
//         const newMaxY = Math.max(prevRange[1], maxY);
//         const newMin = Math.min(newMinX, newMinY);
//         const newMax = Math.max(newMaxX, newMaxY);
//         return [newMin, newMax];
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
      
//       const range = overallRange;

//       let centerX = 0;
//       let centerY = 0;
//       if (data) {
//         centerX = plotData.reduce((sum, point) => sum + point[0], 0) / plotData.length;
//         centerY = plotData.reduce((sum, point) => sum + point[1], 0) / plotData.length;
//       }

//       const distanceToCoG = Math.sqrt(Math.pow(centerX, 2) + Math.pow(centerY, 2));

//       setDistances(prev => {
//         const updatedDistances = [...prev];
//         updatedDistances[index] = distanceToCoG;
//         return updatedDistances;
//       });

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
//             color: 'green',
//             pointSize: 6,
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
//         dateWindow: range,
//         valueRange: range,
//         axes: {
//           x: {
//             axisLabelFormatter: (d) => isNaN(d) ? '' : d.toFixed(3),
//             valueFormatter: (x) => isNaN(x) ? '' : x.toFixed(3),
//             drawGrid: false,
//             pixelsPerLabel: 30,
//             axisLabelWidth: 50,
//             ticker: (min, max, pixels, opts, dygraph, vals) => {
//               const numberOfTicks = 7;
//               const range = max - min;
//               const step = range / (numberOfTicks - 1);
//               const ticks = [];
//               for (let i = 0; i < numberOfTicks; i++) {
//                 ticks.push({v: min + i * step, label: (min + i * step).toFixed(3)});
//               }
//               return ticks;
//             },
//           },
//           y: {
//             axisLabelFormatter: (d) => isNaN(d) ? '' : d.toFixed(2),
//             valueFormatter: (y) => isNaN(y) ? '' : y.toFixed(2),
//             drawGrid: false,
//             pixelsPerLabel: 30,
//             axisLabelWidth: 50,
//           }
//         },
//         underlayCallback: (canvas, area, g) => {
//           canvas.save();
//           canvas.setLineDash([5, 5]);
//           canvas.strokeStyle = 'rgba(128, 128, 128, 0.5)';
//           canvas.lineWidth = 1;

//           const centerX = g.toDomXCoord(0);
//           canvas.beginPath();
//           canvas.moveTo(centerX, area.y);
//           canvas.lineTo(centerX, area.y + area.h);
//           canvas.stroke();

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
//             const centerX = g.toDomXCoord(0);
//             const centerY = g.toDomYCoord(0);
            
//             ctx.beginPath();
//             ctx.moveTo(centerX, centerY);
//             const angle = angles[index] * (Math.PI / 180);
//             const lineLength = 200;
//             const endX = centerX + lineLength * Math.cos(angle);
//             const endY = centerY - lineLength * Math.sin(angle);
//             ctx.lineTo(endX, endY);
//             ctx.strokeStyle = 'red';
//             ctx.lineWidth = 3;
//             ctx.stroke();
//           }

//           if (showValue) {
//             const canvas = g.hidden_;
//             const ctx = canvas.getContext('2d');
//             const centerX = g.toDomXCoord(0);
//             const centerY = g.toDomYCoord(0);
            
//             ctx.beginPath();
//             ctx.moveTo(centerX, centerY);
//             const angle = lineAngles[index] * (Math.PI / 180);
//             const lineLength = lineLengths[index];
//             const endX = centerX + lineLength * Math.cos(angle);
//             const endY = centerY - lineLength * Math.sin(angle);
//             ctx.lineTo(endX, endY);
//             ctx.strokeStyle = 'black';
//             ctx.lineWidth = 2;
//             ctx.stroke();

//             const xValue = lineLength * Math.cos(angle);
//             const yValue = lineLength * Math.sin(angle);
//             setLineEndpoints(prev => {
//               const newEndpoints = [...prev];
//               newEndpoints[index] = { x: xValue, y: yValue };
//               return newEndpoints;
//             });

//             // Calculate hypotenuse using Pythagorean theorem
//             const calculatedHyp = Math.sqrt(Math.pow(xValue, 2) + Math.pow(yValue, 2));
//             setCalculatedHypotenuse(prev => {
//               const newHypotenuse = [...prev];
//               newHypotenuse[index] = calculatedHyp;
//               return newHypotenuse;
              
//             });
//           }
//         }
//       };

//       const dygraphData = plotData.map(point => [point[0], point[1], null, null]);
//       if (calculateDistances && data) {
//         dygraphData.push([centerX, centerY, distanceToCoG, null]);
//       }
//       if (showCenterPoint) {
//         dygraphData.push([0, 0, null, 0]);
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
          
//           const xRange = dygraph.xAxisRange();
//           const yRange = dygraph.yAxisRange();
//           const xCenter = (xRange[0] + xRange[1]) / 2;
//           const yCenter = (yRange[0] + yRange[1]) / 2;
          
//           const newXRange = [
//             xCenter - (xCenter - xRange[0]) / zoomAmount,
//             xCenter + (xRange[1] - xCenter) / zoomAmount
//           ];
//           const newYRange = [
//             yCenter - (yCenter - yRange[0]) / zoomAmount,
//             yCenter + (yRange[1] - yCenter) / zoomAmount
//           ];

//           dygraph.updateOptions({
//             dateWindow: newXRange,
//             valueRange: newYRange
//           });
//         });
//       }

//       if (data) {
//         setCenterOfGravity(prev => {
//           const newCenterOfGravity = [...prev];
//           newCenterOfGravity[index] = { x: centerX, y: centerY };
//           return newCenterOfGravity;
//         });
//       }
//     }
//   };

//   useEffect(() => {
//     graphData.forEach((data, index) => {
//       if (data) {
//         createOrUpdateGraph(index);
//       }
//     });
//   }, [graphData, calculateDistances, showCenterPoint, showAngle, angles, showValue, lineAngles, lineLengths, overallRange]);
//   useEffect(() => {
//     const updateGraphs = () => {
//       const newGraphData = Array(6).fill(null);
//       const newDataStatus = Array(6).fill('');

//       selectedFiles.forEach((file, index) => {
//         if (file) {
//           const existingDataIndex = graphData.findIndex(data => data && data.fileName === file.name);
//           if (existingDataIndex !== -1) {
//             newGraphData[index] = graphData[existingDataIndex];
//             newDataStatus[index] = dataStatus[existingDataIndex];
//           } else {
//             handleFileSelection(file, index);
//           }
//         }
//       });

//       setGraphData(newGraphData);
//       setDataStatus(newDataStatus);
//     };

//     updateGraphs();
//   }, [selectedFiles]);



//   const handleFileToggle = async (file) => {
//     if (isLoading) return; // Prevent toggling while loading

//     setSelectedFiles(prev => {
//       const isSelected = prev.includes(file);
//       if (isSelected) {
//         return prev.filter(f => f !== file);
//       } else {
//         const availableIndex = prev.findIndex(f => f === null);
//         if (availableIndex !== -1) {
//           const newSelectedFiles = [...prev];
//           newSelectedFiles[availableIndex] = file;
//           handleFileSelection(file, availableIndex);
//           return newSelectedFiles;
//         } else if (prev.length < 6) {
//           handleFileSelection(file, prev.length);
//           return [...prev, file];
//         }
//       }
//       return prev;
//     });
//   };
//   const handleAngleChange = (index, value) => {
//     setAngles(prev => {
//       const newAngles = [...prev];
//       newAngles[index] = value;
//       return newAngles;
//     });
//   };

//   const handleLineAngleChange = (index, value) => {
//     setLineAngles(prev => {
//       const newLineAngles = [...prev];
//       newLineAngles[index] = value;
//       return newLineAngles;
//     });
//   };

//   const handleLineLengthChange = (index, value) => {
//     setLineLengths(prev => {
//       const newLineLengths = [...prev];
//       newLineLengths[index] = value;
//       return newLineLengths;
//     });
//   };

//   const generateReport = async () => {
//     console.log("Starting report generation");
//     setIsGeneratingReport(true);
//     try {
//       const pdf = new jsPDF('l', 'mm', 'a4');
//       const pageWidth = pdf.internal.pageSize.width;
//       const pageHeight = pdf.internal.pageSize.height;
//       const margin = 10;
//       const graphWidth = (pageWidth - 4 * margin) / 3;
//       const graphHeight = (pageHeight - 3 * margin) / 2;
  
//       for (let i = 0; i < 6; i++) {
//         const graphContainer = graphContainerRef.current[i];
//         if (!graphContainer) {
//           console.log(`Graph container ${i+1} not found`);
//           continue;
//         }
//         console.log(`Capturing graph ${i+1}`);
//         const canvas = await html2canvas(graphContainer);
//         const imgData = canvas.toDataURL('image/png');
  
//         const row = Math.floor(i / 3);
//         const col = i % 3;
//         const xPosition = margin + col * (graphWidth + margin);
//         const yPosition = margin + row * (graphHeight + margin);
  
//         pdf.addImage(imgData, 'PNG', xPosition, yPosition, graphWidth, graphHeight - 25);
  
//         if (graphData[i]) {
//           pdf.setFontSize(9);
//           pdf.text(`Graph ${i + 1}: ${graphData[i].fileName}`, xPosition, yPosition - 2);
          
//           // Add calculated values
//           pdf.setFontSize(7);
//           const valueY = yPosition + graphHeight - 23;
//           pdf.text(`CoG: ${distances[i].toFixed(2)}`, xPosition, valueY);
//           pdf.text(`Status: ${dataStatus[i] || 'N/A'}`, xPosition, valueY + 4);
//           pdf.text(`Filter: 1`, xPosition, valueY + 8);
//           if (showAngle) {
//             pdf.text(`Angle: ${angles[i].toFixed(2)}°`, xPosition + 40, valueY);
//           }
//           if (showValue) {
//             pdf.text(`Line Angle: ${lineAngles[i].toFixed(2)}°`, xPosition + 40, valueY + 4);
//             pdf.text(`Line Length: ${lineLengths[i].toFixed(2)}`, xPosition + 40, valueY + 8);
//             pdf.text(`Endpoint: (${lineEndpoints[i].x.toFixed(2)}, ${lineEndpoints[i].y.toFixed(2)})`, xPosition, valueY + 12);
//             pdf.text(`Calculated Value: ${calculatedHypotenuse[i].toFixed(2)}`, xPosition, valueY + 16);
//           }
//         }
//       }
  
//       console.log("Saving PDF");
//       pdf.save('polar_plot_report.pdf');
//     } catch (error) {
//       console.error("Error generating report:", error);
//     } finally {
//       setIsGeneratingReport(false);
//     }
//   };

//   useEffect(() => {
//     // Initialize all graphs with static axes and center plus sign
//     Array.from({ length: 6 }).forEach((_, index) => {
//       createOrUpdateGraph(index);
//     });
//   }, []); // Empty dependency array to run only once on mount
  
//   return (
//     <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center ${isVisible ? '' : 'hidden'}`}>
//       <div className="bg-[#f1f1f1] p-4 rounded-md relative" style={{ width: '100%', maxWidth: '3000px', height: '100%', maxHeight: '1400px' }} onClick={(e) => e.stopPropagation()}>
//         <div className="grid grid-cols-3 gap-4" style={{ height: '900px', position: 'absolute', top: '100px', width: '2200px' }}>
//           {Array.from({ length: 6 }).map((_, index) => (
//             <div key={index} className="my-4" style={{border:'5px groove lightgray'}}>
//               <h2 className="text-xl font-bold">Graph {index + 1}</h2>
//               <div ref={(el) => graphContainerRef.current[index] = el} style={{ width: '100%', height: '480px' }}></div>
//               <div className="mt-2 flex justify-between">
//                 <div>
//                   <span className="font-bold">CoG:</span>
//                   <input
//                     type="text"
//                     value={calculateDistances ? distances[index].toFixed(2) : 'N/A'}
//                     readOnly
//                     className="ml-2 p-1 border border-gray-300 rounded-md w-10"
//                   />
//                 </div>
//                 <div>
//                   <span className="font-bold mr-2">Status:</span>
//                   <input
//                     type="text"
//                     value={dataStatus[index] || ''}
//                     readOnly
//                     className="p-1 border border-300 rounded-md w-10"
//                   />
//                 </div>
//                 <div>
//                   <span className="font-bold mr-2">Filter:</span>
//                   <input
//                     type="text"
//                     value="1"
//                     readOnly
//                     className="p-1 border border-gray-300 rounded-md w-5 text-center"
//                   />
//                 </div>
//                 {showAngle && (
//                   <div className="flex items-center">
//                     <span className="font-bold mr-2">Angle:</span>
//                     <input
//                       type="range"
//                       min="0"
//                       max="360"
//                       value={angles[index]}
//                       onChange={(e) => handleAngleChange(index, parseInt(e.target.value))}
//                       className="w-32 mr-2"
//                     />
//                     <input
//                       type="text"
//                       value={angles[index].toFixed(2)}
//                       readOnly
//                       className="p-1 border border-gray-300 rounded-md w-16 text-center"
//                     />
//                   </div>
//                 )}
//                 {showValue && (
//                   <>
//                     <div className="flex items-center">
//                       <span className="font-bold mr-2">Line Angle:</span>
//                       <input
//                         type="range"
//                         min="0"
//                         max="360"
//                         style={{width:'50px'}}
//                         value={lineAngles[index]}
//                         onChange={(e) => handleLineAngleChange(index, parseInt(e.target.value))}
//                         className="w-32 mr-2"
//                       />
//                     </div>
//                     <div className="flex items-center">
//                       <span className="font-bold mr-2">line Drag:</span>
//                       <input
//                         type="range"
//                         min="0"
//                         max="300"
//                         style={{width:'50px'}}
//                         value={lineLengths[index]}
//                         onChange={(e) => handleLineLengthChange(index, parseInt(e.target.value))}
//                         className="w-32 mr-2"
//                       />
//                     </div>
//                     <div>
//                       <span className="font-bold mr-2">Endpoint:</span>
//                       <input
//                         type="text"
//                         value={`X: ${lineEndpoints[index].x.toFixed(2)}, Y: ${lineEndpoints[index].y.toFixed(2)}`}
//                         readOnly
//                         className="p-1 border border-gray-300 rounded-md w-29  text-center"
//                       />
//                     </div>
//                     <div>
//                       <span className="font-bold mr-2">Calculate value:</span>
//                       <input
//                         type="text"
//                         value={calculatedHypotenuse[index].toFixed(2)}
//                         readOnly
//                         className="p-1 border border-gray-300 rounded-md w-16 text-center"
//                       />
//                     </div>
//                   </>
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
//             disabled={isLoading}
//           />
//           <div className="overflow-y-auto h-32 mb-4 border border-gray-400 rounded-md p-2">
//             {files.map((file, index) => (
//               <div key={index} className="flex items-center mb-2">
//                 <input
//                   type="checkbox"
//                   checked={selectedFiles.includes(file)}
//                   onChange={() => handleFileToggle(file)}
//                   className="mr-2"
//                   disabled={isLoading}
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
//             if (showValue) setShowValue(false);
//           }}
//           className="p-2 mt-4 text-white bg-blue-600 rounded-md"
//           style={{ position: 'absolute', left: '90%', top: '1000px', width: '200px', height: '60px' }}
//         >
//           {calculateDistances ? 'Hide Distance' : 'Show Distance'}
//         </button>
//         <button
//           onClick={() => {
//             setShowCenterPoint(prev => !prev);
//             if (calculateDistances) setCalculateDistances(false);
//             if (showAngle) setShowAngle(false);
//             if (showValue) setShowValue(false);
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
//             if (showValue) setShowValue(false);
//           }}
//           className="p-2 mt-4 text-white bg-purple-600 rounded-md"
//           style={{ position: 'absolute', left: '90%', top: '1160px', width: '200px', height: '60px' }}
//         >
//           {showAngle ? 'Hide Angle' : 'Show Angle'}
//         </button>
//         <button
//           onClick={() => {
//             setShowValue(prev => !prev);
//             if (calculateDistances) setCalculateDistances(false);
//             if (showCenterPoint) setShowCenterPoint(false);
//             if (showAngle) setShowAngle(false);
//           }}
//           className="p-2 mt-4 text-white bg-yellow-600 rounded-md"
//           style={{ position: 'absolute', left: '90%', top: '1240px', width: '200px', height: '60px' }}
//         >
//           {showValue ? 'Hide Value' : 'Show Value'}
//         </button>
//         <button
//           onClick={generateReport}
//           disabled={isGeneratingReport}
//           className="p-2 mt-4 text-white bg-red-600 rounded-md"
//           style={{ position: 'absolute', left: '90%', top: '1320px', width: '200px', height: '60px' }}
//         >
//           {isGeneratingReport ? 'Generating...' : 'Generate Report'}
//         </button>
//       </div>

//       {toastMessage && (
//           <Toast
//             message={toastMessage}
//             onClose={() => setToastMessage('')}
//           />
//         )}
//     </div>
//   );
// };

// export default PolarPlot;



//final code 
// import React, { useEffect, useRef, useState } from 'react';
// import Dygraph from 'dygraphs';
// import html2canvas from 'html2canvas';
// import jsPDF from 'jspdf';

// const Toast = ({ message, onClose }) => (
//   <div className="fixed top-4 right-4 bg-gray-800 text-white px-4 py-2 rounded-md shadow-lg">
//     {message}
//     <button onClick={onClose} className="ml-2 text-sm">&times;</button>
//   </div>
// );

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
//   const [showValue, setShowValue] = useState(false);
//   const [lineAngles, setLineAngles] = useState(Array(6).fill(0));
//   const [lineLengths, setLineLengths] = useState(Array(6).fill(100));
//   const [lineEndpoints, setLineEndpoints] = useState(Array(6).fill({ x: 0, y: 0 }));
//   const [calculatedHypotenuse, setCalculatedHypotenuse] = useState(Array(6).fill(0));
//   const [isGeneratingReport, setIsGeneratingReport] = useState(false);
//   const [overallRange, setOverallRange] = useState([-1, 1]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [toastMessage, setToastMessage] = useState('');

//   const colorPalette = ['#800080', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF'];
//   const zoomFactor = 1.2;

//   const placeholderData = Array(6).fill().map(() => [
//     [0, 0], [1, 1], [-1, -1], [1, -1], [-1, 1]
//   ]);

//   const handleFolderUpload = (e) => {
//     const selectedFiles = Array.from(e.target.files);
//     setFiles(selectedFiles);
//   };

//   const handleFileSelection = async (file, index) => {
//     setIsLoading(true);
//     setToastMessage('Please wait, data is being loaded...');
    
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         const fileData = e.target.result;
//         processFileData(fileData, file.name, index);
//         setIsLoading(false);
//         setToastMessage('');
//         resolve();
//       };
//       reader.onerror = (error) => {
//         setIsLoading(false);
//         setToastMessage('Error loading file. Please try again.');
//         reject(error);
//       };
//       reader.readAsText(file);
//     });
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

//       setOverallRange(prevRange => {
//         const newMinX = Math.min(prevRange[0], minX);
//         const newMaxX = Math.max(prevRange[1], maxX);
//         const newMinY = Math.min(prevRange[0], minY);
//         const newMaxY = Math.max(prevRange[1], maxY);
//         const newMin = Math.min(newMinX, newMinY);
//         const newMax = Math.max(newMaxX, newMaxY);
//         return [newMin, newMax];
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
      
//       const range = overallRange;

//       let centerX = 0;
//       let centerY = 0;
//       if (data) {
//         centerX = plotData.reduce((sum, point) => sum + point[0], 0) / plotData.length;
//         centerY = plotData.reduce((sum, point) => sum + point[1], 0) / plotData.length;
//       }

//       const distanceToCoG = Math.sqrt(Math.pow(centerX, 2) + Math.pow(centerY, 2));

//       setDistances(prev => {
//         const updatedDistances = [...prev];
//         updatedDistances[index] = distanceToCoG;
//         return updatedDistances;
//       });

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
//             color: 'green',
//             pointSize: 6,
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
//         ylabel: 'Bending moment Y',
//         ylabelWidth: 100,
//         drawPoints: true,
//         strokeWidth: 0.0,
//         pointSize: 1.5,
//         highlightCircleSize: 7,
//         colors: [colorPalette[index % colorPalette.length], 'green', 'red'],
//         width: 300,
//         height: 300,
//         gridLineColor: 'transparent',
//         dateWindow: range,
//         valueRange: range,
//         axes: {
//           x: {
//             axisLabelFormatter: (d) => isNaN(d) ? '' : d.toFixed(3),
//             valueFormatter: (x) => isNaN(x) ? '' : x.toFixed(3),
//             drawGrid: false,
//             pixelsPerLabel: 30,
//             axisLabelWidth: 50,
//             ticker: (min, max, pixels, opts, dygraph, vals) => {
//               const numberOfTicks = 7;
//               const range = max - min;
//               const step = range / (numberOfTicks - 1);
//               const ticks = [];
//               for (let i = 0; i < numberOfTicks; i++) {
//                 ticks.push({v: min + i * step, label: (min + i * step).toFixed(3)});
//               }
//               return ticks;
//             },
//           },
//           y: {
//             axisLabelFormatter: (d) => isNaN(d) ? '' : d.toFixed(2),
//             valueFormatter: (y) => isNaN(y) ? '' : y.toFixed(2),
//             drawGrid: false,
//             pixelsPerLabel: 30,
//             axisLabelWidth: 50,
//           }
//         },
//         underlayCallback: (canvas, area, g) => {
//           canvas.save();
//           canvas.setLineDash([5, 5]);
//           canvas.strokeStyle = 'rgba(128, 128, 128, 0.5)';
//           canvas.lineWidth = 1;

//           const centerX = g.toDomXCoord(0);
//           canvas.beginPath();
//           canvas.moveTo(centerX, area.y);
//           canvas.lineTo(centerX, area.y + area.h);
//           canvas.stroke();

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
//           const canvas = g.hidden_;
//           const ctx = canvas.getContext('2d');
//           const centerX = g.toDomXCoord(0);
//           const centerY = g.toDomYCoord(0);
          
//           if (showCenterPoint) {
//             ctx.beginPath();
//             ctx.arc(centerX, centerY, 6, 0, 2 * Math.PI);
//             ctx.fillStyle = 'red';
//             ctx.fill();
//           }
          
//           if (showAngle) {
//             ctx.beginPath();
//             ctx.moveTo(centerX, centerY);
//             const angle = angles[index] * (Math.PI / 180);
//             const lineLength = 200;
//             const endX = centerX + lineLength * Math.cos(angle);
//             const endY = centerY - lineLength * Math.sin(angle);
//             ctx.lineTo(endX, endY);
//             ctx.strokeStyle = 'red';
//             ctx.lineWidth = 3;
//             ctx.stroke();
//           }

//           if (showValue) {
//             ctx.beginPath();
//             ctx.moveTo(centerX, centerY);
//             const angle = lineAngles[index] * (Math.PI / 180);
//             const lineLength = lineLengths[index];
//             const endX = centerX + lineLength * Math.cos(angle);
//             const endY = centerY - lineLength * Math.sin(angle);
//             ctx.lineTo(endX, endY);
//             ctx.strokeStyle = 'black';
//             ctx.lineWidth = 2;
//             ctx.stroke();

//             const xValue = lineLength * Math.cos(angle);
//             const yValue = lineLength * Math.sin(angle);
//             setLineEndpoints(prev => {
//               const newEndpoints = [...prev];
//               newEndpoints[index] = { x: xValue, y: yValue };
//               return newEndpoints;
//             });

//             const calculatedHyp = Math.sqrt(Math.pow(xValue, 2) + Math.pow(yValue, 2));
//             setCalculatedHypotenuse(prev => {
//               const newHypotenuse = [...prev];
//               newHypotenuse[index] = calculatedHyp;
//               return newHypotenuse;
//             });
//           }
//         }
//       };

//       const dygraphData = plotData.map(point => [point[0], point[1], null, null]);
//       if (calculateDistances && data) {
//         dygraphData.push([centerX, centerY, distanceToCoG, null]);
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
          
//           const xRange = dygraph.xAxisRange();
//           const yRange = dygraph.yAxisRange();
//           const xCenter = (xRange[0] + xRange[1]) / 2;
//           const yCenter = (yRange[0] + yRange[1]) / 2;
          
//           const newXRange = [
//             xCenter - (xCenter - xRange[0]) / zoomAmount,
//             xCenter + (xRange[1] - xCenter) / zoomAmount
//           ];
//           const newYRange = [
//             yCenter - (yCenter - yRange[0]) / zoomAmount,
//             yCenter + (yRange[1] - yCenter) / zoomAmount
//           ];

//           dygraph.updateOptions({
//             dateWindow: newXRange,
//         valueRange: newYRange
//           });
//         });
//       }

//       if (data) {
//         setCenterOfGravity(prev => {
//           const newCenterOfGravity = [...prev];
//           newCenterOfGravity[index] = { x: centerX, y: centerY };
//           return newCenterOfGravity;
//         });
//       }
//     }
//   };

//   useEffect(() => {
//     graphData.forEach((data, index) => {
//       createOrUpdateGraph(index);
//     });
//   }, [graphData, calculateDistances, showCenterPoint, showAngle, angles, showValue, lineAngles, lineLengths, overallRange]);

//   useEffect(() => {
//     const updateGraphs = () => {
//       const newGraphData = Array(6).fill(null);
//       const newDataStatus = Array(6).fill('');

//       selectedFiles.forEach((file, index) => {
//         if (file) {
//           const existingDataIndex = graphData.findIndex(data => data && data.fileName === file.name);
//           if (existingDataIndex !== -1) {
//             newGraphData[index] = graphData[existingDataIndex];
//             newDataStatus[index] = dataStatus[existingDataIndex];
//           } else {
//             handleFileSelection(file, index);
//           }
//         }
//       });

//       setGraphData(newGraphData);
//       setDataStatus(newDataStatus);
//     };

//     updateGraphs();
//   }, [selectedFiles]);

//   const handleFileToggle = async (file) => {
//     if (isLoading) return;

//     setSelectedFiles(prev => {
//       const isSelected = prev.includes(file);
//       if (isSelected) {
//         return prev.filter(f => f !== file);
//       } else {
//         const availableIndex = prev.findIndex(f => f === null);
//         if (availableIndex !== -1) {
//           const newSelectedFiles = [...prev];
//           newSelectedFiles[availableIndex] = file;
//           handleFileSelection(file, availableIndex);
//           return newSelectedFiles;
//         } else if (prev.length < 6) {
//           handleFileSelection(file, prev.length);
//           return [...prev, file];
//         }
//       }
//       return prev;
//     });
//   };

//   const handleAngleChange = (index, value) => {
//     setAngles(prev => {
//       const newAngles = [...prev];
//       newAngles[index] = value;
//       return newAngles;
//     });
//   };

//   const handleLineAngleChange = (index, value) => {
//     setLineAngles(prev => {
//       const newLineAngles = [...prev];
//       newLineAngles[index] = value;
//       return newLineAngles;
//     });
//   };

//   const handleLineLengthChange = (index, value) => {
//     setLineLengths(prev => {
//       const newLineLengths = [...prev];
//       newLineLengths[index] = value;
//       return newLineLengths;
//     });
//   };


//   const generateReport = async () => {
//     console.log("Starting report generation");
//     setIsGeneratingReport(true);
  
//     try {
//       const pdf = new jsPDF('l', 'mm', 'a4');
//       const pageWidth = pdf.internal.pageSize.width;
//       const pageHeight = pdf.internal.pageSize.height;
//       const margin = 10;
//       const graphWidth = (pageWidth - 4 * margin) / 3;
//       const graphHeight = (pageHeight - 3 * margin) / 2;
  
//       let currentPage = 1; // Track the current page
//       let row = 0;
//       let col = 0;
  
//       for (let i = 0; i < selectedFiles.length; i++) {
//         const graphContainer = graphContainerRef.current[i];
  
//         if (!graphContainer) {
//           console.log(`Graph container ${i + 1} not found`);
//           continue;
//         }
  
//         console.log(`Capturing graph ${i + 1}`);
//         const canvas = await html2canvas(graphContainer);
//         const imgData = canvas.toDataURL('image/png');
  
//         // Handle page breaks for every 3 graphs
//         if (i % 3 === 0 && i !== 0) { // Check if it's the first graph on a new page
//           pdf.addPage();
//           currentPage++;
//           row = 0;
//           col = 0;
//         }
  
//         const xPosition = margin + col * (graphWidth + margin);
//         const yPosition = margin + row * (graphHeight + margin);
  
//         pdf.addImage(imgData, 'PNG', xPosition, yPosition, graphWidth, graphHeight - 25);
  
//         if (graphData[i]) {
//           pdf.setFontSize(9);
//           pdf.text(`Graph ${i + 1}: ${graphData[i].fileName}`, xPosition, yPosition - 2);
  
//           pdf.setFontSize(7);
//           let valueY = yPosition + graphHeight - 23;
//           pdf.text(`CoG: ${distances[i].toFixed(2)}`, xPosition, valueY);
//           pdf.text(`Status: ${dataStatus[i] || 'N/A'}`, xPosition, valueY + 4);
//           pdf.text(`Filter: 1`, xPosition, valueY + 8);
  
//           if (showAngle) {
//             pdf.text(`Angle: ${angles[i].toFixed(2)}°`, xPosition + 40, valueY);
//           }
  
//           if (showValue) {
//             pdf.text(`Line Angle: ${lineAngles[i].toFixed(2)}°`, xPosition + 40, valueY + 4);
//             pdf.text(`Line Length: ${lineLengths[i].toFixed(2)}`, xPosition + 40, valueY + 8);
//             pdf.text(`Endpoint: (${lineEndpoints[i].x.toFixed(2)}, ${lineEndpoints[i].y.toFixed(2)})`, xPosition, valueY + 12);
//             pdf.text(`Calculated Value: ${calculatedHypotenuse[i].toFixed(2)}`, xPosition, valueY + 16);
//           }
  
//           const file = selectedFiles[i];
//           if (file) {
//             const reader = new FileReader();
//             reader.onload = (e) => {
//               const fileContent = e.target.result;
//               const lines = fileContent.split('\n');
//               const additionalInfo = {};
  
//               lines.forEach(line => {
//                 if (line.startsWith('#')) {
//                   line = line.substring(1).trim();
//                   if (line.includes(':')) {
//                     const [key, ...values] = line.split(':').map(s => s.trim());
//                     additionalInfo[key] = values.join(':').trim();
//                   } else if (line.includes('=')) {
//                     const parts = line.split(/\s+/).filter(part => part !== '=');
//                     for (let i = 0; i < parts.length; i += 2) {
//                       if (parts[i] && parts[i + 1]) {
//                         additionalInfo[parts[i]] = parts[i + 1];
//                       }
//                     }
//                   }
//                 }
//               });
  
//               // Special handling for vc and n
//               if (additionalInfo['vc'] === '' && additionalInfo['n']) {
//                 additionalInfo['vc'] = '';
//                 additionalInfo['n'] = additionalInfo['n'];
//               }
  
//               valueY += 20;
//               pdf.setFontSize(6);
//               pdf.text("File Information:", xPosition, valueY);
//               valueY += 4;
  
//               const infoToDisplay = [
//                 ['date', 'operator'], ['process'], ['tool'], ['material'], ['tool gage'],
//                 ['d', 'z'], ['ap', 'ae'], ['vc', 'n'], ['f', 'vf'], ['X'], ['cooling'], ['unit type'], ['note']
//               ];
  
//               infoToDisplay.forEach((keys, index) => {
//                 const displayStrings = keys.map(key => {
//                   const value = additionalInfo[key];
//                   return value !== undefined ? `${key}: ${value}` : '';
//                 }).filter(s => s);
//                 if (displayStrings.length > 0) {
//                   pdf.text(displayStrings.join('    '), xPosition, valueY + index * 4);
//                 }
//               });
  
//               // If this is the last graph on the current page, save the PDF
//               if (i === selectedFiles.length - 1 || (i % 3 === 2 && i !== selectedFiles.length - 1)) {
//                 pdf.save('polar_plot_report.pdf');
//                 setIsGeneratingReport(false);
//               }
//             };
//             reader.readAsText(file);
//           } else {
//             // If there's no file for this graph, move on to the next one
//             if (i === selectedFiles.length - 1 || (i % 3 === 2 && i !== selectedFiles.length - 1)) {
//               pdf.save('polar_plot_report.pdf');
//               setIsGeneratingReport(false);
//             }
//           }
  
//           // Increment row and col for the next graph
//           col++;
//           if (col >= 3) {
//             col = 0;
//             row++;
//           }
//         }
//       }
//     } catch (error) {
//       console.error("Error generating report:", error);
//       setIsGeneratingReport(false);
//     }
//   };
//   useEffect(() => {
//     Array.from({ length: 6 }).forEach((_, index) => {
//       createOrUpdateGraph(index);
//     });
//   }, []);
  
//   return (
//     <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center ${isVisible ? '' : 'hidden'}`}>
//       <div className="bg-[#f1f1f1] p-4 rounded-md relative" style={{ width: '100%', maxWidth: '3000px', height: '100%', maxHeight: '1400px' }} onClick={(e) => e.stopPropagation()}>
//         <div className="grid grid-cols-3 gap-4" style={{ height: '900px', position: 'absolute', top: '50px', width: '2200px'}}>
//           {Array.from({ length: 6 }).map((_, index) => (
//             <div key={index} className="my-4" style={{border:'5px groove lightgray'}}>
//               <h2 className="text-xl font-bold">Graph {index + 1}</h2>
//               <div ref={(el) => graphContainerRef.current[index] = el} style={{ width: '100%', height: '480px' }}></div>
//               <div className="mt-2 space-y-2">
//                 <div className="flex justify-between items-center">
//                   <div>
//                     <span className="font-bold">CoG:</span>
//                     <input
//                       type="text"
//                       value={calculateDistances ? distances[index].toFixed(2) : 'N/A'}
//                       readOnly
//                       className="ml-2 p-1 border border-gray-300 rounded-md w-20"
//                     />
//                   </div>
//                   <div>
//                     <span className="font-bold mr-2">Status:</span>
//                     <input
//                       type="text"
//                       value={dataStatus[index] || ''}
//                       readOnly
//                       className="p-1 border border-300 rounded-md w-20"
//                     />
//                   </div>
//                   <div>
//                     <span className="font-bold mr-2">Filter:</span>
//                     <input
//                       type="text"
//                       value="1"
//                       readOnly
//                       className="p-1 border border-gray-300 rounded-md w-10 text-center"
//                     />
//                   </div>
//                   {showAngle && (
//                     <div className="flex items-center">
//                       <span className="font-bold mr-2">Angle:</span>
//                       <input
//                         type="range"
//                         min="0"
//                         max="360"
//                         value={angles[index]}
//                         onChange={(e) => handleAngleChange(index, parseInt(e.target.value))}
//                         className="w-32 mr-2"
//                       />
//                       <input
//                         type="text"
//                         value={angles[index].toFixed(2)}
//                         readOnly
//                         className="p-1 border border-gray-300 rounded-md w-16 text-center"
//                       />
//                     </div>
//                   )}
//                 </div>
//                 {showValue && (
//                   <div className="flex items-center space-x-2 overflow-x-auto">
//                     <div className="flex items-center shrink-0">
//                       <span className="font-bold mr-2">Line Angle:</span>
//                       <input
//                         type="range"
//                         min="0"
//                         max="360"
//                         value={lineAngles[index]}
//                         onChange={(e) => handleLineAngleChange(index, parseInt(e.target.value))}
//                         className="w-24"
//                       />
//                     </div>
//                     <div className="flex items-center shrink-0">
//                       <span className="font-bold mr-2">Line Drag:</span>
//                       <input
//                         type="range"
//                         min="0"
//                         max="300"
//                         value={lineLengths[index]}
//                         onChange={(e) => handleLineLengthChange(index, parseInt(e.target.value))}
//                         className="w-24"
//                       />
//                     </div>
//                     <div className="shrink-0">
//                       <span className="font-bold mr-2">Endpoint:</span>
//                       <input
//                         type="text"
//                         value={`X: ${lineEndpoints[index].x.toFixed(2)}, Y: ${lineEndpoints[index].y.toFixed(2)}`}
//                         readOnly
//                         className="p-1 border border-gray-300 rounded-md w-40 text-center"
//                       />
//                     </div>
//                     <div className="shrink-0">
//                       <span className="font-bold mr-2">Calculate value:</span>
//                       <input
//                         type="text"
//                         value={calculatedHypotenuse[index].toFixed(2)}
//                         readOnly
//                         className="p-1 border border-gray-300 rounded-md w-20 text-center"
//                       />
//                     </div>
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
//             disabled={isLoading}
//           />
//           <div className="overflow-y-auto h-32 mb-4 border border-gray-400 rounded-md p-2">
//             {files.map((file, index) => (
//               <div key={index} className="flex items-center mb-2">
//                 <input
//                   type="checkbox"
//                   checked={selectedFiles.includes(file)}
//                   onChange={() => handleFileToggle(file)}
//                   className="mr-2"
//                   disabled={isLoading}
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
//           {calculateDistances ? 'Hide Distance' : 'Show Distance'}
//         </button>
//         <button
//           onClick={() => setShowCenterPoint(prev => !prev)}
//           className="p-2 mt-4 text-white bg-green-600 rounded-md"
//           style={{ position: 'absolute', left: '90%', top: '1080px', width: '200px', height: '60px' }}
//         >
//           {showCenterPoint ? 'Hide Center Point' : 'Show Center Point'}
//         </button>
//         <button
//           onClick={() => setShowAngle(prev => !prev)}
//           className="p-2 mt-4 text-white bg-purple-600 rounded-md"
//           style={{ position: 'absolute', left: '90%', top: '1160px', width: '200px', height: '60px' }}
//         >
//           {showAngle ? 'Hide Angle' : 'Show Angle'}
//         </button>
//         <button
//           onClick={() => setShowValue(prev => !prev)}
//           className="p-2 mt-4 text-white bg-yellow-600 rounded-md"
//           style={{ position: 'absolute', left: '90%', top: '1240px', width: '200px', height: '60px' }}
//         >
//           {showValue ? 'Hide Value' : 'Show Value'}
//         </button>
//         <button
//           onClick={generateReport}
//           disabled={isGeneratingReport}
//           className="p-2 mt-4 text-white bg-red-600 rounded-md"
//           style={{ position: 'absolute', left: '90%', top: '1320px', width: '200px', height: '60px' }}
//         >
//           {isGeneratingReport ? 'Generating...' : 'Generate Report'}
//         </button>
//       </div>

//       {toastMessage && (
//         <Toast
//           message={toastMessage}
//           onClose={() => setToastMessage('')}
//         />
//       )}
//     </div>
//   );
// };

// export default PolarPlot;

// import React, { useEffect, useRef, useState } from 'react';
// import Dygraph from 'dygraphs';
// import html2canvas from 'html2canvas';
// import jsPDF from 'jspdf';

// const Toast = ({ message, onClose }) => (
//   <div className="fixed top-4 right-4 bg-gray-800 text-white px-4 py-2 rounded-md shadow-lg">
//     {message}
//     <button onClick={onClose} className="ml-2 text-sm">&times;</button>
//   </div>
// );

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
//   const [showValue, setShowValue] = useState(false);
//   const [lineAngles, setLineAngles] = useState(Array(6).fill(0));
//   const [lineLengths, setLineLengths] = useState(Array(6).fill(100));
//   const [lineEndpoints, setLineEndpoints] = useState(Array(6).fill({ x: 0, y: 0 }));
//   const [calculatedHypotenuse, setCalculatedHypotenuse] = useState(Array(6).fill(0));
//   const [isGeneratingReport, setIsGeneratingReport] = useState(false);
//   const [overallRange, setOverallRange] = useState([-1, 1]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [toastMessage, setToastMessage] = useState('');

//   const colorPalette = ['#800080', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF'];
//   const zoomFactor = 1.2;

//   const placeholderData = Array(6).fill().map(() => [
//     [0, 0], [1, 1], [-1, -1], [1, -1], [-1, 1]
//   ]);

//   const handleFolderUpload = (e) => {
//     const selectedFiles = Array.from(e.target.files);
//     setFiles(selectedFiles);
//   };

//   const handleFileSelection = async (file, index) => {
//     setIsLoading(true);
//     setToastMessage('Please wait, data is being loaded...');
    
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         const fileData = e.target.result;
//         processFileData(fileData, file.name, index);
//         setIsLoading(false);
//         setToastMessage('');
//         resolve();
//       };
//       reader.onerror = (error) => {
//         setIsLoading(false);
//         setToastMessage('Error loading file. Please try again.');
//         reject(error);
//       };
//       reader.readAsText(file);
//     });
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

//       setOverallRange(prevRange => {
//         const newMinX = Math.min(prevRange[0], minX);
//         const newMaxX = Math.max(prevRange[1], maxX);
//         const newMinY = Math.min(prevRange[0], minY);
//         const newMaxY = Math.max(prevRange[1], maxY);
//         const newMin = Math.min(newMinX, newMinY);
//         const newMax = Math.max(newMaxX, newMaxY);
//         return [newMin, newMax];
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
      
//       const range = overallRange;

//       let centerX = 0;
//       let centerY = 0;
//       if (data) {
//         centerX = plotData.reduce((sum, point) => sum + point[0], 0) / plotData.length;
//         centerY = plotData.reduce((sum, point) => sum + point[1], 0) / plotData.length;
//       }

//       const distanceToCoG = Math.sqrt(Math.pow(centerX, 2) + Math.pow(centerY, 2));

//       setDistances(prev => {
//         const updatedDistances = [...prev];
//         updatedDistances[index] = distanceToCoG;
//         return updatedDistances;
//       });

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
//             color: 'green',
//             pointSize: 6,
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
//         ylabel: 'Bending moment Y',
//         ylabelWidth: 100,
//         drawPoints: true,
//         strokeWidth: 0.0,
//         pointSize: 1.5,
//         highlightCircleSize: 7,
//         colors: [colorPalette[index % colorPalette.length], 'green', 'red'],
//         width: 350,
//         height: 350,
//         gridLineColor: 'transparent',
//         dateWindow: range,
//         valueRange: range,
//         axes: {
//           x: {
//             axisLabelFormatter: (d) => isNaN(d) ? '' : d.toFixed(3),
//             valueFormatter: (x) => isNaN(x) ? '' : x.toFixed(3),
//             drawGrid: false,
//             pixelsPerLabel: 30,
//             axisLabelWidth: 50,
//             ticker: (min, max, pixels, opts, dygraph, vals) => {
//               const numberOfTicks = 7;
//               const range = max - min;
//               const step = range / (numberOfTicks - 1);
//               const ticks = [];
//               for (let i = 0; i < numberOfTicks; i++) {
//                 ticks.push({v: min + i * step, label: (min + i * step).toFixed(3)});
//               }
//               return ticks;
//             },
//           },
//           y: {
//             axisLabelFormatter: (d) => isNaN(d) ? '' : d.toFixed(2),
//             valueFormatter: (y) => isNaN(y) ? '' : y.toFixed(2),
//             drawGrid: false,
//             pixelsPerLabel: 30,
//             axisLabelWidth: 50,
//           }
//         },
//         underlayCallback: (canvas, area, g) => {
//           canvas.save();
//           canvas.setLineDash([5, 5]);
//           canvas.strokeStyle = 'rgba(128, 128, 128, 0.5)';
//           canvas.lineWidth = 1;

//           const centerX = g.toDomXCoord(0);
//           canvas.beginPath();
//           canvas.moveTo(centerX, area.y);
//           canvas.lineTo(centerX, area.y + area.h);
//           canvas.stroke();

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
//           const canvas = g.hidden_;
//           const ctx = canvas.getContext('2d');
//           const centerX = g.toDomXCoord(0);
//           const centerY = g.toDomYCoord(0);
          
//           if (showCenterPoint) {
//             ctx.beginPath();
//             ctx.arc(centerX, centerY, 6, 0, 2 * Math.PI);
//             ctx.fillStyle = 'red';
//             ctx.fill();
//           }
          
//           if (showAngle) {
//             ctx.beginPath();
//             ctx.moveTo(centerX, centerY);
//             const angle = angles[index] * (Math.PI / 180);
//             const lineLength = 200;
//             const endX = centerX + lineLength * Math.cos(angle);
//             const endY = centerY - lineLength * Math.sin(angle);
//             ctx.lineTo(endX, endY);
//             ctx.strokeStyle = 'red';
//             ctx.lineWidth = 3;
//             ctx.stroke();
//           }

//           if (showValue) {
//             ctx.beginPath();
//             ctx.moveTo(centerX, centerY);
//             const angle = lineAngles[index] * (Math.PI / 180);
//             const lineLength = lineLengths[index];
//             const endX = centerX + lineLength * Math.cos(angle);
//             const endY = centerY - lineLength * Math.sin(angle);
//             ctx.lineTo(endX, endY);
//             ctx.strokeStyle = 'black';
//             ctx.lineWidth = 2;
//             ctx.stroke();

//             const xValue = lineLength * Math.cos(angle);
//             const yValue = lineLength * Math.sin(angle);
//             setLineEndpoints(prev => {
//               const newEndpoints = [...prev];
//               newEndpoints[index] = { x: xValue, y: yValue };
//               return newEndpoints;
//             });

//             const calculatedHyp = Math.sqrt(Math.pow(xValue, 2) + Math.pow(yValue, 2));
//             setCalculatedHypotenuse(prev => {
//               const newHypotenuse = [...prev];
//               newHypotenuse[index] = calculatedHyp;
//               return newHypotenuse;
//             });
//           }
//         }
//       };

//       const dygraphData = plotData.map(point => [point[0], point[1], null, null]);
//       if (calculateDistances && data) {
//         dygraphData.push([centerX, centerY, distanceToCoG, null]);
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
          
//           const xRange = dygraph.xAxisRange();
//           const yRange = dygraph.yAxisRange();
//           const xCenter = (xRange[0] + xRange[1]) / 2;
//           const yCenter = (yRange[0] + yRange[1]) / 2;
          
//           const newXRange = [
//             xCenter - (xCenter - xRange[0]) / zoomAmount,
//             xCenter + (xRange[1] - xCenter) / zoomAmount
//           ];
//           const newYRange = [
//             yCenter - (yCenter - yRange[0]) / zoomAmount,
//             yCenter + (yRange[1] - yCenter) / zoomAmount
//           ];

//           dygraph.updateOptions({
//             dateWindow: newXRange,
//         valueRange: newYRange
//           });
//         });
//       }

//       if (data) {
//         setCenterOfGravity(prev => {
//           const newCenterOfGravity = [...prev];
//           newCenterOfGravity[index] = { x: centerX, y: centerY };
//           return newCenterOfGravity;
//         });
//       }
//     }
//   };

//   useEffect(() => {
//     graphData.forEach((data, index) => {
//       createOrUpdateGraph(index);
//     });
//   }, [graphData, calculateDistances, showCenterPoint, showAngle, angles, showValue, lineAngles, lineLengths, overallRange]);

//   useEffect(() => {
//     const updateGraphs = () => {
//       const newGraphData = Array(6).fill(null);
//       const newDataStatus = Array(6).fill('');

//       selectedFiles.forEach((file, index) => {
//         if (file) {
//           const existingDataIndex = graphData.findIndex(data => data && data.fileName === file.name);
//           if (existingDataIndex !== -1) {
//             newGraphData[index] = graphData[existingDataIndex];
//             newDataStatus[index] = dataStatus[existingDataIndex];
//           } else {
//             handleFileSelection(file, index);
//           }
//         }
//       });

//       setGraphData(newGraphData);
//       setDataStatus(newDataStatus);
//     };

//     updateGraphs();
//   }, [selectedFiles]);

//   const handleFileToggle = async (file) => {
//     if (isLoading) return;

//     setSelectedFiles(prev => {
//       const isSelected = prev.includes(file);
//       if (isSelected) {
//         return prev.filter(f => f !== file);
//       } else {
//         const availableIndex = prev.findIndex(f => f === null);
//         if (availableIndex !== -1) {
//           const newSelectedFiles = [...prev];
//           newSelectedFiles[availableIndex] = file;
//           handleFileSelection(file, availableIndex);
//           return newSelectedFiles;
//         } else if (prev.length < 6) {
//           handleFileSelection(file, prev.length);
//           return [...prev, file];
//         }
//       }
//       return prev;
//     });
//   };

//   const handleAngleChange = (index, value) => {
//     setAngles(prev => {
//       const newAngles = [...prev];
//       newAngles[index] = value;
//       return newAngles;
//     });
//   };

//   const handleLineAngleChange = (index, value) => {
//     setLineAngles(prev => {
//       const newLineAngles = [...prev];
//       newLineAngles[index] = value;
//       return newLineAngles;
//     });
//   };

//   const handleLineLengthChange = (index, value) => {
//     setLineLengths(prev => {
//       const newLineLengths = [...prev];
//       newLineLengths[index] = value;
//       return newLineLengths;
//     });
//   };


//   const generateReport = async () => {
//     console.log("Starting report generation");
//     setIsGeneratingReport(true);
  
//     try {
//       const pdf = new jsPDF('l', 'mm', 'a4');
//       const pageWidth = pdf.internal.pageSize.width;
//       const pageHeight = pdf.internal.pageSize.height;
//       const margin = 10;
//       const graphWidth = (pageWidth - 4 * margin) / 3;
//       const graphHeight = (pageHeight - 3 * margin) / 2;
  
//       let currentPage = 1; // Track the current page
//       let row = 0;
//       let col = 0;
  
//       for (let i = 0; i < selectedFiles.length; i++) {
//         const graphContainer = graphContainerRef.current[i];
  
//         if (!graphContainer) {
//           console.log(`Graph container ${i + 1} not found`);
//           continue;
//         }
  
//         console.log(`Capturing graph ${i + 1}`);
//         const canvas = await html2canvas(graphContainer);
//         const imgData = canvas.toDataURL('image/png');
  
//         // Handle page breaks for every 3 graphs
//         if (i % 3 === 0 && i !== 0) { // Check if it's the first graph on a new page
//           pdf.addPage();
//           currentPage++;
//           row = 0;
//           col = 0;
//         }
  
//         const xPosition = margin + col * (graphWidth + margin);
//         const yPosition = margin + row * (graphHeight + margin);
  
//         pdf.addImage(imgData, 'PNG', xPosition, yPosition, graphWidth, graphHeight - 25);
  
//         if (graphData[i]) {
//           pdf.setFontSize(9);
//           pdf.text(`Graph ${i + 1}: ${graphData[i].fileName}`, xPosition, yPosition - 2);
  
//           pdf.setFontSize(7);
//           let valueY = yPosition + graphHeight - 23;
//           pdf.text(`CoG: ${distances[i].toFixed(2)}`, xPosition, valueY);
//           pdf.text(`Status: ${dataStatus[i] || 'N/A'}`, xPosition, valueY + 4);
//           pdf.text(`Filter: 1`, xPosition, valueY + 8);
  
//           if (showAngle) {
//             pdf.text(`Angle: ${angles[i].toFixed(2)}°`, xPosition + 40, valueY);
//           }
  
//           if (showValue) {
//             pdf.text(`Line Angle: ${lineAngles[i].toFixed(2)}°`, xPosition + 40, valueY + 4);
//             pdf.text(`Line Length: ${lineLengths[i].toFixed(2)}`, xPosition + 40, valueY + 8);
//             pdf.text(`Endpoint: (${lineEndpoints[i].x.toFixed(2)}, ${lineEndpoints[i].y.toFixed(2)})`, xPosition, valueY + 12);
//             pdf.text(`Calculated Value: ${calculatedHypotenuse[i].toFixed(2)}`, xPosition, valueY + 16);
//           }
  
//           const file = selectedFiles[i];
//           if (file) {
//             const reader = new FileReader();
//             reader.onload = (e) => {
//               const fileContent = e.target.result;
//               const lines = fileContent.split('\n');
//               const additionalInfo = {};
  
//               lines.forEach(line => {
//                 if (line.startsWith('#')) {
//                   line = line.substring(1).trim();
//                   if (line.includes(':')) {
//                     const [key, ...values] = line.split(':').map(s => s.trim());
//                     additionalInfo[key] = values.join(':').trim();
//                   } else if (line.includes('=')) {
//                     const parts = line.split(/\s+/).filter(part => part !== '=');
//                     for (let i = 0; i < parts.length; i += 2) {
//                       if (parts[i] && parts[i + 1]) {
//                         additionalInfo[parts[i]] = parts[i + 1];
//                       }
//                     }
//                   }
//                 }
//               });
  
//               // Special handling for vc and n
//               if (additionalInfo['vc'] === '' && additionalInfo['n']) {
//                 additionalInfo['vc'] = '';
//                 additionalInfo['n'] = additionalInfo['n'];
//               }
  
//               valueY += 20;
//               pdf.setFontSize(6);
//               pdf.text("File Information:", xPosition, valueY);
//               valueY += 4;
  
//               const infoToDisplay = [
//                 ['date', 'operator'], ['process'], ['tool'], ['material'], ['tool gage'],
//                 ['d', 'z'], ['ap', 'ae'], ['vc', 'n'], ['f', 'vf'], ['X'], ['cooling'], ['unit type'], ['note']
//               ];
  
//               infoToDisplay.forEach((keys, index) => {
//                 const displayStrings = keys.map(key => {
//                   const value = additionalInfo[key];
//                   return value !== undefined ? `${key}: ${value}` : '';
//                 }).filter(s => s);
//                 if (displayStrings.length > 0) {
//                   pdf.text(displayStrings.join('    '), xPosition, valueY + index * 4);
//                 }
//               });
  
//               // If this is the last graph on the current page, save the PDF
//               if (i === selectedFiles.length - 1 || (i % 3 === 2 && i !== selectedFiles.length - 1)) {
//                 pdf.save('polar_plot_report.pdf');
//                 setIsGeneratingReport(false);
//               }
//             };
//             reader.readAsText(file);
//           } else {
//             // If there's no file for this graph, move on to the next one
//             if (i === selectedFiles.length - 1 || (i % 3 === 2 && i !== selectedFiles.length - 1)) {
//               pdf.save('polar_plot_report.pdf');
//               setIsGeneratingReport(false);
//             }
//           }
  
//           // Increment row and col for the next graph
//           col++;
//           if (col >= 3) {
//             col = 0;
//             row++;
//           }
//         }
//       }
//     } catch (error) {
//       console.error("Error generating report:", error);
//       setIsGeneratingReport(false);
//     }
//   };
//   useEffect(() => {
//     Array.from({ length: 6 }).forEach((_, index) => {
//       createOrUpdateGraph(index);
//     });
//   }, []);
  
  
//   return (
//     <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center ${isVisible ? '' : 'hidden'}`}>
//       <div className="bg-[#f1f1f1] p-2 rounded-md relative" style={{ width: '98%', height: '98%', maxWidth: '1600px', maxHeight: '900px' }} onClick={(e) => e.stopPropagation()}>
//         <div className="flex h-full">
//           <div className="flex-grow overflow-auto">
//             <div className="grid grid-cols-3 gap-2 p-2">
//               {Array.from({ length: 6 }).map((_, index) => (
//                 <div key={index} className="border-2 border-gray-300 p-2 rounded-md">
//                   <h2 className="text-lg font-bold">Graph {index + 1}</h2>
//                   <div ref={(el) => graphContainerRef.current[index] = el} style={{ width: '100%', height: '300px' }}></div>
//                   <div className="mt-1 space-y-1 text-sm">
//                     <div className="flex justify-between items-center">
//                       <div>
//                         <span className="font-bold">CoG:</span>
//                         <input
//                           type="text"
//                           value={calculateDistances ? distances[index].toFixed(2) : 'N/A'}
//                           readOnly
//                           className="ml-1 p-1 border border-gray-300 rounded-md w-16 text-xs"
//                         />
//                       </div>
//                       <div>
//                         <span className="font-bold mr-1">Status:</span>
//                         <input
//                           type="text"
//                           value={dataStatus[index] || ''}
//                           readOnly
//                           className="p-1 border border-300 rounded-md w-16 text-xs"
//                         />
//                       </div>
//                       <div>
//                         <span className="font-bold mr-1">Filter:</span>
//                         <input
//                           type="text"
//                           value="1"
//                           readOnly
//                           className="p-1 border border-gray-300 rounded-md w-8 text-center text-xs"
//                         />
//                       </div>
//                     </div>
//                     {showAngle && (
//                       <div className="flex items-center">
//                         <span className="font-bold mr-1">Angle:</span>
//                         <input
//                           type="range"
//                           min="0"
//                           max="360"
//                           value={angles[index]}
//                           onChange={(e) => handleAngleChange(index, parseInt(e.target.value))}
//                           className="w-24 mr-1"
//                         />
//                         <input
//                           type="text"
//                           value={angles[index].toFixed(2)}
//                           readOnly
//                           className="p-1 border border-gray-300 rounded-md w-14 text-center text-xs"
//                         />
//                       </div>
//                     )}
//                     {showValue && (
//                       <div className="flex items-center space-x-1 overflow-x-auto text-xs">
//                         <div className="flex items-center shrink-0">
//                           <span className="font-bold mr-1">Line Angle:</span>
//                           <input
//                             type="range"
//                             min="0"
//                             max="360"
//                             value={lineAngles[index]}
//                             onChange={(e) => handleLineAngleChange(index, parseInt(e.target.value))}
//                             className="w-20"
//                           />
//                         </div>
//                         <div className="flex items-center shrink-0">
//                           <span className="font-bold mr-1">Line Drag:</span>
//                           <input
//                             type="range"
//                             min="0"
//                             max="300"
//                             value={lineLengths[index]}
//                             onChange={(e) => handleLineLengthChange(index, parseInt(e.target.value))}
//                             className="w-20"
//                           />
//                         </div>
//                         <div className="shrink-0">
//                           <span className="font-bold mr-1">Endpoint:</span>
//                           <input
//                             type="text"
//                             value={`X: ${lineEndpoints[index].x.toFixed(2)}, Y: ${lineEndpoints[index].y.toFixed(2)}`}
//                             readOnly
//                             className="p-1 border border-gray-300 rounded-md w-36 text-center text-xs"
//                           />
//                         </div>
//                         <div className="shrink-0">
//                           <span className="font-bold mr-1">Calculate value:</span>
//                           <input
//                             type="text"
//                             value={calculatedHypotenuse[index].toFixed(2)}
//                             readOnly
//                             className="p-1 border border-gray-300 rounded-md w-16 text-center text-xs"
//                           />
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
          
//           <div className="w-64 flex flex-col p-2 border-l-2 border-gray-300">
//             <div className="mb-4">
//               <input
//                 type="file"
//                 webkitdirectory="true"
//                 multiple
//                 onChange={handleFolderUpload}
//                 className="mb-2 text-sm"
//                 disabled={isLoading}
//               />
//               <div className="h-40 overflow-y-auto border border-gray-400 rounded-md p-1 text-xs">
//                 {files.map((file, index) => (
//                   <div key={index} className="flex items-center mb-1">
//                     <input
//                       type="checkbox"
//                       checked={selectedFiles.includes(file)}
//                       onChange={() => handleFileToggle(file)}
//                       className="mr-1"
//                       disabled={isLoading}
//                     />
//                     <span>{file.name}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>
            
//             <div className="space-y-2 mt-auto">
//               <button
//                 onClick={() => setCalculateDistances(prev => !prev)}
//                 className="p-1 text-xs text-white bg-blue-600 rounded-md w-full"
//               >
//                 {calculateDistances ? 'Hide Distance' : 'Show Distance'}
//               </button>
//               <button
//                 onClick={() => setShowCenterPoint(prev => !prev)}
//                 className="p-1 text-xs text-white bg-green-600 rounded-md w-full"
//               >
//                 {showCenterPoint ? 'Hide Center Point' : 'Show Center Point'}
//               </button>
//               <button
//                 onClick={() => setShowAngle(prev => !prev)}
//                 className="p-1 text-xs text-white bg-purple-600 rounded-md w-full"
//               >
//                 {showAngle ? 'Hide Angle' : 'Show Angle'}
//               </button>
//               <button
//                 onClick={() => setShowValue(prev => !prev)}
//                 className="p-1 text-xs text-white bg-yellow-600 rounded-md w-full"
//               >
//                 {showValue ? 'Hide Value' : 'Show Value'}
//               </button>
//               <button
//                 onClick={generateReport}
//                 disabled={isGeneratingReport}
//                 className="p-1 text-xs text-white bg-red-600 rounded-md w-full"
//               >
//                 {isGeneratingReport ? 'Generating...' : 'Generate Report'}
//               </button>
//               <button onClick={onClose} className="p-1 text-xs text-white bg-gray-800 rounded-md w-full">
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
  
//       {toastMessage && (
//         <Toast
//           message={toastMessage}
//           onClose={() => setToastMessage('')}
//         />
//       )}
//     </div>
//   );
// };

// export default PolarPlot;

//correct final code below:
// import React, { useEffect, useRef, useState } from 'react';
// import Dygraph from 'dygraphs';
// import html2canvas from 'html2canvas';
// import jsPDF from 'jspdf';
// import { rotateDegrees } from 'pdf-lib';

// const Toast = ({ message, onClose }) => (
//   <div className="fixed top-4 right-4 bg-gray-800 text-white px-4 py-2 rounded-md shadow-lg ">
//     {message}
//     <button onClick={onClose} className="ml-2 text-sm">&times;</button>
//   </div>
// );

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
//   const [showValue, setShowValue] = useState(false);
//   const [lineAngles, setLineAngles] = useState(Array(6).fill(0));
//   const [lineLengths, setLineLengths] = useState(Array(6).fill(100));
//   const [lineEndpoints, setLineEndpoints] = useState(Array(6).fill({ x: 0, y: 0 }));
//   const [calculatedHypotenuse, setCalculatedHypotenuse] = useState(Array(6).fill(0));
//   const [isGeneratingReport, setIsGeneratingReport] = useState(false);
//   const [overallRange, setOverallRange] = useState([-1, 1]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [toastMessage, setToastMessage] = useState('');
//   const [isProcessing, setIsProcessing] = useState({
//     distance: false,
//     centerPoint: false,
//     angle: false,
//     value: false,
//   });


  
//   const showToast = (message) => {
//     setToastMessage(message);
//     setTimeout(() => setToastMessage(''), 3000); // Toast disappears after 3 seconds
//   };

//   const handleCalculateDistances = () => {
//     setIsProcessing(prev => ({ ...prev, distance: true }));
//     showToast('Please wait, calculating distance CGO...');
//     setTimeout(() => {
//       setCalculateDistances(prev => !prev);
//       setIsProcessing(prev => ({ ...prev, distance: false }));
//       showToast('Distances CGO calculated and displayed');
//     }, 1000); // Simulating a delay for the calculation
//   };

//   const handleShowCenterPoint = () => {
//     setIsProcessing(prev => ({ ...prev, centerPoint: true }));
//     showToast('Please wait, showing zero point...');
//     setTimeout(() => {
//       setShowCenterPoint(prev => !prev);
//       setIsProcessing(prev => ({ ...prev, centerPoint: false }));
//       showToast('zero point displayed');
//     }, 1000);
//   };

//   const handleShowAngle = () => {
//     setIsProcessing(prev => ({ ...prev, angle: true }));
//     showToast('Please wait, preparing angle display...');
//     setTimeout(() => {
//       setShowAngle(prev => !prev);
//       setIsProcessing(prev => ({ ...prev, angle: false }));
//       showToast('Angle display ready');
//     }, 1000);
//   };

//   const handleShowValue = () => {
//     setIsProcessing(prev => ({ ...prev, value: true }));
//     showToast('Please wait, calculating values...');
//     setTimeout(() => {
//       setShowValue(prev => !prev);
//       setIsProcessing(prev => ({ ...prev, value: false }));
//       showToast('Values calculated and displayed');
//     }, 1000);
//   };
//   const colorPalette = ['#800080', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF'];
//   const zoomFactor = 1.2;

//   const placeholderData = Array(6).fill().map(() => [
//     [0, 0], [1, 1], [-1, -1], [1, -1], [-1, 1]
//   ]);

//   const handleFolderUpload = (e) => {
//     const selectedFiles = Array.from(e.target.files);
//     setFiles(selectedFiles);
//   };

//   const handleFileSelection = async (file, index) => {
//     setIsLoading(true);
//     setToastMessage('Please wait, data is being loaded...');
    
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         const fileData = e.target.result;
//         processFileData(fileData, file.name, index);
//         setIsLoading(false);
//         setToastMessage('');
//         resolve();
//       };
//       reader.onerror = (error) => {
//         setIsLoading(false);
//         setToastMessage('Error loading file. Please try again.');
//         reject(error);
//       };
//       reader.readAsText(file);
//     });
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

//       setOverallRange(prevRange => {
//         const newMinX = Math.min(prevRange[0], minX);
//         const newMaxX = Math.max(prevRange[1], maxX);
//         const newMinY = Math.min(prevRange[0], minY);
//         const newMaxY = Math.max(prevRange[1], maxY);
//         const newMin = Math.min(newMinX, newMinY);
//         const newMax = Math.max(newMaxX, newMaxY);
//         return [newMin, newMax];
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
    
      
//       const range = overallRange;

//       let centerX = 0;
//       let centerY = 0;
//       if (data) {
//         centerX = plotData.reduce((sum, point) => sum + point[0], 0) / plotData.length;
//         centerY = plotData.reduce((sum, point) => sum + point[1], 0) / plotData.length;
//       }

//       const distanceToCoG = Math.sqrt(Math.pow(centerX, 2) + Math.pow(centerY, 2));

//       setDistances(prev => {
//         const updatedDistances = [...prev];
//         updatedDistances[index] = distanceToCoG;
//         return updatedDistances;
//       });
      

//       const graphOptions = {
//         labels: ['Bending moment X[Nm]', 'Bending moment Y[Nm]', 'Distance', 'Center Point'],
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
//             color: 'green',
//             pointSize: 5,
//           },
//           'Center Point': {
//             strokeWidth: 0,
//             drawPoints: true,
//             pointSize: 5,
//             color: 'red',
//           },
//         },
//         // title: `${fileName}`,
//         title: fileName,
//         titleHeight: 22,
//         titleLineHeight: 15,
//         titleFontSize: 10,
//         showLabelsOnHighlight: false,
//         // xlabel: 'Bending moment X',
//         // ylabel: 'Bending moment Y',
        
//         ylabelWidth: 100,
//         drawPoints: true,
//         strokeWidth: 0.0,
//         pointSize: 1.5,
//         highlightCircleSize: 7,
//         colors: [colorPalette[index % colorPalette.length], 'green', 'red'],
//         width: 350,
//         height: 350,
//         gridLineColor: 'transparent',
//         dateWindow: range,
//         valueRange: range,
//         axes: {
//           x: {
//             axisLabelFormatter: (d) => isNaN(d) ? '' : d.toFixed(3),
//             valueFormatter: (x) => isNaN(x) ? '' : x.toFixed(3),
//             drawGrid: false,
//             pixelsPerLabel: 30,
//             axisLabelWidth: 50,
//             ticker: (min, max, pixels, opts, dygraph, vals) => {
//               const numberOfTicks = 7;
//               const range = max - min;
//               const step = range / (numberOfTicks - 1);
//               const ticks = [];
//               for (let i = 0; i < numberOfTicks; i++) {
//                 ticks.push({v: min + i * step, label: (min + i * step).toFixed(3)});
//               }
//               return ticks;
//             },
//           },
//           y: {
//             axisLabelFormatter: (d) => isNaN(d) ? '' : d.toFixed(2),
//             valueFormatter: (y) => isNaN(y) ? '' : y.toFixed(2),
//             drawGrid: false,
//             pixelsPerLabel: 30,
//             axisLabelWidth: 50,
//             labelsDiv: document.createElement('div'), 
//           },
//         },

        
//         underlayCallback: (canvas, area, g) => {
//           canvas.save();
//           canvas.setLineDash([5, 5]);
//           canvas.strokeStyle = 'rgba(128, 128, 128, 0.5)';
//           canvas.lineWidth = 1;

//           const centerX = g.toDomXCoord(0);
//           canvas.beginPath();
//           canvas.moveTo(centerX, area.y);
//           canvas.lineTo(centerX, area.y + area.h);
//           canvas.stroke();

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
//           const canvas = g.hidden_;
//           const ctx = canvas.getContext('2d');
//           const centerX = g.toDomXCoord(0);
//           const centerY = g.toDomYCoord(0);

          
          
//           if (showCenterPoint) {
//             ctx.beginPath();
//             ctx.arc(centerX, centerY, 5, 0, 2 * Math.PI);
//             ctx.fillStyle = 'red';
//             ctx.fill();
//           }
          
//           if (showAngle) {
//             ctx.beginPath();
//             ctx.moveTo(centerX, centerY);
//             const angle = angles[index] * (Math.PI / 180);
//             const lineLength = 160;
//             const endX = centerX + lineLength * Math.cos(angle);
//             const endY = centerY - lineLength * Math.sin(angle);
//             ctx.lineTo(endX, endY);
//             ctx.strokeStyle = 'red';
//             ctx.lineWidth = 2;
//             ctx.stroke();
//           }

//           if (showValue) {
//             ctx.beginPath();
//             ctx.moveTo(centerX, centerY);
//             const angle = lineAngles[index] * (Math.PI / 180);
//             const lineLength = lineLengths[index];
//             const endDomX = centerX + lineLength * Math.cos(angle);
//             const endDomY = centerY - lineLength * Math.sin(angle);
//             ctx.lineTo(endDomX, endDomY);
//             ctx.strokeStyle = 'black';
//             ctx.lineWidth = 2;
//             ctx.stroke();
        
//             // Convert end point to data coordinates
//             const endDataX = g.toDataXCoord(endDomX);
//             const endDataY = g.toDataYCoord(endDomY);
        
//             setLineEndpoints(prev => {
//               const newEndpoints = [...prev];
//               newEndpoints[index] = { x: endDataX, y: endDataY };
//               return newEndpoints;
//             });
        
//             const calculatedHyp = Math.sqrt(Math.pow(endDataX, 2) + Math.pow(endDataY, 2));
//             setCalculatedHypotenuse(prev => {
//               const newHypotenuse = [...prev];
//               newHypotenuse[index] = calculatedHyp;
//               return newHypotenuse;
//             });
//           }
//         }
//       };

    
//       const dygraphData = plotData.map(point => [point[0], point[1], null, null]);
//       if (calculateDistances && data) {
//         dygraphData.push([centerX, centerY, distanceToCoG, null]);
//       }

//       if (existingDygraph) {
//         existingDygraph.updateOptions({
//           file: dygraphData,
//           ...graphOptions
//         });
//       } else {
//         const dygraph = new Dygraph(graphContainer, dygraphData, graphOptions);

//         graphContainer.dygraph = dygraph;

        
//       // Add vertical y-axis label after graph initialization
//       const yLabelElement = document.createElement('div');
//       yLabelElement.style.position = 'absolute';
//       yLabelElement.style.left = '15px';
//       yLabelElement.style.top = '50%';
//       yLabelElement.style.transform = 'rotate(-90deg) translateX(-50%)';
//       yLabelElement.style.transformOrigin = 'center left';
//       yLabelElement.style.width = '100px';
//       yLabelElement.style.textAlign = 'center';
//       yLabelElement.style.fontWeight = 'bold';
//       yLabelElement.style.fontSize = '12px';
//       yLabelElement.textContent = 'Bending moment Y [Nm]';
//       graphContainer.appendChild(yLabelElement);

//       // Ensure graph container has relative positioning
//       graphContainer.style.position = 'relative';
        

//     // Add horizontal x-axis label after graph initialization
// const xLabelElement = document.createElement('div');
// xLabelElement.style.position = 'absolute';
// xLabelElement.style.left = '50%';
// xLabelElement.style.bottom = '-25px'; // Increased distance from bottom
// xLabelElement.style.transform = 'translateX(-50%)';
// xLabelElement.style.width = '100%';
// xLabelElement.style.textAlign = 'center';
// xLabelElement.style.fontWeight = 'bold';
// xLabelElement.style.fontSize = '12px';
// xLabelElement.textContent = 'Bending moment X [Nm]';
// graphContainer.appendChild(xLabelElement);

// // Adjust graph container to accommodate the new label
// graphContainer.style.position = 'relative';
// graphContainer.style.marginBottom = '30px'; // Add margin to create space for the label

//         graphContainer.addEventListener('wheel', (e) => {
//           e.preventDefault();
//           const zoomAmount = e.deltaY < 0 ? zoomFactor : 1 / zoomFactor;
          
//           const xRange = dygraph.xAxisRange();
//           const yRange = dygraph.yAxisRange();
//           const xCenter = (xRange[0] + xRange[1]) / 2;
//           const yCenter = (yRange[0] + yRange[1]) / 2;
          
//           const newXRange = [
//             xCenter - (xCenter - xRange[0]) / zoomAmount,
//             xCenter + (xRange[1] - xCenter) / zoomAmount
//           ];
//           const newYRange = [
//             yCenter - (yCenter - yRange[0]) / zoomAmount,
//             yCenter + (yRange[1] - yCenter) / zoomAmount
//           ];

//           dygraph.updateOptions({
//             dateWindow: newXRange,
//         valueRange: newYRange
//           });
//         });
//       }

//       if (data) {
//         setCenterOfGravity(prev => {
//           const newCenterOfGravity = [...prev];
//           newCenterOfGravity[index] = { x: centerX, y: centerY };
//           return newCenterOfGravity;
//         });
//       }
//     }
//   };

//   useEffect(() => {
//     graphData.forEach((data, index) => {
//       createOrUpdateGraph(index);
//     });
//   }, [graphData, calculateDistances, showCenterPoint, showAngle, angles, showValue, lineAngles, lineLengths, overallRange]);

//   useEffect(() => {
//     const updateGraphs = () => {
//       const newGraphData = Array(6).fill(null);
//       const newDataStatus = Array(6).fill('');

//       selectedFiles.forEach((file, index) => {
//         if (file) {
//           const existingDataIndex = graphData.findIndex(data => data && data.fileName === file.name);
//           if (existingDataIndex !== -1) {
//             newGraphData[index] = graphData[existingDataIndex];
//             newDataStatus[index] = dataStatus[existingDataIndex];
//           } else {
//             handleFileSelection(file, index);
//           }
//         }
//       });

//       setGraphData(newGraphData);
//       setDataStatus(newDataStatus);
//     };

//     updateGraphs();
//   }, [selectedFiles]);

//   const handleFileToggle = async (file) => {
//     if (isLoading) return;

//     setSelectedFiles(prev => {
//       const isSelected = prev.includes(file);
//       if (isSelected) {
//         return prev.filter(f => f !== file);
//       } else {
//         const availableIndex = prev.findIndex(f => f === null);
//         if (availableIndex !== -1) {
//           const newSelectedFiles = [...prev];
//           newSelectedFiles[availableIndex] = file;
//           handleFileSelection(file, availableIndex);
//           return newSelectedFiles;
//         } else if (prev.length < 6) {
//           handleFileSelection(file, prev.length);
//           return [...prev, file];
//         }
//       }
//       return prev;
//     });
//   };

//   const handleAngleChange = (index, value) => {
//     setAngles(prev => {
//       const newAngles = [...prev];
//       newAngles[index] = value;
//       return newAngles;
//     });
//   };

//   const handleLineAngleChange = (index, value) => {
//     setLineAngles(prev => {
//       const newLineAngles = [...prev];
//       newLineAngles[index] = value;
//       return newLineAngles;
//     });
//   };

//   const handleLineLengthChange = (index, value) => {
//     setLineLengths(prev => {
//       const newLineLengths = [...prev];
//       newLineLengths[index] = value;
//       return newLineLengths;
//     });
//   };


//   const generateReport = async () => {
//     console.log("Starting report generation");
//     setIsGeneratingReport(true);
  
//     try {
//       const pdf = new jsPDF('l', 'mm', 'a4');
//       const pageWidth = pdf.internal.pageSize.width;
//       const pageHeight = pdf.internal.pageSize.height;
//       const margin = 10;
//       const graphWidth = (pageWidth - 4 * margin) / 3;
//       const graphHeight = (pageHeight - 3 * margin) / 2;
  
//       let currentPage = 1; // Track the current page
//       let row = 0;
//       let col = 0;
  
//       for (let i = 0; i < selectedFiles.length; i++) {
//         const graphContainer = graphContainerRef.current[i];
  
//         if (!graphContainer) {
//           console.log(`Graph container ${i + 1} not found`);
//           continue;
//         }
  
//         console.log(`Capturing graph ${i + 1}`);
//         const canvas = await html2canvas(graphContainer);
//         const imgData = canvas.toDataURL('image/png');
  
//         // Handle page breaks for every 3 graphs
//         if (i % 3 === 0 && i !== 0) { // Check if it's the first graph on a new page
//           pdf.addPage();
//           currentPage++;
//           row = 0;
//           col = 0;
//         }
  
//         const xPosition = margin + col * (graphWidth + margin);
//         const yPosition = margin + row * (graphHeight + margin);
  
//         pdf.addImage(imgData, 'PNG', xPosition, yPosition, graphWidth, graphHeight - 25);
  
//         if (graphData[i]) {
//           pdf.setFontSize(9);
//           pdf.text(`Graph ${i + 1}: ${graphData[i].fileName}`, xPosition, yPosition - 2);
  
//           pdf.setFontSize(7);
//           let valueY = yPosition + graphHeight - 23;
//           pdf.text(`CoG: ${distances[i].toFixed(2)}`, xPosition, valueY);
//           pdf.text(`Status: ${dataStatus[i] || 'N/A'}`, xPosition, valueY + 4);
//           pdf.text(`Filter: 1`, xPosition, valueY + 8);
  
//           if (showAngle) {
//             pdf.text(`Angle: ${angles[i].toFixed(2)}°`, xPosition + 40, valueY);
//           }
  
//           if (showValue) {
//             pdf.text(`Line Angle: ${lineAngles[i].toFixed(2)}°`, xPosition + 40, valueY + 4);
//             pdf.text(`Line Length: ${lineLengths[i].toFixed(2)}`, xPosition + 40, valueY + 8);
//             pdf.text(`Endpoint: (${lineEndpoints[i].x.toFixed(2)}, ${lineEndpoints[i].y.toFixed(2)})`, xPosition, valueY + 12);
//             pdf.text(`Calculated Value: ${calculatedHypotenuse[i].toFixed(2)}`, xPosition, valueY + 16);
//           }
  
//           const file = selectedFiles[i];
//           if (file) {
//             const reader = new FileReader();
//             reader.onload = (e) => {
//               const fileContent = e.target.result;
//               const lines = fileContent.split('\n');
//               const additionalInfo = {};
  
//               lines.forEach(line => {
//                 if (line.startsWith('#')) {
//                   line = line.substring(1).trim();
//                   if (line.includes(':')) {
//                     const [key, ...values] = line.split(':').map(s => s.trim());
//                     additionalInfo[key] = values.join(':').trim();
//                   } else if (line.includes('=')) {
//                     const parts = line.split(/\s+/).filter(part => part !== '=');
//                     for (let i = 0; i < parts.length; i += 2) {
//                       if (parts[i] && parts[i + 1]) {
//                         additionalInfo[parts[i]] = parts[i + 1];
//                       }
//                     }
//                   }
//                 }
//               });
  
//               // Special handling for vc and n
//               if (additionalInfo['vc'] === '' && additionalInfo['n']) {
//                 additionalInfo['vc'] = '';
//                 additionalInfo['n'] = additionalInfo['n'];
//               }
  
//               valueY += 20;
//               pdf.setFontSize(6);
//               pdf.text("File Information:", xPosition, valueY);
//               valueY += 4;
  
//               const infoToDisplay = [
//                 ['date', 'operator'], ['process'], ['tool'], ['material'], ['tool gage'],
//                 ['d', 'z'], ['ap', 'ae'], ['vc', 'n'], ['f', 'vf'], ['X'], ['cooling'], ['unit type'], ['note']
//               ];
  
//               infoToDisplay.forEach((keys, index) => {
//                 const displayStrings = keys.map(key => {
//                   const value = additionalInfo[key];
//                   return value !== undefined ? `${key}: ${value}` : '';
//                 }).filter(s => s);
//                 if (displayStrings.length > 0) {
//                   pdf.text(displayStrings.join('    '), xPosition, valueY + index * 4);
//                 }
//               });
  
//               // If this is the last graph on the current page, save the PDF
//               if (i === selectedFiles.length - 1 || (i % 3 === 2 && i !== selectedFiles.length - 1)) {
//                 pdf.save('polar_plot_report.pdf');
//                 setIsGeneratingReport(false);
//               }
//             };
//             reader.readAsText(file);
//           } else {
//             // If there's no file for this graph, move on to the next one
//             if (i === selectedFiles.length - 1 || (i % 3 === 2 && i !== selectedFiles.length - 1)) {
//               pdf.save('polar_plot_report.pdf');
//               setIsGeneratingReport(false);
//             }
//           }
  
//           // Increment row and col for the next graph
//           col++;
//           if (col >= 3) {
//             col = 0;
//             row++;
//           }
//         }
//       }
//     } catch (error) {
//       console.error("Error generating report:", error);
//       setIsGeneratingReport(false);
//     }
//   };
//   useEffect(() => {
//     Array.from({ length: 6 }).forEach((_, index) => {
//       createOrUpdateGraph(index);
//     });
//   }, []);
  
  
//   return (
//     <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center ${isVisible ? '' : 'hidden'}`}>
//       <div className="bg-[#f1f1f1] p-2 rounded-md relative" style={{ width: '98%', height: '98%', maxWidth: '1800px', maxHeight: '900px' }} onClick={(e) => e.stopPropagation()}>
//         <div className="flex h-full">
//           <div className="flex-grow overflow-auto">
//             <div className="grid grid-cols-3 gap-2 p-2">
//               {Array.from({ length: 6 }).map((_, index) => (
//                 <div key={index} className="border-2 border-gray-300 p-2 rounded-md">
//                   <h2 className="text-lg font-bold">Graph {index + 1}</h2>
//                   <div ref={(el) => graphContainerRef.current[index] = el} style={{ width: '100%', height: '300px' }}></div>
//                   <div className="mt-1 space-y-1 text-sm">
//                     <div className="flex justify-between items-center">
//                       <div>
//                         <span className="font-bold">CoG:</span>
//                         <input
//                           type="text"
//                           value={calculateDistances ? distances[index].toFixed(2) : 'N/A'}
//                           readOnly
//                           className="ml-1 p-1 border border-gray-300 rounded-md w-16 text-xs"
//                         />
//                       </div>
//                       <div>
//                         <span className="font-bold mr-1">Status:</span>
//                         <input
//                           type="text"
//                           value={dataStatus[index] || ''}
//                           readOnly
//                           className="p-1 border border-300 rounded-md w-16 text-xs"
//                         />
//                       </div>
//                       <div>
//                         <span className="font-bold mr-1">Filter:</span>
//                         <input
//                           type="text"
//                           value="1"
//                           readOnly
//                           className="p-1 border border-gray-300 rounded-md w-8 text-center text-xs"
//                         />
//                       </div>
//                     </div>
//                     {showAngle && (
//                       <div className="flex items-center">
//                         <span className="font-bold mr-1">Angle:</span>
//                         <input
//                           type="range"
//                           min="0"
//                           max="360"
//                           value={angles[index]}
//                           onChange={(e) => handleAngleChange(index, parseInt(e.target.value))}
//                           className="w-24 mr-1"
//                         />
//                         <input
//                           type="text"
//                           value={angles[index].toFixed(2)}
//                           readOnly
//                           className="p-1 border border-gray-300 rounded-md w-14 text-center text-xs"
//                         />
//                       </div>
//                     )}
//                     {showValue && (
//                       <div className="flex items-center space-x-1 overflow-x-auto text-xs">
//                         <div className="flex items-center shrink-0">
//                           <span className="font-bold mr-1">Line Angle:</span>
//                           <input
//                             type="range"
//                             min="0"
//                             max="360"
//                             value={lineAngles[index]}
//                             onChange={(e) => handleLineAngleChange(index, parseInt(e.target.value))}
//                             className="w-20"
//                           />
//                         </div>
//                         <div className="flex items-center shrink-0">
//                           <span className="font-bold mr-1">Line Drag:</span>
//                           <input
//                             type="range"
//                             min="0"
//                             max="300"
//                             value={lineLengths[index]}
//                             onChange={(e) => handleLineLengthChange(index, parseInt(e.target.value))}
//                             className="w-20"
//                           />
//                         </div>
//                         <div className="shrink-0">
//                           <span className="font-bold mr-1">Endpoint:</span>
//                           <input
//                             type="text"
//                             value={`X: ${lineEndpoints[index].x.toFixed(2)}, Y: ${lineEndpoints[index].y.toFixed(2)}`}
//                             readOnly
//                             className="p-1 border border-gray-300 rounded-md w-36 text-center text-xs"
//                           />
//                         </div>
//                         <div className="shrink-0">
//                           <span className="font-bold mr-1">Calculate value:</span>
//                           <input
//                             type="text"
//                             value={calculatedHypotenuse[index].toFixed(2)}
//                             readOnly
//                             className="p-1 border border-gray-300 rounded-md w-16 text-center text-xs"
//                           />
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
          
//           <div className="w-64 flex flex-col p-2 border-l-2 border-gray-300">
//             <div className="mb-4">
//               <input
//                 type="file"
//                 webkitdirectory="true"
//                 multiple
//                 onChange={handleFolderUpload}
//                 className="mb-2 text-sm"
//                 disabled={isLoading}
//               />
//               <div className="h-40 overflow-y-auto border border-gray-400 rounded-md p-1 text-xs">
//                 {files.map((file, index) => (
//                   <div key={index} className="flex items-center mb-1">
//                     <input
//                       type="checkbox"
//                       checked={selectedFiles.includes(file)}
//                       onChange={() => handleFileToggle(file)}
//                       className="mr-1"
//                       disabled={isLoading}
//                     />
//                     <span>{file.name}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>
            
//         <div className="space-y-2 mt-auto">
//           <button
//             onClick={handleCalculateDistances}
//             disabled={isProcessing.distance}
//             className="p-1 text-xs text-white bg-blue-600 rounded-md w-full"
//           >
//             {isProcessing.distance ? 'Processing...' : (calculateDistances ? 'Hide Distance' : 'Show Distance')}
//           </button>
//           <button
//             onClick={handleShowCenterPoint}
//             disabled={isProcessing.centerPoint}
//             className="p-1 text-xs text-white bg-green-600 rounded-md w-full"
//           >
//             {isProcessing.centerPoint ? 'Processing...' : (showCenterPoint ? 'Hide Center Point' : 'Show Center Point')}
//           </button>
//           <button
//             onClick={handleShowAngle}
//             disabled={isProcessing.angle}
//             className="p-1 text-xs text-white bg-purple-600 rounded-md w-full"
//           >
//             {isProcessing.angle ? 'Processing...' : (showAngle ? 'Hide Angle' : 'Show Angle')}
//           </button>
//           <button
//             onClick={handleShowValue}
//             disabled={isProcessing.value}
//             className="p-1 text-xs text-white bg-yellow-600 rounded-md w-full"
//           >
//             {isProcessing.value ? 'Processing...' : (showValue ? 'Hide Value' : 'Show Value')}
//           </button>
//               <button
//                 onClick={generateReport}
//                 disabled={isGeneratingReport}
//                 className="p-1 text-xs text-white bg-red-600 rounded-md w-full"
//               >
//                 {isGeneratingReport ? 'Generating...' : 'Generate Report'}
//               </button>
//               <button onClick={onClose} className="p-1 text-xs text-white bg-gray-800 rounded-md w-full">
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
  
//       {toastMessage && (
//         <Toast
//           message={toastMessage}
//           onClose={() => setToastMessage('')}
//         />
//       )}
//     </div>
//   );
// };

// export default PolarPlot;



///rotating and steraching show angle line code but degree calculation is not correct

// import React, { useEffect, useRef, useState } from 'react';
// import Dygraph from 'dygraphs';
// import html2canvas from 'html2canvas';
// import jsPDF from 'jspdf';
// import { rotateDegrees } from 'pdf-lib';

// const Toast = ({ message, onClose }) => (
//   <div className="fixed top-4 right-4 bg-gray-800 text-white px-4 py-2 rounded-md shadow-lg ">
//     {message}
//     <button onClick={onClose} className="ml-2 text-sm">&times;</button>
//   </div>
// );

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
//   const [showValue, setShowValue] = useState(false);
//   const [lineAngles, setLineAngles] = useState(Array(6).fill(0));
//   const [lineLengths, setLineLengths] = useState(Array(6).fill(100));
//   const [lineEndpoints, setLineEndpoints] = useState(Array(6).fill({ x: 0, y: 0 }));
//   const [calculatedHypotenuse, setCalculatedHypotenuse] = useState(Array(6).fill(0));
//   const [isGeneratingReport, setIsGeneratingReport] = useState(false);
//   const [overallRange, setOverallRange] = useState([-1, 1]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [toastMessage, setToastMessage] = useState('');

//   const [angleLines, setAngleLines] = useState(Array(6).fill({ angle: 0, length: 100 }));
//   const [angleEndpoints, setAngleEndpoints] = useState(Array(6).fill({ x: 0, y: 0, angle: 0, length: 0 }));
//   const [isProcessing, setIsProcessing] = useState({
//     distance: false,
//     centerPoint: false,
//     angle: false,
//     value: false,
//   });

 
//   const calculateAngleFromEndpoint = (x, y) => {
//     // Calculate the angle in radians using arctangent
//     let angleRad = Math.atan2(y, x);
    
//     // Convert to degrees
//     let angleDeg = (angleRad * 180 / Math.PI);
    
//     // Adjust the angle to match the coordinate system used in the graph
//     // (0 degrees at 3 o'clock position, increasing counterclockwise)
//     angleDeg = (90 - angleDeg + 360) % 360;
    
//     return angleDeg;
//   };


  
//   const showToast = (message) => {
//     setToastMessage(message);
//     setTimeout(() => setToastMessage(''), 3000); // Toast disappears after 3 seconds
//   };

//   const handleCalculateDistances = () => {
//     setIsProcessing(prev => ({ ...prev, distance: true }));
//     showToast('Please wait, calculating distance CGO...');
//     setTimeout(() => {
//       setCalculateDistances(prev => !prev);
//       setIsProcessing(prev => ({ ...prev, distance: false }));
//       showToast('Distances CGO calculated and displayed');
//     }, 1000); // Simulating a delay for the calculation
//   };

//   const handleShowCenterPoint = () => {
//     setIsProcessing(prev => ({ ...prev, centerPoint: true }));
//     showToast('Please wait, showing zero point...');
//     setTimeout(() => {
//       setShowCenterPoint(prev => !prev);
//       setIsProcessing(prev => ({ ...prev, centerPoint: false }));
//       showToast('zero point displayed');
//     }, 1000);
//   };

//   const handleShowAngle = () => {
//     setIsProcessing(prev => ({ ...prev, angle: true }));
//     showToast('Please wait, preparing angle display...');
//     setTimeout(() => {
//       setShowAngle(prev => !prev);
//       setIsProcessing(prev => ({ ...prev, angle: false }));
//       showToast('Angle display ready');
//     }, 1000);
//   };

//   const handleShowValue = () => {
//     setIsProcessing(prev => ({ ...prev, value: true }));
//     showToast('Please wait, calculating values...');
//     setTimeout(() => {
//       setShowValue(prev => !prev);
//       setIsProcessing(prev => ({ ...prev, value: false }));
//       showToast('Values calculated and displayed');
//     }, 1000);
//   };
//   const colorPalette = ['#800080', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF'];
//   const zoomFactor = 1.2;

//   const placeholderData = Array(6).fill().map(() => [
//     [0, 0], [1, 1], [-1, -1], [1, -1], [-1, 1]
//   ]);

//   const handleFolderUpload = (e) => {
//     const selectedFiles = Array.from(e.target.files);
//     setFiles(selectedFiles);
//   };

//   const handleFileSelection = async (file, index) => {
//     setIsLoading(true);
//     setToastMessage('Please wait, data is being loaded...');
    
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         const fileData = e.target.result;
//         processFileData(fileData, file.name, index);
//         setIsLoading(false);
//         setToastMessage('');
//         resolve();
//       };
//       reader.onerror = (error) => {
//         setIsLoading(false);
//         setToastMessage('Error loading file. Please try again.');
//         reject(error);
//       };
//       reader.readAsText(file);
//     });
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

//       setOverallRange(prevRange => {
//         const newMinX = Math.min(prevRange[0], minX);
//         const newMaxX = Math.max(prevRange[1], maxX);
//         const newMinY = Math.min(prevRange[0], minY);
//         const newMaxY = Math.max(prevRange[1], maxY);
//         const newMin = Math.min(newMinX, newMinY);
//         const newMax = Math.max(newMaxX, newMaxY);
//         return [newMin, newMax];
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
    
      
//       const range = overallRange;

//       let centerX = 0;
//       let centerY = 0;
//       if (data) {
//         centerX = plotData.reduce((sum, point) => sum + point[0], 0) / plotData.length;
//         centerY = plotData.reduce((sum, point) => sum + point[1], 0) / plotData.length;
//       }

//       const distanceToCoG = Math.sqrt(Math.pow(centerX, 2) + Math.pow(centerY, 2));

//       setDistances(prev => {
//         const updatedDistances = [...prev];
//         updatedDistances[index] = distanceToCoG;
//         return updatedDistances;
//       });
      

//       const graphOptions = {
//         labels: ['Bending moment X[Nm]', 'Bending moment Y[Nm]', 'Distance', 'Center Point'],
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
//             color: 'green',
//             pointSize: 5,
//           },
//           'Center Point': {
//             strokeWidth: 0,
//             drawPoints: true,
//             pointSize: 5,
//             color: 'red',
//           },
//         },
//         // title: `${fileName}`,
//         title: fileName,
//         titleHeight: 22,
//         titleLineHeight: 15,
//         titleFontSize: 10,
//         showLabelsOnHighlight: false,
//         // xlabel: 'Bending moment X',
//         // ylabel: 'Bending moment Y',
        
//         ylabelWidth: 100,
//         drawPoints: true,
//         strokeWidth: 0.0,
//         pointSize: 1.5,
//         highlightCircleSize: 7,
//         colors: [colorPalette[index % colorPalette.length], 'green', 'red'],
//         width: 350,
//         height: 350,
//         gridLineColor: 'transparent',
//         dateWindow: range,
//         valueRange: range,
//         axes: {
//           x: {
//             axisLabelFormatter: (d) => isNaN(d) ? '' : d.toFixed(3),
//             valueFormatter: (x) => isNaN(x) ? '' : x.toFixed(3),
//             drawGrid: false,
//             pixelsPerLabel: 30,
//             axisLabelWidth: 50,
//             ticker: (min, max, pixels, opts, dygraph, vals) => {
//               const numberOfTicks = 7;
//               const range = max - min;
//               const step = range / (numberOfTicks - 1);
//               const ticks = [];
//               for (let i = 0; i < numberOfTicks; i++) {
//                 ticks.push({v: min + i * step, label: (min + i * step).toFixed(3)});
//               }
//               return ticks;
//             },
//           },
//           y: {
//             axisLabelFormatter: (d) => isNaN(d) ? '' : d.toFixed(2),
//             valueFormatter: (y) => isNaN(y) ? '' : y.toFixed(2),
//             drawGrid: false,
//             pixelsPerLabel: 30,
//             axisLabelWidth: 50,
//             labelsDiv: document.createElement('div'), 
//           },
//         },

        
//         underlayCallback: (canvas, area, g) => {
//           canvas.save();
//           canvas.setLineDash([5, 5]);
//           canvas.strokeStyle = 'rgba(128, 128, 128, 0.5)';
//           canvas.lineWidth = 1;

//           const centerX = g.toDomXCoord(0);
//           canvas.beginPath();
//           canvas.moveTo(centerX, area.y);
//           canvas.lineTo(centerX, area.y + area.h);
//           canvas.stroke();

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
//           const canvas = g.hidden_;
//           const ctx = canvas.getContext('2d');
//           const centerX = g.toDomXCoord(0);
//           const centerY = g.toDomYCoord(0);

          
          
//           if (showCenterPoint) {
//             ctx.beginPath();
//             ctx.arc(centerX, centerY, 5, 0, 2 * Math.PI);
//             ctx.fillStyle = 'red';
//             ctx.fill();
//           }
          
            
//          // Always draw the angle line, regardless of data presence
//         //  if (showAngle) {
//         //   ctx.beginPath();
//         //   ctx.moveTo(centerX, centerY);
//         //   const angle = angleLines[index].angle * (Math.PI / 180);
//         //   const lineLength = angleLines[index].length;
//         //   const endX = centerX + lineLength * Math.cos(angle);
//         //   const endY = centerY - lineLength * Math.sin(angle);
//         //   ctx.lineTo(endX, endY);
//         //   ctx.strokeStyle = 'red';
//         //   ctx.lineWidth = 2;
//         //   ctx.stroke();

//         //   const endDataX = g.toDataXCoord(endX);
//         //   const endDataY = g.toDataYCoord(endY);
//         //   setAngleEndpoints(prev => {
//         //     const newEndpoints = [...prev];
//         //     newEndpoints[index] = { x: endDataX, y: endDataY };
//         //     return newEndpoints;
//         //   });
//         // }
      
       
//   if (showAngle) {
//     ctx.beginPath();
//     ctx.moveTo(centerX, centerY);
//     const angle = angleLines[index].angle * (Math.PI / 180);
//     const lineLength = angleLines[index].length;
//     const endX = centerX + lineLength * Math.cos(angle);
//     const endY = centerY - lineLength * Math.sin(angle);
//     ctx.lineTo(endX, endY);
//     ctx.strokeStyle = 'red';
//     ctx.lineWidth = 2;
//     ctx.stroke();

//     const endDataX = g.toDataXCoord(endX);
//     const endDataY = g.toDataYCoord(endY);
    
//     // Calculate relative coordinates
//     const relativeX = endDataX - g.toDataXCoord(centerX);
//     const relativeY = -(endDataY - g.toDataYCoord(centerY)); // Invert Y because graph Y is inverted
    
//     // Use these relative coordinates to calculate the angle
//     const calculatedAngle = calculateAngleFromEndpoint(relativeX, relativeY);
//     const calculatedLength = Math.sqrt(relativeX * relativeX + relativeY * relativeY);
    
//     setAngleEndpoints(prev => {
//       const newEndpoints = [...prev];
//       newEndpoints[index] = { 
//         x: endDataX, 
//         y: endDataY, 
//         angle: calculatedAngle,
//         length: calculatedLength
//       };
//       return newEndpoints;
//     });
//   }

//           if (showValue) {
//             ctx.beginPath();
//             ctx.moveTo(centerX, centerY);
//             const angle = lineAngles[index] * (Math.PI / 180);
//             const lineLength = lineLengths[index];
//             const endDomX = centerX + lineLength * Math.cos(angle);
//             const endDomY = centerY - lineLength * Math.sin(angle);
//             ctx.lineTo(endDomX, endDomY);
//             ctx.strokeStyle = 'black';
//             ctx.lineWidth = 2;
//             ctx.stroke();
        
//             // Convert end point to data coordinates
//             const endDataX = g.toDataXCoord(endDomX);
//             const endDataY = g.toDataYCoord(endDomY);
        
//             setLineEndpoints(prev => {
//               const newEndpoints = [...prev];
//               newEndpoints[index] = { x: endDataX, y: endDataY };
//               return newEndpoints;
//             });
        
//             const calculatedHyp = Math.sqrt(Math.pow(endDataX, 2) + Math.pow(endDataY, 2));
//             setCalculatedHypotenuse(prev => {
//               const newHypotenuse = [...prev];
//               newHypotenuse[index] = calculatedHyp;
//               return newHypotenuse;
//             });
//           }
//         }
//       };

    
//       const dygraphData = plotData.map(point => [point[0], point[1], null, null]);
//       if (calculateDistances && data) {
//         dygraphData.push([centerX, centerY, distanceToCoG, null]);
//       }

//       if (existingDygraph) {
//         existingDygraph.updateOptions({
//           file: dygraphData,
//           ...graphOptions
//         });
//       } else {
//         const dygraph = new Dygraph(graphContainer, dygraphData, graphOptions);

//         graphContainer.dygraph = dygraph;

        
//       // Add vertical y-axis label after graph initialization
//       const yLabelElement = document.createElement('div');
//       yLabelElement.style.position = 'absolute';
//       yLabelElement.style.left = '15px';
//       yLabelElement.style.top = '50%';
//       yLabelElement.style.transform = 'rotate(-90deg) translateX(-50%)';
//       yLabelElement.style.transformOrigin = 'center left';
//       yLabelElement.style.width = '100px';
//       yLabelElement.style.textAlign = 'center';
//       yLabelElement.style.fontWeight = 'bold';
//       yLabelElement.style.fontSize = '12px';
//       yLabelElement.textContent = 'Bending moment Y [Nm]';
//       graphContainer.appendChild(yLabelElement);

//       // Ensure graph container has relative positioning
//       graphContainer.style.position = 'relative';
        

//     // Add horizontal x-axis label after graph initialization
// const xLabelElement = document.createElement('div');
// xLabelElement.style.position = 'absolute';
// xLabelElement.style.left = '50%';
// xLabelElement.style.bottom = '-25px'; // Increased distance from bottom
// xLabelElement.style.transform = 'translateX(-50%)';
// xLabelElement.style.width = '100%';
// xLabelElement.style.textAlign = 'center';
// xLabelElement.style.fontWeight = 'bold';
// xLabelElement.style.fontSize = '12px';
// xLabelElement.textContent = 'Bending moment X [Nm]';
// graphContainer.appendChild(xLabelElement);

// // Adjust graph container to accommodate the new label
// graphContainer.style.position = 'relative';
// graphContainer.style.marginBottom = '30px'; // Add margin to create space for the label

//         graphContainer.addEventListener('wheel', (e) => {
//           e.preventDefault();
//           const zoomAmount = e.deltaY < 0 ? zoomFactor : 1 / zoomFactor;
          
//           const xRange = dygraph.xAxisRange();
//           const yRange = dygraph.yAxisRange();
//           const xCenter = (xRange[0] + xRange[1]) / 2;
//           const yCenter = (yRange[0] + yRange[1]) / 2;
          
//           const newXRange = [
//             xCenter - (xCenter - xRange[0]) / zoomAmount,
//             xCenter + (xRange[1] - xCenter) / zoomAmount
//           ];
//           const newYRange = [
//             yCenter - (yCenter - yRange[0]) / zoomAmount,
//             yCenter + (yRange[1] - yCenter) / zoomAmount
//           ];

//           dygraph.updateOptions({
//             dateWindow: newXRange,
//         valueRange: newYRange
//           });
//         });
//       }

//       if (data) {
//         setCenterOfGravity(prev => {
//           const newCenterOfGravity = [...prev];
//           newCenterOfGravity[index] = { x: centerX, y: centerY };
//           return newCenterOfGravity;
//         });
//       }
//     }
//   };

//   useEffect(() => {
//     graphData.forEach((data, index) => {
//       createOrUpdateGraph(index);
//     });
//   }, [graphData, calculateDistances, showCenterPoint, showAngle, angleLines, showValue, lineAngles, lineLengths, overallRange]);


//   useEffect(() => {
//     const updateGraphs = () => {
//       const newGraphData = Array(6).fill(null);
//       const newDataStatus = Array(6).fill('');

//       selectedFiles.forEach((file, index) => {
//         if (file) {
//           const existingDataIndex = graphData.findIndex(data => data && data.fileName === file.name);
//           if (existingDataIndex !== -1) {
//             newGraphData[index] = graphData[existingDataIndex];
//             newDataStatus[index] = dataStatus[existingDataIndex];
//           } else {
//             handleFileSelection(file, index);
//           }
//         }
//       });

//       setGraphData(newGraphData);
//       setDataStatus(newDataStatus);
//     };

//     updateGraphs();
//   }, [selectedFiles]);

//   const handleFileToggle = async (file) => {
//     if (isLoading) return;

//     setSelectedFiles(prev => {
//       const isSelected = prev.includes(file);
//       if (isSelected) {
//         return prev.filter(f => f !== file);
//       } else {
//         const availableIndex = prev.findIndex(f => f === null);
//         if (availableIndex !== -1) {
//           const newSelectedFiles = [...prev];
//           newSelectedFiles[availableIndex] = file;
//           handleFileSelection(file, availableIndex);
//           return newSelectedFiles;
//         } else if (prev.length < 6) {
//           handleFileSelection(file, prev.length);
//           return [...prev, file];
//         }
//       }
//       return prev;
//     });
//   };

 
//   const handleAngleChange = (index, property, value) => {
//     setAngleLines(prev => {
//       const newAngleLines = [...prev];
//       newAngleLines[index] = { ...newAngleLines[index], [property]: value };
//       return newAngleLines;
//     });
  
//     // Calculate the new endpoint based on the angle and length
//     const angle = angleLines[index].angle * (Math.PI / 180);
//     const length = angleLines[index].length;
//     const x = Math.cos(angle) * length;
//     const y = Math.sin(angle) * length;
  
//     // Calculate the angle using arctangent
//     const calculatedAngle = calculateAngleFromEndpoint(x, y);
    
//     setAngleEndpoints(prev => {
//       const newEndpoints = [...prev];
//       newEndpoints[index] = {
//         x: x,
//         y: y,
//         angle: calculatedAngle,
//         length: length
//       };
//       return newEndpoints;
//     });
//   };
//   const handleLineAngleChange = (index, value) => {
//     setLineAngles(prev => {
//       const newLineAngles = [...prev];
//       newLineAngles[index] = value;
//       return newLineAngles;
//     });
//   };

//   const handleLineLengthChange = (index, value) => {
//     setLineLengths(prev => {
//       const newLineLengths = [...prev];
//       newLineLengths[index] = value;
//       return newLineLengths;
//     });
//   };


//   const generateReport = async () => {
//     console.log("Starting report generation");
//     setIsGeneratingReport(true);
  
//     try {
//       const pdf = new jsPDF('l', 'mm', 'a4');
//       const pageWidth = pdf.internal.pageSize.width;
//       const pageHeight = pdf.internal.pageSize.height;
//       const margin = 10;
//       const graphWidth = (pageWidth - 4 * margin) / 3;
//       const graphHeight = (pageHeight - 3 * margin) / 2;
  
//       let currentPage = 1; // Track the current page
//       let row = 0;
//       let col = 0;
  
//       for (let i = 0; i < selectedFiles.length; i++) {
//         const graphContainer = graphContainerRef.current[i];
  
//         if (!graphContainer) {
//           console.log(`Graph container ${i + 1} not found`);
//           continue;
//         }
  
//         console.log(`Capturing graph ${i + 1}`);
//         const canvas = await html2canvas(graphContainer);
//         const imgData = canvas.toDataURL('image/png');
  
//         // Handle page breaks for every 3 graphs
//         if (i % 3 === 0 && i !== 0) { // Check if it's the first graph on a new page
//           pdf.addPage();
//           currentPage++;
//           row = 0;
//           col = 0;
//         }
  
//         const xPosition = margin + col * (graphWidth + margin);
//         const yPosition = margin + row * (graphHeight + margin);
  
//         pdf.addImage(imgData, 'PNG', xPosition, yPosition, graphWidth, graphHeight - 25);
  
//         if (graphData[i]) {
//           pdf.setFontSize(9);
//           pdf.text(`Graph ${i + 1}: ${graphData[i].fileName}`, xPosition, yPosition - 2);
  
//           pdf.setFontSize(7);
//           let valueY = yPosition + graphHeight - 23;
//           pdf.text(`CoG: ${distances[i].toFixed(2)}`, xPosition, valueY);
//           pdf.text(`Status: ${dataStatus[i] || 'N/A'}`, xPosition, valueY + 4);
//           pdf.text(`Filter: 1`, xPosition, valueY + 8);
  
//           if (showAngle) {
//             pdf.text(`Angle: ${angles[i].toFixed(2)}°`, xPosition + 40, valueY);
//           }
  
//           if (showValue) {
//             pdf.text(`Line Angle: ${lineAngles[i].toFixed(2)}°`, xPosition + 40, valueY + 4);
//             pdf.text(`Line Length: ${lineLengths[i].toFixed(2)}`, xPosition + 40, valueY + 8);
//             pdf.text(`Endpoint: (${lineEndpoints[i].x.toFixed(2)}, ${lineEndpoints[i].y.toFixed(2)})`, xPosition, valueY + 12);
//             pdf.text(`Calculated Value: ${calculatedHypotenuse[i].toFixed(2)}`, xPosition, valueY + 16);
//           }
  
//           const file = selectedFiles[i];
//           if (file) {
//             const reader = new FileReader();
//             reader.onload = (e) => {
//               const fileContent = e.target.result;
//               const lines = fileContent.split('\n');
//               const additionalInfo = {};
  
//               lines.forEach(line => {
//                 if (line.startsWith('#')) {
//                   line = line.substring(1).trim();
//                   if (line.includes(':')) {
//                     const [key, ...values] = line.split(':').map(s => s.trim());
//                     additionalInfo[key] = values.join(':').trim();
//                   } else if (line.includes('=')) {
//                     const parts = line.split(/\s+/).filter(part => part !== '=');
//                     for (let i = 0; i < parts.length; i += 2) {
//                       if (parts[i] && parts[i + 1]) {
//                         additionalInfo[parts[i]] = parts[i + 1];
//                       }
//                     }
//                   }
//                 }
//               });
  
//               // Special handling for vc and n
//               if (additionalInfo['vc'] === '' && additionalInfo['n']) {
//                 additionalInfo['vc'] = '';
//                 additionalInfo['n'] = additionalInfo['n'];
//               }
  
//               valueY += 20;
//               pdf.setFontSize(6);
//               pdf.text("File Information:", xPosition, valueY);
//               valueY += 4;
  
//               const infoToDisplay = [
//                 ['date', 'operator'], ['process'], ['tool'], ['material'], ['tool gage'],
//                 ['d', 'z'], ['ap', 'ae'], ['vc', 'n'], ['f', 'vf'], ['X'], ['cooling'], ['unit type'], ['note']
//               ];
  
//               infoToDisplay.forEach((keys, index) => {
//                 const displayStrings = keys.map(key => {
//                   const value = additionalInfo[key];
//                   return value !== undefined ? `${key}: ${value}` : '';
//                 }).filter(s => s);
//                 if (displayStrings.length > 0) {
//                   pdf.text(displayStrings.join('    '), xPosition, valueY + index * 4);
//                 }
//               });
  
//               // If this is the last graph on the current page, save the PDF
//               if (i === selectedFiles.length - 1 || (i % 3 === 2 && i !== selectedFiles.length - 1)) {
//                 pdf.save('polar_plot_report.pdf');
//                 setIsGeneratingReport(false);
//               }
//             };
//             reader.readAsText(file);
//           } else {
//             // If there's no file for this graph, move on to the next one
//             if (i === selectedFiles.length - 1 || (i % 3 === 2 && i !== selectedFiles.length - 1)) {
//               pdf.save('polar_plot_report.pdf');
//               setIsGeneratingReport(false);
//             }
//           }
  
//           // Increment row and col for the next graph
//           col++;
//           if (col >= 3) {
//             col = 0;
//             row++;
//           }
//         }
//       }
//     } catch (error) {
//       console.error("Error generating report:", error);
//       setIsGeneratingReport(false);
//     }
//   };
//   useEffect(() => {
//     Array.from({ length: 6 }).forEach((_, index) => {
//       createOrUpdateGraph(index);
//     });
//   }, []);
  
  
//   return (
//     <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center ${isVisible ? '' : 'hidden'}`}>
//       <div className="bg-[#f1f1f1] p-2 rounded-md relative" style={{ width: '98%', height: '98%', maxWidth: '1800px', maxHeight: '900px' }} onClick={(e) => e.stopPropagation()}>
//         <div className="flex h-full">
//           <div className="flex-grow overflow-auto">
//             <div className="grid grid-cols-3 gap-2 p-2">
//               {Array.from({ length: 6 }).map((_, index) => (
//                 <div key={index} className="border-2 border-gray-300 p-2 rounded-md">
//                   <h2 className="text-lg font-bold">Graph {index + 1}</h2>
//                   <div ref={(el) => graphContainerRef.current[index] = el} style={{ width: '100%', height: '300px' }}></div>
//                   <div className="mt-1 space-y-1 text-sm">
//                     <div className="flex justify-between items-center">
//                       <div>
//                         <span className="font-bold">CoG:</span>
//                         <input
//                           type="text"
//                           value={calculateDistances ? distances[index].toFixed(2) : 'N/A'}
//                           readOnly
//                           className="ml-1 p-1 border border-gray-300 rounded-md w-16 text-xs"
//                         />
//                       </div>
//                       <div>
//                         <span className="font-bold mr-1">Status:</span>
//                         <input
//                           type="text"
//                           value={dataStatus[index] || ''}
//                           readOnly
//                           className="p-1 border border-300 rounded-md w-16 text-xs"
//                         />
//                       </div>
//                       <div>
//                         <span className="font-bold mr-1">Filter:</span>
//                         <input
//                           type="text"
//                           value="1"
//                           readOnly
//                           className="p-1 border border-gray-300 rounded-md w-8 text-center text-xs"
//                         />
//                       </div>
//                     </div>
//                      {showAngle && (
//             <div className="flex items-center space-x-1 overflow-x-auto text-xs">
//               <div className="flex items-center shrink-0">
//                 <span className="font-bold mr-1">Angle:</span>
//                 <input
//                   type="range"
//                   min="0"
//                   max="360"
//                   value={angleLines[index].angle}
//                   onChange={(e) => handleAngleChange(index, 'angle', parseInt(e.target.value))}
//                   className="w-20"
//                 />
//               </div>
//               <div className="flex items-center shrink-0">
//                 <span className="font-bold mr-1">Length:</span>
//                 <input
//                   type="range"
//                   min="0"
//                   max="300"
//                   value={angleLines[index].length}
//                   onChange={(e) => handleAngleChange(index, 'length', parseInt(e.target.value))}
//                   className="w-20"
//                 />
//               </div>
//               <div className="shrink-0">
//                 <span className="font-bold mr-1">Endpoint:</span>
//                 <input
//                   type="text"
//                   value={`X: ${angleEndpoints[index].x.toFixed(2)}, Y: ${angleEndpoints[index].y.toFixed(2)}`}
//                   readOnly
//                   className="p-1 border border-gray-300 rounded-md w-36 text-center text-xs"
//                 />
//               </div>
//               <div className="shrink-0">
//                 <span className="font-bold mr-1">Calculated Angle:</span>
//                 <input
//                   type="text"
//                   value={`${angleEndpoints[index].angle.toFixed(2)}°`}
//                   readOnly
//                   className="p-1 border border-gray-300 rounded-md w-16 text-center text-xs"
//                 />
//               </div>
//               <div className="shrink-0">
//                 <span className="font-bold mr-1">Calculated Length:</span>
//                 <input
//                   type="text"
//                   value={angleEndpoints[index].length.toFixed(2)}
//                   readOnly
//                   className="p-1 border border-gray-300 rounded-md w-16 text-center text-xs"
//                 />
//               </div>
//             </div>
//           )}
//                     {showValue && (
//                       <div className="flex items-center space-x-1 overflow-x-auto text-xs">
//                         <div className="flex items-center shrink-0">
//                           <span className="font-bold mr-1">Line Angle:</span>
//                           <input
//                             type="range"
//                             min="0"
//                             max="360"
//                             value={lineAngles[index]}
//                             onChange={(e) => handleLineAngleChange(index, parseInt(e.target.value))}
//                             className="w-20"
//                           />
//                         </div>
//                         <div className="flex items-center shrink-0">
//                           <span className="font-bold mr-1">Line Drag:</span>
//                           <input
//                             type="range"
//                             min="0"
//                             max="300"
//                             value={lineLengths[index]}
//                             onChange={(e) => handleLineLengthChange(index, parseInt(e.target.value))}
//                             className="w-20"
//                           />
//                         </div>
//                         <div className="shrink-0">
//                           <span className="font-bold mr-1">Endpoint:</span>
//                           <input
//                             type="text"
//                             value={`X: ${lineEndpoints[index].x.toFixed(2)}, Y: ${lineEndpoints[index].y.toFixed(2)}`}
//                             readOnly
//                             className="p-1 border border-gray-300 rounded-md w-36 text-center text-xs"
//                           />
//                         </div>
//                         <div className="shrink-0">
//                           <span className="font-bold mr-1">Calculate value:</span>
//                           <input
//                             type="text"
//                             value={calculatedHypotenuse[index].toFixed(2)}
//                             readOnly
//                             className="p-1 border border-gray-300 rounded-md w-16 text-center text-xs"
//                           />
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
          
//           <div className="w-64 flex flex-col p-2 border-l-2 border-gray-300">
//             <div className="mb-4">
//               <input
//                 type="file"
//                 webkitdirectory="true"
//                 multiple
//                 onChange={handleFolderUpload}
//                 className="mb-2 text-sm"
//                 disabled={isLoading}
//               />
//               <div className="h-40 overflow-y-auto border border-gray-400 rounded-md p-1 text-xs">
//                 {files.map((file, index) => (
//                   <div key={index} className="flex items-center mb-1">
//                     <input
//                       type="checkbox"
//                       checked={selectedFiles.includes(file)}
//                       onChange={() => handleFileToggle(file)}
//                       className="mr-1"
//                       disabled={isLoading}
//                     />
//                     <span>{file.name}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>
            
//         <div className="space-y-2 mt-auto">
//           <button
//             onClick={handleCalculateDistances}
//             disabled={isProcessing.distance}
//             className="p-1 text-xs text-white bg-blue-600 rounded-md w-full"
//           >
//             {isProcessing.distance ? 'Processing...' : (calculateDistances ? 'Hide Distance' : 'Show Distance')}
//           </button>
//           <button
//             onClick={handleShowCenterPoint}
//             disabled={isProcessing.centerPoint}
//             className="p-1 text-xs text-white bg-green-600 rounded-md w-full"
//           >
//             {isProcessing.centerPoint ? 'Processing...' : (showCenterPoint ? 'Hide Center Point' : 'Show Center Point')}
//           </button>
//           <button
//             onClick={handleShowAngle}
//             disabled={isProcessing.angle}
//             className="p-1 text-xs text-white bg-purple-600 rounded-md w-full"
//           >
//             {isProcessing.angle ? 'Processing...' : (showAngle ? 'Hide Angle' : 'Show Angle')}
//           </button>
//           <button
//             onClick={handleShowValue}
//             disabled={isProcessing.value}
//             className="p-1 text-xs text-white bg-yellow-600 rounded-md w-full"
//           >
//             {isProcessing.value ? 'Processing...' : (showValue ? 'Hide Value' : 'Show Value')}
//           </button>
//               <button
//                 onClick={generateReport}
//                 disabled={isGeneratingReport}
//                 className="p-1 text-xs text-white bg-red-600 rounded-md w-full"
//               >
//                 {isGeneratingReport ? 'Generating...' : 'Generate Report'}
//               </button>
//               <button onClick={onClose} className="p-1 text-xs text-white bg-gray-800 rounded-md w-full">
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
  
//       {toastMessage && (
//         <Toast
//           message={toastMessage}
//           onClose={() => setToastMessage('')}
//         />
//       )}
//     </div>
//   );
// };

// export default PolarPlot;


import React, { useEffect, useRef, useState } from 'react';
import Dygraph from 'dygraphs';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
// import { rotateDegrees } from 'pdf-lib';

const Toast = ({ message, onClose }) => (
  <div className="fixed top-4 right-4 bg-gray-800 text-white px-4 py-2 rounded-md shadow-lg ">
    {message}
    <button onClick={onClose} className="ml-2 text-sm">&times;</button>
  </div>
);

const PolarPlot = ({ isVisible, onClose }) => {
  const [files, setFiles] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const graphContainerRef = useRef([]);
  const [distances, setDistances] = useState(Array(6).fill(0));
  const [calculateDistances, setCalculateDistances] = useState(false);
  const [graphData, setGraphData] = useState(Array(6).fill(null));
  const [dataStatus, setDataStatus] = useState(Array(6).fill(''));
  const [showCenterPoint, setShowCenterPoint] = useState(false);
  const [centerOfGravity, setCenterOfGravity] = useState(Array(6).fill({ x: 0, y: 0 }));
  const [showAngle, setShowAngle] = useState(false);
  const [angles, setAngles] = useState(Array(6).fill(0));
  const [showValue, setShowValue] = useState(false);
  const [lineAngles, setLineAngles] = useState(Array(6).fill(0));
  const [lineLengths, setLineLengths] = useState(Array(6).fill(100));
  const [lineEndpoints, setLineEndpoints] = useState(Array(6).fill({ x: 0, y: 0 }));
  const [calculatedHypotenuse, setCalculatedHypotenuse] = useState(Array(6).fill(0));
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const [overallRange, setOverallRange] = useState([-1, 1]);
  const [isLoading, setIsLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const [angleLines, setAngleLines] = useState(Array(6).fill({ angle: 0, length: 100 }));
  const [angleEndpoints, setAngleEndpoints] = useState(Array(6).fill({ x: 0, y: 0, angle: 0, length: 0 }));
  const [isProcessing, setIsProcessing] = useState({
    distance: false,
    centerPoint: false,
    angle: false,
    value: false,
  });

  const calculateAngleFromEndpoint = (x, y) => {
    let angleRad = Math.atan2(y, x);
    let angleDeg = (angleRad * 180 / Math.PI);
    angleDeg = (360 - angleDeg) % 360;
    return angleDeg;
  };


  
// const calculateAngleFromEndpoint = (x, y) => {
//     let angleRad = Math.atan2(-y, x); // Note the negation of y
//     let angleDeg = (angleRad * 180 / Math.PI);
//     return (angleDeg + 360) % 360; // Normalize to 0-360 range
//   };
  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(''), 3000); // Toast disappears after 3 seconds
  };

  const handleCalculateDistances = () => {
    setIsProcessing(prev => ({ ...prev, distance: true }));
    showToast('Please wait, calculating distance CGO...');
    setTimeout(() => {
      setCalculateDistances(prev => !prev);
      setIsProcessing(prev => ({ ...prev, distance: false }));
      showToast('Distances CGO calculated and displayed');
    }, 1000); // Simulating a delay for the calculation
  };

  const handleShowCenterPoint = () => {
    setIsProcessing(prev => ({ ...prev, centerPoint: true }));
    showToast('Please wait, showing zero point...');
    setTimeout(() => {
      setShowCenterPoint(prev => !prev);
      setIsProcessing(prev => ({ ...prev, centerPoint: false }));
      showToast('zero point displayed');
    }, 1000);
  };

  const handleShowAngle = () => {
    setIsProcessing(prev => ({ ...prev, angle: true }));
    showToast('Please wait, preparing angle display...');
    setTimeout(() => {
      setShowAngle(prev => !prev);
      setIsProcessing(prev => ({ ...prev, angle: false }));
      showToast('Angle display ready');
    }, 1000);
  };

  const handleShowValue = () => {
    setIsProcessing(prev => ({ ...prev, value: true }));
    showToast('Please wait, calculating values...');
    setTimeout(() => {
      setShowValue(prev => !prev);
      setIsProcessing(prev => ({ ...prev, value: false }));
      showToast('Values calculated and displayed');
    }, 1000);
  };
  const colorPalette = ['#800080', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF'];
  const zoomFactor = 1.2;

  const placeholderData = Array(6).fill().map(() => [
    [0, 0], [1, 1], [-1, -1], [1, -1], [-1, 1]
  ]);

  const handleFolderUpload = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
  };

  const handleFileSelection = async (file, index) => {
    setIsLoading(true);
    setToastMessage('Please wait, data is being loaded...');
    
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const fileData = e.target.result;
        processFileData(fileData, file.name, index);
        setIsLoading(false);
        setToastMessage('');
        resolve();
      };
      reader.onerror = (error) => {
        setIsLoading(false);
        setToastMessage('Error loading file. Please try again.');
        reject(error);
      };
      reader.readAsText(file);
    });
  };

  const processFileData = (fileData, fileName, index) => {
    const rows = fileData.split('\n');
    let data = [];
    let minX = Infinity;
    let maxX = -Infinity;
    let minY = Infinity;
    let maxY = -Infinity;

    for (let i = 0; i < rows.length; i++) {
      const line = rows[i].trim();
      if (line.startsWith('Tension;Torsion;Bending moment X;Bending moment Y;Time;Temperature')) {
        for (let j = i + 1; j < rows.length; j++) {
          const rowData = rows[j].split(';').map(item => parseFloat(item.replace(',', '.')));
          if (rowData.length === 6) {
            const xValue = rowData[2]; // Bending moment X
            const yValue = rowData[3]; // Bending moment Y
            if (!isNaN(xValue) && !isNaN(yValue)) {
              data.push([xValue, yValue]);
              minX = Math.min(minX, xValue);
              maxX = Math.max(maxX, xValue);
              minY = Math.min(minY, yValue);
              maxY = Math.max(maxY, yValue);
            }
          }
        }
        break;
      }
    }

    if (data.length > 0) {
      setGraphData(prevData => {
        const newData = [...prevData];
        newData[index] = { data, fileName, minX, maxX, minY, maxY };
        return newData;
      });
      setDataStatus(prevStatus => {
        const newStatus = [...prevStatus];
        newStatus[index] = 'ALL';
        return newStatus;
      });

      setOverallRange(prevRange => {
        const newMinX = Math.min(prevRange[0], minX);
        const newMaxX = Math.max(prevRange[1], maxX);
        const newMinY = Math.min(prevRange[0], minY);
        const newMaxY = Math.max(prevRange[1], maxY);
        const newMin = Math.min(newMinX, newMinY);
        const newMax = Math.max(newMaxX, newMaxY);
        return [newMin, newMax];
      });
    }
  };

  const createOrUpdateGraph = (index) => {
    const graphContainer = graphContainerRef.current[index];
    const data = graphData[index];
 
  
    if (graphContainer) {
      const existingDygraph = graphContainer.dygraph;
      const plotData = data ? data.data : placeholderData[index];
      const fileName = data ? data.fileName : `Placeholder ${index + 1}`;
    
      
      const range = overallRange;

      let centerX = 0;
      let centerY = 0;
      if (data) {
        centerX = plotData.reduce((sum, point) => sum + point[0], 0) / plotData.length;
        centerY = plotData.reduce((sum, point) => sum + point[1], 0) / plotData.length;
      }

      const distanceToCoG = Math.sqrt(Math.pow(centerX, 2) + Math.pow(centerY, 2));

      setDistances(prev => {
        const updatedDistances = [...prev];
        updatedDistances[index] = distanceToCoG;
        return updatedDistances;
      });
      

      const graphOptions = {
        labels: ['Bending moment X[Nm]', 'Bending moment Y[Nm]', 'Distance', 'Center Point'],
        series: {
          'Bending moment Y': {
            strokeWidth: 0.0,
            drawPoints: true,
            pointSize: 1.5,
            highlightCircleSize: 7,
           
          },
          'Distance': {
            strokeWidth: 0,
            drawPoints: true,
            color: 'green',
            pointSize: 5,
          },
          'Center Point': {
            strokeWidth: 0,
            drawPoints: true,
            pointSize: 5,
            color: 'red',
          },
        },
        // title: `${fileName}`,
        title: fileName,
        titleHeight: 22,
        titleLineHeight: 15,
        titleFontSize: 10,
        showLabelsOnHighlight: false,
        // xlabel: 'Bending moment X',
        // ylabel: 'Bending moment Y',
        
        ylabelWidth: 100,
        drawPoints: true,
        strokeWidth: 0.0,
        pointSize: 1.5,
        highlightCircleSize: 7,
        colors: [colorPalette[index % colorPalette.length], 'green', 'red'],
        width: 350,
        height: 350,
        gridLineColor: 'transparent',
        dateWindow: range,
        valueRange: range,
        axes: {
          x: {
            axisLabelFormatter: (d) => isNaN(d) ? '' : d.toFixed(3),
            valueFormatter: (x) => isNaN(x) ? '' : x.toFixed(3),
            drawGrid: false,
            pixelsPerLabel: 30,
            axisLabelWidth: 50,
            ticker: (min, max, pixels, opts, dygraph, vals) => {
              const numberOfTicks = 7;
              const range = max - min;
              const step = range / (numberOfTicks - 1);
              const ticks = [];
              for (let i = 0; i < numberOfTicks; i++) {
                ticks.push({v: min + i * step, label: (min + i * step).toFixed(3)});
              }
              return ticks;
            },
          },
          y: {
            axisLabelFormatter: (d) => isNaN(d) ? '' : d.toFixed(2),
            valueFormatter: (y) => isNaN(y) ? '' : y.toFixed(2),
            drawGrid: false,
            pixelsPerLabel: 30,
            axisLabelWidth: 50,
            labelsDiv: document.createElement('div'), 
          },
        },

        
        underlayCallback: (canvas, area, g) => {
          canvas.save();
          canvas.setLineDash([5, 5]);
          canvas.strokeStyle = 'rgba(128, 128, 128, 0.5)';
          canvas.lineWidth = 1;

          const centerX = g.toDomXCoord(0);
          canvas.beginPath();
          canvas.moveTo(centerX, area.y);
          canvas.lineTo(centerX, area.y + area.h);
          canvas.stroke();

          const centerY = g.toDomYCoord(0);
          canvas.beginPath();
          canvas.moveTo(area.x, centerY);
          canvas.lineTo(area.x + area.w, centerY);
          canvas.stroke();

          canvas.restore();
        },
        
        highlightCallback: (event, x, points) => {
          const existingTooltip = document.querySelector('.tooltip');
          if (existingTooltip) {
            existingTooltip.remove();
          }

          if (points.length > 0) {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip fixed bg-white border border-gray-300 p-2 rounded shadow-md text-sm';
            tooltip.style.position = 'absolute';
            tooltip.style.left = `${event.pageX + 10}px`;
            tooltip.style.top = `${event.pageY + 10}px`;
            tooltip.innerHTML = `X: ${points[0].xval.toFixed(3)}, Y: ${points[0].yval.toFixed(3)}`;
            document.body.appendChild(tooltip);

            const removeTooltip = () => {
              if (document.body.contains(tooltip)) {
                document.body.removeChild(tooltip);
              }
              graphContainer.removeEventListener('mouseout', removeTooltip);
            };

            graphContainer.addEventListener('mouseout', removeTooltip);
          }
        },
        drawCallback: (g) => {
          const canvas = g.hidden_;
          const ctx = canvas.getContext('2d');
          const centerX = g.toDomXCoord(0);
          const centerY = g.toDomYCoord(0);

          
          
          if (showCenterPoint) {
            ctx.beginPath();
            ctx.arc(centerX, centerY, 5, 0, 2 * Math.PI);
            ctx.fillStyle = 'red';
            ctx.fill();
          }
          
            
         // Always draw the angle line, regardless of data presence
        //  if (showAngle) {
        //   ctx.beginPath();
        //   ctx.moveTo(centerX, centerY);
        //   const angle = angleLines[index].angle * (Math.PI / 180);
        //   const lineLength = angleLines[index].length;
        //   const endX = centerX + lineLength * Math.cos(angle);
        //   const endY = centerY - lineLength * Math.sin(angle);
        //   ctx.lineTo(endX, endY);
        //   ctx.strokeStyle = 'red';
        //   ctx.lineWidth = 2;
        //   ctx.stroke();

        //   const endDataX = g.toDataXCoord(endX);
        //   const endDataY = g.toDataYCoord(endY);
        //   setAngleEndpoints(prev => {
        //     const newEndpoints = [...prev];
        //     newEndpoints[index] = { x: endDataX, y: endDataY };
        //     return newEndpoints;
        //   });
        // }
      
       
        
        if (showAngle) {
          ctx.beginPath();
          ctx.moveTo(centerX, centerY);
          const angle = angleLines[index].angle * (Math.PI / 180); // Convert to radians
          const lineLength = angleLines[index].length;
          const endX = centerX + lineLength * Math.cos(angle);
          const endY = centerY - lineLength * Math.sin(angle); // Subtract because canvas Y is inverted
          ctx.lineTo(endX, endY);
          ctx.strokeStyle = 'red';
          ctx.lineWidth = 2;
          ctx.stroke();
          const endDataX = g.toDataXCoord(endX) - g.toDataXCoord(centerX);
          const endDataY = g.toDataYCoord(centerY) - g.toDataYCoord(endY);
          
          const calculatedAngle = calculateAngleFromEndpoint(endDataX, endDataY);
          const calculatedLength = Math.sqrt(endDataX * endDataX + endDataY * endDataY);

          setAngleEndpoints(prev => {
            const newEndpoints = [...prev];
            newEndpoints[index] = { 
              x: g.toDataXCoord(endX), 
              y: g.toDataYCoord(endY), 
              angle: calculatedAngle,
              length: calculatedLength
            };
            return newEndpoints;
          });
        }


          if (showValue) {
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            const angle = lineAngles[index] * (Math.PI / 180);
            const lineLength = lineLengths[index];
            const endDomX = centerX + lineLength * Math.cos(angle);
            const endDomY = centerY - lineLength * Math.sin(angle);
            ctx.lineTo(endDomX, endDomY);
            ctx.strokeStyle = 'black';
            ctx.lineWidth = 2;
            ctx.stroke();
        
            // Convert end point to data coordinates
            const endDataX = g.toDataXCoord(endDomX);
            const endDataY = g.toDataYCoord(endDomY);
        
            setLineEndpoints(prev => {
              const newEndpoints = [...prev];
              newEndpoints[index] = { x: endDataX, y: endDataY };
              return newEndpoints;
            });
        
            const calculatedHyp = Math.sqrt(Math.pow(endDataX, 2) + Math.pow(endDataY, 2));
            setCalculatedHypotenuse(prev => {
              const newHypotenuse = [...prev];
              newHypotenuse[index] = calculatedHyp;
              return newHypotenuse;
            });
          }
        }
      };

    
      const dygraphData = plotData.map(point => [point[0], point[1], null, null]);
      if (calculateDistances && data) {
        dygraphData.push([centerX, centerY, distanceToCoG, null]);
      }

      if (existingDygraph) {
        existingDygraph.updateOptions({
          file: dygraphData,
          ...graphOptions
        });
      } else {
        const dygraph = new Dygraph(graphContainer, dygraphData, graphOptions);

        graphContainer.dygraph = dygraph;

        
      // Add vertical y-axis label after graph initialization
      const yLabelElement = document.createElement('div');
      yLabelElement.style.position = 'absolute';
      yLabelElement.style.left = '15px';
      yLabelElement.style.top = '50%';
      yLabelElement.style.transform = 'rotate(-90deg) translateX(-50%)';
      yLabelElement.style.transformOrigin = 'center left';
      yLabelElement.style.width = '100px';
      yLabelElement.style.textAlign = 'center';
      yLabelElement.style.fontWeight = 'bold';
      yLabelElement.style.fontSize = '12px';
      yLabelElement.textContent = 'Bending moment Y [Nm]';
      graphContainer.appendChild(yLabelElement);

      // Ensure graph container has relative positioning
      graphContainer.style.position = 'relative';
        

    // Add horizontal x-axis label after graph initialization
const xLabelElement = document.createElement('div');
xLabelElement.style.position = 'absolute';
xLabelElement.style.left = '50%';
xLabelElement.style.bottom = '-25px'; // Increased distance from bottom
xLabelElement.style.transform = 'translateX(-50%)';
xLabelElement.style.width = '100%';
xLabelElement.style.textAlign = 'center';
xLabelElement.style.fontWeight = 'bold';
xLabelElement.style.fontSize = '12px';
xLabelElement.textContent = 'Bending moment X [Nm]';
graphContainer.appendChild(xLabelElement);

// Adjust graph container to accommodate the new label
graphContainer.style.position = 'relative';
graphContainer.style.marginBottom = '30px'; // Add margin to create space for the label

        graphContainer.addEventListener('wheel', (e) => {
          e.preventDefault();
          const zoomAmount = e.deltaY < 0 ? zoomFactor : 1 / zoomFactor;
          
          const xRange = dygraph.xAxisRange();
          const yRange = dygraph.yAxisRange();
          const xCenter = (xRange[0] + xRange[1]) / 2;
          const yCenter = (yRange[0] + yRange[1]) / 2;
          
          const newXRange = [
            xCenter - (xCenter - xRange[0]) / zoomAmount,
            xCenter + (xRange[1] - xCenter) / zoomAmount
          ];
          const newYRange = [
            yCenter - (yCenter - yRange[0]) / zoomAmount,
            yCenter + (yRange[1] - yCenter) / zoomAmount
          ];

          dygraph.updateOptions({
            dateWindow: newXRange,
        valueRange: newYRange
          });
        });
      }

      if (data) {
        setCenterOfGravity(prev => {
          const newCenterOfGravity = [...prev];
          newCenterOfGravity[index] = { x: centerX, y: centerY };
          return newCenterOfGravity;
        });
      }
    }
  };

  useEffect(() => {
    graphData.forEach((data, index) => {
      createOrUpdateGraph(index);
    });
  }, [graphData, calculateDistances, showCenterPoint, showAngle, angleLines, showValue, lineAngles, lineLengths, overallRange]);


  useEffect(() => {
    const updateGraphs = () => {
      const newGraphData = Array(6).fill(null);
      const newDataStatus = Array(6).fill('');

      selectedFiles.forEach((file, index) => {
        if (file) {
          const existingDataIndex = graphData.findIndex(data => data && data.fileName === file.name);
          if (existingDataIndex !== -1) {
            newGraphData[index] = graphData[existingDataIndex];
            newDataStatus[index] = dataStatus[existingDataIndex];
          } else {
            handleFileSelection(file, index);
          }
        }
      });

      setGraphData(newGraphData);
      setDataStatus(newDataStatus);
    };

    updateGraphs();
  }, [selectedFiles]);

  const handleFileToggle = async (file) => {
    if (isLoading) return;

    setSelectedFiles(prev => {
      const isSelected = prev.includes(file);
      if (isSelected) {
        return prev.filter(f => f !== file);
      } else {
        const availableIndex = prev.findIndex(f => f === null);
        if (availableIndex !== -1) {
          const newSelectedFiles = [...prev];
          newSelectedFiles[availableIndex] = file;
          handleFileSelection(file, availableIndex);
          return newSelectedFiles;
        } else if (prev.length < 6) {
          handleFileSelection(file, prev.length);
          return [...prev, file];
        }
      }
      return prev;
    });
  };

//   const handleAngleChange = (index, property, value) => {
//     setAngleLines(prev => {
//       const newAngleLines = [...prev];
//       newAngleLines[index] = { ...newAngleLines[index], [property]: value };
//       return newAngleLines;
//     });
  
//     const angle = property === 'angle' ? value : angleLines[index].angle;
//     const length = property === 'length' ? value : angleLines[index].length;
//     const radians = angle * (Math.PI / 180);
//     const x = Math.cos(radians) * length;
//     const y = Math.sin(radians) * length;
  
//     setAngleEndpoints(prev => {
//       const newEndpoints = [...prev];
//       newEndpoints[index] = {
//         x: x,
//         y: y,
//         angle: angle,
//         length: length
//       };
//       return newEndpoints;
//     });
//   };

const handleAngleChange = (index, property, value) => {
    setAngleLines(prev => {
      const newAngleLines = [...prev];
      newAngleLines[index] = { ...newAngleLines[index], [property]: value };
      return newAngleLines;
    });
  
    const angle = property === 'angle' ? value : angleLines[index].angle;
    const length = property === 'length' ? value : angleLines[index].length;
    const radians = angle * (Math.PI / 180);
    
    // Calculate x and y based on angle and length
    const x = Math.cos(radians) * length;
    const y = Math.sin(radians) * length;
  
    // Calculate the actual angle based on the new x and y
    const calculatedAngle = calculateAngleFromEndpoint(x, y);
  
    setAngleEndpoints(prev => {
      const newEndpoints = [...prev];
      newEndpoints[index] = {
        x: x,
        y: y,
        angle: calculatedAngle,
        length: length
      };
      return newEndpoints;
    });
  };
  const handleLineAngleChange = (index, value) => {
    setLineAngles(prev => {
      const newLineAngles = [...prev];
      newLineAngles[index] = value;
      return newLineAngles;
    });
  };

  const handleLineLengthChange = (index, value) => {
    setLineLengths(prev => {
      const newLineLengths = [...prev];
      newLineLengths[index] = value;
      return newLineLengths;
    });
  };


  const generateReport = async () => {
    console.log("Starting report generation");
    setIsGeneratingReport(true);
  
    try {
      const pdf = new jsPDF('l', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.width;
      const pageHeight = pdf.internal.pageSize.height;
      const margin = 10;
      const graphWidth = (pageWidth - 4 * margin) / 3;
      const graphHeight = (pageHeight - 3 * margin) / 2;
  
      let currentPage = 1; // Track the current page
      let row = 0;
      let col = 0;
  
      for (let i = 0; i < selectedFiles.length; i++) {
        const graphContainer = graphContainerRef.current[i];
  
        if (!graphContainer) {
          console.log(`Graph container ${i + 1} not found`);
          continue;
        }
  
        console.log(`Capturing graph ${i + 1}`);
        const canvas = await html2canvas(graphContainer);
        const imgData = canvas.toDataURL('image/png');
  
        // Handle page breaks for every 3 graphs
        if (i % 3 === 0 && i !== 0) { // Check if it's the first graph on a new page
          pdf.addPage();
          currentPage++;
          row = 0;
          col = 0;
        }
  
        const xPosition = margin + col * (graphWidth + margin);
        const yPosition = margin + row * (graphHeight + margin);
  
        pdf.addImage(imgData, 'PNG', xPosition, yPosition, graphWidth, graphHeight - 25);
  
        if (graphData[i]) {
          pdf.setFontSize(9);
          pdf.text(`Graph ${i + 1}: ${graphData[i].fileName}`, xPosition, yPosition - 2);
  
          pdf.setFontSize(7);
          let valueY = yPosition + graphHeight - 23;
          pdf.text(`CoG: ${distances[i].toFixed(2)}`, xPosition, valueY);
          pdf.text(`Status: ${dataStatus[i] || 'N/A'}`, xPosition, valueY + 4);
          pdf.text(`Filter: 1`, xPosition, valueY + 8);
  
          if (showAngle) {
            pdf.text(`Angle: ${angles[i].toFixed(2)}°`, xPosition + 40, valueY);
          }
  
          if (showValue) {
            pdf.text(`Line Angle: ${lineAngles[i].toFixed(2)}°`, xPosition + 40, valueY + 4);
            pdf.text(`Line Length: ${lineLengths[i].toFixed(2)}`, xPosition + 40, valueY + 8);
            pdf.text(`Endpoint: (${lineEndpoints[i].x.toFixed(2)}, ${lineEndpoints[i].y.toFixed(2)})`, xPosition, valueY + 12);
            pdf.text(`Calculated Value: ${calculatedHypotenuse[i].toFixed(2)}`, xPosition, valueY + 16);
          }
  
          const file = selectedFiles[i];
          if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
              const fileContent = e.target.result;
              const lines = fileContent.split('\n');
              const additionalInfo = {};
  
              lines.forEach(line => {
                if (line.startsWith('#')) {
                  line = line.substring(1).trim();
                  if (line.includes(':')) {
                    const [key, ...values] = line.split(':').map(s => s.trim());
                    additionalInfo[key] = values.join(':').trim();
                  } else if (line.includes('=')) {
                    const parts = line.split(/\s+/).filter(part => part !== '=');
                    for (let i = 0; i < parts.length; i += 2) {
                      if (parts[i] && parts[i + 1]) {
                        additionalInfo[parts[i]] = parts[i + 1];
                      }
                    }
                  }
                }
              });
  
              // Special handling for vc and n
              if (additionalInfo['vc'] === '' && additionalInfo['n']) {
                additionalInfo['vc'] = '';
                additionalInfo['n'] = additionalInfo['n'];
              }
  
              valueY += 20;
              pdf.setFontSize(6);
              pdf.text("File Information:", xPosition, valueY);
              valueY += 4;
  
              const infoToDisplay = [
                ['date', 'operator'], ['process'], ['tool'], ['material'], ['tool gage'],
                ['d', 'z'], ['ap', 'ae'], ['vc', 'n'], ['f', 'vf'], ['X'], ['cooling'], ['unit type'], ['note']
              ];
  
              infoToDisplay.forEach((keys, index) => {
                const displayStrings = keys.map(key => {
                  const value = additionalInfo[key];
                  return value !== undefined ? `${key}: ${value}` : '';
                }).filter(s => s);
                if (displayStrings.length > 0) {
                  pdf.text(displayStrings.join('    '), xPosition, valueY + index * 4);
                }
              });
  
              // If this is the last graph on the current page, save the PDF
              if (i === selectedFiles.length - 1 || (i % 3 === 2 && i !== selectedFiles.length - 1)) {
                pdf.save('polar_plot_report.pdf');
                setIsGeneratingReport(false);
              }
            };
            reader.readAsText(file);
          } else {
            // If there's no file for this graph, move on to the next one
            if (i === selectedFiles.length - 1 || (i % 3 === 2 && i !== selectedFiles.length - 1)) {
              pdf.save('polar_plot_report.pdf');
              setIsGeneratingReport(false);
            }
          }
  
          // Increment row and col for the next graph
          col++;
          if (col >= 3) {
            col = 0;
            row++;
          }
        }
      }
    } catch (error) {
      console.error("Error generating report:", error);
      setIsGeneratingReport(false);
    }
  };
  useEffect(() => {
    Array.from({ length: 6 }).forEach((_, index) => {
      createOrUpdateGraph(index);
    });
  }, []);
  
  
  return (
    <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center ${isVisible ? '' : 'hidden'}`}>
      <div className="bg-[#f1f1f1] p-2 rounded-md relative" style={{ width: '98%', height: '98%', maxWidth: '1600px', maxHeight: '830px' }} onClick={(e) => e.stopPropagation()}>
        <div className="flex h-full">
          <div className="flex-grow overflow-auto">
            <div className="grid grid-cols-3 gap-2 p-2">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="border-2 border-gray-300 p-2 rounded-md">
                  <h2 className="text-lg font-bold">Graph {index + 1}</h2>
                  <div ref={(el) => graphContainerRef.current[index] = el} style={{ width: '100%', height: '300px' }}></div>
                  <div className="mt-1 space-y-1 text-sm">
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="font-bold">CoG:</span>
                        <input
                          type="text"
                          value={calculateDistances ? distances[index].toFixed(2) : 'N/A'}
                          readOnly
                          className="ml-1 p-1 border border-gray-300 rounded-md w-16 text-xs"
                        />
                      </div>
                      <div>
                        <span className="font-bold mr-1">Status:</span>
                        <input
                          type="text"
                          value={dataStatus[index] || ''}
                          readOnly
                          className="p-1 border border-300 rounded-md w-16 text-xs"
                        />
                      </div>
                      <div>
                        <span className="font-bold mr-1">Filter:</span>
                        <input
                          type="text"
                          value="1"
                          readOnly
                          className="p-1 border border-gray-300 rounded-md w-8 text-center text-xs"
                        />
                      </div>
                    </div>
                     {showAngle && (
            <div className="flex items-center space-x-1 overflow-x-auto text-xs">
              <div className="flex items-center shrink-0">
                <span className="font-bold mr-1">Angle:</span>
                <input
                  type="range"
                  min="0"
                  max="360"
                  value={angleLines[index].angle}
                  onChange={(e) => handleAngleChange(index, 'angle', parseInt(e.target.value))}
                  className="w-20"
                />
              </div>
              <div className="flex items-center shrink-0">
                <span className="font-bold mr-1">Length:</span>
                <input
                  type="range"
                  min="0"
                  max="300"
                  value={angleLines[index].length}
                  onChange={(e) => handleAngleChange(index, 'length', parseInt(e.target.value))}
                  className="w-20"
                />
              </div>
              <div className="shrink-0">
                <span className="font-bold mr-1">Endpoint:</span>
                <input
                  type="text"
                  value={`X: ${angleEndpoints[index].x.toFixed(2)}, Y: ${angleEndpoints[index].y.toFixed(2)}`}
                  readOnly
                  className="p-1 border border-gray-300 rounded-md w-36 text-center text-xs"
                />
              </div>
              <div className="shrink-0">
                <span className="font-bold mr-1">Calculated Angle:</span>
                <input
                  type="text"
                  value={`${angleEndpoints[index].angle.toFixed(5)}°`}
                  readOnly
                  className="p-1 border border-gray-300 rounded-md w-20 text-center text-xs"
                />
              </div>
            </div>
          )}
                    {showValue && (
                      <div className="flex items-center space-x-1 overflow-x-auto text-xs">
                        <div className="flex items-center shrink-0">
                          <span className="font-bold mr-1">Line Angle:</span>
                          <input
                            type="range"
                            min="0"
                            max="360"
                            value={lineAngles[index]}
                            onChange={(e) => handleLineAngleChange(index, parseInt(e.target.value))}
                            className="w-20"
                          />
                        </div>
                        <div className="flex items-center shrink-0">
                          <span className="font-bold mr-1">Line Drag:</span>
                          <input
                            type="range"
                            min="0"
                            max="300"
                            value={lineLengths[index]}
                            onChange={(e) => handleLineLengthChange(index, parseInt(e.target.value))}
                            className="w-20"
                          />
                        </div>
                        <div className="shrink-0">
                          <span className="font-bold mr-1">Endpoint:</span>
                          <input
                            type="text"
                            value={`X: ${lineEndpoints[index].x.toFixed(2)}, Y: ${lineEndpoints[index].y.toFixed(2)}`}
                            readOnly
                            className="p-1 border border-gray-300 rounded-md w-36 text-center text-xs"
                          />
                        </div>
                        <div className="shrink-0">
                          <span className="font-bold mr-1">Calculate value:</span>
                          <input
                            type="text"
                            value={calculatedHypotenuse[index].toFixed(2)}
                            readOnly
                            className="p-1 border border-gray-300 rounded-md w-16 text-center text-xs"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="w-64 flex flex-col p-2 border-l-2 border-gray-300">
            <div className="mb-4">
              <input
                type="file"
                webkitdirectory="true"
                multiple
                onChange={handleFolderUpload}
                className="mb-2 text-sm"
                disabled={isLoading}
              />
              <div className="h-40 overflow-y-auto border border-gray-400 rounded-md p-1 text-xs">
                {files.map((file, index) => (
                  <div key={index} className="flex items-center mb-1">
                    <input
                      type="checkbox"
                      checked={selectedFiles.includes(file)}
                      onChange={() => handleFileToggle(file)}
                      className="mr-1"
                      disabled={isLoading}
                    />
                    <span>{file.name}</span>
                  </div>
                ))}
              </div>
            </div>
            
        <div className="space-y-2 mt-auto">
          <button
            onClick={handleCalculateDistances}
            disabled={isProcessing.distance}
            className="p-1 text-xs text-white bg-blue-600 rounded-md w-full"
          >
            {isProcessing.distance ? 'Processing...' : (calculateDistances ? 'Hide Distance' : 'Show Distance')}
          </button>
          <button
            onClick={handleShowCenterPoint}
            disabled={isProcessing.centerPoint}
            className="p-1 text-xs text-white bg-green-600 rounded-md w-full"
          >
            {isProcessing.centerPoint ? 'Processing...' : (showCenterPoint ? 'Hide Center Point' : 'Show Center Point')}
          </button>
          <button
            onClick={handleShowAngle}
            disabled={isProcessing.angle}
            className="p-1 text-xs text-white bg-purple-600 rounded-md w-full"
          >
            {isProcessing.angle ? 'Processing...' : (showAngle ? 'Hide Angle' : 'Show Angle')}
          </button>
          <button
            onClick={handleShowValue}
            disabled={isProcessing.value}
            className="p-1 text-xs text-white bg-yellow-600 rounded-md w-full"
          >
            {isProcessing.value ? 'Processing...' : (showValue ? 'Hide Value' : 'Show Value')}
          </button>
              <button
                onClick={generateReport}
                disabled={isGeneratingReport}
                className="p-1 text-xs text-white bg-red-600 rounded-md w-full"
              >
                {isGeneratingReport ? 'Generating...' : 'Generate Report'}
              </button>
              <button onClick={onClose} className="p-1 text-xs text-white bg-gray-800 rounded-md w-full">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
  
      {toastMessage && (
        <Toast
          message={toastMessage}
          onClose={() => setToastMessage('')}
        />
      )}
    </div>
  );
};

export default PolarPlot;


