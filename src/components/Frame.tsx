import "./Frame.css";

const F = ({ index, first, second, third, cumulative }: {
    index: number,
    first: number | 'X' | '',
    second: number | 'X' | '/',
    third: number | 'X' | '',
    cumulative: number
}) => (
    <div className="frame-container">
        <div className="index">{index}</div>
        <div className="score">
            <div className="round first">{first}</div>
            <div className="round second">{second}</div>
            <div className="round third">{third}</div>
        </div>
        <div className="cumulative">{!isNaN(cumulative) && cumulative}</div>
    </div>
);

export default F;