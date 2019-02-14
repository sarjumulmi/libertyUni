## createIncident Custom Component:

This custom component is used to create an incident ticket in ServiceNow API. 
The following parameters are passed by the bot:
1. shortDescription:
  A short description of the incident to be created. Type: String. Required: true.
2. priority: 
  Priority to be assigned to the incident from values 1 (Critical) ~ 5 (Planning). Type: String. Required: true.
3. caller_id: 
  Email of the user is used as the caller_id. Type: String. Required: true.
4. cmdb_ci:
  User is asked to select from Monitor, Printer or Mac OS. The selection is then mapped to a mock Configuration Item sys_id. 


## Testing

```shell
npm install
npm start
# or run with additional options
npm run bots-node-sdk -- service .
# or run with debugger
node --inspect $(npm bin)/bots-node-sdk service .
```

With custom component services running, test endpoints like so:

```shell
# get component metadata
curl -X GET localhost:3000/components

# invoke custom component
curl -H "Content-Type: application/json" -d @./spec/test.req.json localhost:3000/components/createIncident
```

## Deployment

As this package is designed to be installed and run with a corresponding service
wrapper, run `npm pack` and upload the resulting `.tgz` as a package for
the _Embedded Container_ service.

```shell
npm pack
# or validate and package with the @oracle/bots-node-sdk command line
npm run bots-node-sdk -- pack .
```