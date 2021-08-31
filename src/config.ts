const required = [
  "DST_DC_USR",
  "DST_CURRENCY",
  "DST_EMAIL_SVC",
  "DST_EMAIL_USR",
  "DST_EMAIL_PW",
  "DST_EMAIL_TO",
  "DST_DAYS_BACK",
];

export function checkEnv(): void {
  const missing = required.filter((v) => !(v in process.env)).join(", ");
  if (missing) {
    throw new Error(`Required variables: ${missing} NOT found in environment.`);
  }
}
