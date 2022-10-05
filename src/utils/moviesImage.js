import { MOVIES_URL } from "./constans";

const isValidURL = (url) => {
  try {
    new URL(url);
  } catch (e) {
    return false;
  }
  return true;
};

export const imageFormat = (image) => {
  //const apiUrl = "https://api.nomoreparties.co/";

  if (isValidURL(image)) {
    return image;
  }
  return MOVIES_URL + image.url;
};

export const imageThumbnail = (image) => {
  //const apiUrl = "https://api.nomoreparties.co/";
  return MOVIES_URL + image.formats.thumbnail.url;
};

export const dateFormat = (time) => {
  const hours = Math.floor(time / 60);
  const min = time % 60;

  return `${hours ? `${hours}ч` : ''} ${min ? `${min}м` : ''}`;
};
