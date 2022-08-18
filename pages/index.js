import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getPokemon, fetchPokemonBy } from "../store/pokemon";
import { getSearchValues, fetchSearchValuesBy } from "../store/searchValues";

export default function Home() {
  const searchKeys = ["type", "generation", "move", "ability"];
  const [searchValues, setSearchValues] = useState([]);
  const [searchKey, setSearchKey] = useState(searchKeys[0]);
  const [searchValue, setSearchValue] = useState("normal");

  const dispatch = useDispatch();
  const pokemonFromStore = useSelector(getPokemon);
  const searchValuesFromStore = useSelector(getSearchValues);

  useEffect(() => {
    dispatch(fetchSearchValuesBy(searchKey));
  }, [searchKey, dispatch]);

  useEffect(() => {
    if (!searchValue) return;
    dispatch(fetchPokemonBy(searchKey)(searchValue));
  }, [searchKey, searchValue, dispatch]);

  const onChangeSearchKey = (e) => {
    setSearchKey(e.target.value);
  };

  const onChangeSearchValue = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <div>
      <main className="max-w-2xl m-auto">
        <h1 className="text-5xl text-center py-6">Pokémon Team Builder</h1>

        <section id="team" className="gap-3 grid grid-cols-3 grid-rows-2 mb-6">
          {Array(6)
            .fill(0)
            .map((item, index) => (
              <div key={index} className="rounded bg-gray-500 p-4">
                Test
              </div>
            ))}
        </section>

        <section id="selector" className="flex gap-6 justify-center my-10">
          <p className="flex gap-2">
            Search Key:
            <select
              name="type"
              id="type"
              onChange={onChangeSearchKey}
              className="capitalize border border-black rounded"
            >
              {searchKeys.map((searchKey) => (
                <option key={searchKey} value={searchKey}>
                  {searchKey}
                </option>
              ))}
            </select>
          </p>

          <p className="flex gap-2">
            <span className="capitalize">{searchKey}:</span>
            <select
              name="type"
              id="type"
              onChange={onChangeSearchValue}
              className="capitalize border border-black rounded"
            >
              {searchValuesFromStore.map((searchValue) => (
                <option key={searchValue.name} value={searchValue.name}>
                  {searchValue.name?.replace(/-/, " ")}
                </option>
              ))}
            </select>
          </p>
        </section>

        <section id="pokemon-list" className="max-w-md m-auto">
          {pokemonFromStore && (
            <ul className="list-disc">
              {pokemonFromStore.map(({ pokemon }) => (
                <li key={pokemon.name} className="flex mb-2 justify-between">
                  <span className="capitalize">{pokemon.name}</span>
                  <button className="bg-gray-400 rounded px-2">
                    Add to Team
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
}
