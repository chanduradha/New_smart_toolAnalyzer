// import React, { useState, useEffect, useRef } from 'react';
// import PolarPlot from './PolarPlot';
// import PolarPlotStacking from './PolarPlotStacking' ;
// import GraphicPolarPlotCalculation from './GraphicPolarPlotCalculation';
// import ToolLifePlot from './ToolLifePlot';
// import { LineGraph } from './LineGraph';
// import NewComponent from './NewComponent'; 
// import ThresholdAnalysis from './ThresholdAnalysis';
// //   const [fileData, setFileData] = useState('');

// // import LineChart from './LineChart ';
// // import KPIBarGraphApp from './KPIBarGraphApp';
// import MetricUnitsPopup from './MetricUnitsPopup '; 
// import HelpPDF from 'D:/new_finalSmart_tool/pavi/src/UserManual Tool Analyser.pdf';

// const Navbar = () => {
//   const [fileMenuOpen, setFileMenuOpen] = useState(false);
//   const [reportMenuOpen, setReportMenuOpen] = useState(false);
//   const [productMenuOpen, setProductMenuOpen] = useState(false);
//   const [processMenuOpen, setProcessMenuOpen] = useState(false);
//   const [lineMenuOpen, setLineMenuOpen] = useState(false);
//   const [compareMenuOpen, setCompareMenuOpen] = useState(false);
//   const [polarPlotVisible, setPolarPlotVisible] = useState(false);
//   const [polarPlotStackingVisible, setPolarPlotStackingVisible] = useState(false);
//   const [graphicPolarPlotCalculationVisible, setGraphicPolarPlotCalculationVisible] = useState(false);
//   const [isOtherWindowOpen, setOtherWindowOpen] = useState(false);
//   const [ToolLifePlotVisible,setToolLifePlotVisible] =useState(false);
//   const [selectedFiles, setSelectedFiles] = useState([]);
//   const [thresholdAnalysisVisible, setThresholdAnalysisVisible] = useState(false);
//   // const handleDataUpdate = (updatedData) => {
//   //   // Handle the updated data here, if needed
//   //   console.log('Updated data:', updatedData);
//   // };

// const [newComponentVisible, setNewComponentVisible] = useState(false);
// const [metricUnitsPopupOpen, setMetricUnitsPopupOpen] = useState(false);
// const openHelpPDF = () => {
//   window.open(HelpPDF, '_blank');
// };
//   // const toggleMetricUnitsPopup = () => {
//   //   setMetricUnitsPopupOpen(!metricUnitsPopupOpen);
//   // };
//   const toggleThresholdAnalysis = () => {
//     setThresholdAnalysisVisible(!thresholdAnalysisVisible);
//     setOtherWindowOpen(!thresholdAnalysisVisible);
//   };

//   const closeThresholdAnalysis = () => {
//     setThresholdAnalysisVisible(false);
//     setOtherWindowOpen(!thresholdAnalysisVisible);
//   };

//   const toggleMetricUnitsPopup = () => {
//     setMetricUnitsPopupOpen(!metricUnitsPopupOpen);
//     setOtherWindowOpen(!metricUnitsPopupOpen); // Toggle the isOtherWindowOpen state
//   };
  
//   const closeMetricUnitsPopup = () => {
//     setMetricUnitsPopupOpen(false);
//     setOtherWindowOpen(false); // Close the other window
//   };

//    const handleNewComponentClick = (e) => {
//     e.stopPropagation(); // Prevent click propagation to the document
//   };

//   const [fileList, setFileList] = useState([]);
//   const saveRecord = (fileEntry) => {
//     setFileList([...fileList, fileEntry]);
//   };
  

//   const fileMenuRef = useRef(null);
//   const productMenuRef = useRef(null);

//   const handlePolarPlotClick = (e) => {
//     e.stopPropagation(); // Prevent click propagation to the document
//   };
  
//   const handlePolarPlotStackingClick = (e) => {
//     e.stopPropagation(); // Prevent click propagation to the document
//   };

