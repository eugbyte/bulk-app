import React from "react";
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import { CardContent, Button, CardActions } from "@material-ui/core";
import Typography from '@material-ui/core/Typography';
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";


interface IProp {
    title: string,
    paras: JSX.Element[] | JSX.Element, // e.g. [<p></p>, <p><p>]
    actionTitle?: string,
    action?: (val: any) => any;
}

export function CardComponent({title, paras, actionTitle, action}: IProp) {
    const classes = useStyles(); 

    return (
        <div>
            <Card className={classes.cardWidth}>
                <CardActionArea onClick={action}>
                    <CardMedia 
                        component="img"
                        height="140"
                        className={classes.cardHeight}
                        image="e_commerce.png"
                        title="https://acowebs.com/impact-ecommerce-society/"/>
                </CardActionArea>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {title}
                    </Typography>
                    {paras}
                </CardContent>
                { action != null &&
                    <CardActions>                
                        <Button size="medium" color="primary" onClick={action}>
                            {actionTitle}
                        </Button>
                    </CardActions>  
                }
                  
            </Card>
            
        </div>
        
    )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#fff"
    },
    cardWidth: {
        maxWidth: 450,
    },
    cardHeight: {
        height: 140,
    },
  })
);