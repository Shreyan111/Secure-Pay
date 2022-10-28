import React from 'react'
import {
    Box,
    Button, ButtonGroup,
    Card,
    CardHeader,
    Chip,
    Divider,
    IconButton,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    Stack,
} from "@mui/material";
import img from '../../assets/images/error_img.png'
import Typography from "@mui/material/Typography";
import {
    ErrorOutlined, EditRounded, CheckCircleOutlined, DeliveryDining, DoneAll
} from "@mui/icons-material";

const Issuedetails = ({issue}) => {
    return (
        <>
            <Stack direction="row" alignItems="center" justifyContent={'space-between'} spacing={2} width={'100%'}>
                <Box
                    component="img"
                    alt={'title'}
                    src={img}
                    sx={{width: 48, height: 48, borderRadius: 1.5}}
                />
                <Box sx={{minWidth: 240,width:'100%'}}>
                    <Typography variant="subtitle2" noWrap>
                        {issue?.seller.name}
                    </Typography>
                    <Typography variant="subtitle2" noWrap>
                        {issue?.seller.storeName}
                    </Typography>
                    <Typography variant="body2" sx={{color: 'text.secondary'}}>
                        {issue?.description}
                    </Typography>
                </Box>
                <Box>
                    <Chip
                        label={issue?.status}
                        variant={'outlined'}
                        color={issue?.status === 'RAISED' ? 'primary' : issue?.status === 'VIEWED' ? 'info' : issue?.status === 'RESOLVED' ? 'secondary' : issue?.status === 'REFUNDED' ? 'success' :  'error'
                        }
                        icon={
                            issue?.status === 'RAISED' ? <EditRounded/> :
                            issue?.status === 'VIEWED' ? <CheckCircleOutlined/> :
                            issue?.status === 'RESOLVED' ? <DeliveryDining/> :
                            issue?.status === 'REFUNDED' ? <DoneAll/> :
                            <ErrorOutlined/>
                        }
                    />
                </Box>
            </Stack>
        </>
    );
}

export default Issuedetails;