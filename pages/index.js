import Head from "next/head";
import Image from "next/image";
import { useEffect } from "react";
import styles from "../styles/Home.module.css";

import { useDispatch, useSelector } from "react-redux";
import { getTeam, fetchPokemonBy } from "../store/team";

export default function Home() {
  const types = [
    "normal",
    "fire",
    "water",
    "electric",
    "grass",
    "ice",
    "fighting",
    "poison",
    "ground",
    "flying",
    "psychic",
    "bug",
    "rock",
    "ghost",
    "dragon",
    "dark",
    "steel",
    "fairy",
  ];

  const dispatch = useDispatch();
  const teamFromStore = useSelector(getTeam);

  useEffect(() => {
    dispatch(fetchPokemonBy("type")("fire"));
  }, []);

  useEffect(() => {
    console.log({ teamFromStore });
  }, [teamFromStore]);

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>Pokémon Team Builder</h1>

        <p>
          Type:
          <select name="type" id="type">
            {types.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </p>

        <div className={styles.grid}>
          {/* <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>Documentation &rarr;</h2>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h2>Deploy &rarr;</h2>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a> */}
        </div>
      </main>
    </div>
  );
}
