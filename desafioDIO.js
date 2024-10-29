const readline = require('readline');

// Configurando a interface para leitura da entrada do usuário
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Definindo a classe Heroi
class Heroi {
    constructor(nome, tipo) {
        this.nome = nome; // Nome do herói
        this.tipo = tipo.toLowerCase(); // Converte o tipo para minúsculas ao inicializar
    }

    // Método para o herói atacar
    atacar(dano) {
        let ataqueDescricao;
        switch (this.tipo) { // Define a descrição do ataque com base no tipo do herói
            case 'mago':
                ataqueDescricao = `usando magia e causou ${dano} de dano!`;
                break;
            case 'guerreiro':
                ataqueDescricao = `usando uma espada e causou ${dano} de dano!`;
                break;
            case 'monge':
                ataqueDescricao = `usando artes marciais e causou ${dano} de dano!`;
                break;
            case 'ninja':
                ataqueDescricao = `usando shuriken e causou ${dano} de dano!`;
                break;
            default:
                ataqueDescricao = `e causou ${dano} de dano!`;
                break;
        }
        console.log(`${this.nome}: O meu ${this.tipo} atacou ${ataqueDescricao}`);
    }

    // Método para rolar um dado de 20 lados
    rolarDado() {
        return Math.floor(Math.random() * 20) + 1;
    }
}

// Definindo a classe Jogo
class Jogo {
    constructor() {
        // Valor mínimo e máximo de rolagem do dado
        this.minRoll = 1;
        this.maxRoll = 20;
        // Valor mínimo e máximo de dano que o jogador pode causar
        this.minDmg = 8;
        this.maxDmg = 12;
    }

    // Método para iniciar o jogo
    iniciarJogo() {
        console.clear(); // Limpa o terminal
        rl.question('Mestre: Qual é o nome do herói? \nHerói: ', (nome) => {
            rl.question(`Mestre: Qual é a sua classe? (guerreiro, mago, monge, ninja)?  \n${nome}: `, (tipo) => {
                tipo = tipo.toLowerCase();
                console.log("Mestre: você se encontra no meio de uma floresta à noite... \ncom apenas a iluminação da lua e com o suspiro do vento nos seus ouvidos... \ndos arbustos surge um Urso Coruja que parte pra cima de você!");
                console.log("Mestre: Rolem Iniciativa!");

                let heroi = new Heroi(nome, tipo); // Cria uma instância do herói com os dados fornecidos
                this.simularCombate(heroi); // Simula o combate
                rl.close(); // Fecha a interface de readline
            });
        });
    }

    // Método para rolar um dado entre um valor mínimo e máximo
    rolarDado(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // Função para simular o combate
    simularCombate(heroi) {
        const maxTurnos = 7; // Número máximo de turnos
        let turno = 1;
        let ursoCorujaVida = 40; // Vida inicial do Urso Coruja

        while (turno <= maxTurnos) {
            console.log("---------------------------------------------------------------------------");
            console.log(`Turno ${turno}:`);

            let rolagemHeroi = this.rolarDado(this.minRoll, this.maxRoll); // Rola o dado para o herói
            console.log(`Mestre: ${heroi.nome} rolou um dado e tirou: ${rolagemHeroi}`);

            if (rolagemHeroi === 20) { // Vitória automática com rolagem de 20
                console.log(`${heroi.nome} acertou um golpe crítico e venceu automaticamente!`);
                break;
            } else if (rolagemHeroi === 1) { // Derrota automática com rolagem de 1
                console.log(`${heroi.nome} falhou criticamente e foi derrotado instantaneamente!`);
                break;
            } else if (rolagemHeroi > 12) { // Ataque bem-sucedido se a rolagem for maior que 12
                let dano = this.rolarDado(this.minDmg, this.maxDmg); // Dano variável entre 8 e 12
                ursoCorujaVida -= dano;
                console.log(`${heroi.nome}: acertei o ataque!`);
                heroi.atacar(dano);
            } else { // Ataque falhou
                console.log(`Mestre: O Urso Coruja ataca ${heroi.nome} com suas grandes garras!`);
            }

            if (ursoCorujaVida <= 0) { // Condição de vitória
                console.log(`Mestre: ${heroi.nome} desfere o último golpe no Urso Coruja!! \nVocê ganhou 220 de xp para seu personagem!`);
                break;
            }

            turno++; // Incrementa o turno
        }

        if (turno > maxTurnos) { // Condição de derrota se todos os turnos forem usados
            console.log(`Mestre: ${heroi.nome} foi derrotado em combate... \nMais sorte na próxima vez!`);
        }
    }
}

// Iniciar o jogo
let jogo = new Jogo();
jogo.iniciarJogo();