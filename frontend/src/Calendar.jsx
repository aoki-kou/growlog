import { Link, useNavigate } from "react-router-dom";
import { Header } from "./components/Header";
import { Button } from "./ui/button";

export function Calendar() {
  return (
    <div className="min-h-screen bg-[#eef0fb]">
      <Header>
        <Link to="/dashboard">
          <Button variant="ghost" className="text-base text-slate-900">
            Top
          </Button>
        </Link>
      </Header>

      <main className="mx-auto max-w-[1400px] px-8 py-10">
        <h1 className="text-4xl font-semibold">
          カレンダー
        </h1>

        <p className="mt-4 text-slate-500">
          努力記録を表示する画面
        </p>
      </main>
    </div>
  );
}