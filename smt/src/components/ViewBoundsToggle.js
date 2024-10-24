// import React, { useState, useRef, useEffect } from 'react';

// const ViewBoundsToggle = ({ chartRef, leftLinePosition, rightLinePosition, chartData, setChartData, originalChartData, setOriginalChartData,width,height }) => {
//   const [showViewBounds, setShowViewBounds] = useState(false);
//   const [draggingLeft, setDraggingLeft] = useState(false);
//   const [draggingRight, setDraggingRight] = useState(false);
//   const [startPosition, setStartPosition] = useState(leftLinePosition);
//   const [endPosition, setEndPosition] = useState(rightLinePosition);
//   const [calculatedValues, setCalculatedValues] = useState(null);
//   const dragRef = useRef(null);

//   useEffect(() => {
//     const handleMouseMove = (event) => {
//       if (draggingLeft) {
//         handleLeftLineDrag(event);
//       } else if (draggingRight) {
//         handleRightLineDrag(event);
//       }
//     };
    
//     const handleMouseUp = () => {
//       setDraggingLeft(false);
//       setDraggingRight(false);
//     };
  
//     document.addEventListener('mousemove', handleMouseMove);
//     document.addEventListener('mouseup', handleMouseUp);
  
//     return () => {
//       document.removeEventListener('mousemove', handleMouseMove);
//       document.removeEventListener('mouseup', handleMouseUp);
//     };
//   }, [draggingLeft, draggingRight]); // Add dependencies here
  

//   useEffect(() => {
//     console.log("Start position changed:", startPosition);
//     console.log("End position changed:", endPosition);
//   }, [startPosition, endPosition]);


//   const toggleViewBounds = () => {
//     setShowViewBounds(!showViewBounds);
//   };

//   const formatTime = (seconds) => {
//     const date = new Date(null);
//     date.setSeconds(seconds);
//     return date.toISOString().substr(11, 12);
//   };
//   const calculateYAxisValues = (x) => {
//     if (!chartData || chartData.length === 0) {
//       // Handle the case when chartData is empty
//       return {
//         x: 'N/A',
//         tension: 'N/A',
//         torsion: 'N/A',
//         bendingMomentY: 'N/A',
//         bendingMomentX: 'N/A',
//         temperature: 'N/A',
//       };
//     }
  
//     const closestPoint = chartData.reduce((prev, curr) => Math.abs(curr.x - x) < Math.abs(prev.x - x) ? curr : prev);
//     return {
//       x: formatTime(closestPoint.x),
//       tension: closestPoint.tension,
//       torsion: closestPoint.torsion,
//       bendingMomentY: closestPoint.bendingMomentY,
//       bendingMomentX: closestPoint.bendingMomentX,
//       temperature: closestPoint.temperature,
//     };
//   };
  
  
//   const handleLeftLineDrag = (event) => {
//     const chartBounds = chartRef.current.getBoundingClientRect();
//     const chartWidth = chartBounds.width;
//     const mouseX = event.clientX - chartBounds.left;
//     const newPosition = mouseX / chartWidth;
//     const newLeftPosition = Math.max(0, Math.min(newPosition, endPosition - 0.05));
//     setStartPosition(newLeftPosition); // Update startPosition
//     calculateValues(); // Calculate values after updating position
//   };
  
//   const handleRightLineDrag = (event) => {
//     const chartBounds = chartRef.current.getBoundingClientRect();
//     const chartWidth = chartBounds.width;
//     const mouseX = event.clientX - chartBounds.left;
//     let newPosition = mouseX / chartWidth;
//     if (newPosition === 1) {
//         newPosition = 0.99; 
//     }
//     const newRightPosition = Math.min(1, Math.max(newPosition, startPosition + 0.05));
//     setEndPosition(newRightPosition); // Update endPosition
//     calculateValues(); // Calculate values after updating position
//   };
//   const handleBoundsSelection = (option) => {
//     if (option === "Cut") {
//       cutData();
//     } else if (option === "Clear Offset") {
//       clearOffset();
//     } else if (option === "Drift Compensation") {
//       applyDriftCompensation();
//     }
//   };

//   const clearOffset = () => {
//     setChartData(originalChartData);
//   };

//   // const cutData = () => {
//   //   const newData = filterDataInRange(startPosition * 100, endPosition * 65);

//   //   const filteredOriginalData = originalChartData.filter(item => {
//   //     const x = item.x;
//   //     return !(x >= startPosition * 100 && x <= endPosition * 65);
//   //   });

//   //   setChartData(newData);
//   //   setOriginalChartData(filteredOriginalData);
//   // };

//   //this below cut option code when i click clearoffset it reload the originalchartdata 
//   const cutData = () => {
//     const newData = filterDataInRange(startPosition * 100, endPosition * 65); // Corrected multiplication factor
//     setChartData(newData);
//     // Don't modify originalChartData here
//   };

//   const applyDriftCompensation = () => {
//     const referenceStart = chartData[0];
//     const referenceEnd = chartData[chartData.length - 1];

//     const drift = {
//       tension: referenceEnd.tension - referenceStart.tension,
//       torsion: referenceEnd.torsion - referenceStart.torsion,
//       bendingMomentX: referenceEnd.bendingMomentX - referenceStart.bendingMomentX,
//       bendingMomentY: referenceEnd.bendingMomentX - referenceStart.bendingMomentY,
//       temperature: referenceEnd.temperature - referenceStart.temperature,
//     };

//     const compensatedData = chartData.map((item) => ({
//       x: item.x,
//       tension: item.tension - drift.tension,
//       torsion: item.torsion - drift.torsion,
//       bendingMomentX: item.bendingMomentX - drift.bendingMomentX,
//       bendingMomentY: item.bendingMomentY - drift.bendingMomentY,
//       temperature: item.temperature - drift.temperature,
//     }));

//     setChartData(compensatedData);
//   };

//   const filterDataInRange = (startX, endX) => { 
//     let [start, end] = [startX, endX];
//     if (start > end) {
//       [start, end] = [end, start];
//     }

//     return chartData.filter(item => item.x >= start && item.x <= end);
//   };

//   const calculateValues = () => {
//     const filteredData = filterDataInRange(startPosition * 100, endPosition * 65);
//     const properties = ['tension', 'torsion', 'bendingMomentY', 'bendingMomentX', 'temperature'];
//     const calculatedValues = {};

//     properties.forEach(property => {
//       const values = filteredData.map(item => item[property]);
//       if (values.length > 0) {
//         const max = Math.max(...values);
//         const min = Math.min(...values);
//         const mean = (values.reduce((acc, curr) => acc + curr, 0) / values.length);
//         const slope = (max - min) / (filteredData[filteredData.length - 1].x - filteredData[0].x);

//         calculatedValues[property] = {
//           max: max.toFixed(6),
//           min: min.toFixed(6),
//           mean: mean.toFixed(9),
//           slope: slope.toFixed(9)
//         };
//       } else {
//         calculatedValues[property] = {
//           max: null,
//           min: null,
//           mean: null,
//           slope: null
//         };
//       }
//     });
//     setCalculatedValues(calculatedValues);
//   };

//   useEffect(() => {
//     console.log("Start position changed:", startPosition);
//     console.log("End position changed:", endPosition);

//     calculateValues();
//   }, [startPosition, endPosition]);

//   return (
//     <>
//       <div className="border border-black p-4 rounded-lg shadow-lg bg-[#bbb8ba]" style={{ position: 'relative', width: '1250px', height: '410px', bottom: '385px' }}>
//         <button onClick={toggleViewBounds} className="border border-black text-sm font-medium rounded-md text-gray-700 bg-gray-200 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-black" style={{ position: 'relative', width: '150px', height: '40px', left: '80%', top: '60px' }}>
//           {showViewBounds ? 'Hide View Bounds' : 'Show View Bounds'}
//         </button>
//         <button onClick={calculateValues} className="border border-black text-sm font-medium rounded-md text-gray-700 bg-gray-200 hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-black" style={{ position: 'relative', height: '40px', width: '150px', left: '68%', top: '140px' }}>
//           Calculate Values
//         </button>
//       </div>  
    
//       {showViewBounds && (
//         <>
//           <div
//             ref={dragRef}
//             style={{ position: 'absolute', left: `${startPosition * 100}%`, top: '0%', borderLeft: '2px solid lightgreen', height: '25%', cursor: 'col-resize' }}
//             onMouseDown={() => setDraggingLeft(true)}
//           >
//             <span>Start Range: X - {calculateYAxisValues(startPosition * 100).x}</span>
//           </div>
//           <div
//             ref={dragRef}
//             style={{ position: 'absolute', left: `${endPosition * 65}%`, top: '0%', borderLeft: '2px solid red', height: '25%', cursor: 'col-resize' }}
//             onMouseDown={() => setDraggingRight(true)}
//           >
//             <span>End Range: X - {calculateYAxisValues(endPosition * 65).x}</span>
//           </div>
//         </>
//       )}
//       {calculatedValues && (
//         <div className="mt-4 overflow-x-auto " style={{ width: '900px', position: 'relative', bottom: '790px', left: '45px' }}>
//           <table className="min-w-full divide-y divide-gray-200" >
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Property</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Max</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Min</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mean</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">slope</th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {Object.keys(calculatedValues).map(property => (
//                 <tr key={property}>
//                   <td className="px-6 py-4 whitespace-nowrap">{property}</td>
//                   <td className="px-6 py-4 whitespace-nowrap">{calculatedValues[property].max}</td>
//                   <td className="px-6 py-4 whitespace-nowrap">{calculatedValues[property].min}</td>
//                   <td className="px-6 py-4 whitespace-nowrap">{calculatedValues[property].mean}</td>
//                   <td className="px-6 py-4 whitespace-nowrap">{calculatedValues[property].slope}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//       <div className="mt-4">
//         <select onChange={(e) => handleBoundsSelection(e.target.value)} className="border border-black text-sm font-medium rounded-md text-gray-700 bg-gray-200 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-black" style={{ position: 'relative', height: '40px', width: '150px',bottom:'920px',left:'990px' }}>
//           <option value="">Bounds</option>
//           <option value="Cut">Cut</option>
//           <option value="Clear Offset">Clear Offset</option>
//           <option value="Drift Compensation">Drift Compensation</option>
//         </select>
//       </div>
//     </>
//   );
// };

// export default ViewBoundsToggle;



//''''
// import React, { useState, useRef, useEffect } from 'react';

// const ViewBoundsToggle = ({ chartRef, leftLinePosition, rightLinePosition, chartData, setChartData, originalChartData, setOriginalChartData, width, height }) => {
//   const [showViewBounds, setShowViewBounds] = useState(false);
//   const [draggingLeft, setDraggingLeft] = useState(false);
//   const [draggingRight, setDraggingRight] = useState(false);
//   const [startPosition, setStartPosition] = useState(leftLinePosition);
//   const [endPosition, setEndPosition] = useState(rightLinePosition);
//   const [calculatedValues, setCalculatedValues] = useState(null);
//   const dragRef = useRef(null);

//   useEffect(() => {
//     const handleMouseMove = (event) => {
//       if (draggingLeft) {
//         handleLeftLineDrag(event);
//       } else if (draggingRight) {
//         handleRightLineDrag(event);
//       }
//     };
    
//     const handleMouseUp = () => {
//       setDraggingLeft(false);
//       setDraggingRight(false);
//     };
  
//     document.addEventListener('mousemove', handleMouseMove);
//     document.addEventListener('mouseup', handleMouseUp);
  
//     return () => {
//       document.removeEventListener('mousemove', handleMouseMove);
//       document.removeEventListener('mouseup', handleMouseUp);
//     };
//   }, [draggingLeft, draggingRight]);

//   useEffect(() => {
//     console.log("Start position changed:", startPosition);
//     console.log("End position changed:", endPosition);
//   }, [startPosition, endPosition]);

//   const toggleViewBounds = () => {
//     setShowViewBounds(!showViewBounds);
//   };

//   const formatTime = (seconds) => {
//     const date = new Date(null);
//     date.setSeconds(seconds);
//     return date.toISOString().substr(11, 12);
//   };

//   const calculateYAxisValues = (x) => {
//     if (!chartData || chartData.length === 0) {
//       return {
//         x: 'N/A',
//         tension: 'N/A',
//         torsion: 'N/A',
//         bendingMomentY: 'N/A',
//         bendingMomentX: 'N/A',
//         temperature: 'N/A',
//       };
//     }
  
//     const closestPoint = chartData.reduce((prev, curr) => Math.abs(curr.x - x) < Math.abs(prev.x - x) ? curr : prev);
//     return {
//       x: formatTime(closestPoint.x),
//       tension: closestPoint.tension,
//       torsion: closestPoint.torsion,
//       bendingMomentY: closestPoint.bendingMomentY,
//       bendingMomentX: closestPoint.bendingMomentX,
//       temperature: closestPoint.temperature,
//     };
//   };
  
