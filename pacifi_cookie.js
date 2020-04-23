// event network-changed script-path=Scripts/pacifi_cookie.js
const COOKIENAME = '🌩Pacificrack'
const SUBTITLE = 'Cookie write OK!👌'
const ABOUT = 'Start time: '
const COOKIEKEY = 'PACIFI_COOKIE'
//cookie 相对固定值（一般失效时间为1个月，可通过chrome查到cookie失效期）
const VALUE_DB = 'value1=xxxxxxxxxxxxxxxxxxxxxxx;\nvalue2='
//模拟登陆 post发送的用户名密码等，可通过surge抓登陆包获取request里的body填入 token后的值
const USERDATA = 'value1=key1&value2=key2&value3=key3&value4=key4'
//管理页面 vps的名称设置
const VPSNAME = 'VPS'
function makeCookie(UUID) {
    if (UUID) {
        const COOKIEVALUE = `${VALUE_DB}${UUID}`
        let cookie = $persistentStore.write(COOKIEVALUE, COOKIEKEY)
        if (COOKIEVALUE.indexOf(UUID)) {
            console.log(`${COOKIENAME}, ${SUBTITLE}`)
        }else {
            console.log('Error write!!!!')
        }
    }
}

function getCookie(TOKEN) {
    let DATA = {
        url: `https://pacificrack.com/portal/dologin.php`
    }
    DATA.headers = {}
    DATA.headers['Content-Type'] = `application/x-www-form-urlencoded`
    DATA.body = `{token=${TOKEN}${USERDATA}}`
    $httpClient.post(DATA, (error, response, data) => {
        let TEMP = response.headers['Set-Cookie']
        if (TEMP != null) {
            //VALUE_DB.value2 为寻找cookie返回的value， 一般可通过surge 抓登陆包从response的Set-Cookie里得到
            let USERKEYID = TEMP.match(/${VALUE_DB.value2}=(.*?). path/)[1]
            makeCookie(USERKEYID)
        }else {
            console.log(`Already for ${COOKIENAME}`)
        }
    }) 
}

function getToken() {
    let TOKEN
    let postDATA = {
        url: `https://pacificrack.com/portal/clientarea.php`
    }
    $httpClient.get(postDATA, (error, response, data) => {
        if (data.indexOf(VPSNAME) >= 0) {
            let TEMP = response.headers['Set-Cookie']
            if (TEMP != null) {
                //同上述cookie返回的value一样
                let USERKEYID = TEMP.match(/${VALUE_DB.value2}=(.*?). path/)[1]
                makeCookie(USERKEYID)
            }else {
                console.log(`Already for ${COOKIENAME}`)
            }
        }else {
            TOKEN = data.match(/name=\"token\".value=\"(.*?)\".\/>/)[1]
            getCookie(TOKEN)
        }
    })
}

getToken()
$done({})
