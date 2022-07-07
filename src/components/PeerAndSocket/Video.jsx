import React from 'react';
import styled from "styled-components";

const VideoBox = styled.div`
  width: 45%;
  max-height: 558px;
  max-width: 784px;
`

function Video ({videoRef}){
    return (
        <VideoBox>
            <video ref={videoRef} width={'100%'} height={'100%'} autoPlay muted/>
        </VideoBox>
    )
}

export default Video;