class CreateActivities < ActiveRecord::Migration[7.0]
  def change
    create_table :activities do |t|
      t.string :name
      t.integer :created_by
      t.string :start_date
      t.string :end_date

      t.timestamps
    end
  end
end
