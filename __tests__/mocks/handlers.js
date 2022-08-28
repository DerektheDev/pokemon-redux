import { rest } from "msw";

const baseUrl = "https://pokeapi.co/api/v2";

export const handlers = [
  // types
  rest.get(`${baseUrl}/type`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        count: 20,
        next: null,
        previous: null,
        results: [
          {
            name: "normal",
            url: "https://pokeapi.co/api/v2/type/1/",
          },
        ],
      })
    );
  }),
  // generations
  rest.get(`${baseUrl}/generation`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        count: 8,
        next: null,
        previous: null,
        results: [
          {
            name: "generation-i",
            url: `${baseUrl}/generation/1/`,
          },
        ],
      })
    );
  }),

  // pokemon of type normal
  rest.get(`${baseUrl}/type/normal`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        pokemon: [
          {
            pokemon: {
              name: "pidgey",
              url: `${baseUrl}/pokemon/16/`,
            },
            slot: 1,
          },
        ],
      })
    );
  }),

  // pokemon in first generation
  rest.get(`${baseUrl}/generation/1`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        pokemon_species: [
          {
            name: "bulbasaur",
            url: `${baseUrl}/pokemon-species/1/`,
          },
        ],
      })
    );
  }),

  // pidgey
  rest.get(`${baseUrl}/pokemon/16`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        id: 16,
        name: "pidgey",
        sprites: {
          front_default:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/16.png",
        },
      })
    );
  }),
];
