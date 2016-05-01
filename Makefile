HOST=localhost
PORT=8080
PHPBIN=$(shell which php)

server:
	$(PHPBIN) -S $(HOST):$(PORT) -t public
