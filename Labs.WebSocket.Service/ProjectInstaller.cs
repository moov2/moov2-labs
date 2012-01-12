using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel;
using System.Configuration.Install;
using System.Linq;
using System.ServiceProcess;


namespace Labs.WebSocket.Service
{
    [RunInstaller(true)]
    public partial class ProjectInstaller : System.Configuration.Install.Installer
    {
        public ProjectInstaller()
        {
            InitializeComponent();

            webSocketDemoServiceInstaller.Description = "This service will start a web socket server.";
            webSocketDemoServiceInstaller.DisplayName = "Labs.WebSocket.Service";
            webSocketDemoServiceInstaller.ServiceName = "Labs.WebSocket.Service";
            webSocketDemoServiceInstaller.StartType = ServiceStartMode.Manual;
        }
    }
}
