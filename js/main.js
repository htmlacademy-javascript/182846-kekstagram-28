import { drawGallery } from './gallery.js';
import { getData, sendData } from './api.js';
import { showAlert, debounce } from './utils.js';
import { showSuccessMessage, showErrorMessage } from './message.js';
import { hideModal, setOnFormSubmit } from './form.js';
import { init, getFilteredImages } from './filter.js';
import './form.js';

setOnFormSubmit (async (data) => {
  try {
    await sendData(data);
    hideModal();
    showSuccessMessage();
  } catch {
    showErrorMessage();
  }
});

try {
  const data = await getData();
  const debounceDrawGallery = debounce(drawGallery);
  init(data, debounceDrawGallery);
  drawGallery(getFilteredImages());
} catch (err) {
  showAlert(err.message);
}
