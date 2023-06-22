//import './App.css';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Memolist from './components/memolist'

function App() {
  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Typography variant='h6'>
            Memo
          </Typography>
        </Toolbar>
      </AppBar>
      <Memolist />
    </div>
  );
}

export default App;
