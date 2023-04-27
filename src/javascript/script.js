let areas = {
    a: null,
    b: null,
    c: null,
    d: null
}
let pontos = 0;
let level = 0;
let tentativas = 0;
let User = "";

const inputNome = document.querySelector(".nome")
inputNome.addEventListener('keyup', function (e) {
    let key = e.which || e.keyCode;
    if (inputNome.value == "") {
        if (key == 13) {
            let numberRandom = Math.random(9) * 10000;
            User = `User${numberRandom.toFixed()}`
            document.querySelector(".inputComeco").style.display = "none";
        }
    } else {
        if (key == 13) {
            User = inputNome.value;
            let valorInput = inputNome.getAttribute("value")
            valorInput = User
            document.querySelector(".inputComeco").style.display = "none";
        }
    }
});


document.querySelector(".area-messagens").innerHTML = `<p><span style="color: blue;">Sistema:</span> ${User} Bem vindo, arraste as partes para os seus lugares</p>`;

document.querySelectorAll('.pegar').forEach(item => {
    item.addEventListener('dragstart', dragstart);
    item.addEventListener('dragend', dragend);
});
document.querySelectorAll('.soltar').forEach(area => {
    area.addEventListener('dragover', dragover)
    area.addEventListener('dragleave', dragleave)
    area.addEventListener('drop', drop);
});

function dragstart(e) {
    this.classList.add('dragging');
}
function dragend(e) {
    this.classList.remove('dragging');
}
function dragover(e) {
    if (e.currentTarget.querySelector('.pegar') === null) {
        e.preventDefault();
        e.currentTarget.classList.add('hover');
    }
}
function dragleave(e) {
    e.currentTarget.classList.remove('hover');
}
function drop(e) {
    e.currentTarget.classList.remove('hover');
    let dragItem = document.querySelector('.pegar.dragging');
    e.currentTarget.appendChild(dragItem);
}
//logica
function upDateAreas() {
    let etapa = jogo[level]
    let tipoSequencia = etapa.sequencia;
    if (level < jogo.length - 1) {
        document.querySelectorAll('.soltar').forEach(area => {
            let nome = area.getAttribute('data-name');
            if (area.querySelector('.pegar') !== null) {
                areas[nome] = area.querySelector('.pegar img').getAttribute("data-number");
            } else {
                areas[nome] = null;
            }
        });
        //sistema de dica
       

        let qualItem = document.querySelector("[data-name]")

        if (qualItem = "a" && tipoSequencia.a == areas.a) {
            document.getElementsByClassName("soltar")[0].style.backgroundColor = "green"
        }
        if (qualItem = "b" && tipoSequencia.b == areas.b) {
            document.getElementsByClassName("soltar")[1].style.backgroundColor = "green"
        }
        if (qualItem = "c" && tipoSequencia.c == areas.c) {
            document.getElementsByClassName("soltar")[2].style.backgroundColor = "green"
        }
        if (qualItem = "d" && tipoSequencia.d == areas.d) {
            document.getElementsByClassName("soltar")[3].style.backgroundColor = "green"
        }


        if (tipoSequencia.a == areas.a && tipoSequencia.b == areas.b && tipoSequencia.c == areas.c && tipoSequencia.d == areas.d) {
            document.getElementById('lampada-completa').style.backgroundColor = 'green';
            document.querySelector(".button-passar-nivel").style.display = "flex";

            pontos++
        } else {
            tentativas++
            document.getElementById('lampada-completa').style.backgroundColor = 'red';
            if (tentativas >= 3) {
                document.querySelector(".jogoCompleto").style.display = "flex"
                document.querySelector(".jogoCompleto h1").innerHTML = "Todas as tentativas foram usadas"
            }
        }
        // sistema de rank
        sistemaDeRank()
    } else {
        document.querySelector(".jogoCompleto").style.display = "flex"
    }
}

