import React from "react"
import ReactDOM from 'react-dom'
import {Window} from "../Windows/Window.jsx"
import style from "../stylesheets/programExecutor.scss"

export class ProgramExecutor extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return <Window titleName={this.props.titleName} windowsManager={this.props.windowsManager}>
            <div className="program-executor">
                <div className="toolbar unselectable">
                    <div className="item">
                        <img src="assets/images/exe/run.png" />
                    </div>
                    <div className="item">
                        <img src="assets/images/exe/pause.png" />
                    </div>
                    <div className="item">
                        <img src="assets/images/exe/stop.png" />
                    </div>
                    <div className="item">
                        <img src="assets/images/exe/step-forward.png" />
                    </div>
                </div>
                <table className="main-table">
                    <tbody>
                        <tr>
                            <td>
                                <div class="line">
                                    <div class="gutter">1</div>
                                    <div>ADD 3</div>
                                </div>
                            </td>
                            <td>
                                <div>
                                    <div>a: 3</div>
                                    <div>a: 3</div>
                                    <div>a: 3</div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </Window>
    }

}
