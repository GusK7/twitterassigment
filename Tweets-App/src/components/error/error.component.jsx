import React from 'react';
import { ErrorImageOverlay, ErrorImageContainer, ErrorImageText } from "./error.styles";

const Error = () => {
    return (
        <ErrorImageOverlay>
            <ErrorImageContainer imageUrl='https://i.imgur.com/A040Lxr.png' />
            <ErrorImageText>This Page is Broken</ErrorImageText>
        </ErrorImageOverlay>
    );
};

export default Error;