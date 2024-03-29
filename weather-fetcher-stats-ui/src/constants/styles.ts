import {makeStyles} from "@mui/styles";

export const useStyles = makeStyles(() =>
    ({
        root: {
            marginTop: '16px',
            width: '100%'
        },
        table: {
            minWidth: 650,
        },
        tableCell: {
            width: '150px',
        },
        pagination: {
            background: 'lightblue'
        },
        tableHead: {
            background: 'lightblue',
        },
        oddRow: {
            backgroundColor: '#f5f5f5'
        },
        visualizationBlock: {
            display: 'flex',
            alignItems: 'center',
            '& button': {
                marginLeft: '5px'
            },
            fontSize: '18px',
            padding: '3px'
        },
        modalWindow: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        },
        chartContent: {
            backgroundColor: '#FFFFFF',
            padding: '20px',
            border: "5px solid #cccc"
        },
        tooltip: {
            backgroundColor: "#ffff",
            padding: "5px",
            border: "1px solid #cccc"
        }
    }));
