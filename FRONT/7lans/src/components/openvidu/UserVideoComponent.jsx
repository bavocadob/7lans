import React from 'react';
import OpenViduVideoComponent from './OvVideo';

const UserVideoComponent = ({ streamManager }) => {

    const getNicknameTag = () => 
        // Gets the nickName of the user
         JSON.parse(streamManager.stream.connection.data).clientData


    return (
        <div>
            {streamManager !== undefined ? (
                <div className="streamcomponent"
                     style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
                    <OpenViduVideoComponent streamManager={streamManager} />
                    <div><p>{getNicknameTag()}</p></div>
                </div>
            ) : null}
        </div>
    );
}

export default UserVideoComponent;
