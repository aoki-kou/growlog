class ApplicationRecord < ActiveRecord::Base
  primary_abstract_class

  def after_sign_out_path_for(resource_or_scope)
    root_path
  end
end
