module Api
  class CalendarsController < ApplicationController
    def show
      checked_dates = Checkin
                      .joins(:goal)
                      .where(goals: { user_id: current_user.id })
                      .pluck(:created_at)
                      .map { |created_at| created_at.to_date.to_s }
                      .uniq

      render json: {
        checked_dates: checked_dates
      }
    end
  end
end
