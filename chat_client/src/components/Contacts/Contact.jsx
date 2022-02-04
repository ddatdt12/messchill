import { Avatar, Badge, Box, Typography } from '@mui/material';
import { styled } from '@mui/system';

const Contact = ({ user }) => {
  return (
    <Box display={'flex'} alignItems={'center'} justifyContent={'start'} my={2}>
      <StyledBadge
        overlap='circular'
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        variant='dot'
        isOnline={user.isOnline}>
        <Avatar alt='Remy Sharp' src={user.image} />
      </StyledBadge>
      <Typography fontSize={16} fontWeight={700} ml={2}>
        {user.name}
      </Typography>
    </Box>
  );
};

const StyledBadge = styled(Badge, {
  shouldForwardProp: (prop) => prop !== 'isOnline',
})(({ theme, isOnline }) => ({
  ...(isOnline && {
    '& .MuiBadge-badge': {
      backgroundColor: '#44b700',
      color: '#44b700',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    },
  }),
}));

export default Contact;
