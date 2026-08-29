import socket,base64,os,json,struct,urllib.request,time
class WS:
    def __init__(self,url):
        u=url.split("://",1)[1]; host,path=u.split("/",1)
        h,p=host.split(":"); self.s=socket.create_connection((h,int(p)))
        k=base64.b64encode(os.urandom(16)).decode()
        self.s.sendall(("GET /%s HTTP/1.1\r\nHost:%s\r\nUpgrade:websocket\r\nConnection:Upgrade\r\n"
                        "Sec-WebSocket-Key:%s\r\nSec-WebSocket-Version:13\r\n\r\n"%(path,host,k)).encode())
        buf=b""
        while b"\r\n\r\n" not in buf: buf+=self.s.recv(4096)
        self.buf=buf.split(b"\r\n\r\n",1)[1]; self.i=0
    def send(self,obj):
        d=json.dumps(obj).encode(); m=os.urandom(4)
        n=len(d)
        if n<126: hdr=struct.pack("!BB",0x81,0x80|n)
        elif n<65536: hdr=struct.pack("!BBH",0x81,0x80|126,n)
        else: hdr=struct.pack("!BBQ",0x81,0x80|127,n)
        self.s.sendall(hdr+m+bytes(b^m[i%4] for i,b in enumerate(d)))
    def _read(self,n):
        while len(self.buf)<n: self.buf+=self.s.recv(65536)
        r,self.buf=self.buf[:n],self.buf[n:]; return r
    def recv(self):
        b1,b2=self._read(2); n=b2&127
        if n==126: n=struct.unpack("!H",self._read(2))[0]
        elif n==127: n=struct.unpack("!Q",self._read(8))[0]
        return json.loads(self._read(n))
    def call(self,method,params=None):
        self.i+=1; mid=self.i
        self.send({"id":mid,"method":method,"params":params or {}})
        while True:
            m=self.recv()
            if m.get("id")==mid: return m
def connect(port=9222):
    for _ in range(60):
        try:
            t=json.load(urllib.request.urlopen("http://127.0.0.1:%d/json"%port))
            pg=[x for x in t if x["type"]=="page"]
            if pg: return WS(pg[0]["webSocketDebuggerUrl"])
        except Exception: pass
        time.sleep(0.25)
    raise SystemExit("no cdp")
