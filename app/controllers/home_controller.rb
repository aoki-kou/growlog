class HomeController < ApplicationController
  def index
    @goal = current_user.goals.first
  end
end
