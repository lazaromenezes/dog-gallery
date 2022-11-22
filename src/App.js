import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import DogList from './components/dog-list.js'

function App() {
  return (
		<Box sx={{ width: '100%', maxWidth: 500 }}>
			<Typography variant="h1">Dog Gallery</Typography>
			<DogList />
		</Box>
  );
}

export default App;
