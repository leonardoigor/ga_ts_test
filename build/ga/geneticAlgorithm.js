"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var dna_1 = __importDefault(require("./dna"));
var GeneticAlgorithm = /** @class */ (function () {
    function GeneticAlgorithm(populationSize, DnaLength, GetRandomGene, FitnessFunction, Elistism, MutationRate) {
        if (MutationRate === void 0) { MutationRate = 0.01; }
        this.Generation = 1;
        this.Elistism = Elistism;
        this.MutationRate = MutationRate;
        this.Population = new Array(populationSize);
        this.newPopulation = new Array(populationSize);
        this.FinessSum = 0;
        this.DnaLength = DnaLength;
        this.GetRandomGene = GetRandomGene;
        this.FitnessFunction = FitnessFunction;
        this.BestFitness = 0;
        this.BestGenes = new Array(DnaLength);
        this.InitPopulation();
    }
    GeneticAlgorithm.prototype.InitPopulation = function () {
        for (var i = 0; i < this.Population.length; i++) {
            this.Population[i] = new dna_1["default"](this.DnaLength, this.GetRandomGene, this.FitnessFunction);
        }
    };
    GeneticAlgorithm.prototype.NextGeneration = function (numNewDna, crossOverNewDna) {
        if (numNewDna === void 0) { numNewDna = 0; }
        if (crossOverNewDna === void 0) { crossOverNewDna = false; }
        var finalCount = this.Population.length + numNewDna;
        if (finalCount <= 0)
            return;
        if (this.Population.length > 0) {
            this.CalculateFitness();
            this.Population.sort(this.CompareDNA);
        }
        this.newPopulation = new Array(finalCount);
        for (var i = 0; i < this.Population.length; i++) {
            if (i < this.Elistism && i < this.Population.length) {
                this.newPopulation[i] = (this.Population[i]);
            }
            else if (i < this.Population.length || crossOverNewDna) {
                var parent1 = this.ChooseParent();
                var parent2 = this.ChooseParent();
                var child = parent1.CrossOver(parent2);
                child.Mutate(this.MutationRate);
                this.newPopulation[i] = (child);
            }
            else {
                this.newPopulation[i] = (new dna_1["default"](this.DnaLength, this.GetRandomGene, this.FitnessFunction));
            }
        }
        var tmpList = this.Population;
        this.Population = this.newPopulation;
        this.newPopulation = tmpList;
        this.Generation++;
    };
    GeneticAlgorithm.prototype.ChooseParent = function () {
        var randomNumber = Math.floor(Math.random() * this.Population.length);
        for (var i = 0; i < this.Population.length; i++) {
            if (randomNumber < this.Population[i].Fitness) {
                return this.Population[i];
            }
            randomNumber -= this.Population[i].Fitness;
        }
        return this.Population[Math.floor(Math.random() * this.Population.length)];
    };
    GeneticAlgorithm.prototype.CompareDNA = function (a, b) {
        if (a.Fitness > b.Fitness) {
            return -1;
        }
        else if (a.Fitness < b.Fitness) {
            return 1;
        }
        else {
            return 0;
        }
    };
    GeneticAlgorithm.prototype.CalculateFitness = function () {
        this.FinessSum = 0;
        var best = this.Population[0];
        for (var i = 0; i < this.Population.length; i++) {
            this.FinessSum += this.Population[i].CalculateFitness(i);
            if (this.Population[i].Fitness > best.Fitness) {
                best = this.Population[i];
            }
        }
        this.BestFitness = best.Fitness;
        this.BestGenes = __spreadArray([], best.Genes, true);
    };
    GeneticAlgorithm.prototype.toString = function () {
        var response = "Generation: ".concat(this.Generation, ", Best Fitness: ").concat(this.BestFitness, ", Best Genes: ").concat(this.BestGenes);
        return response;
    };
    return GeneticAlgorithm;
}());
exports["default"] = GeneticAlgorithm;
