from sqlalchemy import ForeignKey, Integer, Numeric
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database import Base


class AppointmentService(Base):
    __tablename__ = "appointment_services"

    id: Mapped[int] = mapped_column(
        primary_key=True,
        index=True,
    )

    appointment_id: Mapped[int] = mapped_column(
        ForeignKey("appointments.id"),
        nullable=False,
    )

    service_id: Mapped[int] = mapped_column(
        ForeignKey("services.id"),
        nullable=False,
    )

    price: Mapped[float] = mapped_column(
        Numeric(10, 2),
        nullable=False,
    )

    duration_minutes: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
    )

    appointment = relationship(
        "Appointment",
        back_populates="appointment_services",
    )

    service = relationship(
        "Service",
    )
