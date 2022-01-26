import React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';

const AsyncSearchInput = ({ label, value, setValue, asyncFunc }) => {
  const [open, setOpen] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }
    (async () => {
      try {
        if (active) {
          const res = await asyncFunc();
          setOptions([...res.data]);
          setError(null);
        }
      } catch (error) {
        if (active) {
          setOptions([]);
          setError(error?.response?.data?.message || 'Server Error!');
        }
      }
    })();

    return () => {
      active = false;
    };
  }, [loading, asyncFunc]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <Autocomplete
      id='asynchronous-friend-chat'
      sx={{ width: 300 }}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      value={value}
      onChange={(_, newValue) => {
        setValue(newValue);
      }}
      isOptionEqualToValue={(option, value) => option.name === value.name}
      getOptionLabel={(option) => option.name || ''}
      options={options}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          error={!!error}
          helperText={error}
          label={label ?? 'Place holder'}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? (
                  <CircularProgress color='inherit' size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
};

export default AsyncSearchInput;
