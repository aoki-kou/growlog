import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Header } from "./components/Header";
import { Input } from "./ui/input";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export function GoalNew() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const response = await fetch(`${API_BASE_URL}/api/goals`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          title,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        navigate("/dashboard");
      } else {
        setErrorMessage(data.error || "目標登録に失敗しました");
      }
    } catch (error) {
      console.error("目標登録に失敗しました", error);
      setErrorMessage("目標登録に失敗しました");
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

  return (
    <div className="min-h-screen bg-[#dff0e7]">
      <Header>
        <Link to="/dashboard">
          <Button variant="ghost" className="text-sm text-slate-900 sm:text-base">
            Top
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

      <main className="mx-auto flex min-h-[calc(100vh-81px)] max-w-[1400px] items-center justify-center px-4 py-10 sm:px-8 sm:py-16">
        <div className="mx-auto w-full max-w-[430px] rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:max-w-[620px] sm:p-10">
          <div className="mb-6 text-center sm:mb-8">
            <h2 className="text-3xl font-semibold text-slate-900 sm:text-4xl">
              目標登録
            </h2>
            <p className="mt-3 text-sm text-slate-500 sm:mt-4 sm:text-base">
              育てたい目標をひとつ決めましょう
            </p>
          </div>

          <form className="space-y-5 sm:space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="mb-2 block text-base font-medium text-slate-900 sm:text-xl">
                目標
              </label>
              <Input
                type="text"
                placeholder="例: 毎日15分散歩する"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="h-14 rounded-2xl border-0 bg-slate-100 px-4 text-base placeholder:text-slate-400 sm:h-16 sm:px-5 sm:text-xl"
              />
            </div>

            <div className="rounded-2xl bg-green-50 px-4 py-4 text-slate-600 sm:px-5">
              <p className="text-xs leading-relaxed sm:text-sm">
                小さく続けやすい目標がおすすめです。
                たとえば「毎日筋トレ」よりも「毎日腕立てを5回する」のように、
                具体的で始めやすい形にすると続けやすくなります。
              </p>
            </div>

            {errorMessage && (
              <p className="text-sm text-red-600">{errorMessage}</p>
            )}

            <Button
              type="submit"
              className="mt-2 h-14 w-full rounded-2xl bg-[#02021f] text-lg font-medium text-white hover:bg-[#111138] sm:h-16 sm:text-xl"
            >
              登録する
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
}