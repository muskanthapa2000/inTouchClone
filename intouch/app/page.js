"use client"; 

import { FC, useState } from 'react';
import { Box , Tab } from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
// import Nav from './Nav';
import { useRouter } from 'next/navigation';
import Nav from './Nav';
import Leads from './Leads';
import TopicsBreakdown from './TopicsBreakdown';
// import Leads from './Leads';

export default function Home() {
  const [value, setValue] = useState('1');
  const route = useRouter()

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleTabClick = () => {
    route.push('/leads');
  };
  return (
    <>
  <Nav/>
    <Box sx={{ width: '100%', typography: 'body1' }}>
    <TabContext value={value}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <TabList onChange={handleChange} aria-label="lab API tabs example">
          <Tab label="Leads" value="1"/>
          <Tab label="Item Two" value="2" />
        </TabList>
      </Box>
      <TabPanel value="1"><Leads/></TabPanel>
      <TabPanel value="2"><TopicsBreakdown/></TabPanel>
    </TabContext>
  </Box>
    </>
  );
}
