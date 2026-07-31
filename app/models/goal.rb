class Goal < ApplicationRecord
  belongs_to :user
  has_many :checkins, dependent: :destroy

  before_validation :set_share_token,
                    if: -> { share_enabled? && share_token.blank? }

  validates :title, presence: true, length: { maximum: 255 }

  def checkin_count
    checkins.count
  end

  private
  
  def set_share_token
    loop do
      token = SecureRandom.urlsafe_base64(24)

      next if Goal.exists?(share_token: token)

      self.share_token = token
      break
    end
  end
end
