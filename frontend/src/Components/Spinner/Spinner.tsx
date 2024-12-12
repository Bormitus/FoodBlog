import React from 'react'
import { ClipLoader } from 'react-spinners';
import "./Spinner.css"

type Props = {
    isLoading?: boolean;
};

const Spinner = (props:Props) => {
  return (
    <>
        <div id="loading-spinner">
            <ClipLoader
                color="#36d7b7"
                loading={props.isLoading}    
                size={35}
                aria-label="Loading Spinner"
                data-testid="loader"/>
        </div>
    </>
  )
}

export default Spinner
