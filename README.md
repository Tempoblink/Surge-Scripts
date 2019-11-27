### 关于Localhost.js
    仅用于远程托管Surge配置，Web开启Cloudflare
    CDN服务，利用ip直连服务器且不想在远程托管配置中修改Host，避免暴露真实ip。

### 用法
    [Host]
    your_web_url = script:Localhost

    [Script]
    dns Localhost script-path=../Localhost.js

    将Localhost.js放在本地iCloud/Surge中或Dropbox中。



