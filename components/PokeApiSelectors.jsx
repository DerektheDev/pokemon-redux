import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSearchValues, fetchSearchValuesBy } from "../store/searchValues";
import { fetchPokemonBy } from "../store/pokemon";

const PokeApiSelectors = () => {
  const dispatch = useDispatch();
  const searchValuesFromStore = useSelector(getSearchValues);

  const searchKeys = ["type", "generation", "move", "ability"];
  const [searchValues, setSearchValues] = useState([]);
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

  useEffect(() => {
    if (!searchValue) return;
    dispatch(fetchPokemonBy(searchKey)(searchValue));
  }, [searchKey, searchValue, dispatch]);

  return (
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
  );
};

export default PokeApiSelectors;
