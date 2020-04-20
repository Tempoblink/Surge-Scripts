// event network-changed script-path=network-changed.js
//version: 2.1
//auther: tempoblink

let NETWORK = $network.wifi.ssid;
let WHITENAME = [
            "home_ssid1",
            "home_ssid2"
    ];
let BLACKNAME = [
            "free_ssid1",
            "free_ssid2"
    ];

let TAG = false;

//The default outbound, you can change it : 'Direct' or 'Rule' or 'Global-proxy'
//BLACK|WHITE|OTHERS is to control the WIFI outbound mode, CELLULAR is to control the 2G/3G/4G outbound mode 
//For example:
//BLACKNAME use BLACK select outbound is direct
//WHITENAME use WHITE select outbound is rule
let BLACK = 'Direct';
let WHITE = 'Rule';
let OTHERS = 'Rule';
let CELLULAR = 'Rule';

function changeOutboundMode(is_cellular, MODE) {
    if (is_cellular) {
        NETWORK = 'Cellular, '+$network.v4.primaryAddress;
    }else {
        NETWORK = 'Wi-Fi, '+NETWORK;
    }
    if($surge.setOutboundMode(MODE.toLowerCase()))
        $notification.post("Outbound Changed!", "Network: "+NETWORK, "Outbound Mode, "+MODE);
    $done();
}

//wifi select outbound
if ($network.v4.primaryInterface == "en0" && $network.wifi.bssid != 'null') {
    if (BLACKNAME.indexOf(NETWORK) != -1) {
        changeOutboundMode(TAG, BLACK);
    } else if (WHITENAME.indexOf(NETWORK) != -1) {
        changeOutboundMode(TAG, WHITE);
    } else {
        changeOutboundMode(TAG, OTHERS);
    }
}


//cellular select outbound
if($network.v4.primaryInterface == "pdp_ip0") {
    TAG = true;
    changeOutboundMode(TAG, CELLULAR);
}
