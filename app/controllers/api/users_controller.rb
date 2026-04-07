module Api
  class UsersController < ApplicationController
    skip_forgery_protection
    skip_before_action :authenticate_user!, only: [:create]

    def create
      user = User.new(user_params)

      if user.save
        sign_in(user)
        render json: { success: true }
      else
        render json: {
          success: false,
          error: "ユーザーを登録できませんでした"
        }, status: :unprocessable_entity
      end
    end

    private

    def user_params
      params.permit(:email, :password, :password_confirmation, :name)
    end
  end
end