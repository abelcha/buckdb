#!/usr/bin/fish

set modules ""
for pkg in hostfs httpserver
     set --append modules "INSTALL $pkg FROM community; LOAD $pkg; "
end

set fullcmd "$modules SELECT httpserve_start('0.0.0.0', 9998, '');"
while true 
	echo $fullcmd
	echo $fullcmd | DUCKDB_HTTPSERVER_FOREGROUND=1 duckdb
end

