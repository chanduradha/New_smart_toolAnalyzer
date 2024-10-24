import React, { useState } from 'react';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { saveAs } from 'file-saver';
// import { LineGraph } from './LineGraph';
 // Adjust the path as needed
 

const MetricUnitsPopup = ({ onClose, selectedFile, fileData }) => {
  const [operator, setOperator] = useState('');
  const [material, setMaterial] = useState('');
  const [tool, setTool] = useState('');
  const [vc, setVc] = useState('');
  const [f, setF] = useState('');
  const [ap, setAp] = useState('');
  const [n, setN] = useState('');
  const [vf, setVf] = useState('');
  const [ae, setAe] = useState('');
  const [z, setZ] = useState('');
  const [d, setD] = useState('');
  const [x, setX] = useState('');
  const [notes, setNotes] = useState('');

  const handleChange = (event) => {
    setOperator(event.target.value);
  };
  const handleChange1 = (event) => {
    setMaterial(event.target.value);
  };
  const handleChange2 = (event) => {
    setTool(event.target.value);
  };
  const handleChange3 = (event) => {
    setVc(event.target.value);
  };
  const handleChange4 = (event) => {
    setF(event.target.value);
  };
  const handleChange5 = (event) => {
    setAp(event.target.value);
  };
  const handleChange6 = (event) => {
    setN(event.target.value);
  };
  const handleChange7 = (event) => {
    setVf(event.target.value);
  };
  const handleChange8 = (event) => {
    setAe(event.target.value);
  };
  const handleChange9 = (event) => {
    setZ(event.target.value);
  };
  const handleChange10 = (event) => {
    setD(event.target.value);
  };
  const handleChange11 = (event) => {
    setX(event.target.value);
  };
  const handleChange12 = (event) => {
    setNotes(event.target.value);
  };
  const handleBuildPdf = async () => {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();

    const { width, height } = page.getSize();
  // Set background color
    page.drawRectangle({
        x: 0,
        y: 0,
        width,
        height,
        color: rgb(0.8, 0.8, 0.8), // Gray color
        fillOpacity: 1,
    });
    let fontSize = 15; // Initial font size
    const lineHeight = fontSize * 1.2;

    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

    const drawText = (text, x, y, size = fontSize, color = [0, 0, 0]) => {
        page.drawText(text, { x, y, size, font: helveticaFont, color: rgb(...color) });
    };

    const labelX = 50;
    const valueX = 200;
    let y = height - 50;

    // Decrease font size for subsequent labels
    const decreaseFontSize = () => {
        if (fontSize > 10) {
            fontSize -= 5; // Decrease font size by 5
        }
    };

    // Draw label and input value with optional font size
    const drawLabelAndValue = (label, value, size = fontSize) => {
      drawText(label, labelX, y, size);
      drawText(value || '', valueX, y, size); // Use empty string if value is undefined
      decreaseFontSize();
      y -= lineHeight;
  };
    
    // Draw subtitle "Measurement File:" with underline and color
    drawText("Measurement File:", labelX, y, fontSize, [1, 0, 0]); // Red color
    page.drawLine({
        start: { x: labelX, y: y - 1 },
        end: { x: labelX + 140, y: y - 1 },
        thickness: 1,
        color: rgb(1, 0, 0), // Red color
    });
    y -= lineHeight * 2; // Add extra spacing

// Draw file name and file path with reduced font size
drawLabelAndValue('File Name:', selectedFile ? selectedFile.name : '', 12);

    // Get current Indian Standard Time (IST)
    const currentIST = new Date().toLocaleString('en-US', {
        timeZone: 'Asia/Kolkata', // IST timezone
    });

    // Draw current IST on the PDF with reduced font size
    drawText(`Date & Time (IST): ${currentIST}`, labelX, y, 12); // Reducing font size to 12
    y -= lineHeight * 2; // Move down two lines for spacing

    // Draw subtitle "Documentation:" with underline and color
    drawText("Documentation:", labelX, y, fontSize, [0, 0, 1]); // Blue color
    page.drawLine({
        start: { x: labelX, y: y - 2 },
        end: { x: labelX + 110, y: y - 2 },
        thickness: 1,
        color: rgb(0, 0, 1), // Blue color
    });
    y -= lineHeight * 2; // Move down two more lines for spacing

    // Reset font size for subsequent labels
    fontSize = 15; // Reset font size

    // Draw other labels and input values with reduced font size
    drawLabelAndValue('Operator:', operator, 12); // Reducing font size for Operator
    drawLabelAndValue('Material:', material);
    drawLabelAndValue('Tool:', tool);
    drawLabelAndValue('VC m/min:', vc);
    drawLabelAndValue('F mm/U:', f);
    drawLabelAndValue('Ap m/m:', ap);
    drawLabelAndValue('N U/min:', n);
    drawLabelAndValue('Vf mm/min:', vf);
    drawLabelAndValue('Ae mm:', ae);
    drawLabelAndValue('Z:', z);
    drawLabelAndValue('D mm:', d);
    drawLabelAndValue('X degree:', x);
    drawLabelAndValue('Notes:', notes);



 // Add spacing between the notes and the table
const tableSpacing = 20; // Adjust as needed
y -= (lineHeight + tableSpacing);
  // Draw table
  const tableHeader = ['Metric', 'Mean', 'Max. Value', 'Min. Value', 'Slope'];
  const tableData = [
    ['Tension', 'X', 'X', 'X', 'X'],
    ['Torsion', 'X', 'X', 'X', 'X'],
    ['Bending Moment (Nm)', 'X', 'X', 'X', 'X'],
    ['Temperature', 'X', 'X', 'X', 'X'],
  ];

  const tableHeaderY = y;
  const tableY = y - lineHeight;

  // Draw table header
  tableHeader.forEach((header, index) => {
      drawText(header, labelX + index * 120, tableHeaderY, fontSize, [0, 0, 0]); // Black color
  });

  // Draw table data
  tableData.forEach((row, rowIndex) => {
      row.forEach((cell, cellIndex) => {
          drawText(cell, labelX + cellIndex * 120, tableY - (rowIndex + 1) * lineHeight, fontSize);
      });
  });

  
  // try {
  //   const imageData = await LineGraph.handleDownloadImage();
  //   if (imageData) {
  //     const imgData = Uint8Array.from(atob(imageData.split(',')[1]), c => c.charCodeAt(0));

  //     // Embed the image in the PDF
  //     const image = await pdfDoc.embedPng(imgData);
  //     const imageSize = image.scale(0.5); // Adjust image scale as needed

  //     // Add the image to the PDF
  //     page.drawImage(image, {
  //       x: labelX,
  //       y,
  //       width: imageSize.width,
  //       height: imageSize.height,
  //     });

      // Save and download the PDF
      const pdfBytes = await pdfDoc.save();
      saveAs(new Blob([pdfBytes], { type: 'application/pdf' }), 'metrics.pdf');
  //   } else {
  //     // Handle the case where imageData is undefined
  //     console.error('Error: Image data is undefined');
  //   }
  // } catch (error) {
  //   // Handle any other errors that might occur during PDF generation
  //   console.error('Error during PDF generation:', error);
  // }
};
  
  

  return (
    <div className="absolute left-0 top-0 mt-2 space-y-2 text-black `fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center ${isVisible ? '' : 'hidden'}`">
      <div className="bg-gray-400 p-4 rounded-lg shadow-lg" style={{ width: '800px', height: '1000px', position: 'relative', }}>
        <label htmlFor="operator" className="block font-medium">
          Operator
        </label>
        <input
          type="text"
          id="operator"
          name="operator"
          value={operator}
          onChange={handleChange}
          className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          style={{ width: '160px' }}
        />
        <label htmlFor="material" className="block font-medium">
          Material
        </label>
        <input
          type="text"
          id="material"
          name="material"
          value={material}
          onChange={handleChange1}
          className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          style={{ width: '160px' }}
        />
        <label htmlFor="tool" className="block font-medium">
          Tool
        </label>
        <input
          type="text"
          id="tool"
          name="tool"
          value={tool}
          onChange={handleChange2}
          className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          style={{ width: '160px' }}
        />
        <label htmlFor="vc" className="block font-medium" style={{ position: 'relative', left: '230px', bottom: '200px' }}>
          VC m/min
        </label>
        <input
          type="text"
          id="vc"
          name="vc"
          value={vc}
          onChange={handleChange3}
          className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          style={{ width: '80px', position: 'relative', left: '230px', bottom: '200px' }}
        />
        <label htmlFor="f" className="block font-medium" style={{ position: 'relative', left: '230px', bottom: '195px' }}>
          f mm/U
        </label>
        <input
          type="text"
          id="f"
          name="f"
          value={f}
          onChange={handleChange4}
          className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          style={{ width: '80px', position: 'relative', left: '230px', bottom: '195px' }}
        />
        <label htmlFor="ap" className="block font-medium" style={{ position: 'relative', left: '230px', bottom: '195px' }}>
          ap m/m
        </label>
        <input
          type="text"
          id="ap"
          name="ap"
          value={ap}
          onChange={handleChange5}
          className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          style={{ width: '80px', position: 'relative', left: '230px', bottom: '195px' }}
        />
        <label htmlFor="n" className="block font-medium" style={{ position: 'relative', left: '370px', bottom: '400px' }}>
          n U/min
        </label>
        <input
          type="text"
          id="n"
          name="n"
          value={n}
          onChange={handleChange6}
          className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          style={{ width: '80px', position: 'relative', left: '370px', bottom: '400px' }}
        />
        <label htmlFor="vf" className="block font-medium" style={{ position: 'relative', left: '370px', bottom: '400px' }}>
          vf mm/
        </label>
        <input
          type="text"
          id="vf"
          name="vf"
          value={vf}
          onChange={handleChange7}
          className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          style={{ width: '80px', position: 'relative', left: '370px', bottom: '400px' }}
        />
        <label htmlFor="ae" className="block font-medium" style={{ position: 'relative', left: '370px', bottom: '400px' }}>
          ae mm
        </label>
        <input
          type="text"
          id="ae"
          name="ae"
          value={ae}
          onChange={handleChange8}
          className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          style={{ width: '80px', position: 'relative', left: '370px', bottom: '400px' }}
        />
        <label htmlFor="d" className="block font-medium" style={{ position: 'relative', left: '500px', bottom: '600px' }}>
          d mm
        </label>
        <input
          type="text"
          id="d"
          name="d"
          value={d}
          onChange={handleChange10}
          className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          style={{ width: '80px', position: 'relative', left: '500px', bottom: '600px' }}
        />
        <label htmlFor="z" className="block font-medium" style={{ position: 'relative', left: '500px', bottom: '600px' }}>
          z
        </label>
        <input
          type="text"
          id="z"
          name="z"
          value={z}
          onChange={handleChange9}
          className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          style={{ width: '80px', position: 'relative', left: '500px', bottom: '600px' }}
        />
        <label htmlFor="x" className="block font-medium" style={{ position: 'relative', left: '500px', bottom: '600px' }}>
          x degree
        </label>
        <input
          type="text"
          id="x"
          name="x"
          value={x}
          onChange={handleChange11}
          className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          style={{ width: '80px', position: 'relative', left: '500px', bottom: '600px' }}
        />
        <label htmlFor="notes" className="block font-medium" style={{ position: 'relative', bottom: '550px' }}>
          Notes
        </label>
        <input
          type="text"
          id="notes"
          name="notes"
          value={notes}
          onChange={handleChange12}
          className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          style={{ width: '680px', height: '130px', position: 'relative', bottom: '550px' }}
        />
        <button
          className="block px-4 py-2 mt-4 bg-red-600 text-white rounded-lg shadow-md"
          onClick={onClose}
          style={{ position: 'relative', bottom: '50px', left: '80%', width: '150px' }}
        >
          Cancel
        </button>
        <button
          className="block px-4 py-2 mt-2 bg-red-600 text-white rounded-lg shadow-md"
          onClick={handleBuildPdf}
          style={{ position: 'relative', bottom: '100px', left: '60%', width: '150px' }}
        >
          Build PDF
        </button>
        <table className="min-w-full divide-y divide-gray-200" style={{position:'relative',bottom:'600px'}}>
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Metric</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mean</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Max. Value</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Min. Value</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Slope</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Tension</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">-</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">-</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">-</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">-</td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Torsion</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">-</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">-</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">-</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">-</td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Bending Moment (Nm)</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">-</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">-</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">-</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">-</td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Temperature</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">-</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">-</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">-</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">-</td>
                        </tr>
                    </tbody>
                </table>
      </div>
    </div>
  );
};

