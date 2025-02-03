const form = document.querySelector(".form");
const avatar = document.getElementById("avatar");
const inputFile = document.querySelector(".form__input-file");

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

function getBase64(file) {
  return new Promise((resolve, reject) => {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      resolve(reader.result);
    };
    reader.onerror = reject;
  });
}

form.addEventListener("submit", function (ev) {
  ev.preventDefault();

  document
    .querySelectorAll(".form input")
    .forEach((el) => el.classList.remove("error"));
  document
    .querySelectorAll(".form__message--error")
    .forEach((el) => el.classList.add("hidden"));
  form.querySelector(".form__message--help").classList.remove("hidden");

  const formData = new FormData(form);
  for (const [key, value] of formData) {
    if (key === "avatar") {
      if (!value.size) {
        return document
          .querySelector(`.form [name="${key}"]`)
          .classList.add("error");
      }
      if (value.size > 4000000) {
        form
          .querySelector(".form__message--maxsize")
          .classList.remove("hidden");
        form.querySelector(".form__message--help").classList.add("hidden");
        return;
      }
    } else if (!value.length) {
      return document
        .querySelector(`.form [name="${key}"]`)
        .classList.add("error");
    }
    if (key === "email" && !validateEmail(value))
      return form
        .querySelector(".form__message--wrongEmail")
        .classList.remove("hidden");
  }
  getBase64(avatar.files[0])
    .then((data) => {
      sessionStorage.setItem("avatar", data);
      form.submit();
    })
    .catch((err) => console.error(err));
});

function changeAvatar() {
  const files = avatar.files;
  if (!files.length) {
    inputFile.innerHTML = `
          <figure>
              <img src="assets/images/icon-upload.svg" alt="Upload" />
          </figure>
          <span class="form__text-file">Drag and drop or click to upload</span>
      `;
  } else {
    inputFile.innerHTML = `
          <figure class="form__preview-file" 
              style="background-image: url(${URL.createObjectURL(
                files[0]
              )})"></figure>
          <div class="form__buttons-file">
              <span id="removeImage">Remove image</span>
              <span id="changeImage">Change image</span>
          </div>
      `;
  }
}

avatar.addEventListener("change", changeAvatar);

inputFile.addEventListener("click", function (ev) {
  if (ev.target.closest("#removeImage")) {
    ev.preventDefault();
    avatar.value = "";
    changeAvatar();
  }
});
