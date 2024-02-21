import { useState, useEffect } from "react";
import axios from "axios";

import "./CurrencyConverter.css";

const CurrencyConverter = () => {
  const [rates, setRates] = useState(null);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("USD");
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(null);

  const [convertedUSD, setConvertedUSD] = useState(null);
  const [convertedCNY, setConvertedCNY] = useState(null);
  const [convertedEUR, setConvertedEUR] = useState(null);
  const [convertedJPY, setConvertedJPY] = useState(null);
  const [convertedINR, setConvertedINR] = useState(null);

  useEffect(() => {
    axios
      .get(
        "https://v6.exchangerate-api.com/v6/7cae17b58103106904ac0847/latest/USD"
      )
      .then((response) => {
        setRates(response.data.conversion_rates);
      })
      .catch((error) => {
        console.log("Erro:" + error);
      });
  }, []);

  useEffect(() => {
    if (rates) {
      const rateFrom = rates[fromCurrency] || 0;
      const rateTo = rates[toCurrency] || 0;
      setConvertedAmount(((amount / rateFrom) * rateTo).toFixed(2));

      setConvertedUSD(((amount / rateFrom) * rates.USD).toFixed(2));
      setConvertedCNY(((amount / rateFrom) * rates.CNY).toFixed(2));
      setConvertedEUR(((amount / rateFrom) * rates.EUR).toFixed(2));
      setConvertedJPY(((amount / rateFrom) * rates.EUR).toFixed(2));
      setConvertedINR(((amount / rateFrom) * rates.EUR).toFixed(2));
    }
  }, [amount, rates, fromCurrency, toCurrency]);

  if (!rates) {
    return <h1>Carregando...</h1>;
  }

  console.log(rates);
  return (
    <>
      <div className="converter">
        <h2>Conversor de Moedas</h2>
        <input
          type="number"
          placeholder="Digite o valor..."
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <span>Selecione a moeda:</span>
        <select
          value={fromCurrency}
          onChange={(e) => setFromCurrency(e.target.value)}
        >
          {Object.keys(rates).map((currency) => (
            <option value={currency} key={currency}>
              {currency}
            </option>
          ))}
        </select>
        <span>Para:</span>
        <select
          value={toCurrency}
          onChange={(e) => setToCurrency(e.target.value)}
        >
          {Object.keys(rates).map((currency) => (
            <option value={currency} key={currency}>
              {currency}
            </option>
          ))}
        </select>
        <h3>
          {convertedAmount} {toCurrency}
        </h3>
        <p>
          {amount} {fromCurrency} valem {convertedAmount} {toCurrency}
        </p>
      </div>
      <div className="conversions-container">
        <div className="conv-container">
          <h3>{rates.USD} USD</h3>
          <p>
            {amount} {fromCurrency} valem {convertedUSD} USD
          </p>
        </div>
        <div className="conv-container">
          <h3>{rates.CNY} CNY</h3>
          <p>
            {amount} {fromCurrency} valem {convertedCNY} CNY
          </p>
        </div>
        <div className="conv-container">
          <h3>{rates.EUR} EUR</h3>
          <p>
            {amount} {fromCurrency} valem {convertedEUR} EUR
          </p>
        </div>
        <div className="conv-container">
          <h3>{rates.JPY} JPY</h3>
          <p>
            {amount} {fromCurrency} valem {convertedJPY} JPY
          </p>
        </div>
        <div className="conv-container">
          <h3>{rates.INR} INR</h3>
          <p>
            {amount} {fromCurrency} valem {convertedINR} INR
          </p>
        </div>
      </div>
    </>
  );
};

export default CurrencyConverter;
