const inputValue = document.querySelector("#search");
const searchButton = document.querySelector(".searchButton");
const nameContainer = document.querySelector(".main__profile-name");
const unContainer = document.querySelector(".main__profile-username");
const reposContainer = document.querySelector(".main__profile-repos");
const urlContainer = document.querySelector(".main__profile-url");

const client_id = "Iv1.43b16b72c8928622";
const client_secret = "16f7338542421f2e1ea9fdea464aeb38d5d9ed6b";

const fetchUsers = async (user) => {
  const api_call = await fetch(`https://api.github.com/users/${user}?client_id=${client_id}&client_secret=${client_secret}`);

  const data = await api_call.json();

  return { data }
};

const showData = () => {
  fetchUsers(inputValue.value).then((res) => {

    console.log(res);

    nameContainer.innerHTML = `<span class="main__profile-value">
      <img src="${res.data.avatar_url}" alt="pic"/>
    </span>`;

    unContainer.innerHTML = `使用者名稱: <span class="main__profile-value">${res.data.login}</span>`;

    reposContainer.innerHTML = `個人Repos數: <span class="main__profile-value">${res.data.public_repos}</span>`;

    urlContainer.innerHTML = `個人網址: <span class="main__profile-value">${res.data.html_url}</span>`;
  })
};

searchButton.addEventListener("click", () => {
  showData();
});