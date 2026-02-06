import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

export async function checkIsAdmin(uid) {
  const ref = doc(db, "admins", uid);
  const snap = await getDoc(ref);
  return snap.exists();
}