//   const handleLeftLineDrag = (event) => {
//     const chartBounds = chartRef.current.getBoundingClientRect();
//     const chartWidth = chartBounds.width;
//     const mouseX = event.clientX - chartBounds.left;
//     const newPosition = mouseX / chartWidth;
//     const newLeftPosition = Math.max(0, Math.min(newPosition, endPosition - 0.05));
//     setStartPosition(newLeftPosition);
//     calculateValues();
//   };
  
//   const handleRightLineDrag = (event) => {
//     try {
//       const chartBounds = chartRef.current.getBoundingClientRect();
//       const chartWidth = chartBounds.width;
//       const mouseX = event.clientX - chartBounds.left;
//       let newPosition = mouseX / chartWidth;

//       // Limit the maximum drag position to 65% of the chart width
//       const maxDragPosition = 0.65;
//       newPosition = Math.min(newPosition, maxDragPosition);

//       // Ensure the right line doesn't go below the left line
//       const minDistance = 0.05; // Minimum distance between left and right lines
//       newPosition = Math.max(newPosition, startPosition + minDistance);

//       setEndPosition(newPosition);
//       calculateValues();
//     } catch (error) {
//       console.error("Error in handleRightLineDrag:", error);
//       // You can add additional error handling here if needed
//     }
//   };

//   const handleBoundsSelection = (option) => {
//     if (option === "Cut") {
//       cutData();
//     } else if (option === "Clear Offset") {
//       clearOffset();
//     } else if (option === "Drift Compensation") {
//       applyDriftCompensation();
//     }
//   };

//   const clearOffset = () => {
//     setChartData(originalChartData);
//   };

//   const cutData = () => {
//     const newData = filterDataInRange(startPosition * 100, endPosition * 65);
//     setChartData(newData);
//   };

//   const applyDriftCompensation = () => {
//     const referenceStart = chartData[0];
//     const referenceEnd = chartData[chartData.length - 1];

//     const drift = {
//       tension: referenceEnd.tension - referenceStart.tension,
//       torsion: referenceEnd.torsion - referenceStart.torsion,
//       bendingMomentX: referenceEnd.bendingMomentX - referenceStart.bendingMomentX,
//       bendingMomentY: referenceEnd.bendingMomentX - referenceStart.bendingMomentY,
//       temperature: referenceEnd.temperature - referenceStart.temperature,
//     };

//     const compensatedData = chartData.map((item) => ({
//       x: item.x,
//       tension: item.tension - drift.tension,
//       torsion: item.torsion - drift.torsion,
//       bendingMomentX: item.bendingMomentX - drift.bendingMomentX,
//       bendingMomentY: item.bendingMomentY - drift.bendingMomentY,
//       temperature: item.temperature - drift.temperature,
//     }));

//     setChartData(compensatedData);
//   };

//   const filterDataInRange = (startX, endX) => { 
//     let [start, end] = [startX, endX];
//     if (start > end) {
//       [start, end] = [end, start];
//     }

//     return chartData.filter(item => item.x >= start && item.x <= end);
//   };

//   const calculateValues = () => {
//     const filteredData = filterDataInRange(startPosition * 100, endPosition * 65);
//     const properties = ['tension', 'torsion', 'bendingMomentY', 'bendingMomentX', 'temperature'];
//     const calculatedValues = {};

//     properties.forEach(property => {
//       const values = filteredData.map(item => item[property]);
//       if (values.length > 0) {
//         const max = Math.max(...values);
//         const min = Math.min(...values);
//         const mean = (values.reduce((acc, curr) => acc + curr, 0) / values.length);
//         const slope = (max - min) / (filteredData[filteredData.length - 1].x - filteredData[0].x);

//         calculatedValues[property] = {
//           max: max.toFixed(6),
//           min: min.toFixed(6),
//           mean: mean.toFixed(9),
//           slope: slope.toFixed(9)
//         };
//       } else {
//         calculatedValues[property] = {
//           max: null,
//           min: null,
//           mean: null,
//           slope: null
//         };
//       }
//     });
//     setCalculatedValues(calculatedValues);
//   };

//   useEffect(() => {
//     console.log("Start position changed:", startPosition);
//     console.log("End position changed:", endPosition);

//     calculateValues();
//   }, [startPosition, endPosition]);

//   return (
//     <>
//       <div className="border border-black p-4 rounded-lg shadow-lg " style={{ position: 'relative', width: '800px', height: '340px', bottom: '300px',boxShadow: '0 6px 8px rgba(0, 0, 0, 0.15), 0 3px 6px rgba(0, 0, 0, 0.1)', }}>
//         <button onClick={toggleViewBounds} className="border border-black text-sm font-medium rounded-md text-gray-700 bg-gray-200 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-black" style={{ position: 'relative', width: '150px', height: '40px', left: '81%', top: '60px' }}>
//           {showViewBounds ? 'Hide View Bounds' : 'Show View Bounds'}
//         </button>
//         <button onClick={calculateValues} className="border border-black text-sm font-medium rounded-md text-gray-700 bg-gray-200 hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-black" style={{ position: 'relative', height: '40px', width: '150px', left: '61%', top: '140px' }}>
//           Calculate Values
//         </button>
//       </div>  
    
//       {showViewBounds && (
//         <>
//           <div
//             ref={dragRef}
//             style={{ position: 'absolute', left: `${startPosition * 100}%`, top: '0%', borderLeft: '2px solid lightgreen', height: '25%', cursor: 'col-resize' }}
//             onMouseDown={() => setDraggingLeft(true)}
//           >
//             <span>Start Range: X - {calculateYAxisValues(startPosition * 100).x}</span>
//           </div>
//           <div
//             ref={dragRef}
//             style={{ position: 'absolute', left: `${endPosition * 65}%`, top: '0%', borderLeft: '2px solid red', height: '25%', cursor: 'col-resize' }}
//             onMouseDown={() => setDraggingRight(true)}
//           >
//             <span>End Range: X - {calculateYAxisValues(endPosition * 65).x}</span>
//           </div>
//         </>
//       )}
//       {calculatedValues && (
//         <div className="mt-4 overflow-x-auto " style={{ width: '600px', position: 'relative', bottom: '640px', left: '30px' ,height:'320px'}}>
//           <table className="min-w-full divide-y divide-gray-200" >
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Property</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Max</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Min</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mean</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">slope</th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {Object.keys(calculatedValues).map(property => (
//                 <tr key={property}>
//                   <td className="px-6 py-4 whitespace-nowrap">{property}</td>
//                   <td className="px-6 py-4 whitespace-nowrap">{calculatedValues[property].max}</td>
//                   <td className="px-6 py-4 whitespace-nowrap">{calculatedValues[property].min}</td>
//                   <td className="px-6 py-4 whitespace-nowrap">{calculatedValues[property].mean}</td>
//                   <td className="px-6 py-4 whitespace-nowrap">{calculatedValues[property].slope}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//       <div className="mt-4">
//         <select onChange={(e) => handleBoundsSelection(e.target.value)} className="border border-black text-sm font-medium rounded-md text-gray-700 bg-gray-200 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-black" style={{ position: 'relative', height: '40px', width: '150px', bottom:'750px', left:'635px' }}>
//           <option value="">Bounds</option>
//           <option value="Cut">Cut</option>
//           <option value="Clear Offset">Clear Offset</option>
//           <option value="Drift Compensation">Drift Compensation</option>
//         </select>
//       </div>
//     </>
//   );
// };

// export default ViewBoundsToggle;



// import React, { useState, useRef, useEffect } from 'react';

// const ViewBoundsToggle = ({ chartRef, leftLinePosition, rightLinePosition, chartData, setChartData, originalChartData, setOriginalChartData, width, height }) => {
//   const [showViewBounds, setShowViewBounds] = useState(false);
//   const [draggingLeft, setDraggingLeft] = useState(false);
//   const [draggingRight, setDraggingRight] = useState(false);
//   const [startPosition, setStartPosition] = useState(leftLinePosition);
//   const [endPosition, setEndPosition] = useState(rightLinePosition);
//   const [calculatedValues, setCalculatedValues] = useState(null);
//   const [error, setError] = useState(null);
//   const dragRef = useRef(null);

//   useEffect(() => {
//     const handleMouseMove = (event) => {
//       try {
//         if (draggingLeft) {
//           handleLeftLineDrag(event);
//         } else if (draggingRight) {
//           handleRightLineDrag(event);
//         }
//       } catch (error) {
//         console.error("Error in mouse move handler:", error);
//         setError("An error occurred while dragging. Please try again.");
//       }
//     };
    
//     const handleMouseUp = () => {
//       setDraggingLeft(false);
//       setDraggingRight(false);
//     };
  
//     document.addEventListener('mousemove', handleMouseMove);
//     document.addEventListener('mouseup', handleMouseUp);
  
//     return () => {
//       document.removeEventListener('mousemove', handleMouseMove);
//       document.removeEventListener('mouseup', handleMouseUp);
//     };
//   }, [draggingLeft, draggingRight]);

//   useEffect(() => {
//     console.log("Start position changed:", startPosition);
//     console.log("End position changed:", endPosition);
//   }, [startPosition, endPosition]);

//   const toggleViewBounds = () => {
//     setShowViewBounds(!showViewBounds);
//   };

//   const formatTime = (seconds) => {
//     const date = new Date(null);
//     date.setSeconds(seconds);
//     return date.toISOString().substr(11, 12);
//   };

//   const calculateYAxisValues = (x) => {
//     if (!chartData || chartData.length === 0) {
//       return {
//         x: 'N/A',
//         tension: 'N/A',
//         torsion: 'N/A',
//         bendingMomentY: 'N/A',
//         bendingMomentX: 'N/A',
//         temperature: 'N/A',
//       };
//     }
  
//     const closestPoint = chartData.reduce((prev, curr) => Math.abs(curr.x - x) < Math.abs(prev.x - x) ? curr : prev);
//     return {
//       x: formatTime(closestPoint.x),
//       tension: closestPoint.tension,
//       torsion: closestPoint.torsion,
//       bendingMomentY: closestPoint.bendingMomentY,
//       bendingMomentX: closestPoint.bendingMomentX,
//       temperature: closestPoint.temperature,
//     };
//   };
  
//   const handleLeftLineDrag = (event) => {
//     try {
//       const chartBounds = chartRef.current.getBoundingClientRect();
//       const chartWidth = chartBounds.width;
//       const mouseX = event.clientX - chartBounds.left;
//       const newPosition = mouseX / chartWidth;
//       const newLeftPosition = Math.max(0, Math.min(newPosition, endPosition - 0.05));
//       setStartPosition(newLeftPosition);
//       calculateValues();
//     } catch (error) {
//       console.error("Error in handleLeftLineDrag:", error);
//       setError("An error occurred while dragging the left line. Please try again.");
//     }
//   };
  
//   const handleRightLineDrag = (event) => {
//     try {
//       const chartBounds = chartRef.current.getBoundingClientRect();
//       const chartWidth = chartBounds.width;
//       const mouseX = event.clientX - chartBounds.left;
//       let newPosition = mouseX / chartWidth;

//       // Limit the maximum drag position to 65% of the chart width
//       const maxDragPosition = 0.65;
//       newPosition = Math.min(newPosition, maxDragPosition);

//       // Ensure the right line doesn't go below the left line
//       const minDistance = 0.05; // Minimum distance between left and right lines
//       newPosition = Math.max(newPosition, startPosition + minDistance);

//       setEndPosition(newPosition);
//       calculateValues();
//     } catch (error) {
//       console.error("Error in handleRightLineDrag:", error);
//       setError("An error occurred while dragging the right line. Please try again.");
//     }
//   };

//   const handleBoundsSelection = (option) => {
//     try {
//       if (option === "Cut") {
//         cutData();
//       } else if (option === "Clear Offset") {
//         clearOffset();
//       } else if (option === "Drift Compensation") {
//         applyDriftCompensation();
//       }
//     } catch (error) {
//       console.error("Error in handleBoundsSelection:", error);
//       setError("An error occurred while performing the selected action. Please try again.");
//     }
//   };

//   const clearOffset = () => {
//     setChartData(originalChartData);
//   };

//   const cutData = () => {
//     const newData = filterDataInRange(startPosition * 100, endPosition * 100);
//     setChartData(newData);
//   };

//   const applyDriftCompensation = () => {
//     const referenceStart = chartData[0];
//     const referenceEnd = chartData[chartData.length - 1];

