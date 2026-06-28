class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :omniauthable, omniauth_providers: [:google_oauth2]

  has_many :goals

  def self.from_omniauth(auth)
    user = find_or_initialize_by(provider: auth.provider, uid: auth.uid)

    user.email = auth.info.email
    user.name = auth.info.name.presence || "Googleユーザー"
    user.password = Devise.friendly_token[0, 20] if user.new_record?

    user.save!
    user
  end
end
