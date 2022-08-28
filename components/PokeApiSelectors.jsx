import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSearchValues, fetchSearchValuesBy } from "../store/searchValues";
import { fetchPokemonBy } from "../store/pokemon";

const PokeApiSelectors = () => {
  const dispatch = useDispatch();
  const searchValuesFromStore = useSelector(getSearchValues);

  const searchKeys = ["type", "generation", "move", "ability"];
  const [searchKey, setSearchKey] = useState(searchKeys[0]);
  const [searchValue, setSearchValue] = useState("normal");

  useEffect(() => {
    dispatch(fetchSearchValuesBy(searchKey));
  }, [searchKey, dispatch]);

  const onChangeSearchKey = (e) => {
    setSearchKey(e.target.value);
  };

  const onChangeSearchValue = (e) => {
    setSearchValue(e.target.value);
  };

  const searchForPokemon = () => {
    dispatch(fetchPokemonBy(searchKey)(searchValue));
  };

  return (
    <section
      id="selectors"
      className="flex gap-6 pt-10 pb-4 sticky top-0 bg-white border-b-2 mb-4 w-full justify-between"
    >
      <p className="flex flex-col gap-2">
        Search Key:
        <select
          name="search-key-select"
          id="search-key-select"
          data-testid="search-key-select"
          onChange={onChangeSearchKey}
          className="capitalize border border-black rounded p-2"
        >
          {searchKeys.map((searchKey) => (
            <option
              key={searchKey}
              value={searchKey}
              data-testid="search-key-option"
            >
              {searchKey}
            </option>
          ))}
        </select>
      </p>

      <p className="flex flex-col gap-2">
        <span className="capitalize" data-testid="search-key">
          {searchKey}:
        </span>
        <select
          name="search-value-select"
          id="search-value-select"
          data-testid="search-value-select"
          onChange={onChangeSearchValue}
          className="capitalize border border-black rounded p-2"
        >
          {searchValuesFromStore.length &&
            searchValuesFromStore.map(({ name, url }) => {
              const searchValue = url.split("/")[url.split("/").length - 2];
              return (
                <option
                  key={name}
                  value={searchValue}
                  data-testid="search-value-option"
                >
                  {name?.replace(/-/, " ")}
                </option>
              );
            })}
        </select>
      </p>
      <div className="flex items-end">
        <button
          className="bg-gray-400 rounded px-2"
          onClick={searchForPokemon}
          name="search"
        >
          Search
        </button>
      </div>
    </section>
  );
};

export default PokeApiSelectors;
