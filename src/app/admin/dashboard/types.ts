export type SerializedReport = {
    id: string;
    type: string;
    reason: string;
    target_id: string;
    submitted_by: string | null;
    description?: string | null;
    created_at: string;
    resolved_by?: string | null;
    resolved_at?: string | null;
    submitter: {
      id: string;
      name?: string | null;
    } | null;
    resolver: {
      id: string;
      name?: string | null;
    } | null;
  };
  