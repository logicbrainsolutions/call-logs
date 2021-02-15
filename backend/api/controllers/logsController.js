const mongoose = require('mongoose');
const agentsData = require('../../json-data/agents.json')
const logsData = require('../../json-data/logs.json')
const resolutionData = require('../../json-data/resolution.json')


// Best Practice: This contains logic to get all logs from json file
exports.getAllLogs = (req, res, next) => {
    const response = [];
    logsData.map(log => {
        const agent = agentsData.find(agent => agent.identifier === log.agentIdentifier)
        const sameNumberCalls = logsData.filter(item => item.number === log.number)
       
        if (agent) {
            response.push({
                ...log,
                count: sameNumberCalls === undefined ? 0 : sameNumberCalls.length,
                agentName: agent.firstName + " " + agent.lastName
            });
        }
        // response.push(log)
    });
    response.sort((a, b) => new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime());
    const resultArr = response.reduce((acc, item) => {
        if (!acc.find(accItem => accItem.number === item.number)) {
            acc.push(item);
        }
        return acc;
    }, [])
    res.status(200).json(resultArr);
}
// Best Practice: This contains logic to get all agent logs from json file
exports.getAgentLogs = (req, res, next) => {
    console.log('GET AGENT LOGS')
    const agentLogs = logsData.filter(element => element.agentIdentifier === req.params.ID);
    const response = [];
    agentLogs.map(log => {
        const logsResolution = resolutionData.find(resolution => resolution.identifier === log.identifier)
        console.log(logsResolution)
        if (logsResolution) {
            log.resolution = logsResolution.resolution;
            console.log('log: ', log)
        }
        response.push(log)
    });

    res.status(200).json(response);
}

// Best Practice: This contains logic to get all logs of a number from json file
exports.getNumberLogs = (req, res, next) => {
    console.log('GET Number LOGS')
    const numberLogs = logsData.filter(element => element.number === req.params.number);
    const response = [];
    numberLogs.map(log => {
        const agent = agentsData.find(agent => agent.identifier === log.agentIdentifier)
        const logsResolution = resolutionData.find(resolution => resolution.identifier === log.identifier)
      

        logsResolution ? log.resolution = logsResolution.resolution : "";
        agent ? log.agentName = agent.firstName + " " + agent.lastName : "";

        response.push(log)
    });

    res.status(200).json(response);
}

