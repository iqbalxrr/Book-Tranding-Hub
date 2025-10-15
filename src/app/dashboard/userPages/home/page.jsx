"use client";
import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { BookOpen, RefreshCcw, Handshake, Book } from "lucide-react";

// --- Custom Components for the Cards ---
const StatCard = ({ title, value, icon, bgColor, textColor }) => (
  <div
    className={`relative overflow-hidden p-6 rounded-3xl shadow-xl backdrop-blur-md bg-white/30 border border-white/50`}
    style={{
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)",
    }}
  >
    {/* Background color blob */}
    <div
      className={`absolute inset-0 z-0 opacity-30 blur-2xl rounded-3xl ${bgColor}`}
    ></div>
    <div className="relative z-10 flex items-center justify-between">
      <div>
        <h3 className="text-gray-700 text-base mb-1">{title}</h3>
        <p className={`text-4xl font-bold ${textColor}`}>{value}</p>
      </div>
      <div
        className={`w-14 h-14 flex items-center justify-center rounded-2xl ${bgColor}/40 text-white`}
      >
        {React.cloneElement(icon, { size: 32 })}
      </div>
    </div>
  </div>
);

// --- Main Dashboard Component ---
const DashboardPage = () => {
  // 📊 Demo Data
  const bookStats = {
    totalBooks: 35,
    available: 20,
    requested: 10,
    exchanged: 5,
  };

  const pieData = [
    { name: "Available", value: bookStats.available },
    { name: "Requested", value: bookStats.requested },
    { name: "Exchanged", value: bookStats.exchanged },
  ];

  const PIE_COLORS = ["#10B981", "#8B5CF6", "#3B82F6"];

  const monthlyExchangeData = [
    { month: "Jan", count: 1 },
    { month: "Feb", count: 2 },
    { month: "Mar", count: 2.5 },
    { month: "Apr", count: 4 },
    { month: "May", count: 6 },
    { month: "Jun", count: 7 },
    { month: "Jul", count: 8.5 },
    { month: "Aug", count: 9 },
    { month: "Sep", count: 9.5 },
    { month: "Oct", count: 10 },
  ];

  return (
    <div className="p-10  min-h-screen">
      {/* <h1 className="text-4xl font-extrabold mb-10 text-gray-900 drop-shadow-sm">
        Dashboard
      </h1> */}

      {/* ==== Stats Cards ==== */}
      <div className="grid grid-cols-1 sm:grid-cols-2  xl:grid-cols-4 gap-8 mb-12">
        <StatCard
          title="Total Books:"
          value={bookStats.totalBooks}
          icon={<Book color="#009688" />}
          bgColor="bg-teal-500"
          textColor="text-teal-700"
        />
        <StatCard
          title="Available"
          value={bookStats.available}
          icon={<BookOpen color="#22C55E"  />}
          bgColor="bg-green-500"
          textColor="text-green-700"
        />
        <StatCard
          title="Requested"
          value={bookStats.requested}
          icon={<RefreshCcw color="#9C27B0" />}
          bgColor="bg-purple-500"
          textColor="text-purple-700"
        />
        <StatCard
          title="Exchanged"
          value={bookStats.exchanged}
          icon={<Handshake color="#3B82F6" />}
          bgColor="bg-blue-500"
          textColor="text-blue-700"
        />
      </div>

      {/* --- Charts Section --- */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Pie Chart */}
        <div className="p-8 rounded-3xl shadow-xl backdrop-blur-md bg-white/30 border border-white/50">
          <h3 className="text-xl font-semibold mb-6 text-gray-800">
            Book Status Overview
          </h3>
          <div className="flex flex-col lg:flex-row items-center justify-around">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  label={false} // Hide labels to match screenshot
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={PIE_COLORS[index % PIE_COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>

            {/* Pie Chart Legend */}
            <div className="mt-6 lg:mt-0">
              {pieData.map((entry, index) => (
                <div key={`legend-${index}`} className="flex items-center my-2">
                  <span
                    className="w-4 h-4 rounded-full inline-block mr-2"
                    style={{
                      backgroundColor: PIE_COLORS[index % PIE_COLORS.length],
                    }}
                  ></span>
                  <span className="text-gray-700">{entry.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Line Chart */}
        <div className="p-8 rounded-3xl shadow-xl backdrop-blur-md bg-white/30 border border-white/50">
          <h3 className="text-xl font-semibold mb-6 text-gray-800">
            Monthly Exchange History
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart
              data={monthlyExchangeData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" opacity={0.5} vertical={false} />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                padding={{ left: 20, right: 20 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                domain={[0, 10]}
                tickFormatter={(value) => `${value}%`}
              />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="count"
                stroke="#8B5CF6"
                strokeWidth={3}
                dot={false}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;