import Box from '@mui/material/Box';
import DogCard from './dog-card.js';

export default function DogList() {
  return (
			<Box sx={{ width: '100%', paddingTop: "50px"}}>
				<DogCard></DogCard>	
			</Box>
  );
}
