import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { getTeam, removePokemanFromTeam } from "../store/team";

const TeamGrid = () => {
  const team = useSelector(getTeam);
  const dispatch = useDispatch();

  const removeTeamMember = (e) => {
    const { pokedexNumber } = e.target.dataset;

    console.log(e.target.dataset);
    console.log({ pokedexNumber });

    dispatch(removePokemanFromTeam(pokedexNumber));
  };

  return (
    <section
      id="team"
      className="gap-3 grid grid-cols-2 grid-rows-3 mb-6 sticky top-10 w-full"
    >
      {team.map((teamMember, index) => (
        <div
          key={index}
          data-testid="team-member"
          className="rounded bg-gray-500 p-4 pt-0 flex flex-col text-center text-white"
        >
          <div className="shrink-0 text-center">
            <Image
              src={teamMember.sprites.front_default}
              width={100}
              height={100}
              alt={teamMember.name}
            />
          </div>
          <span className="capitalize flex gap-2 justify-center">
            {teamMember.name}{" "}
            <button
              className="border border-gray-400 py-0 px-2 rounded bg-red-800 text-xs"
              onClick={removeTeamMember}
              data-pokedex-number={teamMember.id}
              data-testid="remove-team-member-button"
            >
              X
            </button>
          </span>
        </div>
      ))}
    </section>
  );
};

export default TeamGrid;
