"use client"; 

import { Button, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import {useDispatch , useSelector} from 'react-redux';
import { setFilterData , applyFilterData , setSearchQuery} from '../store/action';
import styles from './Nav.module.scss';

const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
  ))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&::before': {
      display: 'none',
    },
  }));

  const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
      expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
      {...props}
    />
  ))(({ theme }) => ({
    backgroundColor:
      theme.palette.mode === 'dark'
        ? 'rgba(255, 255, 255, .05)'
        : 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
      transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
      marginLeft: theme.spacing(1),
    },
  }));

  const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
  }));

function Filter() {

    const [expanded, setExpanded] = useState('panel1');
    const [selectedFilters, setSelectedFilters] = useState({});
    const [selectedItems, setSelectedItems] = useState({});

    const handleChange =
      (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
      };
    const dispatch = useDispatch();
      const filterData = useSelector((state)=> state.filter.filterData);
      const searchQuery = useSelector((state)=> state.filter.searchQuery);
      console.log(searchQuery);

      const handleFilterFetch = async ()=>{
        try {
            const countryFetch = await axios.get(`http://localhost:3000/country`)
            const jobFetch = await axios.get(`http://localhost:3000/jobfunction`)
            dispatch(  setFilterData({
              country: countryFetch.data,
              jobfunction: jobFetch.data,
            }))
            console.log(countryFetch.data , jobFetch.data);
        } catch (error) {
            console.error(error);
        }
      }

      const handleFilterSelect = (category, value) => {
        setSelectedItems((prev) => ({
          ...prev,
          [category]: prev[category]?.includes(value)
            ? prev[category].filter((item) => item !== value)
            : [...(prev[category] || []), value],
        }));
        setSelectedFilters((prev) => ({
          ...prev,
          [category]: prev[category] === value ? null : value, // Allow deselecting
        }));
      };
      
      const handleApplyFilter = () => {
        dispatch(applyFilterData(selectedFilters));
      };
      
      const handleSearch = () => {
        dispatch(setSearchQuery(searchQuery));
      };
    
      useEffect(()=>{
        handleFilterFetch();
      } , [])
  
  return (
    <div>
       <div style={{ paddingLeft: "14px", paddingRight: "14px" }}>
        <h4 className="filter-title">Filter Your Search</h4>
        <TextField
          id="standard-search"
          label="Search by lead name"
          type="search"
          variant="standard"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
          <Button variant="contained" onClick={handleSearch}>Search</Button>
      </div>


      <div className={styles.filterData}>
      {Object.keys(filterData).map((key, index) => (
        <Accordion
          key={key}
          expanded={expanded === `panel${index + 1}`}
          onChange={handleChange(`panel${index + 1}`)}
        >
          <AccordionSummary
            aria-controls={`panel${index + 1}d-content`}
            id={`panel${index + 1}d-header`}
          >
            <Typography>{filterData[key][0]?.label}</Typography>
          </AccordionSummary>
          <AccordionDetails className={styles.childData}>
            {filterData[key][0]?.children.map((child) => (
              <Typography 
                key={child.key} 
                onClick={() => handleFilterSelect(key, child.label)}
                style={{
                  cursor: 'pointer',
                  color: selectedItems[key]?.includes(child.label) ? 'blue' : 'black',
                }}>{child.label}</Typography>
            ))}
          </AccordionDetails>
        </Accordion>
      ))}
    </div>

    <div className={styles.buttonComtainer}>
      <Button onClick={handleApplyFilter} > Click here</Button>
    </div>

    </div>
  )
}

export default Filter;
