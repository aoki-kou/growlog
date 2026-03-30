class CheckinsController < ApplicationController
  def create
    @goal = current_user.goals.find(params[:goal_id])

    @checkin = @goal.checkins.new(
      checked_on: Date.current
    )

    if @checkin.save
      redirect_to root_path, success: "木が育ちました"
    else
      redirect_to root_path, danger: "失敗しました"
    end
  end
end
