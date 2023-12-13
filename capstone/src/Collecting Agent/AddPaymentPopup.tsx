import React, { ChangeEvent, useRef, useState } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import CancelIcon from '@mui/icons-material/Cancel';
import IconButton from '@mui/material/IconButton';
import { Card, CardContent, DialogActions, DialogContent, DialogTitle, FormControlLabel, Grid, MenuItem, OutlinedInput, Radio, RadioGroup, Select, SelectChangeEvent, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import axios from 'axios';

const cardStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: 1200,
    backgroundColor: 'lightgrey',
}; //Style Purposes

export interface formdetails {
    open: boolean;
    handleClose: () => void;
    add: string;
}



const AddPaymentPopup: React.FC<formdetails> = ({ open, handleClose, add }) => {

    const [tableData, setTableData] = useState<Array<{ natureOfCollection: string; accountCode: string; amount: string }>>([
        { natureOfCollection: '', accountCode: '', amount: '' },
    ]);

    const opsnumberRef = useRef<HTMLInputElement | null>(null);
    const opsdateRef = useRef<HTMLInputElement | null>(null);
    const establishmentRef = useRef<HTMLInputElement | null>(null);
    const locationRef = useRef<HTMLInputElement | null>(null);
    const nameRef = useRef<HTMLInputElement | null>(null);
    const paymentdateRef = useRef<HTMLInputElement | null>(null);
    const ornumberRef = useRef<HTMLInputElement | null>(null);
    const amountPaidRef = useRef<HTMLInputElement | null>(null);
    const assesorRef = useRef<HTMLInputElement | null>(null);
    const othersRef = useRef<HTMLInputElement | null>(null);



    const [totalValue, setTotalValue] = useState(0);
    const [selectedValue, setSelectedValue] = useState('');
    const [inputValue, setInputValue] = useState('');

    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    const handleAddRow = () => {
        const newRow = { natureOfCollection: '', accountCode: '', amount: '' };
        setTableData((prevData) => [...prevData, newRow]);
    };

    const handleDeleteRow = (rowIndex: number) => {
        const updatedData = [...tableData];
        updatedData.splice(rowIndex, 1);
        setTableData(updatedData);
    };


    const calculateTotalAmount = () => {
        let total = 0;
        tableData.forEach((item) => {
            // Convert amount to a number and add it to the total
            total += parseFloat(item.amount) || 0;
        });
        return total;
    };



    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const setfscValues = () => {
        let fscValue = "";
        if (selectedValue === 'Other') {
            fscValue = inputValue;
        }
        else {
            fscValue = selectedValue;
        }
        return fscValue;
    }



    const handleRadioChange = (event: ChangeEvent<HTMLInputElement>) => {
        console.log(selectedValue)
        setSelectedValue(event.target.value);
        if (event.target.value !== 'Other') {
            setIsButtonDisabled(false);
        } else {
            setIsButtonDisabled(true);
        }
    };

    const accountCodeOptions = ["628-BFP-01", "628-BFP-02", "628-BFP-03", "628-BFP-04", "628-BFP-05", "628-BFP-06", "628-BFP-07", "628-BFP-08", "628-BFP-09", "628-BFP-10", "628-BFP-11a", "628-BFP-11b"];
    const accountCodeToNatureOfCollectionMap: { [key: string]: string } = {
        "628-BFP-01": "Fire Code Construction Tax ",
        "628-BFP-02": "Fire Code Realty Tax",
        "628-BFP-03": "Fire Code Premium Tax",
        "628-BFP-04": "Fire Code Sales Tax ",
        "628-BFP-05": "Fire Code Proceeds Tax",
        "628-BFP-06": "Fire Safety Inspection Fee",
        "628-BFP-07": "Storage Clearance Fee",
        "628-BFP-08": "Conveyance Clearance Fee ",
        "628-BFP-09": "Installation Clearance Fee",
        "628-BFP-10": "Fire Code Administrative Fines",
        "628-BFP-11a": "Other Fees",
        "628-BFP-11b": "Certificate of Competency (COC)",
        // Add more mappings as needed
    };


    const handleTableChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>,
        rowIndex: number,
        key: keyof typeof tableData[0]
    ) => {
        const newData = [...tableData];

        if ('target' in e) {
            newData[rowIndex][key] = e.target.value;

            // Update natureOfCollection when accountCode changes
            if (key === 'accountCode') {
                const selectedAccountCode = e.target.value;
                newData[rowIndex].natureOfCollection = accountCodeToNatureOfCollectionMap[selectedAccountCode];
            }
        } else {
            newData[rowIndex][key] = e;
        }

        setTableData(newData);
    };

    const resetValues = () => {
      

        setTableData([{ natureOfCollection: '', accountCode: '', amount: '' }]);
    };

    const AddForm = async () => {
        const convertedTableData = tableData.map(item => [item.natureOfCollection, item.accountCode, item.amount]);
        const totalAmount = calculateTotalAmount();
        const fscValue = setfscValues();
        let NEW_URL = '';
        if (add === 'New') {
            NEW_URL = 'http://localhost:8080/newBusinessPayment/insertNewBpPayment';
        }
        else if (add === 'Renewal') {
            NEW_URL = 'http://localhost:8080/newRenewalBusinessPayment/insertRenewalBpPayment';
        }
        else if (add === 'Occupancy') {
            NEW_URL = 'http://localhost:8080/OccupancyPayment/insertOccupancyPayment';
        }
        else if (add === 'Building') {
            NEW_URL = 'http://localhost:8080/BuildingPermitPayment/insertBuildingPayment';
        }
        axios.post(NEW_URL, {
            projectname: establishmentRef.current?.value,
            location: locationRef.current?.value,
            name: nameRef.current?.value,
            fsc: fscValue,
            or_no: ornumberRef.current?.value,
            ops_no: opsnumberRef.current?.value,
            ops_date: opsdateRef.current?.value,
            payment_date: paymentdateRef.current?.value,
            amount_paid: amountPaidRef.current?.value,
            total_amount: totalAmount,
            assessor_name: assesorRef.current?.value,
            payment: convertedTableData
        })
            .then(res => {
                if (res.data) {
                    console.log("Successfully Added!" + JSON.stringify(res.data));
                    resetValues();
                    handleClose(); // Ensure handleClose is accessible in this scope
                   
                  
                }
            })
            .catch(err => {
                console.log(err)
            })
    }




    return (
        <div>
            <Dialog open={open} fullWidth PaperProps={{ style: { backgroundColor: 'lightgrey', maxWidth: '1200px' } }}>
                <DialogTitle sx={{ height: '0px' }}>
                    <IconButton sx={{ marginTop: '-25px', marginLeft: '-25px' }} onClick={handleClose}>
                        <CancelIcon sx={{ color: 'red' }} />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <Card style={cardStyle} elevation={0}>
                        <CardContent style={{ marginLeft: 35, textAlign: 'center', marginTop: '-90px' }} >
                            <Grid container marginTop={'5rem'} style={{ height: '100%' }}>
                                <Grid item xs={10} sm={11}>
                                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                                        <p style={{ alignSelf: 'center', fontSize: '1.5em', fontWeight: 'bold' }}>Order of Payment</p>
                                    </Stack>
                                </Grid>
                                <Grid item xs={10} sm={6}>
                                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                                        <p className='custom-paragraph' style={{ marginLeft: '100px' }}>OPS Number</p>
                                        <OutlinedInput inputRef={opsnumberRef} fullWidth className='custom-outlined-input' style={{ marginLeft: '100px', borderRadius: '11px', width: '340px' }} />
                                    </Stack>
                                </Grid>
                                <Grid item xs={10} sm={6}>
                                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                                        <p className='custom-paragraph' >Date</p>
                                        <OutlinedInput inputRef={opsdateRef} fullWidth className='custom-outlined-input' sx={{ borderRadius: '11px', width: '360px' }} placeholder='EX: YEAR-MONTH-DAY' />
                                    </Stack>
                                </Grid>
                                <Grid item xs={10} sm={11}>
                                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                                        <p className='custom-paragraph' style={{ marginLeft: '100px' }} >Name of Establishment</p>
                                        <OutlinedInput inputRef={establishmentRef} fullWidth className='custom-outlined-input' style={{ marginLeft: '100px', borderRadius: '11px', width: '81%' }} />
                                    </Stack>
                                </Grid>
                                <Grid item xs={10} sm={11}>
                                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                                        <p className='custom-paragraph' style={{ marginLeft: '100px' }} >Location</p>
                                        <OutlinedInput inputRef={locationRef} fullWidth className='custom-outlined-input' style={{ borderRadius: '11px', width: '81%', marginLeft: '100px' }} />
                                    </Stack>
                                </Grid>
                                <Grid item xs={10} sm={11}>
                                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                                        <p className='custom-paragraph' style={{ marginLeft: '100px' }} >Owner/Name of Representative</p>
                                        <OutlinedInput inputRef={nameRef} fullWidth className='custom-outlined-input' style={{ borderRadius: '11px', width: '81%', marginLeft: '100px' }} />
                                    </Stack>
                                </Grid>
                                <Grid item xs={10} sm={11}>
                                    <Stack spacing={-1} style={{ alignItems: 'flex-start', marginLeft: '100px' }}>
                                        <RadioGroup
                                            row
                                            aria-labelledby="demo-row-radio-buttons-group-label"
                                            name="row-radio-buttons-group"
                                            value={selectedValue}
                                            onChange={handleRadioChange}

                                        >
                                            <FormControlLabel value="Fire Safety Evaluation Clearance" style={{ marginRight: '60px', paddingTop: '15px' }} control={<Radio />} label="Fire Safety Evaluation Clearance" />
                                            <FormControlLabel value="Fire Safety Inspection Certificate" style={{ marginRight: '60px', paddingTop: '15px' }} control={<Radio />} label="Fire Safety Inspection Certificate" />
                                            <FormControlLabel value="Other" style={{ marginRight: '50px', paddingTop: '15px' }} control={<Radio />} label="Other" />
                                        </RadioGroup>
                                    </Stack>
                                </Grid>
                                <Grid item xs={10} sm={11}>
                                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                                        <p className='custom-paragraph' style={{ marginLeft: '100px' }} >Others</p>
                                        <OutlinedInput value={inputValue} onChange={handleInputChange} fullWidth className='custom-outlined-input' style={{ borderRadius: '11px', width: '360px', marginLeft: '100px' }} disabled={selectedValue !== 'Other'} placeholder="Please Indacate Others" />
                                    </Stack>
                                </Grid>
                                <Grid container marginTop={'2rem'} style={{ height: '100%' }}>
                                    <Grid item xs={12}>
                                        <TableContainer>
                                            <Table sx={{ width: '100%', border: '1px solid #e0e0e0' }}>
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell sx={{ fontFamily: 'Oswald', fontSize: '16px', textAlign: 'center', background: '#f5f5f5' }}>Nature of Collection</TableCell>
                                                        <TableCell sx={{ fontFamily: 'Oswald', fontSize: '16px', textAlign: 'center', background: '#f5f5f5' }}>Account Code</TableCell>
                                                        <TableCell sx={{ fontFamily: 'Oswald', fontSize: '16px', textAlign: 'center', background: '#f5f5f5' }}>Amount</TableCell>
                                                        <TableCell sx={{ fontFamily: 'Oswald', fontSize: '16px', textAlign: 'center', background: '#f5f5f5' }}></TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {tableData.map((row, rowIndex) => (
                                                        <TableRow key={rowIndex}>
                                                            <TableCell sx={{ fontFamily: 'Oswald', fontSize: '15px' }}>
                                                                <OutlinedInput
                                                                    fullWidth
                                                                    value={row.natureOfCollection}
                                                                    onChange={(e) => handleTableChange(e, rowIndex, 'natureOfCollection')}
                                                                />
                                                            </TableCell>
                                                            <TableCell sx={{ font: 'Oswald', fontSize: '15px' }} >
                                                                <Select
                                                                    value={row.accountCode}
                                                                    onChange={(e) => handleTableChange(e, rowIndex, 'accountCode')}
                                                                    fullWidth
                                                                    className='custom-outlined-input'
                                                                    sx={{ borderRadius: '11px', height: '50px', textAlign: 'center' }}
                                                                    style={{ alignSelf: 'center' }}
                                                                >
                                                                    {accountCodeOptions.map((option) => (
                                                                        <MenuItem key={option} value={option}>
                                                                            {option}
                                                                        </MenuItem>
                                                                    ))}
                                                                </Select>
                                                            </TableCell>
                                                            <TableCell sx={{ fontFamily: 'Oswald', fontSize: '15px', alignItems: 'center' }}>
                                                                <OutlinedInput
                                                                    style={{ margin: 'auto', textAlign: 'center' }}
                                                                    fullWidth
                                                                    value={row.amount}
                                                                    onChange={(e) => handleTableChange(e, rowIndex, 'amount')}
                                                                />
                                                            </TableCell>
                                                            <TableCell>
                                                                <Button
                                                                    variant="contained"
                                                                    sx={{ borderRadius: '13px', height: '30px', backgroundColor: 'blue' }}
                                                                    onClick={() => handleDeleteRow(rowIndex)}
                                                                >
                                                                    Delete
                                                                </Button>
                                                            </TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                        <Grid item xs={12} marginTop={'1rem'}>
                                            <Button
                                                variant="contained"
                                                sx={{ backgroundColor: 'grey', borderRadius: '13px', height: '30px' }}
                                                onClick={handleAddRow} // Call the handleAddRow function to add a new row
                                            >
                                                Add Row
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={10} sm={6}>
                                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                                        <p className='custom-paragraph' style={{ marginLeft: '100px' }}>Total Amount of Fire Code Fees</p>
                                        <OutlinedInput fullWidth className='custom-outlined-input' style={{ marginLeft: '100px', borderRadius: '11px', width: '340px' }} value={calculateTotalAmount().toLocaleString()} readOnly />
                                    </Stack>
                                </Grid>
                                <Grid item xs={10} sm={6}>
                                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                                        <p className='custom-paragraph' >Payment Date</p>
                                        <OutlinedInput inputRef={paymentdateRef} fullWidth className='custom-outlined-input' sx={{ borderRadius: '11px', width: '360px' }} />
                                    </Stack>
                                </Grid>
                                <Grid item xs={10} sm={6}>
                                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                                        <p className='custom-paragraph' style={{ marginLeft: '100px' }}>Official Receipt No</p>
                                        <OutlinedInput inputRef={ornumberRef} fullWidth className='custom-outlined-input' style={{ marginLeft: '100px', borderRadius: '11px', width: '340px' }} placeholder='EX: YEAR-MONTH-DAY' />
                                    </Stack>
                                </Grid>
                                <Grid item xs={10} sm={6}>
                                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                                        <p className='custom-paragraph' >Amount Paid</p>
                                        <OutlinedInput inputRef={amountPaidRef} fullWidth className='custom-outlined-input' sx={{ borderRadius: '11px', width: '360px' }} />
                                    </Stack>
                                </Grid>
                                <Grid item xs={10} sm={11}>
                                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                                        <p className='custom-paragraph' style={{ marginLeft: '100px' }} >Name of Fire Code Fee Assessor</p>
                                        <OutlinedInput inputRef={assesorRef} fullWidth className='custom-outlined-input' style={{ borderRadius: '11px', width: '81%', marginLeft: '100px' }} />
                                    </Stack>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </DialogContent>
                <DialogActions style={{ justifyContent: 'center' }}>
                    <Button variant='contained' onClick={AddForm} sx={{ backgroundColor: 'grey', borderRadius: '13px', height: '30px' }}>Add Payment</Button>
                </DialogActions>
            </Dialog>

        </div>
    )
}

export default AddPaymentPopup;