import { useContext, useEffect, useState } from "react";
import { fetchPokemonData, fetchAllPokemonData } from "./server/server";
import { createGlobalStyle, styled } from 'styled-components';
import { ThemeContext } from "./theme/theme";
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from "./components/header/header";
import PokemonList from "./components/pokemonsList/pokemonsList";
import PokemonDetail from "./routes/pokemonDetails";
import LoadingSpinner from "./components/loading/loadingSpinner";

const App = () => {
  const { isDarkMode, setDarkMode } = useContext(ThemeContext);
  const [data, setData] = useState([]);
  const [allPokemonData, setAllPokemonData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);
  const [filtersActive, setFiltersActive] = useState(false);
  const [error, setError] = useState(null);
  const [offset, setOffset] = useState(0);
  const [pokemonName, setPokemonName] = useState('');
  const [searchError, setSearchError] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const location = useLocation();
  const limit = 10;

  const toggleDarkMode = (checked) => {
    setDarkMode(checked);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pokemonData = await fetchPokemonData(offset, limit);
        if (!initialLoadComplete) {
          setData(pokemonData);
          setFilteredData(pokemonData);
          setInitialLoadComplete(true);
        } else {
          const newData = [...data, ...pokemonData];
          setData(newData);
          setFilteredData(newData);
        }
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [offset]);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const allData = await fetchAllPokemonData();
        setAllPokemonData(allData);
      } catch (error) {
        console.error('Erro ao buscar todos os dados: ', error);
      }
    };

    fetchAllData();
  }, []);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setPokemonName(value);
    setSearchError('');
    filterData(value, selectedType);
    setFiltersActive(value.length > 0 || selectedType.length > 0);
  };

  const handleTypeChange = (event) => {
    const type = event.target.value;
    setSelectedType(type);
    filterData(pokemonName, type);
    setFiltersActive(pokemonName.length > 0 || type.length > 0);
  };

  const filterData = (name, type) => {
    let filtered = allPokemonData;

    if (name) {
      filtered = filtered.filter(pokemon => pokemon.name.toLowerCase().includes(name.toLowerCase()));
    }

    if (type) {
      filtered = filtered.filter(pokemon => pokemon.types.includes(type.toLowerCase()));
    }

    if (filtered.length === 0 && name) {
      setSearchError('Pokémon não encontrado');
    } else {
      setSearchError('');
    }

    setFilteredData(filtered);
  };

  const handleSearch = () => {
    if (pokemonName === '') {
      setFilteredData(data);
      setSearchError('');
      alert("fill in the field with a pokemon name");
    } else {
      const filtered = allPokemonData.filter(pokemon => pokemon.name.toLowerCase().includes(pokemonName.toLowerCase()));
      if (filtered.length === 0) {
        setSearchError('Pokémon não encontrado');
      } else {
        setSearchError('');
        setFilteredData(filtered);
      }
    }
  }

  const loadMorePokemon = () => {
    setOffset(prevOffset => prevOffset + limit);
  };

  if (loading && !initialLoadComplete) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div>Error fetching data: {error.message}</div>;
  }

  return (
    <div>
      <GlobalStyle />
      <Header toggleDarkMode={toggleDarkMode}
        isDarkMode={isDarkMode}
        location={location}
        pokemonName={pokemonName}
        handleInputChange={handleInputChange}
        handleSearch={handleSearch}
        selectedType={selectedType}
        handleTypeChange={handleTypeChange} />
      <Container>
        <Routes>
          <Route path="/" element={
            <>
              {searchError && <ErrorMessage>{searchError}</ErrorMessage>}
              <PokemonList filteredData={filteredData} loadMorePokemon={loadMorePokemon} dataLength={data.length} filtersActive={filtersActive} />
            </>
          } />
          <Route path="/pokemon/:name" element={<PokemonDetail />} />
        </Routes>
      </Container>
    </div>
  );
};

const GlobalStyle = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  *::-webkit-scrollbar {
 	  width: 15px;
  }

  *::-webkit-scrollbar-track {
 	  background: ${({ theme }) => theme.toggleBorder};
  }

  *::-webkit-scrollbar-thumb {
 	  background-color: ${({ theme }) => theme.text};
 	  border-radius: 10px;
 	  border: 3px solid ${({ theme }) => theme.toggleBorder};
  }

  ul {
    list-style: none;
  }
  
  a {
    text-decoration: none;
    color: inherit;
  }
  
  body {
    position: relative;
    background: ${({ theme }) => theme.body} no-repeat center center;
    background-size: cover;
    color: ${({ theme }) => theme.text};
    transition: all 0.50s linear;
    font-family: 'Poppins', sans-serif;
  }

  body::after{
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: ${({ theme }) => theme.opacity};
    pointer-events: none;
    z-index: -1;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ErrorMessage = styled.div`
  color: red;
  margin-top: 20px;
  text-align: center;
  font-size: 40px;
`;

export default App;