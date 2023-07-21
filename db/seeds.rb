# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

# puts 'creating dummy applicants'

# applicant_list = Applicant.create([
#     {
#         name: 'Rajat Prajapati',
#         email: 'rajatprajapati@blubirch.com',
#         mobile: '7427050255',
#         job_profile: 'Backend Developer',
#         last_status: 'shortlisted'
#     },
#     {
#         name: 'Chaithanya Krishna',
#         email: 'chaithanyak@blubirch.com',
#         mobile: '9999999999',
#         job_profile: 'Frontend Developer',
#         last_status: 'interviewed'
#     },
#     {
#         name: 'Sheela Puli',
#         email: 'sheelapuli@blubirch.com',
#         mobile: '8888888888',
#         job_profile: 'Data Science Engineer',
#         last_status: 'shortlisted'
#     },
#     {
#         name: 'Roop Kumar',
#         email: 'roopkumar@blubirch.com',
#         mobile: '7777777777',
#         job_profile: 'Senior Data Analyst',
#         last_status: 'interviewed'
#     }
# ])

# puts 'applicants created'

admin = Admin.where(email: "rajatprajapati@blubirch.com").first_or_initialize
admin.update!(
    password: "admin@123",
    password_confirmation: "admin@123"
)