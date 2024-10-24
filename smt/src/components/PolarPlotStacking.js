// import React, { useEffect, useRef, useState } from 'react';
// import Plotly from 'plotly.js-dist';
// import Rotatablevalue from './Rotatablevalue';
// import ReactDOM from 'react-dom';



// const PolarPlotStacking = ({ isVisible, onClose, setValueLinePosition }) => {
//   const [selectedFolderFiles, setSelectedFolderFiles] = useState([]);
//   const [selectedFolderCheckboxes, setSelectedFolderCheckboxes] = useState({});
//   const plotColors = ['#FF5733', '#33FF57', '#334CFF', '#FF33EC', '#AACCFF', '#FFAABB', '#FF0000', '#00FF00', '#0000FF', '#FFFF00'];
//   const [graphData, setGraphData] = useState([]);
//   const [showGraph, setShowGraph] = useState(true);
//   const [selectedFiles, setSelectedFiles] = useState([]);

//   const graphContainerRef = useRef(null);
//   const [graphLimits, setGraphLimits] = useState([-1, 1]);
//   const [angleLineData, setAngleLineData] = useState(null);
//   const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });
//   const [draggablePoint, setDraggablePoint] = useState({ x: 0, y: 0 });
//   const [calculateAngle, setCalculateAngle] = useState(null);

//   const [isLoading, setIsLoading] = useState(false);
//   const handleCalculateAngle = () => {
//     calculateAngle();
//   };

//   const handleCheckboxChange = async (file) => {
//     try {
//       const updatedCheckboxes = { ...selectedFolderCheckboxes };
//       updatedCheckboxes[file.name] = !updatedCheckboxes[file.name];

//       const updatedSelectedFiles = Object.keys(updatedCheckboxes)
//         .filter((fileName) => updatedCheckboxes[fileName])
//         .map((fileName) => selectedFolderFiles.find((file) => file.name === fileName));

//       // Limit the number of selected files to 10
//       if (updatedSelectedFiles.length > 10) {
//         alert('You can select a maximum of 10 files.');
//         return;
//       }

//       setSelectedFolderCheckboxes(updatedCheckboxes);
//       setSelectedFiles(updatedSelectedFiles);
//       setIsLoading(true);

//       const processedData = await Promise.all(updatedSelectedFiles.map(async (file, index) => {
//         const fileContent = await readFileContent(file);
//         const processedContent = processFileContent(fileContent);
//         return { file: file.name, data: processedContent, index };
//       }));

//       let maxAbsoluteValue = 0;
//       processedData.forEach(({ data }) => {
//         data.forEach(({ bendingMomentX, bendingMomentY }) => {
//           const absX = Math.abs(bendingMomentX);
//           const absY = Math.abs(bendingMomentY);
//           maxAbsoluteValue = Math.max(maxAbsoluteValue, absX, absY);
//         });
//       });

//       const graphLimits = [-maxAbsoluteValue, maxAbsoluteValue];

//       setGraphData(processedData);
//       setShowGraph(true);
//       setGraphLimits(graphLimits);
//       setIsLoading(false);
//     } catch (error) {
//       console.error('Error processing files:', error);
//       setIsLoading(false);
//     }
//   };

//   const handleFolderSelect = async () => {
//     try {
//       const folderInput = document.createElement('input');
//       folderInput.setAttribute('type', 'file');
//       folderInput.setAttribute('webkitdirectory', true);

//       folderInput.addEventListener('change', async (e) => {
//         const files = e.target.files;
//         if (files.length > 0) {
//           const fileList = Array.from(files);
//           setSelectedFolderFiles(fileList);
//         }
//       });

//       folderInput.click();
//     } catch (error) {
//       console.error('Error selecting folder:', error);
//     }
//   };


//   const readFileContent = async (file) => {
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         const content = e.target.result;
//         resolve(content);
//       };
//       reader.onerror = (error) => reject(error);
//       reader.readAsText(file);
//     });
//   };

//   const processFileContent = (fileContent) => {
//     const lines = fileContent.split('\n');
//     const dataStartIndex = lines.findIndex(line => line.startsWith('Tension;Torsion;Bending moment X;Bending moment Y;Time;Temperature'));

//     if (dataStartIndex !== -1) {
//       const data = lines.slice(dataStartIndex + 2).map(line => {
//         const [Tension, _torsion_, bendingMomentX, bendingMomentY, _time__, _temperature__] = line.split(';');
//         return { bendingMomentX: parseFloat(bendingMomentX), bendingMomentY: parseFloat(bendingMomentY) };
//       });

//       const maxLength = Math.min(data.length, 100000); // Limiting to a maximum of 5000 points

//       const alignedData = data.slice(0, maxLength).map(({ bendingMomentX, bendingMomentY }) => ({
//         bendingMomentX: isNaN(bendingMomentX) ? 0 : bendingMomentX,
//         bendingMomentY: isNaN(bendingMomentY) ? 0 : bendingMomentY,
//       }));

//       return alignedData;
//     } else {
//       return [];
//     }
//   };

//   useEffect(() => {
//     if (showGraph) {
//       const graphContainer = graphContainerRef.current;

//       const modifiedData = graphData.map((data, index) => {
//         const newData = data.data.map((point, pointIndex, arr) => {
//           if (pointIndex === arr.length - 1) {
//             return {
//               bendingMomentX: arr[0].bendingMomentX,
//               bendingMomentY: arr[0].bendingMomentY,
//             };
//           }
//           return point;
//         });

//         return {
//           ...data,
//           data: newData,
//         };
//       });

//       const horizontalMidpointLine = {
//         x: [graphLimits[0], graphLimits[1]],
//         y: [0, 0],
//         mode: 'lines',
//         type: 'scatter',
//         line: {
//           color: 'black',
//           width: 2,
//           dash: 'line',
//         },
//       };

//       const verticalMidpointLine = {
//         x: [0, 0],
//         y: [-graphLimits[1], graphLimits[1]],
//         mode: 'lines',
//         type: 'scatter',
//         line: {
//           color: 'black',
//           width: 2,
//           dash: 'line',
//         },
//       };

//       const traces = modifiedData.map((data, index) => ({
//         x: data.data.map(d => d.bendingMomentX),
//         y: data.data.map(d => d.bendingMomentY),
//         text: data.data.map(d => `(${d.bendingMomentX}, ${d.bendingMomentY})`),
//         mode: 'markers',
//         type: 'scatter',
//         marker: {
//           symbol: 'diamond',
//           color: plotColors[index % plotColors.length],
//         },
//         hoverinfo: 'none'
//       }));
//       traces.push(horizontalMidpointLine);
//       traces.push(verticalMidpointLine);

//       if (angleLineData) {
//         traces.push(angleLineData);
//       }

//       const layout = {
//         title: 'Bending Moments Scatter Plot',
//         xaxis: {
//           title: 'Bending Moment X',
//           zeroline: true,
//           zerolinecolor: 'black',
//           showline: true,
//           showticklabels: true,
//           tickmode: 'linear',
//           ticks: 'inside',
//           range: graphLimits,
//           fixedrange: true,
//           layer: 'above traces',
//         },
//         yaxis: {
//           title: 'Bending Moment Y',
//           zeroline: true,
//           zerolinecolor: 'black',
//           showline: true,
//           showticklabels: true,
//           tickmode: 'linear',
//           ticks: 'inside',
//           range: graphLimits,
//           fixedrange: true,
//           layer: 'above traces',
//         },
//         dragmode: false,
//       };

//       const config = {
//         responsive: false,
//         displayModeBar: true,
//         displaylogo: false,
//         scrollZoom: true,
//         editable: false,
//         staticPlot: false,
//       };


// // Define newGraphContainer and graphElement
// const newGraphContainer = document.createElement('div');
// const graphElement = document.createElement('div');

// // Set style for newGraphContainer
// newGraphContainer.style.zIndex = '1';

// // Define RotatableLineComponent before using it
// const RotatableLineComponent = document.createElement('div');
// RotatableLineComponent.style.zIndex = '1'; 
// newGraphContainer.appendChild(RotatableLineComponent);
// ReactDOM.render(<Rotatablevalue />, RotatableLineComponent);

// // Append RotatableLineComponent to newGraphContainer
// newGraphContainer.appendChild(graphElement);



//       if (graphContainer) {
//         Plotly.newPlot(graphContainer, traces, layout, config);
//       }
//     }
//   }, [showGraph, graphData, graphLimits, angleLineData]);

//   return (
//     <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center ${isVisible ? '' : 'hidden'}`}>
//       <div className="bg-[#aaa8aa] p-1 rounded-md flex flex-col w-full max-w-4xl overflow-y-auto" onClick={(e) => e.stopPropagation()}>
//         <Rotatablevalue />
//         <div className="w-full" ref={graphContainerRef}></div>

//         <div className="flex justify-between items-center mt-4">
//           <div>
//             <h2 className="text-lg font-bold mb-2">Select Folder:</h2>
//             <button
//               className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue mb-4"
//               onClick={handleFolderSelect}
//             >
//               Select Folder
//             </button>
//             {selectedFolderFiles.length > 0 && (
//               <div className="max-h-[200px] overflow-y-auto">
//                 <h2 className="text-lg font-bold mb-2">Selected Files:</h2>
//                 <ul className="list-disc list-inside">
//                   {selectedFolderFiles.map((file) => (
//                     <li key={file.name} className="flex items-center">
//                       <input
//                         type="checkbox"
//                         className="form-checkbox text-blue-500 h-5 w-5"
//                         checked={selectedFolderCheckboxes[file.name] || false}
//                         onChange={() => handleCheckboxChange(file)}
//                       />
//                       <span className="ml-2 text-gray-700">{file.name}</span>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             )}
//           </div>
      
//         </div>

//         <div className="flex justify-end mt-4">
//           <button
//             className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-red"
//             onClick={onClose}
//           >
//             Close
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default PolarPlotStacking;

//"'''''''''''''''''''''''''''''''''''''''''''''''''"
// import React, { useEffect, useRef, useState } from 'react';
// import Plotly from 'plotly.js-dist';
// import ReactDOM from 'react-dom';
// import Rotatablevalue from './Rotatablevalue';

// const PolarPlotStacking = ({ isVisible, onClose }) => {
//   const [selectedFolderFiles, setSelectedFolderFiles] = useState([]);
//   const [selectedFolderCheckboxes, setSelectedFolderCheckboxes] = useState({});
//   const plotColors = ['#FF5733', '#33FF57', '#334CFF', '#FF33EC', '#AACCFF', '#FFAABB', '#FF0000', '#00FF00', '#0000FF', '#FFFF00'];
//   const [graphData, setGraphData] = useState([]);
//   const [showGraph, setShowGraph] = useState(true);
//   const [selectedFiles, setSelectedFiles] = useState([]);

//   const graphContainerRef = useRef(null);
//   const [graphLimits, setGraphLimits] = useState([-1, 1]);
//   const [angleLineData, setAngleLineData] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);

//   const handleCheckboxChange = async (file) => {
//     try {
//       const updatedCheckboxes = { ...selectedFolderCheckboxes };
//       updatedCheckboxes[file.name] = !updatedCheckboxes[file.name];

//       const updatedSelectedFiles = Object.keys(updatedCheckboxes)
//         .filter((fileName) => updatedCheckboxes[fileName])
//         .map((fileName) => selectedFolderFiles.find((file) => file.name === fileName));

//       // Limit the number of selected files to 7
//       if (updatedSelectedFiles.length > 9) {
//         alert('You can select a maximum of 7 files.');
//         return;
//       }

//       setSelectedFolderCheckboxes(updatedCheckboxes);
//       setSelectedFiles(updatedSelectedFiles);
//       setIsLoading(true);

//       const processedData = await Promise.all(updatedSelectedFiles.map(async (file, index) => {
//         const fileContent = await readFileContent(file);
//         const processedContent = processFileContent(fileContent);
//         return { file: file.name, data: processedContent, index };
//       }));

//       let maxAbsoluteValue = 0;
//       processedData.forEach(({ data }) => {
//         data.forEach(({ bendingMomentX, bendingMomentY }) => {
//           const absX = Math.abs(bendingMomentX);
//           const absY = Math.abs(bendingMomentY);
//           maxAbsoluteValue = Math.max(maxAbsoluteValue, absX, absY);
//         });
//       });

//       const graphLimits = [-maxAbsoluteValue, maxAbsoluteValue];

//       setGraphData(processedData);
//       setShowGraph(true);
//       setGraphLimits(graphLimits);
//       setIsLoading(false);
//     } catch (error) {
//       console.error('Error processing files:', error);
//       setIsLoading(false);
//     }
//   };

//   const handleFolderSelect = async () => {
//     try {
//       const folderInput = document.createElement('input');
//       folderInput.setAttribute('type', 'file');
//       folderInput.setAttribute('webkitdirectory', true);

//       folderInput.addEventListener('change', async (e) => {
//         const files = e.target.files;
//         if (files.length > 0) {
//           const fileList = Array.from(files);
//           setSelectedFolderFiles(fileList);
//         }
//       });

//       folderInput.click();
//     } catch (error) {
//       console.error('Error selecting folder:', error);
//     }
//   };

//   const readFileContent = async (file) => {
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         const content = e.target.result;
//         resolve(content);
//       };
//       reader.onerror = (error) => reject(error);
//       reader.readAsText(file);
//     });
//   };

//   const processFileContent = (fileContent) => {
//     const lines = fileContent.split('\n');
//     const dataStartIndex = lines.findIndex(line => line.startsWith('Tension;Torsion;Bending moment X;Bending moment Y;Time;Temperature'));

//     if (dataStartIndex !== -1) {
//       const data = lines.slice(dataStartIndex + 2).map(line => {
//         const [Tension, _torsion_, bendingMomentX, bendingMomentY, _time__, _temperature__] = line.split(';');
//         return { bendingMomentX: parseFloat(bendingMomentX), bendingMomentY: parseFloat(bendingMomentY) };
//       });

//       const maxLength = Math.min(data.length, 80000); // Limiting to a maximum of 400,000 points

//       const alignedData = data.slice(0, maxLength).map(({ bendingMomentX, bendingMomentY }) => ({
//         bendingMomentX: isNaN(bendingMomentX) ? 0 : bendingMomentX,
//         bendingMomentY: isNaN(bendingMomentY) ? 0 : bendingMomentY,
//       }));

//       return alignedData;
//     } else {
//       return [];
//     }
//   };

//   useEffect(() => {
//     if (showGraph) {
//       const graphContainer = graphContainerRef.current;

