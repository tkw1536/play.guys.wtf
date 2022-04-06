import * as React from 'react';
import GamePadView from './controller';
import style from './list.module.css';

interface SelectorState {
    unsupported: boolean,
    gamepads: Gamepad[]
}

/**
 * List maintains a list of Gamepads
 */
export default class List extends React.Component<{}, SelectorState> {
    state: SelectorState = {
        unsupported: false,
        gamepads: []
    };

    componentDidMount() {
        if (!navigator.getGamepads) {
            this.setState({ unsupported: true });
            return;
        }

        this.updateGamepads();

        // listen to gamepad events
        window.addEventListener("gamepadconnected", this.updateGamepads);
        window.addEventListener("gamepaddisconnected", this.updateGamepads);
    }

    private readonly updateGamepads = () => {
        const gamepads = Array.from(navigator.getGamepads()).filter(e => e !== null);
        this.setState({ gamepads });
    }

    componentWillUnmount() {
        if (!navigator.getGamepads) return;

        // stop listening to gamepad events
        window.removeEventListener("gamepadconnected", this.updateGamepads);
        window.removeEventListener("gamepaddisconnected", this.updateGamepads);
    }
    
    render() {
        const { gamepads, unsupported } = this.state;
        if (unsupported) return <GamepadAPIUnsupported />;

        if (gamepads.length === 0) return <GamepadAPIEmpty />;

        return <div className={style.wrapper}>{
            gamepads.map(gp => <GamePadView key={gp.index} gamepad={gp} />)
        }
        </div>
    }
}

function GamepadAPIEmpty() {
    return <div className={style.wrapper}>
        <h1>No Gamepad detected</h1>
        <p className={style.info}>
            This page allows you to inspect all your Gamepads compatible with the <a href="https://developer.mozilla.org/en-US/docs/Web/API/Gamepad_API" rel="noopener noreferer" target="_blank">Gamepad API</a>.
            Connect a gamepad to your machine to get started.
        </p>
        <p className={style.info}>
            If your controller does not show up, try pushing one of the buttons.
        </p>
    </div>;
}

function GamepadAPIUnsupported() {
    return <div className={style.wrapper}>
        <h1>Unable to list Gamepads</h1>
        <p className={style.error}>
            Your browser does not seem to support Gamepads. <br />
            Please upgrade to a modern version of Firefox or Chrome.
        </p>
    </div>;
}