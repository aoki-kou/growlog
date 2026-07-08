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
  const [loading, setLoading] = useState(false);

const handleSubmit = async (e) => {
  e.preventDefault();
  setErrorMessage("");
  setLoading(true);

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
      navigate("/dashboard", {
        state: {
          flashMessage: "ログインできました",
        },
      });
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
  } finally {
    setLoading(false);
  }
};

const handleGoogleLogin = () => {
  window.location.href = `${API_BASE_URL}/auth/google_oauth2/start`;
};

  return (
    <div className="min-h-screen bg-[#dff0e7]">
      <Header>
        <Link to="/login">
          <Button variant="ghost" className="text-sm sm:text-xl">
            ログイン
          </Button>
        </Link>

        <Link to="/register">
          <Button className="rounded-xl bg-[#02021f] px-3 py-2 text-sm text-white hover:bg-[#111138] sm:px-5 sm:text-base">
            新規登録
          </Button>
        </Link>
      </Header>

      <main className="mx-auto flex min-h-[calc(100vh-81px)] max-w-[1400px] items-center justify-center px-4 py-10 sm:px-8 sm:py-16">
        <div className="mx-auto w-full max-w-[430px] rounded-3xl bg-white p-6 shadow-sm sm:max-w-[520px] sm:p-10">
          <div className="mb-6 text-center sm:mb-8">
            <h2 className="text-3xl font-semibold text-green-800 sm:text-4xl">
              ログイン
            </h2>
            <p className="mt-3 text-base text-slate-600 sm:text-lg">
              GrowLogへようこそ
            </p>
          </div>

          <form className="space-y-5 sm:space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="mb-2 block text-base font-medium text-slate-700 sm:text-lg">
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
              <label className="mb-2 block text-base font-medium text-slate-700 sm:text-lg">
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
              disabled={loading}
              className="w-full rounded-2xl bg-[#02021f] py-5 text-xl text-white hover:bg-[#111138] sm:py-6 sm:text-2xl"
            >
              {loading && (
                <span className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              )}
              {loading ? "ログイン中..." : "ログイン"}
            </Button>

            <Button
              type="button"
              onClick={handleGoogleLogin}
              className="mt-4 w-full rounded-2xl border border-slate-300 bg-white py-5 text-base font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 hover:shadow sm:py-6 sm:text-xl"
            >
              Googleでログイン
            </Button>
          </form>

          <div className="mt-6 text-center text-base text-slate-600 sm:mt-8 sm:text-lg">
            アカウントをお持ちでない方は{" "}
            <Link
              to="/register"
              className="font-medium text-green-700 hover:underline"
            >
              新規登録
            </Link>
          </div>

          <div className="mt-6 flex flex-col items-center gap-2 text-center text-xs text-slate-400 sm:mt-8 sm:flex-row sm:justify-center sm:gap-4">
            <Link to="/privacy-policy">プライバシーポリシー</Link>
            <Link to="/terms">利用規約</Link>
          </div>
        </div>
      </main>
    </div>
  );
}