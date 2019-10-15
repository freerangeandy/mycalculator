import React from 'react';

import Calculator from '../../containers/Calculator/Calculator';
import SettingsDrawer from '../../containers/Settings/SettingsDrawer';

export function Layout (props) {
    return (
        <div>
            <Calculator />
            <SettingsDrawer />
        </div>
    );
}

export default Layout;
