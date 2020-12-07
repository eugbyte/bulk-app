import React from "react";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { SelectListItem } from "../../models/SelectListItem";
import { Control, Controller, DeepMap, FieldError } from "react-hook-form";
import { FormHelperText } from "@material-ui/core";

interface IPropUncontrolled {
    title: string;
    name: string,
    selectListItems: SelectListItem[] // Record<text, value>,
    errorMessage?: string,
    defaultValue?: string,
    formHelperText?: string
    control: Control<Record<string, any>>,
    errors: DeepMap<Record<string, any>, FieldError>,
    rules: object
}

// For Select field used in React Hook Forms. React Hook forms are uncontrolled, i.e. no state
// The data for each input element is stored in the DOM, not in the component. 
// React hook forms library uses a ref behind the scenes to retrieve the data
export function SelectUncontrolledComponent({title, selectListItems,
  name, errorMessage="", defaultValue="", control, errors, rules}: IPropUncontrolled): JSX.Element {

  let isError = errors[name] != null ? true : false;

  return  <Controller
    name={name}
    defaultValue={defaultValue}
    control={control}
    rules={rules}
    render={props => <SelectControlledComponent title={title} state={props.value} selectListItems={selectListItems} 
      handleChange={props.onChange} formHelperText={errorMessage} isError={isError} {...props} />  
    } />
}

interface IPropControlled {
  title: string;
  state: any;
  selectListItems: SelectListItem[] // Record<text, value>
  handleChange: (event: React.ChangeEvent<any>) => any | void;
  isError?: boolean;
  formHelperText?: string
}
  
// For controlled forms
// In a controlled component, the form data is handled by the state within the component.
export function SelectControlledComponent({title, state, selectListItems, handleChange, isError=false, formHelperText=""}: IPropControlled): JSX.Element {
    const classes = useStyles();

    return  <FormControl className={classes.formControl} error={isError}>
          <InputLabel id="demo-simple-select-label">{title}</InputLabel>
          <Select labelId="demo-simple-select-label"
              autoWidth={true}
              value={state}
              onChange={event => handleChange(event)} > 
              <MenuItem value={undefined} divider>
                  <em>None</em>
              </MenuItem>
              {
                selectListItems.map((selectListItem, index) => <MenuItem key={index} value={selectListItem.value}>{selectListItem.text}</MenuItem>)
              }
          </Select>
          { isError &&
            <FormHelperText>{formHelperText}</FormHelperText>
          }
          
    </FormControl>
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      //margin: theme.spacing(1),
      minWidth: 150,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }),
);