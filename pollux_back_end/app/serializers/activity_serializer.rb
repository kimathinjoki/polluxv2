class ActivitySerializer < ActiveModel::Serializer
  attributes :id, :name, :created_by, :start_date, :end_date
end
