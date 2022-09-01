"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var geneticAlgorithm_1 = __importDefault(require("./ga/geneticAlgorithm"));
function GetRandomGene() {
    var id = Math.floor(Math.random() * possiblesLetters.length);
    return possiblesLetters[id];
}
function FitnessFunction(index) {
    var fitness = 0;
    var genes = ga.Population[index].Genes;
    for (var i = 0; i < genes.length; i++) {
        if (genes[i] == target[i]) {
            fitness++;
        }
    }
    return fitness / target.length;
}
var possiblesLetters = " abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
var target = "Hello World is a very common phrase";
var populationSize = 100;
var dnaLength = target.length;
var ga = new geneticAlgorithm_1["default"](populationSize, dnaLength, GetRandomGene, FitnessFunction, 5);
var lastFitness = -Infinity;
while (true) {
    ga.NextGeneration();
    if (lastFitness != ga.BestFitness) {
        lastFitness = ga.BestFitness;
        console.log("Dna: (".concat(ga.BestGenes.join(""), "), Fitness: ").concat((ga.BestFitness * 100).toFixed(1), "\"%\" Generation: ").concat(ga.Generation));
    }
    if (ga.BestFitness == 1) {
        break;
    }
}
