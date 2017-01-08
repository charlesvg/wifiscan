var pcap=require('pcap');
pcap.createSession('wlp2s0b1', '(type mgt) and (type mgt subtype probe-req )').
        on('packet', function (raw_packet) {
            var payload = pcap.decode.packet(raw_packet).payload;
            var frame = payload.ieee802_11Frame;
            if (frame.type == 0 && frame.subType == 4) {
                console.log("Source", frame.shost.addr, "Signal:", payload.signalStrength, "Distance", calculateDistance(payload.signalStrength, payload.frequency));
            }
        }
);


function calculateDistance(signalLevelInDb, freqInMHz) {
        // http://stackoverflow.com/questions/11217674/how-to-calculate-distance-from-wifi-router-using-signal-strength
        var exp = (27.55 - (20.0 * (Math.log(freqInMHz) / Math.log(10))) + Math.abs(signalLevelInDb)) / 20.0;
        return Math.pow(10.0, exp);
}
