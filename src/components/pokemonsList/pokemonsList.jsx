import styled from 'styled-components';
import PokemonItem from '../pokemonItem/pokemonItem';
import PropTypes from 'prop-types';

const PokemonList = ({ filteredData, loadMorePokemon, dataLength, filtersActive, isLoadingMore }) => {
    
    const showLoadMoreButton = !filtersActive && dataLength < 400 && filteredData.length === dataLength;

    return(
    <>
        <PokemonListContainer>
            {filteredData.map((item, index) => (
                <PokemonItem key={`${item.name}-${index}`} item={item} />
            ))}
        </PokemonListContainer>
        { showLoadMoreButton && (
            <LoadMoreButton onClick={loadMorePokemon}>
                {isLoadingMore ? 'Loading...' : 'Load More'}
            </LoadMoreButton>
        )}
    </>
    )
};

PokemonList.propTypes = {
    filteredData: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
    })).isRequired,
    loadMorePokemon: PropTypes.func.isRequired,
    dataLength: PropTypes.number.isRequired,
    filtersActive: PropTypes.bool.isRequired,
    isLoadingMore: PropTypes.bool.isRequired,
};

const PokemonListContainer = styled.ul`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    padding: 20px;
`;

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
`;

export default PokemonList;
