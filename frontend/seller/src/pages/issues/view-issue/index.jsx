import React, { useState } from 'react';
import { useParams } from "react-router-dom";
import { Button, ButtonGroup, Grid, ImageList, Paper, Stack, TextField } from "@mui/material";
// import TextField from '@mui/material/TextField';
import useAxios from "../../../hooks/useAxios";
import axios from 'axios';

const ViewIssue = () => {
    const { id } = useParams()
    const { response, error, loading } = useAxios({
        url: '/seller/issue/' + id,
        method: 'GET'
    });
    console.log(response);

    const Refund = () => {
        console.log("1");

        axios.get('http://localhost:3000/seller/issue/refund/' + `${id}`).then((response) => {
            console.log(response);
            setButtonText(<Button
                variant={'contained'}
                color={'warning'}
            >
                Money already refunded
            </Button>)
        }).catch((error) => { console.log(error) });
    }

    const Resolved = () => {
        console.log("2");
        axios.get('http://localhost:3000/seller/issue/resolve/' + `${id}`).then((response) => {
            console.log(response);
            setButtonText(<ButtonGroup variant={'contained'}>
                <Button color={'success'}>Issue already resolved</Button>
            </ButtonGroup>)
        }).catch((error) => { console.log(error) });
    }

    const [buttonText, setButtonText] = useState(<><Button
        variant={'contained'}
        color={'warning'}
        onClick={Refund}
    >
        Refund
    </Button>
        <ButtonGroup variant={'contained'}>
            <Button color={'success'} onClick={Resolved}>Resolved</Button>
        </ButtonGroup></>);

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12} md={8} order={{ xs: 1, md: 2 }}>
                    <Paper sx={{ p: 2 }}>
                        <Stack direction='column' spacing={2}>
                            <Stack sx={{ width: '100%' }} spacing={2} direction={{ xs: 'column', md: 'row' }}>
                                <TextField
                                    disabled
                                    variant={'outlined'}
                                    // label="Disabled"
                                    InputProps={{
                                        shrink: true
                                    }}
                                    fullWidth
                                    value={response?.issueId} />
                                <TextField
                                    disabled
                                    variant={'outlined'}
                                    fullWidth
                                    InputProps={{
                                        shrink: true
                                    }}
                                    value={response?.order} />
                            </Stack>
                            <TextField
                                disabled
                                variant={'outlined'}
                                fullWidth
                                InputProps={{
                                    shrink: true
                                }}
                                value={response?.title} />
                            <TextField
                                disabled
                                variant={'outlined'}
                                fullWidth
                                InputProps={{
                                    shrink: true
                                }}
                                value={response?.customer?.name} />
                            <TextField
                                disabled
                                variant={'outlined'}
                                rows={3}
                                multiline
                                fullWidth
                                InputProps={{
                                    shrink: true
                                }}
                                value={response?.description} />
                        </Stack>
                        <Stack direction={'row'} justifyContent={'space-between'} spacing={2} sx={{ mt: 2 }}>
                            {buttonText}
                            {/* {response?.status === 'REFUNDED' ?                             <Button
                                variant={'contained'}
                                color={'warning'}
                            >
                                Money already refunded
                            </Button> : response?.status === 'RESOLVED' ?                             <ButtonGroup variant={'contained'}>
                                <Button color={'success'}>Issue already resolved</Button>
                            </ButtonGroup> :                            <><Button
                                variant={'contained'}
                                color={'warning'}
                                onClick={Refund}
                            >
                                Refund
                            </Button>
                            <ButtonGroup variant={'contained'}>
                                <Button color={'success'} onClick={Resolved}>Resolved</Button>
                            </ButtonGroup></>} */}
                        </Stack>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={4} order={{ xs: 1, md: 2 }}>
                    <ImageList
                        variant="quilted"
                        cols={4}
                        rowHeight={128}>

                    </ImageList>
                </Grid>
            </Grid>
        </>
    );
}

export default ViewIssue;