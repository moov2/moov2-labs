using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Diagnostics;
using System.Linq;
using System.ServiceProcess;
using System.Text;
using Labs.WebSocket.Service.WebSockets;
using Labs.WebSocket.Service.DemoApp;

namespace Labs.WebSocket.Service
{
    public partial class WebSocketService : ServiceBase
    {
        private Labs.WebSocket.Service.WebSockets.WebSocket _webSocket;

        public WebSocketService()
        {
            InitializeComponent();
        }

        protected override void OnStart(string[] args)
        {
            _webSocket = new Labs.WebSocket.Service.WebSockets.WebSocket();
            _webSocket.Start(new DemoWebSocketHandler());
        }

        protected override void OnStop()
        {
            _webSocket.Stop();
        }
    }
}
