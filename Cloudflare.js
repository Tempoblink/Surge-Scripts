var data = [
				'162.159.208.4', 
				'162.159.209.4', 
				'162.159.210.4', 
				'162.159.211.4', 
				'104.23.240.1',
				'104.16.160.1',
				'162.159.211.3'
			];
if ($domain.includes("example.com")) {
	$done({addresses: data, ttl: 600});
}
else {
	$done({});
}
