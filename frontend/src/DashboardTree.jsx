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
    max: 79,
    image: "/images/trees/tree-stage-15.png",
  },
  {
    min: 80,
    max: Infinity,
    image: "/images/trees/tree-stage-20.png",
  },
];

export function getTreeProgress(checkinCount) {
  // 条件を満たす中で、最も高い成長段階を取得
  const currentStage =
    [...treeStages]
      .reverse()
      .find((stage) => checkinCount >= stage.min) || treeStages[0];

  // 現在の成長段階が配列の何番目かを取得
  const currentStageIndex = treeStages.findIndex(
    (stage) => stage === currentStage
  );

  // 次の成長段階を取得
  const nextStage = treeStages[currentStageIndex + 1] || null;

  // すでに最終段階の場合
  if (!nextStage) {
    return {
      currentStage,
      nextStage: null,
      remainingCount: 0,
      progressPercent: 100,
    };
  }

  // あと何回で次の段階に成長するか
  const remainingCount = Math.max(
    nextStage.min - checkinCount,
    0
  );

  // 次の成長に必要な回数に対する進捗率
  const progressPercent = Math.min(
    Math.round((checkinCount / nextStage.min) * 100),
    100
  );

  return {
    currentStage,
    nextStage,
    remainingCount,
    progressPercent,
  };
}
export function DashboardTree({ count }) {
  const { currentStage } = getTreeProgress(count);

  return (
    <div className="aspect-[16/7] w-full overflow-hidden">
      <img
        src={currentStage.image}
        alt="木の成長"
        className="h-full w-full object-cover object-[center_58%]"
      />
    </div>
  );
}