export default MetricUnitsPopup;



// import React, { useState } from 'react';
// import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
// import { saveAs } from 'file-saver';
// import { LineGraph } from './LineGraph';

// // Adjust the path as needed


// const MetricUnitsPopup = ({ onClose }) => {
//     const [operator, setOperator] = useState('');
//     const [material, setMaterial] = useState('');
//     const [tool, setTool] = useState('');
//     const [vc, setVc] = useState('');
//     const [f, setF] = useState('');
//     const [ap, setAp] = useState('');
//     const [n, setN] = useState('');
//     const [vf, setVf] = useState('');
//     const [ae, setAe] = useState('');
//     const [z, setZ] = useState('');
//     const [d, setD] = useState('');
//     const [x, setX] = useState('');
//     const [notes, setNotes] = useState('');

//     const handleChange = (event) => {
//         setOperator(event.target.value);
//     };
//     const handleChange1 = (event) => {
//       setMaterial(event.target.value);
//     };
//     const handleChange2 = (event) => {
//       setTool(event.target.value);
//     };
//     const handleChange3 = (event) => {
//       setVc(event.target.value);
//     };
//     const handleChange4 = (event) => {
//       setF(event.target.value);
//     };
//     const handleChange5 = (event) => {
//       setAp(event.target.value);
//     };
//     const handleChange6 = (event) => {
//       setN(event.target.value);
//     };
//     const handleChange7 = (event) => {
//       setVf(event.target.value);
//     };
//     const handleChange8 = (event) => {
//       setAe(event.target.value);
//     };
//     const handleChange9 = (event) => {
//       setZ(event.target.value);
//     };
//     const handleChange10 = (event) => {
//       setD(event.target.value);
//     };
//     const handleChange11 = (event) => {
//       setX(event.target.value);
//     };
//     const handleChange12 = (event) => {
//       setNotes(event.target.value);
//     };

