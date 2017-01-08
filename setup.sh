#Run as root

#Make sure to bring the wireless interface down first eg 'ifconfig wlan1 down'

#See that we are currently using the official driver 'wl'
#http://askubuntu.com/questions/155528/why-cant-i-set-monitor-mode-with-the-wl-sta-driver-on-a-broadcom-wireless-card
lshw -C network

#Install non-official drivers
sudo apt-get install b43-fwcutter firmware-b43-installer

#Remove 'wl' driver from kernel
rmmod wl

#Load the non-official driver instead
modprobe b43

#Verify that the non-official driver is loaded
lshw -C network

#Find out what the interface name is
ifconfig

#Bring the interface down
ifconfig wlp2s0b1 down

#Configure for monitor mode
iwconfig wlp2s0b1 mode monitor

#Bring the interface up
ifconfig wlp2s0b1 down

#Install necessary stuff to run the scapy script
sudo apt-get install tcpdump
sudo apt-get install scapy

#Start scanning the interface for probe requests
python wifiscan.py wlp2s0b1

##Note: when an error 'node_pcap 802.11 link-layer types supported only on 802.11' shows --> means the adapter is not in monitor mode
##Note: NetworkManager keeps changing the card back to managed mode, stop NetworkManager, change to monitor mode, start NetworkManager
## /etc/init.d/network-manager start/stop

#Installing node_pcap:
#sudo apt-get install libpcap-dev
#npm install https://github.com/mranney/node_pcap.git
