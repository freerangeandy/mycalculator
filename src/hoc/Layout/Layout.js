import React, { Component } from 'react';

import Calculator from '../../containers/Calculator/Calculator';
import SettingsDrawer from '../../containers/Settings/SettingsDrawer';

class Layout extends Component {
    render () {
        return (
            <div>
                <Calculator />
                <SettingsDrawer />
            </div>
        );
    }
}

export default Layout;
