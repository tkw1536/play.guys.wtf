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
            this.setState({unsupported: true});
            return;    
        }

        const gamepads = Array.from(navigator.getGamepads()).filter(e => e !== null);
        this.setState({gamepads});


        // listen to gamepad events
        window.addEventListener("gamepadconnected", this.onAddGamepad);
        window.addEventListener("gamepaddisconnected", this.onRemoveGamepad);
    }

    componentWillUnmount() {
        if(!navigator.getGamepads) return;

        // stop listening to gamepad events
        window.removeEventListener("gamepadconnected", this.onAddGamepad);
        window.removeEventListener("gamepaddisconnected", this.onRemoveGamepad);
    }

    onAddGamepad = ({ gamepad }: GamepadEvent) => {
        this.setState(({ gamepads }: SelectorState) => {
            // if this gamepad was already connected, do nothing. 
            if (gamepads.find(gp => gp.index === gamepad.index) !== undefined) {
                return;
            }

            return { gamepads: [...gamepads, gamepad] };
        });
    }

    onRemoveGamepad = ({ gamepad }: GamepadEvent) => {
        this.setState(({ gamepads }: SelectorState) => {
            // remove this gamepad from the list
            return { gamepads: [...gamepads.filter(gp => gp.index !== gamepad.index)] };
        });
    }

    render() {
        const { gamepads, unsupported } = this.state;
        if (unsupported) return <GamepadAPIUnsupported />;
        
        return <div className={style.wrapper}>{
            gamepads.map(gp => <GamePadView key={gp.index} gamepad={gp} />)
        }
        </div>
    }
}

class GamepadAPIUnsupported extends React.Component {
    render() {
        return <div className={style.wrapper}>
            <h1>Unable to list Gamepads</h1>
            <p className={style.error}>
                Your browser does not seem to support Gamepads. <br />
                Please upgrade to a modern version of Firefox or Chrome. 
            </p>
        </div>;
    }
}