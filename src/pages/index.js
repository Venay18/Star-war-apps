import { useState, useEffect } from 'react';
import { Box, Grid, Button, Link as ChakraLink } from '@chakra-ui/react';
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);
  const [favorites, setFavorites] = useState([]);

  // Fetch favorites from localStorage on the client-side
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
      setFavorites(storedFavorites);
    }
  }, []);

  useEffect(() => {
    axios.get(`https://swapi.dev/api/people/?page=${page}`)
      .then(response => {
        setCharacters(response.data.results);
      });
  }, [page]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
  }, [favorites]);

  const toggleFavorite = (character) => {
    setFavorites(prevFavorites => {
      if (prevFavorites.includes(character.name)) {
        return prevFavorites.filter(fav => fav !== character.name);
      } else {
        return [...prevFavorites, character.name];
      }
    });
  };

  return (
    <Box>
      <Grid templateColumns="repeat(3, 1fr)" gap={6}>
        {characters.map(character => (
          <Box key={character.name} borderWidth="1px" borderRadius="lg" overflow="hidden">
            <Image
              src={`https://starwars-visualguide.com/assets/img/characters/${character.url.match(/(\d+)/)[0]}.jpg`}
              alt={character.name}
              width={500}
              height={500}
              layout="responsive"
            />
            <Box p="6">
              <Box d="flex" alignItems="baseline">
                <Button onClick={() => toggleFavorite(character)}>
                  {favorites.includes(character.name) ? 'Unfavorite' : 'Favorite'}
                </Button>
              </Box>
              <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" isTruncated>
                <Link href={`/character/${character.url.match(/(\d+)/)[0]}`} passHref>
                  <ChakraLink color="teal.500" _hover={{ textDecoration: 'underline' }}>{character.name}</ChakraLink>
                </Link>
              </Box>
            </Box>
          </Box>
        ))}
      </Grid>
      <Button onClick={() => setPage(page - 1)} disabled={page === 1}>Previous</Button>
      <Button onClick={() => setPage(page + 1)}>Next</Button>
    </Box>
  );
}
