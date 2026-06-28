module Users
  class OmniauthCallbacksController < Devise::OmniauthCallbacksController
    def google_oauth2
      user = User.from_omniauth(request.env["omniauth.auth"])

      if user.persisted?
        sign_in(user)
        redirect_to "#{ENV.fetch('FRONTEND_URL', 'http://localhost:5173')}/dashboard", allow_other_host: true
      else
        redirect_to "#{ENV.fetch('FRONTEND_URL', 'http://localhost:5173')}/login", allow_other_host: true
      end
    end
  end
end
