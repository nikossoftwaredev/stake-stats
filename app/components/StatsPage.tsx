import { endDate, startDate } from "../config";
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
      <div className="stats shadow gap-2 flex flex-wrap">
        <div className="stat text-green-500 p-4 bg-base-300 rounded-lg shadow">
          <div className="stat-title">Total Profit</div>
          <div className="stat-value">{totalProfit.toLocaleString()} €</div>
        </div>
        <div className="stat p-4 bg-base-300 rounded-lg shadow">
          <div className="stat-title">Total Bets</div>
          <div className="stat-value text-primary">
            {totalBets.toLocaleString()}
          </div>
        </div>
        <div className="stat p-4 bg-base-300 rounded-lg shadow ">
          <div className="stat-title">Total Wagered:</div>
          <div className="stat-value ">{totalWagered.toLocaleString()} €</div>
        </div>
        <div className="stat p-4 bg-base-300 rounded-lg shadow text-gray-500 ">
          <div className="stat-title">Start Date:</div>
          <div className="stat-value ">{startDate.toLocaleDateString()}</div>
        </div>
        <div className="stat p-4 bg-base-300 rounded-lg shadow text-gray-500 ">
          <div className="stat-title">End Date:</div>
          <div className="stat-value ">{endDate.toLocaleDateString()}</div>
        </div>
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
