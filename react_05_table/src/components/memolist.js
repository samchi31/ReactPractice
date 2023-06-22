import React, {useState, useEffect} from "react";
import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import {DataGrid} from '@mui/x-data-grid';
import { Snackbar } from "@mui/material";

function Memolist(){
    const [memos, setMemos] = useState([]);
    const [open, setOpen] = useState(false);
    useEffect(() => {
        fetchList();
    },[]);

    const fetchList = () => {
        fetch('http://localhost:8080/list')
            .then(response => response.json())
            .then(data => {console.log(data);setMemos(data)})
            .catch(err => console.error(err));
    }

    const onDelClick = (key) => {
        // console.log(key);
        fetch('http://localhost:8080/delete/'+key)
        .then(response => response.text())
        .then(data => {
            fetchList();
            setOpen(true);
        })
        .catch(err => console.error(err));
    }

    const column = [
        {field : 'key'},
        {field : 'title'},
        {field : 'writer'},
        {field : 'content'},
        {field : 'delete', sortable:false, filterable:false, 
            renderCell: row =>
                <button onClick={()=>{ onDelClick(row.id)}}>Delete</button>
        }
    ]
    return(
        <>
            <div className="ag-theme-alpine" style={{height: 400, width: 1000}}>
                <AgGridReact rowData={memos} columnDefs={column}/>
            </div>
            <div style={{height: 400, width: 1000}}>
                <DataGrid 
                    rows={memos} columns={column}
                    getRowId={ row => row.key}/>
            </div>
            <Snackbar open={open} autoHideDuration={2000} 
                onClose={() => { setOpen(false)}} message="Deleted" />
        </>
    )
}

export default Memolist;