//   const handleGraphicPolarPlotCalculationClick = (e) => {
//     e.stopPropagation(); // Prevent click propagation to the document
//   };

 


//   useEffect(() => {
//     const handleDocumentClick = (e) => {
//       if (
//         fileMenuRef.current &&
//         !fileMenuRef.current.contains(e.target) &&
//         productMenuRef.current &&
//         !productMenuRef.current.contains(e.target)
//       ) {
//         setFileMenuOpen(false);
//         setReportMenuOpen(false);
//         setProductMenuOpen(false);
//         setProcessMenuOpen(false);
//         setLineMenuOpen(false);
//         setCompareMenuOpen(false);
//       }
//     };

//     document.addEventListener('click', handleDocumentClick);

//     return () => {
//       document.removeEventListener('click', handleDocumentClick);
//     };
//   }, []);

//   const toggleFileMenu = () => {
//     setFileMenuOpen(!fileMenuOpen);
//   };

//   const toggleReportMenu = () => {
//     setReportMenuOpen(!reportMenuOpen);
//   };

//   const toggleProductMenu = () => {
//     setProductMenuOpen(!productMenuOpen);
//   };

//   const toggleProcessMenu = () => {
//     setProcessMenuOpen(!processMenuOpen);
//   };

//   const toggleLineMenu = () => {
//     setLineMenuOpen(!lineMenuOpen);
//   };

//   const toggleCompareMenu = () => {
//     setCompareMenuOpen(!compareMenuOpen);
//   };

//   const togglePolarPlot = () => {
//     setPolarPlotVisible(!polarPlotVisible);
//     setOtherWindowOpen(!polarPlotVisible); // Toggle the isOtherWindowOpen state
//   };

//   const closePolarPlot = () => {
//     setPolarPlotVisible(false);
//     setOtherWindowOpen(false); // Close the other window
//   };

//   const togglePolarPlotStacking = () => {
//     setPolarPlotStackingVisible(!polarPlotStackingVisible);
//     setOtherWindowOpen(!polarPlotStackingVisible);
//   };

//   const closePolarPlotStacking = () => {
//     setPolarPlotStackingVisible(false);
//     setOtherWindowOpen(!polarPlotStackingVisible);
   
//   };

  
//   const toggleNewComponent = () => {
//     setNewComponentVisible(!newComponentVisible);
//     setOtherWindowOpen(!newComponentVisible);
//   };

//   const closeNewComponent= () => {
//     setNewComponentVisible(false);
//     setOtherWindowOpen(!newComponentVisible);
   
//   };

//   const toggleGraphicPolarPlotCalculation = () => {
//     setGraphicPolarPlotCalculationVisible(!graphicPolarPlotCalculationVisible);
//     setOtherWindowOpen(!graphicPolarPlotCalculationVisible);
//   };

//   const closeGraphicPolarPlotCalculation = () => {
//     setGraphicPolarPlotCalculationVisible(false);
//     setOtherWindowOpen(!graphicPolarPlotCalculationVisible);

//   };

//   const toggleToolLifePlot = () => {
//     setToolLifePlotVisible(!ToolLifePlotVisible);
//     setOtherWindowOpen(!ToolLifePlotVisible);
//   };

//   const closeToolLifePlot = () => {
//     setToolLifePlotVisible(false);
//     setOtherWindowOpen(!ToolLifePlotVisible);
//   };





//   const [fileData, setFileData] = useState([]);

//   const handleFileUpload = (event) => {
//     const uploadedFile = event.target.files[0];
//     const reader = new FileReader();
//     const selectedFile = event.target.files[0];
    
//     setSelectedFiles([...selectedFiles, selectedFile]);
//     console.log("Seleted File");
//     console.log(selectedFile);


//     console.log("Seleted filessssssss");
//     console.log(selectedFiles);
  
//     reader.onload = (e) => {
//       const content = e.target.result;
//       setFileData(content); // Set the file content as a string
//       // togglePolarPlot();
//     };
    
  
//     reader.readAsText(uploadedFile);
//   };