//     const drift = {
//       tension: referenceEnd.tension - referenceStart.tension,
//       torsion: referenceEnd.torsion - referenceStart.torsion,
//       bendingMomentX: referenceEnd.bendingMomentX - referenceStart.bendingMomentX,
//       bendingMomentY: referenceEnd.bendingMomentX - referenceStart.bendingMomentY,
//       temperature: referenceEnd.temperature - referenceStart.temperature,
//     };

//     const compensatedData = chartData.map((item) => ({
//       x: item.x,
//       tension: item.tension - drift.tension,
//       torsion: item.torsion - drift.torsion,
//       bendingMomentX: item.bendingMomentX - drift.bendingMomentX,
//       bendingMomentY: item.bendingMomentY - drift.bendingMomentY,
//       temperature: item.temperature - drift.temperature,
//     }));

//     setChartData(compensatedData);
//   };

//   const filterDataInRange = (startX, endX) => { 
//     let [start, end] = [startX, endX];
//     if (start > end) {
//       [start, end] = [end, start];
//     }

//     return chartData.filter(item => item.x >= start && item.x <= end);
//   };

//   const calculateValues = () => {
//     try {
//       const filteredData = filterDataInRange(startPosition * 100, endPosition * 65);
//       const properties = ['tension', 'torsion', 'bendingMomentY', 'bendingMomentX', 'temperature'];
//       const calculatedValues = {};

//       properties.forEach(property => {
//         const values = filteredData.map(item => item[property]);
//         if (values.length > 0) {
//           const max = Math.max(...values);
//           const min = Math.min(...values);
//           const mean = (values.reduce((acc, curr) => acc + curr, 0) / values.length);
//           const slope = (max - min) / (filteredData[filteredData.length - 1].x - filteredData[0].x);

//           calculatedValues[property] = {
//             max: max.toFixed(6),
//             min: min.toFixed(6),
//             mean: mean.toFixed(9),
//             slope: slope.toFixed(9)
//           };
//         } else {
//           calculatedValues[property] = {
//             max: null,
//             min: null,
//             mean: null,
//             slope: null
//           };
//         }
//       });
//       setCalculatedValues(calculatedValues);
//     } catch (error) {
//       console.error("Error in calculateValues:", error);
//       setError("An error occurred while calculating values. Please try again.");
//     }
//   };

//   useEffect(() => {
//     console.log("Start position changed:", startPosition);
//     console.log("End position changed:", endPosition);

//     calculateValues();
//   }, [startPosition, endPosition]);

//   return (
//     <>
//       <div className="border border-black p-4 rounded-lg shadow-lg " style={{ position: 'relative', width: '800px', height: '340px', bottom: '300px',boxShadow: '0 6px 8px rgba(0, 0, 0, 0.15), 0 3px 6px rgba(0, 0, 0, 0.1)', }}>
//         <button onClick={toggleViewBounds} className="border border-black text-sm font-medium rounded-md text-gray-700 bg-gray-200 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-black" style={{ position: 'relative', width: '150px', height: '40px', left: '81%', top: '60px' }}>
//           {showViewBounds ? 'Hide View Bounds' : 'Show View Bounds'}
//         </button>
//         <button onClick={calculateValues} className="border border-black text-sm font-medium rounded-md text-gray-700 bg-gray-200 hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-black" style={{ position: 'relative', height: '40px', width: '150px', left: '61%', top: '140px' }}>
//           Calculate Values
//         </button>
//       </div>  
    
//       {showViewBounds && (
//         <>
//           <div
//             ref={dragRef}
//             style={{ position: 'absolute', left: `${startPosition * 100}%`, top: '0%', borderLeft: '2px solid lightgreen', height: '25%', cursor: 'col-resize' }}
//             onMouseDown={() => setDraggingLeft(true)}
//           >
//             <span>Start Range: X - {calculateYAxisValues(startPosition * 100).x}</span>
//           </div>
//           <div
//             ref={dragRef}
//             style={{ position: 'absolute', left: `${endPosition * 100}%`, top: '0%', borderLeft: '2px solid red', height: '25%', cursor: 'col-resize' }}
//             onMouseDown={() => setDraggingRight(true)}
//           >
//             <span>End Range: X - {calculateYAxisValues(endPosition * 100).x}</span>
//           </div>
//         </>
//       )}
//       {calculatedValues && (
//         <div className="mt-4 overflow-x-auto " style={{ width: '600px', position: 'relative', bottom: '640px', left: '30px' ,height:'320px'}}>
//           <table className="min-w-full divide-y divide-gray-200" >
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Property</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Max</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Min</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mean</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">slope</th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {Object.keys(calculatedValues).map(property => (
//                 <tr key={property}>
//                   <td className="px-6 py-4 whitespace-nowrap">{property}</td>
//                   <td className="px-6 py-4 whitespace-nowrap">{calculatedValues[property].max}</td>
//                   <td className="px-6 py-4 whitespace-nowrap">{calculatedValues[property].min}</td>
//                   <td className="px-6 py-4 whitespace-nowrap">{calculatedValues[property].mean}</td>
//                   <td className="px-6 py-4 whitespace-nowrap">{calculatedValues[property].slope}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//       <div className="mt-4">
//         <select onChange={(e) => handleBoundsSelection(e.target.value)} className="border border-black text-sm font-medium rounded-md text-gray-700 bg-gray-200 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-black" style={{ position: 'relative', height: '40px', width: '150px', bottom:'750px', left:'635px' }}>
//           <option value="">Bounds</option>
//           <option value="Cut">Cut</option>
//           <option value="Clear Offset">Clear Offset</option>
//           <option value="Drift Compensation">Drift Compensation</option>
//         </select>
//       </div>
//       {error && (
//         <div className="text-red-500 mt-2" style={{ position: 'relative', bottom: '780px', left: '30px' }}>
//           {error}
//         </div>
//       )}
//     </>
//   );
// };

// export default ViewBoundsToggle;


// import React, { useState, useRef, useEffect } from 'react';

// const ViewBoundsToggle = ({ chartRef, chartData, setChartData, originalChartData, setOriginalChartData, width, height }) => {
//   const [showViewBounds, setShowViewBounds] = useState(false);
//   const [draggingLeft, setDraggingLeft] = useState(false);
//   const [draggingRight, setDraggingRight] = useState(false);
//   const [startPosition, setStartPosition] = useState(0);
//   const [endPosition, setEndPosition] = useState(1);
//   const [calculatedValues, setCalculatedValues] = useState(null);
//   const [error, setError] = useState(null);
//   const dragRef = useRef(null);

//   useEffect(() => {
//     const handleMouseMove = (event) => {
//       try {
//         if (draggingLeft) {
//           handleLeftLineDrag(event);
//         } else if (draggingRight) {
//           handleRightLineDrag(event);
//         }
//       } catch (error) {
//         console.error("Error in mouse move handler:", error);
//         setError("An error occurred while dragging. Please try again.");
//       }
//     };
    
//     const handleMouseUp = () => {
//       setDraggingLeft(false);
//       setDraggingRight(false);
//     };
  
//     document.addEventListener('mousemove', handleMouseMove);
//     document.addEventListener('mouseup', handleMouseUp);
  
//     return () => {
//       document.removeEventListener('mousemove', handleMouseMove);
//       document.removeEventListener('mouseup', handleMouseUp);
//     };
//   }, [draggingLeft, draggingRight]);

//   useEffect(() => {
//     if (chartData && chartData.length > 0) {
//       setStartPosition(0);
//       setEndPosition(chartData.length - 1);
//     }
//   }, [chartData]);

//   const toggleViewBounds = () => {
//     setShowViewBounds(!showViewBounds);
//   };

//   const formatTime = (seconds) => {
//     const date = new Date(null);
//     date.setSeconds(seconds);
//     return date.toISOString().substr(11, 12);
//   };

//   const calculateYAxisValues = (index) => {
//     if (!chartData || chartData.length === 0 || index < 0 || index >= chartData.length) {
//       return {
//         x: 'N/A',
//         tension: 'N/A',
//         torsion: 'N/A',
//         bendingMomentY: 'N/A',
//         bendingMomentX: 'N/A',
//         temperature: 'N/A',
//       };
//     }
  
//     const point = chartData[index];
//     return {
//       x: formatTime(point.x),
//       tension: point.tension,
//       torsion: point.torsion,
//       bendingMomentY: point.bendingMomentY,
//       bendingMomentX: point.bendingMomentX,
//       temperature: point.temperature,
//     };
//   };
  
//   const handleLeftLineDrag = (event) => {
//     try {
//       const chartBounds = chartRef.current.getBoundingClientRect();
//       const chartWidth = chartBounds.width;
//       const mouseX = event.clientX - chartBounds.left;
//       const newIndex = Math.floor((mouseX / chartWidth) * (chartData.length - 1));
//       const newPosition = Math.max(0, Math.min(newIndex, endPosition - 1));
//       setStartPosition(newPosition);
//       calculateValues();
//     } catch (error) {
//       console.error("Error in handleLeftLineDrag:", error);
//       setError("An error occurred while dragging the left line. Please try again.");
//     }
//   };
  
//   const handleRightLineDrag = (event) => {
//     try {
//       const chartBounds = chartRef.current.getBoundingClientRect();
//       const chartWidth = chartBounds.width;
//       const mouseX = event.clientX - chartBounds.left;
//       const newIndex = Math.floor((mouseX / chartWidth) * (chartData.length - 1));
//       const newPosition = Math.max(startPosition + 1, Math.min(newIndex, chartData.length - 1));
//       setEndPosition(newPosition);
//       calculateValues();
//     } catch (error) {
//       console.error("Error in handleRightLineDrag:", error);
//       setError("An error occurred while dragging the right line. Please try again.");
//     }
//   };

//   const handleBoundsSelection = (option) => {
//     try {
//       if (option === "Cut") {
//         cutData();
//       } else if (option === "Clear Offset") {
//         clearOffset();
//       } else if (option === "Drift Compensation") {
//         applyDriftCompensation();
//       }
//     } catch (error) {
//       console.error("Error in handleBoundsSelection:", error);
//       setError("An error occurred while performing the selected action. Please try again.");
//     }
//   };

//   const clearOffset = () => {
//     setChartData(originalChartData);
//   };

//   const cutData = () => {
//     const newData = chartData.slice(startPosition, endPosition + 1);
//     setChartData(newData);
//   };

//   const applyDriftCompensation = () => {
//     const referenceStart = chartData[startPosition];
//     const referenceEnd = chartData[endPosition];

//     const drift = {
//       tension: (referenceEnd.tension - referenceStart.tension) / (endPosition - startPosition),
//       torsion: (referenceEnd.torsion - referenceStart.torsion) / (endPosition - startPosition),
//       bendingMomentX: (referenceEnd.bendingMomentX - referenceStart.bendingMomentX) / (endPosition - startPosition),
//       bendingMomentY: (referenceEnd.bendingMomentY - referenceStart.bendingMomentY) / (endPosition - startPosition),
//       temperature: (referenceEnd.temperature - referenceStart.temperature) / (endPosition - startPosition),
//     };

//     const compensatedData = chartData.map((item, index) => ({
//       x: item.x,
//       tension: item.tension - drift.tension * (index - startPosition),
//       torsion: item.torsion - drift.torsion * (index - startPosition),
//       bendingMomentX: item.bendingMomentX - drift.bendingMomentX * (index - startPosition),
//       bendingMomentY: item.bendingMomentY - drift.bendingMomentY * (index - startPosition),
//       temperature: item.temperature - drift.temperature * (index - startPosition),
//     }));

//     setChartData(compensatedData);
//   };

//   const calculateValues = () => {
//     try {
//       const selectedData = chartData.slice(startPosition, endPosition + 1);
//       const properties = ['tension', 'torsion', 'bendingMomentY', 'bendingMomentX', 'temperature'];
//       const calculatedValues = {};

//       properties.forEach(property => {
//         const values = selectedData.map(item => item[property]);
//         if (values.length > 0) {
//           const max = Math.max(...values);
//           const min = Math.min(...values);
//           const mean = (values.reduce((acc, curr) => acc + curr, 0) / values.length);
//           const slope = (values[values.length - 1] - values[0]) / (selectedData[selectedData.length - 1].x - selectedData[0].x);

//           calculatedValues[property] = {
//             max: max.toFixed(6),
//             min: min.toFixed(6),
//             mean: mean.toFixed(9),
//             slope: slope.toFixed(9)
//           };
//         } else {
//           calculatedValues[property] = {
//             max: null,
//             min: null,
//             mean: null,
//             slope: null
//           };
//         }
//       });
//       setCalculatedValues(calculatedValues);
//     } catch (error) {
//       console.error("Error in calculateValues:", error);
//       setError("An error occurred while calculating values. Please try again.");
//     }
//   };

