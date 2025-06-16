export function calculateAgeGroup(dob: string): string {
  const birthYear = new Date(dob).getFullYear();
  const age = new Date().getFullYear() - birthYear;

  if (age < 20) return "under_20";
  if (age < 30) return "20_29";
  if (age < 40) return "30_39";
  return "40_above";
}
