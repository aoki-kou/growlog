class GoalsController < ApplicationController
  def index
    @goals = current_user.goals
  end

  def new
    @goal = current_user.goals.new
  end

  def create
    @goal = current_user.goals.build(goal_params)
    if @goal.save
      redirect_to root_path, success: "目標が作成できました"
    else
      flash.now[:danger] = "目標が作成できませんでした"
      render :new, status: :unprocessable_entity
    end
  end

  private

  def goal_params
    params.require(:goal).permit(:title)
  end
end
