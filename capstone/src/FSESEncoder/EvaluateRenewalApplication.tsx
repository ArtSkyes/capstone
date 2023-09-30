import React, { useState, useRef } from 'react';
import Button from '@mui/material/Button';
import './BusinessList.css';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CancelIcon from '@mui/icons-material/Cancel';
import IconButton from '@mui/material/IconButton';
import { Card, CardContent, DialogTitle, Grid, MenuItem, OutlinedInput, Select, SelectChangeEvent, Stack, TextField } from '@mui/material';
import axios from 'axios';


const cardStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  maxWidth: 800,
  backgroundColor: 'lightgrey',
}; //Style Purposes



export interface formdetails {
  /*no: number;
  businessPermitNo: string;
  nameofpermitee: string;
  businessname: string;
  address: string;
  natureofbusines:string;
  typeofoccupancy: string;
  contactno: string;
  email:string;
  datereceived: string;*/
  open: boolean;
  handleClose: () => void;
}


export interface formdetails {
  open: boolean;
  handleClose: () => void;
}


export default function EvaluatePopup(props: formdetails) {


  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedCons, setSelectedCons] = useState<boolean>(false)
  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(event.target.value);
  };

  const buildingpermRef = useRef<HTMLInputElement | null>(null);
  const permiteeRef = useRef<HTMLInputElement | null>(null);
  const businessnameRef = useRef<HTMLInputElement | null>(null);
  const addressRef = useRef<HTMLInputElement | null>(null);
  const typeofoccupancyRef = useRef<HTMLInputElement | null>(null);
  const contactnoRef = useRef<HTMLInputElement | null>(null);
  const dateReceivedRef = useRef<HTMLInputElement | null>(null);
  const receivedbyRef = useRef<HTMLInputElement | null>(null);
  const EvaluatorRef = useRef<HTMLInputElement | null>(null);
  const NumberStoreyRef = useRef<HTMLInputElement | null>(null);
  const DefectsRef = useRef<HTMLInputElement | null>(null);


  const handleCons = (event: SelectChangeEvent<boolean>) => {
    setSelectedCons(event.target.value as boolean);
    console.log(selectedCons)
  };


  /*const updatePermit = async () => {
    axios.put('http://localhost:8080/BFP/updatePermit?id=' + props.no,
      {
        buildingpermitno: buildingpermRef.current?.value,
        namepermitee: permiteeRef.current?.value,
        businessname: businessnameRef.current?.value,
        address: addressRef.current?.value,
        typeofoccupancy: typeofoccupancyRef.current?.value,
        contactno: contactnoRef.current?.value,
        datereceived: dateReceivedRef.current?.value,
        receivedby: receivedbyRef.current?.value,
        evaluator: EvaluatorRef.current?.value,
        nostorey: NumberStoreyRef.current?.value,
        structureconstructed: selectedCons,
        remarks: "Not Printed",
        defects: DefectsRef.current?.value
      }
    ).then(res => {
      console.log(res.data);
      alert("Evaluation Successful!");
      props.handleClose()
    }).catch(err => console.log(err))
  }*/
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
        <DialogContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '1400px' }} >
          <>
            <Card style={cardStyle} elevation={0}>
              <CardContent style={{ marginLeft: 35, textAlign: 'center' }} >
                <Grid container marginTop={'1rem'} style={{ height: '100%' }}>
                  <Grid item xs={10} sm={11}>
                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                      <p className='custom-paragraph' >Business Permit Number</p>
                      <TextField fullWidth className='custom-outlined-input' sx={{ borderRadius: '11px' }} variant='standard' disabled/>
                    </Stack>
                  </Grid>
                  <Grid item xs={10} sm={11}>
                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                      <p className='custom-paragraph'>Name of Owner/Permitee</p>
                      <TextField fullWidth className='custom-outlined-input' sx={{ borderRadius: '11px' }} variant='standard' disabled/>
                    </Stack>
                  </Grid>
                  <Grid item xs={10} sm={11}>
                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                      <p className='custom-paragraph' >Business Name</p>
                      <TextField fullWidth className='custom-outlined-input' sx={{ borderRadius: '11px' }} variant='standard' disabled/>
                    </Stack>
                  </Grid>
                  <Grid item xs={10} sm={11}>
                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                      <p className='custom-paragraph' >Address</p>
                      <TextField fullWidth className='custom-outlined-input' sx={{ borderRadius: '11px' }} variant='standard' disabled/>
                    </Stack>
                  </Grid>
                  <Grid item xs={10} sm={6}>
                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                      <p className='custom-paragraph'>Nature of Business</p>
                      <TextField className='custom-outlined-input' sx={{ borderRadius: '11px', width: "330px" }} variant='standard' disabled/>
                    </Stack>
                  </Grid>
                  <Grid item xs={10} sm={5}>
                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                      <p className='custom-paragraph' >Type of Occupancy</p>
                      <TextField fullWidth className='custom-outlined-input' sx={{ borderRadius: '11px' }} variant='standard' disabled/>
                    </Stack>
                  </Grid>
                  <Grid item xs={10} sm={6}>
                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                      <p className='custom-paragraph' >Contact Number</p>
                      <TextField className='custom-outlined-input' sx={{ borderRadius: '11px', width: "330px" }} variant='standard' disabled/>
                    </Stack>
                  </Grid>
                  <Grid item xs={10} sm={6}>
                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                      <p className='custom-paragraph'>Email</p>
                      <TextField className='custom-outlined-input' sx={{ borderRadius: '11px', width: "305px" }} variant='standard' disabled/>
                    </Stack>
                  </Grid>
                  <Grid item xs={10} sm={11}>
                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                      <p className='custom-paragraph' style={{ paddingTop: '20px' }}>Date Received</p>
                      <TextField fullWidth className='custom-outlined-input' sx={{ borderRadius: '11px' }} variant='standard' disabled/>
                    </Stack>
                  </Grid>
                  <Grid item xs={10} sm={6}>
                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                      <p className='custom-paragraph' style={{paddingTop:'20px'}} >Date of Inspection</p>
                      <OutlinedInput className='custom-outlined-input' sx={{ borderRadius: '11px', width: "330px" }} readOnly />
                    </Stack>
                  </Grid>
                  <Grid item xs={10} sm={6}>
                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                      <p className='custom-paragraph' style={{paddingTop:'20px'}}>Inspection Order Number</p>
                      <OutlinedInput className='custom-outlined-input' sx={{ borderRadius: '11px', width: "305px" }} readOnly />
                    </Stack>
                  </Grid>
                  <Grid item xs={10} sm={6}>
                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                      <p className='custom-paragraph' >FSIC Number</p>
                      <OutlinedInput className='custom-outlined-input' sx={{ borderRadius: '11px', width: "330px" }} readOnly />
                    </Stack>
                  </Grid>
                  <Grid item xs={10} sm={6}>
                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                      <p className='custom-paragraph'  >FSIC Date</p>
                      <OutlinedInput className='custom-outlined-input' sx={{ borderRadius: '11px', width: "305px" }} readOnly />
                    </Stack>
                  </Grid>
                  <Grid item xs={10} sm={11}>
                    <Stack spacing={-1} sx={{ alignItems: 'center', paddingTop: '20px' }}>
                      <h2 className='custom-paragraph' >FSIC Payment</h2>
                    </Stack>
                  </Grid>
                  <Grid item xs={10} sm={11}>
                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                      <p className='custom-paragraph' >Amount</p>
                      <OutlinedInput fullWidth className='custom-outlined-input' sx={{ borderRadius: '11px' }} readOnly />
                    </Stack>
                  </Grid>
                  <Grid item xs={10} sm={6}>
                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                      <p className='custom-paragraph' >O.R Number</p>
                      <OutlinedInput className='custom-outlined-input' sx={{ borderRadius: '11px', width: "330px" }} readOnly />
                    </Stack>
                  </Grid>
                  <Grid item xs={10} sm={6}>
                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                      <p className='custom-paragraph' >Date</p>
                      <OutlinedInput className='custom-outlined-input' sx={{ borderRadius: '11px', width: "305px" }} readOnly />
                    </Stack>
                  </Grid>
                  <Grid item xs={10} sm={11}>
                    <Stack spacing={-1} sx={{ alignItems: 'center', paddingTop: '20px' }}>
                      <h2 className='custom-paragraph' style={{ paddingTop: '20px' }}>Fire Safety Inspectors</h2>
                    </Stack>
                  </Grid>
                  <Grid item xs={10} sm={11}>
                    <Stack spacing={3} direction={'row'} sx={{ alignItems: 'flex-start' }}>
                      <h3 className='custom-paragraph'style={{marginTop: 0}}>Team Leader</h3>
                      <OutlinedInput className='custom-outlined-input' sx={{ borderRadius: '11px', width: "500px" }} readOnly />
                    </Stack>
                  </Grid>
                  <Grid item xs={10} sm={11}>
                    <Stack spacing={3} direction={'row'} sx={{ alignItems: 'flex-start' }}>
                      <h3 className='custom-paragraph' style={{paddingRight:'48px', marginTop: 0}} >1. FSI</h3>
                      <OutlinedInput className='custom-outlined-input' sx={{ borderRadius: '11px', width: "500px", }} readOnly />
                    </Stack>
                  </Grid>
                  <Grid item xs={10} sm={11}>
                    <Stack spacing={3} direction={'row'} sx={{ alignItems: 'flex-start' }}>
                      <h3 className='custom-paragraph' style={{paddingRight:'47px', marginTop: 0}}>2. FSI</h3>
                      <OutlinedInput className='custom-outlined-input' sx={{ borderRadius: '11px', width: "500px" }} readOnly />
                    </Stack>
                  </Grid>
                  <Grid item xs={10} sm={11}>
                    <Stack spacing={3} direction={'row'} sx={{ alignItems: 'flex-start' }}>
                      <h3 className='custom-paragraph' style={{paddingRight:'47px', marginTop: 0}}>3. FSI</h3>
                      <OutlinedInput className='custom-outlined-input' sx={{ borderRadius: '11px', width: "500px" }} readOnly />
                    </Stack>
                  </Grid>
                  <Grid item xs={10} sm={11}>
                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                      <p className='custom-paragraph' style={{ paddingTop: '20px' }}>Recommendations</p>
                      <OutlinedInput fullWidth className='custom-outlined-input-multiline'
                        sx={{
                          borderRadius: '11px',
                          height: '100px',
                          paddingTop: '0',
                          '& textarea': {
                            paddingTop: '20px', // Adjust the value as needed
                          },
                        }//
                        } multiline
                        readOnly
                        rows={2}
                      />
                    </Stack>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </>
        </DialogContent>
        <DialogActions style={{ justifyContent: 'center' }}>
          <Button variant='contained' sx={{ backgroundColor: 'grey', borderRadius: '13px', height: '30px' }}>
            Add Evaluation
          </Button>
        </DialogActions>
      </Dialog>

    </div>
  );
};
