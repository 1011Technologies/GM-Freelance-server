import PropTypes from 'prop-types';
import { AiFillEdit, AiOutlineInfoCircle } from 'react-icons/ai';
import styles from '../../assets/Styles';

const FileInput = ({ handleChange, id, name, placeholder, error, acceptedFiles }) => {
    return (
        <div>
            <div className="flex items-center justify-between">
                <div className='flex gap-1 justify-center items-center'>
                    <label htmlFor={id} className={`${styles.paragraph} cursor-pointer`}>{placeholder}</label>
                    <div className="relative group inline-block">
                        <AiOutlineInfoCircle className="text-base sm:text-xl text-primary hover:text-secondary cursor-pointer" />
                        <div className="absolute text-center right-0 mt-3 w-48 max-w-xs bg-light text-black border border-gray rounded-md shadow-lg p-2 z-10 invisible group-hover:visible break-words">
                            Accepted File Types<span className={`${styles.paragraph} block`}>{acceptedFiles}</span>
                        </div>
                    </div>
                </div>
                <div className="relative inline-block">
                    <label className={`cursor-pointer flex items-center justify-center text-white bg-primary hover:bg-secondary p-2 rounded-full ${styles.shadow}`}>
                        <input
                            onChange={handleChange}  // Use the passed handleChange prop here
                            id={id}
                            name={name}
                            type="file"
                            aria-label="Upload"
                            className="hidden"
                            accept={acceptedFiles}
                        />
                        <AiFillEdit className="text-base sm:text-3xl" />
                    </label>
                </div>
            </div>
            {error && <div><p className={`text-red ${styles.paragraph}`}>{error}</p></div>}
        </div>
    );
}

FileInput.propTypes = {
    handleChange: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    error: PropTypes.string,
    acceptedFiles: PropTypes.string,
};

export default FileInput;