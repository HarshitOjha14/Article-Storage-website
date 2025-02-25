import React, { useState } from 'react';

const ArticleList = () => {
  const departments = {
    CSE: ["Ak Sir", "Susham Sir", "Gargi Mam"],
    IT: ["YK Sir", "Susham Sir", "Gargi Mam"],
    CSD: ["LK Sir", "Susham Sir", "Gargi Mam"],
    PETRO: ["CK Sir", "Suresham Sir", "Gargi Mam"],
    CHEMICAL: ["KKK Sir", "Susham Sir", "Nargi Mam"],
  };

  // State for selected department and faculty
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedFaculty, setSelectedFaculty] = useState('');

  // Handle department change
  const handleDepartmentChange = (e) => {
    const department = e.target.value;
    setSelectedDepartment(department);
    setSelectedFaculty(''); // Reset faculty when department changes
  };

  // Render the department and faculty dropdowns
  return (
    <div className="max-w-md mx-auto mt-10 p-5 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-5 text-center">Select Department and Faculty</h1>

      {/* Department Dropdown */}
      <div className="mb-4">
        <label htmlFor="department" className="block text-lg font-medium mb-2">Department</label>
        <select
          id="department"
          value={selectedDepartment}
          onChange={handleDepartmentChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Department</option>
          {Object.keys(departments).map((department) => (
            <option key={department} value={department}>
              {department}
            </option>
          ))}
        </select>
      </div>

      {/* Faculty Dropdown */}
      {selectedDepartment && (
        <div className="mb-4">
          <label htmlFor="faculty" className="block text-lg font-medium mb-2">Faculty</label>
          <select
            id="faculty"
            value={selectedFaculty}
            onChange={(e) => setSelectedFaculty(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Faculty</option>
            {departments[selectedDepartment]?.map((faculty, index) => (
              <option key={index} value={faculty}>
                {faculty}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Display selected values */}
      <div className="mt-5">
        {selectedDepartment && selectedFaculty && (
          <p className="text-lg text-center">
            You selected <span className="font-bold">{selectedFaculty}</span> from{' '}
            <span className="font-bold">{selectedDepartment}</span> department.
          </p>
        )}
      </div>
    </div>
  );
};

export default ArticleList;
