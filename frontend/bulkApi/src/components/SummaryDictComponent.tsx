import React from "react";
import { Container } from "@material-ui/core";
import Typography from '@material-ui/core/Typography';

interface IProps {
    dictSummary: Record<string, any>
}

export function SummaryDictComponent({dictSummary}: IProps ): JSX.Element {

    let paras: JSX.Element[] = [];
    for (let [key, value] of Object.entries(dictSummary)) {
        paras.push(<Typography variant={"body2"} color={"textSecondary"} key={key} align={"left"}>
            <b>{key}: </b>{value}
        </Typography>);
    }
    return <div style={ {padding:"10px"} }>
        {paras}
    </div>
}