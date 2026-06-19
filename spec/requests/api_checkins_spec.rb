require "rails_helper"

RSpec.describe "Api::Checkins", type: :request do
  let!(:user) do
    User.create!(
      name: "テストユーザー",
      email: "test@example.com",
      password: "password",
      password_confirmation: "password"
    )
  end

  let!(:goal) do
    user.goals.create!(title: "Rails学習")
  end

  describe "POST /api/checkins" do
    it "ログイン済みユーザーは自分の目標を達成できる" do
      sign_in(user)

      expect {
        post "/api/checkins", params: { goal_id: goal.id }
      }.to change(Checkin, :count).by(1)

      expect(response).to have_http_status(:ok)

      json = JSON.parse(response.body)
      expect(json["success"]).to eq(true)
      expect(json["checkin_count"]).to eq(1)
      expect(json["today_checked"]).to eq(true)
      expect(json["tree_stage"]).to be_present
    end

    it "他人の目標は達成できない" do
      other_user = User.create!(
        name: "他のユーザー",
        email: "other@example.com",
        password: "password",
        password_confirmation: "password"
      )

      other_goal = other_user.goals.create!(title: "他人の目標")

      sign_in(user)

      expect {
        post "/api/checkins", params: { goal_id: other_goal.id }
      }.not_to change(Checkin, :count)

      expect(response).to have_http_status(:not_found)
    end

    it "未ログインユーザーは達成できない" do
      expect {
        post "/api/checkins", params: { goal_id: goal.id }
      }.not_to change(Checkin, :count)

      expect(response).to have_http_status(:unauthorized)

      json = JSON.parse(response.body)
      expect(json["error"]).to eq("unauthorized")
    end
  end
end