//     const handleBuildPdf = async () => {
//       const pdfDoc = await PDFDocument.create();
//       const page = pdfDoc.addPage();
  
//       const { width, height } = page.getSize();
  
//       let fontSize = 15; // Initial font size
//       const lineHeight = fontSize * 1.2;
  
//       const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
  
//       const drawText = (text, x, y, size = fontSize, color = [0, 0, 0]) => {
//           page.drawText(text, { x, y, size, font: helveticaFont, color: rgb(...color) });
//       };
  
//       const labelX = 50;
//       const valueX = 200;
//       let y = height - 50;
  
//       // Decrease font size for subsequent labels
//       const decreaseFontSize = () => {
//           if (fontSize > 10) {
//               fontSize -= 5; // Decrease font size by 5
//           }
//       };
  
//       // Draw label and input value with optional font size
//       const drawLabelAndValue = (label, value, size = fontSize) => {
//           drawText(label, labelX, y, size);
//           drawText(value, valueX, y, size);
//           decreaseFontSize();
//           y -= lineHeight;
//       };
  
//       // Draw subtitle "Measurement File:" with underline and color
//       drawText("Measurement File:", labelX, y, fontSize, [1, 0, 0]); // Red color
//       page.drawLine({
//           start: { x: labelX, y: y - 2 },
//           end: { x: labelX + 140, y: y - 2 },
//           thickness: 1,
//           color: rgb(1, 0, 0), // Red color
//       });
//       y -= lineHeight * 2; // Add extra spacing
  
