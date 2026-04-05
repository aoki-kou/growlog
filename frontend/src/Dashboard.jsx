import { Link } from "react-router-dom";
import { TreePine, Home, Medal } from "lucide-react";
import { Button } from "./ui/button";
import { DashboardTree } from "./DashboardTree";

export function Dashboard() {
  return (
    <div className="min-h-screen bg-[#dff0e7]">
      {/* ヘッダー */}
      <header className="border-b border-emerald-200 bg-white/90">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-8 py-4">
          <Link to="/" className="flex items-center gap-3">
            <TreePine className="h-9 w-9 text-green-600" />
            <h1 className="text-2xl font-semibold text-gray-900">TreeApp</h1>
          </Link>

          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" className="p-2">
                <Home className="h-6 w-6 text-slate-900" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* メイン */}
      <main className="mx-auto max-w-[1400px] px-6 py-8">
        {/* 達成回数 */}
        <div className="mb-8 flex items-center justify-center gap-3 text-[22px] font-medium text-slate-900">
          <Medal className="h-7 w-7 text-amber-500" />
          <span>達成回数: 0回</span>
        </div>

        {/* カード */}
        <div className="mx-auto max-w-[760px] rounded-[28px] border border-slate-200 bg-white/90 px-8 py-8 shadow-sm">
          <div className="text-center">
            <h2 className="text-4xl font-medium text-green-700">毎日運動する</h2>
          </div>

          <div className="mt-8 flex justify-center">
            <DashboardTree />
          </div>

          <div className="mt-8 flex justify-center">
            <Button className="rounded-2xl bg-green-600 px-10 py-4 text-[18px] text-white hover:bg-green-700">
              達成
            </Button>
          </div>

          <p className="mt-6 text-center text-xl text-slate-600">
            継続することで、あなたの木が成長します
          </p>
        </div>
      </main>
    </div>
  );
}