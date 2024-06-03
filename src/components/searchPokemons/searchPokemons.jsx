import styled from 'styled-components';
import { FiSearch } from 'react-icons/fi';
import typeColors from '../../typeColors/typeColors';
import PropTypes from 'prop-types';

const SearchPokemons = ({ pokemonName, handleInputChange, handleSearch, selectedType, handleTypeChange }) => (
    <SearchContainer className='search-container'>
        <div>
            <label htmlFor="pokemonName">Look for a pokemon:</label>
            <Search>
                <InputSearch
                id="pokemonName"
                type="text"
                value={pokemonName}
                onChange={handleInputChange}
                placeholder="Enter the Pokémon's name..."
                />
                <ButtonSearch onClick={handleSearch}><FiSearch size={25} /></ButtonSearch>
            </Search>
        </div>
        <Select>
                <label htmlFor="select-type">Select a type:</label>
            <SelectFilter value={selectedType} onChange={handleTypeChange} id="select-type">
                <option value="">All types</option>
                {allTypes.map(type => (
                    <Option key={type} value={type.toLowerCase()} type={type.toLowerCase()}>{type}</Option>
                ))}
            </SelectFilter>
        </Select>
    </SearchContainer>
);

SearchPokemons.propTypes = {
    pokemonName: PropTypes.string.isRequired,
    handleInputChange: PropTypes.func.isRequired,
    handleSearch: PropTypes.func.isRequired,
    selectedType: PropTypes.string.isRequired,
    handleTypeChange: PropTypes.func.isRequired,
};

const allTypes = [
    'Normal', 'Fire', 'Water', 'Grass', 'Electric', 'Ice', 'Fighting', 'Poison', 'Ground', 'Flying', 'Psychic', 'Bug', 'Rock', 'Ghost', 'Dark', 'Dragon', 'Steel', 'Fairy'
];

const SearchContainer = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    align-items: center;
    width: 100%;
    margin-top: 10px;
    max-width: 500px;
    gap: 10px;

    @media (max-width: 902px){
        margin: 0 auto;
    }

    @media (max-width: 550px){
        justify-content: center;
    }
    
    label {
        font-size: 20px;
    }
`;

const Search = styled.div`
    background-color: ${({ theme }) => theme.opacity};
    padding: 15px;
    display: flex;
    border-radius: 8px;
    box-shadow: 1px 3px 8px rgba(0, 0, 0, 0.5);
    transition: transform 0.5s;

    &:hover {
        cursor: pointer;
        transform: scale(1.05)
    }
`;

const InputSearch = styled.input`
    width: 267px;
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
`;

const Select = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    label {
        font-size: 20px;
        margin-bottom: 1px;
        margin-left: -2px;
    }
`;

const SelectFilter = styled.select`
    width: 150px;
    height: 70px;
    background-color: ${({ theme }) => theme.opacity};
    border: none;
    font-size: 20px;
    outline: none;
    color: ${({ theme }) => theme.text};
    margin-left: 15px;
    border-radius: 8px;
    padding: 10px;
    box-shadow: 1px 3px 8px rgba(0, 0, 0, 0.5);
    cursor: pointer;
    transition: transform 0.5s;

    &:hover {
        cursor: pointer;
        transform: scale(1.05)
    }
`;

const Option = styled.option`
    background-color: ${({ theme }) => theme.opacity};
    color: ${({ theme }) => theme.text};

    &:hover {
        background-color: ${props => typeColors[props.type]};
        color: white;
    }
`;

export default SearchPokemons;