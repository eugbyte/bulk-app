export class SelectListItem {
    disabled: boolean = false;
    selected: boolean = false;
    text: string = "";
    value: any;


    constructor(text = "", value: any) {
        this.text = text;
        this.value = value;
    }
}