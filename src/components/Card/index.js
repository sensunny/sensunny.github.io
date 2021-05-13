import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardListing from "./cardListing"

const useStyles = makeStyles({
    root: {
        minWidth: "1000",
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

export default function SimpleCard() {
    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;
    let listItems = [
        "Search for available slots by pincode in your states.",
        "See the available slots in the search results.",
        "If slots are available, visit <a href='https://selfregistration.cowin.gov.in/' target='_blank'>https://selfregistration.cowin.gov.in/</a> to book an appointment by copy paste pincode <small>(for fast process)</small>.",
        // "If there are no slots available, click on bell icon to get notified when slots are available in your area."
    ]
    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography variant="h5" component="h2">
                    How to Book an Appointment (For covid vaccination)
                </Typography>
                <CardListing
                    listItems={listItems}
                />
            </CardContent>
        </Card>
    );
}
