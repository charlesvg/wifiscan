let pcap = require('pcap');

let interfaceName = 'wlp2s0b1';
let libpcapFilters = '(type mgt) and (type mgt subtype probe-req)';
const MANAGEMENT_FRAME = 0;
const PROBE_REQUEST = 4;

pcap.createSession(interfaceName, libpcapFilters).on('packet', (packet) => {
    let payload = pcap.decode.packet(packet).payload;
    let frame = payload.ieee802_11Frame;

    if (frame.type === MANAGEMENT_FRAME && frame.subType === PROBE_REQUEST) {
        console.log(
            'Source:', frame.shost.addr,
            'Signal:', payload.signalStrength,
            'Distance', calculateDistance(payload.signalStrength, payload.frequency)
        );
    }
});


function calculateDistance(signalLevelInDb, freqInMHz) {
    // http://stackoverflow.com/questions/11217674/how-to-calculate-distance-from-wifi-router-using-signal-strength
    let exp = (27.55 - (20.0 * (Math.log(freqInMHz) / Math.log(10))) + Math.abs(signalLevelInDb)) / 20.0;
    return Math.pow(10.0, exp);
}

