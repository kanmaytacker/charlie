import Pins from "./Pins";
import Frame from "./Frame";
import { Frame as FrameType } from "../services/types";
import "./Scoreboard.css";

const ScoreBoard = ({ frames, bowl, computePins }: { frames: FrameType[], bowl: (score: number) => void, computePins: () => number }) => {
    return (
        <div>
            <div className="board">
                {[...Array(10)].map((_, index) => (
                    <Frame
                        key={index}
                        index={index + 1}
                        first={frames[index].first!}
                        second={frames[index].second!}
                        third={frames[index].third!}
                        cumulative={frames[index].cumulative!}
                    />
                ))}
            </div>
            <h3>Click on number of pins knocked down</h3>
            <Pins handleBowlClick={bowl} pins={computePins()} />
        </div>
    );
}

export default ScoreBoard;