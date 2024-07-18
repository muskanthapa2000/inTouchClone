"use client"; 

import React, { useEffect, useState } from 'react'
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import styles from './Nav.module.scss';
import axios from 'axios';
import {useDispatch , useSelector} from 'react-redux';
import { setTableData } from '@/store/action';

function Table() {
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 130 },
    { field: 'jobfunction', headerName: 'Job Function', width: 160 },
    { field: 'country', headerName: 'Country', width: 130 },
    { field: 'company', headerName: 'Company', width: 160 },
  ];


  const dispatch = useDispatch();
  const tableData = useSelector((state)=> state.table.tableData);
  const appliedFilters = useSelector((state) => state.filter.appliedFilters);
  const [filteredData, setFilteredData] = useState([]);
  const searchQuery = useSelector((state) => state.filter.searchQuery);
  console.log(tableData);

  const handleTableFetch = async ()=>{ 
    try {
        const response = await axios.get('http://localhost:3000/leads');
        const data = response.data[0].data;
        dispatch(setTableData(data));
        setFilteredData(data);
        console.log(data);
    } catch (error) {
        console.error(error);
    }
  }

  useEffect(()=>{
    handleTableFetch();
  } , []);

  // useEffect(() => {
  //   if (Object.keys(appliedFilters).length > 0) {
  //     const filtered = tableData.filter((item) => {
  //       return Object.entries(appliedFilters).every(([key, value]) =>
  //         item[key].includes(value)
  //       );
  //     });
  //     setFilteredData(filtered);
  //   }
  //   //  else if (searchQuery) {
  //   //       filtered = tableData.filter((item) =>
  //   //         item.name.toLowerCase().includes(searchQuery.toLowerCase())
  //   //       );
  //   //     }
  //   else  {
  //     setFilteredData(tableData);
  //   }
  // }, [appliedFilters, tableData , searchQuery]);

  useEffect(() => {
    let filtered = tableData;
    console.log(filtered)
    if (Object.keys(appliedFilters).length > 0) {
      filtered = filtered.filter((item) => {
        return Object.entries(appliedFilters).every(([key, value]) =>
          value ? item[key].includes(value) : true
        );
      });
    }
    if (Object.keys(searchQuery).length > 0) {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    setFilteredData(filtered);
  }, [appliedFilters, searchQuery, tableData]);

  return (
    <div>
     <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={filteredData}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
    </div>
  )
}

export default Table