//       const modifiedData = graphData.map((data, index) => {
//         const newData = data.data.map((point, pointIndex, arr) => {
//           if (pointIndex === arr.length - 1) {
//             return {
//               bendingMomentX: arr[0].bendingMomentX,
//               bendingMomentY: arr[0].bendingMomentY,
//             };
//           }
//           return point;
//         });

//         return {
//           ...data,
//           data: newData,
//         };
//       });

//       const horizontalMidpointLine = {
//         x: [graphLimits[0], graphLimits[1]],
//         y: [0, 0],
//         mode: 'lines',
//         type: 'scatter',
//         line: {
//           color: 'black',
//           width: 2,
//           dash: 'line',
//         },
//       };

//       const verticalMidpointLine = {
//         x: [0, 0],
//         y: [-graphLimits[1], graphLimits[1]],
//         mode: 'lines',
//         type: 'scatter',
//         line: {
//           color: 'black',
//           width: 2,
//           dash: 'line',
//         },
//       };

//       const traces = modifiedData.map((data, index) => ({
//         x: data.data.map(d => d.bendingMomentX),
//         y: data.data.map(d => d.bendingMomentY),
//         text: data.data.map(d => `(${d.bendingMomentX}, ${d.bendingMomentY})`),
//         mode: 'markers',
//         type: 'scatter',
//         marker: {
//           symbol: 'diamond',
//           color: plotColors[index % plotColors.length],
//         },
//         hoverinfo: 'none'
//       }));
//       traces.push(horizontalMidpointLine);
//       traces.push(verticalMidpointLine);

//       const layout = {
//         title: 'Bending Moments Scatter Plot',
//         xaxis: {
//           title: 'Bending Moment X',
//           zeroline: true,
//           zerolinecolor: 'black',
//           showline: true,
//           showticklabels: true,
//           tickmode: 'auto',
//           ticks: 'inside',
//           range: graphLimits,
//           fixedrange: true,
//           layer: 'above traces',
//           nticks: 15,
//         },
//         yaxis: {
//           title: 'Bending Moment Y',
//           zeroline: true,
//           zerolinecolor: 'black',
//           showline: true,
//           showticklabels: true,
//           tickmode: 'auto',
//           ticks: 'inside',
//           range: graphLimits,
//           fixedrange: true,
//           layer: 'above traces',
//           nticks: 15,
//         },
//         dragmode: false,
//       };

//       const config = {
//         responsive: false,
//         displayModeBar: true,
//         displaylogo: false,
//         scrollZoom: true,
//         editable: false,
//         staticPlot: false,
//       };

//       if (graphContainer) {
//         Plotly.newPlot(graphContainer, traces, layout, config);
//       }
//     }
//   }, [showGraph, graphData, graphLimits]);

//   return (
//     <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center ${isVisible ? '' : 'hidden'}`}>
//       <div className="bg-[#aaa8aa] p-1 rounded-md flex flex-col w-full max-w-4xl overflow-y-auto" onClick={(e) => e.stopPropagation()}>
//         <Rotatablevalue />
//         <div className="w-full" ref={graphContainerRef}></div>

//         <div className="flex justify-between items-center mt-4">
//           <div>
//             <h2 className="text-lg font-bold mb-2">Select Folder:</h2>
//             <button
//               className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue mb-4"
//               onClick={handleFolderSelect}
//             >
//               Select Folder
//             </button>
//             {selectedFolderFiles.length > 0 && (
//               <div className="max-h-[200px] overflow-y-auto">
//                 <h2 className="text-lg font-bold mb-2">Selected Files:</h2>
//                 <ul className="list-disc list-inside">
//                   {selectedFolderFiles.map((file) => (
//                     <li key={file.name} className="flex items-center">
//                       <input
//                         type="checkbox"
//                         className="form-checkbox text-blue-500 h-5 w-5"
//                         checked={selectedFolderCheckboxes[file.name] || false}
//                         onChange={() => handleCheckboxChange(file)}
//                       />
//                       <span className="ml-2 text-gray-700">{file.name}</span>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             )}
//           </div>
//         </div>

//         <div className="flex justify-end mt-4">
//           <button
//             className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-red"
//             onClick={onClose}
//           >
//             Close
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PolarPlotStacking;
//""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
// import React, { useEffect, useRef, useState, useCallback } from 'react';
// import Plotly from 'plotly.js-dist';
// import Rotatablevalue from './Rotatablevalue';
// import debounce from 'lodash.debounce';

// const PolarPlotStacking = ({ isVisible, onClose }) => {
//   const [selectedFolderFiles, setSelectedFolderFiles] = useState([]);
//   const [selectedFolderCheckboxes, setSelectedFolderCheckboxes] = useState({});
//   const plotColors = ['#FF5733', '#33FF57', '#334CFF', '#FF33EC', '#AACCFF', '#FFAABB', '#FF0000', '#00FF00', '#0000FF', '#FFFF00'];
//   const [graphData, setGraphData] = useState([]);
//   const [showGraph, setShowGraph] = useState(true);
//   const [selectedFiles, setSelectedFiles] = useState([]);

//   const graphContainerRef = useRef(null);
//   const [graphLimits, setGraphLimits] = useState([-1, 1]);
//   const [isLoading, setIsLoading] = useState(false);

//   const handleCheckboxChange = useCallback(debounce(async (file) => {
//     try {
//       const updatedCheckboxes = { ...selectedFolderCheckboxes };
//       updatedCheckboxes[file.name] = !updatedCheckboxes[file.name];
  
//       const updatedSelectedFiles = Object.keys(updatedCheckboxes)
//         .filter((fileName) => updatedCheckboxes[fileName])
//         .map((fileName) => selectedFolderFiles.find((file) => file.name === fileName));
  
//       // Limit the number of selected files to 9
//       if (updatedSelectedFiles.length > 9) {
//         alert('You can select a maximum of 9 files.');
//         return;
//       }
  
//       setSelectedFolderCheckboxes(updatedCheckboxes);
//       setSelectedFiles(updatedSelectedFiles);
//       setIsLoading(true);
  
//       const processedData = await Promise.all(updatedSelectedFiles.map(async (file, index) => {
//         const fileContent = await readFileContent(file);
//         const processedContent = processFileContent(fileContent);
//         return { file: file.name, data: processedContent, index };
//       }));
  
//       let maxAbsoluteValue = 0;
//       processedData.forEach(({ data }) => {
//         data.forEach(({ bendingMomentX, bendingMomentY }) => {
//           const absX = Math.abs(bendingMomentX);
//           const absY = Math.abs(bendingMomentY);
//           maxAbsoluteValue = Math.max(maxAbsoluteValue, absX, absY);
//         });
//       });
  
//       const graphLimits = [-maxAbsoluteValue, maxAbsoluteValue];
  
//       setGraphData(processedData);
//       setShowGraph(true);
//       setGraphLimits(graphLimits);
//       setIsLoading(false);
//     } catch (error) {
//       console.error('Error processing files:', error);
//       setIsLoading(false);
//     }
//   }, 300), [selectedFolderCheckboxes, selectedFolderFiles]);
  

//   const handleFolderSelect = async () => {
//     try {
//       const folderInput = document.createElement('input');
//       folderInput.setAttribute('type', 'file');
//       folderInput.setAttribute('webkitdirectory', true);

//       folderInput.addEventListener('change', async (e) => {
//         const files = e.target.files;
//         if (files.length > 0) {
//           const fileList = Array.from(files);
//           setSelectedFolderFiles(fileList);
//         }
//       });

//       folderInput.click();
//     } catch (error) {
//       console.error('Error selecting folder:', error);
//     }
//   };

//   const readFileContent = async (file) => {
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         const content = e.target.result;
//         resolve(content);
//       };
//       reader.onerror = (error) => reject(error);
//       reader.readAsText(file);
//     });
//   };

//   const processFileContent = (fileContent) => {
//     const lines = fileContent.split('\n');
//     const dataStartIndex = lines.findIndex(line => line.startsWith('Tension;Torsion;Bending moment X;Bending moment Y;Time;Temperature'));
  
//     if (dataStartIndex !== -1) {
//       const data = lines.slice(dataStartIndex + 2).map(line => {
//         const [Tension, _torsion_, bendingMomentX, bendingMomentY, _time__, _temperature__] = line.split(';');
//         return { bendingMomentX: parseFloat(bendingMomentX), bendingMomentY: parseFloat(bendingMomentY) };
//       });
  
//       // Limiting to a maximum of 80,000 points
//       const maxLength = Math.min(data.length, 50000);
//       const step = Math.ceil(data.length / maxLength);
  
//       const alignedData = data.filter((_, index) => index % step === 0).map(({ bendingMomentX, bendingMomentY }) => ({
//         bendingMomentX: isNaN(bendingMomentX) ? 0 : bendingMomentX,
//         bendingMomentY: isNaN(bendingMomentY) ? 0 : bendingMomentY,
//       }));
  
//       return alignedData;
//     } else {
//       return [];
//     }
//   };

//   useEffect(() => {
//     if (showGraph) {
//       const graphContainer = graphContainerRef.current;
  
//       const modifiedData = graphData.map((data, index) => {
//         const newData = data.data.map((point, pointIndex, arr) => {
//           if (pointIndex === arr.length - 1) {
//             return {
//               bendingMomentX: arr[0].bendingMomentX,
//               bendingMomentY: arr[0].bendingMomentY,
//             };
//           }
//           return point;
//         });
  
//         return {
//           ...data,
//           data: newData,
//         };
//       });
  
//       const horizontalMidpointLine = {
//         x: [graphLimits[0], graphLimits[1]],
//         y: [0, 0],
//         mode: 'lines',
//         type: 'scatter',
//         line: {
//           color: 'black',
//           width: 2,
//           dash: 'line',
//         },
//       };
  
//       const verticalMidpointLine = {
//         x: [0, 0],
//         y: [graphLimits[0], graphLimits[1]],
//         mode: 'lines',
//         type: 'scatter',
//         line: {
//           color: 'black',
//           width: 2,
//           dash: 'line',
//         },
//       };
  
//       const traces = modifiedData.map((data, index) => ({
//         x: data.data.map(d => d.bendingMomentX),
//         y: data.data.map(d => d.bendingMomentY),
//         text: data.data.map(d => `(${d.bendingMomentX}, ${d.bendingMomentY})`),
//         mode: 'markers',
//         type: 'scatter',
//         marker: {
//           symbol: 'diamond',
//           color: plotColors[index % plotColors.length],
//         },
//         hoverinfo: 'none'
//       }));
//       traces.push(horizontalMidpointLine);
//       traces.push(verticalMidpointLine);
  
//       const layout = {
//         title: 'Bending Moments Scatter Plot',
//         xaxis: {
//           title: 'Bending Moment X',
//           zeroline: true,
//           zerolinecolor: 'black',
//           showline: true,
//           showticklabels: true,
//           tickmode: 'auto', // Changed to 'auto' for automatic scaling
//           ticks: 'inside',
//           range: graphLimits,
//           fixedrange: true,
//           layer: 'above traces',
//           nticks: 25, // Number of ticks
//         },
//         yaxis: {
//           title: 'Bending Moment Y',
//           zeroline: true,
//           zerolinecolor: 'black',
//           showline: true,
//           showticklabels: true,
//           tickmode: 'auto', // Changed to 'auto' for automatic scaling
//           ticks: 'inside',
//           range: graphLimits,
//           fixedrange: true,
//           layer: 'above traces',
//           nticks: 25, // Number of ticks
//         },
//         dragmode: false,
//       };
  
//       const config = {
//         responsive: false,
//         displayModeBar: true,
//         displaylogo: false,
//         scrollZoom: true,
//         editable: false,
//         staticPlot: false,
//       };
  
//       if (graphContainer) {
//         requestAnimationFrame(() => {
//           Plotly.newPlot(graphContainer, traces, layout, config);
//         });
//       }
//     }
//   }, [showGraph, graphData, graphLimits]);
  
//   return (
//     <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center ${isVisible ? '' : 'hidden'}`} >
//       <div className="bg-[#aaa8aa] p-1 rounded-md flex flex-col w-full max-w-7xl   overflow-y-auto" onClick={(e) => e.stopPropagation()} >  
//         <Rotatablevalue />
//         <div className="w-full" ref={graphContainerRef} ></div>
//         <button
//           className="absolute top-2 right-2 text-black hover:text-red-600"
//           onClick={() => onClose()}
//         >
//           Close
//         </button>
//         <button
//               className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue mb-4"
//               onClick={handleFolderSelect}
//               style={{width:'100px'}}
//             >
//               Select Folder
//             </button>
//             {selectedFolderFiles.length > 0 && (
//               <div className="max-h-[200px] overflow-y-auto">
//                 <h2 className="text-lg font-bold mb-2">Selected Files:</h2>
//                 <ul className="list-disc list-inside">
//                   {selectedFolderFiles.map((file) => (
//                     <li key={file.name} className="flex items-center">
//                       <input
//                         type="checkbox"
//                         className="form-checkbox text-blue-500 h-5 w-5"
//                         checked={selectedFolderCheckboxes[file.name] || false}
//                         onChange={() => handleCheckboxChange(file)}
//                       />
//                       <span className="ml-2 text-gray-700">{file.name}</span>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             )}
//           </div>
//         {isLoading && (
//           <div className="flex justify-center mt-4">
//             <div className="spinner"></div>
//           </div>
//         )}
//       </div>
   
//   );
// };
// export default PolarPlotStacking;
//"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""

// import React, { useState, useEffect, useRef } from 'react';
// import Dygraph from 'dygraphs';
// import 'dygraphs/dist/dygraph.css';

// const PolarPlot = () => {
//   const graphRef = useRef(null);
//   const [fileData, setFileData] = useState([]); // Data parsed from uploaded files
//   const [selectedFiles, setSelectedFiles] = useState([]); // Files selected by the user
//   const colorPalette = ['#FF0000', '#00FF00', '#0000FF', '#FF00FF', '#00FFFF', '#FFFF00', '#FFA500', '#800080', '#008000']; // Colors for plotting multiple files

//   // Initial static graph setup with crosshair lines
//   useEffect(() => {
//     new Dygraph(graphRef.current, [[0, 0]], {
//       labels: ['Bending moment X', 'Bending moment Y'],
//       drawPoints: true,
//       strokeWidth: 0,
//       underlayCallback: (ctx, area, g) => {
//         // Draw the crosshair lines
//         const centerX = area.x + area.w / 2;
//         const centerY = area.y + area.h / 2;
//         ctx.strokeStyle = 'black';
//         ctx.lineWidth = 2;
//         ctx.beginPath();
//         ctx.moveTo(centerX, area.y);
//         ctx.lineTo(centerX, area.y + area.h);
//         ctx.moveTo(area.x, centerY);
//         ctx.lineTo(area.x + area.w, centerY);
//         ctx.stroke();
//       },
//       axes: {
//         x: { 
//           drawGrid: true, 
//           axisLabelWidth: 50,
//           valueRange: [-90, 90], // Initial range, will update dynamically
//           axisLabelFormatter: (x) => x.toFixed(1), // Format tick labels to one decimal place
//         },
//         y: { 
//           drawGrid: true, 
//           axisLabelWidth: 50,
//           valueRange: [-90, 90], // Initial range, will update dynamically
//           axisLabelFormatter: (y) => y.toFixed(1), // Format tick labels to one decimal place
//         },
//       },
//     });
//   }, []);

