class HomeController < ApplicationController
    def index
    end

    def resume
        @applicant = Applicant.find_by(id: params[:id])
        respond_to do |format|
          
            # debugger
            format.pdf do
                # rails_blob_path(@applicant.resume, disposition: "attachment")
                # send_data(open(rails_blob_path(@applicant.resume, disposition: "attachment")).read, type: @applicant.resume.content_type)
                resume_blob = @applicant.resume.download
                response.headers['Content-Length'] = resume_blob.size.to_s
                send_data resume_blob, filename: @applicant.resume.filename.to_s, type: 'application/pdf', disposition: 'inline'
            end
        end
    end
end



