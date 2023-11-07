import React, { useState, useRef, useEffect, useCallback } from 'react';
import Button from '@mui/material/Button';
import '../ClerkCSS.css';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CancelIcon from '@mui/icons-material/Cancel';
import IconButton from '@mui/material/IconButton';
import { Card, CardContent, DialogTitle, Grid, MenuItem, OutlinedInput, Select, SelectChangeEvent, Stack, TextField } from '@mui/material';
import axios from 'axios';
import DefectPopup from './DefectPopup';


const cardStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  maxWidth: 800,
  backgroundColor: 'lightgrey',
  paddingLeft: 20,
}; //Style Purposes



export interface formdetails {
  bpid: number;
  form: string;
  activity: string;
  business_no: string;
  permitee: string;
  business_name: string;
  address: string;
  natureofbusiness: string;
  typeofoccupancy: string;
  contactno: string;
  email: string;
  datereceived: string;
  inspection_no: number;
  inspectiondate: string;
  ntc_no: number;
  ntc_date: string;
  ntcv_no:number;
  ntcv_date:string;
  teamleader: string;
  fireinspectors: string[];
  open: boolean;
  defects: string[][];
  remarks: string;
  receivedby: string;
  receiveddate: string;
  handleClose: () => void;
}

interface DefectData {
  defects: string;
  period: string;
}

