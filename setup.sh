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
ifconfig wlp2s0b1 mode monitor

#Bring the interface up
ifconfig wlp2s0b1 down

#Install necessary stuff to run the scapy script
sudo apt-get install tcpdump
sudo apt-get install scapy

#Start scanning the interface for probe requests
python wifiscan.py wlp2s0b1
