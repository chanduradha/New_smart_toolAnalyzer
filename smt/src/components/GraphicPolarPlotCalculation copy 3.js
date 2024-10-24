
import React, { useEffect, useRef, useState } from 'react';
import Dygraph from 'dygraphs';

const PolarPlot = ({ isVisible, onClose }) => {
  const [files, setFiles] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const graphContainerRef = useRef([]);
  const [distances, setDistances] = useState(Array(6).fill(0)); // State to store distances
  const [calculateDistances, setCalculateDistances] = useState(false); // State to control distance calculation
  const [graphAssignments, setGraphAssignments] = useState(Array(6).fill(null));
  
  // Zoom factor for scroll
  const zoomFactor = 1.2;

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
      const maxRangeX = Math.max(maxXAbs, maxXAbs); // Adjusted range calculation
      const maxRangeY = Math.max(maxYAbs, maxYAbs); // Adjusted range calculation

      const graphContainer = graphContainerRef.current[index];
      if (graphContainer) {
        const dygraph = new Dygraph(graphContainer, data, {
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
          dateWindow: [-maxRangeX, maxRangeX],
          axes: {
            x: {
              axisLabelFormatter: (d) => d.toFixed(3),
              valueFormatter: (x) => x.toFixed(3),
              drawGrid: false,
              valueRange: [-maxRangeX, maxRangeX],
              pixelsPerLabel: 30,
              axisLabelWidth: 50,
            },
            y: {
              axisLabelFormatter: (d) => d.toFixed(3),
              valueFormatter: (y) => y.toFixed(3),
              drawGrid: false,
              valueRange: [-maxRangeY, maxRangeY],
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
            const existingTooltip = document.querySelector('.tooltip');
            if (existingTooltip) {
              existingTooltip.remove();
            }

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
        });

        graphContainer.dygraph = dygraph; // Save the dygraph instance for later use

        graphContainer.addEventListener('wheel', (e) => {
          e.preventDefault();
          const zoomAmount = e.deltaY < 0 ? zoomFactor : 1 / zoomFactor;
          const xRange = dygraph.xAxisRange()[1] - dygraph.xAxisRange()[0];
          const yRange = dygraph.yAxisRange()[1] - dygraph.yAxisRange()[0];

          const newXRange = xRange * zoomAmount;
          const newYRange = yRange * zoomAmount;

          const mouseX = e.offsetX / graphContainer.clientWidth;
          const mouseY = e.offsetY / graphContainer.clientHeight;

          const newXRangeStart = dygraph.xAxisRange()[0] + (xRange - newXRange) * mouseX;
          const newXRangeEnd = dygraph.xAxisRange()[1] - (xRange - newXRange) * (1 - mouseX);

          const newYRangeStart = dygraph.yAxisRange()[0] + (yRange - newYRange) * mouseY;
          const newYRangeEnd = dygraph.yAxisRange()[1] - (yRange - newYRange) * (1 - mouseY);

          dygraph.updateOptions({
            dateWindow: [newXRangeStart, newXRangeEnd],
            axes: {
              x: {
                valueRange: [newXRangeStart, newXRangeEnd],
              },
              y: {
                valueRange: [newYRangeStart, newYRangeEnd],
              },
            },
          });
        });

        const centerX = data.reduce((sum, point) => sum + point[0], 0) / data.length;
        const centerY = data.reduce((sum, point) => sum + point[1], 0) / data.length;

        const distancesArray = data.map(point => Math.sqrt(
          Math.pow(point[0] - centerX, 2) + Math.pow(point[1] - centerY, 2)
        ));

        const averageDistance = distancesArray.reduce((sum, dist) => sum + dist, 0) / distancesArray.length;
        setDistances(prev => {
          const updatedDistances = [...prev];
          updatedDistances[index] = averageDistance;
          return updatedDistances;
        });
      }
    }
  };

  useEffect(() => {
    const placeholderMaxRange = 1; // Adjust this value based on the desired range for your placeholders

    placeholderData.forEach((data, index) => {
      const graphContainer = graphContainerRef.current[index];
      if (graphContainer) {
        const dygraph = new Dygraph(graphContainer, data, {
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
          dateWindow: [-placeholderMaxRange, placeholderMaxRange],
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
          }
        });

        graphContainer.dygraph = dygraph; // Save the dygraph instance for later use

        graphContainer.addEventListener('wheel', (e) => {
          e.preventDefault();
          const zoomAmount = e.deltaY < 0 ? zoomFactor : 1 / zoomFactor;
          const xRange = dygraph.xAxisRange()[1] - dygraph.xAxisRange()[0];
          const yRange = dygraph.yAxisRange()[1] - dygraph.yAxisRange()[0];

          const newXRange = xRange * zoomAmount;
          const newYRange = yRange * zoomAmount;

          const mouseX = e.offsetX / graphContainer.clientWidth;
          const mouseY = e.offsetY / graphContainer.clientHeight;

          const newXRangeStart = dygraph.xAxisRange()[0] + (xRange - newXRange) * mouseX;
          const newXRangeEnd = dygraph.xAxisRange()[1] - (xRange - newXRange) * (1 - mouseX);

          const newYRangeStart = dygraph.yAxisRange()[0] + (yRange - newYRange) * mouseY;
          const newYRangeEnd = dygraph.yAxisRange()[1] - (yRange - newYRange) * (1 - mouseY);

          dygraph.updateOptions({
            dateWindow: [newXRangeStart, newXRangeEnd],
            axes: {
              x: {
                valueRange: [newXRangeStart, newXRangeEnd],
              },
              y: {
                valueRange: [newYRangeStart, newYRangeEnd],
              },
            },
          });
        });
      }
    });
  }, []);

  const handleCheckboxChange = (file, index) => {
    setSelectedFiles(prevSelected => {
      const isSelected = prevSelected.includes(file);
      return isSelected
        ? prevSelected.filter(f => f !== file)
        : [...prevSelected, file];
    });
  
    setGraphAssignments(prevAssignments => {
      const updatedAssignments = [...prevAssignments];
      const currentIndex = updatedAssignments.findIndex(f => f === file);
  
      if (currentIndex !== -1) {
        // Uncheck: Clear the graph data
        clearGraphData(currentIndex);
        updatedAssignments[currentIndex] = null;
      } else {
        // Check: Assign file to first available graph
        const availableIndex = updatedAssignments.findIndex(assignment => assignment === null);
        if (availableIndex !== -1) {
          updatedAssignments[availableIndex] = file;
          handleFileSelection(file, availableIndex);
        }
      }
      return updatedAssignments;
    });
  };
  const handleInitiate = () => {
    setCalculateDistances(!calculateDistances);
  };
  const clearGraphData = (index) => {
    const graphContainer = graphContainerRef.current[index];
    if (graphContainer && graphContainer.dygraph) {
      graphContainer.dygraph.updateOptions({
        file: placeholderData[index] // Reset to placeholder data
      });
    }
    // Reset the distance for this graph
    setDistances(prev => {
      const updatedDistances = [...prev];
      updatedDistances[index] = 0;
      return updatedDistances;
    });
  };
  return (
    isVisible && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="relative w-full max-w-6xl mx-auto bg-white rounded shadow-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Polar Plots</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">&times;</button>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} ref={el => graphContainerRef.current[index] = el} />
            ))}
          </div>

          <div className="mt-4 flex items-center justify-between">
            <input
              type="file"
              webkitdirectory=""
              multiple
              onChange={handleFolderUpload}
              className="p-2 border rounded"
            />

            <button onClick={handleInitiate} className="ml-4 p-2 bg-blue-500 text-white rounded">
              {calculateDistances ? 'Hide Distance' : 'Show Distance'}
            </button>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2">
          {files.map((file, index) => (
            <div key={index} className="flex items-center">
              <input
                type="checkbox"
                id={`file-${index}`}
                checked={selectedFiles.includes(file)}
                onChange={() => handleCheckboxChange(file, index)}
                className="mr-2"
              />
              <label htmlFor={`file-${index}`} className="truncate">{file.name}</label>
            </div>
          ))}
        </div>

          {calculateDistances && (
            <div className="mt-4 grid grid-cols-3 gap-2">
              {distances.map((distance, index) => (
                <div key={index}>
                  <label htmlFor={`distance-${index}`} className="block text-sm font-medium text-gray-700">
                    Graph {index + 1} Distance:
                  </label>
                  <input
                    type="text"
                    id={`distance-${index}`}
                    value={distance.toFixed(2)}
                    readOnly
                    className="mt-1 p-2 border rounded w-full"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    )
  );
};

export default PolarPlot;