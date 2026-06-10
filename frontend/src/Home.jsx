import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Header } from "./components/Header";
import { TreeIllustration } from "./TreeIllustration";


export function Home() {
  return (
    <div className="min-h-screen bg-[#dff0e7]">
      {/* ヘッダー */}
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

            <Link to="/how-to-use">
              <Button variant="ghost" className="text-xl">
                使い方
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