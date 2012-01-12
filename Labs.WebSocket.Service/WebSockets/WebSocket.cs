using System;
using Alchemy;
using System.Net;

namespace Labs.WebSocket.Service.WebSockets
{
    public class WebSocket
    {
        private WebSocketServer _server;

        public void Start(WebSocketHandler handler)
        {
            _server =   new WebSocketServer(81, IPAddress.Any)
                        {
                            OnReceive = new OnEventDelegate(handler.OnReceive),
                            OnSend = new OnEventDelegate(handler.OnSend),
                            OnConnect = new OnEventDelegate(handler.OnConnect),
                            OnConnected = new OnEventDelegate(handler.OnConnected),
                            OnDisconnect = new OnEventDelegate(handler.OnDisconnect),
                            TimeOut = new TimeSpan(0, 5, 0)
                        };

            Console.WriteLine("Starting Server");

            _server.Start();
        }

        public void Stop()
        {
            _server.Stop();
        }
    }
}
