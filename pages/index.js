import TeamGrid from "../components/TeamGrid";
import PokemonList from "../components/PokemonList";
import PokeApiSelectors from "../components/PokeApiSelectors";

export default function Home() {
  return (
    <div>
      <main className="max-w-2xl m-auto">
        <h1 className="text-5xl text-center py-6">Pokémon Team Builder</h1>
        <TeamGrid />
        <PokeApiSelectors />
        <PokemonList />
      </main>
    </div>
  );
}
