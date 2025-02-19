
export interface ReadlineServiceInterface {
    question(query: string): Promise<string>
    pause(): void
    resume(): void
}