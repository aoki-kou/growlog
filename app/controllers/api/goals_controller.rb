module Api
  class GoalsController < ApplicationController
    skip_forgery_protection
    before_action :authenticate_user!

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
  end
end