import React from "react";
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';


interface IProp {
    textDict: Record<string, any>
}

export function TextComponent({textDict}: IProp): JSX.Element {
    let paras: JSX.Element[] = [];
    for (let [key, value] of Object.entries(textDict)) {
        let para: JSX.Element = <Typography variant="body2" color="textSecondary" component="p" align="left" key={key}>
            <b>{key}&nbsp;</b>{value} 
        </Typography>
        paras.push(para)
    }

    return <Container>
        {paras}
    </Container>
}