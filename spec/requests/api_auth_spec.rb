require "rails_helper"

RSpec.describe "Api::Auth", type: :request do
  describe "POST /api/users" do
    it "ユーザー登録できる" do
      expect {
        post "/api/users", params: {
          name: "テストユーザー",
          email: "test@example.com",
          password: "password",
          password_confirmation: "password"
        }
      }.to change(User, :count).by(1)

      expect(response).to have_http_status(:ok)

      json = JSON.parse(response.body)
      expect(json["success"]).to eq(true)
    end

    it "不正な値ではユーザー登録できない" do
      expect {
        post "/api/users", params: {
          name: "",
          email: "",
          password: "",
          password_confirmation: ""
        }
      }.not_to change(User, :count)

      expect(response).to have_http_status(:unprocessable_entity)

      json = JSON.parse(response.body)
      expect(json["success"]).to eq(false)
    end
  end

  describe "POST /api/session" do
    let!(:user) do
      User.create!(
        name: "ログインユーザー",
        email: "login@example.com",
        password: "password",
        password_confirmation: "password"
      )
    end

    it "正しいメールアドレスとパスワードでログインできる" do
      post "/api/session", params: {
        email: user.email,
        password: "password"
      }

      expect(response).to have_http_status(:ok)

      json = JSON.parse(response.body)
      expect(json["success"]).to eq(true)
    end

    it "間違ったパスワードではログインできない" do
      post "/api/session", params: {
        email: user.email,
        password: "wrongpassword"
      }

      expect(response).to have_http_status(:unauthorized)

      json = JSON.parse(response.body)
      expect(json["success"]).to eq(false)
    end
  end
end
