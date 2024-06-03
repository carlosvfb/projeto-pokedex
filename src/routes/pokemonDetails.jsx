import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchPokemonDetails } from '../server/server'; 
import styled from 'styled-components';
import { IoMdClose } from "react-icons/io";
import typeColors from "../typeColors/typeColors"

const PokemonDetail = () => {
    const { name } = useParams();
    const [pokemon, setPokemon] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const limiteMovimentos = 10;

    useEffect(() => {
    const fetchData = async () => {
        try {
            const data = await fetchPokemonDetails(name);
            console.log(data)
            setPokemon(data);
            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    };

    fetchData();
}, [name]);

    if (loading) {
        return <div>Carregando...</div>;
    }

    if (error) {
        return <div>Erro ao buscar dados: {error.message}</div>;
    }

    return (
    <ContainerDetail>
        { pokemon && (
            <Pokemon>
                <Button onClick={() => navigate('/')}><IoMdClose /></Button>
            <IformationPokemon>
                <div className='border'>
                <h1>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1).toLowerCase()}</h1>
                </div>
                <img src={pokemon.url} alt={pokemon.name} />
                <TypeList>
                    {pokemon.types.map((type, idx) => (
                        <TypePokemon key={`${type}-${idx}`} type={type}>{type}</TypePokemon>
                    ))}
                </TypeList>
            </IformationPokemon>
            <ComplementPokemon>
                <Movimentos>
                    <h2>Moves:</h2>
                <ListaDeMovimentos>
                    {pokemon.moves.slice(0, limiteMovimentos).map((move, index) => (
                        <MovimentosItem key={index}>{move}</MovimentosItem>
                    ))}
                </ListaDeMovimentos>
                </Movimentos>
                <Abylites>
                    <h2>Abilitys:</h2>
                        <ul>
                            {pokemon.abilities.map((ability, index) => (
                                <li key={index}>
                                    <strong>{ability.name}:</strong> 
                                    <p>{ability.description}</p>
                                </li>
                            ))}
                        </ul>
                </Abylites>
            </ComplementPokemon>
            
            </Pokemon>
        )}
    </ContainerDetail>
    );
};

const Movimentos = styled.div`
    color: ${({ theme }) => theme.text};
    display: flex;
    flex-direction: column;

    @media (max-width: 890px){
        align-items: center;
        margin-top: 20px;
    }

`

const TypeList = styled.div`
    display: flex;
    justify-content: center;
    gap: 20px;
    `

const TypePokemon = styled.div`
    position: relative;
    background-color: ${({ type }) => typeColors[type] || '#777'};
    color: ${({ theme }) => theme.text};
    padding: 10px 20px;
    border-radius: 10px;
    font-size: 20px;
    font-weight: 700;
    
    @media (max-width: 890px){
        align-items: center;
        margin-bottom: 20px;
    }
`

const Button = styled.button`
    position: absolute;
    top: 20px;
    left: 20px;
    border: none;
    width: 46px;
    font-size: 45px;
    border-radius: 10px;
    text-align: center;
    height: 40px;
    background-color: ${({ theme }) => theme.opacityButton};
    color: ${({ theme }) => theme.colorBack};
    cursor: pointer;
`;

const ComplementPokemon = styled.div`
    background-color: ${({ theme }) => theme.opacityTransparent};
    padding: 10px;
    border-radius: 20px;
    margin: 5px;
`

const IformationPokemon = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    border: 2px silid ${({ theme }) => theme.text};
    margin-top: 20px;

    div.border {
        background-color: ${({ theme }) => theme.opacity};
        border-radius: 10px;
        padding: 10px 50px;
        margin: 20px;
        border: 4px solid ${({ theme }) => theme.text};

        @media (max-width: 400px){
        margin-top: 40px;
        }
    }

    h1 {
        font-size: 40px;
        font-weight: 700;
        color: ${({ theme }) => theme.text};

        @media (max-width: 890px){
            font-size: 30px;
        }
    }
`

const ListaDeMovimentos = styled.ul`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    padding: 20px;
`

const MovimentosItem = styled.li`
    font-size: 20px;
    font-weight: 700;
    padding: 10px;
    background-color: ${({ theme }) => theme.backgroundMoviments};
    border-radius: 10px;
    color: ${({ theme }) => theme.text};
    max-width: 200px;
    text-align: center;
`

const Pokemon = styled.div`
    display: flex;
    z-index: 1;

    @media (max-width: 890px){
        flex-direction: column;
    }
`
const ContainerDetail = styled.div`
    position: relative;
    color: ${({ theme }) => theme.toggleBorder};
    background: ${({ theme }) => theme.urlImage} center center no-repeat;
    background-size: cover;
    max-width: 1500px;
    min-height: 500px;
    margin: 20px;
    display: flex;
    border-radius: 50px;
    padding: 30px;
    gap: 30px;
    @media (max-width: 890px){
        width: 93%;
        padding: 26px;
    }
    @media (max-width: 400px){
        padding: 15px;
    }

`
const Abylites = styled.div`
    color: ${({ theme }) => theme.text};
    display: flex;
    flex-direction: column;
    gap: 10px;

    @media (max-width: 890px){
        align-items: center; 
    }
`

export default PokemonDetail;