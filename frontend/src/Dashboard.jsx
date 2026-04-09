import { Link, useNavigate } from "react-router-dom";
import { TreePine, Medal } from "lucide-react";
import { Button } from "./ui/button";
import { DashboardTree } from "./DashboardTree";
import { useEffect, useState } from "react";

export function Dashboard() {
  const navigate = useNavigate();

  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentGoal = goals[currentIndex];

  const fetchDashboard = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/dashboard", {
        credentials: "include",
      });

      const data = await response.json();


      if (data.goals) {
        setGoals(data.goals);
      }
    } catch (error) {
      console.error("dashboardの取得に失敗しました", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  const handleCheck = async () => {
    if (currentGoal?.today_checked || !currentGoal) return;

    try {
      const response = await fetch("http://localhost:3000/api/checkins", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ goal_id: currentGoal.id }),
      });

      const data = await response.json();

      if (data.success) {
        fetchDashboard();
      } else {
        console.error(data.errors);
      }
    } catch (error) {
      console.error("checkinの作成に失敗しました", error);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/session", {
        method: "DELETE",
        headers: {
          "Accept": "application/json",
        },
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok && data.success) {
        navigate("/login");
      } else {
        console.error(data.error || "ログアウトに失敗しました");
      }
    } catch (error) {
      console.error("ログアウトに失敗しました", error);
    }
  };


  if (loading) {
    return <div className="p-8 text-xl">読み込み中...</div>;
  }

  if (goals.length === 0) {
    return (
      <div className="min-h-screen bg-[#dff0e7]">
        <header className="border-b border-emerald-200 bg-white/90">
          <div className="mx-auto flex max-w-[1400px] items-center justify-between px-8 py-4">
            <Link to="/" className="flex items-center gap-3">
              <TreePine className="h-9 w-9 text-green-600" />
              <h1 className="text-2xl font-semibold text-gray-900">GrowLog</h1>
            </Link>

            <div className="flex items-center gap-4">
              <Link to="/goals/new">
                <Button className="rounded-xl bg-[#02021f] px-5 py-2 text-base text-white hover:bg-[#111138]">
                  目標登録
                </Button>
              </Link>
            
              <Button 
                onClick={handleLogout}
                variant="ghost"
                className="text-base text-slate-900"
              >
                ログアウト
              </Button>
            </div>
          </div>
        </header>

        <main className="mx-auto flex min-h-[calc(100vh-81px)] max-w-[1400px] items-center justify-center px-8 py-12">
          <div className="w-full max-w-[720px] rounded-[28px] border border-slate-200 bg-white/90 px-10 py-12 text-center shadow-sm">
            <div className="mx-auto mb-6 flex h-28 w-28 items-center justify-center rounded-full bg-green-100">
              <span className="text-5xl">🌱</span>
            </div>

            <h2 className="text-4xl font-semibold text-green-800">
              まだ目標がありません
            </h2>

            <p className="mx-auto mt-4 max-w-[520px] text-lg leading-relaxed text-slate-600">
              最初の目標を登録すると、あなたの木が育ち始めます。
              小さな一歩から、GrowLogを始めましょう。
            </p>

            <div className="mt-8">
              <Link to="/goals/new">
                <Button className="rounded-2xl bg-[#02021f] px-10 py-6 text-xl text-white hover:bg-[#111138]">
                  目標を登録する
                </Button>
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
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

            <Button 
              onClick={handleLogout}
              variant="ghost"
              className="text-base text-slate-900"
            >
              ログアウト
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1400px] px-6 py-8">
        <div className="mb-8 flex items-center justify-center gap-3 text-[22px] font-medium text-slate-900">
          <Medal className="h-7 w-7 text-amber-500" />
          <span>達成回数: {currentGoal.checkin_count}回</span>
        </div>


        
        <div className="mx-auto max-w-[760px] rounded-[28px] border border-slate-200 bg-white/90 px-8 py-8 shadow-sm">
          <div className="flex items-center justify-center gap-6">
            <button
              onClick={() => setCurrentIndex((prev) => Math.max(prev - 1, 0))}
              disabled={currentIndex === 0}
              className="text-3xl text-slate-500 hover:text-slate-800 disabled:opacity-30"
            >
              ◀
            </button>

            <h2 className="text-4xl font-medium text-green-700">
              {currentGoal.title}
            </h2>

            <button
              onClick={() =>
                setCurrentIndex((prev) =>
                  Math.min(prev + 1, goals.length - 1)
                )
              }
              disabled={currentIndex === goals.length - 1}
              className="text-3xl text-slate-500 hover:text-slate-800 disabled:opacity-30"
            >
              ▶
            </button>
          </div>

          <div className="mt-8 flex justify-center">
            <DashboardTree count={currentGoal.checkin_count} />
          </div>

          <div className="mt-8 flex justify-center">
            {currentGoal.today_checked ? (
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