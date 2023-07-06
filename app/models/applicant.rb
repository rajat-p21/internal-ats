class Applicant < ApplicationRecord
    validates :name, presence: true, uniqueness: true
    validates :email, presence: true, uniqueness: true
    validates :mobile, presence: true, uniqueness: true
    validates :job_profile, presence: true
    validates :last_status, presence: true

    def self.ransackable_attributes(auth_object = nil)
        ['name', 'job_profile', 'email', 'mobile']
    end
end
