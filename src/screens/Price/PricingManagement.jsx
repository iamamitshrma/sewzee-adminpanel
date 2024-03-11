// PricingManagement.js

import React, { useState } from 'react';
import { Tabs, Tab } from '@mui/material';
import Price from './Price';

const PricingManagement = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <div>
      <Tabs value={selectedTab} onChange={handleTabChange} centered>
        <Tab label="Tailor Pricing" />
        <Tab label="Marketplace Pricing" />
      </Tabs>

      {selectedTab === 0 && <Price type="tailor" />}
      {selectedTab === 1 && <Price type="marketplace" />}
    </div>
  );
};

export default PricingManagement;
