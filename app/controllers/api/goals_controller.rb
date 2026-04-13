module Api
  class GoalsController < ApplicationController
    skip_forgery_protection
    skip_before_action :authenticate_user!
    before_action :require_login

    def create
      goal = current_user.goals.new(goal_params)

      if goal.save
        render json: {
          success: true,
          goal: {
            id: goal.id,
            title: goal.title
          }
        }
      else
        render json: {
          success: false,
          error: goal.errors.full_messages.first || "目標を登録できませんでした"
        }, status: :unprocessable_entity
      end
    end

    private

    def goal_params
      params.permit(:title)
    end

    def require_login
      return if user_signed_in?

      render json: { error: "unauthorized" }, status: :unauthorized
    end
  end
end