import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TreePine } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

const handleSubmit = async (e) => {
  e.preventDefault();
  setErrorMessage("");

  try {
    const response = await fetch("http://localhost:3000/api/session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();

    if (response.ok && data.success) {
      navigate("/dashboard");
    } else {
      setErrorMessage(data.error || "ログインに失敗しました");
    }
  } catch (error) {
    console.error("ログインに失敗しました", error);
    setErrorMessage("ログインに失敗しました");
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
            <Link to="/register">
              <Button className="rounded-xl bg-[#02021f] px-6 py-3 text-lg text-white hover:bg-[#111138]">
                新規登録
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto flex min-h-[calc(100vh-81px)] max-w-[1400px] items-center justify-center px-8 py-16">
        <div className="w-full max-w-[520px] rounded-3xl bg-white p-10 shadow-sm">
          <div className="mb-8 text-center">
            <h2 className="text-4xl font-semibold text-green-800">ログイン</h2>
            <p className="mt-3 text-lg text-slate-600">
              GrowLogへようこそ
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="mb-2 block text-lg font-medium text-slate-700">
                メールアドレス
              </label>
              <Input
                type="email"
                placeholder="example@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="mb-2 block text-lg font-medium text-slate-700">
                パスワード
              </label>
              <Input
                type="password"
                placeholder="パスワードを入力"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {errorMessage && (
              <p className="text-sm text-red-600">{errorMessage}</p>
            )}

            <Button
              type="submit"
              className="w-full rounded-2xl bg-[#02021f] py-6 text-2xl text-white hover:bg-[#111138]"
            >
              ログイン
            </Button>
          </form>

          <div className="mt-8 text-center text-lg text-slate-600">
            アカウントをお持ちでない方は{" "}
            <Link
              to="/register"
              className="font-medium text-green-700 hover:underline"
            >
              新規登録
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}