//   // Handle folder upload and parse data from each file inside the folder
//   const handleFolderUpload = (e) => {
//     const files = Array.from(e.target.files);
//     files.forEach((file, index) => {
//       const reader = new FileReader();
//       reader.onload = (event) => {
//         const lines = event.target.result.split('\n');
//         const dataStartIndex = lines.findIndex((line) => line.startsWith('Tension;')); // Find data start index

//         if (dataStartIndex !== -1) {
//           const parsedData = lines
//             .slice(dataStartIndex + 2) // Skip headers and units row
//             .map((line) => line.split(';').map(Number))
//             .filter((values) => values.length >= 4 && !values.includes(NaN)); // Ensure valid data

//           setFileData((prev) => [...prev, { file, data: parsedData }]);
//         }
//       };
//       reader.readAsText(file);
//     });
//   };

//   // Handle file checkbox selection
//   const handleFileSelect = (file) => {
//     if (selectedFiles.includes(file)) {
//       setSelectedFiles(selectedFiles.filter((f) => f !== file));
//     } else {
//       setSelectedFiles([...selectedFiles, file]);
//     }
//   };

//   // Update graph data based on selected files
//   useEffect(() => {
//     if (selectedFiles.length > 0) {
//       const combinedData = [];
//       const labels = ['Bending moment X'];
//       const colors = [];
//       let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;

//       selectedFiles.forEach((file, index) => {
//         const fileEntry = fileData.find((f) => f.file === file);
//         if (fileEntry) {
//           const color = colorPalette[index % colorPalette.length];
//           colors.push(color);
//           fileEntry.data.forEach((row, rowIndex) => {
//             if (!combinedData[rowIndex]) combinedData[rowIndex] = [row[2]]; // Initialize X value
//             combinedData[rowIndex][index + 1] = row[3]; // Set Y value for this trace

//             // Track the min/max values for dynamic axis scaling
//             minX = Math.min(minX, row[2]);
//             maxX = Math.max(maxX, row[2]);
//             minY = Math.min(minY, row[3]);
//             maxY = Math.max(maxY, row[3]);
//           });
//           labels.push(file.name);
//         }
//       });

//       // Ensure that the axis range is symmetric around zero
//       const maxAbsX = Math.max(Math.abs(minX), Math.abs(maxX));
//       const maxAbsY = Math.max(Math.abs(minY), Math.abs(maxY));

//       new Dygraph(graphRef.current, combinedData, {
//         labels: labels,
//         drawPoints: true,
//         strokeWidth: 0,
//         colors: colors,
//         pointSize: 3,
//         underlayCallback: (ctx, area, g) => {
//           // Draw the crosshair lines
//           const centerX = area.x + area.w / 2;
//           const centerY = area.y + area.h / 2;
//           ctx.strokeStyle = 'black';
//           ctx.lineWidth = 2;
//           ctx.beginPath();
//           ctx.moveTo(centerX, area.y);
//           ctx.lineTo(centerX, area.y + area.h);
//           ctx.moveTo(area.x, centerY);
//           ctx.lineTo(area.x + area.w, centerY);
//           ctx.stroke();
//         },
//         axes: {
//           x: { 
//             valueRange: [-maxAbsX, maxAbsX], // Symmetric scaling for X axis
//             axisLabelFormatter: (x) => x.toFixed(1), // Format tick labels to one decimal place
//             ticker: (min, max, pixels) => {
//               const range = max - min;
//               const step = range / 9; // 10 tick marks
//               const ticks = [];
//               for (let i = 0; i <= 9; i++) {
//                 const tickValue = min + i * step;
//                 ticks.push({ v: tickValue, label: tickValue.toFixed(1) });
//               }
//               return ticks;
//             }
//           },
//           y: { 
//             valueRange: [-maxAbsY, maxAbsY], // Symmetric scaling for Y axis
//             axisLabelFormatter: (y) => y.toFixed(1), // Format tick labels to one decimal place
//             ticker: (min, max, pixels) => {
//               const range = max - min;
//               const step = range / 9; // 10 tick marks
//               const ticks = [];
//               for (let i = 0; i <= 9; i++) {
//                 const tickValue = min + i * step;
//                 ticks.push({ v: tickValue, label: tickValue.toFixed(1) });
//               }
//               return ticks;
//             }
//           },
//         },
//       });
//     }
//   }, [selectedFiles, fileData]);

//   return (
//     <div >
//       <input type="file" webkitdirectory="" multiple onChange={handleFolderUpload} />
//       <div style={{ display: 'flex', flexDirection: 'column', maxHeight: '200px', overflowY: 'auto' }}>
//         {fileData.map((file, index) => (
//           <label key={index} style={{ display: 'block', marginBottom: '5px' }}>
//             <input
//               type="checkbox"
//               checked={selectedFiles.includes(file.file)}
//               onChange={() => handleFileSelect(file.file)}
//             />
//             {file.file.name}
//           </label>
//         ))}
//       </div>
//       <div ref={graphRef} style={{ width: '800px', height: '400px', border: '1px solid black', marginTop: '20px' }} />
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
//   const [selectedFiles, setSelectedFiles] = useState([]);
//   const graphContainerRef = useRef(null);
//   const [graphData, setGraphData] = useState([]);
//   const [dataStatus, setDataStatus] = useState([]);
//   const [showAngle, setShowAngle] = useState(false);
//   const [angle, setAngle] = useState(0);
//   const [isGeneratingReport, setIsGeneratingReport] = useState(false);
//   const [overallRange, setOverallRange] = useState([-25, 25]);

//   const colorPalette = ['#800080', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF', '#FF0000'];

//   const handleFolderUpload = (e) => {
//     const selectedFiles = Array.from(e.target.files);
//     setFiles(selectedFiles);
//   };

//   const handleFileSelection = (file) => {
//     const reader = new FileReader();
//     reader.onload = (e) => {
//       const fileData = e.target.result;
//       processFileData(fileData, file.name);
//     };
//     reader.readAsText(file);
//   };

//   const processFileData = (fileData, fileName) => {
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
//       // Apply a moving average filter to smooth the data
//       const smoothedData = smoothData(data, 5);
//       setGraphData(prevData => [...prevData, { data: smoothedData, fileName, minX, maxX, minY, maxY }]);
//       setDataStatus(prevStatus => [...prevStatus, 'ALL']);

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

//   const smoothData = (data, windowSize) => {
//     const smoothed = [];
//     for (let i = 0; i < data.length; i++) {
//       const window = data.slice(Math.max(0, i - windowSize), Math.min(data.length, i + windowSize + 1));
//       const avgX = window.reduce((sum, point) => sum + point[0], 0) / window.length;
//       const avgY = window.reduce((sum, point) => sum + point[1], 0) / window.length;
//       smoothed.push([avgX, avgY]);
//     }
//     return smoothed;
//   };

//   const createOrUpdateGraph = () => {
//     if (!graphContainerRef.current) return;

//     const dygraphData = [];
//     const labels = ['X'];
//     const series = {};

//     graphData.forEach((fileData, index) => {
//       labels.push(fileData.fileName);
//       series[fileData.fileName] = {
//         strokeWidth: 2,
//         drawPoints: true,
//         pointSize: 2,
//         highlightCircleSize: 4,
//         color: colorPalette[index % colorPalette.length],
//       };

//       fileData.data.forEach((point, pointIndex) => {
//         if (!dygraphData[pointIndex]) {
//           dygraphData[pointIndex] = [point[0]];
//         }
//         dygraphData[pointIndex][index + 1] = point[1];
//       });
//     });

//     const graphOptions = {
//       labels: labels,
//       series: series,
//       title: 'Polar Plot - Multiple Files',
//       xlabel: 'Bending moment X',
//       ylabel: 'Bending moment Y',
//       drawPoints: true,
//       strokeWidth: 2,
//       pointSize: 2,
//       highlightCircleSize: 4,
//       width: 800,
//       height: 600,
//       gridLineColor: 'lightgray',
//       dateWindow: overallRange,
//       valueRange: overallRange,
//       axes: {
//         x: {
//           axisLabelFormatter: (d) => d.toFixed(3),
//           valueFormatter: (x) => x.toFixed(3),
//           drawGrid: true,
//           independentTicks: true,
//         },
//         y: {
//           axisLabelFormatter: (d) => d.toFixed(3),
//           valueFormatter: (y) => y.toFixed(3),
//           drawGrid: true,
//           independentTicks: true,
//         }
//       },
//       underlayCallback: (canvas, area, g) => {
//         canvas.save();
//         canvas.strokeStyle = 'rgba(0, 0, 0, 0.5)';
//         canvas.lineWidth = 1;

//         const centerX = g.toDomXCoord(0);
//         const centerY = g.toDomYCoord(0);

//         // Vertical line
//         canvas.beginPath();
//         canvas.moveTo(centerX, area.y);
//         canvas.lineTo(centerX, area.y + area.h);
//         canvas.stroke();

//         // Horizontal line
//         canvas.beginPath();
//         canvas.moveTo(area.x, centerY);
//         canvas.lineTo(area.x + area.w, centerY);
//         canvas.stroke();

//         if (showAngle) {
//           canvas.beginPath();
//           canvas.moveTo(centerX, centerY);
//           const angleRad = angle * (Math.PI / 180);
//           const lineLength = Math.max(area.w, area.h);
//           const endX = centerX + lineLength * Math.cos(angleRad);
//           const endY = centerY - lineLength * Math.sin(angleRad);
//           canvas.lineTo(endX, endY);
//           canvas.strokeStyle = 'red';
//           canvas.lineWidth = 2;
//           canvas.stroke();
//         }

//         canvas.restore();
//       },
//       highlightCallback: (event, x, points) => {
//         const existingTooltip = document.querySelector('.tooltip');
//         if (existingTooltip) {
//           existingTooltip.remove();
//         }

//         if (points && points.length > 0) {
//           const tooltip = document.createElement('div');
//           tooltip.className = 'tooltip fixed bg-white border border-gray-300 p-2 rounded shadow-md text-sm';
//           tooltip.style.position = 'absolute';
//           tooltip.style.left = `${event.pageX + 10}px`;
//           tooltip.style.top = `${event.pageY + 10}px`;
//           tooltip.innerHTML = points.map(p => `${p.name}: X: ${p.xval.toFixed(3)}, Y: ${p.yval.toFixed(3)}`).join('<br>');
//           document.body.appendChild(tooltip);

//           const removeTooltip = () => {
//             if (document.body.contains(tooltip)) {
//               document.body.removeChild(tooltip);
//             }
//             graphContainerRef.current.removeEventListener('mouseout', removeTooltip);
//           };

//           graphContainerRef.current.addEventListener('mouseout', removeTooltip);
//         }
//       },
//     };

//     if (graphContainerRef.current.dygraph) {
//       graphContainerRef.current.dygraph.updateOptions({
//         file: dygraphData,
//         ...graphOptions
//       });
//     } else {
//       const dygraph = new Dygraph(graphContainerRef.current, dygraphData, graphOptions);
//       graphContainerRef.current.dygraph = dygraph;
//     }
//   };

//   useEffect(() => {
//     if (graphData.length > 0) {
//       createOrUpdateGraph();
//     }
//   }, [graphData, showAngle, angle, overallRange]);

//   useEffect(() => {
//     setOverallRange([-25, 25]); // Reset range to initial value
//     setGraphData([]);
//     selectedFiles.forEach(file => {
//       handleFileSelection(file);
//     });
//   }, [selectedFiles]);

//   const handleFileToggle = (file) => {
//     setSelectedFiles(prev => {
//       const isSelected = prev.includes(file);
//       if (isSelected) {
//         return prev.filter(f => f !== file);
//       } else if (prev.length < 7) {
//         return [...prev, file];
//       }
//       return prev;
//     });
//   };

//   const handleAngleChange = (value) => {
//     setAngle(value);
//   };

//   const generateReport = async () => {
//     console.log("Starting report generation");
//     setIsGeneratingReport(true);

//     try {
//       const pdf = new jsPDF('l', 'mm', 'a4');
//       const pageWidth = pdf.internal.pageSize.width;
//       const pageHeight = pdf.internal.pageSize.height;
//       const margin = 10;

//       console.log("Capturing graph");
//       const canvas = await html2canvas(graphContainerRef.current);
//       const imgData = canvas.toDataURL('image/png');

//       pdf.addImage(imgData, 'PNG', margin, margin, pageWidth - 2 * margin, pageHeight - 2 * margin - 40);

//       pdf.setFontSize(12);
//       let yPosition = pageHeight - 30;

//       graphData.forEach((data, index) => {
//         const color = colorPalette[index % colorPalette.length];
//         pdf.setTextColor(color);
//         pdf.text(`File ${index + 1}: ${data.fileName}`, margin, yPosition);
//         yPosition += 5;
//       });

//       pdf.save('polar_plot_report.pdf');
//       setIsGeneratingReport(false);
//     } catch (error) {
//       console.error("Error generating report:", error);
//       setIsGeneratingReport(false);
//     }
//   };

