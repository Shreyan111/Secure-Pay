 import React from 'react'
 import {Button, Paper, Stack, Typography} from "@mui/material";
 import {Box, ButtonGroup, Chip, IconButton} from "@mui/material";
 
 const Orderdetails = ({order}) => {
     return (
        <Stack direction="row" alignItems="center" columnGap={2} justifyContent={'space-between'}>
        <Box sx={{minWidth: 200}}>
            <Typography variant="subtitle2" noWrap>
                {order.seller.username}
            </Typography>
            <Typography variant="body2" sx={{color: 'text.secondary'}} noWrap>
                {order.description}
            </Typography>
        </Box>
        <Box>
            <Typography variant="subtitle2" noWrap>
                {order.amount}
            </Typography>
            <Typography variant="body2" sx={{color: 'text.secondary'}} noWrap>
                {new Date(order.createdAt).toDateString()}
            </Typography>
        </Box>
        {/*<CircularProgressWithLabel value={5} sx={{width: '100%'}}/>*/}
        <div>
            {/*<Chip label={'1 day left'} color={'error'}/>*/}
            <Chip label={'5 days left'} color={'primary'} variant={'outlined'}/>
        </div>
    </Stack>
     );
 }
 
 export default Orderdetails;