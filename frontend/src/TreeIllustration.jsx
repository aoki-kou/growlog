export function TreeIllustration() {
  return (
    <div className="relative w-[420px] h-[420px]">
      {/* 地面の影 */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-72 h-10 rounded-full bg-stone-400/40" />

      {/* 幹 */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-24 h-40 bg-amber-800 rounded-b-2xl rounded-t-md" />
      <div className="absolute bottom-10 left-1/2 -translate-x-[60%] w-6 h-36 bg-amber-700 rounded-full opacity-70" />

      {/* 葉の土台 */}
      <div className="absolute bottom-40 left-1/2 -translate-x-1/2 w-80 h-48 bg-green-900 rounded-[45%]" />
      <div className="absolute bottom-48 left-[88px] w-36 h-36 bg-green-800 rounded-full" />
      <div className="absolute bottom-48 right-[88px] w-36 h-36 bg-green-800 rounded-full" />
      <div className="absolute bottom-56 left-1/2 -translate-x-1/2 w-52 h-52 bg-green-700 rounded-full" />

      {/* 明るい葉 */}
      <div className="absolute bottom-64 left-[118px] w-44 h-44 bg-lime-600/80 rounded-full" />
      <div className="absolute bottom-[245px] left-[150px] w-16 h-16 bg-lime-500/80 rounded-full" />
      <div className="absolute bottom-[220px] left-[205px] w-14 h-14 bg-lime-500/80 rounded-full" />
      <div className="absolute bottom-[235px] left-[255px] w-14 h-14 bg-lime-500/80 rounded-full" />

      {/* 実 */}
      <div className="absolute bottom-[205px] left-[170px] w-6 h-6 rounded-full bg-rose-400" />
      <div className="absolute bottom-[180px] left-[205px] w-6 h-6 rounded-full bg-rose-400" />
      <div className="absolute bottom-[155px] left-[235px] w-6 h-6 rounded-full bg-rose-400" />
      <div className="absolute bottom-[205px] left-[285px] w-6 h-6 rounded-full bg-rose-400" />
      <div className="absolute bottom-[180px] left-[315px] w-6 h-6 rounded-full bg-rose-400" />
    </div>
  );
}