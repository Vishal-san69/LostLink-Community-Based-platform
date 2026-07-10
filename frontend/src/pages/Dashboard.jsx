import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  PlusCircle,
  Search,
  Package,
  AlertCircle,
  CheckCircle2,
  Loader2,
} from "lucide-react";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [stats, setStats] = useState({ lost: 0, found: 0, recovered: 0 });
  const [status, setStatus] = useState("loading"); // loading | ready | error

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:5000/api/items/stats/summary",
          { headers: { authorization: token } }
        );
        setStats(response.data);
        setStatus("ready");
      } catch (error) {
        console.log(error);
        setStatus("error");
      }
    };
    fetchStats();
  }, []);

  const statCards = [
    {
      label: "Lost Items",
      value: stats.lost,
      icon: AlertCircle,
      color: "text-red-500",
      ring: "ring-red-100",
    },
    {
      label: "Found Items",
      value: stats.found,
      icon: Package,
      color: "text-emerald-500",
      ring: "ring-emerald-100",
    },
    {
      label: "Recovered",
      value: stats.recovered,
      icon: CheckCircle2,
      color: "text-blue-500",
      ring: "ring-blue-100",
    },
  ];

  const actions = [
    {
      to: "/add-item",
      title: "Add Item",
      desc: "Report a lost or found item",
      icon: PlusCircle,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      to: "/items",
      title: "Browse Items",
      desc: "Search lost & found listings",
      icon: Search,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      to: "/my-items",
      title: "My Items",
      desc: "Manage items you've posted",
      icon: Package,
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      {/* HERO */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-2xl p-8 md:p-10 shadow-md">
        <p className="text-blue-100 text-sm font-medium uppercase tracking-wide mb-2">
          Dashboard
        </p>
        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          Welcome{user?.name ? `, ${user.name}` : ""}
        </h1>
        <p className="text-blue-100 text-base">
          Smart Lost & Found Management System
        </p>
      </div>

      {/* ERROR STATE */}
      {status === "error" && (
        <div className="mt-6 flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">
          <AlertCircle className="w-4 h-4 shrink-0" />
          Couldn't load stats right now. Showing last known values.
        </div>
      )}

      {/* QUICK ACTIONS */}
      <div className="grid md:grid-cols-3 gap-5 mt-8">
        {actions.map(({ to, title, desc, icon: Icon, color, bg }) => (
          <Link
            key={to}
            to={to}
            className="group bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all"
          >
            <div className={`w-11 h-11 ${bg} rounded-xl flex items-center justify-center mb-4`}>
              <Icon className={`w-5 h-5 ${color}`} />
            </div>
            <h2 className={`text-lg font-semibold ${color}`}>{title}</h2>
            <p className="mt-1 text-sm text-gray-500">{desc}</p>
          </Link>
        ))}
      </div>

      {/* STATS */}
      <div className="grid md:grid-cols-3 gap-5 mt-6">
        {statCards.map(({ label, value, icon: Icon, color, ring }) => (
          <div
            key={label}
            className={`bg-white p-6 rounded-2xl border border-gray-100 shadow-sm ring-1 ${ring} flex items-center justify-between`}
          >
            <div>
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                {label}
              </h3>
              <p className={`text-4xl font-bold ${color} mt-2`}>
                {status === "loading" ? (
                  <Loader2 className="w-7 h-7 animate-spin text-gray-300" />
                ) : (
                  value ?? 0
                )}
              </p>
            </div>
            <Icon className={`w-8 h-8 ${color} opacity-20`} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;