//   const importRawFile = () => {
//     // Programmatically trigger the file input click
//     const fileInput = document.getElementById('fileInput');
//     fileInput.click();
    
//   };

//   const exportRawFile = () => {
//     if (fileData.length > 0) {
//       // Prompt the user to input the filename
//       const fileName = window.prompt('Enter the filename:', 'exported_file.txt');
  
//       if (fileName) {
//         // Create a Blob with the file content
//         const blob = new Blob([fileData], { type: 'text/plain' });
  
//         // Create a URL for the blob
//         const url = window.URL.createObjectURL(blob);
  
//         // Create a link element to trigger the download
//         const link = document.createElement('a');
//         link.href = url;
//         link.download = fileName; // Use the user-provided filename
//         link.style.display = 'none';
  
//         // Append the link to the body and trigger the download
//         document.body.appendChild(link);
//         link.click();
  
//         // Clean up
//         window.URL.revokeObjectURL(url);
//         document.body.removeChild(link);
//       }
//     } else {
//       // Handle case where no file data is available
//       console.error('No file data available to export');
//     }
//   };
  
  


//   return (
//     <div  >
//     <nav className="bg-[#4d5debf8]">
//       <div className="container mx-auto flex justify-between items-center py-4">
//         <div className="relative group" ref={fileMenuRef}>
//           <a href="#" className="text-white group-hover:text-black" onClick={toggleFileMenu}>
//             File
//           </a>
//           {fileMenuOpen && (
//             <div className="absolute left-11 top-0 mt-2 space-y-2 bg-gray-200 text-black">
//               <a href="#" className="block px-4 py-2" onClick={importRawFile}>
//                 ImportRawfile
//               </a>
//               {/* <a href="#" className="block px-4 py-2" onClick={saveRecord}>
//                 Save Record
//               </a> */}
//               <a href="#" className="block px-4 py-2"  onClick={exportRawFile}>ExportRawFile</a>
//               {/* <div className="relative group">
//                 <a href="#" className="block px-4 py-2 group-hover:text-gray-300" onClick={toggleReportMenu}>
//                   CreateReport
//                 </a>
//                 {reportMenuOpen && (
//                   <div className="absolute left-20 top-0 mt-2 space-y-2 bg-gray-800 text-white">
//                     <a href="#" className="block px-4 py-2" style={{ width: '200px' }} onClick={toggleMetricUnitsPopup}>
//                     With Metric Units
//                   </a>
//                     <a href="#" className="block px-4 py-2" style={{width:'200px'}}>With Imperial Units</a>
//                   </div>
//                 )}
//               </div> */}
//             </div>
//           )}
//         </div>
//         {/* Polar Plot element */}
//         <div className="relative group" id="polarPlotElement" onClick={togglePolarPlot}>
//           <a href="#" className="text-white group-hover:text-black">
//             Polar Plot
//           </a>

//           {polarPlotVisible && (
//             <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center" onClick={handlePolarPlotClick}>
//                  <input type="file" id="fileInput" style={{ display: 'none' }} accept=".txt" onChange={handleFileUpload} />
//                   {fileData.length > 0 && (
//                   <PolarPlot isVisible={polarPlotVisible} onClose={closePolarPlot} fileData={fileData} />
//                   )}
//             </div>
//           )}
//         </div>
       
                  
        


//         {/* Polar Plot Stacking element */}
//         <div className="relative group" id="polarPlotStackingElement" onClick={togglePolarPlotStacking} isOtherWindowOpen={false}>
//           <a href="#" className="text-white group-hover:text-black">
//             Polar Plot stacking
//           </a>

//           {polarPlotStackingVisible && (
//             <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center" onClick={handlePolarPlotStackingClick}>
//                  <input type="file" id="fileInput" style={{ display: 'none' }} accept=".txt" onChange={handleFileUpload} />
                  
//                   <PolarPlotStacking isVisible={polarPlotStackingVisible} onClose={closePolarPlotStacking}  />
                  
