module Api
  class MeController < ApplicationController
    skip_before_action :authenticate_user!
    before_action :require_login

    def show
        render json:{
          user: {
            id: current_user.id,
            name: current_user.name,
            email: current_user.email
          }
        }
    end

    private

    def require_login
      return if user_signed_in?

      render json: { error: "unauthorized" }, status: :unauthorized
    end
  end
end
