import "./App.css";
import { Component } from "react";
import BowlingService from './services/BowlingService';
import { Frame as FrameType } from "./services/types";
import Header from "./components/Header";
import ScoreBoard from "./components/Scoreboard";

interface State {
    frames: FrameType[];
}

interface Props {
}

class App extends Component<Props, State> {

    private bowlingService: BowlingService;

    constructor(props: Props) {
        super(props);
        this.bowlingService = new BowlingService();
        this.state = {
            frames: this.bowlingService.score()
        };
    }

    bowl = (score: number) => {
        this.bowlingService.bowl(score);
        const frames = this.bowlingService.score();
        this.setState({ frames });
    };

    computePins: () => number = () => this.bowlingService.computePins();

    render() {
        return (<div className="App">
            <Header />
            <ScoreBoard frames={this.state.frames} bowl={this.bowl} computePins={this.computePins} />
        </div>);
    }

}

export default App;
