import { useContext, useEffect, useState } from "react"
import { DarkModeSwitch } from "react-toggle-dark-mode";
import { fetchPokemonData, fetchAllPokemonData } from "./server/server";
import { createGlobalStyle, styled } from 'styled-components'
import { ThemeContext } from "./theme/theme";
import { Routes, Route, Link } from 'react-router-dom';
import PokemonDetail from "./routes/pokemonDetails";
import logoPokemon from "/logo-pokemon.png";
import typeColors from "./components/typeColors/typeColors";
import { FiSearch } from 'react-icons/fi';

const allTypes = [
  'Normal', 'Fire', 'Water', 'Grass', 'Electric', 'Ice', 'Fighting', 'Poison', 'Ground', 
  'Flying', 'Psychic', 'Bug', 'Rock', 'Ghost', 'Dark', 'Dragon', 'Steel', 'Fairy'
];

function App() {
  const { isDarkMode, setDarkMode } = useContext(ThemeContext);
  const [data, setData] = useState([]);
  const [allPokemonData, setAllPokemonData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [offset, setOffset] = useState(0);
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);
  const [pokemonName, setPokemonName] = useState('');
  const [searchError, setSearchError] = useState('');
  const [selectedType, setSelectedType] = useState('');
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
          // setData(prevData => [...prevData,...pokemonData]);
          const newData = [...data,...pokemonData];
          setData(newData)
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

  const handleInputChange = (e) => {
    const value = e.target.value;
    setPokemonName(value);
    setSearchError('');
    filterData(value, selectedType);
  };

  const handleTypeChange = (e) => {
    const type = e.target.value;
    setSelectedType(type);
    filterData(pokemonName, type);
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
      alert("Digite um nome!")
    } else {
      const filtered = allPokemonData.filter(pokemon => pokemon.name.toLowerCase().includes(pokemonName.toLowerCase()));
      if(filtered.length === 0) {
        setSearchError('Pokémon não encontrado');
      } else {
        setSearchError('');
        setFilteredData(filtered);
      }
      setFilteredData(filtered);
    }
  }

  if (loading && !initialLoadComplete) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>Erro ao buscar dados: {error.message}</div>;
  }

  const loadMorePokemon = () => {
    setOffset(prevOffset => prevOffset + limit);
  };

  return (
    <div>
      <GlobalStyle />
      <Header >
        <Link to="/"><ImageLogo src={logoPokemon} alt="logo" /></Link>
        <SearchPokemons>
          <Search>
            <InputSearch
            type="text"
            value={pokemonName}
            onChange={handleInputChange}
            placeholder="Enter the Pokémon's name"
            />
            <ButtonSearch onClick={handleSearch}><FiSearch size={25} /></ButtonSearch>
          </Search>
          <Select>
          <label htmlFor="select-type">Select a type:</label>
          <SelectFilter value={selectedType} onChange={handleTypeChange} id="select-type">
          <option value="">All types</option>
            {allTypes.map(type => (
              <Option key={type} value={type.toLowerCase()} type={type.toLowerCase()}>{type}</Option>
            ))}
          </SelectFilter>
          </Select>
        </SearchPokemons>
        <DarkModeSwitch
          checked={isDarkMode}
          onChange={toggleDarkMode}
          size={50}
          />
      </Header>
      <Container>
      {/* <PokemonList>
        {data.map((item, index) => (
          <PokemonItem key={`${item.name}-${offset + index}`}>
            <Link href="">
              <ImagePokemon src={item.url} alt={item.name} />
              <TypeList>
                {item.types.map((type, idx) => (
                  <TypePokemon key={`${type}-${idx}`}>{type}</TypePokemon>
                ))}
              </TypeList>
              <NamePokemon>{item.name}</NamePokemon>
            </Link>
          </PokemonItem>
        ))}
      </PokemonList>
      {data.length < 200 && (
        <LoadMoreButton onClick={loadMorePokemon}>Carregar Mais Pokémons</LoadMoreButton>
      )} */}
      <Routes>
          <Route path="/" element={
            <>
              {searchError && <ErrorMessage>{searchError}</ErrorMessage>}
              <PokemonList>
                {filteredData.map((item, index) => (
                  <PokemonItem key={`${item.name}-${index}`} types={item.types}>
                    <StyledLink to={`/pokemon/${item.name}`}>
                      <ImagePokemon src={item.url} alt={item.name.charAt(0).toUpperCase() + item.name.slice(1).toLowerCase()} />
                      <TypeList>
                        {item.types.map((type, idx) => (
                          <TypePokemon key={`${type}-${idx}`} type={type}>{type}</TypePokemon>
                        ))}
                      </TypeList>
                      <NamePokemon>{item.name.charAt(0).toUpperCase() + item.name.slice(1).toLowerCase()}</NamePokemon>
                    </StyledLink>
                  </PokemonItem>
                ))}
              </PokemonList>
              {pokemonName === '' && selectedType === '' && data.length < 400 && (
                <LoadMoreButton onClick={loadMorePokemon}>Carregar Mais Pokémons</LoadMoreButton>
              )}
            </>
          } />
          <Route path="/pokemon/:name" element={<PokemonDetail />} />
        </Routes>
    </Container>
  </div>
  )
}

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
	  border: 3px solid #1F252E;
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
`
const SearchPokemons = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-top: 10px;
  max-width: 520px;
`

