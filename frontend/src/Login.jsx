import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Header } from "./components/Header";
import { Input } from "./ui/input";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

const handleSubmit = async (e) => {
  e.preventDefault();
  setErrorMessage("");

  try {
    const response = await fetch(`${API_BASE_URL}/api/session`, {
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

    if (response.ok) {
      navigate("/dashboard");
    } else {
      let data = {};

      try {
        data = await response.json();
      } catch {
        data = {};
      }

      setErrorMessage(data.error || "ログインに失敗しました");
    }
  } catch (error) {
    console.error("ログインに失敗しました", error);
    setErrorMessage("ログインに失敗しました");
  }
};

  return (
    <div className="min-h-screen bg-[#dff0e7]">
      <Header>
        <Link to="/login">
          <Button variant="ghost" className="text-xl">
            ログイン
          </Button>
        </Link>

        <Link to="/register">
          <Button className="rounded-xl bg-[#02021f] px-5 py-2 text-base text-white hover:bg-[#111138]">
            新規登録
          </Button>
        </Link>
      </Header>

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
          <div className="mt-8 text-center text-xs text-slate-400 space-x-4">
            <Link to="/privacy-policy">プライバシーポリシー  </Link>
            <Link to="/terms">利用規約</Link>
          </div>
        </div>
      </main>
    </div>
  );
}