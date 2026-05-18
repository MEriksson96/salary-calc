import { useState } from "react";
import "./App.css";
import {
  formatNumber,
  getExtraSalaryFee,
  getSocialFeeAmount,
  getTotal,
  getTotalSum,
  getVacation,
  getVacationPayExtraTaxAmount,
  mobileCost,
} from "./utils";

export const App = () => {
  const [percent, setPercent] = useState(80);
  const [rate, setRate] = useState(0);
  const [salary, setSalary] = useState(0);
  const [numberOfDays, setNumberOfDays] = useState(21);
  const [pension, setPension] = useState(4000);

  const getTotalCost = () => {
    return getTotal(
      rate,
      salary,
      pension,
      getSocialFeeAmount(salary),
      getExtraSalaryFee(pension),
      getVacation(salary),
      getVacationPayExtraTaxAmount(getVacation(salary)),
      getTotalSum(rate, numberOfDays, percent),
    );
  };

  const getSavedAmount = () => {
    const leftAmount =
      getTotalSum(rate, numberOfDays, percent) - getTotalCost();
    if (getTotalCost() < 0) {
      return getTotalCost();
    }

    return leftAmount;
  };

  return (
    <div className="container">
      <h1>Lönekalkyl</h1>
      <div className="item">
        <span className="label">Timpris</span>
        <input
          type="number"
          onChange={(e) => setRate(Number(e.target.value))}
        />
      </div>

      <div className="item">
        <span className="label">Antal dagar</span>
        <input
          type="number"
          defaultValue={numberOfDays}
          onChange={(e) => setNumberOfDays(Number(e.target.value))}
        />
      </div>

      <div className="item">
        <span className="label">Totala summan {percent}%</span>
        <span className="value">
          {formatNumber(getTotalSum(rate, numberOfDays, percent))}
        </span>
      </div>

      <div className="item">
        <span className="label">Månadslön (netto)</span>
        <input
          type="number"
          onChange={(e) => setSalary(Number(e.target.value))}
        />
      </div>

      <div className="item">
        <span className="label">Arbetsgivaravgift</span>
        <span className="value">
          {formatNumber(getSocialFeeAmount(salary))}
        </span>
      </div>

      <div className="item">
        <span className="label">Pension</span>
        <input
          type="number"
          defaultValue={pension}
          onChange={(e) => setPension(Number(e.target.value))}
        />
      </div>

      <div className="item">
        <span className="label">Särskild löneskatt</span>
        <span className="value">
          {formatNumber(getExtraSalaryFee(pension))}
        </span>
      </div>

      <div className="item">
        <span className="label">Semesterlön</span>
        <span className="value">{formatNumber(getVacation(salary))}</span>
      </div>

      <div className="item">
        <span className="label">Arbetsgivaravgift semesterlön</span>
        <span className="value">
          {formatNumber(getVacationPayExtraTaxAmount(getVacation(salary)))}
        </span>
      </div>

      <div className="item">
        <span className="label">Fasta kostnader (Mobil)</span>
        <span className="value">{formatNumber(mobileCost)}</span>
      </div>

      <div className="item total">
        <span className="label">Summa</span>
        <span className="value">{formatNumber(getTotalCost())}</span>
      </div>

      <div className="item">
        <span className="label">Kvar på lönekontot</span>
        <span
          className={`value ${getSavedAmount() < 0 ? "negative" : "positive"}`}
        >
          {formatNumber(getSavedAmount())}
        </span>
      </div>
    </div>
  );
};
