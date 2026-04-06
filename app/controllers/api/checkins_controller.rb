module Api
  class CheckinsController < ApplicationController
    skip_forgery_protection
    before_action :authenticate_user!

    def create
      goal = current_user.goals.find(params[:goal_id])
      checkin = goal.checkins.new(checked_on: Date.current)

      if checkin.save
        render json: {
          success: true,
          checkin_count: goal.checkins.count,
          today_checked: true,
          tree_stage: goal.tree_stage
        }
      else
        render json: {
          success: false,
          errors: checkin.errors.full_messages
        }, status: :unprocessable_entity
      end
    end
  end
end