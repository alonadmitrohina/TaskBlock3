import SongsPage from 'pages/songs';
import React from 'react';

import PageContainer from './components/PageContainer';

const SongsList = (props) => {
    return (
        <PageContainer>
            <SongsPage {...props} />
        </PageContainer>
    );
};

export default SongsList;
