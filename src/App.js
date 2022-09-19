import './App.css';
import PropTypes from 'prop-types';
import pokemon from './pokemon.json'

const PokemonRow = ({pokemon}) => (
  <tr>
    <td>{pokemon.id}</td>
    <td>{pokemon.name.english}</td>
    <td>{pokemon.type.join(', ')}</td>
  </tr>
);


PokemonRow.propTypes = {
  pokemon: PropTypes.shape({
    id: PropTypes.number,
    type: PropTypes.arrayOf(PropTypes.string),
    name: PropTypes.shape({
      english: PropTypes.string
    })
  })
}


function App() {
  return (
    <div style={{
      margin: 'auto',
      width: 800,
      paddingTop: '1rem'
    }}>
      <h1 className='title'>Pokemon Search?</h1>
      <table width="100%">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Food</th>
          </tr>
        </thead>
        <tbody>
          {pokemon.slice(0, 20).map((pokemon) => (
            <PokemonRow pokemon={pokemon} key={pokemon.id} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
