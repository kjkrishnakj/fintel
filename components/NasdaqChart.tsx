"use client"

import React, { useEffect, useState } from "react";
import { csvParse } from "d3-dsv";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function NasdaqChart() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    fetch("/data/nasdaq.csv")
      .then((res) => res.text())
      .then((text) => {
        const parsed = csvParse(text);
        const cleaned = parsed
          .filter((row) => row.Date && row["Close/Last"])
          .map((row) => ({
            Date: row.Date,
            Close: parseFloat(row["Close/Last"]),
          }));
        setData(cleaned);
      });
  }, []);

  return (
    <div className="w-full h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Date" />
          <YAxis domain={["auto", "auto"]} />
          <Tooltip />
          <Line type="monotone" dataKey="Close" stroke="#8884d8" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
