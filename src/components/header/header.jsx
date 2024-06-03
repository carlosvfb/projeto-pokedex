import { Link } from 'react-router-dom';
import { DarkModeSwitch } from "react-toggle-dark-mode";
import styled from 'styled-components';
import logoPokemon from "/logo-pokemon.png";
import PropTypes from 'prop-types';
import SearchPokemons from '../searchPokemons/searchPokemons';

const Header = ({ toggleDarkMode, isDarkMode, pokemonName, handleInputChange, handleSearch, selectedType, handleTypeChange }) => (
    <StyledHeader>
        <Link to="/"><ImageLogo src={logoPokemon} alt="logo" /></Link>
        {location.pathname === '/' && (
            <SearchPokemons
            pokemonName={pokemonName}
            handleInputChange={handleInputChange}
            handleSearch={handleSearch}
            selectedType={selectedType}
            handleTypeChange={handleTypeChange}
            />
        )}
        <DarkModeSwitch
        checked={isDarkMode}
        onChange={toggleDarkMode}
        size={50}
        />
    </StyledHeader>
);

Header.propTypes = {
    toggleDarkMode: PropTypes.func.isRequired,
    isDarkMode: PropTypes.bool.isRequired,
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired,
    }).isRequired,
    pokemonName: PropTypes.string.isRequired,
    handleInputChange: PropTypes.func.isRequired,
    handleSearch: PropTypes.func.isRequired,
    selectedType: PropTypes.string.isRequired,
    handleTypeChange: PropTypes.func.isRequired,
};

const StyledHeader = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    /* padding: 10px 30px; */
    padding: 10px 20px;
    z-index: 2;
    gap: 30px;
    
    @media (max-width: 902px){
        padding: 15px;
        flex-wrap: wrap;
        .search-container {
            order: 3;
            align-items: center;
        }
    }

    svg {
        cursor: pointer;
        transition: transform 3s;
    }
`;

const ImageLogo = styled.img`
    width: 250px;
    height: 150px;
    cursor: pointer;

`;

export default Header;
