import mongoose, { Document, Model, Schema, Types } from "mongoose";
import { Event } from "./event.model";

export interface IBooking extends Document {
  eventId: Types.ObjectId;
  email: string;
  createdAT: Date;
  updatedAT: Date;
}

type BookingModel = Model<IBooking>;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const bookingSchema = new Schema<IBooking, BookingModel>(
  {
    eventId: {
      type: Schema.Types.ObjectId,
      ref: "Event",
      required: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      validate: {
        validator: (value: string) => EMAIL_REGEX.test(value),
        message: "Invalid email format.",
      },
    },
  },
  {
    timestamps: { createdAt: "createdAT", updatedAt: "updatedAT" },
  }
);

bookingSchema.index({ eventId: 1, email: 1 }, { unique: true });

bookingSchema.pre("save", async function (next) {
  try {
    // Ensure bookings cannot be created for events that do not exist.
    if (this.isNew || this.isModified("eventId")) {
      const exists = await Event.exists({ _id: this.eventId });
      if (!exists) {
        throw new Error("Referenced event does not exist.");
      }
    }

    next();
  } catch (error) {
    next(error as Error);
  }
});

export const Booking: BookingModel =
  (mongoose.models.Booking as BookingModel) ||
  mongoose.model<IBooking, BookingModel>("Booking", bookingSchema);
