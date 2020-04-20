// event network-changed script-path=network-changed.js
//version: 2.0
//auther: tempoblink

let NETWORK = $network.wifi.ssid;
let IPADDRESS = $network.v4.primaryAddress;
let WHITENAME = [
            "home_ssid1",
            "home_ssid2"
    ];
let BLACKNAME = [
            "free_ssid1",
            "free_ssid2"
    ];

let TAG = false;
let BLACK = 'Direct';
let WHITE = 'Rule';
let OTHERS = 'Rule';
let CELLULAR = 'Rule';

function changeoutbound(TAG, MODE) {
    if (TAG) {
        NETWORK = 'Cellular, '+IPADDRESS;
    }
    if($surge.setOutboundMode(MODE.toLowerCase()))
        $notification.post("Outbound Changed!", "Network: "+NETWORK, "Outbound Mode, "+MODE);
}

//wifi select outbound
//BLACKNAME select outbound is direct
//WHITENAME select outbound is rule
//others you can change by OTHERS = 'direct' or 'rule' or 'global-proxy'
if ($network.v4.primaryInterface == "en0" && $network.wifi.bssid != 'null') {
    if (BLACKNAME.indexOf(NETWORK) != -1) 
        changeoutbound(TAG, BLACK);
    else if (WHITENAME.indexOf(NETWORK) != -1)
        changeoutbound(TAG, WHITE);
    else 
        changeoutbound(TAG, OTHERS);
}


//cellular select outbound
if($network.v4.primaryInterface == "pdp_ip0")
    TAG = true;
    changeoutbound(TAG, CELLULAR);

$done();
