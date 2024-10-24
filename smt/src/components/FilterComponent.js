// import React, { useState, useEffect } from 'react';

// const FilterComponent = ({ onFilterChange }) => {
//   const [filters, setFilters] = useState({
//     tension: true,
//     torsion: true,
//     bendingMomentY: true,
//     bendingMomentX: true,
//     temperature: true,
//     combinedSquaredBendingMoments: true,
//   });

//   const handleFilterChange = (columnName) => {
//     setFilters((prevFilters) => ({
//       ...prevFilters,
//       [columnName]: !prevFilters[columnName],
//     }));
//   };

//   useEffect(() => {
//     onFilterChange(filters);
//   }, [filters, onFilterChange]);

//   return (
//     <div className="flex space-x-4  border border-black border-solid p-4 rounded-lg shadow-lg bg-[#bbbdb7]" style={{ width: '360px', height: '350px', position: 'relative', bottom: '200px' }}>
//       <table className="table-auto border border-collapse min-w-min" style={{ width: '300px', position: 'relative', left: '10px' }}>
//         <thead>
//           <tr style={{ position: 'relative', right: '50px' }}>
//             <th className="px-4 py-2 border-b" >
//               <label className="inline-flex items-center" style={{ position: 'relative', right: '45px' }}>
//                 <input
//                   type="checkbox"
//                   className="form-checkbox h-5 w-5 text-blue-600"
//                   checked={filters.tension}
//                   onChange={() => handleFilterChange('tension')}
//                 />
//                 <span className="ml-2">Tension</span>
//               </label>
//             </th>
//           </tr>
//           <tr style={{ position: 'relative', right: '50px' }}>
//             <th className="px-4 py-2 border-b">
//               <label className="inline-flex items-center" style={{ position: 'relative', right: '45px' }}>
//                 <input
//                   type="checkbox"
//                   className="form-checkbox h-5 w-5 text-blue-600"
//                   checked={filters.torsion}
//                   onChange={() => handleFilterChange('torsion')}
//                 />
//                 <span className="ml-2">Torsion</span>
//               </label>
//             </th>
//           </tr>

//           <tr style={{ position: 'relative', right: '50px' }}>
//             <th className="px-4 py-2 border-b">
//               <label className="inline-flex items-center">
//                 <input
//                   type="checkbox"
//                   className="form-checkbox h-5 w-5 text-blue-600"
//                   checked={filters.bendingMomentY}
//                   onChange={() => handleFilterChange('bendingMomentY')}
//                 />
//                 <span className="ml-2">Bending Moment Y</span>
//               </label>
//             </th>
//           </tr>
//           <tr style={{ position: 'relative', right: '10px' }}>
//             <th className="px-4 py-2 border-b">
//               <label className="inline-flex items-center" style={{ position: 'relative', right: '45px' }}>
//                 <input
//                   type="checkbox"
//                   className="form-checkbox h-5 w-5 text-blue-600"
//                   checked={filters.combinedSquaredBendingMoments}
//                   onChange={() => handleFilterChange('combinedSquaredBendingMoments')}
//                 />
//                 <span className="ml-2">Bending Moments</span>
//               </label>
//             </th>
//           </tr>
//           <tr style={{ position: 'relative', right: '50px' }}>
//             <th className="px-4 py-2 border-b">
//               <label className="inline-flex items-center">
//                 <input
//                   type="checkbox"
//                   className="form-checkbox h-5 w-5 text-blue-600"
//                   checked={filters.bendingMomentX}
//                   onChange={() => handleFilterChange('bendingMomentX')}
//                 />
//                 <span className="ml-2">Bending Moment X</span>
//               </label>
//             </th>
//           </tr>

//           <tr style={{ position: 'relative', right: '50px' }}>
//             <th className="px-4 py-2 border-b">
//               <label className="inline-flex items-center" style={{ position: 'relative', right: '25px' }}>
//                 <input
//                   type="checkbox"
//                   className="form-checkbox h-5 w-5 text-blue-600"
//                   checked={filters.temperature}
//                   onChange={() => handleFilterChange('temperature')}
//                 />
//                 <span className="ml-2">Temperature</span>
//               </label>
//             </th>
//           </tr>
//         </thead>
//       </table>
//     </div>
//   );
// };

// export default FilterComponent;



import React, { useState, useEffect } from 'react';

const FilterComponent = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    tension: true,
    torsion: true,
    bendingMomentY: true,
    bendingMomentX: true,
    temperature: true,
    combinedSquaredBendingMoments: true,
  });

  const handleFilterChange = (columnName) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [columnName]: !prevFilters[columnName],
    }));
  };

  useEffect(() => {
    onFilterChange(filters);
  }, [filters, onFilterChange]);

  return (
    <div className="flex space-x-4  p-4 rounded-lg shadow-lg " style={{ width: '100%', maxWidth: '310px', height: 'auto', minHeight: '310px', position: 'relative', bottom: '110px',boxShadow: '0 6px 8px rgba(0, 0, 0, 0.15), 0 3px 6px rgba(0, 0, 0, 0.1)',  }}>
      <table className="table-auto border border-collapse" style={{ width: '100%', maxWidth: '310px', position: 'relative', left: '0px', }}>
        <thead>
          <tr style={{ position: 'relative', right: '50px' }}>
            <th className="px-4 py-2 border-b" >
              <label className="inline-flex items-center" style={{ position: 'relative', right: '45px' }}>
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-4 text-blue-600"
                  checked={filters.tension}
                  onChange={() => handleFilterChange('tension')}
                />
                <span className="ml-2">Tension</span>
              </label>
            </th>
          </tr>
          <tr style={{ position: 'relative', right: '50px' }}>
            <th className="px-4 py-2 border-b">
              <label className="inline-flex items-center" style={{ position: 'relative', right: '45px' }}>
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-4 text-blue-600"
                  checked={filters.torsion}
                  onChange={() => handleFilterChange('torsion')}
                />
                <span className="ml-2">Torsion</span>
              </label>
            </th>
          </tr>
          <tr style={{ position: 'relative', right: '50px' }}>
            <th className="px-4 py-2 border-b">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-4 text-blue-600"
                  checked={filters.bendingMomentY}
                  onChange={() => handleFilterChange('bendingMomentY')}
                />
                <span className="ml-2">Bending Moment Y</span>
              </label>
            </th>
          </tr>
          <tr style={{ position: 'relative', right: '10px' }}>
            <th className="px-4 py-2 border-b">
              <label className="inline-flex items-center" style={{ position: 'relative', right: '45px' }}>
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-4 text-blue-600"
                  checked={filters.combinedSquaredBendingMoments}
                  onChange={() => handleFilterChange('combinedSquaredBendingMoments')}
                />
                <span className="ml-2">Bending Moments</span>
              </label>
            </th>
          </tr>
          <tr style={{ position: 'relative', right: '50px' }}>
            <th className="px-4 py-2 border-b">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-4 text-blue-600"
                  checked={filters.bendingMomentX}
                  onChange={() => handleFilterChange('bendingMomentX')}
                />
                <span className="ml-2">Bending Moment X</span>
              </label>
            </th>
          </tr>
          <tr style={{ position: 'relative', right: '50px' }}>
            <th className="px-4 py-2 border-b">
              <label className="inline-flex items-center" style={{ position: 'relative', right: '25px' }}>
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-4 text-blue-600"
                  checked={filters.temperature}
                  onChange={() => handleFilterChange('temperature')}
                />
                <span className="ml-2">Temperature</span>
              </label>
            </th>
          </tr>
        </thead>
      </table>
    </div>
  );
};

export default FilterComponent;