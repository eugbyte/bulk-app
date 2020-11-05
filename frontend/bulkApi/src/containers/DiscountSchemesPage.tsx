import React, { useEffect } from "react";
import { Dispatch } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { getAllDiscountSchemesWithBidsAsync } from "../store/thunks/discountSchemeThunk";
import { DiscountScheme } from "../models/DiscountScheme"; 
import { RootState } from "../store/rootReducer"; 
import Grid from '@material-ui/core/Grid';
import { CardComponent } from "../components/CardComponent"; 
import Typography from '@material-ui/core/Typography';
import { useHistory } from "react-router-dom";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { ApiError } from "../models/ApiError";
import { ErrorNotification } from "../components/ErrorNotification";
import { InterceptorService } from "../services/InterceptorService";
 
export function DiscountSchemesPage(): JSX.Element {
    const dispatch: Dispatch<any> = useDispatch();  
    const history = useHistory();   
    const classes = useStyles();

    let discountSchemes: DiscountScheme[] = useSelector((action: RootState) => action.discountSchemeReducer.discountSchemes as DiscountScheme[]) ?? []; 
    console.log(discountSchemes);

    const error: ApiError = useSelector((action: RootState) => action.errorReducer.error as ApiError) ?? null;

    useEffect(() => {
        document.title = "Products"
        let action = getAllDiscountSchemesWithBidsAsync();
        dispatch(action)
    }, []); 

    let cards: JSX.Element[] = []
    for (let index = 0; index < discountSchemes.length; index ++ ) {
        const ds = discountSchemes[index];

        let dateString: string = "";
        if (ds.expiryDate) {
            let date: Date = new Date(ds.expiryDate.toString());
            dateString = date.toDateString();
        } 

        let title = ds.product?.name ?? "";
        let currentBids: number = ds.bids
            .filter(bid => !bid.isInCart)
            .reduce((accum, bid) => accum + bid?.quantity, 0);

        let textDict = {
            "Title": title,
            "Discounted Price": "$" + ds.discountedPrice,
            "Remaining Bids Needed": ds.minOrderQnty - currentBids,
            "Expiry Date": dateString
        } 

        let paras: JSX.Element[] = [];
        for (let [key, value] of Object.entries(textDict)) {
            let para: JSX.Element = <Typography variant="body2" color="textSecondary" component="p" align="left" key={key}>
                <b>{key}&nbsp;</b>{value} 
            </Typography>

            if (key === "Discounted Price") {
                para = <Typography variant="body2" color="textSecondary" component="p" align="left" key={key}>
                <b>{key}&nbsp;</b> ${ds.discountedPrice} $<del>{ds.product?.originalPrice}</del>
            </Typography>
            }

            paras.push(para)
        }
                 
        const redirectToDiscountSchemeDetail = () => { history.push("/discountScheme/" + ds.discountSchemeId) };

        let card: JSX.Element = <Grid item xs={12} sm={4} lg={3} key={index}>
            <CardComponent title={title} paras={paras} actionTitle={"Add to Cart"} action={redirectToDiscountSchemeDetail}/>
        </Grid>
        cards.push(card);
    }  

    return <div>
        {discountSchemes.length > 0 &&
            <Grid className={classes.fullWidth}
                container
                spacing={3}>
                {cards}
            </Grid>     
        }
        <ErrorNotification error={error} message="error fetching schemes" />
    </div>

} 

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    typo: {
       fontVariant: "body2",
       color: "textSecondary",
       component: "p",
       align: "left"
    },
    fullWidth: {
        width: "100vw",
        margin: "auto",
        paddingLeft: "100px",
        paddingRight: "100px"
    }
  })
);