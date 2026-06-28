module Users
  class OmniauthRedirectsController < ApplicationController
    skip_before_action :authenticate_user!, only: :google_oauth2

    def google_oauth2
    end
  end
end
