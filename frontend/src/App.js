import AudioPlayer from './components/AudioPlayer';

const App = () => {
    return (
        <>
        <div className="top__bar">
            <p className='camb-head'>CAMB.AI Player</p>
           <p className='player-upload'>
            Did a revamp for this :-(
            </p> 
        </div>
        <AudioPlayer />
        </>
    );
};

export default App;