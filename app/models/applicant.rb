class Applicant < ApplicationRecord

    has_one_attached :resume

    validates :name, presence: true, uniqueness: true
    validates :email, presence: true, uniqueness: true
    validates :mobile, presence: true, uniqueness: true
    validates :job_profile, presence: true
    validates :last_status, presence: true
    # validates :notes

    def resume_url 
        Rails.application.routes.url_helpers.url_for(resume) if resume.attached?
    end

    def self.ransackable_attributes(auth_object = nil)
        ['name', 'job_profile', 'email', 'mobile', 'last_status']
    end
end
