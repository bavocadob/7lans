import React, { useEffect, useRef } from 'react';

const OpenViduVideoComponent = props => {
    const videoRef = useRef();

    useEffect(() => {
        if (props.streamManager && videoRef.current) {
            props.streamManager.addVideoElement(videoRef.current);
        }
    }, [props.streamManager]);

    return <video style={{width: '85%'}} autoPlay ref={videoRef} />;
}

export default OpenViduVideoComponent;
