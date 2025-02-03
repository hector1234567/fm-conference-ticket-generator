const userData = document.querySelector(".ticket__user-data");

let params = new URLSearchParams(document.location.search);

userData.innerHTML = `
    <figure  style="background-image: url(${sessionStorage.getItem(
      "avatar"
    )})"></figure>
    <div class="ticket__user-info">
        <span class="ticket__user-heading">${params.get("fullname")}</span>
        <span class="ticket__user-links">
            <a href="https://github.com/${params.get(
              "github-username"
            )}" target="_blank" rel="noopener noreferrer">
                <img src="assets/images/icon-github.svg" alt="Github" />
            </a>
            ${params.get("email")}
        </span>
    <div>
`;