//   return (
//     <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center ${isVisible ? '' : 'hidden'}`}>
//       <div className="bg-[#f1f1f1] p-4 rounded-md relative" style={{ width: '100%', maxWidth: '1200px', height: '90%' }} onClick={(e) => e.stopPropagation()}>
//         <div style={{ height: '700px', border: '5px groove lightgray' }}>
//           <h2 className="text-xl font-bold mb-4">Polar Plot - Multiple Files</h2>
//           <div ref={graphContainerRef} style={{ width: '100%', height: '600px' }}></div>
//           <div className="mt-4 flex flex-wrap justify-between">
//             {graphData.map((data, index) => (
//               <div key={index} className="mb-2 flex items-center">
//                 <div style={{ width: '20px', height: '20px', backgroundColor: colorPalette[index % colorPalette.length], marginRight: '5px' }}></div>
//                 <span className="font-bold mr-2">{data.fileName}:</span>
//                 <span>Status: {dataStatus[index] || 'N/A'}</span>
//               </div>
//             ))}
//           </div>
//         </div>
//         <div className="mt-4 flex flex-col border-2 border-gray-800 p-2 rounded-md">
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
//         </div>
//         <div className="mt-4 flex justify-between items-center">
//           <div className="flex items-center">
//             <button
//               onClick={() => setShowAngle(prev => !prev)}
//               className="p-2 text-white bg-purple-600 rounded-md mr-4"
//             >
//               {showAngle ? 'Hide Angle' : 'Show Angle'}
//             </button>
//             {showAngle && (
//               <div className="flex items-center">
//                 <input
//                   type="range"
//                   min="0"
//                   max="360"
//                   value={angle}
//                   onChange={(e) => handleAngleChange(parseInt(e.target.value))}
//                   className="w-32 mr-2"
//                 />
//                 <input
//                   type="text"
//                   value={angle.toFixed(2)}
//                   readOnly
//                   className="p-1 border border-gray-300 rounded-md w-16 text-center"
//                 />
//               </div>
//             )}
//           </div>
//           <button
//             onClick={generateReport}
//             disabled={isGeneratingReport}
//             className="p-2 text-white bg-red-600 rounded-md"
//           >
//             {isGeneratingReport ? 'Generating...' : 'Generate Report'}
//           </button>
//           <button onClick={onClose} className="p-2 text-white bg-gray-800 rounded-md">
//             Close
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PolarPlot;

//""""below code is working correctly using dygraphs """"""""""
// import React, { useEffect, useRef, useState } from 'react';
// import Dygraph from 'dygraphs';
// import html2canvas from 'html2canvas';
// import jsPDF from 'jspdf';

// const PolarPlot = ({ isVisible, onClose }) => {
//   const [files, setFiles] = useState([]);
//   const [selectedFiles, setSelectedFiles] = useState([]);
//   const graphContainerRef = useRef(null);
//   const [graphData, setGraphData] = useState([]);
//   const [dataStatus, setDataStatus] = useState([]);
//   const [showAngle, setShowAngle] = useState(false);
//   const [angle, setAngle] = useState(0);
//   const [showValue, setShowValue] = useState(false);
//   const [lineAngle, setLineAngle] = useState();
//   const [lineLength, setLineLength] = useState(100);
//   const [lineEndpoint, setLineEndpoint] = useState({ x: 0, y: 0 });
//   const [calculatedHypotenuse, setCalculatedHypotenuse] = useState(0);
//   const [isGeneratingReport, setIsGeneratingReport] = useState(false);
//   const [overallRange, setOverallRange] = useState([-25, 25]);

//   const colorPalette = ['#800080', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF', '#FF0000'];
//   const zoomFactor = 1.2;

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

//   const createOrUpdateGraph = () => {
//     const graphContainer = graphContainerRef.current;
  
//     if (graphContainer) {
//       const existingDygraph = graphContainer.dygraph;
      
//       const range = overallRange;

//       const graphOptions = {
//         labels: ['Bending moment X', ...selectedFiles.map(file => file.name)],
//         series: selectedFiles.reduce((acc, file, index) => {
//           acc[file.name] = {
//             strokeWidth: 0,
//             drawPoints: true,
//             pointSize: 3,
//             highlightCircleSize: 5,
//             color: colorPalette[index % colorPalette.length],
//           };
//           return acc;
//         }, {}),
//         title: 'Polar Plot',
//         showLabelsOnHighlight: false,
//         xlabel: 'Bending moment X',
//         ylabel: 'Bending moment Y',
//         ylabelWidth: 100,
//         drawPoints: true,
//         strokeWidth: 0,
//         pointSize: 3,
//         highlightCircleSize: 5,
//         colors: colorPalette.slice(0, selectedFiles.length),
//         width: 900,
//         height: 900,
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
//           canvas.save();
//           canvas.strokeStyle = 'rgba(0, 0, 0, 0.5)';
//           canvas.lineWidth = 1;

//           const centerX = g.toDomXCoord(0);
//           const centerY = g.toDomYCoord(0);

//           canvas.beginPath();
//           canvas.moveTo(centerX, area.y);
//           canvas.lineTo(centerX, area.y + area.h);
//           canvas.stroke();

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
//             tooltip.innerHTML = points.map(p => `${p.name}: X: ${p.xval.toFixed(3)}, Y: ${p.yval.toFixed(3)}`).join('<br>');
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
          
//           if (showAngle) {
//             ctx.beginPath();
//             ctx.moveTo(centerX, centerY);
//             const angleRad = angle * (Math.PI / 180);
//             const lineLength = 400;
//             const endX = centerX + lineLength * Math.cos(angleRad);
//             const endY = centerY - lineLength * Math.sin(angleRad);
//             ctx.lineTo(endX, endY);
//             ctx.strokeStyle = 'red';
//             ctx.lineWidth = 2;
//             ctx.stroke();
//           }

//           if (showValue) {
//             ctx.beginPath();
//             ctx.moveTo(centerX, centerY);
//             const angleRad = lineAngle * (Math.PI / 180);
//             const endX = centerX + lineLength * Math.cos(angleRad);
//             const endY = centerY - lineLength * Math.sin(angleRad);
//             ctx.lineTo(endX, endY);
//             ctx.strokeStyle = 'black';
//             ctx.lineWidth = 2;
//             ctx.stroke();

//             const xValue = lineLength * Math.cos(angleRad);
//             const yValue = lineLength * Math.sin(angleRad);
//             setLineEndpoint({ x: xValue, y: yValue });

//             const calculatedHyp = Math.sqrt(Math.pow(xValue, 2) + Math.pow(yValue, 2));
//             setCalculatedHypotenuse(calculatedHyp);
//           }
//         }
//       };

//       const dygraphData = selectedFiles.flatMap((file, fileIndex) => {
//         const fileData = graphData[fileIndex];
//         if (!fileData || !fileData.data) return [];
        
//         return fileData.data.map(point => {
//           if (Array.isArray(point) && point.length === 2) {
//             return [point[0], ...Array(fileIndex).fill(null), point[1], ...Array(selectedFiles.length - fileIndex - 1).fill(null)];
//           } else if (typeof point === 'object' && 'x' in point && 'y' in point) {
//             return [point.x, ...Array(fileIndex).fill(null), point.y, ...Array(selectedFiles.length - fileIndex - 1).fill(null)];
//           } else {
//             console.error('Invalid data point:', point);
//             return null;
//           }
//         }).filter(point => point !== null);
//       });

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
//     }
//   };

//   useEffect(() => {
//     createOrUpdateGraph();
//   }, [graphData, showAngle, angle, showValue, lineAngle, lineLength, overallRange, selectedFiles]);

//   useEffect(() => {
//     setOverallRange([-25, 25]);
//     const newGraphData = [];
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
//       } else if (prev.length < 7) {
//         newSelectedFiles = [...prev, file];
//       } else {
//         alert("You can select a maximum of 7 files.");
//         return prev;
//       }
      
//       const newGraphData = [];
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

//   const generateReport = async () => {
//     console.log("Starting report generation");
//     setIsGeneratingReport(true);

//     try {
//       const pdf = new jsPDF('l', 'mm', 'a4');
//       const pageWidth = pdf.internal.pageSize.width;
//       const pageHeight = pdf.internal.pageSize.height;
//       const margin = 10;
//       const graphWidth = pageWidth - 2 * margin;
//       const graphHeight = pageHeight - 2 * margin;

//       const graphContainer = graphContainerRef.current;

//       if (!graphContainer) {
//         console.log("Graph container not found");
//         return;
//       }

//       console.log("Capturing graph");
//       const canvas = await html2canvas(graphContainer);
//       const imgData = canvas.toDataURL('image/png');

//       pdf.addImage(imgData, 'PNG', margin, margin, graphWidth, graphHeight - 50);

//       pdf.setFontSize(12);
//       pdf.text("Polar Plot Report", margin, margin - 5);

//       let yPosition = pageHeight - 45;

//       selectedFiles.forEach((file, index) => {
//         const fileData = graphData[index];
//         if (fileData) {
//           pdf.setFontSize(10);
//           pdf.text(`File ${index + 1}: ${fileData.fileName}`, margin, yPosition);
//           pdf.setFontSize(8);
//           pdf.text(`Status: ${dataStatus[index] || 'N/A'}`, margin + 100, yPosition);
//           yPosition += 5;
//         }
//       });

//       if (showAngle) {
//         pdf.text(`Angle: ${angle.toFixed(2)}°`, margin, yPosition);
//         yPosition += 5;
//       }

//       if (showValue) {
//         pdf.text(`Line Angle: ${lineAngle.toFixed(2)}°`, margin, yPosition);
//         pdf.text(`Line Length: ${lineLength.toFixed(2)}`, margin + 60, yPosition);
//         yPosition += 5;
// pdf.text(`Endpoint: (${lineEndpoint.x.toFixed(2)}, ${lineEndpoint.y.toFixed(2)})`, margin, yPosition);
//         pdf.text(`Calculated Value: ${calculatedHypotenuse.toFixed(2)}`, margin + 100, yPosition);
//       }

//       pdf.save('polar_plot_report.pdf');
//       setIsGeneratingReport(false);
//     } catch (error) {
//       console.error("Error generating report:", error);
//       setIsGeneratingReport(false);
//     }
//   };

//   return (
//     <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center ${isVisible ? '' : 'hidden'}`}>
//       <div className="bg-white p-6 rounded-lg shadow-xl max-w-7xl max-h-[90vh] overflow-y-auto">
//         <h2 className="text-2xl font-bold mb-4">Polar Plot</h2>
        
//         <div className="mb-4">
//           <input
//             type="file"
//             webkitdirectory="true"
//             directory="true"
//             multiple
//             onChange={handleFolderUpload}
//             className="mb-2"
//           />
//           <div className="flex flex-wrap gap-2">
//             {files.map((file, index) => (
//               <label key={index} className="flex items-center space-x-2">
//                 <input
//                   type="checkbox"
//                   checked={selectedFiles.includes(file)}
//                   onChange={() => handleFileToggle(file)}
//                   className="form-checkbox"
//                 />
//                 <span className={`${selectedFiles.includes(file) ? 'text-blue-500 font-semibold' : 'text-gray-700'}`}>
//                   {file.name}
//                 </span>
//               </label>
//             ))}
//           </div>
//         </div>

//         <div ref={graphContainerRef} style={{ width: '900px', height: '900px' }}></div>

//         <div className="mt-4 space-y-2">
//           <div>
//             <label className="mr-2">
//               <input
//                 type="checkbox"
//                 checked={showAngle}
//                 onChange={(e) => setShowAngle(e.target.checked)}
//               />
//               Show Angle
//             </label>
//             {showAngle && (
//               <input
//                 type="number"
//                 value={angle}
//                 onChange={(e) => setAngle(parseFloat(e.target.value))}
//                 className="ml-2 w-20 border rounded px-2 py-1"
//               />
//             )}
//           </div>
//           <div>
//             <label className="mr-2">
//               <input
//                 type="checkbox"
//                 checked={showValue}
//                 onChange={(e) => setShowValue(e.target.checked)}
//               />
//               Show Value
//             </label>
//             {showValue && (
//               <>
//                 <input
//                   type="number"
//                   value={lineAngle}
//                   onChange={(e) => setLineAngle(parseFloat(e.target.value))}
//                   placeholder="Angle"
//                   className="ml-2 w-20 border rounded px-2 py-1"
//                 />
//                 <input
//                   type="number"
//                   value={lineLength}
//                   onChange={(e) => setLineLength(parseFloat(e.target.value))}
//                   placeholder="Length"
//                   className="ml-2 w-20 border rounded px-2 py-1"
//                 />
//               </>
//             )}
//           </div>
//           {showValue && (
//             <div>
//               <p>Endpoint: ({lineEndpoint.x.toFixed(2)}, {lineEndpoint.y.toFixed(2)})</p>
//               <p>Calculated Value: {calculatedHypotenuse.toFixed(2)}</p>
//             </div>
//           )}
//         </div>

//         <button
//           onClick={generateReport}
//           disabled={isGeneratingReport}
//           className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
//         >
//           {isGeneratingReport ? 'Generating Report...' : 'Generate Report'}
//         </button>

//         <button
//           onClick={onClose}
//           className="mt-4 ml-4 px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
//         >
//           Close
//         </button>
//       </div>
//     </div>
//   );
// };

// export default PolarPlot;

//'''''''''thsi''''''''''''''
// import React, { useEffect, useRef, useState } from 'react';
// import Dygraph from 'dygraphs';
// import html2canvas from 'html2canvas';
// import jsPDF from 'jspdf';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const PolarPlot = ({ isVisible, onClose }) => {
//   const [files, setFiles] = useState([]);
//   const [selectedFiles, setSelectedFiles] = useState([]);
//   const graphContainerRef = useRef(null);
//   const [graphData, setGraphData] = useState([]);
//   const [dataStatus, setDataStatus] = useState([]);
//   const [showAngle, setShowAngle] = useState(false);
//   const [angle, setAngle] = useState(0);
//   const [showValue, setShowValue] = useState(false);
//   const [valueLineAngle, setValueLineAngle] = useState(0);
//   const [valueLineLength, setValueLineLength] = useState(100);
//   const [valueLineEndpoint, setValueLineEndpoint] = useState({ x: 0, y: 0 });
//   const [calculatedHypotenuse, setCalculatedHypotenuse] = useState(0);
//   const [isGeneratingReport, setIsGeneratingReport] = useState(false);
//   const [overallRange, setOverallRange] = useState([-25, 25]);

//   const colorPalette = ['#800080', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF', '#FF0000'];
//   const zoomFactor = 1.2;

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

//   const createOrUpdateGraph = () => {
//     const graphContainer = graphContainerRef.current;
  
//     if (graphContainer) {
//       const existingDygraph = graphContainer.dygraph;
      
//       const range = overallRange;

//       const graphOptions = {
//         labels: ['Bending moment X', ...selectedFiles.map(file => file.name)],
//         series: selectedFiles.reduce((acc, file, index) => {
//           acc[file.name] = {
//             strokeWidth: 0,
//             drawPoints: true,
//             pointSize: 3,
//             highlightCircleSize: 5,
//             color: colorPalette[index % colorPalette.length],
//           };
//           return acc;
//         }, {}),
//         title: 'Polar Plot',
//         showLabelsOnHighlight: false,
//         xlabel: 'Bending moment X',
//         ylabel: 'Bending moment Y',
//         ylabelWidth: 100,
//         drawPoints: true,
//         strokeWidth: 0,
//         pointSize: 3,
//         highlightCircleSize: 5,
//         colors: colorPalette.slice(0, selectedFiles.length),
//         width: 900,
//         height: 900,
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
//           canvas.save();
//           canvas.strokeStyle = 'rgba(0, 0, 0, 0.5)';
//           canvas.lineWidth = 1;

