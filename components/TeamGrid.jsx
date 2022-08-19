import Image from "next/image";
import { useSelector } from "react-redux";
import { getTeam } from "../store/team";

const TeamGrid = () => {
  const team = useSelector(getTeam);

  return (
    <section id="team" className="gap-3 grid grid-cols-3 grid-rows-2 mb-6">
      {team.map((teamMember, index) => (
        <div
          key={index}
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
          <span className="capitalize">{teamMember.name}</span>
        </div>
      ))}
    </section>
  );
};

export default TeamGrid;