function sistemaDeRank() {
    let rank = document.querySelector(".options.selected")

    if (pontos > 1 && pontos <= 5) {
        rank.classList.remove('selected')
        document.querySelector(".options[value= iniciante]").classList.add("selected")
        document.querySelector(".options.selected").style.backgroundColor = "yellow"
        document.querySelector(".mostrarRank").style.color = "yellow"
        document.querySelector(".mostrarRank").innerHTML = "iniciante"
    }
    if (pontos > 5 && pontos <= 10) {
        rank.classList.remove('selected')
        document.querySelector(".options[value= experiente]").classList.add("selected")
        document.querySelector(".options.selected").style.backgroundColor = "green"
        document.querySelector(".mostrarRank").innerHTML = "experiente"
        document.querySelector(".mostrarRank").style.color = "green"
    }
    if (pontos > 10 && pontos <= 12) {
        rank.classList.remove('selected')
        document.querySelector(".options[value= proficional]").classList.add("selected")
        document.querySelector(".options.selected").style.backgroundColor = "gold"
        document.querySelector(".mostrarRank").innerHTML = "proficional"
        document.querySelector(".mostrarRank").style.color = "gold"
    }
}
document.getElementById("Rank").addEventListener("click", () => {
    document.querySelector(".select").style.display = "flex";
})
document.addEventListener("click", (e) => {
    if (e.target == document.querySelector("#Rank") && document.querySelector(".select").style.display == "flex") {
        document.querySelector(".select").style.display = "none";
    }
})

function functionPassaNivel() {
    level++
    tentativas = 0

    let lampadacheia = document.querySelector("#lampada-desmontada");

    document.querySelectorAll(".soltar").forEach(item => { item.style.backgroundColor = '' });
    document.querySelector(".button-passar-nivel").style.display = "none";
    document.getElementById("level").innerHTML = level;
    document.querySelector(".area-messagens").innerHTML += `<p><span style="color: blue;">Sistema:</span> ${User} parabém por passar para o nivel ${level}, continue jogando para subir ainda mais de rank</p>`;

    if (lampadacheia !== "") {
        document.getElementById('lampada-completa').style.backgroundColor = '';
        document.querySelectorAll(".container-pegar").forEach(item => {
            let quatClassPegar = document.getElementsByClassName("pegar").length
            for (let i = 0; i < quatClassPegar; i++) {

                if (document.querySelector(".container-pegar") !== null) {
                    let dragItem = document.getElementsByClassName('pegar')[i];
                    let containerItens = document.getElementsByClassName("container-pegar")[i]
                    containerItens.appendChild(dragItem)
                }
            }
        })
    }
}
//butão de reiniciar
document.getElementById("buttonRest").addEventListener("click", () => {
    document.querySelectorAll(".soltar").forEach(item => { item.style.backgroundColor = '' });
    document.getElementById('lampada-completa').style.backgroundColor = '';
    document.querySelectorAll(".container-pegar").forEach(item => {
        let quatClassPegar = document.getElementsByClassName("pegar").length
        for (let i = 0; i < quatClassPegar; i++) {

            if (document.querySelector(".container-pegar") !== null) {
                let dragItem = document.getElementsByClassName('pegar')[i];
                let containerItens = document.getElementsByClassName("container-pegar")[i]
                containerItens.appendChild(dragItem)
            }
        }
    })
})
// butão de tentar novamente 
function tentarNovamente() {
    tentativas = 0;
    level = 0;
    document.getElementById("level").innerHTML = level;
    document.querySelector(".jogoCompleto").style.display = "none"
    document.querySelectorAll('.soltar').forEach(area => {
        let nome = area.getAttribute('data-name');
        areas[nome] = null;
    })
    document.querySelectorAll(".soltar").forEach(item => { item.style.backgroundColor = '' });
    document.getElementById('lampada-completa').style.backgroundColor = '';
    document.querySelectorAll(".container-pegar").forEach(item => {
        let quatClassPegar = document.getElementsByClassName("pegar").length
        for (let i = 0; i < quatClassPegar; i++) {

            if (document.querySelector(".container-pegar") !== null) {
                let dragItem = document.getElementsByClassName('pegar')[i];
                let containerItens = document.getElementsByClassName("container-pegar")[i]
                containerItens.appendChild(dragItem)
            }
        }
    })
}
//chat
const inputEle = document.getElementById('chatinput');
inputEle.addEventListener('keyup', function (e) {
    var key = e.which || e.keyCode;
    if (inputEle.value == "") {
    } else {
        if (key == 13) {
            document.querySelector(".area-messagens").innerHTML += `<p><span style="color: blue;">${User}:</span>${this.value}</p>`;
            inputEle.value = "";
        }
    }
});