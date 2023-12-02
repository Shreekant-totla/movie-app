import React, { useEffect, useState } from "react";
import Axios from "axios";
import styled from "styled-components";
import MovieCard from "./MovieCard";
import MovieDetailPage from "./MovieDetailPage";
import Login from "./Login";

export const API_KEY = "a2c2b03";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const AppName = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Header = styled.div`
  background-color: black;
  color: white;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  padding: 10px;
  font-size: 25px;
  font-weight: bold;
  box-shadow: 0 3px 6px 0 #555;
`;

const SearchBox = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px 10px;
  border-radius: 6px;
  margin-left: 20px;
  width: 50%;
  background-color: white;
`;

const SearchIcon = styled.img`
  width: 32px;
  height: 32px;
`;

const MovieImage = styled.img`
  width: 48px;
  height: 48px;
  margin: 15px;
`;

const SearchInput = styled.input`
  color: black;
  font-size: 16px;
  font-weight: bold;
  border: none;
  outline: none;
  margin-left: 15px;
`;

const MovieListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 25px;
  padding: 30px;
  justify-content: space-evenly;
`;

const Placeholder = styled.img`
  width: 120px;
  height: 120px;
  margin: 150px;
  opacity: 50%;
`;

const Button = styled.button`
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
`;

function App() {
  const [searchQuery, updateSearchQuery] = useState("");
  const [movieList, updateMovieList] = useState([]);
  const [selectedMovie, onMovieSelect] = useState();
  const [timeoutId, updateTimeoutId] = useState();
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState(null);

console.log(user,"user")
  const fetchData = async (searchString) => {
    const response = await Axios.get(
      `https://www.omdbapi.com/?s=${searchString}&apikey=${API_KEY}`
    );
    updateMovieList(response.data.Search);
  };

  useEffect(() => {
    const defaultSearchString = "Avengers";
    fetchData(defaultSearchString);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [searchQuery]);

  const onTextChange = (e) => {
    const inputText = e.target.value;
    onMovieSelect("");
    clearTimeout(timeoutId);
    updateSearchQuery(inputText);

    if (inputText.trim() === "") {
      fetchData("Avengers");
    } else {
      const timeout = setTimeout(() => fetchData(inputText), 50);
      updateTimeoutId(timeout);
    }
  };

  const handleLogin = () => {
    setAuth(true);
  };

  const redirectToLogin = () => {
    setAuth(true);
  };

  const handleLogout = () => {
    setAuth(false);
    setUser(null); // Clear user information on logout
  };
  
  return (
    <Container>
      <Header>
        <AppName>
          <MovieImage src="/react-movie-app/movie-icon.png" />
          React Movie App
        </AppName>
        <SearchBox>
          <SearchIcon src="/react-movie-app/search-icon.svg" />
          <SearchInput
            placeholder="Search Movie"
            value={searchQuery}
            onChange={onTextChange}
          />
        </SearchBox>
        {auth ? (
          user ? (
            // Display user's name after successful login
            <Button onClick={handleLogout}>{`Logout ${user.username}`}</Button>
          ) : (
            <Login auth={auth} onClose={handleLogin} redirectToLogin={redirectToLogin} setUser={setUser} />
          )
        ) : (
          <Button onClick={handleLogin}>Login / SignUp</Button>
        )}
      </Header>
      {selectedMovie && (
        <MovieDetailPage
          selectedMovie={selectedMovie}
          onMovieSelect={onMovieSelect}
        />
      )}
      <MovieListContainer>
        {movieList?.length ? (
          movieList.map((movie, index) => (
            <MovieCard
              key={index}
              movie={movie}
              onMovieSelect={onMovieSelect}
            />
          ))
        ) : (
          <Placeholder src="/react-movie-app/movie-icon.svg" />
        )}
      </MovieListContainer>
    </Container>
  );
}

export default App;
