import React from 'react';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

export default function DisableElevation(props) {
    return (
        <Button variant="contained" color="primary" onClick={() => props.onClick(true)} style={{ marginBottom: "25px" }} >
            <AddIcon />
            {props.title}
        </Button>
    );
}