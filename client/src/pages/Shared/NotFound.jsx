import { useNavigate } from 'react-router-dom';
import styles from '../../assets/Styles';

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className='flex flex-col items-center text-center h-screen sm:m-10 m-5 pt-[25vh]'>

      <h1 className="font-opensans font-bold sm:text-[15vh] sm:leading-[15vh] text-[10vh] leading-[10vh] text-primary">Error 404</h1>
      <h1 className="font-opensans font-medium sm:text-[5vh] text-[4vh] text-black mb-5">Page doesn&apos;t exist</h1>
      <div className='flex'>
        <button className={`${styles.paragraph} bg-primary flex items-center justify-center rounded-lg px-5 py-2 hover:bg-secondary
            font-opensans sm:font-medium font-normal text-white`}
          onClick={() => navigate('/')}
        >
          Go Home
        </button>
        <button className={`${styles.paragraph} border-2 rounded-lg border-primary hover:border-secondary text-center px-5 py-2 ml-2 text-primary hover:text-white hover:bg-secondary`}
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>
      </div>

    </div >
  )
}

export default NotFound