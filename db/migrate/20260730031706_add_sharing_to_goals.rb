class AddSharingToGoals < ActiveRecord::Migration[8.1]
  def change
    add_column :goals, :share_token, :string
    add_column :goals, :share_enabled, :boolean,
               null: false,
               default: false

    add_index :goals, :share_token, unique: true
  end
end
