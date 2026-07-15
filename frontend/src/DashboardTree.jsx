const treeStages = [
  {
    min: 0,
    max: 0,
    image: "/images/trees/tree-stage-0.png",
  },
  {
    min: 1,
    max: 1,
    image: "/images/trees/tree-stage-1.png",
  },
  {
    min: 2,
    max: 3,
    image: "/images/trees/tree-stage-2.png",
  },
  {
    min: 4,
    max: 5,
    image: "/images/trees/tree-stage-3.png",
  },
  {
    min: 6,
    max: 14,
    image: "/images/trees/tree-stage-6.png",
  },
  {
    min: 15,
    max: 60,
    image: "/images/trees/tree-stage-15.png",
  },
  {
    min: 80,
    max: Infinity,
    image: "/images/trees/tree-stage-20.png",
  },
];

function getStage(count) {
  return (
    treeStages.find(
      (stage) => count >= stage.min && count <= stage.max
    ) || treeStages[0]
  );
}

export function DashboardTree({ count }) {
  const stage = getStage(count);

  return (
    <div className="w-full">
      <img
        src={stage.image}
        alt="木の成長"
        className="w-full rounded-[32px] object-cover"
      />
    </div>
  );
}