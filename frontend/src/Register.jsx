import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TreePine } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

const handleSubmit = async (e) => {
  e.preventDefault();
  setErrorMessage("");

  try {
    const response = await fetch("http://localhost:3000/api/users", {
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
      navigate("/dashboard");
    } else {
      setErrorMessage(data.error || "ユーザー登録に失敗しました");
    }
  } catch (error) {
    console.error("ユーザー登録に失敗しました", error);
    setErrorMessage("ユーザー登録に失敗しました");
  }
};

  return (
    <div className="min-h-screen bg-[#eef0fb]">
      <header className="border-b border-slate-200 bg-white/80">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-8 py-4">
          <Link to="/" className="flex items-center gap-3">
            <TreePine className="h-9 w-9 text-green-600" />
            <h1 className="text-2xl font-semibold text-gray-900">GrowLog</h1>
          </Link>

          <div className="flex items-center gap-4">
            <Link to="/login">
              <Button variant="ghost" className="text-lg">
                ログイン
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto flex min-h-[calc(100vh-81px)] max-w-[1400px] items-center justify-center px-8 py-10">
        <div className="w-full max-w-[570px] rounded-[28px] border border-slate-200 bg-white px-6 py-8 shadow-sm">
          <div className="mb-8 text-center">
            <h2 className="text-4xl font-semibold text-slate-900">
              アカウント登録
            </h2>
            <p className="mt-4 text-base text-slate-500">
              新しいアカウントを作成してください
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="mb-2 block text-xl font-medium text-slate-900">
                名前
              </label>
              <Input
                type="text"
                placeholder="山田太郎"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-16 rounded-2xl border-0 bg-slate-100 px-5 text-2xl placeholder:text-slate-400"
              />
            </div>

            <div>
              <label className="mb-2 block text-xl font-medium text-slate-900">
                メールアドレス
              </label>
              <Input
                type="email"
                placeholder="example@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-16 rounded-2xl border-0 bg-slate-100 px-5 text-2xl placeholder:text-slate-400"
              />
            </div>

            <div>
              <label className="mb-2 block text-xl font-medium text-slate-900">
                パスワード
              </label>
              <Input
                type="password"
                placeholder="パスワードを入力"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-16 rounded-2xl border-0 bg-slate-100 px-5 text-2xl placeholder:text-slate-400"
              />
            </div>

            <div>
              <label className="mb-2 block text-xl font-medium text-slate-900">
                パスワード（確認）
              </label>
              <Input
                type="password"
                placeholder="もう一度パスワードを入力"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                className="h-16 rounded-2xl border-0 bg-slate-100 px-5 text-2xl placeholder:text-slate-400"
              />
            </div>

            {errorMessage && (
              <p className="text-sm text-red-600">{errorMessage}</p>
            )}

            <Button
              type="submit"
              className="mt-2 h-16 w-full rounded-2xl bg-[#02021f] text-xl font-medium text-white hover:bg-[#111138]"
            >
              登録
            </Button>
          </form>

          <div className="mt-8 text-center text-xl text-slate-500">
            既にアカウントをお持ちですか？{" "}
            <Link to="/login" className="font-medium text-slate-900 hover:underline">
              ログイン
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}