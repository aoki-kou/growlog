Rails.application.routes.draw do
  devise_for :users
  
  root "home#index"
  resources :goals, only: %i[new create index]
  resources :checkins, only: %i[create]

  get "up" => "rails/health#show", as: :rails_health_check

  get "service-worker" => "rails/pwa#service_worker", as: :pwa_service_worker
  get "manifest" => "rails/pwa#manifest", as: :pwa_manifest


end
