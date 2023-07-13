class AddNotesToApplicants < ActiveRecord::Migration[7.0]
  def change
    add_column :applicants, :notes, :text
  end
end
