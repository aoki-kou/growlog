class ReminderMailer < ApplicationMailer
  def daily_reminder
    @user = params[:user]
    @goal = params[:goal]

    mail(
      to: @user.email,
      subject: "今日の目標を記録しましょう | GrowLog"
    )
  end
end
