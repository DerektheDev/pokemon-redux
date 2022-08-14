import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";

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
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>Pokémon Team Builder</h1>

        <p>
          Search Key:
          <select name="type" id="type" onChange={onChangeSearchKey}>
            {searchKeys.map((searchKey) => (
              <option key={searchKey} value={searchKey}>
                {searchKey}
              </option>
            ))}
          </select>
        </p>

        <p>
          {searchKey}:
          <select name="type" id="type" onChange={onChangeSearchValue}>
            {searchValuesFromStore.map((searchValue) => (
              <option key={searchValue.name} value={searchValue.name}>
                {searchValue.name}
              </option>
            ))}
          </select>
        </p>

        <div className={styles.grid}>
          {pokemonFromStore && (
            <ul>
              {pokemonFromStore.map(({ pokemon }) => (
                <li key={pokemon.name}>{pokemon.name}</li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  );
}
