import React, { useState } from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCalendarAlt, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import Popup from './ViewPopup';
import { Button } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AddApplicatioPopup from './AddApplicationPopup';


interface BuildingApplication {
  no: number;
  buildingPermitNo: string;
  applicantName: string;
  projectName: string;
  status: string;
  remarks: string;
}

const BuildingApplicationListComponent: React.FC = () => {
  const [openStates, setOpenStates] = useState<Record<number, boolean>>({});
  const [open, setOpen] = useState(false);
  const [sortBy, setSortBy] = useState('');
  const [searchText, setSearchText] = useState('');


  const handleOpen = (no: number) => {
    setOpenStates((prevOpenStates) => ({
      ...prevOpenStates,
      [no]: true,
    }));
  };
    const handleClose = (no: number) => {
    setOpenStates((prevOpenStates) => ({
      ...prevOpenStates,
      [no]: false,
    }));
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickClose = () => {
    setOpen(false);
  };

  const buildingApplications: BuildingApplication[] = [
    {
      no: 1,
      buildingPermitNo: '123456789',
      applicantName: 'Jo March',
      projectName: 'My House',
      status: 'Pending',
      remarks: 'Printed'
    },
    {
      no: 2,
      buildingPermitNo: '987654321',
      applicantName: 'Joe Mama',
      projectName: 'My Apartment',
      status: 'Approved',
      remarks: 'Not Printed'
    },
    {
      no: 3,
      buildingPermitNo: '567891234',
      applicantName: 'Laurrie',
      projectName: 'Commercial Building',
      status: 'Disapproved',
      remarks: 'Printed'
    },
    {
      no: 4,
      buildingPermitNo: '21451512',
      applicantName: 'Jamie',
      projectName: 'Residential',
      status: 'Pending',
      remarks: 'Printed'
    }
  ];

  const [selectedAction, setSelectedAction] = useState<Record<number, string>>({});

  const handleActionChange = (event: React.ChangeEvent<HTMLSelectElement>, no: number) => {
    const value = event.target.value;
    setSelectedAction((prevSelectedAction) => ({
      ...prevSelectedAction,
      [no]: value
    }));
  };

  const handleNext = (value: number) => {
    const selectedValue = selectedAction[value];
    if (selectedValue === 'View') {
      handleOpen(value);
    }

    // Perform logic for the "Next" button click here
  };

  const handleSearch = () => {
    // Perform search logic here based on the searchText value
    // For example, you can filter the buildingApplications array based on the searchText
  };

  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  const handleSearchInputKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="app-container">
      <div className="header">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search"
            value={searchText}
            onChange={handleSearchInputChange}
            onKeyPress={handleSearchInputKeyPress}
          />
          <FontAwesomeIcon icon={faSearch} className="search-icon" onClick={handleSearch} />
        </div>
        <div className="title-container">
          <h1 className="title">Building Application List</h1>
        </div>
        <div className="sort-container">
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="">Sort By</option>
            <option value="Pending Records">Pending Records</option>
            <option value="Completed Records">Completed Records</option>
          </select>
          <div className="date-input-container">
            <Button variant="outlined" startIcon={<AddCircleOutlineIcon/>}
            onClick={handleClickOpen}
            disableElevation 
            sx={{
              color:'lightgrey',
              outlineColor: 'lightgrey',
              borderWidth:'3px',
              borderColor: 'lightgray',
            }}
              >Add Application</Button>
          </div>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>No.</th>
            <th>Building Permit #</th>
            <th>Applicant's Name</th>
            <th>Project Name</th>
            <th>Status</th>
            <th>Remarks</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {buildingApplications
            .filter((application) => {
              if (sortBy === 'Pending Records') {
                return application.status === 'Pending';
              } else if (sortBy === 'Completed Records') {
                return application.status === 'Approved' || application.status === 'Disapproved';
              } else {
                return true; // Show all records if no sortBy value is selected
              }
            })
            .filter((application) => {
              // Filter based on the searchText value
              if (searchText === '') {
                return true; // Show all records if no search text is entered
              } else {
                // Filter based on the buildingPermitNo or applicantName containing the searchText
                return (
                  application.buildingPermitNo.toLowerCase().includes(searchText.toLowerCase()) ||
                  application.applicantName.toLowerCase().includes(searchText.toLowerCase())
                );
              }
            })
            .map((application) => (
              <tr key={application.no}>
                <td>{application.no}</td>
                <td>{application.buildingPermitNo}</td>
                <td>{application.applicantName}</td>
                <td>{application.projectName}</td>
                <td>{application.status}</td>
                <td>{application.remarks}</td>
                <td>
                  <select
                    value={selectedAction[application.no] || ''}
                    onChange={(event) => handleActionChange(event, application.no)}
                  >
                    <option value="">Select Action</option>
                    <option value="View">View</option>
                    <option value="Update">Update</option>
                    <option value="Print">Print</option>
                    <option value="Delete">Delete</option>
                  </select>
                  <button className="next-button" onClick={() => handleNext(application.no)}>
                    <FontAwesomeIcon icon={faChevronRight} />
                  </button>
                  <Popup
                    no={application.no} 
                    buildingPermitNo={application.buildingPermitNo}
                    applicantName={application.applicantName}
                    projectName={application.projectName}
                    open={openStates[application.no]}
                    handleClose={() =>handleClose(application.no)}
                  />
                  <AddApplicatioPopup open = {open} handleClose={handleClickClose}/>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default BuildingApplicationListComponent;