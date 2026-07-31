require "rails_helper"

RSpec.describe "SharedGoals", type: :request do
  let(:user) { create(:user) }

  let(:goal) do
    create(
      :goal,
      user: user,
      share_enabled: true,
      share_token: "test-share-token"
    )
  end

  describe "GET /share/goals/:token" do
    it "公開中の目標を表示できる" do
      get "/share/goals/#{goal.share_token}"

      expect(response).to have_http_status(:ok)
      expect(response.body).to include(goal.title)
    end

    it "非公開の目標は表示しない" do
      goal.update!(share_enabled: false)

      get "/share/goals/#{goal.share_token}"

      expect(response).to have_http_status(:not_found)
    end
  end

  describe "GET /share/goals/:token/ogp.png" do
    it "PNG画像を返す" do
      get "/share/goals/#{goal.share_token}/ogp.png"

      expect(response).to have_http_status(:ok)
      expect(response.media_type).to eq("image/png")
    end
  end
end
