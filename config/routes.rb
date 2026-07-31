Rails.application.routes.draw do
  devise_for :users, controllers: {
    omniauth_callbacks: "users/omniauth_callbacks"
  }

  root "home#index"
  resources :goals, only: %i[new create index]
  resources :checkins, only: %i[create]

  namespace :api do
    resource :dashboard, only: %i[show]
    resources :checkins, only: %i[create]
    resource :session, only: %i[create destroy]
    resources :users, only: %i[create]

    resources :goals, only: %i[index create destroy] do
      member do
        post :share
        delete :unshare
      end
    end

    get "calendar", to: "calendars#show"
    get "me", to: "me#show"
  end

  get "/share/goals/:token",
      to: "shared_goals#show",
      as: :shared_goal

  get "/share/goals/:token/ogp.png",
      to: "ogp_images#show",
      as: :shared_goal_ogp,
      defaults: { format: :png }
  get "up" => "rails/health#show", as: :rails_health_check
  get "service-worker" => "rails/pwa#service_worker", as: :pwa_service_worker
  get "manifest" => "rails/pwa#manifest", as: :pwa_manifest
  get "/auth/google_oauth2/start", to: "users/omniauth_redirects#google_oauth2"
end
