export type Role = "student" | "parent";

const KEY = "rms-role";

const CODE: Record<Role, string> = {
  student: "9109",
  parent: "1947",
};

export function getRole(): Role | null {
  const value = localStorage.getItem(KEY);
  return value === "student" || value === "parent" ? value : null;
}

export function login(role: Role, code: string) {
  if (code.trim() !== CODE[role]) return false;
  localStorage.setItem(KEY, role);
  if (role === "parent") sessionStorage.setItem("rms-parent-ok", "yes");
  return true;
}

export function logout() {
  localStorage.removeItem(KEY);
  sessionStorage.removeItem("rms-parent-ok");
}
