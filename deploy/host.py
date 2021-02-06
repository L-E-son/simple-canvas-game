#Use to create local host
import http.server
import socketserver

PORT = 8000
DIRECTORY = "../src/"

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

Handler.extensions_map.update({
       ".js": "application/javascript",
})

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print("serving at port", PORT)
    httpd.serve_forever()