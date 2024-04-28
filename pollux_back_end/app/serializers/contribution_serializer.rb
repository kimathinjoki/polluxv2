class ContributionSerializer < ActiveModel::Serializer
  attributes :id, :participant_id, :activity_id, :amount
end
