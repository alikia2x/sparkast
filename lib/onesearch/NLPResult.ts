export class NLPResult {
    constructor(
        public suggestion: string | null,
        public intention: string | null,
        public probability: number,
        public confidence: number,
        public relevanceBase: number = 2000,
        public confidenceWeight: number = 0.2,
        public type: string = "text",
        public prompt?: string | React.ReactElement
    ) {
    }

    get relevance(): number {
        return this.relevanceBase * this.probability + this.confidence * this.relevanceBase * this.confidenceWeight;
    }
}
