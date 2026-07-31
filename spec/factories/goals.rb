FactoryBot.define do
  factory :goal do
    association :user

    title { "ランニング" }

    share_enabled { false }

    share_token { nil }
  end
end