//             </div>
//           )}
//         </div>
// {/* Your other components */}
// <div className="relative group" id="newComponentElement" onClick={toggleNewComponent}>
//         <a href="#" className="text-white group-hover:text-black">
//           Tool Plot
//         </a>
//         {newComponentVisible && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//             {/* Adjust props as needed */}
//             <NewComponent isVisible={newComponentVisible} onClose={closeNewComponent} />
//           </div>
//         )}
//       </div>




//       <div className="relative group" onClick={toggleGraphicPolarPlotCalculation}>
//         <a href="#" className="text-white group-hover:text-black">
//           Graphic Polar Plot Calculation
//         </a>
//       </div>
//       {graphicPolarPlotCalculationVisible && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//           <GraphicPolarPlotCalculation
//             isVisible={graphicPolarPlotCalculationVisible}
//             onClose={closeGraphicPolarPlotCalculation}
//           />
         
//         </div>
//       )}

// <div className="relative group" onClick={toggleThresholdAnalysis}>
//         <a href="#" className="text-white group-hover:text-black">
//           Threshold Analysis
//         </a>
//       </div>
//       {thresholdAnalysisVisible && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//           <ThresholdAnalysis isVisible={thresholdAnalysisVisible} onClose={closeThresholdAnalysis} />
//         </div>
//       )}




//          {/* New Help menu item */}
//          <div className="relative group" onClick={openHelpPDF}>
//             <a href="#" className="text-white group-hover:text-black">
//               Help
//             </a>
//           </div>

//         {/* toollifeplot */}
//             {/* Tool Life stacking */}
//             {/* <div className="relative group" onClick={toggleToolLifePlot}>
//           <a href="#" className="text-white group-hover:text-red-700">
//            Tool Life Plotting 
//           </a>

//           {ToolLifePlotVisible && (
//             <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
               
//                <ToolLifePlot isVisible={ToolLifePlotVisible} onClose={closeToolLifePlot} fileData={fileData}/> 
         
                    
//             </div>
//           )}
//            </div> */}
      
//         {/* <div className="relative group" ref={productMenuRef}>
//           <a href="#" className="text-white group-hover:text-red-700" onClick={toggleProductMenu}>
//             Graph Setting
//           </a>
//           {productMenuOpen && (
//             <div className="absolute left-28 top-0 mt-2 space-y-2 bg-red-800 text-white">
//               <a href="#" className="block px-4 py-2">Show Grid</a>
//               <div className="relative group">
//                 <a href="#" className="block px-4 py-2 group-hover:text-gray-300" onClick={toggleProcessMenu}>
//                   Processing Modus
//                 </a>
//                 {processMenuOpen && (
//                   <div className="absolute left-28 top-0 mt-2 space-y-2 bg-gray-800 text-white" onClick={toggleLineMenu}>
//                     <a href="#" className="block px-4 py-2">Line Width</a>
//                     {lineMenuOpen && (
//                       <div className="absolute left-20 top-0 mt-2 space-y-2 bg-gray-800 text-white">
//                         <a href="#" className="block px-4 py-2">Type 1</a>
//                         <a href="#" className="block px-4 py-2">Type 2</a>
//                         <a href="#" className="block px-4 py-2">Type 3</a>
//                         <a href="#" className="block px-4 py-2">Type 4</a>
//                         <a href="#" className="block px-4 py-2">Type 5</a>
//                       </div>
//                     )}
//                   </div>
//                 )}
//                 <div className="relative group">
//                   <a href="#" className="block px-4 py-2 group-hover:text-gray-300" onClick={toggleCompareMenu}>
//                     Comparing Modus
//                   </a>
//                   {compareMenuOpen && (
//                     <div className="absolute left-28 top-0 mt-2 space-y-2 bg-gray-800 text-white" onClick={toggleLineMenu}>
//                       <a href="#" className="block px-4 py-2">Line Width</a>
//                       {lineMenuOpen && (
//                         <div className="absolute left-20 top-0 mt-2 space-y-2 bg-gray-800 text-white">
//                           <a href="#" className="block px-4 py-2">Type 1</a>
//                           <a href="#" className="block px-4 py-2">Type 2</a>
//                           <a href="#" className="block px-4 py-2">Type 3</a>
//                           <a href="#" className="block px-4 py-2">Type 4</a>
//                           <a href="#" className="block px-4 py-2">Type 5</a>
//                         </div>
//                       )}
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           )}
//         </div> */}
//         {/* Hidden file input */}
//         <input type="file" id="fileInput" style={{ display: 'none' }} onChange={handleFileUpload} multiple />
//         {/* Render SaveFiles component */}
//       {/* {selectedFiles.length > 0 && <SaveFiles selectedFiles={selectedFiles}  />} */}
//      {/* ToolGraph element */}
     