//   useEffect(() => {
//     calculateValues();
//   }, [startPosition, endPosition, chartData]);

//   const getLinePosition = (index) => {
//     if (!chartRef.current || chartData.length === 0) return 0;
//     const chartBounds = chartRef.current.getBoundingClientRect();
//     return (index / (chartData.length - 1)) * chartBounds.width;
//   };

//   return (
//     <>
//       <div className="border border-black p-4 rounded-lg shadow-lg" style={{ position: 'relative', width: '800px', height: '340px', bottom: '300px', boxShadow: '0 6px 8px rgba(0, 0, 0, 0.15), 0 3px 6px rgba(0, 0, 0, 0.1)' }}>
//         <button onClick={toggleViewBounds} className="border border-black text-sm font-medium rounded-md text-gray-700 bg-gray-200 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-black" style={{ position: 'relative', width: '150px', height: '40px', left: '81%', top: '60px' }}>
//           {showViewBounds ? 'Hide View Bounds' : 'Show View Bounds'}
//         </button>
//         <button onClick={calculateValues} className="border border-black text-sm font-medium rounded-md text-gray-700 bg-gray-200 hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-black" style={{ position: 'relative', height: '40px', width: '150px', left: '61%', top: '140px' }}>
//           Calculate Values
//         </button>
//       </div>  
    
