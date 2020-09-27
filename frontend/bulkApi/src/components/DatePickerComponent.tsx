import React from "react";
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker} from '@material-ui/pickers';
import { v4 as guid } from 'uuid';

interface IProp {
    onChange: () => void;
    label: string;
}

export function DatePickerComponent({label, onChange}: IProp): JSX.Element {

    return <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="dd/MM/yyyy"
            margin="normal"
            id={guid()}
            label={label}
            value={new Date()}
            onChange={onChange}
            KeyboardButtonProps={{
                'aria-label': 'change date',
            }} />
    </MuiPickersUtilsProvider>
}