//       </div>
//     </nav>
//     {metricUnitsPopupOpen && (
//   <MetricUnitsPopup  onClose={closeMetricUnitsPopup}
//   selectedFile={selectedFiles.length > 0 ? selectedFiles[selectedFiles.length - 1] : null}
//   fileData={fileData} />
// )}
//   <div>
//   <LineGraph data={fileData} isOtherWindowOpen={isOtherWindowOpen} selectedFilesNew={selectedFiles} />

     
//      {isOtherWindowOpen && <PolarPlot onClose={() => setOtherWindowOpen(false)} />}
//      {isOtherWindowOpen && <GraphicPolarPlotCalculation onClose={() => setOtherWindowOpen(false)} />}
//      {isOtherWindowOpen && <NewComponent onClose={() => setOtherWindowOpen(false)} />}
   
    
//     {/* <KPIBarGraphApp/>
//     <LineChart data={fileData} isOtherWindowOpen={isOtherWindowOpen}/> */}
//     </div>
//     </div>
//   );
// }

// export default Navbar;



import React, { useState, useEffect, useRef } from 'react';
import PolarPlot from './PolarPlot';
import PolarPlotStacking from './PolarPlotStacking';
import GraphicPolarPlotCalculation from './GraphicPolarPlotCalculation';
import { LineGraph } from './LineGraph';
import NewComponent from './NewComponent'; 
import ReportPopup from './ReportPopup';


