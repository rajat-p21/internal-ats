class CreateApplicants < ActiveRecord::Migration[7.0]
  def change
    create_table :applicants do |t|
      t.string :name
      t.string :email
      t.string :mobile
      t.string :job_profile
      t.string :last_status

      t.timestamps
    end
  end
end
