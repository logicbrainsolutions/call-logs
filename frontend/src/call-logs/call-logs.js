import React from 'react';
import './call-logs.css';// Import css
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

class CallLogs extends Component {


    loadData = async (number) => {
        if (number) {
            axios.get(
                'http://localhost:3000/call/' + number
            ).then((response) => {
                this.props.onLoad(response.data);
                console.log(response.data)

            });
        }

    }


    goToAgentLog = param => e => {
        // param is the argument you passed to the function
        // e is the event object that returned
        console.log(param)
    };


    componentDidMount() {
        const { match: { params } } = this.props;
        console.log('Params: ', params.id)
        this.loadData(params.id)
    }


    renderData = () => {
        console.log(this.props)
        return this.props.items.map((item) => {
            console.log(item)
            const { identifier, agentName, dateTime, resolution } = item //destructuring
            return (
                <tr key={identifier}>
                    <td>{agentName}</td>
                    <td>{moment(dateTime).format('DD/M/yyyy hh:mm:ss')}</td>
                    <td>{resolution}</td>
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
                            <th>Agent Name</th>
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

export default connect(mapStateToProps, mapDispatchToProps)(CallLogs);