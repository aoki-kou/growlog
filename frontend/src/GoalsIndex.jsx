import { Link, useNavigate } from "react-router-dom";
import { TreePine, Medal } from "lucide-react";
import { Button } from "./ui/button";
import { Header } from "./components/Header";
import { useEffect, useState } from "react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export function GoalsIndex() {
  const navigate = useNavigate();

  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchGoals = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/goals`, {
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
      const response = await fetch(`${API_BASE_URL}/api/session`, {
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

  const handleDelete = async (goalId) => {
    if (!window.confirm("この目標を削除しますか？")) return;

    try {
      const response = await fetch(`${API_BASE_URL}/api/goals/${goalId}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
        },
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setGoals((prevGoals) => prevGoals.filter((goal) => goal.id !== goalId));
      } else {
        console.error(data.error || "削除に失敗しました");
      }
    } catch (error) {
      console.error("削除に失敗しました", error);
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
      <Header>
        <Link to="/dashboard">
          <Button variant="ghost" className="text-sm text-slate-900 sm:text-base">
            Top
          </Button>
        </Link>

        <Link to="/goals/new">
          <Button className="rounded-xl bg-[#02021f] px-3 py-2 text-sm text-white hover:bg-[#111138] sm:px-5 sm:text-base">
            目標登録
          </Button>
        </Link>

        <Button
          onClick={handleLogout}
          variant="ghost"
          className="text-sm text-slate-900 sm:text-base"
        >
          ログアウト
        </Button>
      </Header>

      <main className="mx-auto max-w-[1200px] px-4 py-8 sm:px-8 sm:py-10">
        <div className="mb-6 flex flex-col gap-2 sm:mb-8 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-3xl font-semibold text-slate-900 sm:text-4xl">
            目標一覧
          </h2>

          <p className="text-base text-slate-600 sm:text-lg">
            登録数: {goals.length}件
          </p>
        </div>

        {goals.length === 0 ? (
          <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 text-center shadow-sm sm:px-10 sm:py-12">
            <h3 className="text-2xl font-semibold text-green-800 sm:text-3xl">
              まだ目標がありません
            </h3>

            <p className="mt-4 text-base text-slate-600 sm:text-lg">
              最初の目標を登録して、木を育て始めましょう。
            </p>

            <div className="mt-8">
              <Link to="/goals/new">
                <Button className="rounded-2xl bg-[#02021f] px-6 py-4 text-base text-white hover:bg-[#111138] sm:px-8 sm:py-5 sm:text-lg">
                  目標を登録する
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid gap-4 sm:gap-6 md:grid-cols-2 xl:grid-cols-3">
            {goals.map((goal) => (
              <div
                key={goal.id}
                className="rounded-3xl border border-slate-200 bg-white/90 p-5 shadow-sm sm:p-6"
              >
                <h3 className="text-xl font-semibold text-green-700 sm:text-2xl">
                  {goal.title}
                </h3>

                <div className="mt-4 flex items-center gap-2 text-sm text-slate-700 sm:text-base">
                  <Medal className="h-5 w-5 text-amber-500" />
                  <span>達成回数: {goal.checkin_count}回</span>
                </div>

                <p className="mt-3 text-sm text-slate-600 sm:text-base">
                  成長段階: {goal.tree_stage?.name}
                </p>

                <p className="mt-2 text-xs text-slate-500 sm:text-sm">
                  {goal.today_checked
                    ? "今日は達成済みです"
                    : "今日はまだ未達成です"}
                </p>

                <div className="mt-6 flex gap-3">
                  <Button
                    onClick={() => handleDelete(goal.id)}
                    variant="outline"
                    className="flex-1 rounded-xl border-red-300 text-red-600"
                  >
                    削除
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}