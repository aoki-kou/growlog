class CreateCheckins < ActiveRecord::Migration[7.2]
  def change
    create_table :checkins do |t|
      t.references :goal, null: false, foreign_key: true
      t.date :checked_on, null: false
      t.timestamps
    end

    add_index :checkins, [ :goal_id, :checked_on ], unique: true
  end
end
