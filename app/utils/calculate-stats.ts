import fs from "fs";
import path from "path";

export interface StatsInfo {
  gameName: string;
  numberOfBets: number;
  amount: number;
  payout: number;
  profit: number;
}

const values: Record<string, number> = {
  ltc: 64.26,
  btc: 37141,
  usdt: 0.91,
  eth: 2046,
};

const calculateStats = () => {
  const statsInfo: Record<string, StatsInfo> = {};
  let totalProfit = 0;
  let totalBets = 0;
  let totalWagered = 0;

  const jsonsInDir = fs
    .readdirSync("./data/stake-bets")
    .filter((file) => path.extname(file) === ".json");

  jsonsInDir.forEach((file) => {
    const fileData = fs.readFileSync(path.join("./data/stake-bets", file));
    const json = JSON.parse(fileData.toString());

    json.forEach(({ amount, payout, gameName, currency, iid }: any) => {
      if (!Object.keys(values).includes(currency as string)) return;

      const valueMultiplier = values[currency as string] ?? 1;

      const newAmount = amount * valueMultiplier;
      const newPayout = payout * valueMultiplier;
      const diff = newPayout - newAmount;

      totalProfit = totalProfit + diff;
      totalBets = totalBets + 1;
      totalWagered = totalWagered + newPayout;

      statsInfo[gameName] = {
        gameName,
        numberOfBets: (statsInfo[gameName]?.numberOfBets ?? 0) + 1,
        amount: (statsInfo[gameName]?.amount ?? 0) + newAmount,
        payout: (statsInfo[gameName]?.payout ?? 0) + newPayout,
        profit: (statsInfo[gameName]?.profit ?? 0) + diff,
      };
    });
  });

  return {
    stats: Object.values(statsInfo).sort((a, b) => b.profit - a.profit),
    totalProfit,
    totalBets,
    totalWagered,
  };
};

export default calculateStats;