//           const centerX = g.toDomXCoord(0);
//           const centerY = g.toDomYCoord(0);

//           canvas.beginPath();
//           canvas.moveTo(centerX, area.y);
//           canvas.lineTo(centerX, area.y + area.h);
//           canvas.stroke();

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
//             tooltip.innerHTML = points.map(p => `${p.name}: X: ${p.xval.toFixed(3)}, Y: ${p.yval.toFixed(3)}`).join('<br>');
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
          
//           if (showAngle) {
//             ctx.beginPath();
//             ctx.moveTo(centerX, centerY);
//             const angleRad = angle * (Math.PI / 180);
//             const lineLength = 400;
//             const endX = centerX + lineLength * Math.cos(angleRad);
//             const endY = centerY - lineLength * Math.sin(angleRad);
//             ctx.lineTo(endX, endY);
//             ctx.strokeStyle = 'red';
//             ctx.lineWidth = 4;
//             ctx.stroke();
//           }

//           if (showValue) {
//             ctx.beginPath();
//             ctx.moveTo(centerX, centerY);
//             const angleRad = valueLineAngle * (Math.PI / 180);
//             const endX = centerX + valueLineLength * Math.cos(angleRad);
//             const endY = centerY - valueLineLength * Math.sin(angleRad);
//             ctx.lineTo(endX, endY);
//             ctx.strokeStyle = 'black';
//             ctx.lineWidth = 4;
//             ctx.stroke();

//             const xValue = valueLineLength * Math.cos(angleRad);
//             const yValue = valueLineLength * Math.sin(angleRad);
//             setValueLineEndpoint({ x: xValue, y: yValue });

//             const calculatedHyp = Math.sqrt(Math.pow(xValue, 2) + Math.pow(yValue, 2));
//             setCalculatedHypotenuse(calculatedHyp);
//           }
//         }
//       };

//       const dygraphData = selectedFiles.flatMap((file, fileIndex) => {
//         const fileData = graphData[fileIndex];
//         if (!fileData || !fileData.data) return [];
        
//         return fileData.data.map(point => {
//           if (Array.isArray(point) && point.length === 2) {
//             return [point[0], ...Array(fileIndex).fill(null), point[1], ...Array(selectedFiles.length - fileIndex - 1).fill(null)];
//           } else if (typeof point === 'object' && 'x' in point && 'y' in point) {
//             return [point.x, ...Array(fileIndex).fill(null), point.y, ...Array(selectedFiles.length - fileIndex - 1).fill(null)];
//           } else {
//             console.error('Invalid data point:', point);
//             return null;
//           }
//         }).filter(point => point !== null);
//       });

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
//     }
//   };

//   useEffect(() => {
//     createOrUpdateGraph();
//   }, [graphData, showAngle, angle, showValue, valueLineAngle, valueLineLength, overallRange, selectedFiles]);

//   useEffect(() => {
//     setOverallRange([-25, 25]);
//     const newGraphData = [];
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
//       } else if (prev.length < 5) {
//         newSelectedFiles = [...prev, file];
//       } else {
//         toast.warning("You can select a maximum of 5 files.");
//         return prev;
//       }
      
//       const newGraphData = [];
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

//   const generateReport = async () => {
//     console.log("Starting report generation");
//     setIsGeneratingReport(true);

//     try {
//       const pdf = new jsPDF('l', 'mm', 'a4');
//       const pageWidth = pdf.internal.pageSize.width;
//       const pageHeight = pdf.internal.pageSize.height;
//       const margin = 10;
//       const graphWidth = pageWidth - 2 * margin;
//       const graphHeight = pageHeight - 2 * margin;

//       const graphContainer = graphContainerRef.current;

//       if (!graphContainer) {
//         console.log("Graph container not found");
//         return;
//       }

//       console.log("Capturing graph");
//       const canvas = await html2canvas(graphContainer);
//       const imgData = canvas.toDataURL('image/png');

//       pdf.addImage(imgData, 'PNG', margin, margin, graphWidth, graphHeight - 50);

//       pdf.setFontSize(12);
//       pdf.text("Polar Plot Report", margin, margin - 5);

//       let yPosition = pageHeight - 45;

//       selectedFiles.forEach((file, index) => {
//         const fileData = graphData[index];
//         if (fileData) {
//           pdf.setFontSize(10);
//           pdf.text(`File ${index + 1}: ${fileData.fileName}`, margin, yPosition);
//           pdf.setFontSize(8);
//           pdf.text(`Status: ${dataStatus[index] || 'N/A'}`, margin + 100, yPosition);
//           yPosition += 5;
//         }
//       });

//       if (showAngle) {
//         pdf.text(`Angle: ${angle.toFixed(2)}°`, margin, yPosition);
//         yPosition += 5;
//       }

//       if (showValue) {
//         pdf.text(`Value Line Angle: ${valueLineAngle.toFixed(2)}°`, margin, yPosition);
//     pdf.text(`Value Line Length: ${valueLineLength.toFixed(2)}`, margin + 60, yPosition);
//         yPosition += 5;
//         pdf.text(`Value Line Endpoint: (${valueLineEndpoint.x.toFixed(2)}, ${valueLineEndpoint.y.toFixed(2)})`, margin, yPosition);
//         pdf.text(`Calculated Hypotenuse: ${calculatedHypotenuse.toFixed(2)}`, margin + 100, yPosition);
//       }

//       pdf.save('polar_plot_report.pdf');
//       setIsGeneratingReport(false);
//     } catch (error) {
//       console.error("Error generating report:", error);
//       setIsGeneratingReport(false);
//     }
//   };

//   const handleAngleChange = (e) => {
//     const newAngle = parseFloat(e.target.value);
//     setAngle(newAngle);
//   };

//   const handleValueLineAngleChange = (e) => {
//     const newAngle = parseFloat(e.target.value);
//     setValueLineAngle(newAngle);
//     updateValueLine(newAngle, valueLineLength);
//   };

//   const handleValueLineLengthChange = (e) => {
//     const newLength = parseFloat(e.target.value);
//     setValueLineLength(newLength);
//     updateValueLine(valueLineAngle, newLength);
//   };

//   const updateValueLine = (angle, length) => {
//     const angleRad = angle * (Math.PI / 180);
//     const x = length * Math.cos(angleRad);
//     const y = length * Math.sin(angleRad);
//     setValueLineEndpoint({ x, y });
//     setCalculatedHypotenuse(Math.sqrt(x * x + y * y));
//   };

//   return (
//     <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center ${isVisible ? '' : 'hidden'}`}>
//       <div className="bg-white p-6 rounded-lg shadow-xl max-w-7xl max-h-[90vh] overflow-y-auto">
//         <h2 className="text-2xl font-bold mb-4">Polar Plot</h2>
        
//         <div className="mb-4">
//           <input
//             type="file"
//             webkitdirectory="true"
//             directory="true"
//             multiple
//             onChange={handleFolderUpload}
//             className="mb-2"
//           />
//           <div className="flex flex-wrap gap-2">
//             {files.map((file, index) => (
//               <label key={index} className="flex items-center space-x-2">
//                 <input
//                   type="checkbox"
//                   checked={selectedFiles.includes(file)}
//                   onChange={() => handleFileToggle(file)}
//                   className="form-checkbox"
//                 />
//                 <span className={`${selectedFiles.includes(file) ? 'text-blue-500 font-semibold' : 'text-gray-700'}`}>
//                   {file.name}
//                 </span>
//               </label>
//             ))}
//           </div>
//         </div>

//         <div ref={graphContainerRef} style={{ width: '900px', height: '900px' }}></div>

//         <div className="mt-4 space-y-2">
//           <div>
//             <label className="mr-2">
//               <input
//                 type="checkbox"
//                 checked={showAngle}
//                 onChange={(e) => setShowAngle(e.target.checked)}
//               />
//               Show Angle
//             </label>
//             {showAngle && (
//               <div className="flex items-center">
//                 <input
//                   type="range"
//                   min="0"
//                   max="360"
//                   value={angle}
//                   onChange={handleAngleChange}
//                   className="mr-2"
//                 />
//                 <input
//                   type="number"
//                   value={angle}
//                   onChange={(e) => setAngle(parseFloat(e.target.value))}
//                   className="w-20 border rounded px-2 py-1"
//                 />
//                 <span className="ml-2">{angle.toFixed(2)}°</span>
//               </div>
//             )}
//           </div>
//           <div>
//             <label className="mr-2">
//               <input
//                 type="checkbox"
//                 checked={showValue}
//                 onChange={(e) => setShowValue(e.target.checked)}
//               />
//               Show Value
//             </label>
//             {showValue && (
//               <>
//                 <div className="flex items-center mt-2">
//                   <span className="mr-2">Angle:</span>
//                   <input
//                     type="range"
//                     min="0"
//                     max="360"
//                     value={valueLineAngle}
//                     onChange={handleValueLineAngleChange}
//                     className="mr-2"
//                   />
//                   <input
//                     type="number"
//                     value={valueLineAngle}
//                     onChange={(e) => setValueLineAngle(parseFloat(e.target.value))}
//                     className="w-20 border rounded px-2 py-1"
//                   />
//                   <span className="ml-2">{valueLineAngle.toFixed(2)}°</span>
//                 </div>
//                 <div className="flex items-center mt-2">
//                   <span className="mr-2">Length:</span>
//                   <input
//                     type="range"
//                     min="0"
//                     max="450"
//                     value={valueLineLength}
//                     onChange={handleValueLineLengthChange}
//                     className="mr-2"
//                   />
//                   <input
//                     type="number"
//                     value={valueLineLength}
//                     onChange={(e) => setValueLineLength(parseFloat(e.target.value))}
//                     className="w-20 border rounded px-2 py-1"
//                   />
//                 </div>
//               </>
//             )}
//           </div>
//           {showValue && (
//             <div>
//               <p>Endpoint: ({valueLineEndpoint.x.toFixed(2)}, {valueLineEndpoint.y.toFixed(2)})</p>
//               <p>Calculated Hypotenuse: {calculatedHypotenuse.toFixed(2)}</p>
//             </div>
//           )}
//         </div>

//         <button
//           onClick={generateReport}
//           disabled={isGeneratingReport}
//           className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
//         >
//           {isGeneratingReport ? 'Generating Report...' : 'Generate Report'}
//         </button>

//         <button
//           onClick={onClose}
//           className="mt-4 ml-4 px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
//         >
//           Close
//         </button>
//       </div>
//       <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
//     </div>
//   );
// };

// export default PolarPlot;


// import React, { useEffect, useRef, useState } from 'react';
// import Dygraph from 'dygraphs';
// import html2canvas from 'html2canvas';
// import jsPDF from 'jspdf';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const PolarPlot = ({ isVisible, onClose }) => {
//   const [files, setFiles] = useState([]);
//   const [selectedFiles, setSelectedFiles] = useState([]);
//   const graphContainerRef = useRef(null);
//   const [graphData, setGraphData] = useState([]);
//   const [dataStatus, setDataStatus] = useState([]);
//   const [showAngle, setShowAngle] = useState(false);
//   const [angle, setAngle] = useState(0);
//   const [showValue, setShowValue] = useState(false);
//   const [valueLineAngle, setValueLineAngle] = useState(0);
//   const [valueLineLength, setValueLineLength] = useState(100);
//   const [valueLineEndpoint, setValueLineEndpoint] = useState({ x: 0, y: 0 });
//   const [calculatedHypotenuse, setCalculatedHypotenuse] = useState(0);
//   const [isGeneratingReport, setIsGeneratingReport] = useState(false);
//   const [overallRange, setOverallRange] = useState([-25, 25]);

//   const colorPalette = ['#800080', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF', '#FF0000'];
//   const zoomFactor = 1.2;

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

//   const createOrUpdateGraph = () => {
//     const graphContainer = graphContainerRef.current;
  
//     if (graphContainer) {
//       const existingDygraph = graphContainer.dygraph;
      
//       const range = overallRange;
  
//       const graphOptions = {
//         labels: ['Bending moment X', ...selectedFiles.map(file => file.name)],
//         series: selectedFiles.reduce((acc, file, index) => {
//           acc[file.name] = {
//             strokeWidth: 0,
//             drawPoints: true,
//             pointSize: 3,
//             highlightCircleSize: 5,
//             color: colorPalette[index % colorPalette.length],
//           };
//           return acc;
//         }, {}),
//         title: 'Polar Plot',
//         showLabelsOnHighlight: false,
//         xlabel: 'Bending moment X',
//         ylabel: 'Bending moment Y',
//         ylabelWidth: 100,
//         drawPoints: true,
//         strokeWidth: 0,
//         pointSize: 3,
//         highlightCircleSize: 5,
//         colors: colorPalette.slice(0, selectedFiles.length),
//         width: 900,
//         height: 900,
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
//           canvas.save();
//           canvas.strokeStyle = 'rgba(0, 0, 0, 0.5)';
//           canvas.lineWidth = 1;
  
//           const centerX = g.toDomXCoord(0);
//           const centerY = g.toDomYCoord(0);
  
//           canvas.beginPath();
//           canvas.moveTo(centerX, area.y);
//           canvas.lineTo(centerX, area.y + area.h);
//           canvas.stroke();
  
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
//             tooltip.innerHTML = points.map(p => `${p.name}: X: ${p.xval.toFixed(3)}, Y: ${p.yval.toFixed(3)}`).join('<br>');
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
          
//           if (showAngle) {
//             ctx.beginPath();
//             ctx.moveTo(centerX, centerY);
//             const angleRad = angle * (Math.PI / 180);
//             const lineLength = 400;
//             const endX = centerX + lineLength * Math.cos(angleRad);
//             const endY = centerY - lineLength * Math.sin(angleRad);
//             ctx.lineTo(endX, endY);
//             ctx.strokeStyle = 'red';
//             ctx.lineWidth = 4;
//             ctx.stroke();
//           }
  
//           if (showValue) {
//             ctx.beginPath();
//             ctx.moveTo(centerX, centerY);
//             const angleRad = valueLineAngle * (Math.PI / 180);
//             const endX = centerX + valueLineLength * Math.cos(angleRad);
//             const endY = centerY - valueLineLength * Math.sin(angleRad);
//             ctx.lineTo(endX, endY);
//             ctx.strokeStyle = 'black';
//             ctx.lineWidth = 4;
//             ctx.stroke();
  
