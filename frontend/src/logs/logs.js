import React from 'react';
import './logs.css';
import { Component } from 'react';
import { LOADDATA } from '../constants/actionTypes';
import { connect } from 'react-redux';
import axios from 'axios';


const mapStateToProps = state => ({ ...state.item });


const mapDispatchToProps = dispatch => ({

    onLoad: (data) => {
        dispatch({ type: LOADDATA, payload: data })
    }


});

class Logs extends Component {


    loadData = async (e) => {

        axios.get(
            'http://localhost:3001/'
        ).then((response) => {
            this.props.onLoad(response.data);
            console.log(response.data)

        });
    }


    goToAgentLog = param => e => {
        console.log(param);
        this.props.history.push("/agent-logs/"+ param);
    };

    goToCallLog = param => e => {
        console.log(param);
        this.props.history.push("/call-logs/"+ param);
    };

    
    viewDetails = (id) => {
        console.log(id);
    }

    componentDidMount() {
        this.loadData()
    }


    renderData = () => {
        console.log(this.props)
        if(this.props.items){
            return this.props.items.map((item) => {
                console.log(item)
                const { identifier, number, count, agentName, dateTime, agentIdentifier } = item //destructuring
                return (
                    <tr key={identifier}>
                        <td onClick={this.goToCallLog(number)}>{number}</td>
                        <td>{count}</td>
                        <td onClick={this.goToAgentLog(agentIdentifier)}>{agentName} /
                        <span>{'' + (new Date(dateTime).getHours()) + ':'
                                + (new Date(dateTime).getMinutes())}
                            </span></td>
    
                    </tr>
                )
            })
        }
        
    }

    render() {
        return (
            <div >
                <h1 data-testid="widgets-list">Logs List</h1>
                <table id="widgets" className="widgets" >
                    <thead>
                        <tr>
                            <th>Phone number</th>
                            <th>Number of calls</th>
                            <th>Last call details</th>
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

export default connect(mapStateToProps, mapDispatchToProps)(Logs);