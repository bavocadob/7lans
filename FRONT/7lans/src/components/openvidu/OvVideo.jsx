import React, { useEffect, useRef } from 'react';

const OpenViduVideoComponent = props => {
    const videoRef = useRef();

    useEffect(() => {
        if (props.streamManager && videoRef.current) {
            props.streamManager.addVideoElement(videoRef.current);
        }
    }, [props.streamManager]);

    return <video style={{width: '95%', borderRadius: '10px', border:  '4px solid rgb(45,45,45)'}} autoPlay ref={videoRef} />;
}

export default OpenViduVideoComponent;
