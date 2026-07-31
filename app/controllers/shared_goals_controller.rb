class SharedGoalsController < ActionController::Base
  layout "share"

  def show
    @goal = Goal.find_by!(
      share_token: params[:token],
      share_enabled: true
    )

    @achievement_count = @goal.checkins.count

    @share_url = request.original_url

    @ogp_image_url =
      "#{request.base_url}" \
      "/share/goals/#{@goal.share_token}/ogp.png" \
      "?v=#{@achievement_count}"
  end
end