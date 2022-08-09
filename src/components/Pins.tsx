import './Pins.css';

const Pins = ({ pins, handleBowlClick }: { pins: number, handleBowlClick: (score: number) => void }) => {
    return (
        <div className="pins">
            {[...Array(pins + 1)].map((_, count) => (
                <button key={count} className="pin" onClick={() => handleBowlClick(count)}>
                    {count}
                </button>
            ))}
        </div>
    );
}

export default Pins;