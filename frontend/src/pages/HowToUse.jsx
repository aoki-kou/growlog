import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Header } from "../components/Header";

const HowToUse = () => {
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

      <main className="mx-auto max-w-3xl px-6 py-10 leading-8 text-slate-800">
        <h1 className="mb-8 text-3xl font-bold text-slate-900">
          GrowLogの使い方
        </h1>

        <p className="mb-8">
          GrowLogは、毎日の小さな努力を「木の成長」として可視化し、
          継続をサポートするアプリです。
        </p>

        <section className="mb-8">
          <h2 className="mb-3 text-xl font-semibold">
            1. アカウントを作成する
          </h2>

          <p>
            まずは新規登録を行い、GrowLogのアカウントを作成します。
            登録後、ログインして利用を開始できます。
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-3 text-xl font-semibold">
            2. 目標を登録する
          </h2>

          <p className="mb-3">
            「目標登録」から、継続したい目標を設定しましょう。
          </p>

          <ul className="list-disc pl-6">
            <li>毎日30分散歩する</li>
            <li>プログラミングを1時間勉強する</li>
            <li>筋トレを続ける</li>
            <li>読書をする</li>
          </ul>

          <p className="mt-3">
            達成したい習慣を自由に登録できます。
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-3 text-xl font-semibold">
            3. 努力を記録する
          </h2>

          <p>
            目標を達成した日は、「達成」ボタンを押して記録しましょう。
          </p>

          <p className="mt-2 text-sm text-slate-600">
            ※ 達成記録は1日1回まで行えます。
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-3 text-xl font-semibold">
            4. 木の成長を楽しむ
          </h2>

          <p>
            努力を積み重ねると、あなたの木が少しずつ成長していきます。
          </p>

          <p className="mt-3">
            最初は小さなタネでも、継続することで立派な木へと育っていきます。
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-3 text-xl font-semibold">
            5. 継続を習慣にする
          </h2>

          <p>
            GrowLogは、「結果」だけではなく「続けたこと」そのものを
            大切にしています。
          </p>

          <p className="mt-3">
            毎日の小さな一歩を積み重ね、自分だけの木を育てていきましょう。
          </p>
        </section>

        <section className="mb-10">
          <h2 className="mb-3 text-xl font-semibold">
            継続のコツ
          </h2>

          <ul className="list-disc pl-6">
            <li>無理のない目標を設定する</li>
            <li>達成したらその日のうちに記録する</li>
            <li>木の成長を楽しみながら続ける</li>
          </ul>

          <p className="mt-4">
            小さな努力も、続ければ大きな成長につながります。
          </p>

          <p className="mt-2 font-medium text-green-700">
            今日の小さな一歩が、未来の大きな成長につながります。
          </p>
        </section>
      </main>
    </div>
  );
};

export default HowToUse;