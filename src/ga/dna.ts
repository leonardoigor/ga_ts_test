class Dna<T> {
    Genes: T[];
    Fitness: number;
    GetRandomGene: () => T
    FitnessFunction: (index: number) => number


    constructor(length: number, GetRandomGene: () => T, FitnessFunction: (index: number) => number
        , ShouldInitGenes = true) {
        this.Genes = new Array<T>(length);
        this.GetRandomGene = GetRandomGene;
        this.FitnessFunction = FitnessFunction;
        this.Fitness = 0;

        if (ShouldInitGenes) {
            this.InitGenes();
        }
    }
    CalculateFitness(i: number) {
        this.Fitness = this.FitnessFunction(i);
        return this.Fitness;
    }
    InitGenes() {
        for (let i = 0; i < this.Genes.length; i++) {
            this.Genes[i] = this.GetRandomGene();
        }
    }

    CrossOver(other: Dna<T>): Dna<T> {
        let child = new Dna<T>(this.Genes.length, this.GetRandomGene, this.FitnessFunction, false);
        for (let i = 0; i < this.Genes.length; i++) {
            if (Math.random() < 0.5) {
                child.Genes[i] = this.Genes[i];
            } else {
                child.Genes[i] = other.Genes[i];
            }
        }
        return child;
    }

    Mutate(mutationRate: number) {
        for (let i = 0; i < this.Genes.length; i++) {
            if (Math.random() < mutationRate) {
                this.Genes[i] = this.GetRandomGene();
            }
        }
    }
}

export default Dna;