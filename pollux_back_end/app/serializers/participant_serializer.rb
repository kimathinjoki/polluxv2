class ParticipantSerializer < ActiveModel::Serializer
  attributes :id, :activity_id, :user_id, :paid_amount
end
