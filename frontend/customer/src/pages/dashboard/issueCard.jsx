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
    Stack
} from "@mui/material";
import img from '../../assets/images/error_img.png'
import Typography from "@mui/material/Typography";
import {
    BugReportRounded,
    ChatBubbleOutlineRounded,
    DoneAllRounded,
    ErrorOutlined,
    Forward,
    MoreVertRounded,
    OpenInNewRounded
} from "@mui/icons-material";
import useAxios from "../../hooks/useAxios";
import Issuedetails from './Issuedetails';
import LoadingComponent from "../../components/loading";    

const IssueItem = () => {
    const {response, error, loading} = useAxios('/customer/issue');

    return (
        <>
        {loading && <LoadingComponent/>}
        {response?.map((issue, index) => (
                    <Stack direction="row" alignItems="center" columnGap={2} justifyContent={'space-between'} key={index}>
                        <Issuedetails issue={issue}/>
                    </Stack>
                ))}
        </>
    )
}


export default function IssueCard(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    return (
        <>
            <Card sx={{height: '100%', p: 0}} elevation={5}>
                <Stack justifyContent={'space-between'} height={'100%'}>
                    <Stack>
                        <CardHeader title="My Issues"/>
                        <div style={{overflow: 'scroll'}}>
                            <Stack spacing={2} sx={{px: 2}}>
                                {[1].map((issue) => (
                                    <IssueItem key={issue}/>
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
                            endIcon={<Forward/>}>
                            View all
                        </Button>
                    </Stack>
                </Stack>
            </Card>
        </>
    );
}