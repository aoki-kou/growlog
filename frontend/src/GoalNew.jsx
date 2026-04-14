import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TreePine } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export function GoalNew() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const response = await fetch("http://localhost:3000/api/goals", {
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
              <Button variant="ghost" className="text-lg">
                Top
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto flex min-h-[calc(100vh-81px)] max-w-[1400px] items-center justify-center px-8 py-10">
        <div className="w-full max-w-[620px] rounded-[28px] border border-slate-200 bg-white px-8 py-10 shadow-sm">
          <div className="mb-8 text-center">
            <h2 className="text-4xl font-semibold text-slate-900">
              目標登録
            </h2>
            <p className="mt-4 text-base text-slate-500">
              育てたい目標をひとつ決めましょう
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="mb-2 block text-xl font-medium text-slate-900">
                目標
              </label>
              <Input
                type="text"
                placeholder="例: 毎日15分散歩する"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="h-16 rounded-2xl border-0 bg-slate-100 px-5 text-xl placeholder:text-slate-400"
              />
            </div>

            <div className="rounded-2xl bg-green-50 px-5 py-4 text-slate-600">
              <p className="text-sm leading-relaxed">
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
              className="mt-2 h-16 w-full rounded-2xl bg-[#02021f] text-xl font-medium text-white hover:bg-[#111138]"
            >
              登録する
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
}