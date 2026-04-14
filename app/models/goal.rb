class Goal < ApplicationRecord
  belongs_to :user
  has_many :checkins, dependent: :destroy

  validates :title, presence: true, length: { maximum: 255 }

  TREE_STAGES = {
    0 => { name: "タネ", image: "trees/種子の静かな躍動.png" },
    1 => { name: "芽", image: "trees/新芽の誕生.png" },
    3 => "少し高く成長",
    6 => "葉が多くなる",
    10 => "小さい木になる",
    15 => "小さい木に葉が多くなる",
    21 => "木になる",
    28 => "木に葉が増える",
    35 => "木が少し大きくなる",
    42 => "木に葉が増える"
}.freeze

  def checkin_count
    checkins.count
  end

  def tree_stage
    threshold = TREE_STAGES.keys.select { |count| count <= checkin_count }.max
    TREE_STAGES[threshold]
  end
end
