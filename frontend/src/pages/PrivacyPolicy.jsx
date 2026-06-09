import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Header } from "../components/Header";

const PrivacyPolicy = () => {
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
          プライバシーポリシー
        </h1>

        <p className="mb-8">
          GrowLog（以下「本サービス」といいます。）の運営者（以下「運営者」といいます。）は、
          本サービスにおける利用者の個人情報の取扱いについて、以下のとおりプライバシーポリシーを定めます。
        </p>

        <section className="mb-8">
          <h2 className="mb-3 text-xl font-semibold">
            1. 取得する情報
          </h2>

          <p>運営者は、以下の情報を取得する場合があります。</p>

          <ul className="mt-3 list-disc pl-6">
            <li>氏名またはニックネーム</li>
            <li>メールアドレス</li>
            <li>目標情報</li>
            <li>達成記録</li>
            <li>日記等の利用者が入力した情報</li>
            <li>Cookie、アクセスログ等の利用状況に関する情報</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="mb-3 text-xl font-semibold">
            2. 利用目的
          </h2>

          <p>取得した情報は、以下の目的で利用します。</p>

          <ul className="mt-3 list-disc pl-6">
            <li>本サービスの提供・運営のため</li>
            <li>利用者本人の確認のため</li>
            <li>お問い合わせへの対応のため</li>
            <li>不正利用の防止のため</li>
            <li>本サービスの改善・新機能の開発のため</li>
            <li>重要なお知らせ等の連絡のため</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="mb-3 text-xl font-semibold">
            3. 第三者提供
          </h2>

          <p>
            運営者は、法令に基づく場合を除き、利用者の同意を得ることなく、
            個人情報を第三者に提供しません。
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-3 text-xl font-semibold">
            4. Cookie等の利用
          </h2>

          <p>
            本サービスでは、利便性向上および利用状況分析のため、
            Cookieその他これに類する技術を利用する場合があります。
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-3 text-xl font-semibold">
            5. 安全管理措置
          </h2>

          <p>
            運営者は、個人情報の漏えい、滅失または毀損の防止その他の安全管理のため、
            必要かつ適切な措置を講じます。
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-3 text-xl font-semibold">
            6. 個人情報の開示・訂正・削除
          </h2>

          <p>
            利用者は、自己の個人情報について、開示、訂正、追加、削除を求めることができます。
            運営者は、法令に従い適切に対応します。
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-3 text-xl font-semibold">
            7. プライバシーポリシーの変更
          </h2>

          <p>
            運営者は、必要に応じて本ポリシーを変更することがあります。
            変更後のプライバシーポリシーは、本サービス上に掲載した時点で効力を生じます。
          </p>
        </section>

        <section className="mb-10">
          <h2 className="mb-3 text-xl font-semibold">
            8. お問い合わせ窓口
          </h2>

          <p>
            本ポリシーに関するお問い合わせは、本サービスのお問い合わせフォームよりご連絡ください。
          </p>
        </section>

        <p className="mb-8 text-sm text-slate-500">
          制定日：2026年6月9日
        </p>

        <Link to="/" className="text-blue-600 underline">
          トップページへ戻る
        </Link>
      </main>
    </div>
  );
};

export default PrivacyPolicy;