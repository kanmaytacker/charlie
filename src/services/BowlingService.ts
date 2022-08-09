import { Frame, FrameType } from "./types";

const MAX_PINS = 10;
const MAX_ROUNDS = 10;

export default class BowlingService {
    private rounds: number[] = [];
    private cursor: number = 0;

    incrementCursor(): void {
        this.cursor++;
    }

    reset(): void {
        this.rounds = [];
        this.cursor = 0;
    }

    bowl(score: number): void {
        this.rounds[this.cursor] = score;
        this.incrementCursor();
    }

    score(): Frame[] {
        let frameScores: Frame[] = [];
        let score = 0;
        let index = 0;

        [...Array(MAX_ROUNDS)].forEach(() => {
            const frameState = this._decideState(index);
            const [updatedIndex, updatedScore, frames] = this._decideHandler(frameState)(index, score, frameScores);
            index = updatedIndex;
            score = updatedScore;
            frameScores = frames;
        });
        return frameScores;
    }

    _decideState(index: number): FrameType {
        if (this._isStrike(index)) {
            return FrameType.Strike;
        }

        if (this._isSpare(index)) {
            return FrameType.Spare;
        }

        return FrameType.Open;
    }

    _first(index: number): number { return this.rounds[index]; }
    _second(index: number): number { return this.rounds[index + 1]; }
    _third(index: number): number { return this.rounds[index + 2]; }
    _isStrike(index: number): boolean { return this._first(index) === MAX_PINS; }
    _isSpare(index: number): boolean { return this._first(index) + this._second(index) === MAX_PINS; }

    _decideHandler(frameState: FrameType): (index: number, pins: number, frames: Frame[]) => [number, number, Frame[]] {
        switch (frameState) {
            case FrameType.Strike:
                return (index, score, frames) => {
                    const currentScore = score + MAX_PINS + this._second(index) + this._third(index);
                    const scores = this._flush({ index, frames, first: '', second: 'X', cumulative: currentScore, pins: MAX_PINS });
                    const updatedIndex = index + 1;
                    return [updatedIndex, currentScore, scores];
                }
            case FrameType.Spare:
                return (index, score, frames) => {
                    const currentScore = score + MAX_PINS + this._third(index);
                    const scores = this._flush({ index, frames, first: this._first(index), second: '/', cumulative: currentScore, pins: MAX_PINS });
                    const updatedIndex = index + 2;
                    return [updatedIndex, currentScore, scores];
                }
            case FrameType.Open:
                return (index, score, frames) => {
                    const currentScore = score + this._first(index) + this._second(index);
                    const pins = this._second(index) !== undefined ? MAX_PINS : MAX_PINS - this._first(index);
                    const scores = this._flush({ index, frames, first: this._first(index), second: this._second(index), cumulative: currentScore, pins });
                    const updatedIndex = index + 2;
                    return [updatedIndex, currentScore, scores];
                }
        }
    }

    _flush({ index, frames, first, second, cumulative, pins }: { index: number, frames: Frame[], first: number | '', second: number | 'X' | '/', cumulative: number, pins: number }): Frame[] {
        if (frames.length === 10) {
            const firstScore = this._first(index) === MAX_PINS ? 'X' : this._first(index);
            const secondScore = this._second(index) === MAX_PINS ? 'X' : this._first(index) + this._second(index) === MAX_PINS ? '/' : this._second(index);
            const thirdScore = this._third(index) === MAX_PINS ? 'X' : (this._first(index) === MAX_PINS || this._first(index) + this._second(index) === MAX_PINS) ? this._third(index) : '';
            const updatedFrame: Frame = {
                first: firstScore,
                second: secondScore,
                third: thirdScore,
                cumulative,
                pins
            };

            return [...frames, updatedFrame];
        }

        const updatedFrame: Frame = {
            first,
            second,
            cumulative,
            pins
        }
        return [...frames, updatedFrame];
    }

    computePins(): number {
        let pins = 10;
        this.score().forEach(frame => {
            if (frame.pins && frame.pins !== null && !isNaN(frame.pins)) {
                pins = frame.pins;
            }
        });
        return pins;
    }
}