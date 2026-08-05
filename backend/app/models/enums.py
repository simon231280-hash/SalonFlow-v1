from enum import Enum


class UserRole(str, Enum):
    ADMIN = "admin"
    STAFF = "staff"


class AppointmentStatus(str, Enum):
    SCHEDULED = "Scheduled"
    CHECKED_IN = "Checked In"
    IN_PROGRESS = "In Progress"
    COMPLETED = "Completed"
    CANCELLED = "Cancelled"
    NO_SHOW = "No Show"
