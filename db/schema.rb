# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.1].define(version: 2026_07_30_031706) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "pg_catalog.plpgsql"

  create_table "checkins", force: :cascade do |t|
    t.date "checked_on", null: false
    t.datetime "created_at", null: false
    t.bigint "goal_id", null: false
    t.datetime "updated_at", null: false
    t.index ["goal_id", "checked_on"], name: "index_checkins_on_goal_id_and_checked_on", unique: true
    t.index ["goal_id"], name: "index_checkins_on_goal_id"
  end

  create_table "goals", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.boolean "share_enabled", default: false, null: false
    t.string "share_token"
    t.string "title", null: false
    t.datetime "updated_at", null: false
    t.bigint "user_id", null: false
    t.index ["share_token"], name: "index_goals_on_share_token", unique: true
    t.index ["user_id"], name: "index_goals_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "name"
    t.string "provider"
    t.datetime "remember_created_at"
    t.datetime "reset_password_sent_at"
    t.string "reset_password_token"
    t.string "uid"
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["provider", "uid"], name: "index_users_on_provider_and_uid", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "checkins", "goals"
  add_foreign_key "goals", "users"
end
