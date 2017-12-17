# finds-api-proxy
a proxy for  FindS api , unofficial

## Installing

Using npm:

```bash
$npm install finds-api-proxy
```

## Features

- Sign with the api params for FindS
- support multi http METHOD, such as get, post...

## API

##### get ({ apiName, params, timestamp, sis, sik })

```js
// get proxy demo
    const findsAPIProxy = require('finds-api-proxy');

    const signTimestamp = new Date().getTime();
    const eid = 'sn8602B8191750022077';
    const queryParams = {
        entityNames: `["${eid}"]`,
        bizType: 'general',
        activeTime: '360000',
        fields: `["lon","lat","gtm","altitude"]`,
    };

    return findsAPIProxy.get({
        apiName: 'gpsp.point.locate',
        params: queryParams,
        timestamp: signTimestamp,
        sis: `${您账户对应的sis}`,
        sik: `${您账户对应的sik}`,
    }).then(response => {
       console.log('response from get point', response);
    });
```

##### post ({ apiName, params, timestamp, sis, sik })

```js
// post proxy demo
    const findsAPIProxy = require('finds-api-proxy');

    const signTimestamp = new Date().getTime();
    let pointsInfo =`{"lon":123.456789,"lat":34.56789,"gnssTime":${signTimestamp},"altitude":300}`;

    const queryParams = {
        entityName: 'sn898602B8191750022077',
        point: pointsInfo,
    };

    return findsAPIProxy.post({
        apiName: 'gpsp.point.addTrackPoint',
        params: queryParams,
        timestamp: signTimestamp,
        sis: `${您账户的sis}`,
        sik: `${您账户的sik}`,
    }).then(response => {
         console.log('response from add point', response);
    });
```

## License

GPL-3.0