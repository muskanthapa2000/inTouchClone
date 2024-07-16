"use client"; 

import React from 'react';
import styles from './Nav.module.scss';
import Filter from './Filter';
import Table from './Table';

function Leads() {
  return (
    <div className={styles.LeadsMainContainer}>
      <div className={styles.FilterMainContainer}><Filter/></div>
      <div className={styles.TableMainContainer}><Table/></div>
    </div>
  )
}

export default Leads