const Select = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  
  label {
    font-size: 20px;
    margin-bottom: 1px;
    margin-left: -2px;
  }
`

const SelectFilter = styled.select`
  width: 150px;
  background-color: ${({ theme }) => theme.opacity};
  border: none;
  font-size: 20px;
  outline: none;
  color: ${({ theme }) => theme.text};
  margin-left: 15px;
  border-radius: 8px;
  padding: 10px;
  box-shadow: 1px 3px 8px rgba(0, 0, 0, 0.5); 

  `;

const Option = styled.option`
  background-color: ${({ theme }) => theme.opacity};
  color: ${({ theme }) => theme.text};
  /* padding: 10px; */
  &:hover {
    background-color: ${props => typeColors[props.type]};
    color: white;
  }
`;

const ButtonSearch = styled.button`
  background-color: transparent;
  border: none;
  color: ${({ theme }) => theme.text};
  transition: transform 0.5s;

  &:hover {
    cursor: pointer;
    transform: scale(1.2)
  }
`

const InputSearch = styled.input`
  width: 250px;
  height: 40px;
  background-color: transparent;
  border: none;
  font-size: 20px;
  outline: none;
  color: ${({ theme }) => theme.text};

  &::placeholder {
    color: ${({ theme }) => theme.text};
    font-size: 20px;
  }
`

const Search = styled.div`
  background-color: ${({ theme }) => theme.opacity};
  padding: 15px;
  margin: 34px 0;
  display: flex;
  border-radius: 8px;
  box-shadow: 1px 3px 8px rgba(0, 0, 0, 0.5);
`

const ErrorMessage = styled.div`
  color: red;
  margin-top: 20px;
  text-align: center;
  font-size: 40px;
`

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 30px;
  z-index: 2;
`
const ImageLogo = styled.img`
  width: 250px;
  height: 150px;
`
const PokemonList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 20px;
`
const StyledLink = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
`

const PokemonItem = styled.li`
  width: 350px;
  margin: 10px;
  padding: 20px;
  background-color: ${({ theme }) => theme.opacity};
  box-shadow: 1px 3px 8px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  transition: transform 0.5s;
  
  &:hover {
    background: ${({ types }) => {
      const colors = types.map(type => typeColors[type]);
      return colors.length > 1
        ? `linear-gradient(135deg, ${colors.join(', ')})`
        : colors[0];
    }};
    color: #fff;
    transform: scale(1.05);
  }
`

const ImagePokemon = styled.div`
  width: 150px;
  height: 190px;
  background-image: url(${({ src }) => src});
  background-size: contain;
  background-repeat: no-repeat;
  margin: 10px;
  transition: transform 0.5s;
  
  &:hover {
    transform: scale(1.05);
  }
`

const NamePokemon = styled.p`
  margin: 30px 0;
  font-size: 30px;
  font-weight: bold;
`

const LoadMoreButton = styled.button`
  background-color: ${({ theme }) => theme.opacity};
  color: ${({ theme }) => theme.text};
  padding: 10px 20px;
  border: none;
  border-radius: 10px;
  font-size: 20px;
  font-weight: 700;
  margin: 50px;
  transition: transform 0.5s;

  &:hover {
    cursor: pointer;
    background-color: ${({ theme }) => theme.colorMovements};
    color: ${({ theme }) => theme.toggleBorder};
    transform: scale(1.05);
  }
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  `

const TypeList = styled.div`
    display: flex;
    justify-content: center;
    gap: 20px;
    background-color: ${({ theme }) => theme.opacityType};
    border-radius: 10px;
    padding: 20px;
`

  const TypePokemon = styled.div`
    background-color: ${({ type }) => typeColors[type] || '#777'};
  color: ${({ theme }) => theme.text};
  padding: 10px 20px;
  border-radius: 10px;
  font-size: 20px;
  font-weight: 700;
`


export default App;