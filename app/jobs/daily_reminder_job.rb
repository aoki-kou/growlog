class DailyReminderJob < ApplicationJob
  queue_as :default

  def perform
    User.find_each do |user|
      goal = user.goals.first

      next if goal.blank?
      next if goal.checkins.exists?(checked_on: Date.current)

      ReminderMailer
        .with(user: user, goal: goal)
        .daily_reminder
        .deliver_later
    end
  end
end
