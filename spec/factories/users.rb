FactoryBot.define do
  factory :user do
    name { "テストユーザー" }

    sequence(:email) do |n|
      "user#{n}@example.com"
    end

    password { "password" }
    password_confirmation { "password" }
  end
end
