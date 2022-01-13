import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { styled } from '@mui/system';

const SearchBar = () => {
  return (
    <Container>
      <SearchIcon sx={{ color: 'gray' }} />
      <InputBase
        sx={{ ml: 0.5, flex: 1 }}
        placeholder='Search contacts'
        inputProps={{ 'aria-label': 'search contacts' }}
      />
    </Container>
  );
};

const Container = styled('div')(({ theme }) => ({
  padding: '2px 4px',
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  marginTop: theme.spacing(2),
  border: '1px solid lightgray',
  borderRadius: 5,
}));

export default SearchBar;
