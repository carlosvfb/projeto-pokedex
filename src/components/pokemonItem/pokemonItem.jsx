import { Link } from 'react-router-dom';
import styled from 'styled-components';
import typeColors from '../../typeColors/typeColors';
import PropTypes from 'prop-types';

const PokemonItem = ({ item }) => (
    <PokemonItemContainer types={item.types}>
        <StyledLink to={`/pokemon/${item.name}`}>
            <img src={item.url} alt={item.name.charAt(0).toUpperCase() + item.name.slice(1).toLowerCase()} />
            <TypeList>
                {item.types.map((type, idx) => (
                    <TypePokemon key={`${type}-${idx}`} type={type}>{type}</TypePokemon>
                ))}
            </TypeList>
            <NamePokemon>{item.name.charAt(0).toUpperCase() + item.name.slice(1).toLowerCase()}</NamePokemon>
        </StyledLink>
    </PokemonItemContainer>
);

PokemonItem.propTypes = {
    item: PropTypes.shape({
        name: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
        types: PropTypes.arrayOf(PropTypes.string).isRequired,
    }).isRequired,
};

const PokemonItemContainer = styled.li`
    width: 350px;
    margin: 10px;
    padding: 20px;
    background-color: ${({ theme }) => theme.opacity};
    box-shadow: 1px 3px 8px rgba(0, 0, 0, 0.5);
    border-radius: 10px;
    transition: transform 0.5s;

    @media (max-width: 380px){
        width: 94%;
    }

    &:hover {
        background: ${({ types }) => {
        const colors = types.map(type => typeColors[type]);
        return colors.length > 1
        ? `linear-gradient(135deg, ${colors.join(', ')})`
        : colors[0];
        }};
        color: ${({ theme }) => theme.toggleBorder};
        transform: scale(1.05);
    }
`;

const StyledLink = styled(Link)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    gap: 10px;

    img{
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
    }
`;

const NamePokemon = styled.p`
    margin: 30px 0;
    font-size: 30px;
    font-weight: bold;
`;

const TypeList = styled.div`
    display: flex;
    justify-content: center;
    gap: 20px;
    background-color: ${({ theme }) => theme.opacityType};
    border-radius: 10px;
    padding: 20px;
`;

const TypePokemon = styled.div`
    background-color: ${({ type }) => typeColors[type] || '#777'};
    color: ${({ theme }) => theme.text};
    padding: 10px 20px;
    border-radius: 10px;
    font-size: 20px;
    font-weight: 700;
`;

export default PokemonItem;