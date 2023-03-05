# DNS Proxy Synth
Fun experiment to see if I can sonify DNS requests

## Get things running
1. Clone repo and install deps with `yarn install`
2. Start the server with `sudo yarn start`. Since the UDP proxy needs to run on port 53, this requires sudo.
3. Configure your DNS server to point to your local IP, or if you are running this somewhere other than on your local machine, to the IP of wherever you're running it. 
4. Open the client (where you can hear some sounds) at http://localhost:1312
5. Make some DNS requests!

If you skip step 3, you can also manually make requests with `nslookup`

```bash
$ nslookup <address> <dns proxy address>

# example
$ nslookup google.com 192.168.0.132
```