type Base64<imageType extends string> = `data:image/${imageType};base64${string}`

export type CpuType = {
    name: string;
    brand?: string;
    architecture?: string[];
    image?: Base64<'png' | 'jpg'>;
    revision?: string;
    core?: {
        physical: number;
        thread: number;
    };
    frequency?: {
        base: number;
        turbo: number;
    },
    cache?: number[]
}
