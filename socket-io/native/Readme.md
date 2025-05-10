# Socket io 

$\rightarrow$ Data $\rightarrow$ Packet 

 Packet
   - Application Layer at very top (HTTP / SMTP / SSH / FTP)
   - Transport Layer (UDP /TCP)
   - Network Layer (IP)
   - Link Layer such as wifi or ethernet
   - Physical Layer such as cable

TCP / UDP
 -Transport layer create 2^16 ports

## UDP
 - light weight
 - 8 bytes
 - connection less
 - consistency (send data no matter what!!)
  - Packet loss?
  - Packets out of order.
##  TCP
 - Connection based
 - Reliable
 - Delivery acknowledgment
 - Retransmission
 - In order pocket
 - Congestion control 


 - WebSocket lets you connect to a server socket via TCP rather than http.
 - Everything running on machine called process and assigned to a port through which data can flow.


| OSI Layer $\downarrow$    $\uparrow$|
|-------------------------------------|
| Application  $\downarrow$ $\uparrow$|
| Transport    $\downarrow$ $\uparrow$|
| Network      $\downarrow$ $\uparrow$|
| Link         $\downarrow$ $\uparrow$|
| Physical     $\downarrow$ $\uparrow$|
