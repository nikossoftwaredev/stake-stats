import calculateStats from "../utils/calculate-stats";
import GamblingDates from "./GamblingDates";
import StatCard from "./StatCard";

const StatsPage = () => {
  const { stats, totalProfit, totalBets, totalWagered } = calculateStats();
  return (
    <div>
      <div className="text-xl mb-4 p-4 bg-base-300 rounded-lg shadow text-base-content">
        <GamblingDates />
        <audio
          autoPlay
          id="song"
          className="block w-full max-w-md mx-auto"
          controls
        >
          <source src="/songs/manaviki.mp3" type="audio/mpeg" />
        </audio>
      </div>
      <div className="flex flex-wrap gap-4 text-lg">
        <span className="p-4 bg-base-300 rounded-lg shadow text-base-content">
          Total Profit:{" "}
          <strong
            className={`${totalProfit > 0 ? "text-green-500" : "text-red-500"}`}
          >
            {totalProfit.toLocaleString()} €
          </strong>
        </span>
        <span className="p-4 bg-base-300 rounded-lg shadow text-base-content">
          Total Bets: <strong>{totalBets.toLocaleString()}</strong>
        </span>
        <span className="p-4 bg-base-300 rounded-lg shadow text-base-content">
          Total Wagered: <strong>{totalWagered.toLocaleString()} €</strong>
        </span>
      </div>
      <section className="grid md:grid-cols-3 xl:grid-cols-6 gap-4 mt-4">
        {stats.map(({ gameName, numberOfBets, amount, payout, profit }) => {
          return (
            <StatCard
              key={gameName}
              amount={amount}
              payout={payout}
              profit={profit}
              gameName={gameName}
              numberOfBets={numberOfBets}
            />
          );
        })}
      </section>
    </div>
  );
};

export default StatsPage;
