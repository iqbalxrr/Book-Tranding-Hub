"use client";

import React from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import {
  BookOpen,
  Book,
  Bookmark,
  Users,
  MessageSquare,
  Gift,
  Star,
} from "lucide-react";

// --- Stats Card Component ---
const StatCard = ({ title, value, icon, bgColor, textColor }) => (
  <div
    className={`relative overflow-hidden p-6 rounded-3xl shadow-xl backdrop-blur-md bg-white/30 border border-white/50`}
    style={{
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)",
    }}
  >
    <div
      className={`absolute inset-0 z-0 opacity-30 blur-2xl rounded-3xl ${bgColor}`}
    ></div>
    <div className="relative z-10 flex items-center justify-between mb-4">
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

// --- Line Chart Component ---
const MetricLineChart = ({ title, chartData, dataKey, color }) => (
  <div className="p-6 rounded-3xl shadow-xl backdrop-blur-md bg-white/30 border border-white/50">
    <h3 className="text-gray-800 font-semibold mb-4">{title} Trend</h3>
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Line
          type="monotone"
          dataKey={dataKey}
          stroke={color}
          strokeWidth={3}
          dot={{ r: 4 }}
        />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

// --- Bar Chart Component ---
const MetricBarChart = ({ title, chartData, dataKey, color }) => (
  <div className="p-6 rounded-3xl shadow-xl backdrop-blur-md bg-white/30 border border-white/50">
    <h3 className="text-gray-800 font-semibold mb-4">{title} Comparison</h3>
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Bar dataKey={dataKey} fill={color} />
      </BarChart>
    </ResponsiveContainer>
  </div>
);

// --- Pie Chart Component ---
const MetricPieChart = ({ title, chartData, dataKey, colors }) => (
  <div className="p-6 rounded-3xl shadow-xl backdrop-blur-md bg-white/30 border border-white/50">
    <h3 className="text-gray-800 font-semibold mb-4">{title} Distribution</h3>
    <ResponsiveContainer width="100%" height={200}>
      <PieChart>
        <Pie
          data={chartData}
          dataKey={dataKey}
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={70}
          innerRadius={30}
          paddingAngle={5}
          label
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  </div>
);

export default function AdminDashboard() {
  // --- Stats Data (Bookmarks card stays) ---
  const statsData = [
    { title: "Book Trending", value: 12, icon: <BookOpen color="#10B981" />, bgColor: "bg-green-500", textColor: "text-green-700", type: "line", key: "trending", color: "#10B981" },
    { title: "Bookmarks", value: 45, icon: <Bookmark color="#8B5CF6" />, bgColor: "bg-purple-500", textColor: "text-purple-700", type: "none", key: "bookmarks" }, // chart removed
    { title: "Books", value: 120, icon: <Book color="#3B82F6" />, bgColor: "bg-blue-500", textColor: "text-blue-700", type: "bar", key: "books", color: "#3B82F6" },
    { title: "Contacts", value: 34, icon: <MessageSquare color="#F59E0B" />, bgColor: "bg-yellow-500", textColor: "text-yellow-700", type: "bar", key: "contacts", color: "#F59E0B" },
    { title: "Donation Money", value: "$5,000", icon: <Gift color="#EF4444" />, bgColor: "bg-red-500", textColor: "text-red-700", type: "line", key: "donation", color: "#EF4444" },
    { title: "Reviews", value: 78, icon: <Star color="#FBBF24" />, bgColor: "bg-orange-500", textColor: "text-orange-700", type: "pie", key: "reviews", color: ["#FBBF24", "#FDE68A"] },
    { title: "Users", value: 220, icon: <Users color="#14B8A6" />, bgColor: "bg-teal-500", textColor: "text-teal-700", type: "line", key: "users", color: "#14B8A6" },
  ];

  // --- Line/Bar Chart Demo Data ---
  const lineBarData = [
    { month: "Jan", trending: 2, books: 10, contacts: 3, donation: 500, users: 20 },
    { month: "Feb", trending: 3, books: 15, contacts: 4, donation: 700, users: 30 },
    { month: "Mar", trending: 1, books: 20, contacts: 6, donation: 600, users: 25 },
    { month: "Apr", trending: 4, books: 25, contacts: 8, donation: 900, users: 35 },
    { month: "May", trending: 5, books: 30, contacts: 5, donation: 1000, users: 40 },
    { month: "Jun", trending: 6, books: 28, contacts: 7, donation: 800, users: 50 },
  ];

  // --- Pie Chart Demo Data ---
  const pieData = {
    reviews: [
      { name: "Positive", value: 50 },
      { name: "Negative", value: 28 },
    ],
  };

  return (
    <div className="p-10 min-h-screen ">
      {/* === Stats Cards === */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8 mb-12">
        {statsData.map((item) => (
          <StatCard
            key={item.title}
            title={item.title}
            value={item.value}
            icon={item.icon}
            bgColor={item.bgColor}
            textColor={item.textColor}
          />
        ))}
      </div>

      {/* === Charts Section (exclude Bookmarks) === */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
        {statsData.map((item) => {
          if (item.type === "line") {
            return (
              <MetricLineChart
                key={item.key}
                title={item.title}
                chartData={lineBarData}
                dataKey={item.key}
                color={item.color}
              />
            );
          } else if (item.type === "bar") {
            return (
              <MetricBarChart
                key={item.key}
                title={item.title}
                chartData={lineBarData}
                dataKey={item.key}
                color={item.color}
              />
            );
          } else if (item.type === "pie") {
            return (
              <MetricPieChart
                key={item.key}
                title={item.title}
                chartData={pieData[item.key]}
                dataKey="value"
                colors={item.color}
              />
            );
          }
          return null; // Bookmarks card excluded from charts
        })}
      </div>
    </div>
  );
}
