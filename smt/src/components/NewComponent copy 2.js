import React, { useRef, useState, useEffect } from 'react';
import Plotly from 'plotly.js-dist';

const NewComponent = ({ isVisible, onClose }) => {
  const [selectedFolderFiles, setSelectedFolderFiles] = useState([]);
  const [selectedFilesToPlot, setSelectedFilesToPlot] = useState({});

  useEffect(() => {
    plotDataFromFiles(selectedFilesToPlot);
  }, [selectedFilesToPlot]);

  const handleFolderSelect = async () => {
    try {
      const folderInput = document.createElement('input');
      folderInput.setAttribute('type', 'file');
      folderInput.setAttribute('webkitdirectory', true);
  
      folderInput.addEventListener('change', async (e) => {
        const files = e.target.files;
        if (files.length > 0) {
          const fileList = Array.from(files);
          setSelectedFolderFiles(fileList);
          const filesToPlot = {};
          fileList.forEach(file => {
            filesToPlot[file.name] = false;
          });
          setSelectedFilesToPlot(filesToPlot);
        } else {
          setSelectedFolderFiles([]);
          setSelectedFilesToPlot({});
        }
      });
  
      folderInput.click();
    } catch (error) {
      console.error('Error selecting folder:', error);
    }
  };
  const handleCheckboxChange = (fileName) => {
    setSelectedFilesToPlot(prevState => {
      const updatedFilesToPlot = { ...prevState, [fileName]: !prevState[fileName] };
      plotDataFromFiles(updatedFilesToPlot);
      return updatedFilesToPlot;
    });
  };
  
const plotDataFromFiles = async (filesToPlot) => {
  const selectedFiles = Object.keys(filesToPlot).filter(fileName => filesToPlot[fileName]);
  const fileReadPromises = selectedFiles.map(async (fileName) => {
    const file = selectedFolderFiles.find(file => file.name === fileName);
    if (file) {
      const fileContent = await readFileAsync(file);
      const { bendingMomentX, bendingMomentY } = parseFileContent(fileContent);
      return {
        x: bendingMomentX,
        y: bendingMomentY,
        mode: 'markers',
        type: 'scatter',
        name: file.name
      };
    }
  });

  const data = await Promise.all(fileReadPromises);
  Plotly.newPlot('scatter-chart', data, {
    title: 'Bending Moments Scatter Plot',
    xaxis: { title: 'Bending Moment X' },
    yaxis: { title: 'Bending Moment Y' }
  });
};

  const readFileAsync = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        resolve(event.target.result);
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsText(file);
    });
  };
  const parseFileContent = (fileContent) => {
    const lines = fileContent.split('\n');
    const dataStartIndex = lines.findIndex(line => line.startsWith('['));
    const dataLines = lines.slice(dataStartIndex);
    const bendingMomentX = [];
    const bendingMomentY = [];
    dataLines.forEach(line => {
      const [x, y] = line.split(';').slice(2, 4).map(Number);
      bendingMomentX.push(x);
      bendingMomentY.push(y);
    });
    return { bendingMomentX, bendingMomentY };
  };

  return (
    <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center ${isVisible ? '' : 'hidden'}`}>
      <div className="p-1 rounded-md flex flex-col  overflow-y-auto" style={{ backgroundColor: 'white', width:'90%' , height:'90%'}} onClick={(e) => e.stopPropagation()}>

        <div className="flex justify-between items-center mt-4">
          <div>
            <h2 className="text-lg font-bold mb-2">Select Folder:</h2>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue mb-4"
              onClick={handleFolderSelect}
            >
              Select Folder
            </button>
            {selectedFolderFiles.length > 0 && (
              <div>
                <h2 className="text-lg font-bold mb-2">Files in Selected Folder:</h2>
                <ul>
                  {selectedFolderFiles.map((file, index) => (
                    <li key={index}>
                      <input
                        type="checkbox"
                        checked={selectedFilesToPlot[file.name] || false}
                        onChange={() => handleCheckboxChange(file.name)}
                      />
                      {file.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <div id="scatter-chart" className="w-full h-96"></div>

        <div className="flex justify-end mt-4">
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-red"
            onClick={onClose}
          >
            Exit
          </button>
        </div>
        
      </div>
    </div>
  );
};

export default NewComponent;
