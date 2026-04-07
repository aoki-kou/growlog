module Api
  class DashboardsController < ApplicationController
    before_action :authenticate_user!

    def show
      goal = current_user.goals.first

      if goal.present?
        render json: {
          goal: {
            id: goal.id,
            title: goal.title,
            checkin_count: goal.checkins.count,
            today_checked: goal.checkins.exists?(checked_on: Date.current),
            tree_stage: goal.tree_stage
          }
        }
      else
        render json: { goal: nil }
      end
    end
  end
end