//             const xValue = valueLineLength * Math.cos(angleRad);
//             const yValue = valueLineLength * Math.sin(angleRad);
//             setValueLineEndpoint({ x: xValue, y: yValue });
  
//             const calculatedHyp = Math.sqrt(Math.pow(xValue, 2) + Math.pow(yValue, 2));
//             setCalculatedHypotenuse(calculatedHyp);
//           }
//         }
//       };
  
//       // Reverse the order of selectedFiles to plot first selected file in front
//       const reversedSelectedFiles = [...selectedFiles].reverse();
  
//       const dygraphData = reversedSelectedFiles.flatMap((file, reversedIndex) => {
//         const fileIndex = selectedFiles.length - 1 - reversedIndex;
//         const fileData = graphData[fileIndex];
//         if (!fileData || !fileData.data) return [];
        
//         return fileData.data.map(point => {
//           if (Array.isArray(point) && point.length === 2) {
//             return [point[0], ...Array(reversedIndex).fill(null), point[1], ...Array(selectedFiles.length - reversedIndex - 1).fill(null)];
//           } else if (typeof point === 'object' && 'x' in point && 'y' in point) {
//             return [point.x, ...Array(reversedIndex).fill(null), point.y, ...Array(selectedFiles.length - reversedIndex - 1).fill(null)];
//           } else {
//             console.error('Invalid data point:', point);
//             return null;
//           }
//         }).filter(point => point !== null);
//       });
  
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
//     }
//   };
//   useEffect(() => {
//     createOrUpdateGraph();
//   }, [graphData, showAngle, angle, showValue, valueLineAngle, valueLineLength, overallRange, selectedFiles]);

//   useEffect(() => {
//     setOverallRange([-25, 25]);
//     const newGraphData = [];
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
//       } else if (prev.length < 5) {
//         newSelectedFiles = [...prev, file];
//       } else {
//         toast.warning("You can select a maximum of 5 files.");
//         return prev;
//       }
      
//       const newGraphData = [];
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

//   const generateReport = async () => {
//     console.log("Starting report generation");
//     setIsGeneratingReport(true);

//     try {
//       const pdf = new jsPDF('l', 'mm', 'a4');
//       const pageWidth = pdf.internal.pageSize.width;
//       const pageHeight = pdf.internal.pageSize.height;
//       const margin = 10;
//       const graphWidth = pageWidth - 2 * margin;
//       const graphHeight = pageHeight - 2 * margin;

//       const graphContainer = graphContainerRef.current;

//       if (!graphContainer) {
//         console.log("Graph container not found");
//         return;
//       }

//       console.log("Capturing graph");
//       const canvas = await html2canvas(graphContainer);
//       const imgData = canvas.toDataURL('image/png');

//       pdf.addImage(imgData, 'PNG', margin, margin, graphWidth, graphHeight - 50);

//       pdf.setFontSize(12);
//       pdf.text("Polar Plot Report", margin, margin - 5);

//       let yPosition = pageHeight - 45;

//       selectedFiles.forEach((file, index) => {
//         const fileData = graphData[index];
//         if (fileData) {
//           pdf.setFontSize(10);
//           pdf.text(`File ${index + 1}: ${fileData.fileName}`, margin, yPosition);
//           pdf.setFontSize(8);
//           pdf.text(`Status: ${dataStatus[index] || 'N/A'}`, margin + 100, yPosition);
//           yPosition += 5;
//         }
//       });

//       if (showAngle) {
//         pdf.text(`Angle: ${angle.toFixed(2)}°`, margin, yPosition);
//         yPosition += 5;
//       }

//       if (showValue) {
//         pdf.text(`Value Line Angle: ${valueLineAngle.toFixed(2)}°`, margin, yPosition);
//     pdf.text(`Value Line Length: ${valueLineLength.toFixed(2)}`, margin + 60, yPosition);
//         yPosition += 5;
//         pdf.text(`Value Line Endpoint: (${valueLineEndpoint.x.toFixed(2)}, ${valueLineEndpoint.y.toFixed(2)})`, margin, yPosition);
//         pdf.text(`Calculated Hypotenuse: ${calculatedHypotenuse.toFixed(2)}`, margin + 100, yPosition);
//       }

//       pdf.save('polar_plot_report.pdf');
//       setIsGeneratingReport(false);
//     } catch (error) {
//       console.error("Error generating report:", error);
//       setIsGeneratingReport(false);
//     }
//   };

//   const handleAngleChange = (e) => {
//     const newAngle = parseFloat(e.target.value);
//     setAngle(newAngle);
//   };

//   const handleValueLineAngleChange = (e) => {
//     const newAngle = parseFloat(e.target.value);
//     setValueLineAngle(newAngle);
//     updateValueLine(newAngle, valueLineLength);
//   };

//   const handleValueLineLengthChange = (e) => {
//     const newLength = parseFloat(e.target.value);
//     setValueLineLength(newLength);
//     updateValueLine(valueLineAngle, newLength);
//   };

//   const updateValueLine = (angle, length) => {
//     const angleRad = angle * (Math.PI / 180);
//     const x = length * Math.cos(angleRad);
//     const y = length * Math.sin(angleRad);
//     setValueLineEndpoint({ x, y });
//     setCalculatedHypotenuse(Math.sqrt(x * x + y * y));
//   };

//   return (
//     <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center ${isVisible ? '' : 'hidden'}`}>
//       <div className="bg-white p-6 rounded-lg shadow-xl max-w-7xl max-h-[90vh] overflow-y-auto">
//         <h2 className="text-2xl font-bold mb-4">Polar Plot</h2>
        
//         <div className="mb-4">
//           <input
//             type="file"
//             webkitdirectory="true"
//             directory="true"
//             multiple
//             onChange={handleFolderUpload}
//             className="mb-2"
//           />
//           <div className="flex flex-wrap gap-2">
//             {files.map((file, index) => (
//               <label key={index} className="flex items-center space-x-2">
//                 <input
//                   type="checkbox"
//                   checked={selectedFiles.includes(file)}
//                   onChange={() => handleFileToggle(file)}
//                   className="form-checkbox"
//                 />
//                 <span className={`${selectedFiles.includes(file) ? 'text-blue-500 font-semibold' : 'text-gray-700'}`}>
//                   {file.name}
//                 </span>
//               </label>
//             ))}
//           </div>
//         </div>

//         <div ref={graphContainerRef} style={{ width: '900px', height: '900px' }}></div>

//         <div className="mt-4 space-y-2">
//           <div>
//             <label className="mr-2">
//               <input
//                 type="checkbox"
//                 checked={showAngle}
//                 onChange={(e) => setShowAngle(e.target.checked)}
//               />
//               Show Angle
//             </label>
//             {showAngle && (
//               <div className="flex items-center">
//                 <input
//                   type="range"
//                   min="0"
//                   max="360"
//                   value={angle}
//                   onChange={handleAngleChange}
//                   className="mr-2"
//                 />
//                 <input
//                   type="number"
//                   value={angle}
//                   onChange={(e) => setAngle(parseFloat(e.target.value))}
//                   className="w-20 border rounded px-2 py-1"
//                 />
//                 <span className="ml-2">{angle.toFixed(2)}°</span>
//               </div>
//             )}
//           </div>
//           <div>
//             <label className="mr-2">
//               <input
//                 type="checkbox"
//                 checked={showValue}
//                 onChange={(e) => setShowValue(e.target.checked)}
//               />
//               Show Value
//             </label>
//             {showValue && (
//               <>
//                 <div className="flex items-center mt-2">
//                   <span className="mr-2">Angle:</span>
//                   <input
//                     type="range"
//                     min="0"
//                     max="360"
//                     value={valueLineAngle}
//                     onChange={handleValueLineAngleChange}
//                     className="mr-2"
//                   />
//                   <input
//                     type="number"
//                     value={valueLineAngle}
//                     onChange={(e) => setValueLineAngle(parseFloat(e.target.value))}
//                     className="w-20 border rounded px-2 py-1"
//                   />
//                   <span className="ml-2">{valueLineAngle.toFixed(2)}°</span>
//                 </div>
//                 <div className="flex items-center mt-2">
//                   <span className="mr-2">Length:</span>
//                   <input
//                     type="range"
//                     min="0"
//                     max="450"
//                     value={valueLineLength}
//                     onChange={handleValueLineLengthChange}
//                     className="mr-2"
//                   />
//                   <input
//                     type="number"
//                     value={valueLineLength}
//                     onChange={(e) => setValueLineLength(parseFloat(e.target.value))}
//                     className="w-20 border rounded px-2 py-1"
//                   />
//                 </div>
//               </>
//             )}
//           </div>
//           {showValue && (
//             <div>
//               <p>Endpoint: ({valueLineEndpoint.x.toFixed(2)}, {valueLineEndpoint.y.toFixed(2)})</p>
//               <p>Calculated Hypotenuse: {calculatedHypotenuse.toFixed(2)}</p>
//             </div>
//           )}
//         </div>

//         <button
//           onClick={generateReport}
//           disabled={isGeneratingReport}
//           className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
//         >
//           {isGeneratingReport ? 'Generating Report...' : 'Generate Report'}
//         </button>

//         <button
//           onClick={onClose}
//           className="mt-4 ml-4 px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
//         >
//           Close
//         </button>
//       </div>
//       <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
//     </div>
//   );
// };

// export default PolarPlot;



//final polarstacking  code
// import React, { useEffect, useRef, useState } from 'react';
// import Dygraph from 'dygraphs';
// import html2canvas from 'html2canvas';
// import jsPDF from 'jspdf';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const PolarPlot = ({ isVisible, onClose }) => {
//   const [files, setFiles] = useState([]);
//   const [selectedFiles, setSelectedFiles] = useState([]);
//   const graphContainerRef = useRef(null);
//   const [graphData, setGraphData] = useState([]);
//   const [dataStatus, setDataStatus] = useState([]);
//   const [showAngle, setShowAngle] = useState(false);
//   const [angle, setAngle] = useState(0);
//   const [showValue, setShowValue] = useState(false);
//   const [valueLineAngle, setValueLineAngle] = useState(0);
//   const [valueLineLength, setValueLineLength] = useState(100);
//   const [valueLineEndpoint, setValueLineEndpoint] = useState({ x: 0, y: 0 });
//   const [calculatedHypotenuse, setCalculatedHypotenuse] = useState(0);
//   const [isGeneratingReport, setIsGeneratingReport] = useState(false);
//   const [overallRange, setOverallRange] = useState([-25, 25]);
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [processingFile, setProcessingFile] = useState(null);

//   const colorPalette = ['#800080', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF', '#FF0000'];
//   const zoomFactor = 1.2;

//   const handleFolderUpload = (e) => {
//     const selectedFiles = Array.from(e.target.files);
//     setFiles(selectedFiles);
//   };

//   const handleFileSelection = async (file, index) => {
//     setIsProcessing(true);
//     setProcessingFile(file.name);
//     toast.info(`Processing file: ${file.name}. Please wait...`);

//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         const fileData = e.target.result;
//         processFileData(fileData, file.name, index);
//         resolve();
//       };
//       reader.onerror = (error) => {
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

//   const createOrUpdateGraph = () => {
//     const graphContainer = graphContainerRef.current;
  
//     if (graphContainer) {
//       const existingDygraph = graphContainer.dygraph;
      
//       const range = overallRange;

//       const graphOptions = {
//         labels: ['Bending moment X', ...selectedFiles.map(file => file.name)],
//         series: selectedFiles.reduce((acc, file, index) => {
//           acc[file.name] = {
//             strokeWidth: 0,
//             drawPoints: true,
//             pointSize: 3,
//             highlightCircleSize: 5,
//             color: colorPalette[index % colorPalette.length],
//           };
//           return acc;
//         }, {}),
//         title: 'Polar Plot',
//         showLabelsOnHighlight: false,
//         xlabel: ' ',
//         ylabel: ' ',
//         ylabelWidth: 20,
//         drawPoints: true,
//         strokeWidth: 0,
//         pointSize: 3,
//         highlightCircleSize: 5,
//         colors: colorPalette.slice(0, selectedFiles.length),
//         width: 900,
//         height: 900,
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
//           canvas.save();
//           canvas.strokeStyle = 'rgba(0, 0, 0, 0.5)';
//           canvas.lineWidth = 1;

//           const centerX = g.toDomXCoord(0);
//           const centerY = g.toDomYCoord(0);

//           canvas.beginPath();
//           canvas.moveTo(centerX, area.y);
//           canvas.lineTo(centerX, area.y + area.h);
//           canvas.stroke();

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
//             tooltip.innerHTML = points.map(p => `${p.name}: X: ${p.xval.toFixed(3)}, Y: ${p.yval.toFixed(3)}`).join('<br>');
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
          
//           if (showAngle) {
//             ctx.beginPath();
//             ctx.moveTo(centerX, centerY);
//             const angleRad = angle * (Math.PI / 180);
//             const lineLength = 400;
//             const endX = centerX + lineLength * Math.cos(angleRad);
//             const endY = centerY - lineLength * Math.sin(angleRad);
//             ctx.lineTo(endX, endY);
//             ctx.strokeStyle = 'red';
//             ctx.lineWidth = 4;
//             ctx.stroke();
//           }

//           // if (showValue) {
//           //   ctx.beginPath();
//           //   ctx.moveTo(centerX, centerY);
//           //   const angleRad = valueLineAngle * (Math.PI / 180);
//           //   const endX = centerX + valueLineLength * Math.cos(angleRad);
//           //   const endY = centerY - valueLineLength * Math.sin(angleRad);
//           //   ctx.lineTo(endX, endY);
//           //   ctx.strokeStyle = 'black';
//           //   ctx.lineWidth = 4;
//           //   ctx.stroke();

//           //   const xValue = valueLineLength * Math.cos(angleRad);
//           //   const yValue = valueLineLength * Math.sin(angleRad);
//           //   setValueLineEndpoint({ x: xValue, y: yValue });

//           //   const calculatedHyp = Math.sqrt(Math.pow(xValue, 2) + Math.pow(yValue, 2));
//           //   setCalculatedHypotenuse(calculatedHyp);
//           // }

//           // Inside the drawCallback function
// if (showValue) {
//   const angleRad = valueLineAngle * (Math.PI / 180);
  
//   // Convert pixel length to data units
//   const xRange = g.xAxisRange();
//   const yRange = g.yAxisRange();
//   const xScale = (xRange[1] - xRange[0]) / g.width_;
//   const yScale = (yRange[1] - yRange[0]) / g.height_;
  
//   const dataLengthX = valueLineLength * xScale;
//   const dataLengthY = valueLineLength * yScale;
  
//   // Calculate endpoint in data coordinates
//   const xValue = dataLengthX * Math.cos(angleRad);
//   const yValue = dataLengthY * Math.sin(angleRad);
  