//       // Get current Indian Standard Time (IST)
//       const currentIST = new Date().toLocaleString('en-US', {
//           timeZone: 'Asia/Kolkata', // IST timezone
//       });
  
//       // Draw current IST on the PDF with reduced font size
//       drawText(`Date & Time (IST): ${currentIST}`, labelX, y, 12); // Reducing font size to 12
//       y -= lineHeight * 2; // Move down two lines for spacing
  
//       // Draw subtitle "Documentation:" with underline and color
//       drawText("Documentation:", labelX, y, fontSize, [0, 0, 1]); // Blue color
//       page.drawLine({
//           start: { x: labelX, y: y - 2 },
//           end: { x: labelX + 110, y: y - 2 },
//           thickness: 1,
//           color: rgb(0, 0, 1), // Blue color
//       });
//       y -= lineHeight * 2; // Move down two more lines for spacing
  
//       // Reset font size for subsequent labels
//       fontSize = 15; // Reset font size
  
//       // Draw other labels and input values with reduced font size
//       drawLabelAndValue('Operator:', operator, 12); // Reducing font size for Operator
//       drawLabelAndValue('Material:', material);
//       drawLabelAndValue('Tool:', tool);
//       drawLabelAndValue('VC m/min:', vc);
//       drawLabelAndValue('F mm/U:', f);
//       drawLabelAndValue('Ap m/m:', ap);
//       drawLabelAndValue('N U/min:', n);
//       drawLabelAndValue('Vf mm/min:', vf);
//       drawLabelAndValue('Ae mm:', ae);
//       drawLabelAndValue('Z:', z);
//       drawLabelAndValue('D mm:', d);
//       drawLabelAndValue('X degree:', x);
//       drawLabelAndValue('Notes:', notes);
  
