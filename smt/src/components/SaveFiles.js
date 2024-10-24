// import React, { useState, useEffect } from 'react';

// const SaveFiles = ({ selectedFiles }) => {
//   const [filesToDelete, setFilesToDelete] = useState([]);

//   // Function to handle checkbox changes
//   const handleCheckboxChange = (event, file) => {
//     const isChecked = event.target.checked;
//     if (isChecked) {
//       setFilesToDelete(prevState => [...prevState, file]); // Add file to delete list
//     } else {
//       setFilesToDelete(prevState => prevState.filter(item => item !== file)); // Remove file from delete list
//     }
//   };

//   // Function to handle file deletion
//   const handleDeleteFiles = () => {
//     console.log('Files to delete:', filesToDelete);
//     // Implement logic to delete selected files
//     filesToDelete.forEach(file => {
//       // Assuming you have some logic here to delete the files, for example:
//       console.log('Deleting file:', file.name);
//       // Your deletion logic goes here
//       selectedFiles.splice(selectedFiles.indexOf(file), 1); // Remove file from selectedFiles array
//     });
//     setFilesToDelete([]); // Clear the delete list after deletion
//   };

//   useEffect(() => {
//     // Loop through the selected files array and read the content of each file
//     selectedFiles.forEach((file, index) => {
//       const reader = new FileReader();

//       reader.onload = (e) => {
//         const content = e.target.result;
//         console.log(`Content of File ${index + 1}:`);
//         console.log(content); // Log the content of each file
//       };

//       reader.readAsText(file); // Read file content as text
//     });
//   }, [selectedFiles]);

//   return (
//     <div className="mt-4" style={{ position: 'relative', left: '10%', width: '600px' }}>
//       <h2 className="text-lg font-bold mb-2">Saved Files</h2>
//       <div className="overflow-x-auto">
//         <table className="sm:w-2/3 md:w-1/2 lg:w-1/3 divide-y divide-gray-200 dark:bg-gray-700">
//           <thead className="bg-gray-50">
//             <tr>
//               <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 File Name
//               </th>
//               <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Actions
//               </th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200" >
//             {selectedFiles.map((file, index) => (
//               <tr key={index}>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <div className="text-sm text-gray-900">{file.name}</div>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <input
//                     type="checkbox"
//                     className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
//                     onChange={(e) => handleCheckboxChange(e, file)}
//                   />
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       <button onClick={handleDeleteFiles} className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
//         Delete Selected
//       </button>
//     </div>
//   );
// };

// export default SaveFiles;



//"""""""""this below is correct final code"""""""""
// import React, { useState, useEffect } from 'react';

// const SaveFiles = ({ selectedFiles }) => {
//   const [filesToDelete, setFilesToDelete] = useState([]);

//   // Function to handle checkbox changes
//   const handleCheckboxChange = (event, file) => {
//     const isChecked = event.target.checked;
//     if (isChecked) {
//       setFilesToDelete(prevState => [...prevState, file]); // Add file to delete list
//     } else {
//       setFilesToDelete(prevState => prevState.filter(item => item !== file)); // Remove file from delete list
//     }
//   };

//   // Function to handle file deletion
//   const handleDeleteFiles = () => {
//     console.log('Files to delete:', filesToDelete);
//     // Implement logic to delete selected files
//     filesToDelete.forEach(file => {
//       // Assuming you have some logic here to delete the files, for example:
//       console.log('Deleting file:', file.name);
//       // Your deletion logic goes here
//       selectedFiles.splice(selectedFiles.indexOf(file), 1); // Remove file from selectedFiles array
//     });
//     setFilesToDelete([]); // Clear the delete list after deletion
//   };

//   useEffect(() => {
//     // Loop through the selected files array and read the content of each file
//     selectedFiles.forEach((file, index) => {
//       const reader = new FileReader();

//       reader.onload = (e) => {
//         const content = e.target.result;
//         console.log(`Content of File ${index + 1}:`);
//         console.log(content); // Log the content of each file
//       };

//       reader.readAsText(file); // Read file content as text
//     });
//   }, [selectedFiles]);

//   return (
//     <div className="mt-4" style={{ position: 'relative', left: '10%', width: '400px' }}>
//       <h2 className="text-lg font-bold mb-2">Saved Files</h2>
//       <div className="overflow-x-auto ">
//         <table className="sm:w-2/3 md:w-1/2 lg:w-1/3 divide-y divide-gray-200 dark:bg-gray-700 ">
//           <thead className="bg-gray-50">
//             <tr>
//               <th scope="col" className="px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" >
//                 File Name
//               </th>
//               <th scope="col" className="px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Actions
//               </th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200 " >
//             {selectedFiles.map((file, index) => (
//               <tr key={index}>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <div className="text-sm text-gray-900">{file.name}</div>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <input
//                     type="checkbox"
//                     className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
//                     onChange={(e) => handleCheckboxChange(e, file)}
//                   />
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       <button onClick={handleDeleteFiles} className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-2 rounded">
//         Delete selected
//       </button>
//     </div>
//   );
// };

// export default SaveFiles;


import React, { useState, useEffect } from 'react';

const SaveFiles = ({ selectedFiles }) => {
  const [filesToDelete, setFilesToDelete] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleCheckboxChange = (event, file) => {
    const isChecked = event.target.checked;
    if (isChecked) {
      setFilesToDelete(prevState => [...prevState, file]);
    } else {
      setFilesToDelete(prevState => prevState.filter(item => item !== file));
    }
  };

  const handleDeleteFiles = () => {
    console.log('Files to delete:', filesToDelete);
    filesToDelete.forEach(file => {
      console.log('Deleting file:', file.name);
      selectedFiles.splice(selectedFiles.indexOf(file), 1);
    });
    setFilesToDelete([]);
  };

  useEffect(() => {
    selectedFiles.forEach((file, index) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target.result;
        console.log(`Content of File ${index + 1}:`);
        console.log(content);
      };
      reader.readAsText(file);
    });
  }, [selectedFiles]);

  const getResponsiveStyle = (baseWidth) => {
    const scaleFactor = windowWidth / 1920; // Assuming 1920px as the base width
    return {
      width: `${Math.min(baseWidth * scaleFactor, baseWidth)}px`,
      left: `${Math.min(10 * scaleFactor, 10)}%`,
    };
  };

  const responsiveStyle = getResponsiveStyle(400);

  const getResponsiveButtonStyle = () => {
    const scaleFactor = windowWidth / 1920;
    return {
      fontSize: `${Math.max(14 * scaleFactor, 12)}px`,
      padding: `${Math.max(8 * scaleFactor, 6)}px ${Math.max(16 * scaleFactor, 12)}px`,
    };
  };

  const responsiveButtonStyle = getResponsiveButtonStyle();

  return (
    <div className="mt-4" style={{ position: 'relative', ...responsiveStyle,bottom:'30px' }}>
      <h2 className="text-lg font-bold mb-2">Saved Files</h2>
      <div className="overflow-x-auto">
        <table className="w-full divide-y divide-gray-200 dark:bg-gray-700">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                File Name
              </th>
              <th scope="col" className="px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {selectedFiles.map((file, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{file.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    onChange={(e) => handleCheckboxChange(e, file)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button 
        onClick={handleDeleteFiles} 
        className="mt-4 bg-gray-400 hover:bg-gray-300 text-black font-semibold rounded"
        style={responsiveButtonStyle}
      >
        Delete selected
      </button>
    </div>
  );
};

export default SaveFiles;