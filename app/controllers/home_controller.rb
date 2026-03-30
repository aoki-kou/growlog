class HomeController < ApplicationController
  def index
    @goal = current_user.goals.first(params[:goal_id])
  end
end