export default function ViewUpdateNTCVPopup(props: formdetails) {

  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedCons, setSelectedCons] = useState<boolean>(false)
  const [data, setData] = useState<DefectData[]>(props.defects ? props.defects.map(([defects, period]) => ({ defects, period })) : []);
  const [arrayList, setArrayList] = useState<string[][]>([]);
  const [openAddDefect, setOpenAddDefect] = useState(false);

  const BusinessNoRef = useRef<HTMLInputElement | null>(null);//Handles input for textfield
  const PermiteeRef = useRef<HTMLInputElement | null>(null);//Handles input for textfield
  const BusinessnameRef = useRef<HTMLInputElement | null>(null);//Handles input for textfield
  const AddressRef = useRef<HTMLInputElement | null>(null);//Handles input for textfield
  const NatureBusinessRef = useRef<HTMLInputElement | null>(null);//Handles input for textfield
  const ContactnoRef = useRef<HTMLInputElement | null>(null);//Handles input for textfield
  const typeofoccupancyRef = useRef<HTMLInputElement | null>(null);//Handles input for textfield
  const EmailRef = useRef<HTMLInputElement | null>(null);//Handles input for textfield
  const DateRecievedRef = useRef<HTMLInputElement | null>(null);//Handles input for textfield
  const [selectedRemarks, setselectedRemarks] = useState(props?.remarks ||'');//handles dropboxfield
  const dateInspectionRef = useRef<HTMLInputElement | null>(null);//Handles input for textfield
  const inspectOrderRef = useRef<HTMLInputElement | null>(null);//Handles input for textfield
  const NTCRef = useRef<HTMLInputElement | null>(null);//Handles input for textfield
  const NTCDateRef = useRef<HTMLInputElement | null>(null);//Handles input for textfield
  const NTCVRef = useRef<HTMLInputElement | null>(null);//Handles input for textfield
  const NTCVDateRef = useRef<HTMLInputElement | null>(null);//Handles input for textfield
  const AmountRef = useRef<HTMLInputElement | null>(null);//Handles input for textfield
  const OrNoRef = useRef<HTMLInputElement | null>(null);//Handles input for textfield
  const dateRef = useRef<HTMLInputElement | null>(null);//Handles input for textfield
  const teamLeaderRef = useRef<HTMLInputElement | null>(null);//Handles input for textfield
  const ReceivedByRef = useRef<HTMLInputElement | null>(null);//Handles input for textfield
  const ReceivedDateRef = useRef<HTMLInputElement | null>(null);//Handles input for textfield
  const [inputInspector, setInputInspector] = useState<string>(props.fireinspectors?.join('\n') || ''); // State to store the input value as a single string
  const [inputInspectorArray, setinputInspectorArray] = useState<string[]>(["test", "test2"]); // State to store the input values as an array
  const [render, setRender] = useState<boolean>(true); // Triggers the UseEffect

  //opens add defect pop up
  const openDialog = () => {
    setOpenAddDefect(true);
  };

  const handleRemarks = (event: SelectChangeEvent<string>) => {
    setselectedRemarks(event.target.value); // Update the state variable with the new selected value
  };

  useEffect(() => {
    // Convert data to an array of arrays
    setArrayList(data.map(item => [item.defects, item.period]));
  }, [data]);

  //closes add defect pop up
  const closeDialog = () => {
    setOpenAddDefect(false);
  };

  const addDefect = (defect: string, period: string) => {
    const newData: DefectData = { defects: defect, period: period };
    setData([...data, newData]);
    console.log(data)
  };


  const handleCons = (event: SelectChangeEvent<boolean>) => {
    setSelectedCons(event.target.value as boolean);
    console.log(selectedCons)
  };

  // Function to handle input changes
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputInspector(event.target.value);
  };

  // Function to split the input value into an array of strings based on newline characters
  const updateInputArray = useCallback(() => {
    const newArray = inputInspector.split('\n').filter((line) => line.trim() !== '');
    setinputInspectorArray(newArray);
  }, [inputInspector]);

  useEffect(() => {
    updateInputArray();
  }, [render, updateInputArray]);

  const handleRender = () => {
    setRender(prevRender => !prevRender);
  };

  //Removes Item From defects
  const removeItem = (indexToRemove: number) => {
    // Create a copy of the current data array
    const updatedData = [...data];
    // Remove the item at the specified index
    updatedData.splice(indexToRemove, 1);
    // Update the data state with the modified array
    setData(updatedData);
  };


  // uploads data to db
  const evaluateNTCV = async () => {
    let new_url = '';
    if (props.form === 'New') {
      new_url = 'http://localhost:8080/newbpnoticecorrectviolation/updateNewbpCorrectViolation?id=';
    }
    else if (props.form === 'Renewal') {
      new_url = 'http://localhost:8080/renewalbpnoticetocorrectviolation/updateRenewalbpNTCV?id='
    }
    axios.put(new_url+props.bpid,
      {
        bspermit_no: BusinessNoRef.current?.value,
        permittee: PermiteeRef.current?.value,
        business_name: BusinessnameRef.current?.value,
        address: AddressRef.current?.value,
        nature_business: NatureBusinessRef.current?.value,
        type_occupancy: typeofoccupancyRef.current?.value,
        contact_no: ContactnoRef.current?.value,
        email: EmailRef.current?.value,
        date_received: DateRecievedRef.current?.value,
        date_inspected: dateInspectionRef.current?.value,
        inspection_no: inspectOrderRef.current?.value,
        ntc_no: NTCRef.current?.value,
        ntc_date: NTCDateRef.current?.value,
        ntcv_no: NTCVRef.current?.value,
        ntcv_date: NTCVDateRef.current?.value,
        remarks: selectedRemarks,
        team_leader: teamLeaderRef.current?.value,
        fire_inspectors: inputInspectorArray,
        defects: arrayList,
        name: ReceivedByRef.current?.value,
        date: ReceivedDateRef.current?.value
      }
    ).then(res => {
      console.log(res.data);
      alert("Update Successful!");;
      props.handleClose();
    }).catch(err => console.log(err))
  }

  // Sets the values of the array and uploads data to db
  const addEvaluation = () => {
    if (props.activity !=='Update'){
      props.handleClose();
    }
    else{
      handleRender();
      evaluateNTCV();
    }
  }

  return (
    <div>
      <Dialog open={props.open}
        maxWidth="md"
        fullWidth
        PaperProps={{ style: { backgroundColor: 'lightgrey' } }}
        sx={{ '& .MuiDialog-paper': { overflowY: 'auto' } }}>
        <DialogTitle sx={{ height: '0px' }}>
          <IconButton sx={{ marginTop: '-25px', marginLeft: '-25px' }} onClick={props.handleClose}>
            <CancelIcon sx={{ color: 'red' }} />
          </IconButton>
        </DialogTitle>
        <DialogContent style={{
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <>
            <Card style={cardStyle}>
              <CardContent style={{ marginLeft: 35, textAlign: 'center' }} >
                <Grid container marginTop={'1rem'} style={{ height: '100%' }}>
                  <Grid item xs={10} sm={11}>
                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                      <p className='custom-paragraph' >Business Permit Number</p>
                      <TextField fullWidth className='custom-outlined-input' sx={{ borderRadius: '11px' }} defaultValue={props.business_no} inputRef={BusinessNoRef} variant='standard' disabled={props.activity !== 'Update'} />
                    </Stack>
                  </Grid>
                  <Grid item xs={10} sm={11}>
                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                      <p className='custom-paragraph'>Name of Owner/Permitee</p>
                      <TextField fullWidth className='custom-outlined-input' sx={{ borderRadius: '11px' }} defaultValue={props.permitee} inputRef={PermiteeRef} variant='standard' disabled={props.activity !== 'Update'} />
                    </Stack>
                  </Grid>
                  <Grid item xs={10} sm={11}>
                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                      <p className='custom-paragraph' >Business Name</p>
                      <TextField fullWidth className='custom-outlined-input' sx={{ borderRadius: '11px' }} defaultValue={props.business_name} inputRef={BusinessnameRef} variant='standard' disabled={props.activity !== 'Update'} />
                    </Stack>
                  </Grid>
                  <Grid item xs={10} sm={11}>
                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                      <p className='custom-paragraph' >Address</p>
                      <TextField fullWidth className='custom-outlined-input' sx={{ borderRadius: '11px' }} defaultValue={props.address} inputRef={AddressRef} variant='standard' disabled={props.activity !== 'Update'} />
                    </Stack>
                  </Grid>
                  <Grid item xs={10} sm={6}>
                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                      <p className='custom-paragraph'>Nature of Business</p>
                      <TextField className='custom-outlined-input' sx={{ borderRadius: '11px', width: "330px" }} defaultValue={props.natureofbusiness} inputRef={NatureBusinessRef} variant='standard' disabled={props.activity !== 'Update'} />
                    </Stack>
                  </Grid>
                  <Grid item xs={10} sm={5}>
                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                      <p className='custom-paragraph' >Type of Occupancy</p>
                      <TextField fullWidth className='custom-outlined-input' sx={{ borderRadius: '11px' }} defaultValue={props.typeofoccupancy}  inputRef={typeofoccupancyRef} variant='standard' disabled={props.activity !== 'Update'} />
                    </Stack>
                  </Grid>
                  <Grid item xs={10} sm={6}>
                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                      <p className='custom-paragraph' >Contact Number</p>
                      <TextField className='custom-outlined-input' sx={{ borderRadius: '11px', width: "330px" }} defaultValue={props.contactno} inputRef={ContactnoRef} variant='standard' disabled={props.activity !== 'Update'} />
                    </Stack>
                  </Grid>
                  <Grid item xs={10} sm={6}>
                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                      <p className='custom-paragraph'>Email</p>
                      <TextField className='custom-outlined-input' sx={{ borderRadius: '11px', width: "305px" }} defaultValue={props.email} inputRef={EmailRef} variant='standard' disabled={props.activity !== 'Update'} />
                    </Stack>
                  </Grid>
                  <Grid item xs={10} sm={11}>
                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                      <p className='custom-paragraph' style={{ paddingTop: '20px' }}>Date Received</p>
                      <TextField fullWidth className='custom-outlined-input' sx={{ borderRadius: '11px' }} defaultValue={props.datereceived ? new Date(props.datereceived).toISOString().split('T')[0] : ''} inputRef={DateRecievedRef} variant='standard' disabled={props.activity !== 'Update'} />
                    </Stack>
                  </Grid>
                  <Grid item xs={10} sm={6}>
                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                      <p className='custom-paragraph' style={{ paddingTop: '20px' }} >Inspection Order Number</p>
                      <OutlinedInput className='custom-outlined-input' sx={{ borderRadius: '11px', width: "330px" }} inputRef={inspectOrderRef} disabled={props.activity !== 'Update'} defaultValue={props.inspection_no}/>
                    </Stack>
                  </Grid>
                  <Grid item xs={10} sm={6}>
                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                      <p className='custom-paragraph' style={{ paddingTop: '20px' }}>Date of Inspection</p>
                      <OutlinedInput className='custom-outlined-input' sx={{ borderRadius: '11px', width: "305px" }} inputRef={dateInspectionRef} disabled={props.activity !== 'Update'} defaultValue={props.inspectiondate ? new Date(props.inspectiondate).toISOString().split('T')[0] : ''}/>
                    </Stack>
                  </Grid>
                  <Grid item xs={10} sm={6}>
                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                      <p className='custom-paragraph' >NTC Number</p>
                      <OutlinedInput className='custom-outlined-input' sx={{ borderRadius: '11px', width: "330px" }} defaultValue={props.ntc_no} inputRef={NTCRef} disabled={props.activity !== 'Update'} />
                    </Stack>
                  </Grid>
                  <Grid item xs={10} sm={6}>
                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                      <p className='custom-paragraph'  >NTC Date</p>
                      <OutlinedInput className='custom-outlined-input' sx={{ borderRadius: '11px', width: "305px" }} defaultValue={props.ntc_date ? new Date(props.ntc_date).toISOString().split('T')[0] : ''} inputRef={NTCDateRef} disabled={props.activity !== 'Update'} />
                    </Stack>
                  </Grid>
                  <Grid item xs={10} sm={6}>
                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                      <p className='custom-paragraph' >NTCV Number</p>
                      <OutlinedInput className='custom-outlined-input' sx={{ borderRadius: '11px', width: "330px" }} defaultValue={props.ntcv_no} inputRef={NTCVRef} disabled={props.activity !== 'Update'} />
                    </Stack>
                  </Grid>
                  <Grid item xs={10} sm={6}>
                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                      <p className='custom-paragraph'  >NTCV Date</p>
                      <OutlinedInput className='custom-outlined-input' sx={{ borderRadius: '11px', width: "305px" }} defaultValue={props.ntcv_date ? new Date(props.ntcv_date).toISOString().split('T')[0] : ''} inputRef={NTCVDateRef} disabled={props.activity !== 'Update'} />
                    </Stack>
                  </Grid>
                  <Grid item xs={10} sm={11}>
                    <Stack spacing={-1} sx={{ alignItems: 'center', paddingTop: '20px' }}>
                      <h2 className='custom-paragraph' style={{ paddingTop: '20px' }}>Fire Safety Inspectors</h2>
                    </Stack>
                  </Grid>
                  <Grid item xs={10} sm={11}>
                    <Stack spacing={3} direction={'row'} sx={{ alignItems: 'flex-start' }}>
                      <h3 className='custom-paragraph' style={{ marginTop: 0 }}>Team Leader</h3>
                      <OutlinedInput className='custom-outlined-input' sx={{ borderRadius: '11px', width: "500px" }} inputRef={teamLeaderRef} disabled={props.activity !== 'Update'} defaultValue={props.teamleader} />
                    </Stack>
                  </Grid>
                  <Grid item xs={10} sm={11}>
                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                      <p className='custom-paragraph' >FSI</p>
                      <OutlinedInput fullWidth className='custom-outlined-input-multiline'
                        sx={{
                          borderRadius: '11px',
                          height: '100px',
                          paddingTop: '0',
                          '& textarea': {
                            paddingTop: '20px', // Adjust the value as needed
                          },
                        }//
                        }
                        value={inputInspector}
                        onChange={handleInputChange}
                        multiline
                        disabled={props.activity !== 'Update'}
                        placeholder={`F03 John Doe\nType in the name then press enter to move next line`}
                        rows={2}
                      />
                    </Stack>
                  </Grid>
                  <Grid item xs={10} sm={11}>
                    <table>
                      <thead style={{ textAlign: "center" }}>
                        <tr>
                          <th style={{ textAlign: "center" }}>Defects</th>
                          <th style={{ textAlign: "center" }}>Grace Period</th>
                          <th style={{ width: "20px" }}></th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.map((item, index) => (
                          <tr key={index}>
                            <td style={{ textAlign: "center" }}>{item.defects}</td>
                            <td style={{ textAlign: "center" }}>{item.period}</td>
                            <th><Button variant='contained' sx={{ marginTop: '10px', backgroundColor: 'blue', borderRadius: '13px', height: '30px' }} onClick={() => removeItem(index)} disabled={props.activity !== 'Update'}>
                              Remove
                            </Button></th>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <DefectPopup open={openAddDefect} onClose={closeDialog} onAdd={addDefect} />
                    <Button variant='contained' sx={{ marginTop: '10px', backgroundColor: 'blue', borderRadius: '13px', height: '30px' }} onClick={openDialog} disabled={props.activity !== 'Update'}>
                      Add Defect
                    </Button>
                  </Grid>
                  <Grid item xs={10} sm={6}>
                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                      <p className='custom-paragraph' style={{ paddingTop: '20px' }}>Received By</p>
                      <OutlinedInput className='custom-outlined-input' sx={{ borderRadius: '11px', width: "330px" }} defaultValue={props.receivedby} inputRef={ReceivedByRef} disabled={props.activity !== 'Update'} />
                    </Stack>
                  </Grid>
                  <Grid item xs={10} sm={5}>
                    <Stack spacing={-1} sx={{ alignItems: 'flex-start', marginTop: '18px' }}>
                      <p className='custom-paragraph' >Status after Grace Period</p>
                      <Select
                        sx={{ height: '30px', width: '300px', borderRadius: '14px', borderWidth: '20px' }}
                        value={selectedRemarks}
                        onChange={handleRemarks}
                        disabled={props.activity !== 'Update'}
                      >
                        <MenuItem value="Complied">Complied</MenuItem>
                        <MenuItem value="For Issuance Abatement">For Issuance Abatement</MenuItem>
                        <MenuItem value="Issued Abatement">Issued Abatement</MenuItem>
                      </Select>
                    </Stack>
                  </Grid>
                  <Grid item xs={10} sm={6}>
                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                      <p className='custom-paragraph' >Received Date</p>
                      <OutlinedInput className='custom-outlined-input' sx={{ borderRadius: '11px', width: "330px" }} defaultValue={props.receiveddate ? new Date(props.receiveddate).toISOString().split('T')[0] : ''} inputRef={ReceivedDateRef} disabled={props.activity !== 'Update'} />
                    </Stack>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </>
        </DialogContent>
        <DialogActions style={{ justifyContent: 'center' }}>
          <Button variant='contained' sx={{ backgroundColor: 'grey', borderRadius: '13px', height: '30px' }} onClick={addEvaluation}>
            {props.activity !== 'Update' ? 'Close Form' : 'Update Form'}
          </Button>
        </DialogActions>
      </Dialog>

    </div>
  );
};
