import { Button } from "@/components/ui/button";
import { logout } from "../actions";
import ReportList from "./ReportList";

export default function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-end">
        <form action={logout}>
          <Button type="submit" variant="destructive">Logout</Button>
        </form>
      </div>
      <ReportList />
    </div>
  );
}