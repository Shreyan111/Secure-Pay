import React from 'react'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import IssueCard from './issueCard'
// import InstagramCard from './instagramCard'
// import RatingCard from './ratingCard'
import {Box} from "@mui/material";
import {styled} from "@mui/styles";
import theme from "../../theme";
import OrderCard from './orderCard';
import RecentOrderCard from "./recentOrderCard";
import RecentIssueCard from "./recentIssueCard";
import useAxios from '../../hooks/useAxios';

const StyledPaper = styled(Paper)({
    padding: theme.spacing(2),
    height: '100%',
    boxShadow: '0px 4px 4px rgba(0,0,0,0.25)'
})

export default function Dashboard() {
    const {response, error, loading} = useAxios('/customer/dashboard');
    return (
        <>
            <Box sx={{px: 2}}>
                <Typography variant="h4">Hi, Welcome back {response?.name}</Typography>
            </Box>
            <Grid container spacing={2} alignItems={'stretch'} direction={'row'} sx={{p: 1}}>
                <Grid item xs={12} sm={6} md={8} order={1}>
                    <OrderCard/>
                </Grid>
                <Grid item xs={12} sm={6} md={4} order={{xs: 2, md: 2}}>
                    <RecentOrderCard/>
                </Grid>
                <Grid item xs={12} sm={6} md={3} order={{xs: 3, md: 3}}>
                    <RecentIssueCard/>
                </Grid>
                <Grid item xs={12} sm={6} md={9} order={{xs: 4, md: 4}}>
                    <IssueCard/>
                </Grid>
                {/* <Grid item xs={12} sm={6} md={6} order={{xs: 5, md: 5}}>
                    <RatingCard/>
                </Grid>
                <Grid item xs={12} sm={6} md={6} order={{xs: 6, md: 6}}>
                    <InstagramCard/>
                </Grid> */}
            </Grid>
        </>
    )
}
