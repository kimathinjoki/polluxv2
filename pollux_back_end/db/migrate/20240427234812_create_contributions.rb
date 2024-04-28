class CreateContributions < ActiveRecord::Migration[7.0]
  def change
    create_table :contributions do |t|
      t.string :participant_id
      t.string :activity_id
      t.decimal :amount

      t.timestamps
    end
  end
end
