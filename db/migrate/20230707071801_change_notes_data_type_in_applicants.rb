class ChangeNotesDataTypeInApplicants < ActiveRecord::Migration[7.0]
  def change
    change_column :applicants, :notes, :string
  end
end
