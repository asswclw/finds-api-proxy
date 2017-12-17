/**
 * Created by chenliwei on 17/12/17.
 */

const signUtil = require('finds-signature'),
    axios = require('axios'),
    qs = require('querystring');

/**
 * proxy for 'GET'
 * @author asswclw
 * @date 2017/12/17
 * @param { String } apiName, finds api name
 * @param { Object } params, the params needed for the api
 * @param { timestamp } timestamp, current timestamp
 * @param { String } sis
 * @param { String } sik
 * @returns {*}
 */
exports.get = function ({ apiName, params, timestamp, sis, sik }) {
    // sign
    const signValue = signUtil.sign({ apiName, params, timestamp, sis, sik });
    const signParamData = qs.stringify(params);

    const path = `/rest/${apiName}/sik/${sik}?_sign=${signValue}&${signParamData}`;
    const url = `http://openapi.qxwz.com:80${path}`;
    const options = {
        headers: {
            "wz-acs-method": "HMAC-SHA256",
            "wz-acs-timestamp": timestamp,
        },
        timeout: 300,
    };

    return axios.get(url, options);
};

/**
 * proxy for 'POST'
 * @author asswclw
 * @date 2017/12/17
 * @param { String } apiName, finds api name
 * @param { Object } params, the params needed for the api
 * @param { timestamp } timestamp, current timestamp
 * @param { String } sis
 * @param { String } sik
 * @returns {*}
 */
exports.post = function ({ apiName, params, timestamp, sis, sik }) {
    // sign
    const signValue = signUtil.sign({ apiName, params, timestamp, sis, sik });
    const signParamData = qs.stringify(params);
    const path = `/rest/${apiName}/sik/${sik}?_sign=${signValue}`;
    const url = `http://openapi.qxwz.com:80${path}`;
    const options = {
        headers: {
            "wz-acs-method": "HMAC-SHA256",
            "wz-acs-timestamp": timestamp,
        },
        timeout: 300,
    };

    return axios.post(url, signParamData, options);
};

