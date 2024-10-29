const readline = require('readline');

// Configurando a interface para leitura da entrada do usuário
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Definindo a classe Heroi
class Heroi {
    constructor(nome, tipo) {
        this.nome = nome;
        this.tipo = tipo.toLowerCase(); // Converte o tipo para minúsculas ao inicializar
    }

    atacar() {
        let ataqueDescricao;
        switch (this.tipo) {
            case 'mago':
                ataqueDescricao = 'usando magia!';
                break;
            case 'guerreiro':
                ataqueDescricao = 'usando uma espada!';
                break;
            case 'monge':
                ataqueDescricao = 'usando artes marciais!';
                break;
            case 'ninja':
                ataqueDescricao = 'usando shuriken!';
                break;
            default:
                ataqueDescricao = '!';
                break;
        }
        console.log(`${this.nome}: O meu ${this.tipo} atacou ${ataqueDescricao}`);
    }

    rolarDado() {
        return Math.floor(Math.random() * 20) + 1;
    }
}

// Função para simular o combate
function simularCombate(heroi) {
    const maxTurnos = 7;
    let turno = 1;
    let ursoCorujaVida = 30;

    while (turno <= maxTurnos) {
        console.log(`\nTurno ${turno}:`);

        let rolagemHeroi = heroi.rolarDado();
        let rolagemUrsoCoruja = heroi.rolarDado();
        console.log(`Mestre: ${heroi.nome} rolou um dado e tirou: ${rolagemHeroi}`);
        console.log("Mestre: Urso Coruja rolou um dado e tirou: " + rolagemUrsoCoruja);

        if (rolagemHeroi >= rolagemUrsoCoruja) {
            console.log(`${heroi.nome}: acertei o ataque!`);
            ursoCorujaVida -= 5; // Dano causado ao Urso Coruja
            heroi.atacar();
        } else {
            console.log("Mestre: O Urso Coruja ataca ${heroi.nome} com suas grandes garras!");
        }

        if (ursoCorujaVida <= 0) {
            console.log(`Mestre: ${heroi.nome} desfere o ultimo golpe no Urso Coruja!! \nVocê ganhou 220 de xp para seu personagem!`);
            break;
        }

        turno++;
    }

    if (turno > maxTurnos) {
        console.log(`Mestre: O Urso Coruja desfere um golpe fatal no ${heroi.nome}... \nMais sorte na proxima vez!`);
    }
}

// Perguntando o nome do herói
rl.question('Mestre: Qual é o nome do herói? \nHerói: ', (nome) => {
    // Perguntando o tipo do herói
    rl.question(`Mestre: Qual é a sua classe? (guerreiro, mago, monge, ninja)?  \n${nome}: `, (tipo) => {
        // Converte o tipo para minúsculas ao receber a entrada do usuário
        tipo = tipo.toLowerCase();
        console.log("Mestre: você se encontra no meio de uma floresta a noite... \ncom apenas a iluminação da lua e com o suspiro do vento nos seus ouvidos... \ndos arbustos surge um Urso Coruja que parte pra cima de você!");
        console.log("Mestre: Role iniciativa!");
        console.log("---------------------------------------------------------------------------");

        // Criando a instância do herói com os dados fornecidos
        let heroi = new Heroi(nome, tipo);

        // Simulando o combate
        simularCombate(heroi);

        // Fechando a interface de readline
        rl.close();
    });
});