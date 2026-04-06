class HomeController < ApplicationController
  before_action :authenticate_user!
  def index
    @goal = current_user.goals.first
  end
end
