import React, { useReducer } from "react";
import styled from "@emotion/styled";
import "./App.css";

import PokemonInfo from "./components/PokemonInfo";
import PokemonFilter from "./components/PokemonFilter";
import PokemonTable from "./components/PokemonTable";
import PokemonContext from "./PokemonContext";

const pokemonReducer = (state, action) => {
  switch (action.type) {
    case 'SET_FILTER':
      return {
        ...state,
        filter: action.payload
      };
    case 'SET_POKEMON':
      return {
        ...state,
        pokemon: action.payload
      };
    case 'SET_SELECTED_POKEMON':
      return {
        ...state,
        selectedPokemon: action.payload
      };
    default:
      throw new Error("No action");
  }
};

const Container = styled.div`
  margin: auto;
  width: 800px;
  padding-top: 1rem;
`;

const Title = styled.h1`
  text-align: center;
  color: #880000;
`;

const TwoColumnLayout = styled.div`
  display: grid;
  grid-template-columns: 70% 30%;
  column-gap: 0.2 rem;
`;


function App() {
  const [state, dispatch] = useReducer(pokemonReducer, {
    pokemon: [],
    filter: '',
    selectedPokemon: null
  });

  React.useEffect(() => {
    document.title = "Pokemon Search";
    fetch("/cra-jh-project/pokemon.json")
      .then((resp) => resp.json())
      .then((data) => dispatch({type: 'SET_POKEMON',
        payload: data}))
  }, []);

  if (!state.pokemon) {
    return <div>Loading data...</div>;
  }

  return (
    <PokemonContext.Provider
      value={{
        state,
        dispatch
      }}>
      <Container>
        <Title>Pokemon Search</Title>

        <PokemonFilter />

        <TwoColumnLayout>
          <div>
            <PokemonTable />
          </div>
          <PokemonInfo />
        </TwoColumnLayout>
      </Container>
    </PokemonContext.Provider>
  );
}

export default App;
