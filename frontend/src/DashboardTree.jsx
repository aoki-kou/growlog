export function DashboardTree({ count }) {
  const getStage = (count) => {
    if (count === 0) return "seed";
    if (count < 3) return "sprout";
    if (count < 10) return "young";
    if (count < 21) return "tree";
    return "bigTree";
  };

  const stage = getStage(count);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative h-[320px] w-[320px]">
        {/*地面*/}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
          <div className="h-10 w-74 rounded-t-full bg-gradient-to-b from-amber-400 to-amber-800 shadow-lg" />
        </div>

        {/*木*/}
        {stage === "seed" && <Seed />}
        {stage === "sprout" && <Sprout />}
        {stage === "young" && <YoungTree />}
        {stage === "tree" && <Tree />}
        {stage === "bigTree" && <BigTree />}
      </div>
    </div>
  );
}

function Seed() {
  return (
    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center">
      {/* ⛰ 盛り土（これが膨らみ） */}
      <div className="h-10 w-20 rounded-t-full bg-gradient-to-b from-amber-500 to-amber-800 shadow-md" />
    </div>
  );
}

function Sprout() {
  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
      <div className="relative flex items-end justify-center">
        <div className="h-20 w-2 rounded-full bg-green-700" />
        <div className="absolute bottom-12 right-1 h-8 w-12 rotate-[-25deg] rounded-full bg-lime-500" />
        <div className="absolute bottom-14 left-1 h-8 w-12 rotate-[25deg] rounded-full bg-lime-400" />
      </div>
    </div>
  );
}

function YoungTree() {
  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
      <div className="relative flex items-end justify-center">
        <div className="h-28 w-6 rounded-md bg-amber-800" />
        <div className="absolute bottom-20 h-24 w-24 rounded-full bg-green-500 shadow-md" />
      </div>
    </div>
  );
}

function Tree() {
  return (
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
      <div className="relative flex items-end justify-center">
        <div className="h-36 w-8 rounded-md bg-amber-800" />
        <div className="absolute bottom-24 h-28 w-28 rounded-full bg-green-600 shadow-md" />
        <div className="absolute bottom-28 -left-8 h-20 w-20 rounded-full bg-green-500" />
        <div className="absolute bottom-28 -right-8 h-20 w-20 rounded-full bg-green-500" />
      </div>
    </div>
  );
}

function BigTree() {
  return (
    <div className="absolute bottom-2 left-1/2 -translate-x-1/2">
      <div className="relative flex items-end justify-center">
        <div className="h-44 w-10 rounded-md bg-amber-900" />
        <div className="absolute bottom-28 h-36 w-36 rounded-full bg-green-700 shadow-md" />
        <div className="absolute bottom-32 -left-12 h-24 w-24 rounded-full bg-green-600" />
        <div className="absolute bottom-32 -right-12 h-24 w-24 rounded-full bg-green-600" />
        <div className="absolute bottom-40 left-1/2 h-20 w-20 -translate-x-1/2 rounded-full bg-lime-500/80" />
      </div>
    </div>
  );
}