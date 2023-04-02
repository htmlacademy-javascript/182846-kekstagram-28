const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const uploadImageElement = document.querySelector('#upload-file');
const imageEditPreviewElement = document.querySelector('.img-upload__preview img');

uploadImageElement.addEventListener('change', () => {
  const file = uploadImageElement.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    imageEditPreviewElement.src = URL.createObjectURL(file);
  }
});
