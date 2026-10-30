export type Role = "student" | "parent";
export type AccountId = "home" | "demo";

const KEY = "rms-role";
const ACCOUNT = "rms-account";

const CODES: Record<AccountId, Record<Role, string>> = {
  home: { student: "9109", parent: "1947" },
  demo: { student: "1357", parent: "2468" },
};

export function getRole(): Role | null {
  const value = localStorage.getItem(KEY);
  return value === "student" || value === "parent" ? value : null;
}

export function getAccount(): AccountId {
  return localStorage.getItem(ACCOUNT) === "demo" ? "demo" : "home";
}

export function parentCode(account: AccountId = getAccount()) {
  return CODES[account].parent;
}

export function login(role: Role, code: string) {
  const entered = code.trim();
  const account = (Object.keys(CODES) as AccountId[]).find((id) => CODES[id][role] === entered);
  if (!account) return false;
  localStorage.setItem(KEY, role);
  localStorage.setItem(ACCOUNT, account);
  if (role === "parent") sessionStorage.setItem("rms-parent-ok", "yes");
  return true;
}

export function logout() {
  localStorage.removeItem(KEY);
  localStorage.removeItem(ACCOUNT);
  sessionStorage.removeItem("rms-parent-ok");
}
