class Goal < ApplicationRecord
  belongs_to :user
  has_many :checkins

  validates :title, presence: true, length: { maximum: 255 }
end
