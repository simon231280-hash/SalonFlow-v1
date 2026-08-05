from enum import Enum

class UserRole(str, Enum):
    ADMIN = "admin"
    STAFF = "staff"
class AppointmentStatus(str, Enum):
    scheduled = "scheduled"
    confirmed = "confirmed"
    completed = "completed"
    cancelled = "cancelled"
    no_show = "no_show"
