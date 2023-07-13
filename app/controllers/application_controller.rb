class ApplicationController < ActionController::Base
    include Rails.application.routes.url_helpers
    include ActiveStorage::SetCurrent
end
