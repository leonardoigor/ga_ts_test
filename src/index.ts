import GeneticAlgorithm from "./ga/geneticAlgorithm";

function GetRandomGene() {
    let id = Math.floor(Math.random() * possiblesLetters.length);
    return possiblesLetters[id];
}
function FitnessFunction(index: number) {
    let fitness = 0;
    let genes = ga.Population[index].Genes;
    for (let i = 0; i < genes.length; i++) {
        if (genes[i] == target[i]) {
            fitness++;
        }
    }
    return fitness / target.length;
}
const possiblesLetters = " abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const target = "Hello World is a very common phrase";
const populationSize = 100;
const dnaLength = target.length;

const ga = new GeneticAlgorithm<string>(
    populationSize,
    dnaLength,
    GetRandomGene,
    FitnessFunction,
    5
)
let lastFitness = -Infinity;
while (true) {
    ga.NextGeneration();
    if (lastFitness != ga.BestFitness) {
        lastFitness = ga.BestFitness;
        console.log(`Dna: (${ga.BestGenes.join("")}), Fitness: ${(ga.BestFitness * 100).toFixed(1)}"%" Generation: ${ga.Generation}`);
    }
    if (ga.BestFitness == 1) {
        break;
    }
}