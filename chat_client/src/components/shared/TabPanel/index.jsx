import PropTypes from 'prop-types';
import React from 'react';

function TabPanel(props) {
  const { children, value, type, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== type}
      id={`setting-tabpanel-${type}`}
      aria-labelledby={`setting-tab-${type}`}
      {...other}>
      {value === type && children}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  type: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
};

export default TabPanel;