//   // Convert data coordinates to pixel coordinates for drawing
//   const endX = g.toDomXCoord(xValue);
//   const endY = g.toDomYCoord(yValue);
  
//   // Draw the line
//   ctx.beginPath();
//   ctx.moveTo(centerX, centerY);
//   ctx.lineTo(endX, endY);
//   ctx.strokeStyle = 'black';
//   ctx.lineWidth = 4;
//   ctx.stroke();
  
//   // Update state with data coordinates
//   setValueLineEndpoint({ x: xValue, y: yValue });
  
//   // Calculate hypotenuse in data units
//   const calculatedHyp = Math.sqrt(Math.pow(xValue, 2) + Math.pow(yValue, 2));
//   setCalculatedHypotenuse(calculatedHyp);
// }
//         }
//       };

//       const dygraphData = selectedFiles.flatMap((file, fileIndex) => {
//         const fileData = graphData[fileIndex];
//         if (!fileData || !fileData.data) return [];
        
//         return fileData.data.map(point => {
//           if (Array.isArray(point) && point.length === 2) {
//             return [point[0], ...Array(fileIndex).fill(null), point[1], ...Array(selectedFiles.length - fileIndex - 1).fill(null)];
//           } else if (typeof point === 'object' && 'x' in point && 'y' in point) {
//             return [point.x, ...Array(fileIndex).fill(null), point.y, ...Array(selectedFiles.length - fileIndex - 1).fill(null)];
//           } else {
//             console.error('Invalid data point:', point);
//             return null;
//           }
//         }).filter(point => point !== null);
//       });

//       if (existingDygraph) {
//         existingDygraph.updateOptions({
//           file: dygraphData,
//           ...graphOptions
//         });
//       } else {
//         const dygraph = new Dygraph(graphContainer, dygraphData, graphOptions);

//         graphContainer.dygraph = dygraph;

//             // Add vertical y-axis label after graph initialization
//             const yLabelElement = document.createElement('div');
//             yLabelElement.style.position = 'relative';
//             yLabelElement.style.right = '5px';
//             yLabelElement.style.bottom = '50%';
//             yLabelElement.style.transform = 'rotate(-90deg) translateX(-50%)';
//             yLabelElement.style.transformOrigin = 'center left';
//             yLabelElement.style.width = '120px';
//             yLabelElement.style.textAlign = 'center';
//             yLabelElement.style.fontWeight = 'bold';
//             yLabelElement.style.fontSize = '12px';
//             yLabelElement.textContent = 'Bending moment Y [Nm]';
//             graphContainer.appendChild(yLabelElement);


//             const xLabelElement = document.createElement('div');
// xLabelElement.style.position = 'relative';
// xLabelElement.style.left = '10%';
// xLabelElement.style.bottom = '50px';
// xLabelElement.style.transform = 'translateX(-50%)';
// xLabelElement.style.width = '200px';
// xLabelElement.style.textAlign = 'center';
// xLabelElement.style.fontWeight = 'bold';
// xLabelElement.style.fontSize = '12px';
// xLabelElement.textContent = 'Bending moment X [Nm]';
// graphContainer.appendChild(xLabelElement);

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
//     }
//   };

//   useEffect(() => {
//     createOrUpdateGraph();
//   }, [graphData, showAngle, angle, showValue, valueLineAngle, valueLineLength, overallRange, selectedFiles]);

//   useEffect(() => {
//     const processFiles = async () => {
//       setOverallRange([-25, 25]);
//       for (let i = 0; i < selectedFiles.length; i++) {
//         await handleFileSelection(selectedFiles[i], i);
//       }
//       setIsProcessing(false);
//       setProcessingFile(null);
//       toast.success("All files processed and plotted successfully!");
//     };

//     if (selectedFiles.length > 0) {
//       processFiles();
//     }
//   }, [selectedFiles]);

//   const handleFileToggle = (file) => {
//     if (isProcessing) {
//       toast.warning("Please wait for the current file to finish processing.");
//       return;
//     }

//     setSelectedFiles(prev => {
//       const isSelected = prev.includes(file);
//       let newSelectedFiles;
//       if (isSelected) {
//         newSelectedFiles = prev.filter(f => f !== file);
//       } else if (prev.length < 5) {
//         newSelectedFiles = [...prev, file];
//       } else {
//         toast.warning("You can select a maximum of 5 files.");
//         return prev;
//       }
//       return newSelectedFiles;
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
//       const graphWidth = pageWidth - 2 * margin;
//       const graphHeight = pageHeight - 2 * margin;

//       const graphContainer = graphContainerRef.current;

//       if (!graphContainer) {
//         console.log("Graph container not found");
//         return;
//       }

//       console.log("Capturing graph");
//       const canvas = await html2canvas(graphContainer);
//       const imgData = canvas.toDataURL('image/png');

//       pdf.addImage(imgData, 'PNG', margin, margin, graphWidth, graphHeight - 50);

//       pdf.setFontSize(12);
//       pdf.text("Polar Plot Report", margin, margin - 5);

//       let yPosition = pageHeight - 45;

//       selectedFiles.forEach((file, index) => {
//         const fileData = graphData[index];
//         if (fileData) {
//           pdf.setFontSize(10);
//           pdf.text(`File ${index + 1}: ${fileData.fileName}`, margin, yPosition);
//           pdf.setFontSize(8);
//     pdf.text(`Status: ${dataStatus[index] || 'N/A'}`, margin + 100, yPosition);
//           yPosition += 5;
//         }
//       });

//       if (showAngle) {
//         pdf.text(`Angle: ${angle.toFixed(2)}°`, margin, yPosition);
//         yPosition += 5;
//       }

//       if (showValue) {
//         pdf.text(`Value Line Angle: ${valueLineAngle.toFixed(2)}°`, margin, yPosition);
//         pdf.text(`Value Line Length: ${valueLineLength.toFixed(2)}`, margin + 60, yPosition);
//         yPosition += 5;
//         pdf.text(`Value Line Endpoint: (${valueLineEndpoint.x.toFixed(2)}, ${valueLineEndpoint.y.toFixed(2)})`, margin, yPosition);
//         pdf.text(`Calculated Hypotenuse: ${calculatedHypotenuse.toFixed(2)}`, margin + 100, yPosition);
//       }

//       pdf.save('polar_plot_report.pdf');
//       setIsGeneratingReport(false);
//     } catch (error) {
//       console.error("Error generating report:", error);
//       setIsGeneratingReport(false);
//     }
//   };

//   const handleAngleChange = (e) => {
//     const newAngle = parseFloat(e.target.value);
//     setAngle(newAngle);
//   };

//   const handleValueLineAngleChange = (e) => {
//     const newAngle = parseFloat(e.target.value);
//     setValueLineAngle(newAngle);
//     updateValueLine(newAngle, valueLineLength);
//   };

//   const handleValueLineLengthChange = (e) => {
//     const newLength = parseFloat(e.target.value);
//     setValueLineLength(newLength);
//     updateValueLine(valueLineAngle, newLength);
//   };

//   const updateValueLine = (angle, length) => {
//     const angleRad = angle * (Math.PI / 180);
//     const x = length * Math.cos(angleRad);
//     const y = length * Math.sin(angleRad);
//     setValueLineEndpoint({ x, y });
//     setCalculatedHypotenuse(Math.sqrt(x * x + y * y));
//   };

//   return (
//     <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center ${isVisible ? '' : 'hidden'}`}>
//       <div className="bg-white p-6 rounded-lg shadow-xl max-w-7xl max-h-[90vh] overflow-y-auto">
//         <h2 className="text-2xl font-bold mb-4">Polar Plot</h2>
        
//         <div className="mb-4">
//           <input
//             type="file"
//             webkitdirectory="true"
//             directory="true"
//             multiple
//             onChange={handleFolderUpload}
//             className="mb-2"
//           />
//           <div className="flex flex-wrap gap-2">
//             {files.map((file, index) => (
//               <label key={index} className="flex items-center space-x-2">
//                 <input
//                   type="checkbox"
//                   checked={selectedFiles.includes(file)}
//                   onChange={() => handleFileToggle(file)}
//                   className="form-checkbox"
//                   disabled={isProcessing || (processingFile && processingFile !== file.name)}
//                 />
//                 <span className={`${selectedFiles.includes(file) ? 'text-blue-500 font-semibold' : 'text-gray-700'}`}>
//                   {file.name}
//                 </span>
//               </label>
//             ))}
//           </div>
//         </div>

//         <div ref={graphContainerRef} style={{ width: '900px', height: '900px' }}></div>

//         <div className="mt-4 space-y-2">
//           <div>
//             <label className="mr-2">
//               <input
//                 type="checkbox"
//                 checked={showAngle}
//                 onChange={(e) => setShowAngle(e.target.checked)}
//               />
//               Show Angle
//             </label>
//             {showAngle && (
//               <div className="flex items-center">
//                 <input
//                   type="range"
//                   min="0"
//                   max="360"
//                   value={angle}
//                   onChange={handleAngleChange}
//                   className="mr-2"
//                 />
//                 <input
//                   type="number"
//                   value={angle}
//                   onChange={(e) => setAngle(parseFloat(e.target.value))}
//                   className="w-20 border rounded px-2 py-1"
//                 />
//                 <span className="ml-2">{angle.toFixed(2)}°</span>
//               </div>
//             )}
//           </div>
//           <div>
//             <label className="mr-2">
//               <input
//                 type="checkbox"
//                 checked={showValue}
//                 onChange={(e) => setShowValue(e.target.checked)}
//               />
//               Show Value
//             </label>
//             {showValue && (
//               <>
//                 <div className="flex items-center mt-2">
//                   <span className="mr-2">Angle:</span>
//                   <input
//                     type="range"
//                     min="0"
//                     max="360"
//                     value={valueLineAngle}
//                     onChange={handleValueLineAngleChange}
//                     className="mr-2"
//                   />
//                   <input
//                     type="number"
//                     value={valueLineAngle}
//                     onChange={(e) => setValueLineAngle(parseFloat(e.target.value))}
//                     className="w-20 border rounded px-2 py-1"
//                   />
//                   <span className="ml-2">{valueLineAngle.toFixed(2)}°</span>
//                 </div>
//                 <div className="flex items-center mt-2">
//                   <span className="mr-2">Length:</span>
//                   <input
//                     type="range"
//                     min="0"
//                     max="450"
//                     value={valueLineLength}
//                     onChange={handleValueLineLengthChange}
//                     className="mr-2"
//                   />
//                   <input
//                     type="number"
//                     value={valueLineLength}
//                     onChange={(e) => setValueLineLength(parseFloat(e.target.value))}
//                     className="w-20 border rounded px-2 py-1"
//                   />
//                 </div>
//               </>
//             )}
//           </div>
//           {showValue && (
//             <div>
//               <p>Endpoint: ({valueLineEndpoint.x.toFixed(2)}, {valueLineEndpoint.y.toFixed(2)})</p>
//               <p>Calculated Hypotenuse: {calculatedHypotenuse.toFixed(2)}</p>
//             </div>
//           )}
//         </div>

//         <button
//           onClick={generateReport}
//           disabled={isGeneratingReport || isProcessing}
//           className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
//         >
//           {isGeneratingReport ? 'Generating Report...' : 'Generate Report'}
//         </button>

//         <button
//           onClick={onClose}
//           className="mt-4 ml-4 px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
//         >
//           Close
//         </button>
//       </div>
//       <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
//     </div>
//   );
// };

// export default PolarPlot;


