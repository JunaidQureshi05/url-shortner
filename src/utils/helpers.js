export function getInitials(userName) {
  return userName
    .split(" ")
    .slice(0, 2)
    .map((item) => item.charAt(0))
    .join("");
}

export const downloadImage = (url) => {
  const imageUrl = url?.qr_code;
  const fileName = url?.title; // Desired file name for the downloaded image

  // Create an anchor element
  const anchor = document.createElement("a");
  anchor.href = imageUrl;
  anchor.download = fileName;

  // Append the anchor to the body
  document.body.appendChild(anchor);

  // Trigger the download by simulating a click event
  anchor.click();

  // Remove the anchor from the document
  document.body.removeChild(anchor);
};

export const getHostName = () => {
  return window?.location?.host;
};
