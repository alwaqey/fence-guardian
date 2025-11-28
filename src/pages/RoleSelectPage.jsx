import { supabase } from "../services/supabase";

export default function RoleSelectPage() {
  supabase.from("users").select("*").then(x => console.log("Supabase test:", x));

  return (
    <div style={{ padding: 50 }}>
      <h1>Choose Role</h1>
      <a href="/ranger-login"><button>Ranger</button></a>
      <br /><br />
      <a href="/admin-login"><button>Supervisor / Adviser</button></a>
    </div>
  );
}
