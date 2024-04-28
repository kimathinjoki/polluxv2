class SettlementSerializer < ActiveModel::Serializer
  attributes :id, :from_user, :to_user, :activity_id, :settlement_amount
end
