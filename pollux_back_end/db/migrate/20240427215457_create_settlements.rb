class CreateSettlements < ActiveRecord::Migration[7.0]
  def change
    create_table :settlements do |t|
      t.integer :from_user
      t.integer :to_user
      t.integer :activity_id
      t.decimal :settlement_amount

      t.timestamps
    end
  end
end
