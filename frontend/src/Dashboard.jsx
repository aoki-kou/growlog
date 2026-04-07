import { Link } from "react-router-dom";
import { TreePine, Home, Medal } from "lucide-react";
import { Button } from "./ui/button";
import { DashboardTree } from "./DashboardTree";
import { useEffect, useState } from "react";

export function Dashboard() {
  const [goal, setGoal] = useState(null);
  const [count, setCount] = useState(0);
  const [isCheckedToday, setIsCheckedToday] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/dashboard", {
          credentials: "include",
        });

        const data = await response.json();


        if (data.goal) {
          setGoal(data.goal);
          setCount(data.goal.checkin_count);
          setIsCheckedToday(data.goal.today_checked);
        }
      } catch (error) {
        console.error("dashboardの取得に失敗しました", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  const handleCheck = async () => {
    if (isCheckedToday || !goal) return;

    try {
      const response = await fetch("http://localhost:3000/api/checkins", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ goal_id: goal.id }),
      });

      const data = await response.json();

      if (data.success) {
        setCount(data.checkin_count);
        setIsCheckedToday(data.today_checked);
      } else {
        console.error(data.errors);
      }
    } catch (error) {
      console.error("checkinの作成に失敗しました", error);
    }
  };

  if (loading) {
    return <div className="p-8 text-xl">読み込み中...</div>;
  }

  if (!goal) {
    return <div className="p-8 text-xl">目標がまだありません</div>;
  }

  return (
    <div className="min-h-screen bg-[#dff0e7]">
      <header className="border-b border-emerald-200 bg-white/90">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-8 py-4">
          <Link to="/" className="flex items-center gap-3">
            <TreePine className="h-9 w-9 text-green-600" />
            <h1 className="text-2xl font-semibold text-gray-900">Growlog</h1>
          </Link>

          <div className="flex items-center gap-4">
            <Link to="/goals/new">
              <Button className="rounded-xl bg-[#02021f] px-5 py-2 text-base text-white hover:bg-[#111138]">
                目標登録
              </Button>
            </Link>

            <Link to="/">
              <Button variant="ghost" className="p-2">
                <Home className="h-6 w-6 text-slate-900" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1400px] px-6 py-8">
        <div className="mb-8 flex items-center justify-center gap-3 text-[22px] font-medium text-slate-900">
          <Medal className="h-7 w-7 text-amber-500" />
          <span>達成回数: {count}回</span>
        </div>

        <div className="mx-auto max-w-[760px] rounded-[28px] border border-slate-200 bg-white/90 px-8 py-8 shadow-sm">
          <div className="text-center">
            <h2 className="text-4xl font-medium text-green-700">{goal.title}</h2>
          </div>

          <div className="mt-8 flex justify-center">
            <DashboardTree count={count} />
          </div>

          <div className="mt-8 flex justify-center">
            {isCheckedToday ? (
              <button
                className="cursor-not-allowed rounded-2xl bg-gray-400 px-14 py-6 text-[26px] text-white"
                disabled
              >
                水やり済み 🌱
              </button>
            ) : (
              <button
                onClick={handleCheck}
                className="rounded-2xl bg-green-600 px-14 py-6 text-[26px] text-white hover:bg-green-700"
              >
                達成
              </button>
            )}
          </div>

          <p className="mt-6 text-center text-xl text-slate-600">
            継続することで、あなたの木が成長します
          </p>
        </div>
      </main>
    </div>
  );
}