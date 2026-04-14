module Api
  class SessionsController < ApplicationController
    skip_forgery_protection
    skip_before_action :authenticate_user!, only: [ :create ]

    def create
      user = User.find_by(email: params[:email])

      if user&.valid_password?(params[:password])
        sign_in(user)
        render json: { success: true }
      else
        render json: {
          success: false,
          error: "メールアドレスまたはパスワードが違います"
        }, status: :unauthorized
      end
    end

    def destroy
      sign_out(current_user)
      render json: { success: true }
    end
  end
end
