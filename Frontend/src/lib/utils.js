export function formatDate(date) {
  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export const getRemainingDays = (user) => {
  const now = new Date();
  return Math.ceil((new Date(user.reactivationExpiresAt) - now) / (1000 * 60 * 60 * 24));
};
