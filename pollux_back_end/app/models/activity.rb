class Activity < ApplicationRecord

    # Associations
    has_many :contributions
    has_many :users, through: :contributions
    has_many :participants, -> { where(user_id: users) }
    
    # Validations
    validates :name, presence: true
    validates :created_by, presence: true
    validates :start_date, presence: true
    validates :end_date, presence: true
    
    # Instance Methods
    def calculate_contributions
        self.contributions.sum(:amount)
    end
    
    def calculate_contributions_by_user(user)
        self.contributions.where(user_id: user.id).sum(:amount)
    end
    
    def calculate_contributions_by_user_id(user_id)
        self.contributions.where(user_id: user_id).sum(:amount)
    end
    
    def calculate_contributions_by_user_email(user_email)
        self.contributions.joins(:user).where(users: { email: user_email }).sum(:amount)
    end
    
    def calculate_contributions_by_user_name(user_name)
        self.contributions.joins(:user).where(users: { name: user_name }).sum(:amount)
    end
    
    def calculate_contributions_by_user_id_and_activity_id(user_id, activity_id)
        self.contributions.where(user_id: user_id, activity_id: activity_id).sum(:amount)
    end
    
    def calculate_contributions_by_user_email_and_activity_id(user_email, activity_id)
        self.contributions.joins(:user).where(users: { email: user_email }, activity_id: activity_id).sum(:amount)
    end
    
    def calculate_contributions_by_user_name_and_activity_id(user_name, activity_id)
        self.contributions.joins(:user).where(users: { name: user_name }, activity_id: activity_id).sum(:amount)
    end
    
    def calculate_contributions_by_user_id_and_activity_name(user_id, activity_name)
        self.contributions.joins(:user).where(user_id: user_id, activities: { name: activity_name }).sum(:amount)
    end
    
    def calculate_contributions_by_user_email_and_activity_name(user_email, activity_name)
        self.contributions.joins(:user).where(users: { email: user_email }, activities: { name: activity_name }).sum(:amount)
    end
    
    def calculate_contributions_by_user_name_and_activity_name(user_name, activity_name)
        self.contributions.joins(:user).where(users: { name: user_name }, activities: { name: activity_name }).sum(:amount)
    end

end
