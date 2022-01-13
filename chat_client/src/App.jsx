import { createTheme, ThemeProvider } from '@mui/material/styles';
import LoginPage from './pages/LoginPage';
import ChatPage from './pages/ChatPage';
import { Routes, Route, Navigate } from 'react-router-dom';
import RequireAuth from './pages/Auth';
import { AuthProvider } from './context/AuthContext';
import ChatSection from './pages/ChatPage/ChatSection';
import NewMessage from './pages/ChatPage/ChatSection/NewMessage';
// A custom theme for this app
const theme = createTheme({
  typography: {
    fontFamily: 'Public Sans, sans-serif',
  },
  palette: {
    neutral: {
      main: '#64748B',
      contrastText: '#fff',
    },
  },
});

const App = () => {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path='/' element={<Navigate to='/chat' replace />} />
          <Route path='/login' element={<LoginPage />} />
          <Route
            path='/chat'
            element={
              <RequireAuth>
                <ChatPage />
              </RequireAuth>
            }>
            <Route path=':id' element={<ChatSection />} />
            <Route path='new' element={<NewMessage />} />
          </Route>

          {/* <Route path='*' element={<Navigate to='/chat' replace />} /> */}
        </Routes>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;
