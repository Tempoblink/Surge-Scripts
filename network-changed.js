// event network-changed script-path=network-changed.js

let HOME="home_ssid"

if ($network.v4.primaryInterface == 'en0' && $network.wifi.bssid != 'null' && $network.wifi.ssid != HOME) {
    if($surge.setOutboundMode('direct'))
        $notification.post("Outbound Changed!", "Network: $network.wifi.ssid", "Outbound: Direct");
} else {
    if($surge.setOutboundMode('rule')) {
      if($network.v4.primaryInterface == 'pdp_ip0')
        $notification.post("Outbound Changed!", "Network: Cellular", "Outbound: Rule");
      if($network.v4.primaryInterface == "en0")
        $notification.post("Outbound Changed!", "Network:"+$network.wifi.ssid, "Outbound: Rule");
    }
}
$done();
