var pcap=require('pcap');
pcap.createSession("wlp2s0b1", '(type mgt) and (type mgt subtype probe-req )').
        on('packet', function (raw_packet) {
            //console.log(JSON.stringify(pcap.decode.packet(raw_packet)));
                with(pcap.decode.packet(raw_packet).payload.ieee802_11Frame)
                        if (type == 0 && subType == 4)
                                console.log("Probe request",shost, "-> ",bssid);
        }
);
