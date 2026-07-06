module Api
  class CalendarsController < ApplicationController
    def show
      year = params[:year].to_i
      month = params[:month].to_i

      start_date = Date.new(year, month, 1)
      end_date = start_date.end_of_month

      checked_dates = Checkin
                      .joins(:goal)
                      .where(goals: { user_id: current_user.id })
                      .where(created_at: start_date.beginning_of_day..end_date.end_of_day)
                      .pluck(:created_at)
                      .map { |created_at| created_at.to_date.to_s }
                      .uniq

      render json: {
        checked_dates: checked_dates
      }
    end
  end
end
