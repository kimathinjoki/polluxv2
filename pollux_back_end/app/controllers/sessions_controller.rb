class SessionsController < ApplicationController

    def login
        user = find_user_by_username_or_email(user_params_global[:username], user_params_global[:email])
        if user&.authenticate(user_params_global[:password])
          login_as(user)
        else
          render json: { message: 'Invalid username/email or password' }, status: :unauthorized
        end
    end


    private

    def find_user_by_username_or_email(username, email)
        sql = 'username = :username OR email = :email'
        User.where(sql, username: username, email: email).first
    end


    def login_as(user)
        token = encode(user.id, user.email)
        render json: { userId: user.id, userName: "#{user.first_name} #{user.last_name}", email: user.email,
                        phone_number: user.phone_number, token: token}, status: :ok
      end




end
