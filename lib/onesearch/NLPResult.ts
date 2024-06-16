export class NLPResult {
    constructor(
        public suggestion: string | null = null,
        public intention: string | null = null,
        public probability: number = 0,
        public confidence: number = 0,
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
