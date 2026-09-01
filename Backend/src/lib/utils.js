export function formatDate(date) {
  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export const getTime = new Date(Date.now()).toLocaleTimeString([], {
  hour: "2-digit",
  minute: "2-digit",
  hour12: true,
});

export const getRemainingDays = (user) => {
  const now = new Date();
  return Math.ceil(
    (new Date(user.reactivationExpiresAt) - now) / (1000 * 60 * 60 * 24),
  );
};


export const currentYear = new Date(Date.now()).getFullYear()