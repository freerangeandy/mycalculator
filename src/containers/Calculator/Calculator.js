import React, { Component } from 'react';

import Entry from '../../components/Entry/Entry';
import Display from '../../components/Display/Display';
import Keyboard from '../../components/Keyboard/Keyboard';

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
                <Entry
                    entryChanged={this.onEntryChanged}
                    entryVal={this.state.entry} />
                <Display displayOutput={this.state.display} />
                <Keyboard entered={this.onEnterClick} />
            </div>
        );
    }
}

export default Calculator;
