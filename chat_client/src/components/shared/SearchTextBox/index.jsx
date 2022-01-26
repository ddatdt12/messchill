import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { styled } from '@mui/system';

const SearchTextBox = ({ placeholder }) => {
  return (
    <Container>
      <SearchIcon sx={{ color: 'gray' }} />
      <InputBase
        sx={{ ml: 0.5, flex: 1 }}
        placeholder={placeholder}
        inputProps={{ 'aria-label': placeholder }}
      />
    </Container>
  );
};

const Container = styled('div')(({ theme }) => ({
  padding: '7px 10px',
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  marginTop: theme.spacing(2),
  // border: '1px solid lightgray',
  borderRadius: 20,
  backgroundColor: theme.palette.textBox.main,
}));

export default SearchTextBox;
