import { Chip } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import * as React from 'react';

export default function MultipleSelect(props) {
  const { label, asyncFunc, getOptionLabel, filterOptions, onChange } =
    props;

  const [open, setOpen] = React.useState(false);
  const [values, setValues] = React.useState([]);
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      const { error, data } = await asyncFunc();

      if (active && !error) {
        setOptions([...data]);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading, asyncFunc]);

  React.useEffect(() => {
    // if (!open) {
    //   setOptions([]);
    // }
  }, [open]);
  return (
    <Autocomplete
      multiple
      id='tags-outlined'
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      options={options}
      getOptionLabel={getOptionLabel}
      fullWidth
      value={values}
      onChange={(_, newValues) => {
        setValues(newValues);
        onChange(newValues);
      }}
      filterSelectedOptions
      filterOptions={filterOptions}
      loading={loading}
      renderInput={(params) => (
        <TextField {...params} label={label} placeholder={label} />
      )}
    />
  );
}
