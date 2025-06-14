import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { 
  Code, 
  Plus, 
  Trash2, 
  Eye,
  EyeOff,
  Save
} from "lucide-react";
import { toast } from "sonner";

interface Script {
  id: string;
  name: string;
  type: 'javascript' | 'css' | 'html';
  location: 'head' | 'body' | 'footer';
  content: string;
  enabled: boolean;
}

const ScriptManager: React.FC = () => {
  const [scripts, setScripts] = useState<Script[]>([
    {
      id: '1',
      name: 'Google Tag Manager',
      type: 'javascript',
      location: 'head',
      content: `<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-XXXXXXX');</script>
<!-- End Google Tag Manager -->`,
      enabled: false
    },
    {
      id: '2',
      name: 'WhatsApp Chat Widget',
      type: 'javascript',
      location: 'footer',
      content: `<!-- WhatsApp Chat Widget -->
<script>
  window.addEventListener('load', function() {
    var whatsappWidget = document.createElement('div');
    whatsappWidget.innerHTML = '<a href="https://wa.me/1234567890" target="_blank" style="position:fixed;bottom:20px;right:20px;background:#25d366;color:white;border-radius:50px;padding:15px;text-decoration:none;z-index:1000;">💬 Chat</a>';
    document.body.appendChild(whatsappWidget);
  });
</script>`,
      enabled: true
    }
  ]);

  const [newScript, setNewScript] = useState({
    name: '',
    type: 'javascript' as const,
    location: 'head' as const,
    content: '',
    enabled: true
  });

  const handleSaveScript = () => {
    if (!newScript.name || !newScript.content) {
      toast.error("Please fill in all required fields");
      return;
    }

    const script: Script = {
      id: Date.now().toString(),
      ...newScript
    };

    setScripts(prev => [...prev, script]);
    setNewScript({
      name: '',
      type: 'javascript',
      location: 'head',
      content: '',
      enabled: true
    });
    
    toast.success("Script added successfully!");
  };

  const handleToggleScript = (id: string) => {
    setScripts(prev => prev.map(script => 
      script.id === id ? { ...script, enabled: !script.enabled } : script
    ));
    toast.success("Script status updated!");
  };

  const handleDeleteScript = (id: string) => {
    setScripts(prev => prev.filter(script => script.id !== id));
    toast.success("Script deleted!");
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'javascript': return 'bg-yellow-100 text-yellow-800';
      case 'css': return 'bg-blue-100 text-blue-800';
      case 'html': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getLocationColor = (location: string) => {
    switch (location) {
      case 'head': return 'bg-purple-100 text-purple-800';
      case 'body': return 'bg-orange-100 text-orange-800';
      case 'footer': return 'bg-cyan-100 text-cyan-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Script Manager</h2>
        <p className="text-gray-600">Manage custom JavaScript, CSS, and HTML snippets</p>
      </div>

      {/* Add New Script */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Add New Script
          </CardTitle>
          <CardDescription>Inject custom code into your website</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="scriptName">Script Name</Label>
              <Input
                id="scriptName"
                value={newScript.name}
                onChange={(e) => setNewScript(prev => ({ ...prev, name: e.target.value }))}
                placeholder="e.g., Google Analytics"
              />
            </div>
            <div>
              <Label htmlFor="scriptType">Type</Label>
              <select
                id="scriptType"
                value={newScript.type}
                onChange={(e) => setNewScript(prev => ({ ...prev, type: e.target.value as any }))}
                className="w-full p-2 border rounded-md"
              >
                <option value="javascript">JavaScript</option>
                <option value="css">CSS</option>
                <option value="html">HTML</option>
              </select>
            </div>
            <div>
              <Label htmlFor="scriptLocation">Location</Label>
              <select
                id="scriptLocation"
                value={newScript.location}
                onChange={(e) => setNewScript(prev => ({ ...prev, location: e.target.value as any }))}
                className="w-full p-2 border rounded-md"
              >
                <option value="head">Head</option>
                <option value="body">Body</option>
                <option value="footer">Footer</option>
              </select>
            </div>
          </div>
          <div>
            <Label htmlFor="scriptContent">Script Content</Label>
            <Textarea
              id="scriptContent"
              value={newScript.content}
              onChange={(e) => setNewScript(prev => ({ ...prev, content: e.target.value }))}
              placeholder="Paste your script code here..."
              className="min-h-[200px] font-mono text-sm"
            />
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Switch
                checked={newScript.enabled}
                onCheckedChange={(checked) => setNewScript(prev => ({ ...prev, enabled: checked }))}
              />
              <Label>Enable script</Label>
            </div>
            <Button onClick={handleSaveScript}>
              <Save className="h-4 w-4 mr-2" />
              Save Script
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Existing Scripts */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Installed Scripts</h3>
        {scripts.map((script) => (
          <Card key={script.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Code className="h-5 w-5" />
                    {script.name}
                  </CardTitle>
                  <div className="flex gap-2 mt-2">
                    <Badge className={`text-xs ${getTypeColor(script.type)}`}>
                      {script.type}
                    </Badge>
                    <Badge className={`text-xs ${getLocationColor(script.location)}`}>
                      {script.location}
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleToggleScript(script.id)}
                  >
                    {script.enabled ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteScript(script.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 p-3 rounded-md">
                <pre className="text-xs text-gray-700 whitespace-pre-wrap overflow-x-auto">
                  {script.content.length > 200 
                    ? `${script.content.substring(0, 200)}...` 
                    : script.content
                  }
                </pre>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <span className={`text-sm ${script.enabled ? 'text-green-600' : 'text-gray-500'}`}>
                  {script.enabled ? 'Active' : 'Disabled'}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ScriptManager;
