import { StatsInfo } from "../utils/calculate-stats";
import { formatNumber } from "../utils/number";

const StatCard = ({
  gameName = "",
  amount,
  numberOfBets,
  payout,
  profit,
}: StatsInfo) => {
  return (
    <div className="max-w-sm bg-base-300 rounded-lg shadow text-base-content">
      <div className="p-5">
        <h5 className="mb-2 text-2xl text-primary font-bold tracking-tight">
          {gameName.toLocaleUpperCase()}
        </h5>
        <div className="mb-3 font-normal">
          Profit: &nbsp;
          <strong
            className={`${profit > 0 ? "text-green-500" : "text-red-500"}`}
          >
            {profit.toLocaleString()} €
          </strong>
        </div>
        <div>
          Number of bets: <strong>{numberOfBets}</strong>
        </div>
        <div>Total wagered : {amount.toLocaleString()} €</div>
      </div>
    </div>
  );
};

export default StatCard;
