import React from 'react';
import './agent-logs.css';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { Component } from 'react';
import { LOADDATA } from '../constants/actionTypes';
import { connect } from 'react-redux';
import axios from 'axios';
import moment from 'moment'


const mapStateToProps = state => ({ ...state.item });


const mapDispatchToProps = dispatch => ({

    onLoad: (data) => {
        dispatch({ type: LOADDATA, payload: data })
    }


});

class AgentLogs extends Component {


    loadData = async (agentId) => {
        if (agentId) {
            axios.get(
                'http://localhost:3001/agent/' + agentId
            ).then((response) => {
                this.props.onLoad(response.data);


            });
        }

    }


    componentDidMount() {
        const { match: { params } } = this.props;

        console.log('Params: ', params.id)
        this.loadData(params.id)
    }


    renderData = () => {
        return this.props.items.map((item) => {
            const { identifier, number, dateTime, resolution } = item //destructuring
            return (
                <tr key={identifier}>
                    <td>{number}</td>
                    <td>{moment(dateTime).format('DD/M/yyyy hh:mm:ss')}</td>
                    <td>{resolution} </td>

                </tr>
            )
        })
    }

    render() {
        return (
            <div >
                <h1 data-testid="widgets-list">Logs List</h1>
                <table id="widgets" className="widgets" >
                    <thead>
                        <tr>
                            <th>Phone number</th>
                            <th>Call date and time</th>
                            <th>Resolution</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderData()}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AgentLogs);