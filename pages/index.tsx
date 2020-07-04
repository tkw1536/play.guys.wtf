import * as React from 'react';
import dynamic from "next/dynamic";

const GamePadSelector = dynamic(() => import("../components/list"), {
    ssr: false,
});


export default class extends React.Component {
    render() {
        return <GamePadSelector />;
    }
}
