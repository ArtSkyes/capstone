import React, { useEffect, useState } from 'react';
import Navbar from './Navbar'
import './BusinessList.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Button, IconButton } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import ViewOccupancyPopup from '../FSESClerk/Disapproved_Occupancy/ViewOccupancyPopup';
import UpdateOccupancyPopup from '../FSESClerk/Disapproved_Occupancy/UpdateOccupancyPopup';
import EvaluateDisapprovedOccupancy from '../FSESClerk/Disapproved_Occupancy/EvaluateDisapprovedOccupancy';
import EvaluateApprovedOccupancy from '../FSESClerk/EvaluateApprovedOccupancy';
import ViewPendingOccupancyList from '../FSESClerk/Pending_Occupancy/ViewPendingOccupancyPopup';
import UpdatePendingOccupancyPopup from '../FSESClerk/Pending_Occupancy/UpdatePendingOccupancyPopup';
import DeleteEncoderPopup from './DeleteEncoderPopup';
import PrintEncoderPopup from './PrintEncoderPopup';

//Header Part
const AdditionalTab: React.FC = () => {

    return (
        <div className="additional-tab">
            <img src="/images/redfirefighter.jpg" alt="Background IMG" className="background-image" />
            <div className="content">
                <img src="/images/DILG_logo.png" alt="DILG" className="logo" />
                <div className="text">
                    <p>Bureau of Fire Protection</p>
                    <p>Region VII</p>
                    <p>(District/Provincial Office)</p>
                    <p>(Station)</p>
                </div>
                <img src="/images/BFP_logo.png" alt="BFP" className="logo" />
            </div>
        </div>
    );
};


