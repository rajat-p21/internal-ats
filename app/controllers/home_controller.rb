class HomeController < ApplicationController
    def index
    end

    def resume
        @applicant = Applicant.find_by(id: params[:id])
        respond_to do |format|
            format.html do 
                puts "html rendering"
                resume_blob = @applicant.resume.download
                response.headers['Content-Length'] = resume_blob.size.to_s
                send_data resume_blob, filename: @applicant.resume.filename.to_s, type: 'application/pdf', disposition: 'inline'
            end

            format.pdf do
                puts "pdf rendering"
                resume_blob = @applicant.resume.download
                response.headers['Content-Length'] = resume_blob.size.to_s
                send_data resume_blob, filename: @applicant.resume.filename.to_s, type: 'application/pdf', disposition: 'inline'
            end
        end
    end
end



