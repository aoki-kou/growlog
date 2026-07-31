FactoryBot.define do
  factory :checkin do
    association :goal

    checked_on { Date.current }
  end
end
