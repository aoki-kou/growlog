import { Link, useNavigate } from "react-router-dom";
import { TreePine, Medal } from "lucide-react";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";

export function GoalsIndex() {
  const navigate = useNavigate();

  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchGoals = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/goals", {
        credentials: "include",
      });

      if (response.status === 401) {
        navigate("/login");
        return;
      }

      const data = await response.json();

      if (data.goals) {
        setGoals(data.goals);
      }
    } catch (error) {
      console.error("目標一覧の取得に失敗しました", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/session", {
        method: "DELETE",
        headers: {
          Accept: "application/json",
        },
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok && data.success) {
        navigate("/login");
      }
    } catch (error) {
      console.error("ログアウトに失敗しました", error);
    }
  };

  useEffect(() => {
    fetchGoals();
  }, [navigate]);

  if (loading) {
    return <div className="p-8 text-xl">読み込み中...</div>;
  }

  return (
    <div className="min-h-screen bg-[#dff0e7]">
      <header className="border-b border-emerald-200 bg-white/90">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-8 py-4">
          <Link to="/" className="flex items-center gap-3">
            <TreePine className="h-9 w-9 text-green-600" />
            <h1 className="text-2xl font-semibold text-gray-900">GrowLog</h1>
          </Link>

          <div className="flex items-center gap-4">
            <Link to="/dashboard">
              <Button variant="ghost" className="text-base text-slate-900">
                Top
              </Button>
            </Link>

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

      <main className="mx-auto max-w-[1200px] px-8 py-10">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-4xl font-semibold text-slate-900">目標一覧</h2>
          <p className="text-lg text-slate-600">登録数: {goals.length}件</p>
        </div>

        {goals.length === 0 ? (
          <div className="rounded-[28px] border border-slate-200 bg-white/90 px-10 py-12 text-center shadow-sm">
            <h3 className="text-3xl font-semibold text-green-800">
              まだ目標がありません
            </h3>
            <p className="mt-4 text-lg text-slate-600">
              最初の目標を登録して、木を育て始めましょう。
            </p>
            <div className="mt-8">
              <Link to="/goals/new">
                <Button className="rounded-2xl bg-[#02021f] px-8 py-5 text-lg text-white hover:bg-[#111138]">
                  目標を登録する
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {goals.map((goal) => (
              <div
                key={goal.id}
                className="rounded-[28px] border border-slate-200 bg-white/90 px-6 py-6 shadow-sm"
              >
                <h3 className="text-2xl font-semibold text-green-700">
                  {goal.title}
                </h3>

                <div className="mt-4 flex items-center gap-2 text-slate-700">
                  <Medal className="h-5 w-5 text-amber-500" />
                  <span>達成回数: {goal.checkin_count}回</span>
                </div>

                <p className="mt-3 text-slate-600">
                  成長段階: {goal.tree_stage?.name}
                </p>

                <p className="mt-2 text-sm text-slate-500">
                  {goal.today_checked ? "今日は達成済みです" : "今日はまだ未達成です"}
                </p>

                <div className="mt-6">
                  <Link to="/dashboard">
                    <Button variant="outline" className="w-full rounded-xl">
                      Top
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}