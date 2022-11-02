import React from 'react';
import {Button, Paper, Stack, Typography} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import useAxios from "../../hooks/useAxios";
import Paths from "../../util/paths";
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    paymentCard: {
        width: '100%',
        height: '100%',
    },
    cardHeader: {
        backgroundImage: 'linear-gradient(135deg, #17EAD9, #6078ea)',
        borderRadius: '5px 5px 0 0',
        height: '50%',
        minHeight: '100px',
        width: '100%',
    },
    statusCompleted: {
        backgroundColor: theme.palette.warning.main,
        color: theme.palette.textColorInverse,
        padding: '5px 10px 5px 10px',
        borderTopLeftRadius: '5px',
        borderBottomRightRadius: '5px',
        fontSize: '0.85rem',
        width: 'fit-content',
    },
    statusPaid: {
        backgroundColor: theme.palette.tertiary.main,
        color: theme.palette.textColorInverse,
        padding: '5px 10px 5px 10px',
        borderTopLeftRadius: '5px',
        borderBottomRightRadius: '5px',
        fontSize: '0.85rem',
        width: 'fit-content',
    },
    cardFooter: {
        backgroundColor: theme.palette.primary.main,
        borderRadius: '0 0 5px 5px',
        height: '10px',
    },
}));

const RecentOrderCard = (props) => {
    // const {order} = props;
    let history = useHistory();
    const classes = useStyles();
    const {response, error, loading} = useAxios('/customer/order?limit=1');
    // console.log(response);
    return (
        <Paper className={classes.paymentCard} elevation={5}>
            <Stack
                direction={'column'}
                justifyContent={'space-between'}
                sx={{height: '100%'}}>
                <div className={classes.cardHeader}>
                    {/*<div*/}
                    {/*    className={order.status === 'PAID' ? classes.statusPaid :*/}
                    {/*        classes.statusCompleted}>*/}
                    {/*    {order.status}</div>*/}
                    <div
                        className={classes.statusCompleted}>
                        COMPLETED
                    </div>
                </div>
                <Stack
                    direction={'column'}
                    justifyContent={'space-around'}
                    spacing={0.5}
                    sx={{p: 2, height: 'inherit'}}>
                    <div>
                        <Typography variant={'h6'} color={'primary'} textAlign={'start'}>
                            {/*Order Id : {order.orderId}*/}
                            Order Id : {response && response[0]?.orderId}
                        </Typography>
                        <Typography variant={'subtitle2'} color={'text.disabled'}>
                            {/*Rs. {order.amount}*/}
                            {/* {new Date().toLocaleString()} */}
                            {response && response[0]?.createdAt}
                        </Typography>
                    </div>
                    <Typography variant={'h6'}>
                        {/*Rs. {order.amount}*/}
                        Rs. {response && response[0]?.amount}
                    </Typography>
                    <Typography variant={'body1'} color={'textSecondary'}>
                        {/*{order.description}*/}
                        Store Name: {response && response[0]?.seller.storeName}
                    </Typography>
                    <div>
                        <Typography variant={'body1'} color={'text.primary'} textAlign={'start'}>
                            {/*Order Id : {order.orderId}*/}
                            Sold By :
                        </Typography>
                        <Typography variant={'subtitle2'} color={'text.secondary'}>
                        {response && response[0]?.seller.name}
                        </Typography>
                        <Typography variant={'subtitle2'} color={'text.disabled'}>
                        @{response && response[0]?.seller.username}
                        </Typography>
                    </div>
                    <div style={{width: '100%'}}>
                        <Button
                            variant={"contained"}
                            color={'error'}
                            size={'small'} onClick={() => history.push(Paths.newIssue)}
                            // onClick={() => {
                            //     props.setOrderId(order.orderId)
                            //     props.setValues({
                            //         ...props.values,
                            //         orderId: order.orderId,
                            //         sellerId: order.seller._id,
                            //         sellerName: `${order.seller.name} (@${order.seller.username})`,
                            //         createdAt: order.createdAt,
                            //     })
                            // }}
                        >
                            Raise an Issue
                        </Button>
                        {/* <Button
                            variant={"contained"}
                            color={'success'}
                            sx={{width: '60%'}}
                            size={'small'}
                            // onClick={() => {
                            //     props.setOrderId(order.orderId)
                            //     props.setValues({
                            //         ...props.values,
                            //         orderId: order.orderId,
                            //         sellerId: order.seller._id,
                            //         sellerName: `${order.seller.name} (@${order.seller.username})`,
                            //         createdAt: order.createdAt,
                            //     })
                            // }}
                        >
                            Mark as complete
                        </Button> */}
                    </div>
                </Stack>
                <div className={classes.cardFooter}/>
            </Stack>
        </Paper>
    );
};

export default RecentOrderCard;