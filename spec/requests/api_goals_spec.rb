require "rails_helper"

RSpec.describe "Api::Goals", type: :request do
  let!(:user) do
    User.create!(
      name: "テストユーザー",
      email: "test@example.com",
      password: "password",
      password_confirmation: "password"
    )
  end

  describe "POST /api/goals" do
    it "ログイン済みユーザーは目標を作成できる" do
      sign_in(user)

      expect {
        post "/api/goals", params: { title: "Rails学習" }
      }.to change(Goal, :count).by(1)

      expect(response).to have_http_status(:ok)

      json = JSON.parse(response.body)
      expect(json["success"]).to eq(true)
      expect(json["goal"]["title"]).to eq("Rails学習")
    end

    it "タイトルが空の場合は作成できない" do
      sign_in(user)

      expect {
        post "/api/goals", params: { title: "" }
      }.not_to change(Goal, :count)

      expect(response).to have_http_status(:unprocessable_content)

      json = JSON.parse(response.body)
      expect(json["success"]).to eq(false)
    end

    it "未ログインユーザーは作成できない" do
      expect {
        post "/api/goals", params: { title: "Rails学習" }
      }.not_to change(Goal, :count)

      expect(response).to have_http_status(:unauthorized)

      json = JSON.parse(response.body)
      expect(json["error"]).to eq("unauthorized")
    end
  end

  describe "GET /api/goals" do
    it "ログイン済みユーザーは自分の目標一覧を取得できる" do
      other_user = User.create!(
        name: "他のユーザー",
        email: "other@example.com",
        password: "password",
        password_confirmation: "password"
      )

      user.goals.create!(title: "自分の目標")
      other_user.goals.create!(title: "他人の目標")

      sign_in(user)

      get "/api/goals"

      expect(response).to have_http_status(:ok)

      json = JSON.parse(response.body)
      titles = json["goals"].map { |goal| goal["title"] }

      expect(titles).to include("自分の目標")
      expect(titles).not_to include("他人の目標")
      expect(json["goals"].first).to include("checkin_count", "today_checked", "tree_stage")
    end
  end
end
