import { Link } from "react-router-dom";
import { TreePine } from "lucide-react";
import { Button } from "./ui/button";
import { TreeIllustration } from "./TreeIllustration";

export function Home() {
  return (
    <div className="min-h-screen bg-[#dff0e7]">
      {/* ヘッダー */}
      <header className="border-b border-emerald-200 bg-white/90">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-8 py-4">
          <div className="flex items-center gap-3">
            <TreePine className="h-9 w-9 text-green-600" />
            <h1 className="text-2xl font-semibold text-gray-900">Growlog</h1>
          </div>

          <div className="flex items-center gap-4">
            <Link to="/login">
              <Button variant="ghost" className="text-xl">
                ログイン
              </Button>
            </Link>
            <Link to="/register">
              <Button className="rounded-xl bg-[#02021f] px-6 py-6 text-xl text-white hover:bg-[#111138]">
                新規登録
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* メイン */}
      <main className="mx-auto flex min-h-[calc(100vh-81px)] max-w-[1400px] items-center justify-between gap-10 px-8 py-16">
        {/* 左 */}
        <div className="max-w-[650px]">
          <h2 className="mb-8 text-[96px] font-normal leading-[0.95] tracking-tight text-green-800">
            成長する
            <br />
            あなたの木
          </h2>

          <p className="mb-10 text-[28px] leading-relaxed text-slate-700">
            毎日の習慣を育てながら、あなただけの木を成長させましょう。
            継続することで、美しい森を作り上げることができます。
          </p>

          <div className="flex items-center gap-6">
            <Link to="/register">
              <Button className="rounded-2xl bg-[#02021f] px-10 py-8 text-[32px] text-white hover:bg-[#111138]">
                始める
              </Button>
            </Link>

            <Link to="/tracker">
              <Button
                variant="outline"
                className="rounded-2xl border border-gray-300 bg-[#f7f3f3] px-10 py-8 text-[32px] text-gray-900 hover:bg-gray-100"
              >
                トラッカーを見る
              </Button>
            </Link>
          </div>
        </div>

        {/* 右 */}
        <div className="flex flex-1 justify-center">
          <TreeIllustration />
        </div>
      </main>
    </div>
  );
}