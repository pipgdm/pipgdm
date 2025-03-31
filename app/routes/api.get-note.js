import { json } from "@remix-run/node";

// Simple in-memory storage (will reset when server restarts)
if (!global.storeNote) {
  global.storeNote = "";
}

export async function loader({ request }) {
  return json({ note: global.storeNote });
}

export async function action({ request }) {
  const formData = await request.formData();
  const note = formData.get("note");
  global.storeNote = note;
  return json({ status: "success" });
}