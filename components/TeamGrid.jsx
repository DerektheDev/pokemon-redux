const TeamGrid = () => (
  <section id="team" className="gap-3 grid grid-cols-3 grid-rows-2 mb-6">
    {Array(6)
      .fill(0)
      .map((item, index) => (
        <div key={index} className="rounded bg-gray-500 p-4">
          Test
        </div>
      ))}
  </section>
);

export default TeamGrid;
