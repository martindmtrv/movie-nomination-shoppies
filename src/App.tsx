import { 
  Alert,
  AlertIcon,
  ChakraProvider,
  Container,
  FormLabel, 
  Grid,
  GridItem, 
  Heading,
  Input,
  Textarea
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import "./App.css";
import type { OMDBMovie } from './interfaces/OMDBMovie';
import { MovieStack } from './MovieStack';
import SearchBar from './SearchBar';

const API_URL = "http://www.omdbapi.com/";
const API_KEY = "5abc59cd";

function createExampleMovies(n: number): OMDBMovie[] {
  return Array.from(new Array(n), (v, i) => ({ Title: `Movie ${i}`, Year: `${2000 + i}`, imdbID: `${i}` })) as OMDBMovie[];
}


function App() {
  // setup the state for the application
  const [results, setResults] = useState(createExampleMovies(10));
  const [selected, setSelected] = useState([] as OMDBMovie[]);
  const [query, setQuery] = useState("");

  // see if we are loading in a completed nomination list (from query params)
  useEffect(() => {
    const index = (window.location.href as string).indexOf("nominations=");
    if (index !== -1) {
      const ids = new Set((window.location.href as string).substring(index + 12).split(","));
      
      // ensure there's no duplicates
      if (ids.size === 5) {
        const movieRequests: Promise<Response>[] = [];
        //ids.forEach(id => movieRequests.push(fetch(`${API_URL}?i=${id}&apikey=${API_KEY}`)));

        Promise.all(movieRequests)
          .then(responses => Promise.all(responses.map(res => res.json())))
          .then(movies => movies.some(movie => movie.Response === "False") ? setSelected([]) :setSelected(movies as OMDBMovie[]))
          .catch(err => alert(`Invalid URL! ${err}`))
      }
    }
  }, []);

  const nominationUrl = `${window.location.origin + window.location.pathname}?nominations=${selected.reduce((ids, movie, i) => ids + (i > 0 ? ",": "") + movie.imdbID, "")}`;

  return (
    <ChakraProvider>
      <div className="app">
        <Heading>The Shoppies</Heading>
        <br />
        <Grid h="500px" w="80%" templateRows="repeat(8, 1fr)" templateColumns="repeat(5, 1fr)" gap={4} padding={4}>
          <GridItem rowSpan={1} colSpan={5}>
            <Container className="border" maxW="100%">
              <FormLabel>Movie Title</FormLabel>
              <SearchBar onSearch={(value) => setQuery(value)} />
            </Container>
          </GridItem>
          <GridItem rowSpan={7} colSpan={3}>
            <Container className="border" maxW="100%">
              <Heading size="m">Search Results</Heading>
              <MovieStack 
                isDisabled={selected.length >= 5}
                buttonDisabled={(movie) => selected.some(m => m.imdbID === movie.imdbID)}
                movies={results} 
                buttonText={"Select"} 
                onClick={(movie) => setSelected([...selected, movie])}
              />
            </Container>
          </GridItem>
          <GridItem rowSpan={7} colSpan={2}>
            <Container className="border" maxW="100%">
              <Heading size="m">Nominations</Heading>
              <MovieStack
                movies={selected}
                buttonText={"Remove"}
                onClick={(movie) => setSelected(selected.filter(m => movie.imdbID !== m.imdbID))}
              />
            </Container>
          </GridItem>
        </Grid>
      </div>
      {selected.length === 5 && (
          <Alert variant="top-accent" status="success" className="banner">
            <AlertIcon />
            <div className="banner-contents">
              Nomination is complete!
              <Input readOnly variant="filled" value={nominationUrl} w="40%" />
            </div>
            
          </Alert>
        )}
    </ChakraProvider>
  );
}

export default App;
