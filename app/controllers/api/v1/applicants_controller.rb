class Api::V1::ApplicantsController < ApplicationController
    protect_from_forgery with: :null_session
    def index
        if params[:q].present?
            @q = Applicant.ransack(name_cont: params[:q])
            @applicants = @q.result(distinct: true)
            if @applicants.empty?
                @q = Applicant.ransack(last_status_cont: params[:q])
                @applicants = @q.result(distinct: true)
            end
        elsif params[:job_profiles].present? && params[:job_profiles] != 'All'
            @applicants = Applicant.where(job_profile: params[:job_profiles])
        else
            @applicants = Applicant.all
        end
        render json: @applicants, status: :ok
    end

    def update
        @applicant = Applicant.find(params[:id])
        if @applicant.update(applicant_params)
            render json: @applicant, status: :ok
        else
            render json: {data: @applicant.errors.full_messages, status: 'failure'}, status: :unprocessable_entity
        end
    end

    def show
        @applicant = Applicant.find(params[:id])
        render json: ApplicantSerializer.new(@applicant).serializable_hash[:data][:attributes], status: :ok
    end

    def create
        @applicant = Applicant.new(applicant_params)

        if @applicant.save
            render json: {data: @applicant, status: 'success'}, status: :ok
        else
            render json: {data: @applicant.errors.full_messages, status: 'failure'}, status: :unprocessable_entity
        end
    end

    private
    def applicant_params
        params.require(:applicant).permit(:name, :email, :job_profile, :mobile, :last_status, :resume, :notes)
    end
end