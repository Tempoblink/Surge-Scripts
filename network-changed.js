// event network-changed script-path=network-changed.js

let WIFINAME = $network.wifi.ssid;
let IPADDRESS = $network.v4.primaryAddress;
let WHITENAME = [
            "home_ssid1",
            "home_ssid2"
    ];
let BLACKNAME = [
            "free_ssid1",
            "free_ssid2"
    ];

let OTHERS = 'Rule';
let CELLULAR = 'Rule';

//wifi select outbound
//BLACKNAME select outbound is direct
//WHITENAME select outbound is rule
//others you can change by OTHERS = 'direct' or 'rule' or 'global-proxy'
if ($network.v4.primaryInterface == "en0" && $network.wifi.bssid != 'null') {
    if (BLACKNAME.indexOf(WIFINAME) != -1) {
        if($surge.setOutboundMode('direct'))
            $notification.post("Outbound Changed!", "Network: "+WIFINAME, "Outbound Mode, Direct");
    }
    if (WHITENAME.indexOf(WIFINAME) != -1) {
        if($surge.setOutboundMode('rule'))
            $notification.post("Outbound Changed!", "Network: "+WIFINAME, "Outbound Mode, Rule");
    }
    else {
        if($surge.setOutboundMode(OTHERS.toLowerCase()))
            $notification.post("Outbound Changed!", "Network: "+WIFINAME, "Outbound Mode, "+OTHERS);
    }
}


//cellular select outbound
if($network.v4.primaryInterface == "pdp_ip0") {
    if($surge.setOutboundMode(CELLULAR.toLowerCase()))
        $notification.post("Outbound Changed!", "Network: Cellular, "+IPADDRESS, "Outbound Mode, "+CELLULAR);
}

$done();
