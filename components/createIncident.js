'use strict';
const axios = require('axios');

const axiosClient = axios.create({
  auth: {
    username: 'Oracle_Bot',
    password: '05@c13 b07'
  },
  headers: {
    "Content-Type": "application/json"
  }
});

// mock function to get the ci sys_id
function getCmdbId(cmdb_ci) {
  switch (cmdb_ci.toLowerCase()) {
    case "monitor":
      return "adfadnvnz667f9808703dfadfafee3";  
    case "printer":
      return "pa93nviadfadnvnz667dfad703dfee3";  
    case "mac os":
      return "zvnpq48pavq19jnvvqpp834u4fnvna";  
    default:
      break;
  }
}

module.exports = {
  metadata: () => ({
    name: 'createIncident',
    "properties": {
      "shortDesription": {
        "type": "string",
        "required": true
      },
      "priority": {
        "type": "string",
        "required": true
      },
      "cmdb_ci": {
        "type": "string",
        "required": true
      },
      "caller_id": {
        "type": "string",
        "required": true
      }
    },
    "supportedActions": []
  }),
  invoke: async (conversation, done) => {
    const {
      shortDesription,
      priority,
      cmdb_ci,
      caller_id
    } = conversation.properties();
    const url = 'https://libertydev.service-now.com/api/now/v1/table/incident';
    const body = {
      short_desription: shortDesription,
      priority: priority,
      caller_id: caller_id,
      cmdb_ci: getCmdbId(cmdb_ci)
    };

    try {
      const res = await axiosClient.post(url, body);
      conversation.reply(`Incident created with sys id: ${res.data.result.sys_id}`);
    } catch (error) {
      console.error(error.response.data.error.detail);
      if (error.response.data.error.detail) {
        conversation.reply({
          text: `${error.response.data.error.detail}`
        });
      } else {
        conversation.reply({
          text: `Ooooppsssss error: ${error}`
        });
      }
    };
    conversation.transition();
    done();
  }
};