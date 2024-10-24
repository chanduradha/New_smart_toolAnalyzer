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
        let currentTooltip = null; // To keep track of the current tooltip
  
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
          width: 300,
          height: 300,
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
          highlightCallback: (event, x, points, row, series) => {
            // Remove existing tooltip if present
            if (currentTooltip && document.body.contains(currentTooltip)) {
              document.body.removeChild(currentTooltip);
              currentTooltip = null;
            }
  
            if (points.length > 0) {
              const point = points[0];
              currentTooltip = document.createElement('div');
              currentTooltip.className = 'tooltip fixed bg-white border border-gray-300 p-2 rounded shadow-md text-sm';
              currentTooltip.style.position = 'absolute';
              currentTooltip.style.left = `${event.pageX + 10}px`;
              currentTooltip.style.top = `${event.pageY + 10}px`;
              currentTooltip.innerHTML = `X: ${point.xval.toFixed(3)}, Y: ${point.yval.toFixed(3)}`;
  
              // Append the tooltip to the body
              document.body.appendChild(currentTooltip);
  
              // Remove tooltip on mouse out
              const removeTooltip = () => {
                if (currentTooltip && document.body.contains(currentTooltip)) {
                  document.body.removeChild(currentTooltip);
                }
                graphContainer.removeEventListener('mouseout', removeTooltip);
              };
              graphContainer.addEventListener('mouseout', removeTooltip);
            }
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
          width: 300,
          height: 300,
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
      <div className="bg-[#f1f1f1] p-4 rounded-md relative" style={{ width: '100%', maxWidth: '3000px' ,height:'100%',maxHeight:'1400px'}} onClick={(e) => e.stopPropagation()}>
        <div className="grid grid-cols-3 gap-4" style={{ height: '900px',position:'absolute',top:'100px',width:'2200px' }}>
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="my-4">
              <h2 className="text-xl font-bold">Graph {index + 1}</h2>
              <div ref={(el) => graphContainerRef.current[index] = el} style={{ width: '100%', height: '500px' }}></div>
            </div>
          ))}
        </div>
        <div className="absolute top-0 right-0 mt-4 mr-4 flex flex-col border-2 border-gray-800 p-2 rounded-md" style={{ width: '500px' }}>
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


// this below is added zoomin zoom out option code 
// import React, { useEffect, useRef, useState } from 'react';
// import Dygraph from 'dygraphs';

// const PolarPlot = ({ isVisible, onClose }) => {
//   const [files, setFiles] = useState([]);
//   const [selectedFiles, setSelectedFiles] = useState([]);
//   const graphContainerRef = useRef([]);
//   const [distances, setDistances] = useState(Array(6).fill(0)); // State to store distances

//   // Zoom factor for scroll
//   const zoomFactor = 1.2;

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
//       const maxRangeX = Math.max(maxXAbs, maxXAbs); // Adjusted range calculation
//       const maxRangeY = Math.max(maxYAbs, maxYAbs); // Adjusted range calculation
  
//       const graphContainer = graphContainerRef.current[index];
//       if (graphContainer) {
//         let currentTooltip = null; // To keep track of the current tooltip
//         const dygraph = new Dygraph(graphContainer, data, {
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
//           width: 300,
//           height: 300,
//           gridLineColor: 'transparent',
//           dateWindow: [-maxRangeX, maxRangeX],
//           axes: {
//             x: {
//               axisLabelFormatter: (d) => d.toFixed(3),
//               valueFormatter: (x) => x.toFixed(3),
//               drawGrid: false,
//               valueRange: [-maxRangeX, maxRangeX],
//               pixelsPerLabel: 30,
//               axisLabelWidth: 50,
//             },
//             y: {
//               axisLabelFormatter: (d) => d.toFixed(3),
//               valueFormatter: (y) => y.toFixed(3),
//               drawGrid: false,
//               valueRange: [-maxRangeY, maxRangeY],
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
//           highlightCallback: (event, x, points, row, series) => {
//             // Remove existing tooltip if present
//             if (currentTooltip && document.body.contains(currentTooltip)) {
//               document.body.removeChild(currentTooltip);
//               currentTooltip = null;
//             }
  
