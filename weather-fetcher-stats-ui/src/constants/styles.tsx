import {makeStyles} from "@mui/styles";

export const useStyles = makeStyles(() => ({
    root: {
        width: '100%',
        marginTop: '16px',
        overflowX: 'auto',
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
        fontSize: '18px'
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
