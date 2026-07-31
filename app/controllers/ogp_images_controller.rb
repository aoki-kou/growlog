class OgpImagesController < ActionController::Base
  def show
    goal = Goal.find_by!(
      share_token: params[:token],
      share_enabled: true
    )

    png_data = OgpImageGenerator.new(goal).call

    expires_in 10.minutes, public: true

    send_data(
      png_data,
      type: "image/png",
      disposition: "inline",
      filename: "growlog-ogp-#{goal.share_token}.png"
    )
  end
end
