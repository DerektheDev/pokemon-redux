import { useSelector } from "react-redux";
import { getPokemon } from "../store/pokemon";

const PokemonList = () => {
  const pokemonFromStore = useSelector(getPokemon);

  return (
    <section id="pokemon-list" className="max-w-md m-auto">
      {pokemonFromStore && (
        <ul className="list-disc">
          {pokemonFromStore.map(({ pokemon }) => (
            <li key={pokemon.name} className="flex mb-2 justify-between">
              <span className="capitalize">{pokemon.name}</span>
              <button className="bg-gray-400 rounded px-2">Add to Team</button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default PokemonList;
