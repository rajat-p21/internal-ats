class ApplicantSerializer
  include JSONAPI::Serializer
  attributes :id, :name, :email, :mobile, :last_status, :job_profile, :notes, :resume, :created_at, :updated_at, :resume_url
end
