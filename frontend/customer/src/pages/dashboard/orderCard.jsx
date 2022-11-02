import React from 'react'
import {Box, Button, ButtonGroup, Card, CardHeader, Chip, Divider, IconButton, Stack, Typography} from "@mui/material";
import {BugReportRounded, DoneAllRounded, Forward} from "@mui/icons-material";
import useAxios from "../../hooks/useAxios";
import LoadingComponent from "../../components/loading";
import Orderdetails from './Orderdetails';
import { useHistory } from 'react-router-dom';
import Paths from "../../util/paths";

const OrderItem = () => {
    const {response, error, loading} = useAxios('/customer/order');
    return (
        <>
        {loading && <LoadingComponent/>}
        {response?.map((order, index) => (
                    <Stack direction="row" alignItems="center" columnGap={2} justifyContent={'space-between'} key={index}>
                        <Orderdetails order={order}/>
                    </Stack>
                ))}
        </>
    )
}

export default function OrderCard(props) {
    let history = useHistory();
    return (
        <Card sx={{height: '100%', p: 0}} elevation={5}>
            <Stack justifyContent={'space-between'} height={'100%'}>
                <Stack>
                    <CardHeader title="My Orders"/>
                    <div style={{overflow: 'scroll'}}>
                        <Stack spacing={2} sx={{px: 2}}>
                            {[1].map((issue) => (
                                <OrderItem key={issue}/>
                            ))}
                        </Stack>
                    </div>
                </Stack>
                <Stack
                    spacing={2}
                    justifyContent={'space-evenly'}
                    alignItems={'flex-end'}
                    sx={{p: 2}}>
                    <Divider sx={{width: '100%'}}/>
                    <Button
                        to="#"
                        size="small"
                        variant={'contained'}
                        endIcon={<Forward/>} onClick={() => history.push(Paths.settings)}>
                        View all
                    </Button>
                </Stack>
            </Stack>
        </Card>
    );
}