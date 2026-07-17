import { useEffect, useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { Calendar } from "lucide-react";
import { Button } from "./ui/button";
import { Header } from "./components/Header";
import { FlashMessage } from "./components/FlashMessage";
import {
  DashboardTree,
  getTreeProgress,
} from "./DashboardTree";

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

    setLoading(true);

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

  const {
    nextStage,
    remainingCount,
    progressPercent,
  } = getTreeProgress(currentGoal.checkin_count);

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

        <div className="mx-auto flex max-w-[440px] flex-col gap-5 sm:max-w-[760px] sm:gap-6">
          {/* 木の画像カード */}
          <section className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-sm">
            <DashboardTree count={currentGoal.checkin_count} />

            <div className="px-5 py-2 sm:px-8 sm:py-3">
              <div className="flex items-center justify-between gap-4">
                <p className="text-sm font-semibold text-slate-800 sm:text-lg">
                  達成回数：{currentGoal.checkin_count}回
                </p>

                <p className="text-sm font-semibold text-green-700 sm:text-lg">
                  {nextStage
                    ? `あと${remainingCount}回で成長`
                    : "最大まで成長しました"}
                </p>
              </div>

              <div className="mt-4 flex items-center gap-3">
                <div className="h-3 flex-1 overflow-hidden rounded-full bg-slate-200">
                  <div
                    className="h-full rounded-full bg-green-600 transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>

                <span className="w-12 text-right text-sm font-semibold text-slate-700">
                  {progressPercent}%
                </span>
              </div>
            </div>

            {/* 目標名 */}
            <div className="px-4 py-4 sm:px-6 sm:py-5">
              <div className="flex items-center justify-center gap-3 sm:gap-6">
                <button
                  type="button"
                  onClick={() =>
                    setCurrentIndex((previous) =>
                      Math.max(previous - 1, 0)
                    )
                  }
                  disabled={currentIndex === 0}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-50 text-xl text-green-700 transition hover:bg-green-100 disabled:cursor-not-allowed disabled:opacity-30 sm:h-12 sm:w-12 sm:text-2xl"
                  aria-label="前の目標を表示"
                >
                  ◀
                </button>

                <h3 className="min-w-0 flex-1 break-words text-center text-xl font-semibold text-black-700 sm:text-3xl">
                  {currentGoal.title}
                </h3>

                <button
                  type="button"
                  onClick={() =>
                    setCurrentIndex((previous) =>
                      Math.min(previous + 1, goals.length - 1)
                    )
                  }
                  disabled={currentIndex === goals.length - 1}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-50 text-xl text-green-700 transition hover:bg-green-100 disabled:cursor-not-allowed disabled:opacity-30 sm:h-12 sm:w-12 sm:text-2xl"
                  aria-label="次の目標を表示"
                >
                  ▶
                </button>
              </div>
            </div>

            <div className="border-t border-slate-200" />

            {/* 達成回数と次の成長 */}
            <div className="px-4 py-5 sm:px-6 sm:py-6">
              <div className="grid grid-cols-2 gap-3 sm:gap-5">
                {/* 達成回数 */}
                <div className="rounded-2xl border border-slate-200 bg-white px-3 py-4 sm:px-5 sm:py-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-amber-50 text-xl sm:h-14 sm:w-14 sm:text-2xl">
                      🏆
                    </div>

                    <div>
                      <p className="text-xs text-slate-500 sm:text-sm">
                        達成回数
                      </p>

                      <p className="mt-1 text-3xl font-bold text-slate-900 sm:text-4xl">
                        {currentGoal.checkin_count}
                        <span className="ml-1 text-base font-normal text-slate-500 sm:text-lg">
                          回
                        </span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* 次の成長 */}
                <div className="rounded-2xl border border-green-200 bg-green-50/40 px-3 py-4 sm:px-5 sm:py-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-xl sm:h-14 sm:w-14 sm:text-2xl">
                      🌱
                    </div>

                    <div className="min-w-0">
                      {nextStage ? (
                        <>
                          <p className="text-xs text-slate-500 sm:text-sm">
                            次の成長まで
                          </p>

                          <p className="mt-1 flex items-baseline whitespace-nowrap font-semibold text-slate-900">
                            <span className="text-sm sm:text-lg">あと</span>

                            <span className="mx-1 text-4xl font-bold leading-none text-green-700 sm:text-5xl">
                              {remainingCount}
                            </span>

                            <span className="text-base sm:text-lg">回</span>
                          </p>
                        </>
                      ) : (
                        <>
                          <p className="text-xs text-slate-500 sm:text-sm">
                            成長状況
                          </p>

                          <p className="mt-2 text-lg font-bold text-green-700 sm:text-2xl">
                            最大まで成長
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* 進捗バー */}
              <div className="mt-6">
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-xs font-medium text-slate-500 sm:text-sm">
                    {nextStage ? "次の成長までの進捗" : "成長進捗"}
                  </p>

                  <p className="text-sm font-semibold text-slate-700">
                    {progressPercent}%
                  </p>
                </div>

                <div className="h-3 overflow-hidden rounded-full bg-slate-200">
                  <div
                    className="h-full rounded-full bg-green-600 transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="border-t border-slate-200" />

            {/* 達成ボタン */}
            <div className="px-4 py-5 text-center sm:px-6 sm:py-6">
              {currentGoal.today_checked ? (
                <button
                  type="button"
                  disabled
                  className="flex h-14 w-full cursor-not-allowed items-center justify-center rounded-2xl bg-slate-400 text-lg font-semibold text-white sm:h-16 sm:text-xl"
                >
                  水やり済み 🌱
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleCheck}
                  disabled={loading}
                  className="flex h-14 w-full items-center justify-center rounded-2xl bg-green-600 text-lg font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60 sm:h-16 sm:text-xl"
                >
                  {loading && (
                    <span className="mr-3 inline-block h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  )}

                  {loading ? "水やり中..." : "💧 水やりする"}
                </button>
              )}

              <p className="mt-5 text-sm text-slate-600 sm:text-lg">
                継続することで、あなたの木が成長します
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}