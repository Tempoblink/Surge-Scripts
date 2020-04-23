//event network-changed script-path=Scripts/pacifi_checkin.js
const COOKIENAME = '🌩Pacificrack'
const COOKIEKEY = 'PACIFI_COOKIE'
const COOKIEVALUE = $persistentStore.read(COOKIEKEY)
const SUBTITLE = 'Status: '
const ABOUT = 'Process: '
//自行填写服务器的完整url
const VPSURL = `https://pacificrack.com/portal/modules/servers/solusvmpro/get_client_data.php?vserverid=`
let PROCESS = ''

function Process(code) {
    let i
    for (i = 0; i < code; i++) {
        PROCESS += '⏩'
    }
    for(i = code;  i < 10; i++) {
        PROCESS += '⏸'
    }
}
 
function Status() {
    let DATA = {
        url: VPSURL
    }
    DATA.headers = {
        Cookie: COOKIEVALUE
    }
    DATA.headers['Accept-Language'] = `en-us`
    DATA.headers['User-Agent'] = `Mozilla/5.0 (iPhone; CPU iPhone OS 13_4_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1 Mobile/15E148 Safari/604.1`
    $httpClient.get(DATA, (error, response, data) => {
        if (data.indexOf("displaymemorybar") >= 0) {
            let INFO = JSON.parse(data)
            let USED = parseFloat(INFO.bandwidthused)
            let FREE = parseFloat(INFO.bandwidthfree)
            Process(Math.round(USED/(FREE+USED)*10))
            $notification.post(COOKIENAME, `Used: ${USED}GB, Free: ${FREE}GB`, ABOUT+PROCESS)
        }else {
            console.log(`Request error!!!`)
        }
    })
}

if (COOKIEVALUE == null)
    $notification.post(COOKIENAME, SUBTITLE+'No Cookie!😂', ABOUT+$script.startTime.toDateString())
else
    Status({})
$done({})
