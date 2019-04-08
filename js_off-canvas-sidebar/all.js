let app = document.querySelector('#app');

function navSection() {
    let Nav = document.createElement('nav');

    let Ul = document.createElement('ul');

    let li1 = document.createElement('li');
    li1.classList.add('toggle');
    let bar1 = document.createElement('div');
    bar1.classList.add('bar1');
    let bar2 = document.createElement('div');
    bar2.classList.add('bar2');
    let bar3 = document.createElement('div');
    bar3.classList.add('bar3');
    li1.appendChild(bar1);
    li1.appendChild(bar2);
    li1.appendChild(bar3);

    let li2 = document.createElement('li');
    let li2text = document.createTextNode('首頁');
    li2.appendChild(li2text);

    let li3 = document.createElement('li');
    let li3text = document.createTextNode('阿滴英文');
    li3.appendChild(li3text);

    let li4 = document.createElement('li');
    let li4text = document.createTextNode('上班不要看');
    li4.appendChild(li4text);

    let li5 = document.createElement('li');
    let li5text = document.createTextNode('關於我們');
    li5.appendChild(li5text);

    Ul.appendChild(li1);
    Ul.appendChild(li2);
    Ul.appendChild(li3);
    Ul.appendChild(li4);
    Ul.appendChild(li5);
    Nav.appendChild(Ul);
    app.appendChild(Nav);
}

function Content() {
    let html = [];
    let coxBody = `
        <section class="content">
            <h1>Lorem, ipsum.</h1>
            <p>Lorem, ipsum dolor.</p>
            <p>Lorem ipsum dolor sit.</p>
        </section>
        `;
    html.push(coxBody);
    console.log(html.join(""));
    app.innerHTML = html.join("");
}

function toggleMenu() {
    let toggle = document.querySelector('.toggle');
    let Navbar = document.querySelector('nav');
    toggle.addEventListener('click', () => {
        app.classList.toggle('menu-open');
        Navbar.classList.toggle('open');
    })
}

window.addEventListener('load', () => {
    Content();
    navSection();
    toggleMenu();
})