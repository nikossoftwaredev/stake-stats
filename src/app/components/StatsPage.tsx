import calculateStats from "../utils/calculate-stats";
import StatCard from "./StatCard";

const StatsPage = () => {
  const { stats, totalProfit, totalBets, totalWagered } = calculateStats();
  return (
    <div>
      <div>
        Total Profit: <strong>{totalProfit.toFixed(2)} €</strong>
        <br />
        Total Bets: <strong>{totalBets}</strong>
        <br />
        Total Wagered: <strong>{totalWagered.toFixed(2)} €</strong>
      </div>
      <section className="grid grid-cols-3 gap-4">
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
