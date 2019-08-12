import React, { Component } from 'react';

import Entry from '../../components/Entry/Entry';
import Display from '../../components/Display/Display';
import Keypane from '../../components/Keypane/Keypane';

class Calculator extends Component {
    state = {
        entry: "",
        display: "display: "
    }


    onEntryChanged = (event) => {
        const updatedState = {
            ...this.state,
            entry: event.target.value
        }

        this.setState(updatedState);
    }

    onEnterClick = (event) => {
        const updatedState = {
            ...this.state
        }
        const currentEntry = this.state.entry;
        const squaredEntry = currentEntry * currentEntry; //testing a calculation
        updatedState.display = "squared: " + squaredEntry;
        this.setState(updatedState);
    }

    render () {
        return (
            <div>
                <Display displayOutput={this.state.display} />
                <Entry
                    entryChanged={this.onEntryChanged}
                    enterPressed={this.onEnterClick}
                    entryVal={this.state.entry} />
                <Keypane  />
            </div>
        );
    }
}

export default Calculator;
