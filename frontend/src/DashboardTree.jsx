export function DashboardTree() {
  return (
    <div className="relative mx-auto h-[360px] w-[360px]">
      {/* 地面の影 */}
      <div className="absolute bottom-4 left-1/2 h-8 w-48 -translate-x-1/2 rounded-full bg-stone-400/40" />

      {/* 幹 */}
      <div className="absolute bottom-4 left-1/2 h-36 w-16 -translate-x-1/2 rounded-b-xl rounded-t-md bg-amber-800" />
      <div className="absolute bottom-6 left-1/2 h-34 w-5 -translate-x-[65%] rounded-full bg-amber-700/70" />

      {/* 葉 */}
      <div className="absolute bottom-28 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-green-900/70" />
      <div className="absolute bottom-32 left-[78px] h-32 w-32 rounded-full bg-green-800/70" />
      <div className="absolute bottom-32 right-[78px] h-32 w-32 rounded-full bg-green-800/70" />
      <div className="absolute bottom-40 left-1/2 h-28 w-28 -translate-x-1/2 rounded-full bg-lime-600/70" />

      {/* 明るい葉 */}
      <div className="absolute bottom-[172px] left-[126px] h-10 w-10 rounded-full bg-lime-500/70" />
      <div className="absolute bottom-[145px] left-[165px] h-9 w-9 rounded-full bg-lime-500/70" />
      <div className="absolute bottom-[160px] left-[205px] h-9 w-9 rounded-full bg-lime-500/70" />

    </div>
  );
}