import AudioPlayer from './components/AudioPlayer';

const App = () => {
    return (
        <>
        <div className="top__bar">
            <p className='camb-head'>CAMB.AI Player</p>
           <p className='player-upload'>
            Please upload audio file you can do multiple uploads :-)
            </p> 
        </div>
        <AudioPlayer />
        </>
    );
};

export default App;