//       // Add spacing between the notes and the table
//       const tableSpacing = 20; // Adjust as needed
//       y -= (lineHeight + tableSpacing);
  
//       // Draw table
//       const tableHeader = ['Metric', 'Mean', 'Max. Value', 'Min. Value', 'Slope'];
//       const tableData = [
//           ['Tension', 'X', 'X', 'X', 'X'],
//           ['Torsion', 'X', 'X', 'X', 'X'],
//           ['Bending Moment (Nm)', 'X', 'X', 'X', 'X'],
//           ['Temperature', 'X', 'X', 'X', 'X'],
//       ];
  
//       const tableHeaderY = y;
//       const tableY = y - lineHeight;
  
//       // Draw table header
//       tableHeader.forEach((header, index) => {
//           drawText(header, labelX + index * 120, tableHeaderY, fontSize, [0, 0, 0]); // Black color
//       });
  
//       // Draw table data
//       tableData.forEach((row, rowIndex) => {
//           row.forEach((cell, cellIndex) => {
//               drawText(cell, labelX + cellIndex * 120, tableY - (rowIndex + 1) * lineHeight, fontSize);
//           });
//       });
  
//        // Embed the image in the PDF
//        const imageData = await LineGraph.handleDownloadImage();
//        if (imageData) {
//            try {
//                const imgData = atob(imageData.split(',')[1]);
//                const image = await pdfDoc.embedPng(imgData);
//                const imageSize = image.scale(0.5); // Adjust image scale as needed
   
//                // Determine the position for the image
//                const imageX = labelX; // Adjust the X position as needed
//                let imageY = y; // Adjust the Y position as needed
   
//                // Add the image to the PDF
//                page.drawImage(image, {
//                    x: imageX,
//                    y: imageY,
//                    width: imageSize.width,
//                    height: imageSize.height,
//                });
   
//                // Update Y position after adding the image
//                imageY -= imageSize.height + lineHeight;
//            } catch (error) {
//             console.error('Error embedding image:', error);
//         }
//     } else {
//         // Handle the case where imageData is undefined
//         console.error('Error: Image data is undefined');
//     }
   
