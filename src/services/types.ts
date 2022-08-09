export interface BowlingServiceArgs {
    maximumPins: number;
};

export enum FrameType {
    Strike = 'strike',
    Spare = 'spare',
    Open = 'open',
};

export interface Frame {
    first?: number | 'X' | '';
    second?: number | 'X' | '/';
    third?: number | 'X' | '';
    cumulative?: number;
    pins?: number;
};