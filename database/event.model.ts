import mongoose, { Document, Model, Schema } from "mongoose";

export interface IEvent extends Document {
  title: string;
  slug: string;
  description: string;
  overview: string;
  image: string;
  venue: string;
  location: string;
  date: string;
  time: string;
  mode: "online" | "offline" | "hybrid" | string;
  audience: string;
  agenda: string[];
  organizer: string;
  tags: string[];
  createdAT: Date;
  updatedAT: Date;
}

type EventModel = Model<IEvent>;

const slugify = (value: string): string =>
  value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

const normalizeDateToIso = (value: string): string => {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    throw new Error("Invalid date value. Use a valid date string.");
  }
  return parsed.toISOString();
};

const normalizeTime = (value: string): string => {
  const input = value.trim().toLowerCase();
  const amPmMatch = input.match(/^(\d{1,2}):(\d{2})\s*(am|pm)$/);
  if (amPmMatch) {
    let hours = Number(amPmMatch[1]);
    const minutes = Number(amPmMatch[2]);
    const period = amPmMatch[3];
    if (hours < 1 || hours > 12 || minutes > 59) {
      throw new Error("Invalid time value.");
    }
    if (period === "pm" && hours !== 12) hours += 12;
    if (period === "am" && hours === 12) hours = 0;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
  }

  const twentyFourHourMatch = input.match(/^(\d{1,2}):(\d{2})$/);
  if (!twentyFourHourMatch) {
    throw new Error("Invalid time format. Use HH:mm or h:mm am/pm.");
  }

  const hours = Number(twentyFourHourMatch[1]);
  const minutes = Number(twentyFourHourMatch[2]);
  if (hours > 23 || minutes > 59) {
    throw new Error("Invalid time value.");
  }
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
};

const requireNonEmptyString = (field: string, value: string): void => {
  if (!value || !value.trim()) {
    throw new Error(`${field} is required and cannot be empty.`);
  }
};

const eventSchema = new Schema<IEvent, EventModel>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true },
    description: { type: String, required: true, trim: true },
    overview: { type: String, required: true, trim: true },
    image: { type: String, required: true, trim: true },
    venue: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    date: { type: String, required: true, trim: true },
    time: { type: String, required: true, trim: true },
    mode: { type: String, required: true, trim: true },
    audience: { type: String, required: true, trim: true },
    agenda: {
      type: [String],
      required: true,
      validate: {
        validator: (items: string[]) => items.length > 0 && items.every((item) => !!item.trim()),
        message: "agenda must contain at least one non-empty item.",
      },
    },
    organizer: { type: String, required: true, trim: true },
    tags: {
      type: [String],
      required: true,
      validate: {
        validator: (items: string[]) => items.length > 0 && items.every((item) => !!item.trim()),
        message: "tags must contain at least one non-empty item.",
      },
    },
  },
  {
    timestamps: { createdAt: "createdAT", updatedAt: "updatedAT" },
  }
);

eventSchema.index({ slug: 1 }, { unique: true });

eventSchema.pre("save", function (next) {
  try {
    // Regenerate slug only when title changes to keep URLs stable.
    if (this.isModified("title")) {
      requireNonEmptyString("title", this.title);
      this.slug = slugify(this.title);
    }

    requireNonEmptyString("description", this.description);
    requireNonEmptyString("overview", this.overview);
    requireNonEmptyString("image", this.image);
    requireNonEmptyString("venue", this.venue);
    requireNonEmptyString("location", this.location);
    requireNonEmptyString("mode", this.mode);
    requireNonEmptyString("audience", this.audience);
    requireNonEmptyString("organizer", this.organizer);

    // Normalize date and time before persisting for consistent querying and display.
    this.date = normalizeDateToIso(this.date);
    this.time = normalizeTime(this.time);

    next();
  } catch (error) {
    next(error as Error);
  }
});

export const Event: EventModel =
  (mongoose.models.Event as EventModel) || mongoose.model<IEvent, EventModel>("Event", eventSchema);

