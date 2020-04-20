// event network-changed script-path=network-changed.js

let WIFINAME = $network.wifi.ssid;
let IPADDRESS = $network.v4.primaryAddress;
let WHITENAME = [
            "home_ssid1",
            "home_ssid2"
    ];

if ($network.v4.primaryInterface == "en0" && $network.wifi.bssid != 'null' && WHITENAME.indexOf(WIFINAME) == -1) {
    if($surge.setOutboundMode('direct'))
      $notification.post("Outbound Changed!", "Network: "+WIFINAME+IPADDRESS, "Outbound Mode, Direct");
} else {
    if($surge.setOutboundMode('rule'));
      if($network.v4.primaryInterface == "pdp_ip0")
        $notification.post("Outbound Changed!", "Network: Cellular"+IPADDRESS, "Outbound Mode, Rule");
      if($network.v4.primaryInterface == "en0")
        $notification.post("Outbound Changed!", "Network: "+WIFINAME+IPADDRESS, "Outbound Mode, Rule");
}
$done();
