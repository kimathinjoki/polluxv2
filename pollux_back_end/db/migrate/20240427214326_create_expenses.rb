class CreateExpenses < ActiveRecord::Migration[7.0]
  def change
    create_table :expenses do |t|
      t.string :description
      t.decimal :expense_amount
      t.integer :paid_by
      t.integer :split_type

      t.timestamps
    end
  end
end
