import Lottie from "lottie-react";
import { loading } from "../../assets/Animations";

const style = {
    height: 300,
    width: 300,
  };
  
  const interactivity = {
    mode: "normal",
  };

const Loader = () => {
    return (
        <div className="fixed h-screen w-screen inset-0 flex justify-center items-center bg-white bg-opacity-25 backdrop-blur-sm z-50">
            <Lottie animationData={loading} autoplay style={style} interactivity={interactivity}/>
        </div>
    )
}

export default Loader
