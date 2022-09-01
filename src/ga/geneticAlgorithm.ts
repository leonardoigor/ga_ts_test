import Dna from "./dna";

class GeneticAlgorithm<T>{
    Population: Dna<T>[];
    Generation: number;
    BestFitness: number;
    BestGenes: T[];
    Elistism: number;
    MutationRate: number;
    newPopulation: Dna<T>[];
    FinessSum: number;
    DnaLength: number;
    GetRandomGene: () => T;
    FitnessFunction: (index: number) => number;


    constructor(populationSize: number, DnaLength: number, GetRandomGene: () => T, FitnessFunction: (index: number) => number,
        Elistism: number, MutationRate: number = 0.01) {
        this.Generation = 0;
        this.Elistism = Elistism;
        this.MutationRate = MutationRate;
        this.Population = new Array<Dna<T>>(populationSize);
        this.newPopulation = new Array<Dna<T>>(populationSize);
        this.FinessSum = 0;
        this.DnaLength = DnaLength;
        this.GetRandomGene = GetRandomGene;
        this.FitnessFunction = FitnessFunction;
        this.BestFitness = 0;
        this.BestGenes = new Array<T>(DnaLength);
        this.InitPopulation();
    }
    InitPopulation() {
        for (let i = 0; i < this.Population.length; i++) {
            this.Population[i] = new Dna<T>(this.DnaLength, this.GetRandomGene, this.FitnessFunction);
        }
    }
    NextGeneration(numNewDna: number = 0, crossOverNewDna = false) {
        let finalCount = this.Population.length + numNewDna;
        if (finalCount <= 0) return

        if (this.Population.length > 0) {
            this.CalculateFitness();
            this.Population.sort(this.CompareDNA);
        }
        this.newPopulation = new Array<Dna<T>>(finalCount);
        for (let i = 0; i < this.Population.length; i++) {
            if (i < this.Elistism && i < this.Population.length) {
                this.newPopulation[i] = (this.Population[i])
            }
            else if (i < this.Population.length || crossOverNewDna) {
                let parent1: Dna<T> = this.ChooseParent();
                let parent2: Dna<T> = this.ChooseParent();
                let child = parent1.CrossOver(parent2);
                child.Mutate(this.MutationRate);
                this.newPopulation[i] = (child);
            } else {
                this.newPopulation[i] = (new Dna<T>(this.DnaLength, this.GetRandomGene, this.FitnessFunction));
            }
        }
        let tmpList = this.Population
        this.Population = this.newPopulation;
        this.newPopulation = tmpList
        this.Generation++;
    }
    ChooseParent(): Dna<T> {
        let randomNumber = Math.floor(Math.random() * this.Population.length);

        for (let i = 0; i < this.Population.length; i++) {

            if (randomNumber < this.Population[i].Fitness) {
                return this.Population[i];
            }
            randomNumber -= this.Population[i].Fitness;
        }
        return this.Population[Math.floor(Math.random() * this.Population.length)];
    }


    CompareDNA(a: Dna<T>, b: Dna<T>): number {
        if (a.Fitness > b.Fitness) {
            return -1;
        }
        else if (a.Fitness < b.Fitness) {
            return 1;
        }
        else {
            return 0;
        }
    }

    CalculateFitness() {
        this.FinessSum = 0;
        let best = this.Population[0];
        for (let i = 0; i < this.Population.length; i++) {

            this.FinessSum += this.Population[i].CalculateFitness(i);
            if (this.Population[i].Fitness > best.Fitness) {
                best = this.Population[i];
            }
        }
        this.BestFitness = best.Fitness;
        this.BestGenes = [...best.Genes];
    }

    toString(): string {
        let response = `Generation: ${this.Generation}, Best Fitness: ${this.BestFitness}, Best Genes: ${this.BestGenes}`;

        return response;
    }
}



export default GeneticAlgorithm;