import {Box, Grid, Paper} from "@mui/material";
import {RequestsVisualization} from "./modals/RequestsVisualization";
import Button from "@mui/material/Button";
import React from "react";
import {RequestData} from "../../types/RequestData";

interface HeaderProps {
    appData: { requests: RequestData[], loading: boolean, error: string },
    handleFetchRequestsCallback: () => void
}

export const Header = ({appData, handleFetchRequestsCallback}: HeaderProps) => (
    <>
        <Grid item zeroMinWidth>
            <Paper elevation={5}>
                <RequestsVisualization requests={appData.requests}
                                       disabled={appData.loading || appData.error.length != 0}
                />
            </Paper>
        </Grid>
        <Grid item xs>
            <Box display="flex" justifyContent="flex-end">
                <Button variant="contained"
                        color={'warning'}
                        disabled={appData.loading}
                        onClick={handleFetchRequestsCallback}>
                    Reload
                </Button>
            </Box>
        </Grid>
    </>
)
