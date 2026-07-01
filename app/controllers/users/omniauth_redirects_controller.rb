module Users
  class OmniauthRedirectsController < ApplicationController
    skip_before_action :authenticate_user!, only: :google_oauth2

    def google_oauth2
      redirect_to user_google_oauth2_omniauth_authorize_path, allow_other_host: true, status: :see_other
    end
  end
end
