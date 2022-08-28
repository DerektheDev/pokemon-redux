import { useDispatch, useSelector } from "react-redux";
import { getPokemon } from "../store/pokemon";
import { addPokemanToTeam } from "../store/team";

const PokemonList = () => {
  const dispatch = useDispatch();

  const pokemonFromStore = useSelector(getPokemon);

  const addToTeam = (e) => {
    const { pokedexNumber } = e.target.dataset;
    dispatch(addPokemanToTeam(pokedexNumber));
  };

  return (
    <section id="pokemon-list" className="max-w-md m-auto">
      {pokemonFromStore.length && (
        <ul className="list-disc">
          {pokemonFromStore.map(({ url, name }, index) => {
            const pokedexNumber = url?.split("/")[url.split("/").length - 2];

            return (
              <li key={index} className="flex mb-2 justify-between">
                <span className="capitalize">{name}</span>
                <button
                  className="bg-gray-400 rounded px-2"
                  data-pokedex-number={pokedexNumber}
                  data-testid="add-team-member-button"
                  onClick={addToTeam}
                >
                  Add to Team
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
};

export default PokemonList;
