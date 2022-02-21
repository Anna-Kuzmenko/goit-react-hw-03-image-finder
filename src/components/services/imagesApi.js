import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api';

export const getImages = async (searchValue, page, perPage) => {
  const response = await axios.get(
    `/?q=${searchValue}&page=${page}&key=25802713-e226c9b2d7aa04108ed842121&image_type=photo&orientation=horizontal&per_page=${perPage}`
  );
  return response.data;
};