//        // Save the existing PDF content
//     const existingPdfBytes = await pdfDoc.save();

//     // Create a new PDF document to merge the existing content with the graph image
//     const mergedPdfDoc = await PDFDocument.load(existingPdfBytes);
//     const graphPage = mergedPdfDoc.getPage(0); // Assuming the graph image is added to the first page

//     // Your existing code for drawing the PDF content on the page

//     // Save the merged PDF with both the graph image and the existing content
//     const mergedPdfBytes = await mergedPdfDoc.save();

//     // Create a Blob from the merged PDF bytes
//     const pdfBlob = new Blob([mergedPdfBytes], { type: 'application/pdf' });

//     // Create a URL for the Blob
//     const pdfUrl = URL.createObjectURL(pdfBlob);

//     // Create an anchor element to trigger the download
//     const a = document.createElement('a');
//     a.href = pdfUrl;
//     a.download = 'merged_metrics.pdf';

//     // Append the anchor element to the document body
//     document.body.appendChild(a);

//     // Click the anchor element to trigger the download
//     a.click();

//     // Remove the anchor element from the document body
//     document.body.removeChild(a);

//     // Revoke the URL to release resources
//     URL.revokeObjectURL(pdfUrl);
// };
   
//     return (
//       <div className="absolute left-20 top-0 mt-2 space-y-2 text-black">
//         <div className="bg-white p-4 rounded-lg shadow-lg" style={{ width: '800px', height: '1000px', position: 'relative', left: '750px', top: '250px' }}>
//           <label htmlFor="operator" className="block font-medium">
//             Operator
//           </label>
//           <input
//             type="text"
//             id="operator"
//             name="operator"
//             value={operator}
//             onChange={handleChange}
//             className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
//             style={{ width: '160px' }}
//           />
//           <label htmlFor="material" className="block font-medium">
//             Material
//           </label>
//           <input
//             type="text"
//             id="material"
//             name="material"
//             value={material}
//             onChange={handleChange1}
//             className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
//             style={{ width: '160px' }}
//           />
//           <label htmlFor="tool" className="block font-medium">
//             Tool
//           </label>
//           <input
//             type="text"
//             id="tool"
//             name="tool"
//             value={tool}
//             onChange={handleChange2}
//             className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
//             style={{ width: '160px' }}
//           />
//           <label htmlFor="vc" className="block font-medium" style={{ position: 'relative', left: '230px', bottom: '200px' }}>
//             VC m/min
//           </label>
//           <input
//             type="text"
//             id="vc"
//             name="vc"
//             value={vc}
//             onChange={handleChange3}
//             className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
//             style={{ width: '80px', position: 'relative', left: '230px', bottom: '200px' }}
//           />
//           <label htmlFor="f" className="block font-medium" style={{ position: 'relative', left: '230px', bottom: '195px' }}>
//             f mm/U
//           </label>
//           <input
//             type="text"
//             id="f"
//             name="f"
//             value={f}
//             onChange={handleChange4}
//             className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
//             style={{ width: '80px', position: 'relative', left: '230px', bottom: '195px' }}
//           />
//           <label htmlFor="ap" className="block font-medium" style={{ position: 'relative', left: '230px', bottom: '195px' }}>
//             ap m/m
//           </label>
//           <input
//             type="text"
//             id="ap"
//             name="ap"
//             value={ap}
//             onChange={handleChange5}
//             className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
//             style={{ width: '80px', position: 'relative', left: '230px', bottom: '195px' }}
//           />
//           <label htmlFor="n" className="block font-medium" style={{ position: 'relative', left: '370px', bottom: '400px' }}>
//             n U/min
//           </label>
//           <input
//             type="text"
//             id="n"
//             name="n"
//             value={n}
//             onChange={handleChange6}
//             className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
//             style={{ width: '80px', position: 'relative', left: '370px', bottom: '400px' }}
//           />
//           <label htmlFor="vf" className="block font-medium" style={{ position: 'relative', left: '370px', bottom: '400px' }}>
//             vf mm/
//           </label>
//           <input
//             type="text"
//             id="vf"
//             name="vf"
//             value={vf}
//             onChange={handleChange7}
//             className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
//             style={{ width: '80px', position: 'relative', left: '370px', bottom: '400px' }}
//           />
//           <label htmlFor="ae" className="block font-medium" style={{ position: 'relative', left: '370px', bottom: '400px' }}>
//             ae mm
//           </label>
//           <input
//             type="text"
//             id="ae"
//             name="ae"
//             value={ae}
//             onChange={handleChange8}
//             className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
//             style={{ width: '80px', position: 'relative', left: '370px', bottom: '400px' }}
//           />
//           <label htmlFor="d" className="block font-medium" style={{ position: 'relative', left: '500px', bottom: '600px' }}>
//             d mm
//           </label>
//           <input
//             type="text"
//             id="d"
//             name="d"
//             value={d}
//             onChange={handleChange10}
//             className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
//             style={{ width: '80px', position: 'relative', left: '500px', bottom: '600px' }}
//           />
//           <label htmlFor="z" className="block font-medium" style={{ position: 'relative', left: '500px', bottom: '600px' }}>
//             z
//           </label>
//           <input
//             type="text"
//             id="z"
//             name="z"
//             value={z}
//             onChange={handleChange9}
//             className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
//             style={{ width: '80px', position: 'relative', left: '500px', bottom: '600px' }}
//           />
//           <label htmlFor="x" className="block font-medium" style={{ position: 'relative', left: '500px', bottom: '600px' }}>
//             x degree
//           </label>
//           <input
//             type="text"
//             id="x"
//             name="x"
//             value={x}
//             onChange={handleChange11}
//             className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
//             style={{ width: '80px', position: 'relative', left: '500px', bottom: '600px' }}
//           />
//           <label htmlFor="notes" className="block font-medium" style={{ position: 'relative', bottom: '550px' }}>
//             Notes
//           </label>
//           <input
//             type="text"
//             id="notes"
//             name="notes"
//             value={notes}
//             onChange={handleChange12}
//             className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
//             style={{ width: '680px', height: '130px', position: 'relative', bottom: '550px' }}
//           />
//           <button
//             className="block px-4 py-2 mt-4 bg-red-600 text-white rounded-lg shadow-md"
//             onClick={onClose}
//             style={{ position: 'relative', bottom: '50px', left: '80%', width: '150px' }}
//           >
//             Cancel
//           </button>
//           <button
//             className="block px-4 py-2 mt-2 bg-red-600 text-white rounded-lg shadow-md"
//             onClick={handleBuildPdf}
//             style={{ position: 'relative', bottom: '100px', left: '60%', width: '150px' }}
//           >
//             Build PDF
//           </button>
//           <table className="min-w-full divide-y divide-gray-200" style={{position:'relative',bottom:'600px'}}>
//                       <thead className="bg-gray-50">
//                           <tr>
//                               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Metric</th>
//                               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mean</th>
//                               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Max. Value</th>
//                               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Min. Value</th>
//                               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Slope</th>
//                           </tr>
//                       </thead>
//                       <tbody className="bg-white divide-y divide-gray-200">
//                           <tr>
//                               <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Tension</td>
//                               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">-</td>
//                               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">-</td>
//                               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">-</td>
//                               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">-</td>
//                           </tr>
//                           <tr>
//                               <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Torsion</td>
//                               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">-</td>
//                               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">-</td>
//                               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">-</td>
//                               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">-</td>
//                           </tr>
//                           <tr>
//                               <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Bending Moment (Nm)</td>
//                               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">-</td>
//                               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">-</td>
//                               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">-</td>
//                               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">-</td>
//                           </tr>
//                           <tr>
//                               <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Temperature</td>
//                               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">-</td>
//                               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">-</td>
//                               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">-</td>
//                               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">-</td>
//                           </tr>
//                       </tbody>
//                   </table>
//         </div>
//       </div>
//     );
//   };

// export default MetricUnitsPopup;