const Navbar = () => {
  const [fileMenuOpen, setFileMenuOpen] = useState(false);
  const [reportMenuOpen, setReportMenuOpen] = useState(false);
  const [productMenuOpen, setProductMenuOpen] = useState(false);
  const [processMenuOpen, setProcessMenuOpen] = useState(false);
  const [lineMenuOpen, setLineMenuOpen] = useState(false);
  const [compareMenuOpen, setCompareMenuOpen] = useState(false);
  const [polarPlotVisible, setPolarPlotVisible] = useState(false);
  const [polarPlotStackingVisible, setPolarPlotStackingVisible] = useState(false);
  const [graphicPolarPlotCalculationVisible, setGraphicPolarPlotCalculationVisible] = useState(false);
  const [isOtherWindowOpen, setOtherWindowOpen] = useState(false);
  const [ToolLifePlotVisible, setToolLifePlotVisible] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  
  const [newComponentVisible, setNewComponentVisible] = useState(false);
 
  const [fileList, setFileList] = useState([]);
  const [fileData, setFileData] = useState([]);
  const [activeWindow, setActiveWindow] = useState(null);

//to open the help pdf documentation 
  const HelpPDF = process.env.PUBLIC_URL + '/Smart Tool Holder Analyzer Documentation cmti.pdf';

const [reportPopupVisible, setReportPopupVisible] = useState(false);
const [reportData, setReportData] = useState(null);
const [parsedFileData, setParsedFileData] = useState(null);


const toggleReportPopup = () => {
  if (!reportPopupVisible) {
    if (typeof fileData === 'string' && fileData.trim() !== '') {
      const { extractedData, measurements } = extractReportData(fileData);
      setReportData(extractedData);
      setParsedFileData(measurements);
    } else {
      // Handle the case when no file is loaded or fileData is invalid
      alert("Please load a valid file before creating a report.");
      return;
    }
  }
  setReportPopupVisible(!reportPopupVisible);
  setOtherWindowOpen(!reportPopupVisible);
  setActiveWindow(activeWindow === 'Create Report' ? null : 'Create Report');
};
const closeReportPopup = () => {
  setReportPopupVisible(false);
  setOtherWindowOpen(false);
  setActiveWindow(null);
};
const extractReportData = (data) => {
  if (typeof data !== 'string' || data.trim() === '') {
    console.error('Invalid data provided to extractReportData');
    return { extractedData: {}, measurements: [] };
  }

  const extractedData = {};
  const measurements = [];
  const lines = data.split('\n');
  let dataStarted = false;

  // Skip the first line
  for (let i = 1; i < lines.length; i++) {
    let line = lines[i].trim();
    if (line.startsWith('#')) {
      line = line.substring(1).trim();
      
      if (line.startsWith('date:')) {
        const [date, operator] = line.split('operator:').map(item => item.trim());
        extractedData['date'] = date.replace('date:', '').trim();
        extractedData['operator'] = operator || 'N/A';
      } else if (line.includes('=')) {
        const pairs = line.split(/\s+(?=[a-z])/).map(pair => pair.trim());
        pairs.forEach(pair => {
          const [key, value] = pair.split('=').map(item => item.trim());
          extractedData[key.toLowerCase()] = value || '=';
        });
      } else {
        const [key, value] = line.split(':').map(item => item.trim());
        extractedData[key.toLowerCase()] = value || 'N/A';
      }
    } else if (line.startsWith('Tension;Torsion;')) {
      dataStarted = true;
    } else if (dataStarted && line) {
      const [tension, torsion, bendingMomentX, bendingMomentY, time, temperature] = line.split(';');
      measurements.push({
        Tension: parseFloat(tension),
        Torsion: parseFloat(torsion),
        'Bending moment X': parseFloat(bendingMomentX),
        'Bending moment Y': parseFloat(bendingMomentY),
        Time: parseFloat(time),
        Temperature: parseFloat(temperature)
      });
    }
  }

  const expectedFields = [
    'date', 'operator', 'process', 'tool', 'material', 'tool gage',
    'd', 'z', 'ap', 'ae', 'vc', 'n', 'f', 'vf', 'x', 'cooling', 'unit type', 'note'
  ];

  expectedFields.forEach(field => {
    if (!extractedData[field]) {
      extractedData[field] = 'N/A';
    }
  });

  return { extractedData, measurements };
};


  const fileMenuRef = useRef(null);
  const productMenuRef = useRef(null);

  const openHelpPDF = () => {
    window.open(HelpPDF, '_blank');
  };



  const handleNewComponentClick = (e) => {
    e.stopPropagation();
  };

  const saveRecord = (fileEntry) => {
    setFileList([...fileList, fileEntry]);
  };

  const handlePolarPlotClick = (e) => {
    e.stopPropagation();
  };
  
  const handlePolarPlotStackingClick = (e) => {
    e.stopPropagation();
  };

  const handleGraphicPolarPlotCalculationClick = (e) => {
    e.stopPropagation();
  };

  useEffect(() => {
    const handleDocumentClick = (e) => {
      if (
        fileMenuRef.current &&
        !fileMenuRef.current.contains(e.target) &&
        productMenuRef.current &&
        !productMenuRef.current.contains(e.target)
      ) {
        setFileMenuOpen(false);
        setReportMenuOpen(false);
        setProductMenuOpen(false);
        setProcessMenuOpen(false);
        setLineMenuOpen(false);
        setCompareMenuOpen(false);
      }
    };

    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  const toggleFileMenu = () => {
    setFileMenuOpen(!fileMenuOpen);
  };

  const toggleReportMenu = () => {
    setReportMenuOpen(!reportMenuOpen);
  };

  const toggleProductMenu = () => {
    setProductMenuOpen(!productMenuOpen);
  };

  const toggleProcessMenu = () => {
    setProcessMenuOpen(!processMenuOpen);
  };

  const toggleLineMenu = () => {
    setLineMenuOpen(!lineMenuOpen);
  };

  const toggleCompareMenu = () => {
    setCompareMenuOpen(!compareMenuOpen);
  };

  const togglePolarPlot = () => {
    setPolarPlotVisible(!polarPlotVisible);
    setOtherWindowOpen(!polarPlotVisible);
    setActiveWindow(activeWindow === 'Polar Plot' ? null : 'Polar Plot');
  };

  const closePolarPlot = () => {
    setPolarPlotVisible(false);
    setOtherWindowOpen(false);
    setActiveWindow(null);
  };

  const togglePolarPlotStacking = () => {
    setPolarPlotStackingVisible(!polarPlotStackingVisible);
    setOtherWindowOpen(!polarPlotStackingVisible);
    setActiveWindow(activeWindow === 'Polar Plot stacking' ? null : 'Polar Plot stacking');
  };

  const closePolarPlotStacking = () => {
    setPolarPlotStackingVisible(false);
    setOtherWindowOpen(false);
    setActiveWindow(null);
  };

  const toggleNewComponent = () => {
    setNewComponentVisible(!newComponentVisible);
    setOtherWindowOpen(!newComponentVisible);
    setActiveWindow(activeWindow === 'Tool Plot' ? null : 'Tool Plot');
  };

  const closeNewComponent = () => {
    setNewComponentVisible(false);
    setOtherWindowOpen(false);
    setActiveWindow(null);
  };

  const toggleGraphicPolarPlotCalculation = () => {
    setGraphicPolarPlotCalculationVisible(!graphicPolarPlotCalculationVisible);
    setOtherWindowOpen(!graphicPolarPlotCalculationVisible);
    setActiveWindow(activeWindow === 'Graphic Polar Plot Calculation' ? null : 'Graphic Polar Plot Calculation');
  };

  const closeGraphicPolarPlotCalculation = () => {
    setGraphicPolarPlotCalculationVisible(false);
    setOtherWindowOpen(false);
    setActiveWindow(null);
  };

  const toggleToolLifePlot = () => {
    setToolLifePlotVisible(!ToolLifePlotVisible);
    setOtherWindowOpen(!ToolLifePlotVisible);
  };

  const closeToolLifePlot = () => {
    setToolLifePlotVisible(false);
    setOtherWindowOpen(false);
  };

  // const handleFileUpload = (event) => {
  //   const uploadedFile = event.target.files[0];
  //   const reader = new FileReader();
  //   const selectedFile = event.target.files[0];
    
  //   setSelectedFiles([...selectedFiles, selectedFile]);
  //   console.log("Selected File");
  //   console.log(selectedFile);

  //   console.log("Selected files");
  //   console.log(selectedFiles);
  
  //   reader.onload = (e) => {
  //     const content = e.target.result;
  //     setFileData(content);
  //   };
    
  //   reader.readAsText(uploadedFile);
  // };

//''''''''''''
const handleFileUpload = (event) => {
  const uploadedFile = event.target.files[0];
  
  if (!uploadedFile) {
    console.log("File selection was cancelled");
    return;
  }

  const reader = new FileReader();
  
  setSelectedFiles(prevFiles => [...prevFiles, uploadedFile]);

  reader.onload = (e) => {
    const content = e.target.result;
    setFileData(content);
  };
  
  reader.readAsText(uploadedFile);
};
//''''''''''''
  // const handleFileUpload = (event) => {
  //   const uploadedFile = event.target.files[0];
    
  //   if (!uploadedFile) {
  //     console.log("File selection was cancelled");
  //     return; // Exit the function if no file was selected
  //   }
  
  //   const reader = new FileReader();
  //   const selectedFile = event.target.files[0];
    
  //   setSelectedFiles([...selectedFiles, selectedFile]);
  //   console.log("Selected File");
  //   console.log(selectedFile);
  
  //   console.log("Selected files");
  //   console.log(selectedFiles);
  
  //   reader.onload = (e) => {
  //     const content = e.target.result;
  //     setFileData(content);
  //   };
    
  //   reader.readAsText(uploadedFile);
  // };

  const importRawFile = () => {
    const fileInput = document.getElementById('fileInput');
    fileInput.click();
  };

  const exportRawFile = () => {
    if (fileData.length > 0) {
      const fileName = window.prompt('Enter the filename:', 'exported_file.txt');
  
      if (fileName) {
        const blob = new Blob([fileData], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(link);
      }
    } else {
      console.error('No file data available to export');
    }
  };

  const renderNavbarItems = () => {
    const items = [
      { name: 'Polar Plot', toggle: togglePolarPlot },
      { name: 'Polar Plot stacking', toggle: togglePolarPlotStacking },
      { name: 'Tool Plot', toggle: toggleNewComponent },
      { name: 'Graphic Polar Plot Calculation', toggle: toggleGraphicPolarPlotCalculation },
      { name: 'Create Report', toggle: toggleReportPopup }, // New item
    ];

    if (activeWindow) {
      return items
        .filter(item => item.name === activeWindow)
        .map(item => (
          <div key={item.name} className="relative group" onClick={item.toggle}>
            <a href="#" className="text-white group-hover:text-black">{item.name}</a>
          </div>
        ));
    }

    return items.map(item => (
      <div key={item.name} className="relative group" onClick={item.toggle}>
        <a href="#" className="text-white group-hover:text-black">{item.name}</a>
      </div>
    ));
  };

  return (
    <div>
      <nav className="bg-[#4d5debf8]">
        <div className="container mx-auto flex justify-between items-center py-4">
          <div className="relative group" ref={fileMenuRef}>
            <a href="#" className="text-white group-hover:text-black" onClick={toggleFileMenu}>
              File
            </a>
            {fileMenuOpen && (
              <div className="absolute left-11 top-0 mt-2 space-y-2 bg-gray-200 text-black">
                <a href="#" className="block px-4 py-2" onClick={importRawFile}>
                  ImportRawfile
                </a>
                <a href="#" className="block px-4 py-2" onClick={exportRawFile}>
                  ExportRawFile
                </a>
              </div>
            )}
          </div>
          
          {/* <div className="relative group" onClick={toggleReportPopup}>
            <a href="#" className="text-white group-hover:text-black">
              Create Report
            </a>
          </div> */}
          {renderNavbarItems()}

          <div className="relative group" onClick={openHelpPDF}>
            <a href="#" className="text-white group-hover:text-black">
              Help
            </a>
          </div>
        </div>
      </nav>

      <input type="file" id="fileInput" style={{ display: 'none' }} onChange={handleFileUpload} multiple />


      <div>
        <LineGraph data={fileData} isOtherWindowOpen={isOtherWindowOpen} selectedFilesNew={selectedFiles} />
        
        {polarPlotVisible && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center" onClick={handlePolarPlotClick}>
            <PolarPlot isVisible={polarPlotVisible} onClose={closePolarPlot} fileData={fileData} />
          </div>
        )}

        {polarPlotStackingVisible && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center" onClick={handlePolarPlotStackingClick}>
            <PolarPlotStacking isVisible={polarPlotStackingVisible} onClose={closePolarPlotStacking} />
          </div>
        )}

        {newComponentVisible && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <NewComponent isVisible={newComponentVisible} onClose={closeNewComponent} />
          </div>
        )}

        {graphicPolarPlotCalculationVisible && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <GraphicPolarPlotCalculation
              isVisible={graphicPolarPlotCalculationVisible}
              onClose={closeGraphicPolarPlotCalculation}
            />
          </div>
        )}


{reportPopupVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <ReportPopup 
            isVisible={reportPopupVisible} 
            onClose={() => {
              setReportPopupVisible(false);
              setOtherWindowOpen(false);
              setActiveWindow(null);
            }}
            reportData={reportData} 
            fileData={parsedFileData}
          />
        </div>
      )}
      </div>
    </div>
  );
};

export default Navbar;