// pages/character/[id].js

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Box, Heading, Text, Spinner } from '@chakra-ui/react';
import axios from 'axios';

export default function CharacterDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      axios.get(`https://swapi.dev/api/people/${id}/`)
        .then(response => {
          setCharacter(response.data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching character details:', error);
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) {
    return <Spinner size="xl" />;
  }

  if (!character) {
    return <Text>No character data available</Text>;
  }

  return (
    <Box p={5}>
      <Heading>{character.name}</Heading>
      <Text>Height: {character.height}</Text>
      <Text>Mass: {character.mass}</Text>
      <Text>Hair Color: {character.hair_color}</Text>
      <Text>Skin Color: {character.skin_color}</Text>
      <Text>Eye Color: {character.eye_color}</Text>
      <Text>Birth Year: {character.birth_year}</Text>
      <Text>Gender: {character.gender}</Text>
      <Heading size="md" mt={4}>Films</Heading>
      <ul>
        {character.films.map((film, index) => (
          <li key={index}>{film}</li>
        ))}
      </ul>
    </Box>
  );
}
