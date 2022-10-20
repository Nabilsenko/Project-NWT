type Base64<imageType extends string> = `data:image/${imageType};base64${string}`

export type Cpu = {
    name: string;
    brand?: string;
    architecture?: string[];
    image?: Base64<'png' | 'jpg'>;
    revision?: string;
    core: Core;
    frequency: Frequency,
    cache?: number[]
}

export type Core = {
    physical?: number;
    thread?: number;
};

export type Frequency = {
    base?: number;
    turbo?: number;
};
  
