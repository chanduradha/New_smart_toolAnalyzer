import React, { useState, useEffect, useRef } from 'react';
import Plotly from 'plotly.js-dist';

const Popup = ({ isOpen, onClose, selectedFiles }) => {
  const graphRef = useRef(null);
  const [selectedOption, setSelectedOption] = useState('tension[N]');
  const [windowSize, setWindowSize] = useState(1);
  const [selectedRows, setSelectedRows] = useState({}); // State to track selected rows
  const convertSecondsToTimeString = (seconds) => {
    if (isNaN(seconds)) {
      return "00:00:00,000"; // Default value for invalid input
    }
  
    const date = new Date(seconds * 1000);
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const secondsValue = date.getUTCSeconds();
    const milliseconds = date.getUTCMilliseconds();
  
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secondsValue).padStart(2, '0')},${String(milliseconds).padStart(3, '0')}`;
  };
  
   
   // Define static data for initial graph
   const staticData = {
    x: [1, 2, 3, 4, 5], // Example x values
    y: [], // Example y values
    type: 'scatter',
    mode: 'lines',
    name: 'Static Data',
    line: { color: 'gray' } // Define line color
  };
  
  useEffect(() => {
    if (graphRef.current) {
      // Initialize Plotly and render the static graph
      Plotly.newPlot(graphRef.current, [staticData]);
    }
  }, [staticData]);
  useEffect(() => {
    const fetchData = async () => {
      if (graphRef.current && selectedFiles.length > 0) {
        const filteredSelectedFiles = selectedFiles.filter(file => selectedRows[file.name]);
        const traces = [];
        const colors = ['darkblue', 'green', 'red', 'purple', 'orange'];

        for (let i = 0; i < filteredSelectedFiles.length; i++) {
          const selectedFile = filteredSelectedFiles[i];
          const rawData = await readFile(selectedFile);
          
          const rollingAverageData = calculateRollingAverage(rawData, windowSize);
          
          // const xValues = rawData.map(row => row[4]); // Assuming time is at index 4 previous directly it will display time in second only

          const xValues = rawData.map(row => convertSecondsToTimeString(row[4])); // Assuming time is at index 4

          console.log('X Values:', xValues);
          const trace = {
            x: xValues,
            y: rollingAverageData,
            type: 'scatter',
            mode: 'lines',
            name: `${selectedFile.name} (Rolling Avg)`,
            line: {color: colors[i % 5]} // Assign color from the array based on index
          };
          
          traces.push(trace);
        }
  
        const layout = {
          title: `${selectedOption} over Time with Rolling Average (Window Size: ${windowSize})`,
          xaxis: { title: 'Time' ,  tickformat: '%H:%M:%S.%L',nticks: 16,},

          yaxis: { title: selectedOption }
        };
 
        Plotly.newPlot(graphRef.current, traces, layout);
      }
    };
  
    fetchData();
  
    return () => {
      if (graphRef.current) {
        Plotly.purge(graphRef.current);
      }
    };
  }, [selectedOption, selectedFiles, windowSize, selectedRows]);
  

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleWindowSizeChange = (event) => {
    const newSize = parseInt(event.target.value);
    if (!isNaN(newSize) && newSize > 0) {
      setWindowSize(newSize);
    }
  };

  const handleRowCheckboxChange = (fileName, checked) => {
    setSelectedRows(prevState => ({
      ...prevState,
      [fileName]: checked,
    }));
  };

  const calculateRollingAverage = (data, size) => {
    const rollingAvgData = [];
    for (let i = 0; i < data.length; i++) {
      let sum = 0;
      let count = 0;
      for (let j = Math.max(0, i - size + 1); j <= i; j++) {
        sum += parseFloat(data[j][getOptionIndex(selectedOption)]);
        count++;
      }
      const avg = sum / count;
      rollingAvgData.push(avg);
    }
    return rollingAvgData;
  };
  
  const getOptionIndex = (option) => {
    switch (option) {
      case 'tension[N]':
        return 0;
      case 'torsion[Nm]':
        return 1;
      case 'bendingMomentX[Nm]':
        return 2;
      case 'bendingMomentY[Nm]':
        return 3;
      default:
        return 0; // Default to tension if option is invalid
    }
  };

  const readFile = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const lines = event.target.result.split('\n');
        // Skip metadata lines by starting from index 29
        const rawData = lines.slice(29).map(row => row.split(';'));
        resolve(rawData);
      };
      reader.onerror = (error) => reject(error);
      reader.readAsText(file);
    });
  };
  

  return (
    <>
      {isOpen && (
        <div className="popup fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
          <div className="popup-inner bg-white p-8 rounded-lg shadow-md relative" style={{ width: '80%', height: '80%' }}>
            <button className="text-black  absolute top-2 right-2 z-10" onClick={onClose} width="300px">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="5" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            {selectedFiles.length === 0 && ( // Render static content only when no files are selected
              <div>
                <h2>Static Content</h2>
                {/* Add your static content here */}
              </div>
            )}
            {selectedFiles.length > 0 && ( // Render graph when files are selected
              <>

                <div ref={graphRef} style={{ height: '80%', width: '80%',  boxShadow: '0 6px 8px rgba(0, 0, 0, 0.15), 0 3px 6px rgba(0, 0, 0, 0.1)',}} />
               

                <div className="" style={{ position: 'relative', left: '85%', width: '176px', bottom: '300px', boxShadow: '0 6px 8px rgba(0, 0, 0, 0.15), 0 3px 6px rgba(0, 0, 0, 0.1)' }}>
  <table className="border-collapse border border-gray-400 " >
    <tbody>
      <tr>
        <td className="p-2 border-b border-gray-600 bg-white">
          <input type="radio" value="tension[N]" checked={selectedOption === 'tension[N]'} onChange={handleOptionChange} /> Tension
        </td>
      </tr>
      <tr>
        <td className="p-2 border-b border-gray-600 bg-white">
          <input type="radio" value="torsion[Nm]" checked={selectedOption === 'torsion[Nm]'} onChange={handleOptionChange} /> Torsion
        </td>
      </tr>
      <tr>
        <td className="p-2 border-b border-gray-600 bg-white">
          <input type="radio" value="bendingMomentX[Nm]" checked={selectedOption === 'bendingMomentX[Nm]'} onChange={handleOptionChange} /> Bending Moment X
        </td>
      </tr>
      <tr>
        <td className="p-2 border-b border-gray-600 bg-white">
          <input type="radio" value="bendingMomentY[Nm]" checked={selectedOption === 'bendingMomentY[Nm]'} onChange={handleOptionChange} /> Bending Moment Y
        </td>
      </tr>
    </tbody>
  </table>
</div>

                <div>
                  <label style={{position:'relative',left:'85%',fontSize:'18px',fontWeight:'bold',bottom:'250px'}}>Average: </label>
                  <input type="number" value={windowSize} onChange={handleWindowSizeChange}  style={{width:'90px',height:'40px', border: '1px solid black', borderRadius: '4px', backgroundColor:'white',position:'relative',left:'85%',bottom:'250px'}} />
                </div>
                <div>
                  <h3 style={{position:'relative', left:'85%', bottom:'950px',fontSize:'12px',fontWeight:'bold'}}>Selected Files</h3>
                  <table className=" border-collapse border border-black bg-white" style={{position: 'relative',width:'300px',left:'81%',bottom:'750px',boxShadow: '0 6px 8px rgba(0, 0, 0, 0.15), 0 3px 6px rgba(0, 0, 0, 0.1)'}}>
  <thead>
    <tr>
      <th className="border border-black">File Name</th>
      <th className="border border-black">Select</th>
    </tr>
  </thead>
  <tbody>
    {selectedFiles.map(file => (
      <tr key={file.name} className="border border-black ">
        <td className="border border-black p-" style={{fontSize:'12px'}}>{file.name}</td>
        <td className="border border-black p-2">
          <input 
            type="checkbox" 
            checked={selectedRows[file.name]} 
            onChange={(e) => handleRowCheckboxChange(file.name, e.target.checked)} 
          />
        </td>
      </tr>
    ))}
  </tbody>
</table>

                </div>
              </>
            )}
          </div>
         
        </div>
      )}
    </>
  );
  
};

export default Popup;