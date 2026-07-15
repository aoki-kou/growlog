import { Link, useNavigate } from "react-router-dom";
import { Medal } from "lucide-react";
import { Button } from "./ui/button";
import { Header } from "./components/Header";
import { FlashMessage } from "./components/FlashMessage";
import { useLocation } from "react-router-dom";
import { DashboardTree } from "./DashboardTree";
import { useEffect, useState } from "react";
import { Calendar } from "lucide-react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export function Dashboard() {
  const navigate = useNavigate();

  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentGoal = goals[currentIndex];
  const location = useLocation();
  const flashMessage = location.state?.flashMessage;

  const fetchDashboard = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/dashboard`, {
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

  const checkAuth = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/me`, {
        credentials: "include",
      });

      if (response.status === 401) {
        navigate("/login");
        return false;
      }

      return true;
    } catch (error) {
      console.error("認証に失敗しました", error);
      navigate("/login");
      return false;
    }
  };

  useEffect(() => {
    const initializeDashboard = async () => {
      const isLoggedIn = await checkAuth();

      if (!isLoggedIn) return;

      await fetchDashboard();
    };

    initializeDashboard();
  }, [navigate]);

  const handleCheck = async () => {
    if (currentGoal?.today_checked || !currentGoal) return;

    try {
      const response = await fetch(`${API_BASE_URL}/api/checkins`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ goal_id: currentGoal.id }),
      });

      const data = await response.json();

      if (data.success) {
        await fetchDashboard();
      } else {
        console.error(data.errors);
      }
    } catch (error) {
      console.error("checkinの作成に失敗しました", error);
    } finally {
    setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/session`, {
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
        <Header>
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

        <main className="mx-auto min-h-[calc(100vh-81px)] max-w-[1400px] px-4 py-8 sm:px-8 sm:py-12">
          <FlashMessage message={flashMessage} />

          <div className="flex min-h-[calc(100vh-160px)] items-center justify-center">
            <div className="w-full max-w-[360px] rounded-3xl border border-slate-200 bg-white/90 p-6 text-center shadow-sm sm:max-w-[720px] sm:px-10 sm:py-12">
              <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 sm:mb-6 sm:h-28 sm:w-28">
                <span className="text-4xl sm:text-5xl">🌱</span>
              </div>

              <h2 className="text-2xl font-semibold text-green-800 sm:text-4xl">
                まだ目標がありません
              </h2>

              <p className="mx-auto mt-4 max-w-[520px] text-base leading-relaxed text-slate-600 sm:text-lg">
                最初の目標を登録すると、あなたの木が育ち始めます。
                小さな一歩から、GrowLogを始めましょう。
              </p>

              <div className="mt-8">
                <Link to="/goals/new">
                  <Button className="rounded-2xl bg-[#02021f] px-7 py-5 text-base text-white hover:bg-[#111138] sm:px-10 sm:py-6 sm:text-xl">
                    目標を登録する
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#dff0e7]">
      <Header>
        <Link to="/goals/new">
          <Button className="rounded-xl bg-[#02021f] px-2 py-2 text-xs whitespace-nowrap text-white hover:bg-[#111138] sm:px-4 sm:text-base">
            目標登録
          </Button>
        </Link>

        <Link to="/goals">
          <Button
            variant="ghost"
            className="px-2 text-xs whitespace-nowrap text-slate-900 sm:px-4 sm:text-base"
          >
            目標一覧
          </Button>
        </Link>

        <Link to="/calendar">
          <Button className="flex items-center gap-1 rounded-xl bg-green-700 px-2 py-2 text-xs whitespace-nowrap text-white hover:bg-green-800 sm:gap-2 sm:px-5 sm:text-base">
            カレンダー
            <Calendar className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
        </Link>

        <Button
          onClick={handleLogout}
          variant="ghost"
          className="px-2 text-xs whitespace-nowrap text-slate-900 sm:px-4 sm:text-base"
        >
          ログアウト
        </Button>
      </Header>

      <main className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6 sm:py-8">
        <FlashMessage message={flashMessage} />

        <div className="mb-6 flex items-center justify-center gap-2 text-base font-medium text-slate-900 sm:mb-8 sm:gap-3 sm:text-[22px]">
          <Medal className="h-5 w-5 text-amber-500 sm:h-7 sm:w-7" />
          <span>達成回数: {currentGoal.checkin_count}回</span>
        </div>

      <div className="mx-auto flex max-w-[440px] flex-col gap-5 sm:max-w-[760px] sm:gap-6">
        {/* 目標名を表示する枠 */}
        <section className="rounded-3xl border border-slate-200 bg-white/90 px-4 py-5 shadow-sm sm:px-8 sm:py-6">
          <div className="flex items-center justify-center gap-3 sm:gap-6">
            <button
              type="button"
              onClick={() =>
                setCurrentIndex((prev) => Math.max(prev - 1, 0))
              }
              disabled={currentIndex === 0}
              className="shrink-0 text-2xl text-slate-500 transition hover:text-slate-800 disabled:opacity-30 sm:text-3xl"
              aria-label="前の目標を表示"
            >
              ◀
            </button>

            <h2 className="min-w-0 flex-1 break-words text-center text-2xl font-medium text-green-700 sm:text-4xl">
              {currentGoal.title}
            </h2>

            <button
              type="button"
              onClick={() =>
                setCurrentIndex((prev) =>
                  Math.min(prev + 1, goals.length - 1)
                )
              }
              disabled={currentIndex === goals.length - 1}
              className="shrink-0 text-2xl text-slate-500 transition hover:text-slate-800 disabled:opacity-30 sm:text-3xl"
              aria-label="次の目標を表示"
            >
              ▶
            </button>
          </div>
        </section>

        {/* 木を表示する枠 */}
        <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white/90 p-4 shadow-sm sm:p-6">
          <div className="flex justify-center">
            <DashboardTree count={currentGoal.checkin_count} />
          </div>
        </section>

        {/* 達成ボタンと説明文を表示する枠 */}
        <section className="rounded-3xl border border-slate-200 bg-white/90 px-5 py-6 text-center shadow-sm sm:px-8 sm:py-8">
          <div className="flex justify-center">
            {currentGoal.today_checked ? (
              <button
                type="button"
                className="cursor-not-allowed rounded-2xl bg-gray-400 px-8 py-5 text-xl text-white sm:px-14 sm:py-6 sm:text-[26px]"
                disabled
              >
                水やり済み 🌱
              </button>
            ) : (
              <button
                type="button"
                onClick={handleCheck}
                disabled={loading}
                className="rounded-2xl bg-green-600 px-10 py-5 text-xl text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60 sm:px-14 sm:py-6 sm:text-[26px]"
              >
                {loading && (
                  <span className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                )}

                {loading ? "水やり中..." : "達成"}
              </button>
            )}
          </div>

          <p className="mt-5 text-base text-slate-600 sm:mt-6 sm:text-xl">
            継続することで、あなたの木が成長します
          </p>
        </section>
      </div>
      </main>
    </div>
  );
}