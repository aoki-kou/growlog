import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Header } from "./components/Header";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

const weekDays = ["日", "月", "火", "水", "木", "金", "土"];

export function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [checkedDates, setCheckedDates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;

  const previousMonth = () => {
    setCurrentDate(new Date(year, month - 2, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month, 1));
  };

  const daysInMonth = new Date(year, month, 0).getDate();
  const firstDayOfWeek = new Date(year, month - 1, 1).getDay();

  const calendarDays = Array.from(
    { length: daysInMonth },
    (_, index) => index + 1
  );

  const blankDays = Array.from(
    { length: firstDayOfWeek },
    () => null
  );

  const displayDays = [...blankDays, ...calendarDays];

  useEffect(() => {
    const fetchCalendar = async () => {
      setLoading(true);
      setErrorMessage("");
      
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/calendar?year=${year}&month=${month}`,
          {
            credentials: "include",
          }
        );

        const data = await response.json();

        if (response.ok) {
          setCheckedDates(data.checked_dates || []);
        } else {
          setErrorMessage(data.error || "カレンダー情報の取得に失敗しました");
        }
      } catch (error) {
        console.error("カレンダー情報の取得に失敗しました", error);
        setErrorMessage("カレンダー情報の取得に失敗しました");
      } finally {
        setLoading(false);
      }
    };

    fetchCalendar();
  }, [year, month]);

  return (
    <div className="min-h-screen bg-[#dff0e7]">
      <Header>
        <Link to="/dashboard">
          <Button variant="ghost" className="text-base text-slate-900">
            Top
          </Button>
        </Link>
      </Header>

      <main className="mx-auto max-w-[1100px] px-6 py-10">
        <section className="mb-8 text-center">
          <p className="text-lg font-medium text-green-700">
            Effort Calendar
          </p>

          <h1 className="mt-2 text-4xl font-semibold text-green-900">
            努力の記録
          </h1>

          <p className="mx-auto mt-4 max-w-[620px] text-lg leading-relaxed text-slate-600">
            水やりした日をカレンダーで振り返れます。
          </p>
        </section>

        {loading && (
          <p className="mb-4 text-center text-slate-500">読み込み中...</p>
        )}

        {errorMessage && (
          <p className="mb-4 text-center text-red-600">{errorMessage}</p>
        )}

        <section className="rounded-[32px] border border-green-100 bg-white/90 p-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <button
              type="button"
              onClick={previousMonth}
              className="rounded-full bg-green-50 px-4 py-2 text-xl text-green-800 hover:bg-green-100"
            >
              ◀
            </button>

            <h2 className="text-3xl font-semibold text-slate-900">
              {year}年{month}月
            </h2>

            <button
              type="button"
              onClick={nextMonth}
              className="rounded-full bg-green-50 px-4 py-2 text-xl text-green-800 hover:bg-green-100"
            >
              ▶
            </button>
          </div>

          <div className="grid grid-cols-7 gap-3 text-center">
            {weekDays.map((day) => (
              <div
                key={day}
                className="py-3 text-base font-semibold text-slate-500"
              >
                {day}
              </div>
            ))}

            {displayDays.map((day, index) => {
              if (day === null) {
                return (
                  <div
                    key={`blank-${index}`}
                    className="min-h-[92px] rounded-2xl"
                  />
                );
              }

              const dateString = `${year}-${String(month).padStart(
                2,
                "0"
              )}-${String(day).padStart(2, "0")}`;

              const checked = checkedDates.includes(dateString);

              return (
                <div
                  key={day}
                  className={`flex min-h-[92px] flex-col items-center justify-center rounded-2xl border text-lg transition ${
                    checked
                      ? "border-green-300 bg-green-100 text-green-900"
                      : "border-slate-100 bg-slate-50 text-slate-400"
                  }`}
                >
                  <span className="font-medium">{day}</span>

                  {checked && <span className="mt-2 text-2xl">🌱</span>}
                </div>
              );
            })}
          </div>
        </section>

        <section className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl bg-white/80 p-5 text-center shadow-sm">
            <p className="text-sm text-slate-500">今月の達成日数</p>
            <p className="mt-2 text-3xl font-semibold text-green-800">
              {checkedDates.length}日
            </p>
          </div>

          <div className="rounded-2xl bg-white/80 p-5 text-center shadow-sm">
            <p className="text-sm text-slate-500">連続記録</p>
            <p className="mt-2 text-3xl font-semibold text-green-800">
              2日
            </p>
          </div>

          <div className="rounded-2xl bg-white/80 p-5 text-center shadow-sm">
            <p className="text-sm text-slate-500">連続努力達成回数</p>
            <p className="mt-2 text-3xl font-semibold text-green-800">
              2回
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}