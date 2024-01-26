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
  let i = 0;

  const jsonsInDir = fs
    .readdirSync("./data/stake-bets")
    .filter((file) => path.extname(file) === ".json");

  jsonsInDir.forEach((file) => {
    const fileData = fs.readFileSync(path.join("./data/stake-bets", file));
    const json = JSON.parse(fileData.toString());

    json.forEach(
      ({
        amount,
        payout,
        gameName,
        currency,
        iid,
        payoutMultiplier,
        data = {},
      }: any) => {
        let finalGameName: string = gameName ?? data.gameName;
        let finalCurrency: string = currency ?? data.currency;
        let finalAmount: number = amount ?? data.amount;
        let finalPayout: number = payout ?? data.payout;

        if (!Object.keys(values).includes(finalCurrency)) return;

        const valueMultiplier = values[finalCurrency as string] ?? 1;

        const newAmount = finalAmount * valueMultiplier;
        const newPayout = finalPayout * valueMultiplier;
        const diff = newPayout - newAmount;

        totalProfit = totalProfit + diff;
        totalBets = totalBets + 1;
        totalWagered = totalWagered + newPayout;
        if (isNaN(diff) && i === 0) {
          i = 1;
          console.log({
            iid,
            valueMultiplier,
            diff,
            newAmount,
            newPayout,
            finalGameName,
            finalCurrency,
            finalAmount,
            finalPayout,
          });
        }

        statsInfo[finalGameName] = {
          gameName: finalGameName,
          numberOfBets: (statsInfo[finalGameName]?.numberOfBets ?? 0) + 1,
          amount: (statsInfo[finalGameName]?.amount ?? 0) + newAmount,
          payout: (statsInfo[finalGameName]?.payout ?? 0) + newPayout,
          profit: (statsInfo[finalGameName]?.profit ?? 0) + diff,
        };
      }
    );
  });

  return {
    stats: Object.values(statsInfo).sort((a, b) => b.profit - a.profit),
    totalProfit,
    totalBets,
    totalWagered,
  };
};

export default calculateStats;
