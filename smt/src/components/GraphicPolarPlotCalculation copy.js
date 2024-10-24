import React, { useEffect, useRef, useState } from 'react';
import Dygraph from 'dygraphs';

const PolarPlot = ({ isVisible, onClose }) => {
  const [files, setFiles] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const graphContainerRef = useRef([]);

  // Placeholder data for initial graphs
  const placeholderData = Array(6).fill().map(() => [
    [0, 0], [1, 1], [-1, -1], [1, -1], [-1, 1] // Example placeholder data
  ]);

  const handleFolderUpload = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
  };

  const handleFileSelection = (file, index) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const fileData = e.target.result;
      processFileData(fileData, file.name, index);
    };
    reader.readAsText(file);
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
      const maxXAbs = Math.max(Math.abs(minX), Math.abs(maxX));
      const maxYAbs = Math.max(Math.abs(minY), Math.abs(maxY));
      const maxRange = Math.max(maxXAbs, maxYAbs);

      const graphContainer = graphContainerRef.current[index];
      if (graphContainer) {
        new Dygraph(graphContainer, data, {
          labels: ['Bending moment X', 'Bending moment Y'],
          title: `Polar Plot - ${fileName}`,
          showLabelsOnHighlight: false,
          xlabel: 'Bending moment X',
          ylabel: 'Bending moment Y',
          ylabelWidth: 100,
          drawPoints: true,
          strokeWidth: 0.0,
          pointSize: 1.5,
          highlightCircleSize: 7,
          colors: ['#a01dc0'],
          width: 400,
          height: 400,
          gridLineColor: 'transparent',
          dateWindow: [-maxRange, maxRange],
          axes: {
            x: {
              axisLabelFormatter: (d) => d.toFixed(3),
              valueFormatter: (x) => x.toFixed(3),
              drawGrid: false,
              valueRange: [-maxRange, maxRange],
              pixelsPerLabel: 30,
              axisLabelWidth: 50,
            },
            y: {
              axisLabelFormatter: (d) => d.toFixed(3),
              valueFormatter: (y) => y.toFixed(3),
              drawGrid: false,
              valueRange: [-maxRange, maxRange],
              pixelsPerLabel: 30,
              axisLabelWidth: 50,
            }
          },
          underlayCallback: (canvas, area, g) => {
            const zeroX = g.toDomXCoord(0);
            const zeroY = g.toDomYCoord(0);
            canvas.beginPath();
            canvas.setLineDash([5, 5]);
            canvas.strokeStyle = '#000';
            canvas.moveTo(area.x, zeroY);
            canvas.lineTo(area.x + area.w, zeroY);
            canvas.stroke();
            canvas.moveTo(zeroX, area.y);
            canvas.lineTo(zeroX, area.y + area.h);
            canvas.stroke();
          },
        });
      }
    }
  };

  useEffect(() => {
    // Placeholder max range for initial graphs
    const placeholderMaxRange = 1; // Adjust this value based on the desired range for your placeholders

    placeholderData.forEach((data, index) => {
      const graphContainer = graphContainerRef.current[index];
      if (graphContainer) {
        new Dygraph(graphContainer, data, {
          labels: ['Bending moment X', 'Bending moment Y'],
          title: `Placeholder Plot ${index + 1}`,
          showLabelsOnHighlight: false,
          xlabel: 'Bending moment X',
          ylabel: 'Bending moment Y',
          ylabelWidth: 100,
          drawPoints: true,
          strokeWidth: 0.0,
          pointSize: 1.5,
          highlightCircleSize: 7,
          colors: ['#a01dc0'],
          width: 400,
          height: 400,
          gridLineColor: 'transparent',
          dateWindow: [-placeholderMaxRange, placeholderMaxRange], // Set the range similar to processed data
          axes: {
            x: {
              axisLabelFormatter: (d) => d.toFixed(3),
              valueFormatter: (x) => x.toFixed(3),
              drawGrid: false,
              valueRange: [-placeholderMaxRange, placeholderMaxRange],
              pixelsPerLabel: 30,
              axisLabelWidth: 50,
            },
            y: {
              axisLabelFormatter: (d) => d.toFixed(3),
              valueFormatter: (y) => y.toFixed(3),
              drawGrid: false,
              valueRange: [-placeholderMaxRange, placeholderMaxRange],
              pixelsPerLabel: 30,
              axisLabelWidth: 50,
            }
          },
          underlayCallback: (canvas, area, g) => {
            const zeroX = g.toDomXCoord(0);
            const zeroY = g.toDomYCoord(0);
            canvas.beginPath();
            canvas.setLineDash([5, 5]);
            canvas.strokeStyle = '#000';
            canvas.moveTo(area.x, zeroY);
            canvas.lineTo(area.x + area.w, zeroY);
            canvas.stroke();
            canvas.moveTo(zeroX, area.y);
            canvas.lineTo(zeroX, area.y + area.h);
            canvas.stroke();
          },
        });
      }
    });

    return () => {
      graphContainerRef.current.forEach((graphContainer) => {
        if (graphContainer && graphContainer.dygraph) {
          graphContainer.dygraph.destroy();
        }
      });
    };
  }, []);

  useEffect(() => {
    selectedFiles.forEach((file, index) => {
      handleFileSelection(file, index);
    });
  }, [selectedFiles]);

  return (
    <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center ${isVisible ? '' : 'hidden'}`}>
      <div className="bg-[#b5cad1] p-4 rounded-md" style={{ width: '85%', maxWidth: '2700px' }} onClick={(e) => e.stopPropagation()}>
        <div className="grid grid-cols-3 gap-4" style={{ height: '900px' }}>
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="my-4">
              <h2 className="text-xl font-bold">Graph {index + 1}</h2>
              <div ref={(el) => graphContainerRef.current[index] = el} style={{ width: '100%', height: '400px' }}></div>
            </div>
          ))}
        </div>
        <div className="flex flex-col mt-4 border-2 border-gray-800 p-2 rounded-md">
          <input
            type="file"
            webkitdirectory="true"
            multiple
            onChange={handleFolderUpload}
            className="mb-4"
          />
          <div className="overflow-y-auto h-32 mb-4 border border-gray-400 rounded-md p-2">
            {files.map((file, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  checked={selectedFiles.includes(file)}
                  onChange={() => {
                    const newSelectedFiles = selectedFiles.includes(file)
                      ? selectedFiles.filter(f => f !== file)
                      : [...selectedFiles, file];
                    setSelectedFiles(newSelectedFiles);
                  }}
                  className="mr-2"
                />
                <span>{file.name}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-end">
            <button onClick={onClose} className="p-2 text-white bg-gray-800 rounded-md">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PolarPlot;


//"""""""""""correct working graph graphic polar sept-10"""""""""""""""
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




//"""""""""""""""""""""""
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
//         labels: ['Bending moment X', 'Bending moment Y', 'Distance'],
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
//         },
//         title: `Polar Plot - ${fileName}`,
//         showLabelsOnHighlight: false,
//         xlabel: 'Bending moment X',
//         ylabel: 'Bending moment Y / Distance',
//         ylabelWidth: 100,
//         colors: ['#a01dc0', 'green'],
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
//           const centerX = area.x + area.w / 2;
//           const centerY = area.y + area.h / 2;

//           canvas.beginPath();
//           canvas.setLineDash([5, 5]);
//           canvas.strokeStyle = 'red';
//           canvas.lineWidth = 1;

//           // Horizontal line
//           canvas.moveTo(area.x, centerY);
//           canvas.lineTo(area.x + area.w, centerY);
//           canvas.stroke();

//           // Vertical line
//           canvas.moveTo(centerX, area.y);
//           canvas.lineTo(centerX, area.y + area.h);
//           canvas.stroke();

//           // Reset line dash for other drawings
//           canvas.setLineDash([]);

//           if (showCenterPoint) {
//             canvas.beginPath();
//             canvas.arc(centerX, centerY, 8, 0, 2 * Math.PI);
//             canvas.fillStyle = 'red';
//             canvas.fill();
//           }

//           if (calculateDistances && data) {
//             const centerOfGravityX = g.toDomXCoord(centerOfGravity[index].x);
//             const centerOfGravityY = g.toDomYCoord(centerOfGravity[index].y);

//             // Draw the center of gravity point
//             canvas.beginPath();
//             canvas.arc(centerOfGravityX, centerOfGravityY, 5, 0, 2 * Math.PI);
//             canvas.fillStyle = 'green';
//             canvas.fill();

//             // Label the distance point
//             const distanceYPx = g.toDomYCoord(distanceToCoG);
//             canvas.fillStyle = 'green';
//             canvas.fillText(`Distance: ${distanceToCoG.toFixed(2)}`, area.x + 10, distanceYPx - 10);
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

//       // Prepare the data for Dygraph, including the distance point
//       const dygraphData = plotData.map(point => [point[0], point[1], null]);
//       if (calculateDistances && data) {
//         dygraphData.push([0, null, distanceToCoG]);
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
//                     type