//       {showViewBounds && (
//         <>
//           <div
//             ref={dragRef}
//             style={{ position: 'absolute', left: `${getLinePosition(startPosition)}px`, top: '0%', borderLeft: '2px solid lightgreen', height: '25%', cursor: 'col-resize' }}
//             onMouseDown={() => setDraggingLeft(true)}
//           >
//             <span>Start Range: X - {calculateYAxisValues(startPosition).x}</span>
//           </div>
//           <div
//             ref={dragRef}
//             style={{ position: 'absolute', left: `${getLinePosition(endPosition)}px`, top: '0%', borderLeft: '2px solid red', height: '25%', cursor: 'col-resize' }}
//             onMouseDown={() => setDraggingRight(true)}
//           >
//             <span>End Range: X - {calculateYAxisValues(endPosition).x}</span>
//           </div>
//         </>
//       )}
//       {calculatedValues && (
//         <div className="mt-4 overflow-x-auto" style={{ width: '600px', position: 'relative', bottom: '640px', left: '30px', height: '320px' }}>
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Property</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Max</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Min</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mean</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Slope</th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {Object.keys(calculatedValues).map(property => (
//                 <tr key={property}>
//                   <td className="px-6 py-4 whitespace-nowrap">{property}</td>
//                   <td className="px-6 py-4 whitespace-nowrap">{calculatedValues[property].max}</td>
//                   <td className="px-6 py-4 whitespace-nowrap">{calculatedValues[property].min}</td>
//                   <td className="px-6 py-4 whitespace-nowrap">{calculatedValues[property].mean}</td>
//                   <td className="px-6 py-4 whitespace-nowrap">{calculatedValues[property].slope}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//       <div className="mt-4">
//         <select onChange={(e) => handleBoundsSelection(e.target.value)} className="border border-black text-sm font-medium rounded-md text-gray-700 bg-gray-200 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-black" style={{ position: 'relative', height: '40px', width: '150px', bottom: '750px', left: '635px' }}>
//           <option value="">Bounds</option>
//           <option value="Cut">Cut</option>
//           <option value="Clear Offset">Clear Offset</option>
//           <option value="Drift Compensation">Drift Compensation</option>
//         </select>
//       </div>
//       {error && (
//         <div className="text-red-500 mt-2" style={{ position: 'relative', bottom: '780px', left: '30px' }}>
//           {error}
//         </div>
//       )}
//     </>
//   );
// };

// export default ViewBoundsToggle;



// import React, { useState, useRef, useEffect } from 'react';

// // Custom Toast component
// const Toast = ({ children, onClose }) => {
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       onClose();
//     }, 3000);

//     return () => clearTimeout(timer);
//   }, [onClose]);

//   return (
//     <div className="fixed bottom-4 right-4 bg-gray-800 text-white px-4 py-2 rounded-md shadow-lg">
//       {children}
//     </div>
//   );
// };

// const ViewBoundsToggle = ({ chartRef, chartData, setChartData, originalChartData, setOriginalChartData, width, height }) => {
//   const [showViewBounds, setShowViewBounds] = useState(false);
//   const [draggingLeft, setDraggingLeft] = useState(false);
//   const [draggingRight, setDraggingRight] = useState(false);
//   const [startPosition, setStartPosition] = useState(0);
//   const [endPosition, setEndPosition] = useState(0);
//   const [calculatedValues, setCalculatedValues] = useState(null);
//   const [error, setError] = useState(null);
//   const [isCalculating, setIsCalculating] = useState(false);
//   const [showToast, setShowToast] = useState(false);
//   const dragRef = useRef(null);

//   useEffect(() => {
//     const handleMouseMove = (event) => {
//       try {
//         if (draggingLeft) {
//           handleLeftLineDrag(event);
//         } else if (draggingRight) {
//           handleRightLineDrag(event);
//         }
//       } catch (error) {
//         console.error("Error in mouse move handler:", error);
//         setError("An error occurred while dragging. Please try again.");
//       }
//     };
    
//     const handleMouseUp = () => {
//       setDraggingLeft(false);
//       setDraggingRight(false);
//     };
  
//     document.addEventListener('mousemove', handleMouseMove);
//     document.addEventListener('mouseup', handleMouseUp);
  
//     return () => {
//       document.removeEventListener('mousemove', handleMouseMove);
//       document.removeEventListener('mouseup', handleMouseUp);
//     };
//   }, [draggingLeft, draggingRight]);

//   useEffect(() => {
//     if (chartData && chartData.length > 0) {
//       setStartPosition(0);
//       setEndPosition(chartData.length - 1);
//     }
//   }, [chartData]);

//   const toggleViewBounds = () => {
//     setShowViewBounds(!showViewBounds);
//   };

//   const formatTime = (seconds) => {
//     const date = new Date(null);
//     date.setSeconds(seconds);
//     return date.toISOString().substr(11, 12);
//   };

//   const calculateYAxisValues = (index) => {
//     if (!chartData || chartData.length === 0 || index < 0 || index >= chartData.length) {
//       return {
//         x: 'N/A',
//         tension: 'N/A',
//         torsion: 'N/A',
//         bendingMomentY: 'N/A',
//         bendingMomentX: 'N/A',
//         temperature: 'N/A',
//       };
//     }
  
//     const point = chartData[index];
//     return {
//       x: formatTime(point.x),
//       tension: point.tension,
//       torsion: point.torsion,
//       bendingMomentY: point.bendingMomentY,
//       bendingMomentX: point.bendingMomentX,
//       temperature: point.temperature,
//     };
//   };
  
//   const handleLeftLineDrag = (event) => {
//     try {
//       const chartBounds = chartRef.current.getBoundingClientRect();
//       const chartWidth = chartBounds.width;
//       const mouseX = event.clientX - chartBounds.left;
//       const newIndex = Math.floor((mouseX / chartWidth) * (chartData.length - 1));
//       const newPosition = Math.max(0, Math.min(newIndex, endPosition - 1));
//       setStartPosition(newPosition);
//       calculateValues(newPosition, endPosition);
//     } catch (error) {
//       console.error("Error in handleLeftLineDrag:", error);
//       setError("An error occurred while dragging the left line. Please try again.");
//     }
//   };
  
//   const handleRightLineDrag = (event) => {
//     try {
//       const chartBounds = chartRef.current.getBoundingClientRect();
//       const chartWidth = chartBounds.width;
//       const mouseX = event.clientX - chartBounds.left;
//       const newIndex = Math.floor((mouseX / chartWidth) * (chartData.length - 1));
//       const newPosition = Math.max(startPosition + 1, Math.min(newIndex, chartData.length - 1));
//       setEndPosition(newPosition);
//       calculateValues(startPosition, newPosition);
//     } catch (error) {
//       console.error("Error in handleRightLineDrag:", error);
//       setError("An error occurred while dragging the right line. Please try again.");
//     }
//   };

//   const handleBoundsSelection = (option) => {
//     try {
//       if (option === "Cut") {
//         cutData();
//       } else if (option === "Clear Offset") {
//         clearOffset();
//       } else if (option === "Drift Compensation") {
//         applyDriftCompensation();
//       }
//     } catch (error) {
//       console.error("Error in handleBoundsSelection:", error);
//       setError("An error occurred while performing the selected action. Please try again.");
//     }
//   };

//   const clearOffset = () => {
//     setChartData(originalChartData);
//   };

//   const cutData = () => {
//     const newData = chartData.slice(startPosition, endPosition + 1);
//     setChartData(newData);
//   };

//   const applyDriftCompensation = () => {
//     const referenceStart = chartData[startPosition];
//     const referenceEnd = chartData[endPosition];

//     const drift = {
//       tension: (referenceEnd.tension - referenceStart.tension) / (endPosition - startPosition),
//       torsion: (referenceEnd.torsion - referenceStart.torsion) / (endPosition - startPosition),
//       bendingMomentX: (referenceEnd.bendingMomentX - referenceStart.bendingMomentX) / (endPosition - startPosition),
//       bendingMomentY: (referenceEnd.bendingMomentY - referenceStart.bendingMomentY) / (endPosition - startPosition),
//       temperature: (referenceEnd.temperature - referenceStart.temperature) / (endPosition - startPosition),
//     };

//     const compensatedData = chartData.map((item, index) => ({
//       x: item.x,
//       tension: item.tension - drift.tension * (index - startPosition),
//       torsion: item.torsion - drift.torsion * (index - startPosition),
//       bendingMomentX: item.bendingMomentX - drift.bendingMomentX * (index - startPosition),
//       bendingMomentY: item.bendingMomentY - drift.bendingMomentY * (index - startPosition),
//       temperature: item.temperature - drift.temperature * (index - startPosition),
//     }));

//     setChartData(compensatedData);
//   };

//   const calculateValues = (start = startPosition, end = endPosition) => {
//     setIsCalculating(true);
//     setError(null);
//     setShowToast(true);
  
//     const processChunk = (chunkStart, chunkEnd) => {
//       return new Promise((resolve) => {
//         setTimeout(() => {
//           const chunkData = chartData.slice(chunkStart, chunkEnd);
//           const chunkResults = {};
  
//           ['tension', 'torsion', 'bendingMomentY', 'bendingMomentX', 'temperature'].forEach(property => {
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
  
//     for (let i = start; i < end; i += chunkSize) {
//       chunks.push(processChunk(i, Math.min(i + chunkSize, end)));
//     }
  
//     Promise.all(chunks)
//       .then(results => {
//         const finalResults = {};
//         ['tension', 'torsion', 'bendingMomentY', 'bendingMomentX', 'temperature'].forEach(property => {
//           const propertyResults = results.map(chunk => chunk[property]);
//           const max = Math.max(...propertyResults.map(r => r.max));
//           const min = Math.min(...propertyResults.map(r => r.min));
//           const sum = propertyResults.reduce((acc, curr) => acc + curr.sum, 0);
//           const count = propertyResults.reduce((acc, curr) => acc + curr.count, 0);
//           const mean = count > 0 ? sum / count : 0;
  
//           const firstValue = chartData[start][property];
//           const lastValue = chartData[end - 1][property];
//           const slope = (lastValue - firstValue) / (chartData[end - 1].x - chartData[start].x);
  
//           finalResults[property] = {
//             max: max.toFixed(6),
//             min: min.toFixed(6),
//             mean: mean.toFixed(9),
//             slope: slope.toFixed(9)
//           };
//         });
  
//         setCalculatedValues(finalResults);
//         setIsCalculating(false);
//         setShowToast(false);
//       })
//       .catch(error => {
//         console.error("Error in calculateValues:", error);
//         setError("An error occurred while calculating values. Please try again.");
//         setIsCalculating(false);
//         setShowToast(false);
//       });
//   };
//   useEffect(() => {
//     calculateValues();
//   }, [startPosition, endPosition, chartData]);

//   const getLinePosition = (index) => {
//     if (!chartRef.current || chartData.length === 0) return 0;
//     const chartBounds = chartRef.current.getBoundingClientRect();
//     return (index / (chartData.length - 1)) * chartBounds.width;
//   };

//   return (
//     <>
//       <div className="border border-black p-4 rounded-lg shadow-lg" style={{ position: 'relative', width: '800px', height: '340px', bottom: '300px', boxShadow: '0 6px 8px rgba(0, 0, 0, 0.15), 0 3px 6px rgba(0, 0, 0, 0.1)' }}>
//         <button onClick={toggleViewBounds} className="border border-black text-sm font-medium rounded-md text-gray-700 bg-gray-200 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-black" style={{ position: 'relative', width: '150px', height: '40px', left: '81%', top: '60px' }}>
//           {showViewBounds ? 'Hide View Bounds' : 'Show View Bounds'}
//         </button>
//         <button onClick={() => calculateValues()} className="border border-black text-sm font-medium rounded-md text-gray-700 bg-gray-200 hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-black" style={{ position: 'relative', height: '40px', width: '150px', left: '61%', top: '140px' }}>
//           Calculate Values
//         </button>
//       </div>  
    
//       {showViewBounds && (
//         <>
//           <div
//             ref={dragRef}
//             style={{ position: 'absolute', left: `${getLinePosition(startPosition)}px`, top: '0%', borderLeft: '2px solid lightgreen', height: '25%', cursor: 'col-resize' }}
//             onMouseDown={() => setDraggingLeft(true)}
//           >
//             <span>Start Range: X - {calculateYAxisValues(startPosition).x}</span>
//           </div>
//           <div
//             ref={dragRef}
//             style={{ position: 'absolute', left: `${getLinePosition(endPosition)}px`, top: '0%', borderLeft: '2px solid red', height: '25%', cursor: 'col-resize' }}
//             onMouseDown={() => setDraggingRight(true)}
//           >
//             <span>End Range: X - {calculateYAxisValues(endPosition).x}</span>
//           </div>
//         </>
//       )}
//       {showToast && (
//         <Toast onClose={() => setShowToast(false)}>
//           <div className="text-sm font-medium">Calculating values...</div>
//         </Toast>
//       )}
//       {calculatedValues && !isCalculating && (
//         <div className="mt-4 overflow-x-auto" style={{ width: '600px', position: 'relative', bottom: '640px', left: '30px', height: '320px' }}>
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Property</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Max</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Min</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mean</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Slope</th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {Object.keys(calculatedValues).map(property => (
//                 <tr key={property}>
//                   <td className="px-6 py-4 whitespace-nowrap">{property}</td>
//                   <td className="px-6 py-4 whitespace-nowrap">{calculatedValues[property].max}</td>
//                   <td className="px-6 py-4 whitespace-nowrap">{calculatedValues[property].min}</td>
//                   <td className="px-6 py-4 whitespace-nowrap">{calculatedValues[property].mean}</td>
//                   <td className="px-6 py-4 whitespace-nowrap">{calculatedValues[property].slope}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//       <div className="mt-4">
//         <select onChange={(e) => handleBoundsSelection(e.target.value)} className="border border-black text-sm font-medium rounded-md text-gray-700 bg-gray-200 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-black" style={{ position: 'relative', height: '40px', width: '150px', bottom: '750px', left: '635px' }}>
//           <option value="">Bounds</option>
//           <option value="Cut">Cut</option>
//           <option value="Clear Offset">Clear Offset</option>
//           <option value="Drift Compensation">Drift Compensation</option>
//         </select>
//       </div>
//       {error && (
//         <div className="text-red-500 mt-2" style={{ position: 'relative', bottom: '780px', left: '30px' }}>
//           {error}
//         </div>
//       )}
//     </>
//   );
// };

// export default ViewBoundsToggle;


//''''''see below is the correct working final code'''''''//

// import React, { useState, useRef, useEffect } from 'react';

// // Custom Toast component
// const Toast = ({ children, onClose }) => {
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       onClose();
//     }, 3000);

//     return () => clearTimeout(timer);
//   }, [onClose]);

//   return (
//     <div className="fixed bottom-4 left-4 bg-gray-800 text-white px-4 py-2 rounded-md shadow-lg">
//       {children}
//     </div>
//   );
// };

// const ViewBoundsToggle = ({ chartRef, chartData, setChartData, originalChartData, setOriginalChartData, width, height }) => {
//   const [showViewBounds, setShowViewBounds] = useState(false);
//   const [draggingLeft, setDraggingLeft] = useState(false);
//   const [draggingRight, setDraggingRight] = useState(false);
//   const [startPosition, setStartPosition] = useState(0);
//   const [endPosition, setEndPosition] = useState(0);
//   const [calculatedValues, setCalculatedValues] = useState({
//     tension: { max: 'N/A', min: 'N/A', mean: 'N/A', slope: 'N/A' },
//     torsion: { max: 'N/A', min: 'N/A', mean: 'N/A', slope: 'N/A' },
//     bendingMomentY: { max: 'N/A', min: 'N/A', mean: 'N/A', slope: 'N/A' },
//     bendingMomentX: { max: 'N/A', min: 'N/A', mean: 'N/A', slope: 'N/A' },
//     temperature: { max: 'N/A', min: 'N/A', mean: 'N/A', slope: 'N/A' }
//   });
//   const [error, setError] = useState(null);
//   const [isCalculating, setIsCalculating] = useState(false);
//   const [showToast, setShowToast] = useState(false);
//   const dragRef = useRef(null);


  
//   useEffect(() => {
//     const handleMouseMove = (event) => {
//       try {
//         if (draggingLeft) {
//           handleLeftLineDrag(event);
//         } else if (draggingRight) {
//           handleRightLineDrag(event);
//         }
//       } catch (error) {
//         console.error("Error in mouse move handler:", error);
//         setError("An error occurred while dragging. Please try again.");
//       }
//     };
    
//     const handleMouseUp = () => {
//       setDraggingLeft(false);
//       setDraggingRight(false);
//     };
  
//     document.addEventListener('mousemove', handleMouseMove);
//     document.addEventListener('mouseup', handleMouseUp);
  
//     return () => {
//       document.removeEventListener('mousemove', handleMouseMove);
//       document.removeEventListener('mouseup', handleMouseUp);
//     };
//   }, [draggingLeft, draggingRight]);

//   useEffect(() => {
//     if (chartData && chartData.length > 0) {
//       setStartPosition(0);
//       setEndPosition(chartData.length - 1);
//       calculateValues(0, chartData.length - 1);
//     } else {
//       setCalculatedValues({
//         tension: { max: 'N/A', min: 'N/A', mean: 'N/A', slope: 'N/A' },
//         torsion: { max: 'N/A', min: 'N/A', mean: 'N/A', slope: 'N/A' },
//         bendingMomentY: { max: 'N/A', min: 'N/A', mean: 'N/A', slope: 'N/A' },
//         bendingMomentX: { max: 'N/A', min: 'N/A', mean: 'N/A', slope: 'N/A' },
//         temperature: { max: 'N/A', min: 'N/A', mean: 'N/A', slope: 'N/A' }
//       });
//     }
//   }, [chartData]);

//   const toggleViewBounds = () => {
//     setShowViewBounds(!showViewBounds);
//   };

//   const formatTime = (seconds) => {
//     const date = new Date(null);
//     date.setSeconds(seconds);
//     return date.toISOString().substr(11, 12);
//   };

//   const calculateYAxisValues = (index) => {
//     if (!chartData || chartData.length === 0 || index < 0 || index >= chartData.length) {
//       return {
//         x: 'N/A',
//         tension: 'N/A',
//         torsion: 'N/A',
//         bendingMomentY: 'N/A',
//         bendingMomentX: 'N/A',
//         temperature: 'N/A',
//       };
//     }
  
//     const point = chartData[index];
//     return {
//       x: formatTime(point.x),
//       tension: point.tension,
//       torsion: point.torsion,
//       bendingMomentY: point.bendingMomentY,
//       bendingMomentX: point.bendingMomentX,
//       temperature: point.temperature,
//     };
//   };
  
//   const handleLeftLineDrag = (event) => {
//     try {
//       const chartBounds = chartRef.current.getBoundingClientRect();
//       const chartWidth = chartBounds.width;
//       const mouseX = event.clientX - chartBounds.left;
//       const newIndex = Math.floor((mouseX / chartWidth) * (chartData.length - 1));
//       const newPosition = Math.max(0, Math.min(newIndex, endPosition - 1));
//       setStartPosition(newPosition);
//       calculateValues(newPosition, endPosition);
//     } catch (error) {
//       console.error("Error in handleLeftLineDrag:", error);
//       setError("An error occurred while dragging the left line. Please try again.");
//     }
//   };
  
//   const handleRightLineDrag = (event) => {
//     try {
//       const chartBounds = chartRef.current.getBoundingClientRect();
//       const chartWidth = chartBounds.width;
//       const mouseX = event.clientX - chartBounds.left;
//       const newIndex = Math.floor((mouseX / chartWidth) * (chartData.length - 1));
//       const newPosition = Math.max(startPosition + 1, Math.min(newIndex, chartData.length - 1));
//       setEndPosition(newPosition);
//       calculateValues(startPosition, newPosition);
//     } catch (error) {
//       console.error("Error in handleRightLineDrag:", error);
//       setError("An error occurred while dragging the right line. Please try again.");
//     }
//   };

//   const handleBoundsSelection = (option) => {
//     try {
//       if (option === "Cut") {
//         cutData();
//       } else if (option === "Clear Offset") {
//         clearOffset();
//       } else if (option === "Drift Compensation") {
//         applyDriftCompensation();
//       }
//     } catch (error) {
//       console.error("Error in handleBoundsSelection:", error);
//       setError("An error occurred while performing the selected action. Please try again.");
//     }
//   };

//   const clearOffset = () => {
//     setChartData(originalChartData);
//   };

  // const cutData = () => {
  //   const newData = chartData.slice(startPosition, endPosition + 1);
  //   setChartData(newData);
  // };

//   const applyDriftCompensation = () => {
//     const referenceStart = chartData[startPosition];
//     const referenceEnd = chartData[endPosition];

//     const drift = {
//       tension: (referenceEnd.tension - referenceStart.tension) / (endPosition - startPosition),
//       torsion: (referenceEnd.torsion - referenceStart.torsion) / (endPosition - startPosition),
//       bendingMomentX: (referenceEnd.bendingMomentX - referenceStart.bendingMomentX) / (endPosition - startPosition),
//       bendingMomentY: (referenceEnd.bendingMomentY - referenceStart.bendingMomentY) / (endPosition - startPosition),
//       temperature: (referenceEnd.temperature - referenceStart.temperature) / (endPosition - startPosition),
//     };

//     const compensatedData = chartData.map((item, index) => ({
//       x: item.x,
//       tension: item.tension - drift.tension * (index - startPosition),
//       torsion: item.torsion - drift.torsion * (index - startPosition),
//       bendingMomentX: item.bendingMomentX - drift.bendingMomentX * (index - startPosition),
//       bendingMomentY: item.bendingMomentY - drift.bendingMomentY * (index - startPosition),
//       temperature: item.temperature - drift.temperature * (index - startPosition),
//     }));

//     setChartData(compensatedData);
//   };

//   const calculateValues = (start = startPosition, end = endPosition) => {
//     setIsCalculating(true);
//     setError(null);
//     setShowToast(true);
  
//     if (!chartData || chartData.length === 0) {
//       setCalculatedValues({
//         tension: { max: 'N/A', min: 'N/A', mean: 'N/A', slope: 'N/A' },
//         torsion: { max: 'N/A', min: 'N/A', mean: 'N/A', slope: 'N/A' },
//         bendingMomentY: { max: 'N/A', min: 'N/A', mean: 'N/A', slope: 'N/A' },
//         bendingMomentX: { max: 'N/A', min: 'N/A', mean: 'N/A', slope: 'N/A' },
//         temperature: { max: 'N/A', min: 'N/A', mean: 'N/A', slope: 'N/A' }
//       });
//       setIsCalculating(false);
//       setShowToast(false);
//       return;
//     }

//     const processChunk = (chunkStart, chunkEnd) => {
//       return new Promise((resolve) => {
//         setTimeout(() => {
//           const chunkData = chartData.slice(chunkStart, chunkEnd);
//           const chunkResults = {};
  
//           ['tension', 'torsion', 'bendingMomentY', 'bendingMomentX', 'temperature'].forEach(property => {
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
  
//     for (let i = start; i < end; i += chunkSize) {
//       chunks.push(processChunk(i, Math.min(i + chunkSize, end)));
//     }
  
//     Promise.all(chunks)
//       .then(results => {
//         const finalResults = {};
//         ['tension', 'torsion', 'bendingMomentY', 'bendingMomentX', 'temperature'].forEach(property => {
//           const propertyResults = results.map(chunk => chunk[property]);
//           const max = Math.max(...propertyResults.map(r => r.max));
//           const min = Math.min(...propertyResults.map(r => r.min));
//           const sum = propertyResults.reduce((acc, curr) => acc + curr.sum, 0);
//           const count = propertyResults.reduce((acc, curr) => acc + curr.count, 0);
//           const mean = count > 0 ? sum / count : 0;
  
//           const firstValue = chartData[start][property];
//           const lastValue = chartData[end - 1][property];
//           const slope = (lastValue - firstValue) / (chartData[end - 1].x - chartData[start].x);
  
//           finalResults[property] = {
//             max: max.toFixed(6),
//             min: min.toFixed(6),
//             mean: mean.toFixed(9),
//             slope: slope.toFixed(9)
//           };
//         });
  
//         setCalculatedValues(finalResults);
//         setIsCalculating(false);
//         setShowToast(false);
//       })
//       .catch(error => {
//         console.error("Error in calculateValues:", error);
//         setError("An error occurred while calculating values. Please try again.");
//         setIsCalculating(false);
//         setShowToast(false);
//       });
//   };

//   useEffect(() => {
//     calculateValues();
//   }, [startPosition, endPosition, chartData]);

//   // const getLinePosition = (index) => {
//   //   if (!chartRef.current || chartData.length === 0) return 0;
//   //   const chartBounds = chartRef.current.getBoundingClientRect();
//   //   const chartWidth = chartBounds.width;
//   //   const chartPadding = 90; // Adjust this value based on your chart's actual padding
//   //   const availableWidth = chartWidth - (2 * chartPadding);
//   //   return chartPadding + (index / (chartData.length - 1)) * availableWidth;
//   // };
//  const getLinePosition = (index) => {
//     if (!chartRef.current || chartData.length === 0) return 0;
//     const chartBounds = chartRef.current.getBoundingClientRect();
//     const chartWidth = chartBounds.width;
//     const chartPadding = 90; // Adjust this value based on your chart's actual padding
//     const availableWidth = chartWidth - (2 * chartPadding);
    
//     // Calculate the position based on the time value
//     const startTime = chartData[0].x;
//     const endTime = chartData[chartData.length - 1].x;
//     const currentTime = chartData[index].x;
//     const timePosition = (currentTime - startTime) / (endTime - startTime);
    
//     return chartPadding + timePosition * availableWidth;
//   };
//   return (
//     <>
//       <div className="border border-black p-4 rounded-lg shadow-lg" style={{ position: 'relative', width: '800px', height: '340px', bottom: '300px', boxShadow: '0 6px 8px rgba(0, 0, 0, 0.15), 0 3px 6px rgba(0, 0, 0, 0.1)' }}>
//         <button onClick={toggleViewBounds} className="border border-black text-sm font-medium rounded-md text-gray-700 bg-gray-200 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-black" style={{ position: 'relative', width: '150px', height: '40px', left: '81%', top: '60px' }}>
//           {showViewBounds ? 'Hide View Bounds' : 'Show View Bounds'}
//         </button>
//         <button onClick={() => calculateValues()} className="border border-black text-sm font-medium rounded-md text-gray-700 bg-gray-200 hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-black" style={{ position: 'relative', height: '40px', width: '150px', left: '61%', top: '140px' }}>
//           Calculate Values
//         </button>
//       </div>  
    
//       {showViewBounds && (
//         <>
//           <div
//             ref={dragRef}
//             style={{ position: 'absolute', left: `${getLinePosition(startPosition)}px`, top: '0%', borderLeft: '2px solid lightgreen', height: '45%', cursor: 'col-resize' }}
//             onMouseDown={() => setDraggingLeft(true)}
//           >
//             <span>Start Range: X - {calculateYAxisValues(startPosition).x}</span>
//           </div>
//           <div
//             ref={dragRef}
//             style={{ position: 'absolute', left: `${getLinePosition(endPosition)}px`, top: '0%', borderLeft: '2px solid red', height: '45%', cursor: 'col-resize' }}
//             onMouseDown={() => setDraggingRight(true)}
//           >
//             <span>End Range: X - {calculateYAxisValues(endPosition).x}</span>
//           </div>
//         </>
//       )}
//       {showToast && (
//         <Toast onClose={() => setShowToast(false)}>
//           <div className="text-sm font-medium">Calculating values...</div>
//         </Toast>
//       )}
//       {calculatedValues && !isCalculating && (
//         <div className="mt-4 overflow-x-auto" style={{ width: '600px', position: 'relative', bottom: '640px', left: '30px', height: '320px' }}>
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Property</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Max</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Min</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mean</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Slope</th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {Object.keys(calculatedValues).map(property => (
//                 <tr key={property}>
//                   <td className="px-6 py-4 whitespace-nowrap">{property}</td>
//                   <td className="px-6 py-4 whitespace-nowrap">{calculatedValues[property].max}</td>
//                   <td className="px-6 py-4 whitespace-nowrap">{calculatedValues[property].min}</td>
//                   <td className="px-6 py-4 whitespace-nowrap">{calculatedValues[property].mean}</td>
//                   <td className="px-6 py-4 whitespace-nowrap">{calculatedValues[property].slope}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//       <div className="mt-4">
//         <select onChange={(e) => handleBoundsSelection(e.target.value)} className="border border-black text-sm font-medium rounded-md text-gray-700 bg-gray-200 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-black" style={{ position: 'relative', height: '40px', width: '150px', bottom: '750px', left: '635px' }}>
//           <option value="">Bounds</option>
//           <option value="Cut">Cut</option>
//           <option value="Clear Offset">Clear Offset</option>
//           <option value="Drift Compensation">Drift Compensation</option>
//         </select>
//       </div>
//       {error && (
//         <div className="text-red-500 mt-2" style={{ position: 'relative', bottom: '780px', left: '30px' }}>
//           {error}
//         </div>
//       )}
//     </>
//   );
// };

// export default ViewBoundsToggle;


// import React, { useState, useRef, useEffect } from 'react';

// // Custom Toast component
// const Toast = ({ children, onClose }) => {
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       onClose();
//     }, 3000);

//     return () => clearTimeout(timer);
//   }, [onClose]);

//   return (
//     <div className="fixed bottom-4 left-4 bg-gray-800 text-white px-4 py-2 rounded-md shadow-lg">
//       {children}
//     </div>
//   );
// };

// const ViewBoundsToggle = ({ chartRef, chartData, setChartData, originalChartData, setOriginalChartData, width, height }) => {
//   const [showViewBounds, setShowViewBounds] = useState(false);
//   const [draggingLeft, setDraggingLeft] = useState(false);
//   const [draggingRight, setDraggingRight] = useState(false);
//   const [startPosition, setStartPosition] = useState(0);
//   const [endPosition, setEndPosition] = useState(0);
//   const [calculatedValues, setCalculatedValues] = useState({
//     tension: { max: 'N/A', min: 'N/A', mean: 'N/A', slope: 'N/A' },
//     torsion: { max: 'N/A', min: 'N/A', mean: 'N/A', slope: 'N/A' },
//     bendingMomentY: { max: 'N/A', min: 'N/A', mean: 'N/A', slope: 'N/A' },
//     bendingMomentX: { max: 'N/A', min: 'N/A', mean: 'N/A', slope: 'N/A' },
//     temperature: { max: 'N/A', min: 'N/A', mean: 'N/A', slope: 'N/A' }
//   });
//   const [error, setError] = useState(null);
//   const [isCalculating, setIsCalculating] = useState(false);
//   const [showToast, setShowToast] = useState(false);
//   const dragRef = useRef(null);
//   const [cutData, setCutData] = useState([]);
//   const [isCut, setIsCut] = useState(false);
//   const [cutIndex, setCutIndex] = useState(null);

  
//   useEffect(() => {
//     const handleMouseMove = (event) => {
//       try {
//         if (draggingLeft) {
//           handleLeftLineDrag(event);
//         } else if (draggingRight) {
//           handleRightLineDrag(event);
//         }
//       } catch (error) {
//         console.error("Error in mouse move handler:", error);
//         setError("An error occurred while dragging. Please try again.");
//       }
//     };
    
//     const handleMouseUp = () => {
//       setDraggingLeft(false);
//       setDraggingRight(false);
//     };
  
//     document.addEventListener('mousemove', handleMouseMove);
//     document.addEventListener('mouseup', handleMouseUp);
  
//     return () => {
//       document.removeEventListener('mousemove', handleMouseMove);
//       document.removeEventListener('mouseup', handleMouseUp);
//     };
//   }, [draggingLeft, draggingRight]);

//   useEffect(() => {
//     if (chartData && chartData.length > 0) {
//       setStartPosition(0);
//       setEndPosition(chartData.length - 1);
//       calculateValues(0, chartData.length - 1);
//     } else {
//       setCalculatedValues({
//         tension: { max: 'N/A', min: 'N/A', mean: 'N/A', slope: 'N/A' },
//         torsion: { max: 'N/A', min: 'N/A', mean: 'N/A', slope: 'N/A' },
//         bendingMomentY: { max: 'N/A', min: 'N/A', mean: 'N/A', slope: 'N/A' },
//         bendingMomentX: { max: 'N/A', min: 'N/A', mean: 'N/A', slope: 'N/A' },
//         temperature: { max: 'N/A', min: 'N/A', mean: 'N/A', slope: 'N/A' }
//       });
//     }
//   }, [chartData]);

//   const toggleViewBounds = () => {
//     setShowViewBounds(!showViewBounds);
//   };

//   const formatTime = (seconds) => {
//     const date = new Date(null);
//     date.setSeconds(seconds);
//     return date.toISOString().substr(11, 12);
//   };

//   const calculateYAxisValues = (index) => {
//     if (!chartData || chartData.length === 0 || index < 0 || index >= chartData.length) {
//       return {
//         x: 'N/A',
//         tension: 'N/A',
//         torsion: 'N/A',
//         bendingMomentY: 'N/A',
//         bendingMomentX: 'N/A',
//         temperature: 'N/A',
//       };
//     }
  
//     const point = chartData[index];
//     return {
//       x: formatTime(point.x),
//       tension: point.tension,
//       torsion: point.torsion,
//       bendingMomentY: point.bendingMomentY,
//       bendingMomentX: point.bendingMomentX,
//       temperature: point.temperature,
//     };
//   };
  
//   const handleLeftLineDrag = (event) => {
//     try {
//       const chartBounds = chartRef.current.getBoundingClientRect();
//       const chartWidth = chartBounds.width;
//       const mouseX = event.clientX - chartBounds.left;
//       const newIndex = Math.floor((mouseX / chartWidth) * (chartData.length - 1));
//       const newPosition = Math.max(0, Math.min(newIndex, endPosition - 1));
//       setStartPosition(newPosition);
//       calculateValues(newPosition, endPosition);
//     } catch (error) {
//       console.error("Error in handleLeftLineDrag:", error);
//       setError("An error occurred while dragging the left line. Please try again.");
//     }
//   };
  
//   const handleRightLineDrag = (event) => {
//     try {
//       const chartBounds = chartRef.current.getBoundingClientRect();
//       const chartWidth = chartBounds.width;
//       const mouseX = event.clientX - chartBounds.left;
//       const newIndex = Math.floor((mouseX / chartWidth) * (chartData.length - 1));
//       const newPosition = Math.max(startPosition + 1, Math.min(newIndex, chartData.length - 1));
//       setEndPosition(newPosition);
//       calculateValues(startPosition, newPosition);
//     } catch (error) {
//       console.error("Error in handleRightLineDrag:", error);
//       setError("An error occurred while dragging the right line. Please try again.");
//     }
//   };

//   const cutDataInRange = () => {
//     const newData = chartData.slice(startPosition, endPosition + 1);
//     const newCutData = [
//       ...chartData.slice(0, startPosition),
//       ...chartData.slice(endPosition + 1)
//     ];
    
//     setCutData(newCutData);
//     setChartData(newData);
//     setIsCut(true);
//     setCutIndex(startPosition);
    
//     setStartPosition(0);
//     setEndPosition(newData.length - 1);
//   };

//   // const clearOffset = () => {
//   //   if (isCut) {
//   //     const restoredData = [
//   //       ...chartData.slice(0, cutIndex),
//   //       ...cutData,
//   //       ...chartData.slice(cutIndex)
//   //     ];
//   //     setChartData(restoredData);
//   //     setCutData([]);
//   //     setIsCut(false);
//   //     setCutIndex(null);
//   //   } else {
//   //     setChartData(originalChartData);
//   //   }
//   //   setStartPosition(0);
//   //   setEndPosition(chartData.length - 1);
//   // };
//   const clearOffset = () => {
//     if (isCut) {
//       // Restore the full dataset
//       const restoredData = [
//         ...chartData.slice(0, cutIndex),
//         ...cutData,
//         ...chartData.slice(cutIndex)
//       ];
      
//       // Recalculate time values
//       const startTime = restoredData[0].x;
//       const restoredDataWithAdjustedTime = restoredData.map((point, index) => ({
//         ...point,
//         x: startTime + index * (restoredData[1].x - restoredData[0].x) // Assuming constant time step
//       }));
      
//       setChartData(restoredDataWithAdjustedTime);
//       setCutData([]);
//       setIsCut(false);
//       setCutIndex(null);
//     } else {
//       setChartData(originalChartData);
//     }
//     setStartPosition(0);
//     setEndPosition(chartData.length - 1);
//   };
//   const handleBoundsSelection = (option) => {
//     try {
//       if (option === "Cut") {
//         cutDataInRange();
//       } else if (option === "Clear Offset") {
//         clearOffset();
//       } else if (option === "Drift Compensation") {
//         applyDriftCompensation();
//       }
//     } catch (error) {
//       console.error("Error in handleBoundsSelection:", error);
//       setError("An error occurred while performing the selected action. Please try again.");
//     }
//   };
//   const applyDriftCompensation = () => {
//     const referenceStart = chartData[startPosition];
//     const referenceEnd = chartData[endPosition];

//     const drift = {
//       tension: (referenceEnd.tension - referenceStart.tension) / (endPosition - startPosition),
//       torsion: (referenceEnd.torsion - referenceStart.torsion) / (endPosition - startPosition),
//       bendingMomentX: (referenceEnd.bendingMomentX - referenceStart.bendingMomentX) / (endPosition - startPosition),
//       bendingMomentY: (referenceEnd.bendingMomentY - referenceStart.bendingMomentY) / (endPosition - startPosition),
//       temperature: (referenceEnd.temperature - referenceStart.temperature) / (endPosition - startPosition),
//     };

//     const compensatedData = chartData.map((item, index) => ({
//       x: item.x,
//       tension: item.tension - drift.tension * (index - startPosition),
//       torsion: item.torsion - drift.torsion * (index - startPosition),
//       bendingMomentX: item.bendingMomentX - drift.bendingMomentX * (index - startPosition),
//       bendingMomentY: item.bendingMomentY - drift.bendingMomentY * (index - startPosition),
//       temperature: item.temperature - drift.temperature * (index - startPosition),
//     }));

//     setChartData(compensatedData);
//   };

//   const calculateValues = (start = startPosition, end = endPosition) => {
//     setIsCalculating(true);
//     setError(null);
//     setShowToast(true);
  
//     if (!chartData || chartData.length === 0) {
//       setCalculatedValues({
//         tension: { max: 'N/A', min: 'N/A', mean: 'N/A', slope: 'N/A' },
//         torsion: { max: 'N/A', min: 'N/A', mean: 'N/A', slope: 'N/A' },
//         bendingMomentY: { max: 'N/A', min: 'N/A', mean: 'N/A', slope: 'N/A' },
//         bendingMomentX: { max: 'N/A', min: 'N/A', mean: 'N/A', slope: 'N/A' },
//         temperature: { max: 'N/A', min: 'N/A', mean: 'N/A', slope: 'N/A' }
//       });
//       setIsCalculating(false);
//       setShowToast(false);
//       return;
//     }

//     const processChunk = (chunkStart, chunkEnd) => {
//       return new Promise((resolve) => {
//         setTimeout(() => {
//           const chunkData = chartData.slice(chunkStart, chunkEnd);
//           const chunkResults = {};
  
//           ['tension', 'torsion', 'bendingMomentY', 'bendingMomentX', 'temperature'].forEach(property => {
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
  
//     for (let i = start; i < end; i += chunkSize) {
//       chunks.push(processChunk(i, Math.min(i + chunkSize, end)));
//     }
  
//     Promise.all(chunks)
//       .then(results => {
//         const finalResults = {};
//         ['tension', 'torsion', 'bendingMomentY', 'bendingMomentX', 'temperature'].forEach(property => {
//           const propertyResults = results.map(chunk => chunk[property]);
//           const max = Math.max(...propertyResults.map(r => r.max));
//           const min = Math.min(...propertyResults.map(r => r.min));
//           const sum = propertyResults.reduce((acc, curr) => acc + curr.sum, 0);
//           const count = propertyResults.reduce((acc, curr) => acc + curr.count, 0);
//           const mean = count > 0 ? sum / count : 0;
  
//           const firstValue = chartData[start][property];
//           const lastValue = chartData[end - 1][property];
//           const slope = (lastValue - firstValue) / (chartData[end - 1].x - chartData[start].x);
  
//           finalResults[property] = {
//             max: max.toFixed(6),
//             min: min.toFixed(6),
//             mean: mean.toFixed(9),
//             slope: slope.toFixed(9)
//           };
//         });
  
//         setCalculatedValues(finalResults);
//         setIsCalculating(false);
//         setShowToast(false);
//       })
//       .catch(error => {
//         console.error("Error in calculateValues:", error);
//         setError("An error occurred while calculating values. Please try again.");
//         setIsCalculating(false);
//         setShowToast(false);
//       });
//   };

//   useEffect(() => {
//     calculateValues();
//   }, [startPosition, endPosition, chartData]);

//   // const getLinePosition = (index) => {
//   //   if (!chartRef.current || chartData.length === 0) return 0;
//   //   const chartBounds = chartRef.current.getBoundingClientRect();
//   //   const chartWidth = chartBounds.width;
//   //   const chartPadding = 90; // Adjust this value based on your chart's actual padding
//   //   const availableWidth = chartWidth - (2 * chartPadding);
//   //   return chartPadding + (index / (chartData.length - 1)) * availableWidth;
//   // };
//  const getLinePosition = (index) => {
//     if (!chartRef.current || chartData.length === 0) return 0;
//     const chartBounds = chartRef.current.getBoundingClientRect();
//     const chartWidth = chartBounds.width;
//     const chartPadding = 90; // Adjust this value based on your chart's actual padding
//     const availableWidth = chartWidth - (2 * chartPadding);
    
//     // Calculate the position based on the time value
//     const startTime = chartData[0].x;
//     const endTime = chartData[chartData.length - 1].x;
//     const currentTime = chartData[index].x;
//     const timePosition = (currentTime - startTime) / (endTime - startTime);
    
//     return chartPadding + timePosition * availableWidth;
//   };
//   return (
//     <>
//       <div className="border border-black p-4 rounded-lg shadow-lg" style={{ position: 'relative', width: '800px', height: '340px', bottom: '300px', boxShadow: '0 6px 8px rgba(0, 0, 0, 0.15), 0 3px 6px rgba(0, 0, 0, 0.1)' }}>
//         <button onClick={toggleViewBounds} className="border border-black text-sm font-medium rounded-md text-gray-700 bg-gray-200 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-black" style={{ position: 'relative', width: '150px', height: '40px', left: '81%', top: '60px' }}>
//           {showViewBounds ? 'Hide View Bounds' : 'Show View Bounds'}
//         </button>
//         <button onClick={() => calculateValues()} className="border border-black text-sm font-medium rounded-md text-gray-700 bg-gray-200 hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-black" style={{ position: 'relative', height: '40px', width: '150px', left: '61%', top: '140px' }}>
//           Calculate Values
//         </button>
//       </div>  
    
//       {showViewBounds && (
//         <>
//           <div
//             ref={dragRef}
//             style={{ position: 'absolute', left: `${getLinePosition(startPosition)}px`, top: '0%', borderLeft: '2px solid lightgreen', height: '45%', cursor: 'col-resize' }}
//             onMouseDown={() => setDraggingLeft(true)}
//           >
//             <span>Start Range: X - {calculateYAxisValues(startPosition).x}</span>
//           </div>
//           <div
//             ref={dragRef}
//             style={{ position: 'absolute', left: `${getLinePosition(endPosition)}px`, top: '0%', borderLeft: '2px solid red', height: '45%', cursor: 'col-resize' }}
//             onMouseDown={() => setDraggingRight(true)}
//           >
//             <span>End Range: X - {calculateYAxisValues(endPosition).x}</span>
//           </div>
//         </>
//       )}
//       {showToast && (
//         <Toast onClose={() => setShowToast(false)}>
//           <div className="text-sm font-medium">Calculating values...</div>
//         </Toast>
//       )}
//       {calculatedValues && !isCalculating && (
//         <div className="mt-4 overflow-x-auto" style={{ width: '600px', position: 'relative', bottom: '640px', left: '30px', height: '320px' }}>
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Property</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Max</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Min</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mean</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Slope</th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {Object.keys(calculatedValues).map(property => (
//                 <tr key={property}>
//                   <td className="px-6 py-4 whitespace-nowrap">{property}</td>
//                   <td className="px-6 py-4 whitespace-nowrap">{calculatedValues[property].max}</td>
//                   <td className="px-6 py-4 whitespace-nowrap">{calculatedValues[property].min}</td>
//                   <td className="px-6 py-4 whitespace-nowrap">{calculatedValues[property].mean}</td>
//                   <td className="px-6 py-4 whitespace-nowrap">{calculatedValues[property].slope}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//       <div className="mt-4">
//         <select onChange={(e) => handleBoundsSelection(e.target.value)} className="border border-black text-sm font-medium rounded-md text-gray-700 bg-gray-200 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-black" style={{ position: 'relative', height: '40px', width: '150px', bottom: '750px', left: '635px' }}>
//           <option value="">Bounds</option>
//           <option value="Cut">Cut</option>
//           <option value="Clear Offset">Clear Offset</option>
//           <option value="Drift Compensation">Drift Compensation</option>
//         </select>
//       </div>
//       {error && (
//         <div className="text-red-500 mt-2" style={{ position: 'relative', bottom: '780px', left: '30px' }}>
//           {error}
//         </div>
//       )}
//     </>
//   );
// };

// export default ViewBoundsToggle;



import React, { useState, useRef, useEffect } from 'react';

// Custom Toast component
const Toast = ({ children, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-4 left-4 bg-gray-800 text-white px-4 py-2 rounded-md shadow-lg">
      {children}
    </div>
  );
};

const ViewBoundsToggle = ({ chartRef, chartData, setChartData, originalChartData, setOriginalChartData, width, height }) => {
  const [showViewBounds, setShowViewBounds] = useState(false);
  const [draggingLeft, setDraggingLeft] = useState(false);
  const [draggingRight, setDraggingRight] = useState(false);
  const [startPosition, setStartPosition] = useState(0);
  const [endPosition, setEndPosition] = useState(0);
  const [calculatedValues, setCalculatedValues] = useState({
    tension: { max: 'N/A', min: 'N/A', mean: 'N/A', slope: 'N/A' },
    torsion: { max: 'N/A', min: 'N/A', mean: 'N/A', slope: 'N/A' },
    bendingMomentY: { max: 'N/A', min: 'N/A', mean: 'N/A', slope: 'N/A' },
    bendingMomentX: { max: 'N/A', min: 'N/A', mean: 'N/A', slope: 'N/A' },
    temperature: { max: 'N/A', min: 'N/A', mean: 'N/A', slope: 'N/A' }
  });
  const [error, setError] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const dragRef = useRef(null);
  const [cutData, setCutData] = useState([]);
  const [isCut, setIsCut] = useState(false);
  const [cutIndex, setCutIndex] = useState(null);

  

  useEffect(() => {
    const handleMouseMove = (event) => {
      try {
        if (draggingLeft) {
          handleLeftLineDrag(event);
        } else if (draggingRight) {
          handleRightLineDrag(event);
        }
      } catch (error) {
        console.error("Error in mouse move handler:", error);
        setError("An error occurred while dragging. Please try again.");
      }
    };
    
    const handleMouseUp = () => {
      setDraggingLeft(false);
      setDraggingRight(false);
    };
  
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [draggingLeft, draggingRight]);


  useEffect(() => {
    if (chartData && chartData.length > 0) {
      setStartPosition(0);
      setEndPosition(chartData.length - 1);
    } else {
      setStartPosition(0);
      setEndPosition(0);
    }
  }, [chartData]);

  const toggleViewBounds = () => {
    setShowViewBounds(!showViewBounds);
  };

  const formatTime = (seconds) => {
    const date = new Date(null);
    date.setSeconds(seconds);
    return date.toISOString().substr(11, 12);
  };

  // const calculateYAxisValues = (index) => {
  //   if (!chartData || chartData.length === 0 || index < 0 || index >= chartData.length) {
  //     return {
  //       x: 'N/A',
  //       tension: 'N/A',
  //       torsion: 'N/A',
  //       bendingMomentY: 'N/A',
  //       bendingMomentX: 'N/A',
  //       temperature: 'N/A',
  //     };
  //   }
  
  //   const point = chartData[index];
  //   return {
  //     x: formatTime(point.x),
  //     tension: point.tension,
  //     torsion: point.torsion,
  //     bendingMomentY: point.bendingMomentY,
  //     bendingMomentX: point.bendingMomentX,
  //     temperature: point.temperature,
  //   };
  // };
  const calculateYAxisValues = (index) => {
    if (!chartData || chartData.length === 0 || index < 0 || index >= chartData.length) {
      return {
        x: 'N/A',
        tension: 'N/A',
        torsion: 'N/A',
        bendingMomentY: 'N/A',
        bendingMomentX: 'N/A',
        temperature: 'N/A',
      };
    }
  
    const point = chartData[index];
    return {
      x: formatTime(point.x),
      tension: point.tension,
      torsion: point.torsion,
      bendingMomentY: point.bendingMomentY,
      bendingMomentX: point.bendingMomentX,
      temperature: point.temperature,
    };
  };
  const handleLeftLineDrag = (event) => {
    try {
      const chartBounds = chartRef.current.getBoundingClientRect();
      const chartWidth = chartBounds.width;
      const mouseX = event.clientX - chartBounds.left;
      const newIndex = Math.floor((mouseX / chartWidth) * (chartData.length - 1));
      const newPosition = Math.max(0, Math.min(newIndex, endPosition - 1));
      setStartPosition(newPosition);
    } catch (error) {
      console.error("Error in handleLeftLineDrag:", error);
      setError("An error occurred while dragging the left line. Please try again.");
    }
  };
  
  const handleRightLineDrag = (event) => {
    try {
      const chartBounds = chartRef.current.getBoundingClientRect();
      const chartWidth = chartBounds.width;
      const mouseX = event.clientX - chartBounds.left;
      const newIndex = Math.floor((mouseX / chartWidth) * (chartData.length - 1));
      const newPosition = Math.max(startPosition + 1, Math.min(newIndex, chartData.length - 1));
      setEndPosition(newPosition);
    } catch (error) {
      console.error("Error in handleRightLineDrag:", error);
      setError("An error occurred while dragging the right line. Please try again.");
    }
  };

  const cutDataInRange = () => {
    const newData = chartData.slice(startPosition, endPosition + 1);
    const newCutData = [
      ...chartData.slice(0, startPosition),
      ...chartData.slice(endPosition + 1)
    ];
    
    setCutData(newCutData);
    setChartData(newData);
    setIsCut(true);
    setCutIndex(startPosition);
    
    setStartPosition(0);
    setEndPosition(newData.length - 1);
  };

  const clearOffset = () => {
    if (isCut) {
      // Restore the full dataset
      const restoredData = [
        ...chartData.slice(0, cutIndex),
        ...cutData,
        ...chartData.slice(cutIndex)
      ];
      
      // Recalculate time values
      const startTime = restoredData[0].x;
      const restoredDataWithAdjustedTime = restoredData.map((point, index) => ({
        ...point,
        x: startTime + index * (restoredData[1].x - restoredData[0].x) // Assuming constant time step
      }));
      
      setChartData(restoredDataWithAdjustedTime);
      setCutData([]);
      setIsCut(false);
      setCutIndex(null);
    } else {
      setChartData(originalChartData);
    }
    setStartPosition(0);
    setEndPosition(chartData.length - 1);
  };

  const handleBoundsSelection = (option) => {
    try {
      if (option === "Cut") {
        cutDataInRange();
      } else if (option === "Clear Offset") {
        clearOffset();
      } else if (option === "Drift Compensation") {
        applyDriftCompensation();
      }
    } catch (error) {
      console.error("Error in handleBoundsSelection:", error);
      setError("An error occurred while performing the selected action. Please try again.");
    }
  };

  const applyDriftCompensation = () => {
    const referenceStart = chartData[startPosition];
    const referenceEnd = chartData[endPosition];

    const drift = {
      tension: (referenceEnd.tension - referenceStart.tension) / (endPosition - startPosition),
      torsion: (referenceEnd.torsion - referenceStart.torsion) / (endPosition - startPosition),
      bendingMomentX: (referenceEnd.bendingMomentX - referenceStart.bendingMomentX) / (endPosition - startPosition),
      bendingMomentY: (referenceEnd.bendingMomentY - referenceStart.bendingMomentY) / (endPosition - startPosition),
      temperature: (referenceEnd.temperature - referenceStart.temperature) / (endPosition - startPosition),
    };

    const compensatedData = chartData.map((item, index) => ({
      x: item.x,
      tension: item.tension - drift.tension * (index - startPosition),
      torsion: item.torsion - drift.torsion * (index - startPosition),
      bendingMomentX: item.bendingMomentX - drift.bendingMomentX * (index - startPosition),
      bendingMomentY: item.bendingMomentY - drift.bendingMomentY * (index - startPosition),
      temperature: item.temperature - drift.temperature * (index - startPosition),
    }));

    setChartData(compensatedData);
  };

  const calculateValues = () => {
    setIsCalculating(true);
    setError(null);
    setShowToast(true);
  
    if (!chartData || chartData.length === 0) {
      setCalculatedValues({
        tension: { max: 'N/A', min: 'N/A', mean: 'N/A', slope: 'N/A' },
        torsion: { max: 'N/A', min: 'N/A', mean: 'N/A', slope: 'N/A' },
        bendingMomentY: { max: 'N/A', min: 'N/A', mean: 'N/A', slope: 'N/A' },
        bendingMomentX: { max: 'N/A', min: 'N/A', mean: 'N/A', slope: 'N/A' },
        temperature: { max: 'N/A', min: 'N/A', mean: 'N/A', slope: 'N/A' }
      });
      setIsCalculating(false);
      setShowToast(false);
      return;
    }

    const processChunk = (chunkStart, chunkEnd) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          const chunkData = chartData.slice(chunkStart, chunkEnd);
          const chunkResults = {};
  
          ['tension', 'torsion', 'bendingMomentY', 'bendingMomentX', 'temperature'].forEach(property => {
            const values = chunkData.map(item => item[property]).filter(value => !isNaN(value));
            chunkResults[property] = {
              max: values.length ? Math.max(...values) : -Infinity,
              min: values.length ? Math.min(...values) : Infinity,
              sum: values.reduce((acc, curr) => acc + curr, 0),
              count: values.length
            };
          });
  
          resolve(chunkResults);
        }, 0);
      });
    };
  
    const chunkSize = 10000;
    const chunks = [];
  
    for (let i = startPosition; i < endPosition; i += chunkSize) {
      chunks.push(processChunk(i, Math.min(i + chunkSize, endPosition)));
    }
  
    Promise.all(chunks)
      .then(results => {
        const finalResults = {};
        ['tension', 'torsion', 'bendingMomentY', 'bendingMomentX', 'temperature'].forEach(property => {
          const propertyResults = results.map(chunk => chunk[property]);
          const max = Math.max(...propertyResults.map(r => r.max));
          const min = Math.min(...propertyResults.map(r => r.min));
          const sum = propertyResults.reduce((acc, curr) => acc + curr.sum, 0);
          const count = propertyResults.reduce((acc, curr) => acc + curr.count, 0);
          const mean = count > 0 ? sum / count : 0;
  
          const firstValue = chartData[startPosition][property];
          const lastValue = chartData[endPosition - 1][property];
          const slope = (lastValue - firstValue) / (chartData[endPosition - 1].x - chartData[startPosition].x);
  
          finalResults[property] = {
            max: max.toFixed(6),
            min: min.toFixed(6),
            mean: mean.toFixed(9),
            slope: slope.toFixed(9)
          };
        });
  
        setCalculatedValues(finalResults);
        setIsCalculating(false);
        setShowToast(false);
      })
      .catch(error => {
        console.error("Error in calculateValues:", error);
        setError("An error occurred while calculating values. Please try again.");
        setIsCalculating(false);
        setShowToast(false);
      });
  };

  // const getLinePosition = (index) => {
  //   if (!chartRef.current || chartData.length === 0) return 0;
  //   const chartBounds = chartRef.current.getBoundingClientRect();
  //   const chartWidth = chartBounds.width;
  //   const chartPadding = 90; // Adjust this value based on your chart's actual padding
  //   const availableWidth = chartWidth - (2 * chartPadding);
    
  //   // Calculate the position based on the time value
  //   const startTime = chartData[0].x;
  //   const endTime = chartData[chartData.length - 1].x;
  //   const currentTime = chartData[index].x;
  //   const timePosition = (currentTime - startTime) / (endTime - startTime);
    
  //   return chartPadding + timePosition * availableWidth;
  // };
  const getLinePosition = (index) => {
    if (!chartRef.current || !chartData || chartData.length === 0) return 0;
    const chartBounds = chartRef.current.getBoundingClientRect();
    const chartWidth = chartBounds.width;
    const chartPadding = 90; // Adjust this value based on your chart's actual padding
    const availableWidth = chartWidth - (2 * chartPadding);
    
    // Calculate the position based on the time value
    const startTime = chartData[0]?.x || 0;
    const endTime = chartData[chartData.length - 1]?.x || 0;
    const currentTime = chartData[index]?.x || 0;
    const timePosition = (endTime - startTime) !== 0 ? (currentTime - startTime) / (endTime - startTime) : 0;
    
    return chartPadding + timePosition * availableWidth;
  };


  
  const getResponsiveStyle = (baseStyle) => {
    return {
      ...baseStyle,
      position: 'relative',
      width: 'clamp(100px, 100%, 150px)',
      height: 'clamp(30px, 5vw, 40px)',
      fontSize: 'clamp(0.75rem, 2vw, 0.875rem)',
    };
  };
  
  return (
    <>
      <div className="border border-black p-4 rounded-lg shadow-lg" style={{ position: 'relative', width: '800px', height: '340px', bottom: '300px', boxShadow: '0 6px 8px rgba(0, 0, 0, 0.15), 0 3px 6px rgba(0, 0, 0, 0.1)' }}>
        <button onClick={toggleViewBounds} className="border border-black text-sm font-medium rounded-md text-gray-700 bg-gray-200 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-black" style={{ position: 'relative', width: '150px', height: '40px', left: '81%', top: '60px' }}>
          {showViewBounds ? 'Hide View Bounds' : 'Show View Bounds'}
        </button>
        <button onClick={calculateValues} className="border border-black text-sm font-medium rounded-md text-gray-700 bg-gray-200 hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-black" style={{ position: 'relative', height: '40px', width: '150px', left: '61%', top: '140px' }}>
          Calculate Values
        </button>
      </div>  
    
      {showViewBounds && (
        <>
          <div
            ref={dragRef}
            style={{ position: 'absolute', left: `${getLinePosition(startPosition)}px`, top: '0%', borderLeft: '2px solid lightgreen', height: '45%', cursor: 'col-resize' }}
            onMouseDown={() => setDraggingLeft(true)}
          >
            <span>Start Range: X - {calculateYAxisValues(startPosition).x}</span>
          </div>
          <div
            ref={dragRef}
            style={{ position: 'absolute', left: `${getLinePosition(endPosition)}px`, top: '0%', borderLeft: '2px solid red', height: '45%', cursor: 'col-resize' }}
            onMouseDown={() => setDraggingRight(true)}
          >
            <span>End Range: X - {calculateYAxisValues(endPosition).x}</span>
          </div>
        </>
      )}
      {showToast && (
        <Toast onClose={() => setShowToast(false)}>
          <div className="text-sm font-medium">Calculating values...</div>
        </Toast>
      )}
      {calculatedValues && !isCalculating && (
        <div className={`mt-4 overflow-x-auto ${showViewBounds ? '' : 'blur-sm'}`} style={{ width: '600px', position: 'relative', bottom: '640px', left: '30px', height: '320px' }}>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Property</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Max</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Min</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mean</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Slope</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {Object.keys(calculatedValues).map(property => (
                <tr key={property}>
                  <td className="px-6 py-4 whitespace-nowrap">{property}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{calculatedValues[property].max}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{calculatedValues[property].min}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{calculatedValues[property].mean}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{calculatedValues[property].slope}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div className="mt-4">
        <select onChange={(e) => handleBoundsSelection(e.target.value)} className="border border-black text-sm font-medium rounded-md text-gray-700 bg-gray-200 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-black" style={{ position: 'relative', height: '40px', width: '150px', bottom: '750px', left: '635px' }}>
          <option value="">Bounds</option>
          <option value="Cut">Cut</option>
          <option value="Clear Offset">Clear Offset</option>
          <option value="Drift Compensation">Drift Compensation</option>
        </select>
      </div>
      {error && (
        <div className="text-red-500 mt-2" style={{ position: 'relative', bottom: '780px', left: '30px' }}>
          {error}
        </div>
      )}
    </>
  );
};

export default ViewBoundsToggle;

