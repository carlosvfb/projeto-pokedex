import { useContext, useEffect, useState } from "react"
import { DarkModeSwitch } from "react-toggle-dark-mode";
import { fetchPokemonData } from "./server/server";
import { createGlobalStyle, styled } from 'styled-components'
import { ThemeContext } from "./theme/theme";
import { Routes, Route, Link } from 'react-router-dom';
import PokemonDetail from "./routes/pokemonDetails";
import logoPokemon from "/logo-pokemon.png";
import typeColors from "./components/typeColors/typeColors"

function App() {
  const { isDarkMode, setDarkMode } = useContext(ThemeContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [offset, setOffset] = useState(0);
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);
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
          setInitialLoadComplete(true);
        } else {
          setData(prevData => [...prevData,...pokemonData]);
        }
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [offset]);

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
              <PokemonList>
                {data.map((item, index) => (
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
              {data.length < 200 && (
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
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
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
  box-shadow: 0 8px 8px rgba(0, 0, 0, 0.4);
  border-radius: 10px;
  
  &:hover {
    background: ${({ types }) => {
      const colors = types.map(type => typeColors[type]);
      return colors.length > 1
        ? `linear-gradient(135deg, ${colors.join(', ')})`
        : colors[0];
    }};
    color: #fff;
  }
`

const ImagePokemon = styled.div`
  width: 150px;
  height: 190px;
  background-image: url(${({ src }) => src});
  background-size: contain;
  background-repeat: no-repeat;
  margin: 10px;
  

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
