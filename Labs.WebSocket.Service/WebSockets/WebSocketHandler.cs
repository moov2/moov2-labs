using System;
using Alchemy.Classes;
using System.Collections.Generic;

namespace Labs.WebSocket.Service.WebSockets
{
    public abstract class WebSocketHandler
    {
        public virtual void OnConnect(UserContext context)
        {
            Console.WriteLine("OnConnect");
        }

        public virtual void OnConnected(UserContext context)
        {

        }

        public virtual void OnDisconnect(UserContext context)
        {

        }

        public virtual void OnReceive(UserContext context)
        {

        }

        public virtual void OnSend(UserContext context)
        {

        }
    }
}
