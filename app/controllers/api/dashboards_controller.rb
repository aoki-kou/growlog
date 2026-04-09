module Api
  class DashboardsController < ApplicationController
    before_action :authenticate_user!

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
  end
end