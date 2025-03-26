import React, {useEffect} from 'react';

function LoadingComponent() {
    useEffect(() => {
        return () => {
            console.log("Loading component unmount")
        }
    }, [])

    return (
        <div className="loading_component">
            <div className="loader">
                <div className="loader-outter"></div>
                <div className="loader-inner"></div>
            </div>
        </div>
    );
}

export default LoadingComponent;