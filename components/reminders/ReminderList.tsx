import ReminderCard from "./ReminderCard";

type Reminder = {
  id: string;
  name: string;
  category: string;
  expiryDate: string;
  status?: "expired" | "soon" | "normal";
};

interface ReminderListProps {
  reminders: Reminder[];
}

export default function ReminderList({
  reminders,
}: ReminderListProps) {
  if (reminders.length === 0) {
    return (
      <p className="text-slate-500">
        No reminders available.
      </p>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {reminders.map((reminder) => (
        <ReminderCard
          key={reminder.id}
          {...reminder}
        />
      ))}
    </div>
  );
}