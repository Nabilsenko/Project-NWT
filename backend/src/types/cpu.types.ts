export type Core = {
    physical: number;
    thread: number;
};

export type Frequency = {
    base: number;
    turbo?: number;
};

export type Cpu = {
    name: string;
    brand?: string;
    architecture?: string[];
    image?: string;
    core: Core;
    frequency: Frequency;
    cache: number[]
}
