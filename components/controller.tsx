import * as React from 'react';
import style from './controller.module.css';

const UPDATE_INTERVAL = 100;

export default class GamePadView extends React.Component<{gamepad: Gamepad, timestamp: 0}> {
    private timer: number | null = null;
    componentDidMount() {
        this.timer = window.setInterval(() => this.forceUpdate(), UPDATE_INTERVAL);
    }
    componentWillUnmount() {
        if (this.timer === null) return;
        window.clearInterval(this.timer);
        this.timer = null;
    }

    render() {
        // check that the gamepad is connected
        const { gamepad } = this.props;
        if (!gamepad.connected) return null;

        // render out the buttons
        const { id, buttons, axes, mapping } = gamepad;

        return <div className={style.controller}>
            <h1>{id}</h1>
            <h2>Buttons</h2>
            {buttons.map(({pressed, value}, id) => <GamepadButtonView key={id} pressed={pressed} value={value} /> )}
            <h2>Axes</h2>
            {axes.map((axis, id) => <GamepadAxesView key={id} value={axis} />)}
        </div>;
    }
}

class GamepadButtonView extends React.Component<{pressed: boolean, value: number, timestamp: number}> {
    render() {
        const { pressed, value } = this.props;
        return <p className={`${style.button} ${pressed ? style.active: ""}`}>{value}</p>
    }
}

class GamepadAxesView extends React.Component<{value: number}> {
    render() {
        const {value} = this.props;
        const offset = Math.floor((value + 1) * (100 / 2)) - 0.5;
        return <p>
            <p className={style.axisValue}>
                {value}
            </p>
            <p className={style.axisDisplay}>
                <span className={style.marker} style={{left: `${offset}%`}} />
            </p>
        </p>
    }
}