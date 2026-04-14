module Api
  class DashboardsController < ApplicationController
    skip_before_action :authenticate_user!
    before_action :require_login

    def show
      goals = current_user.goals

      if goals.present?
        render json: {
          goals: goals.map do |goal|
            {
            id: goal.id,
            title: goal.title,
            checkin_count: goal.checkins.count,
            today_checked: goal.checkins.exists?(checked_on: Date.current),
            tree_stage: goal.tree_stage
            }
          end
        }
      else
        render json: { goals: nil }
      end
    end

    private

    def require_login
      return if user_signed_in?

      render json: { error: "unauthorized" }, status: :unauthorized
    end
  end
end