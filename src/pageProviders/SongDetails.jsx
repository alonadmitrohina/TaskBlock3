import SongPage from 'pages/songDetails';
import React from 'react';

import PageContainer from './components/PageContainer';

const SongsList = (props) => {
    return (
        <PageContainer>
            <SongPage {...props} />
        </PageContainer>
    );
};

export default SongsList;
