import { Box, Tab, Tabs } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';

function a11yProps(index) {
  return {
    id: `setting-tab-${index}`,
    'aria-controls': `setting-tabpanel-${index}`,
  };
}

const CustomTabs = ({ tabLabels, render }) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    console.log(newValue);
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label='basic tabs example'>
          {tabLabels.map((t, i) => (
            <Tab label={t.label} {...a11yProps(i)} index={i} value={t.value} />
          ))}
        </Tabs>
      </Box>
      {render(value)}
    </Box>
  );
};
CustomTabs.propTypes = {
  tabLabels: PropTypes.arrayOf(PropTypes.string),
  tabPanels: PropTypes.arrayOf(PropTypes.node),
};
export default CustomTabs;
