/*import React, { useState, useEffect } from "react";
import axios from "axios";
import { VerticalGraph } from "./VerticalGraph";

const Holdings = () => {
  const [allHoldings, setAllHoldings] = useState([]);

  useEffect(() => {
    axios
      //.get("http://localhost:3002/allHoldings")
      .get("https://zerodha-backend-r60u.onrender.com/allHoldings")
      .then((res) => {
        // Safe check: ensure it is always an Array before updating state
        setAllHoldings(Array.isArray(res.data) ? res.data : []);
      })
      .catch((err) => {
        console.error("Error fetching holdings:", err);
      });
  }, []);

  const labels = allHoldings.map((stock) => stock.name);

  const data = {
    labels,
    datasets: [
      {
        label: "Stock Price",
        data: allHoldings.map((stock) => stock.price),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <>
      <h3 className="title">Holdings ({allHoldings.length})</h3>

      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg. cost</th>
              <th>LTP</th>
              <th>Cur. val</th>
              <th>P&L</th>
              <th>Net chg.</th>
              <th>Day chg.</th>
            </tr>
          </thead>
          <tbody>
            {allHoldings.map((stock, index) => {
              const qty = Number(stock.qty) || 0;
              const avg = Number(stock.avg) || 0;
              const price = Number(stock.price) || 0;

              const curValue = price * qty;
              const pnl = curValue - avg * qty;
              const isProfit = pnl >= 0.0;
              const profClass = isProfit ? "profit" : "loss";
              const dayClass = stock.isLoss ? "loss" : "profit";

              return (
                <tr key={index}>
                  <td>{stock.name}</td>
                  <td>{qty}</td>
                  <td>{avg.toFixed(2)}</td>
                  <td>{price.toFixed(2)}</td>
                  <td>{curValue.toFixed(2)}</td>
                  <td className={profClass}>{pnl.toFixed(2)}</td>
                  <td className={profClass}>{stock.net}</td>
                  <td className={dayClass}>{stock.day}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="row">
        <div className="col">
          <h5>
            29,875.<span>55</span>{" "}
          </h5>
          <p>Total investment</p>
        </div>
        <div className="col">
          <h5>
            31,428.<span>95</span>{" "}
          </h5>
          <p>Current value</p>
        </div>
        <div className="col">
          <h5>1,553.40 (+5.20%)</h5>
          <p>P&L</p>
        </div>
      </div>

      <VerticalGraph data={data} />
    </>
  );
};

export default Holdings;*/

import React, { useState, useEffect } from "react";
import axios from "axios";
import { VerticalGraph } from "./VerticalGraph";

const Holdings = () => {
  const [allHoldings, setAllHoldings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    axios
      .get("https://zerodha-backend-r60u.onrender.com/allHoldings", {
        withCredentials: true,
      })
      .then((res) => {
        // Ensure data is always an array
        const holdingsData = Array.isArray(res.data) ? res.data : [];
        setAllHoldings(holdingsData);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching holdings:", err);
        setFetchError("Failed to load holdings data.");
        setLoading(false);
      });
  }, []);

  const labels = allHoldings.map((stock) => stock.name);

  const data = {
    labels,
    datasets: [
      {
        label: "Stock Price",
        data: allHoldings.map((stock) => stock.price),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  // Dynamic totals calculated from database records
  const totalInvestment = allHoldings.reduce(
    (sum, stock) => sum + (Number(stock.avg) || 0) * (Number(stock.qty) || 0),
    0
  );

  const currentValue = allHoldings.reduce(
    (sum, stock) => sum + (Number(stock.price) || 0) * (Number(stock.qty) || 0),
    0
  );

  const totalPnl = currentValue - totalInvestment;
  const pnlPercentage =
    totalInvestment > 0 ? ((totalPnl / totalInvestment) * 100).toFixed(2) : 0;

  if (loading) {
    return <p style={{ padding: "20px" }}>Loading holdings...</p>;
  }

  if (fetchError) {
    return (
      <p style={{ padding: "20px", color: "red" }}>
        {fetchError} Please ensure the backend is awake.
      </p>
    );
  }

  return (
    <>
      <h3 className="title">Holdings ({allHoldings.length})</h3>

      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg. cost</th>
              <th>LTP</th>
              <th>Cur. val</th>
              <th>P&L</th>
              <th>Net chg.</th>
              <th>Day chg.</th>
            </tr>
          </thead>
          <tbody>
            {allHoldings.map((stock, index) => {
              const qty = Number(stock.qty) || 0;
              const avg = Number(stock.avg) || 0;
              const price = Number(stock.price) || 0;

              const curValue = price * qty;
              const pnl = curValue - avg * qty;
              const isProfit = pnl >= 0.0;
              const profClass = isProfit ? "profit" : "loss";
              const dayClass = stock.isLoss ? "loss" : "profit";

              return (
                <tr key={stock._id || index}>
                  <td>{stock.name}</td>
                  <td>{qty}</td>
                  <td>{avg.toFixed(2)}</td>
                  <td>{price.toFixed(2)}</td>
                  <td>{curValue.toFixed(2)}</td>
                  <td className={profClass}>{pnl.toFixed(2)}</td>
                  <td className={profClass}>{stock.net || "0.00%"}</td>
                  <td className={dayClass}>{stock.day || "0.00%"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="row">
        <div className="col">
          <h5>{totalInvestment.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</h5>
          <p>Total investment</p>
        </div>
        <div className="col">
          <h5>{currentValue.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</h5>
          <p>Current value</p>
        </div>
        <div className="col">
          <h5 className={totalPnl >= 0 ? "profit" : "loss"}>
            {totalPnl.toFixed(2)} ({pnlPercentage}%)
          </h5>
          <p>P&L</p>
        </div>
      </div>

      {allHoldings.length > 0 && <VerticalGraph data={data} />}
    </>
  );
};

export default Holdings;