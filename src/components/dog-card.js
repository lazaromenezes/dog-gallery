import { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { useFlags, useFlagsmith } from 'flagsmith/react';

import { v4 as uuidv4 } from 'uuid';

function getUser(){
  const KEY = 'user';

  let user = localStorage.getItem(KEY);

  if(user)
    return user;

  user = "ab-user-" + uuidv4();

  localStorage.setItem(KEY, user);

  return user;
}

async function fetchDogPicture(){
	const DOG_PICTURE_API = "https://dog.ceo/api/breeds/image/random";

	let request = new Request(DOG_PICTURE_API);

	let response = await fetch(request);

	return response.json();
}

async function fetchDogFact(){
	const DOG_FACT_API = "https://dog-api.kinduff.com/api/facts";

	let request = new Request(DOG_FACT_API);

	let response = await fetch(request);

	return response.json();
}

export default function DogCard() {

	const [pictureUrl, setPictureUrl] = useState("");
  const [dogFact, setDogFact] = useState("");
  
  const flagsmith = useFlagsmith();

  flagsmith.identify(getUser());
  
  const flags = useFlags(['show_dog_facts'], []);

  console.log(flags.show_dog_facts.value);

	useEffect( () => {
		async function fetchPicture() {
			let picture = await fetchDogPicture();
			setPictureUrl(picture.message);
		}

		fetchPicture();
	}, [pictureUrl.value]);

	useEffect( () => {
		async function fetchFact() {
			let response = await fetchDogFact();
			setDogFact(response.facts[0]);
		}

    if(flags.show_dog_facts.value)
      fetchFact();
	}, [dogFact.value, flags.show_dog_facts.value]);

  return (
    <Card>
      <CardMedia
        component="img"
        image={`${pictureUrl}`}
        alt="green iguana"
      />
      { flags.show_dog_facts && 
        <CardContent>
          <Typography variant="body2">{`${dogFact}`}</Typography>
        </CardContent>
      }
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
