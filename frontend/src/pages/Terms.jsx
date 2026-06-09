import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Header } from "../components/Header";

export const Terms = () => {
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
        <h1 className="mb-8 text-3xl font-bold text-slate-900">利用規約</h1>

        <p className="mb-8">
          この利用規約（以下「本規約」といいます。）は、GrowLog（以下「本サービス」といいます。）の利用条件を定めるものです。
          利用者は、本規約に同意の上、本サービスを利用するものとします。
        </p>

        <section className="mb-8">
          <h2 className="mb-3 text-xl font-semibold">第1条（適用）</h2>
          <p>
            本規約は、利用者と運営者との間の本サービスの利用に関わる一切の関係に適用されるものとします。
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-3 text-xl font-semibold">第2条（利用登録）</h2>
          <p>
            本サービスの利用を希望する者は、本規約に同意の上、運営者の定める方法によって利用登録を申請するものとします。
            運営者は、登録内容に虚偽がある場合、過去に本規約違反がある場合、その他運営者が不適切と判断した場合、利用登録を承認しないことがあります。
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-3 text-xl font-semibold">第3条（アカウント管理）</h2>
          <p>
            利用者は、自己の責任においてアカウント情報を適切に管理するものとします。
            アカウント情報の管理不十分、使用上の過誤、第三者の使用によって生じた損害について、運営者は責任を負いません。
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-3 text-xl font-semibold">第4条（禁止事項）</h2>
          <ul className="list-disc pl-6">
            <li>法令または公序良俗に違反する行為</li>
            <li>犯罪行為に関連する行為</li>
            <li>本サービスの運営を妨害する行為</li>
            <li>不正アクセスまたはこれを試みる行為</li>
            <li>他の利用者または第三者になりすます行為</li>
            <li>他の利用者または第三者の権利または利益を侵害する行為</li>
            <li>その他、運営者が不適切と判断する行為</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="mb-3 text-xl font-semibold">第5条（サービスの提供停止等）</h2>
          <p>
            運営者は、システムの保守、障害、天災、その他本サービスの提供が困難と判断した場合、事前の通知なく本サービスの全部または一部を停止または中断することがあります。
            これにより利用者に生じた損害について、運営者は責任を負いません。
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-3 text-xl font-semibold">第6条（退会）</h2>
          <p>
            利用者は、運営者の定める方法により、いつでも本サービスを退会することができます。
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-3 text-xl font-semibold">第7条（知的財産権）</h2>
          <p>
            本サービスに関する著作権、商標権その他の知的財産権は、運営者または正当な権利を有する第三者に帰属します。
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-3 text-xl font-semibold">第8条（投稿内容）</h2>
          <p>
            利用者が本サービスに登録または投稿した目標、達成記録、日記その他の情報については、利用者自身が責任を負うものとします。
            運営者は、本規約に違反すると判断した場合、投稿内容を削除することがあります。
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-3 text-xl font-semibold">第9条（保証の否認および免責事項）</h2>
          <p>
            運営者は、本サービスに事実上または法律上の瑕疵がないことを保証するものではありません。
            また、本サービスは利用者の目標達成、習慣形成または継続を保証するものではありません。
            本サービスの利用により利用者に生じた損害について、運営者に故意または重過失がある場合を除き、責任を負いません。
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-3 text-xl font-semibold">第10条（利用規約の変更）</h2>
          <p>
            運営者は、必要と判断した場合、本規約を変更することがあります。
            変更後の規約は、本サービス上に表示した時点で効力を生じるものとします。
          </p>
        </section>

        <section className="mb-10">
          <h2 className="mb-3 text-xl font-semibold">第11条（準拠法・裁判管轄）</h2>
          <p>
            本規約の解釈にあたっては、日本法を準拠法とします。
            本サービスに関して利用者と運営者との間で紛争が生じた場合には、本サービスの運営者の所在地を管轄する裁判所を第一審の専属的合意管轄裁判所とします。
          </p>
        </section>

        <p className="mb-8 text-sm text-slate-500">制定日：2026年6月9日</p>

        <Link to="/" className="text-blue-600 underline">
          トップページへ戻る
        </Link>
      </main>
    </div>
  );
};

export default Terms;

