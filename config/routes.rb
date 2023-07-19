Rails.application.routes.draw do
  devise_for :admins
  root 'home#index'
  get '/applicants/:id/resume', to: 'home#resume'
  namespace :api do
    namespace :v1 do
      resources :applicants, only: [:index, :create, :show, :update, :destroy]
    end
  end
  get '*path', to: 'home#index'
end
