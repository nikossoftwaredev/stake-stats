import { StatsInfo } from "../utils/calculate-stats";

const StatCard = ({
  gameName,
  amount,
  numberOfBets,
  payout,
  profit,
}: StatsInfo) => {
  return (
    <div className="max-w-sm bg-base-300 rounded-lg shadow text-base-content">
      <div className="p-5">
        <h5 className="mb-2 text-2xl font-bold tracking-tight">{gameName}</h5>
        <div className="mb-3 font-normal">
          Profit: &nbsp;
          <strong
            className={`${profit > 0 ? "text-green-500" : "text-red-500"}`}
          >
            {profit.toFixed(2)} €
          </strong>
        </div>
        <div>
          Number of bets: <strong>{numberOfBets}</strong>
        </div>
        <div>Total wagered : {amount.toFixed(2)} €</div>
      </div>
    </div>
  );
};

export default StatCard;
