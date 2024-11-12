"use server";
import { createClient } from "@/lib/supabase/server";
import React from "react";

async function AppPage() {
  const supabase = await createClient();

  const { data } = await supabase.auth.getUser();

  return (
    <div>
      <pre>{JSON.stringify(data.user)}</pre>
    </div>
  );
}

export default AppPage;