//             if (points.length > 0) {
//               const point = points[0];
//               currentTooltip = document.createElement('div');
//               currentTooltip.className = 'tooltip fixed bg-white border border-gray-300 p-2 rounded shadow-md text-sm';
//               currentTooltip.style.position = 'absolute';
//               currentTooltip.style.left = `${event.pageX + 10}px`;
//               currentTooltip.style.top = `${event.pageY + 10}px`;
//               currentTooltip.innerHTML = `X: ${point.xval.toFixed(3)}, Y: ${point.yval.toFixed(3)}`;
  
//               // Append the tooltip to the body
//               document.body.appendChild(currentTooltip);
  
//               // Remove tooltip on mouse out
//               const removeTooltip = () => {
//                 if (currentTooltip && document.body.contains(currentTooltip)) {
//                   document.body.removeChild(currentTooltip);
//                 }
//                 graphContainer.removeEventListener('mouseout', removeTooltip);
//               };
//               graphContainer.addEventListener('mouseout', removeTooltip);
//             }
//           },
//         });

//         // Add zoom functionality with mouse scroll
//         graphContainer.addEventListener('wheel', (e) => {
//           e.preventDefault();
//           const zoomAmount = e.deltaY < 0 ? zoomFactor : 1 / zoomFactor;
//           const xRange = dygraph.xAxisRange()[1] - dygraph.xAxisRange()[0];
//           const yRange = dygraph.yAxisRange()[1] - dygraph.yAxisRange()[0];

//           // Calculate the new range based on zoom factor
//           const newXRange = xRange * zoomAmount;
//           const newYRange = yRange * zoomAmount;

//           // Calculate the center of the zoom based on mouse position
//           const mouseX = e.offsetX / graphContainer.clientWidth;
//           const mouseY = e.offsetY / graphContainer.clientHeight;
          
//           // Calculate new ranges
//           const newXRangeStart = dygraph.xAxisRange()[0] + (xRange - newXRange) * mouseX;
//           const newXRangeEnd = dygraph.xAxisRange()[1] - (xRange - newXRange) * (1 - mouseX);
          
//           const newYRangeStart = dygraph.yAxisRange()[0] + (yRange - newYRange) * mouseY;
//           const newYRangeEnd = dygraph.yAxisRange()[1] - (yRange - newYRange) * (1 - mouseY);

//           dygraph.updateOptions({
//             dateWindow: [newXRangeStart, newXRangeEnd],
//             axes: {
//               x: {
//                 valueRange: [newXRangeStart, newXRangeEnd],
//               },
//               y: {
//                 valueRange: [newYRangeStart, newYRangeEnd],
//               },
//             },
//           });
//         });

//         // Calculate and display distance to center of gravity
//         const centerX = data.reduce((sum, point) => sum + point[0], 0) / data.length;
//         const centerY = data.reduce((sum, point) => sum + point[1], 0) / data.length;

//         const distancesArray = data.map(point => Math.sqrt(
//           Math.pow(point[0] - centerX, 2) + Math.pow(point[1] - centerY, 2)
//         ));

//         const averageDistance = distancesArray.reduce((sum, dist) => sum + dist, 0) / distancesArray.length;
//         setDistances(prev => {
//           const updatedDistances = [...prev];
//           updatedDistances[index] = averageDistance;
//           return updatedDistances;
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
//           width: 300,
//           height: 300,
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
//       <div className="bg-[#f1f1f1] p-4 rounded-md relative" style={{ width: '100%', maxWidth: '3000px' ,height:'100%',maxHeight:'1400px'}} onClick={(e) => e.stopPropagation()}>
//         <div className="grid grid-cols-3 gap-4" style={{ height: '900px',position:'absolute',top:'100px',width:'2200px' }}>
//           {Array.from({ length: 6 }).map((_, index) => (
//             <div key={index} className="my-4">
//               <h2 className="text-xl font-bold">Graph {index + 1}</h2>
//               <div ref={(el) => graphContainerRef.current[index] = el} style={{ width: '100%', height: '500px' }}></div>
//               <div className="mt-2">
//                 <span className="font-bold">Distance to CoG:</span>
//                 <input
//                   type="text"
//                   value={distances[index].toFixed(2)}
//                   readOnly
//                   className="ml-2 p-1 border border-gray-300 rounded-md"
//                 />
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
