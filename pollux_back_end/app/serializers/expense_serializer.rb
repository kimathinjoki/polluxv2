class ExpenseSerializer < ActiveModel::Serializer
  attributes :id, :description, :expense_amount, :paid_by, :split_type
end
