class CreateParticipants < ActiveRecord::Migration[7.0]
  def change
    create_table :participants do |t|
      t.integer :activity_id
      t.integer :user_id
      t.decimal :paid_amount

      t.timestamps
    end
  end
end
