import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Header } from "./components/Header";
import { TreeIllustration } from "./TreeIllustration";


export function Home() {
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

      <main className="mx-auto flex min-h-[calc(100vh-81px)] max-w-[1400px] flex-col items-center justify-center gap-10 px-4 py-10 text-center sm:px-8 sm:py-16 lg:flex-row lg:justify-between lg:text-left">
        <div className="max-w-[650px]">
          <h2 className="mb-6 text-5xl font-normal leading-[0.95] tracking-tight text-green-800 sm:mb-8 sm:text-[72px] lg:text-[96px]">
            成長する
            <br />
            あなたの木
          </h2>

          <p className="mb-8 text-base leading-relaxed text-slate-700 sm:mb-10 sm:text-2xl lg:text-[28px]">
            毎日の習慣を育てながら、あなただけの木を成長させましょう。
            継続することで、美しい森を作り上げることができます。
          </p>

          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-6 lg:justify-start">
            <Link to="/register">
              <Button className="rounded-2xl bg-[#02021f] px-8 py-6 text-xl text-white hover:bg-[#111138] sm:px-10 sm:py-8 sm:text-[32px]">
                始める
              </Button>
            </Link>

            <Link to="/how-to-use">
              <Button
                variant="outline"
                className="rounded-2xl border-[#02021f] bg-white px-8 py-6 text-xl text-[#02021f] hover:bg-slate-100 sm:px-10 sm:py-8 sm:text-[32px]"
              >
                使い方
              </Button>
            </Link>
          </div>
        </div>

        <div className="flex w-full justify-center lg:flex-1">
          <TreeIllustration />
        </div>
      </main>
    </div>
  );
}