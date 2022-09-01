"use strict";
exports.__esModule = true;
var Dna = /** @class */ (function () {
    function Dna(length, GetRandomGene, FitnessFunction, ShouldInitGenes) {
        if (ShouldInitGenes === void 0) { ShouldInitGenes = true; }
        this.Genes = new Array(length);
        this.GetRandomGene = GetRandomGene;
        this.FitnessFunction = FitnessFunction;
        this.Fitness = 0;
        if (ShouldInitGenes) {
            this.InitGenes();
        }
    }
    Dna.prototype.CalculateFitness = function (i) {
        this.Fitness = this.FitnessFunction(i);
        return this.Fitness;
    };
    Dna.prototype.InitGenes = function () {
        for (var i = 0; i < this.Genes.length; i++) {
            this.Genes[i] = this.GetRandomGene();
        }
    };
    Dna.prototype.CrossOver = function (other) {
        var child = new Dna(this.Genes.length, this.GetRandomGene, this.FitnessFunction, false);
        for (var i = 0; i < this.Genes.length; i++) {
            child.Genes[i] = Math.random() < 0.5 ? this.Genes[i] : other.Genes[i];
        }
        return child;
    };
    Dna.prototype.Mutate = function (mutationRate) {
        for (var i = 0; i < this.Genes.length; i++) {
            if (Math.random() < mutationRate) {
                this.Genes[i] = this.GetRandomGene();
            }
        }
    };
    return Dna;
}());
exports["default"] = Dna;
