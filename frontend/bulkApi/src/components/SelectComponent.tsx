import React from "react";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { SelectListItem } from "../models/SelectListItem";

interface IProp {
    title: string;
    state: any;
    selectListItems: SelectListItem[] // Record<text, value>
    handleChange: (event: React.ChangeEvent<any>) => any | void;
}

export function SelectComponent({title, state, selectListItems, handleChange}: IProp): JSX.Element {
    const classes = useStyles();

  console.log(selectListItems);

    return  <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-label">{title}</InputLabel>
          <Select labelId="demo-simple-select-label"
              autoWidth={true}
              value={state}
              onChange={event => handleChange(event)} > 
              <MenuItem value={undefined} divider>
                  <em>None</em>
              </MenuItem>
              {
                selectListItems.map((selectListItem, index) => <MenuItem value={selectListItem.value}>{selectListItem.text}</MenuItem>)
              }
          </Select>
    </FormControl>
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }),
);