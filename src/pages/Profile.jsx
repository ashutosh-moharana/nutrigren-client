import { useAuth } from "../context/AuthContext";
import SectionHeading from "../components/common/SectionHeading";
import Card from "../components/common/Card";
import Button from "../components/common/Button";
import BackButton from "../components/common/BackButton";

export default function Profile() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-background px-5 md:px-20 pb-20 pt-28">
      <BackButton fallback="/" />
      <SectionHeading
        eyebrow="Account"
        title="Profile & preferences"
        description="Update contact info, manage addresses, and access exclusive drops."
      />

      <div className="grid gap-6 max-w-4xl mx-auto mt-10">
        <Card className="p-6 md:p-8 flex flex-col md:flex-row gap-6 items-center">
          <img
            src={
              user?.picture ||
              `https://avatar.iran.liara.run/username?username=${user?.name}`
            }
            alt={user?.name}
            className="w-24 h-24 rounded-full object-cover border-4 border-primary/30"
          />
          <div className="flex-1 space-y-2 text-center md:text-left">
            <h3 className="text-2xl font-semibold text-heading">
              {user?.name}
            </h3>
            <p className="text-subtle">{user?.email}</p>
            <p className="text-xs uppercase tracking-[0.3em] text-primary/70">
              Member since{" "}
              {user?.createdAt
                ? new Date(user.createdAt).getFullYear()
                : "forever"}
            </p>
          </div>
          <Button variant="outline" className="w-full md:w-auto">
            Edit details
          </Button>
        </Card>

        <Card className="p-6 md:p-8">
          <h4 className="text-xl font-semibold text-heading mb-4">
            Saved preferences
          </h4>
          <div className="flex flex-wrap gap-3 text-sm text-subtle">
            <span className="px-4 py-2 rounded-full bg-muted text-muted-foreground">
              Communication: Email
            </span>
            <span className="px-4 py-2 rounded-full bg-muted text-muted-foreground">
              Default payment: Razorpay
            </span>
            <span className="px-4 py-2 rounded-full bg-muted text-muted-foreground">
              City: Bengaluru
            </span>
          </div>
        </Card>
      </div>
    </div>
  );
}

