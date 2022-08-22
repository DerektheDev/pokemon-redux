import TeamGrid from "../components/TeamGrid";
import PokemonList from "../components/PokemonList";
import PokeApiSelectors from "../components/PokeApiSelectors";

export default function Home() {
  return (
    <div>
      <h1 className="text-5xl text-center py-6">Pokémon Team Builder</h1>
      <main className="max-w-4xl m-auto flex gap-10 justify-between px-10">
        <div className="w-full">
          <TeamGrid />
        </div>
        <div className="w-full">
          <PokeApiSelectors />
          <PokemonList />
        </div>
      </main>
    </div>
  );
}
