import { ThemeProvider } from '@mui/material/styles';
import { theme } from 'assets/theme';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import RequireAuth from './pages/Auth/RequireAuth';
import Chat from './pages/Chat';
import ChatSection from './components/Chat/ChatSection';
import NewConversation from './components/Chat/NewConversation';
import Login from './pages/Auth/Login';
import Auth from './pages/Auth';
import NewGoogleAccount from 'pages/Auth/NewGoogleAccount';

const App = () => {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path='/' element={<Navigate to='/chat' replace />} />
          <Route path='/authentication' element={<Auth />}>
            <Route path='login' element={<Login />} />
            {/* <Route path='register' element={<Register />} /> */}
            <Route path='new/google' element={<NewGoogleAccount />} />
          </Route>
          <Route
            path='/chat'
            element={
              <RequireAuth>
                <Chat />
              </RequireAuth>
            }>
            <Route path=':conversationId' element={<ChatSection />} />
            <Route path='new' element={<NewConversation />} />
          </Route>

          {/* <Route path='*' element={<Navigate to='/chat' replace />} /> */}
        </Routes>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;
