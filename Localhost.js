$persistentStore.write('your_server_ip1', ['any_key1']);
$persistentStore.write('your_server_ip2', ['any_key1']);
if ($domain.includes('your_server_url1')) {
	$done({address: $persistentStore.read(['any_key1']), ttl: 86400});
}
else if ($domain.includes('your_server_url2')) {
	$done({address: $persistentStore.read(['any_key2']), ttl: 86400});
};
