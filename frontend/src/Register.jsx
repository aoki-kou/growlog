import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Header } from "./components/Header";
import { Input } from "./ui/input";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

const handleSubmit = async (e) => {
  e.preventDefault();
  setErrorMessage("");
  setLoading(true);

  try {
    const response = await fetch(`${API_BASE_URL}/api/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        name,
        email,
        password,
        password_confirmation: passwordConfirmation,
      }),
    });

    const data = await response.json();

    if (response.ok && data.success) {
      navigate("/dashboard", {
        state: {
          flashMessage: "登録できました",
        },
      });
    } else {
      setErrorMessage(data.error || "ユーザー登録に失敗しました");
    }
  } catch (error) {
    console.error("ユーザー登録に失敗しました", error);
    setErrorMessage("ユーザー登録に失敗しました");
  } finally {
    setLoading(false);
  }
};

const handleGoogleLogin = () => {
  window.location.href = `${API_BASE_URL}/auth/google_oauth2/start`;
};


  return (
    <div className="min-h-screen bg-[#eef0fb]">
      <Header>
        <Link to="/login">
          <Button variant="ghost" className="text-sm sm:text-xl">
            ログイン
          </Button>
        </Link>
      </Header>

      <main className="mx-auto flex min-h-[calc(100vh-81px)] max-w-[1400px] items-center justify-center px-4 py-10 sm:px-8 sm:py-16">
        <div className="mx-auto w-full max-w-[430px] rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:max-w-[570px] sm:p-10">
          <div className="mb-6 text-center sm:mb-8">
            <h2 className="text-3xl font-semibold text-slate-900 sm:text-4xl">
              アカウント登録
            </h2>
            <p className="mt-3 text-sm text-slate-500 sm:mt-4 sm:text-base">
              新しいアカウントを作成してください
            </p>
          </div>

          <form className="space-y-5 sm:space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="mb-2 block text-base font-medium text-slate-900 sm:text-xl">
                名前
              </label>
              <Input
                type="text"
                placeholder="山田太郎"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-14 rounded-2xl border-0 bg-slate-100 px-4 text-lg placeholder:text-slate-400 sm:h-16 sm:px-5 sm:text-2xl"
              />
            </div>

            <div>
              <label className="mb-2 block text-base font-medium text-slate-900 sm:text-xl">
                メールアドレス
              </label>
              <Input
                type="email"
                placeholder="example@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-14 rounded-2xl border-0 bg-slate-100 px-4 text-lg placeholder:text-slate-400 sm:h-16 sm:px-5 sm:text-2xl"
              />
            </div>

            <div>
              <label className="mb-2 block text-base font-medium text-slate-900 sm:text-xl">
                パスワード
              </label>
              <Input
                type="password"
                placeholder="6文字以上で入力してください"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-14 rounded-2xl border-0 bg-slate-100 px-4 text-lg placeholder:text-slate-400 sm:h-16 sm:px-5 sm:text-2xl"
              />
            </div>

            <div>
              <label className="mb-2 block text-base font-medium text-slate-900 sm:text-xl">
                パスワード（確認）
              </label>
              <Input
                type="password"
                placeholder="もう一度パスワードを入力"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                className="h-14 rounded-2xl border-0 bg-slate-100 px-4 text-lg placeholder:text-slate-400 sm:h-16 sm:px-5 sm:text-2xl"
              />
            </div>

            {errorMessage && (
              <p className="text-sm text-red-600">{errorMessage}</p>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="mt-2 h-14 w-full rounded-2xl bg-[#02021f] text-lg font-medium text-white hover:bg-[#111138] sm:h-16 sm:text-xl"
            >
              {loading && (
                <span className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              )}
              {loading ? "ユーザー登録中..." : "登録"}
            </Button>

            <Button
              type="button"
              onClick={handleGoogleLogin}
              className="mt-4 h-14 w-full rounded-2xl border border-slate-300 bg-white text-base font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 hover:shadow sm:h-16 sm:text-xl"
            >
              Googleでログイン
            </Button>
          </form>

          <div className="mt-6 text-center text-base text-slate-500 sm:mt-8 sm:text-xl">
            既にアカウントをお持ちですか？{" "}
            <Link
              to="/login"
              className="font-medium text-slate-900 hover:underline"
            >
              ログイン
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