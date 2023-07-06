class Api::V1::ApplicantsController < ApplicationController
    protect_from_forgery with: :null_session
    def index
        if params[:q].present?
            @q = Applicant.ransack(name_cont: params[:q])
            @applicants = @q.result(distinct: true)
        elsif params[:job_profiles].present? && params[:job_profiles] != 'All'
            @applicants = Applicant.where(job_profile: params[:job_profiles])
        else
            @applicants = Applicant.all
        end
        render json: @applicants, status: :ok
    end

    # def search
    #     @q = Applicant.ransack(name_cont: params[:q])
    #     @applicants = @q.result(distinct: true)
    #     render json: @applicants, status: :ok
    # end

    def show
        @applicant = Applicant.find(params[:id])
        render json: @applicant, status: :ok
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
        params.require(:applicant).permit(:name, :email, :job_profile, :mobile, :last_status)
    end
end