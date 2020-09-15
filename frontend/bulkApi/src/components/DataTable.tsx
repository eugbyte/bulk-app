import MaterialTable from 'material-table';
import React from "react"; 

import { forwardRef } from 'react';

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';

import { Icons } from 'material-table';
import  { SvgIconTypeMap } from "@material-ui/core/SvgIcon";
import { OverridableComponent } from '@material-ui/core/OverridableComponent';

interface IProp {
  title: string,
  data: any[];
  columnNames: any[];
  accessors: string[];
  handleChecked?: (rowIds: number[]) => any;
  idColumnAccessorName?: string; //to hide the id column,
  pageSize?: number;
  actionIcon?: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
  enableSearch?: boolean;
  enablePaging?: boolean;
  enableSelection?: boolean;
  actionMessage?: string;
  detailPanelFielddName?: string; //To render the detail panel
}

 
export function DataTable({title, data, columnNames, accessors, handleChecked=defaultHandleChecked, idColumnAccessorName="", pageSize=5, actionIcon,
  enablePaging=false, enableSearch=false, actionMessage="Action", enableSelection=false, detailPanelFielddName=""  }: IProp): JSX.Element {

  let headerDicts: any[] = [];
    for(let i = 0; i < columnNames.length; i++) {
        let header: string = columnNames[i];
        let accessor: string = accessors[i];    
        let headerDict: any = {
            "title": header,
            "field": accessor,
            "hidden": accessor === idColumnAccessorName
        }; 
        headerDicts.push(headerDict);
    } 

    return (
      <div> 
        <MaterialTable        
          icons={tableIcons}
            title={title}
            columns={headerDicts}
            data={data}        
            options={{
              selection: enableSelection,
              pageSize: pageSize,
              search: enableSearch,
              paging: enablePaging,
              rowStyle:{
                height: "100px"
              },
            
            }}
            detailPanel={rowData => returnDetailTable(rowData, detailPanelFielddName)}
            
      />
      </div>
    )
}

  // There is a bug with Material Table where the table is fully rerendered on parent state update since 1.53.0
  // https://github.com/mbrn/material-table/issues/1265 
function returnDetailTable(rowData: any, detailPanelFielddName: string): JSX.Element {
  console.log(rowData);
  return rowData[detailPanelFielddName] as JSX.Element;
}

const defaultHandleChecked = (val?: any) => {};
  
const tableIcons = {
  Add: forwardRef<any, Icons>((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef<any, Icons>((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef<any, Icons>((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef<any, Icons>((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef<any, Icons>((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef<any, Icons>((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef<any, Icons>((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef<any, Icons>((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef<any, Icons>((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef<any, Icons>((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef<any, Icons>((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef<any, Icons>((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef<any, Icons>((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef<any, Icons>((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef<any, Icons>((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef<any, Icons>((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef<any, Icons>((props, ref) => <ViewColumn {...props} ref={ref} />),
  AddShoppingCartIcon: forwardRef<any, Icons>((props, ref) => <AddShoppingCartIcon {...props} ref={ref} />)
};