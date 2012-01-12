using System;
using System.Collections.Generic;
using System.Linq;
using System.ServiceProcess;
using System.Text;
using System.Runtime.InteropServices;
using Labs.WebSocket.Service.WebSockets;
using Labs.WebSocket.Service.DemoApp;

namespace Labs.WebSocket.Service
{
    static class Program
    {
        [DllImport("kernel32.dll")]
        public static extern Boolean AllocConsole();

        /// <summary>
        /// The main entry point for the application.
        /// </summary>
        static void Main(string[] args)
        {
            if (args.Length > 0 && args[0].ToLower() == "/console")
            {
                AllocConsole();
 
                var webSocket = new Labs.WebSocket.Service.WebSockets.WebSocket();
                webSocket.Start(new DemoWebSocketHandler());
 
                string input = string.Empty;
 
                // Wait for the user to exit the application
                while (input.ToLower() != "exit") input = Console.ReadLine();
 
                // Stop the application.
                webSocket.Stop();
            }
            else
            {
                ServiceBase[] ServicesToRun;
                ServicesToRun = new ServiceBase[] { new WebSocketService() };
                ServiceBase.Run(ServicesToRun);
            }
        }
    }
}
