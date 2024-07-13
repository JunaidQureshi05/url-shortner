export function getInitials(userName) {
  return userName
    .split(" ")
    .slice(0, 2)
    .map((item) => item.charAt(0))
    .join("");
}