//below is the newly show angle calculation  corrected code and also reverse order plotting data one behind the other file data is done
import React, { useEffect, useRef, useState } from 'react';
import Dygraph from 'dygraphs';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PolarPlot = ({ isVisible, onClose }) => {
  const [files, setFiles] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const graphContainerRef = useRef(null);
  const [graphData, setGraphData] = useState([]);
  const [dataStatus, setDataStatus] = useState([]);
  const [showAngle, setShowAngle] = useState(false);
  const [angle, setAngle] = useState(0);
  const [lineLength, setLineLength] = useState(100);
  const [lineEndpoint, setLineEndpoint] = useState({ x: 0, y: 0 });
  const [calculatedAngle, setCalculatedAngle] = useState(0);
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const [overallRange, setOverallRange] = useState([-25, 25]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingFile, setProcessingFile] = useState(null);

  const [showValue, setShowValue] = useState(false);
  const [valueLineAngle, setValueLineAngle] = useState(0);
  const [valueLineLength, setValueLineLength] = useState(100);
  const [valueLineEndpoint, setValueLineEndpoint] = useState({ x: 0, y: 0 });
  const [calculatedHypotenuse, setCalculatedHypotenuse] = useState(0);

  const colorPalette = ['#800080', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF', '#FF0000'];
  const zoomFactor = 1.2;

  
  useEffect(() => {
    const handleResize = () => {
      if (graphContainerRef.current && graphContainerRef.current.dygraph) {
        graphContainerRef.current.dygraph.resize();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleFolderUpload = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
  };

  const handleFileSelection = async (file, index) => {
    setIsProcessing(true);
    setProcessingFile(file.name);
    toast.info(`Processing file: ${file.name}. Please wait...`);

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const fileData = e.target.result;
        processFileData(fileData, file.name, index);
        resolve();
      };
      reader.onerror = (error) => {
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

  const createOrUpdateGraph = () => {
    const graphContainer = graphContainerRef.current;
  
    if (graphContainer) {
      const existingDygraph = graphContainer.dygraph;
      
      const range = overallRange;

      const graphOptions = {
        labels: ['Bending moment X', ...selectedFiles.map(file => file.name)],
        series: selectedFiles.reduce((acc, file, index) => {
          acc[file.name] = {
            strokeWidth: 0,
            drawPoints: true,
            pointSize: 3,
            highlightCircleSize: 5,
            color: colorPalette[selectedFiles.length - 1 - index % colorPalette.length],
          };
          return acc;
        }, {}),
        title: 'Polar Plot',
        showLabelsOnHighlight: false,
        xlabel: ' ',
        ylabel: ' ',
        ylabelWidth: 20,
        drawPoints: true,
        strokeWidth: 0,
        pointSize: 3,
        highlightCircleSize: 5,
        colors: colorPalette.slice(0, selectedFiles.length).reverse(),
        width: 900,
        height: 900,
        gridLineColor: 'lightgray',
        dateWindow: range,
        valueRange: range,
        axes: {
          x: {
            axisLabelFormatter: (d) => d.toFixed(3),
            valueFormatter: (x) => x.toFixed(3),
            drawGrid: true,
            independentTicks: true,
          },
          y: {
            axisLabelFormatter: (d) => d.toFixed(3),
            valueFormatter: (y) => y.toFixed(3),
            drawGrid: true,
            independentTicks: true,
          }
        },
        underlayCallback: (canvas, area, g) => {
          canvas.save();
          canvas.strokeStyle = 'rgba(0, 0, 0, 0.5)';
          canvas.lineWidth = 1;

          const centerX = g.toDomXCoord(0);
          const centerY = g.toDomYCoord(0);

          canvas.beginPath();
          canvas.moveTo(centerX, area.y);
          canvas.lineTo(centerX, area.y + area.h);
          canvas.stroke();

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
            tooltip.innerHTML = points.map(p => `${p.name}: X: ${p.xval.toFixed(3)}, Y: ${p.yval.toFixed(3)}`).join('<br>');
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
          
          if (showAngle) {
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            const angleRad = angle * (Math.PI / 180);
            const endX = centerX + lineLength * Math.cos(angleRad);
            const endY = centerY - lineLength * Math.sin(angleRad);
            ctx.lineTo(endX, endY);
            ctx.strokeStyle = 'red';
            ctx.lineWidth = 2;
            ctx.stroke();

            // Update line endpoint
            const xValue = g.toDataXCoord(endX);
            const yValue = g.toDataYCoord(endY);
            setLineEndpoint({ x: xValue, y: yValue });

            // Calculate angle using arctangent
            const calculatedAngleRad = Math.atan2(yValue, xValue);
            let calculatedAngleDeg = calculatedAngleRad * (180 / Math.PI);
            if (calculatedAngleDeg < 0) {
              calculatedAngleDeg += 360;
            }
            setCalculatedAngle(calculatedAngleDeg);
          }

          if (showValue) {
            const angleRad = valueLineAngle * (Math.PI / 180);
            
            // Convert pixel length to data units
            const xRange = g.xAxisRange();
            const yRange = g.yAxisRange();
            const xScale = (xRange[1] - xRange[0]) / g.width_;
            const yScale = (yRange[1] - yRange[0]) / g.height_;
            
            const dataLengthX = valueLineLength * xScale;
            const dataLengthY = valueLineLength * yScale;
            
            // Calculate endpoint in data coordinates
            const xValue = dataLengthX * Math.cos(angleRad);
            const yValue = dataLengthY * Math.sin(angleRad);
            
            // Convert data coordinates to pixel coordinates for drawing
            const endX = g.toDomXCoord(xValue);
            const endY = g.toDomYCoord(yValue);
            
            // Draw the line
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.lineTo(endX, endY);
            ctx.strokeStyle = 'black';
            ctx.lineWidth = 4;
            ctx.stroke();
            
            // Update state with data coordinates
            setValueLineEndpoint({ x: xValue, y: yValue });
            
            // Calculate hypotenuse in data units
            const calculatedHyp = Math.sqrt(Math.pow(xValue, 2) + Math.pow(yValue, 2));
            setCalculatedHypotenuse(calculatedHyp);
          }
        }
      };

    // Reverse the order of selectedFiles when preparing data
    const dygraphData = selectedFiles.slice().reverse().flatMap((file, reversedIndex) => {
      const fileIndex = selectedFiles.length - 1 - reversedIndex;
      const fileData = graphData[fileIndex];
      if (!fileData || !fileData.data) return [];
      
      return fileData.data.map(point => {
        if (Array.isArray(point) && point.length === 2) {
          return [point[0], ...Array(reversedIndex).fill(null), point[1], ...Array(selectedFiles.length - reversedIndex - 1).fill(null)];
        } else if (typeof point === 'object' && 'x' in point && 'y' in point) {
          return [point.x, ...Array(reversedIndex).fill(null), point.y, ...Array(selectedFiles.length - reversedIndex - 1).fill(null)];
        } else {
          console.error('Invalid data point:', point);
          return null;
        }
      }).filter(point => point !== null);
    });


      if (existingDygraph) {
        existingDygraph.updateOptions({
          file: dygraphData,
          ...graphOptions
        });
      } else {
        const dygraph = new Dygraph(graphContainer, dygraphData, graphOptions);

        graphContainer.dygraph = dygraph;

        const yLabelElement = document.createElement('div');
        yLabelElement.style.position = 'relative';
        yLabelElement.style.right = '5px';
        yLabelElement.style.bottom = '50%';
        yLabelElement.style.transform = 'rotate(-90deg) translateX(-50%)';
        yLabelElement.style.transformOrigin = 'center left';
        yLabelElement.style.width = '120px';
        yLabelElement.style.textAlign = 'center';
        yLabelElement.style.fontWeight = 'bold';
        yLabelElement.style.fontSize = '12px';
        yLabelElement.textContent = 'Bending moment Y [Nm]';
        graphContainer.appendChild(yLabelElement);

        const xLabelElement = document.createElement('div');
        xLabelElement.style.position = 'relative';
        xLabelElement.style.left = '10%';
        xLabelElement.style.bottom = '50px';
        xLabelElement.style.transform = 'translateX(-50%)';
        xLabelElement.style.width = '200px';
        xLabelElement.style.textAlign = 'center';
        xLabelElement.style.fontWeight = 'bold';
        xLabelElement.style.fontSize = '12px';
        xLabelElement.textContent = 'Bending moment X [Nm]';
        graphContainer.appendChild(xLabelElement);

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
}
  };

  useEffect(() => {
    createOrUpdateGraph();
  }, [graphData, showAngle, angle, lineLength, showValue, valueLineAngle, valueLineLength, overallRange, selectedFiles]);

  useEffect(() => {
    const processFiles = async () => {
      setOverallRange([-25, 25]);
      for (let i = 0; i < selectedFiles.length; i++) {
        await handleFileSelection(selectedFiles[i], i);
      }
      setIsProcessing(false);
      setProcessingFile(null);
      toast.success("All files processed and plotted successfully!");
    };

    if (selectedFiles.length > 0) {
      processFiles();
    }
  }, [selectedFiles]);

  const handleFileToggle = (file) => {
    if (isProcessing) {
      toast.warning("Please wait for the current file to finish processing.");
      return;
    }

    setSelectedFiles(prev => {
      const isSelected = prev.includes(file);
      let newSelectedFiles;
      if (isSelected) {
        newSelectedFiles = prev.filter(f => f !== file);
      } else if (prev.length < 5) {
        newSelectedFiles = [...prev, file];
      } else {
        toast.warning("You can select a maximum of 5 files.");
        return prev;
      }
      return newSelectedFiles;
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
      const graphWidth = pageWidth - 2 * margin;
      const graphHeight = pageHeight - 2 * margin;

      const graphContainer = graphContainerRef.current;
      if (!graphContainer) {
        console.log("Graph container not found");
        return;
      }

      console.log("Capturing graph");
      const canvas = await html2canvas(graphContainer);
      const imgData = canvas.toDataURL('image/png');

      pdf.addImage(imgData, 'PNG', margin, margin, graphWidth, graphHeight - 50);

      pdf.setFontSize(12);
      pdf.text("Polar Plot Report", margin, margin - 5);

      let yPosition = pageHeight - 45;

      selectedFiles.forEach((file, index) => {
        const fileData = graphData[index];
        if (fileData) {
          pdf.setFontSize(10);
          pdf.text(`File ${index + 1}: ${fileData.fileName}`, margin, yPosition);
          pdf.setFontSize(8);
          pdf.text(`Status: ${dataStatus[index] || 'N/A'}`, margin + 100, yPosition);
          yPosition += 5;
        }
      });

      if (showAngle) {
        pdf.text(`Angle: ${angle.toFixed(2)}°`, margin, yPosition);
        yPosition += 5;
        pdf.text(`Line Length: ${lineLength.toFixed(2)}`, margin, yPosition);
        yPosition += 5;
        pdf.text(`Endpoint: (${lineEndpoint.x.toFixed(2)}, ${lineEndpoint.y.toFixed(2)})`, margin, yPosition);
        yPosition += 5;
        pdf.text(`Calculated Angle: ${calculatedAngle.toFixed(2)}°`, margin, yPosition);
      }

      if (showValue) {
        pdf.text(`Value Line Angle: ${valueLineAngle.toFixed(2)}°`, margin, yPosition);
        pdf.text(`Value Line Length: ${valueLineLength.toFixed(2)}`, margin + 60, yPosition);
        yPosition += 5;
        pdf.text(`Value Line Endpoint: (${valueLineEndpoint.x.toFixed(2)}, ${valueLineEndpoint.y.toFixed(2)})`, margin, yPosition);
        pdf.text(`Calculated Hypotenuse: ${calculatedHypotenuse.toFixed(2)}`, margin + 100, yPosition);
      }

      pdf.save('polar_plot_report.pdf');
      setIsGeneratingReport(false);
    } catch (error) {
      console.error("Error generating report:", error);
      setIsGeneratingReport(false);
    }
  };

  const handleAngleChange = (e) => {
    const newAngle = parseFloat(e.target.value);
    setAngle(newAngle);
  };

  const handleLineLengthChange = (e) => {
    const newLength = parseFloat(e.target.value);
    setLineLength(newLength);
  };

  const handleValueLineAngleChange = (e) => {
    const newAngle = parseFloat(e.target.value);
    setValueLineAngle(newAngle);
    updateValueLine(newAngle, valueLineLength);
  };

  const handleValueLineLengthChange = (e) => {
    const newLength = parseFloat(e.target.value);
    setValueLineLength(newLength);
    updateValueLine(valueLineAngle, newLength);
  };

  const updateValueLine = (angle, length) => {
    const angleRad = angle * (Math.PI / 180);
    const x = length * Math.cos(angleRad);
    const y = length * Math.sin(angleRad);
    setValueLineEndpoint({ x, y });
    setCalculatedHypotenuse(Math.sqrt(x * x + y * y));
  };

  return (
    <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center ${isVisible ? '' : 'hidden'}`}>
      <div className="bg-white p-6 rounded-lg shadow-xl w-[1500px] h-[80vh] flex">
        {/* Left Section */}
        <div className="w-1/3 pr-4 border-r border-gray-300 overflow-y-auto">
          <h2 className="text-2xl font-bold mb-4">Polar Plot Controls</h2>
          
          <div className="mb-4 border p-4 rounded">
            <h3 className="text-lg font-semibold mb-2">File Selection</h3>
            <input
              type="file"
              webkitdirectory="true"
              directory="true"
              multiple
              onChange={handleFolderUpload}
              className="mb-2"
            />
            <div className="flex flex-col gap-2 max-h-60 overflow-y-auto">
              {files.map((file, index) => (
                <label key={index} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={selectedFiles.includes(file)}
                    onChange={() => handleFileToggle(file)}
                    className="form-checkbox"
                    disabled={isProcessing || (processingFile && processingFile !== file.name)}
                  />
                  <span className={`${selectedFiles.includes(file) ? 'text-blue-500 font-semibold' : 'text-gray-700'}`}>
                    {file.name}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className="mb-4 border p-4 rounded">
            <h3 className="text-lg font-semibold mb-2">Angle Controls</h3>
            <label className="flex items-center mb-2">
              <input
                type="checkbox"
                checked={showAngle}
                onChange={(e) => setShowAngle(e.target.checked)}
                className="mr-2"
              />
              Show Angle
            </label>
            {showAngle && (
              <>
                <div className="flex items-center mt-2">
                  <span className="mr-2">Angle:</span>
                  <input
                    type="range"
                    min="0"
                    max="360"
                    value={angle}
                    onChange={handleAngleChange}
                    className="mr-2"
                  />
                  <input
                    type="number"
                    value={angle}
                    onChange={(e) => setAngle(parseFloat(e.target.value))}
                    className="w-20 border rounded px-2 py-1"
                  />
                  <span className="ml-2">{angle.toFixed(2)}°</span>
                </div>
                <div className="flex items-center mt-2">
                  <span className="mr-2">Line Length:</span>
                  <input
                    type="range"
                    min="0"
                    max="450"
                    value={lineLength}
                    onChange={handleLineLengthChange}
                    className="mr-2"
                  />
                  <input
                    type="number"
                    value={lineLength}
                    onChange={(e) => setLineLength(parseFloat(e.target.value))}
                    className="w-20 border rounded px-2 py-1"
                  />
                </div>
                <div className="mt-2">
                  <p>Endpoint: ({lineEndpoint.x.toFixed(2)}, {lineEndpoint.y.toFixed(2)})</p>
                  <p>Calculated Angle: {calculatedAngle.toFixed(2)}°</p>
                </div>
              </>
            )}
          </div>

          <div className="mb-4 border p-4 rounded">
            <h3 className="text-lg font-semibold mb-2">Value Controls</h3>
            <label className="flex items-center mb-2">
              <input
                type="checkbox"
                checked={showValue}
                onChange={(e) => setShowValue(e.target.checked)}
                className="mr-2"
              />
              Show Value
            </label>
            {showValue && (
              <>
                <div className="flex items-center mt-2">
                  <span className="mr-2">Angle:</span>
                  <input
                    type="range"
                    min="0"
                    max="360"
                    value={valueLineAngle}
                    onChange={handleValueLineAngleChange}
                    className="mr-2"
                  />
                  <input
                    type="number"
                    value={valueLineAngle}
                    onChange={(e) => setValueLineAngle(parseFloat(e.target.value))}
                    className="w-20 border rounded px-2 py-1"
                  />
                  <span className="ml-2">{valueLineAngle.toFixed(2)}°</span>
                </div>
                <div className="flex items-center mt-2">
                  <span className="mr-2">Length:</span>
                  <input
                    type="range"
                    min="0"
                    max="450"
                    value={valueLineLength}
                    onChange={handleValueLineLengthChange}
                    className="mr-2"
                  />
                  <input
                    type="number"
                    value={valueLineLength}
                    onChange={(e) => setValueLineLength(parseFloat(e.target.value))}
                    className="w-20 border rounded px-2 py-1"
                  />
                </div>
                <div className="mt-2">
                  <p>Endpoint: ({valueLineEndpoint.x.toFixed(2)}, {valueLineEndpoint.y.toFixed(2)})</p>
                  <p>Calculated Hypotenuse: {calculatedHypotenuse.toFixed(2)}</p>
                </div>
              </>
            )}
          </div>

          <div className="flex justify-between">
            <button
              onClick={generateReport}
              disabled={isGeneratingReport || isProcessing}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
            >
              {isGeneratingReport ? 'Generating Report...' : 'Generate Report'}
            </button>

            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
            >
              Close
            </button>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-2/3 pl-4">
          <div ref={graphContainerRef} style={{ width: '80%', height: '90%' }}></div>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </div>
  );
};

export default PolarPlot;