const OccupancyListApproved: React.FC = () => {
    const [searchText, setSearchText] = useState('');
    const [sortBy, setSortBy] = useState('');
    const [open, setOpen] = useState(false);
    const [selectedAction, setSelectedAction] = useState<Record<number, string>>({});
    const [openDisOccupancy, setopenDisOccupancy] = useState<Record<number, boolean>>({});
    const [openViewOccupancy, setopenViewOccupancy] = useState<Record<number, boolean>>({});
    const [openUpdateOccupancy, setopenUpdateOccupancy] = useState<Record<number, boolean>>({});
    const [openEvalOccupancy, setopenEvalOccupancy] = useState<Record<number, boolean>>({});
    const [deleteit, setDelete] = useState(false);
    const [print, setPrint] = useState(false);
    const [test, setTest] = useState<boolean>(false);


    const [applicationform, SetApplicationForm] = useState([{
        id: 0,
        control_no: 20,
        buildingpermitno: '20-2',
        applicant_name: 'Default',
        project_name: 'Default',
        location: '',
        contact_no: '',
        date_received: '',
        team_leader: '',
        fireInspectors: [],
        inspection_no: 0,
        date_inspection: '',
        received_name: '',
        receivedoccu_date: '',
        remarks: "Pending",
        nod_no: 0,
        fsic_no: 0
    }])

    const handleRender = () => {
        setTest(prevTest => !prevTest);
    };
    //Evaluate Popup Open
    const handleOpenDisOccupancy = (no: number) => {
        setopenDisOccupancy((prevOccu) => ({
            ...prevOccu,
            [no]: true,
        }));
    };

    //Evaluate Popup Close
    const handleCloseDisOccupancy = (no: number) => {
        setopenDisOccupancy((prevOccu) => ({
            ...prevOccu,
            [no]: false,
        }));
    };

    //Evaluate Popup 
    const handleOpenEval = (no: number) => {
        setopenEvalOccupancy((prevOpenEval) => ({
            ...prevOpenEval,
            [no]: true,
        }));
    };

    //Evaluate Popup
    const handleCloseEval = (no: number) => {
        setopenEvalOccupancy((prevOpenEval) => ({
            ...prevOpenEval,
            [no]: false,
        }));
    };

    //VIEW Popup
    const handleOpenView = (no: number) => {
        setopenViewOccupancy((prevOpenView) => ({
            ...prevOpenView,
            [no]: true,
        }));
    };

    //View Popup Close
    const handleCloseView = (no: number) => {
        setopenViewOccupancy((prevOpenView) => ({
            ...prevOpenView,
            [no]: false,
        }));
    };

    //Update Popup 
    const handleOpenUpdate = (no: number) => {
        setopenUpdateOccupancy((prevOpenUpdate) => ({
            ...prevOpenUpdate,
            [no]: true,
        }));
    };

    //Update Popup
    const handleCloseUpdate = (no: number) => {
        setopenUpdateOccupancy((prevOpenUpdate) => ({
            ...prevOpenUpdate,
            [no]: false,
        }));
    };

    // Print Popup 
    const handlePrintOpen = () => {
        setPrint(true);
    };
    // Print Popup
    const handlePrintClose = () => {
        setPrint(false);
    };
    // Delete Popup
    const handleDeleteOpen = () => {
        setDelete(true);
    };
    // Delete Popup
    const handleDeleteClose = () => {
        setDelete(false);
        handleRender();
    };


    const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(event.target.value);
    };
    const handleSearch = () => {
        // Perform search logic here based on the searchText value
        // For example, you can filter the buildingApplications array based on the searchText
    };


    //Handles the selection of each Record, so that it doesnt change all the drop down option each change
    const handleActionChange = (event: React.ChangeEvent<HTMLSelectElement>, no: number) => {
        const value = event.target.value;
        setSelectedAction((prevSelectedAction) => ({
            ...prevSelectedAction,
            [no]: value
        }));
    };


    const handleSearchInputKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };
    const handleClickOpen = () => {
        setOpen(true);
    };

    //Handles the button Logic 
    const handleNext = (value: number, status: string, buildingno: string) => {
        const selectedValue = selectedAction[value];

        if (selectedValue === 'Delete') {
            // Perform delete logic here
            handleDeleteOpen();

        } else if (status === 'Pending') {
            //Pending function condition goes here
            if ((selectedValue === 'View') || (selectedValue === 'Update') ) {
                handleOpenView(value);

            }
            else if (selectedValue === 'Evaluate') {
                handleOpenEval(value);
            }
            else if (selectedValue === 'Print') {
                handlePrintOpen();

            }
        } else if (status === 'Approved' || status === 'Disapproved') {
            //Completed function condition goes here

        }
        else if (selectedValue === 'Update') {


        }
        else if (selectedValue === 'View') {

        }
        else if (selectedValue === 'Print') {
            handlePrintOpen();

        }
    }
    return (
        <>
            <AdditionalTab />
            <Navbar />
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
                        <h1 className="title">Occupancy Application List</h1>
                    </div>
                    <div className="sort-container">
                        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                            <option value="">Sort By</option>
                            <option value="Pending Records">Pending Records</option>
                            <option value="Approved Records">Approved Records</option>
                        </select>
                    </div>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Business Permit #</th>
                            <th>Owner's Name</th>
                            <th>Project Name</th>
                            <th>FSIC #</th>
                            <th>Remarks</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {applicationform
                            .filter((applicationform) => {
                                if (sortBy === 'Pending Records') {
                                    return applicationform.remarks === 'Pending';
                                } else if (sortBy === 'Approved Records') {
                                    return applicationform.remarks === 'Approved' || applicationform.remarks === 'Disapproved';
                                } else {
                                    return true;// Show all records if no sortBy value is selected
                                }
                            })
                            .filter((applicationform) => {
                                // Filter based on the searchText value
                                if (searchText === '') {
                                    return true; // Show all records if no search text is entered
                                } else {
                                    // Filter based on the businessPermitNo or ownerName containing the searchText
                                    return (
                                        applicationform.buildingpermitno.toLowerCase().includes(searchText.toLowerCase()) ||
                                        applicationform.applicant_name.toLowerCase().includes(searchText.toLowerCase())
                                    );
                                }
                            })
                            .map((applicationform) => (
                                <tr key={applicationform.id}>
                                    <td>{applicationform.id}</td>
                                    <td>{applicationform.buildingpermitno}</td>
                                    <td>{applicationform.applicant_name}</td>
                                    <td>{applicationform.project_name}</td>
                                    <td>{applicationform.fsic_no}</td>
                                    <td>{applicationform.remarks}</td>
                                    <td>
                                        <select
                                            value={selectedAction[applicationform.id] || ''}
                                            onChange={(event) => handleActionChange(event, applicationform.id)}
                                            style={{ height: '35px', width: '120px', borderRadius: '8px', textAlign: 'center', backgroundColor: '#D9D9D9' }}
                                        >
                                            <option value="">-select-</option>
                                            <option value="View">View</option>
                                            <option value="Update">Update</option>
                                            <option value="Evaluate">Evaluate</option>
                                            <option value="Print">Print</option>
                                            <option value="Delete">Delete</option>
                                        </select>
                                        <IconButton className="next-button" onClick={() => handleNext(applicationform.id, applicationform.remarks, applicationform.buildingpermitno)}>
                                            <ArrowCircleRightIcon sx={{ color: '#3C486B' }} />
                                        </IconButton>
                                        <ViewPendingOccupancyList
                                            id={applicationform.id}
                                            open={openViewOccupancy[applicationform.id]}
                                            handleClose={() => handleCloseView(applicationform.id)}
                                            activity={selectedAction[applicationform.id]}
                                            controlno={applicationform.control_no}
                                            buildingno={applicationform.buildingpermitno}
                                            applicantname={applicationform.applicant_name}
                                            projectname={applicationform.project_name}
                                            location={applicationform.location}
                                            contact_no={applicationform.contact_no}
                                            date_received={applicationform.date_received}
                                            team_leader={applicationform.team_leader}
                                            fireInspectors={applicationform.fireInspectors}
                                            inspection_no={applicationform.inspection_no}
                                            date_inspection={applicationform.date_inspection}
                                            received_name={applicationform.received_name}
                                            receivedoccu_date={applicationform.receivedoccu_date}
                                        />
                                        <UpdatePendingOccupancyPopup open={openUpdateOccupancy[applicationform.id]} handleClose={() => handleCloseUpdate(applicationform.id)} />
                                        <DeleteEncoderPopup
                                            open={deleteit}
                                            value={applicationform.id}
                                            remarks={applicationform.remarks}
                                            form="Occupancy"
                                            handleClose={() => handleDeleteClose()}
                                        />
                                        <PrintEncoderPopup
                                            open={print}
                                            handleClose={() => handlePrintClose()}
                                        />
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>

            </div>
        </>
    )
}

export default OccupancyListApproved