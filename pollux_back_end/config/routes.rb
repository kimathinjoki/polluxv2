Rails.application.routes.draw do
  resources :contributions, only: [:index, :show, :update, :destroy]
  resources :settlements, only: [:index, :show, :update, :destroy]
  resources :participants, only: [:index, :show, :update, :destroy]
  resources :activities, only: [:index, :show, :update, :destroy]
  resources :expenses, only: [:index, :show, :update, :destroy]
  resources :users, only: [:index, :show, :update, :destroy]
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  #  user register
  post '/register', to: 'users#register'
  
  # login
  post '/login', to: 'sessions#login'

  #  create activity
  post '/create_activity', to: 'activities#create_activity'

  #  add participants

  post '/add_participants', to: 'participants#add_participants'


end
