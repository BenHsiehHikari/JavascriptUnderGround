const cardbody = document.querySelector('.card-body');


for (var i = 2; i <= 9; i++) {
    const cards = document.createElement("div");
    cards.classList = "card";
    cardbody.appendChild(cards);

    const block1 = document.createElement("div");
    block1.classList = "col-6";

    const h1num = document.createElement("h1");
    h1num.innerHTML = i;
    block1.appendChild(h1num);

    const block2 = document.createElement("div");
    block2.classList = "col-6";
    cards.appendChild(block1);
    cards.appendChild(block2);

    const col6_1 = cards.querySelector('.card .col-6:nth-child(1)');
    const col6_2 = cards.querySelector('.card .col-6:nth-child(2)');

    for (let j = 1; j <= 9; j++) {
        let text = `<div><span>${i}</span>x<span>${j}</span>=<span>${i*j}</span></div>`;

        if (j < 4) {
            console.log(text);
            col6_1.innerHTML += text;

        } else {
            col6_2.innerHTML += text;

        }

    }


}