import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import StarIcon from '@material-ui/icons/Star';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: '90%',
        backgroundColor: theme.palette.background.paper,
    },
}));

export default function InsetList({ listItems }) {
    const classes = useStyles();
    return (
        <List component="nav" className={classes.root} aria-label="contacts">
            {listItems.map((text) => {
                return <ListItem button>
                    <ListItemIcon>
                        <StarIcon />
                    </ListItemIcon>
                    <ListItemText primary={<span dangerouslySetInnerHTML={{ __html: text }}></span>} />
                </ListItem>
            })}
        </List>
    );
}
