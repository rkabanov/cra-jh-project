import React from "react";
import styled from "@emotion/styled";
import "./App.css";

import PokemonInfo from "./components/PokemonInfo";
import PokemonFilter from "./components/PokemonFilter";
import PokemonTable from "./components/PokemonTable";
import PokemonContext from "./PokemonContext";

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
  const [filter, filterSet] = React.useState("");
  const [pokemon, pokemonSet] = React.useState([]);
  const [selectedPokemon, selectedPokemonSet] = React.useState(null);

  React.useEffect(() =>   {
    document.title = "Pokemon Search";
    fetch("/cra-jh-project/pokemon.json")
      .then((resp) => resp.json())
      .then((data) => pokemonSet(data))
  }, []);

  const filterReset = () => {
    filterSet("");
    selectedPokemonSet(null)
  };

  const selectedPokemonReset = () => {
    selectedPokemonSet(null)
  }

  return (
    <PokemonContext.Provider
      value={{
        filter,
        pokemon,
        selectedPokemon,
        filterSet,
        pokemonSet,
        selectedPokemonSet,
        filterReset,
        selectedPokemonReset
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
