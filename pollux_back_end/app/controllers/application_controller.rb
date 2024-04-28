class ApplicationController < ActionController::API

      # jwt encoding data for web
  def encode(uid, email)
    payload = {
      data: {
        uid: uid,
        email: email
      },
      exp: Time.now.to_i + (6 * 3600)
    }
    JWT.encode(payload, 'Rails.application.secrets[:secret_key]')
  end

  def decode
    auth_header = request.headers['Authorization']
    if !auth_header || auth_header == ''
      render json: { message: 'Failed', info: 'Not authorized.' }, status: :unauthorized
    else
      token = auth_header.split[1]
      begin
        JWT.decode(token, 'Rails.application.secrets[:secret_key]', true,
                   { algorithm: 'HS256' })[0]['data']
      rescue JWT::DecodeError
        render json: { message: 'failed', info: 'Please login to continue' }, status: :unauthorized
      end
    end
  end

  def token
    auth_header = request.headers['Authorization']
    if !auth_header || auth_header == ''
      render json: { message: 'Failed', info: 'Not authorized.' }, status: :unauthorized
    else
      token = auth_header.split[1]
      token
    end
  end

  # user authorization
  def authorized_user
    decoded = decode
    return false unless decoded
    false
  end

  def verify_user
    unless authorized_user
      head :unauthorized
    end
  end

  def logged_user
    decoded = decode
    return decoded['uid'].to_i
    nil
  end

    def user_params_global
        params.permit(:username, :first_name, :last_name, :email, :phone_number, :password)
    end


end
