
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Trash2, Plus, ExternalLink } from "lucide-react";
import { toast } from "sonner";

interface Redirect {
  id: string;
  from: string;
  to: string;
  type: '301' | '302';
  created: string;
  active: boolean;
}

export default function RedirectManager() {
  const [redirects, setRedirects] = useState<Redirect[]>([]);
  const [newRedirect, setNewRedirect] = useState({
    from: '',
    to: '',
    type: '301' as '301' | '302'
  });

  useEffect(() => {
    loadRedirects();
  }, []);

  const loadRedirects = () => {
    try {
      const saved = localStorage.getItem('stellmedia_redirects');
      if (saved) {
        setRedirects(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Error loading redirects:', error);
    }
  };

  const saveRedirects = (newRedirects: Redirect[]) => {
    try {
      localStorage.setItem('stellmedia_redirects', JSON.stringify(newRedirects));
      setRedirects(newRedirects);
      
      // Dispatch event for other components
      window.dispatchEvent(new CustomEvent('redirectsUpdated', {
        detail: { redirects: newRedirects }
      }));
    } catch (error) {
      console.error('Error saving redirects:', error);
      toast.error('Failed to save redirects');
    }
  };

  const addRedirect = () => {
    if (!newRedirect.from || !newRedirect.to) {
      toast.error('Please fill in both FROM and TO URLs');
      return;
    }

    if (redirects.some(r => r.from === newRedirect.from)) {
      toast.error('A redirect for this URL already exists');
      return;
    }

    const redirect: Redirect = {
      id: Date.now().toString(),
      from: newRedirect.from,
      to: newRedirect.to,
      type: newRedirect.type,
      created: new Date().toISOString(),
      active: true
    };

    const updated = [...redirects, redirect];
    saveRedirects(updated);
    setNewRedirect({ from: '', to: '', type: '301' });
    toast.success('Redirect added successfully');
  };

  const deleteRedirect = (id: string) => {
    if (!confirm('Are you sure you want to delete this redirect?')) return;
    
    const updated = redirects.filter(r => r.id !== id);
    saveRedirects(updated);
    toast.success('Redirect deleted');
  };

  const toggleRedirect = (id: string) => {
    const updated = redirects.map(r => 
      r.id === id ? { ...r, active: !r.active } : r
    );
    saveRedirects(updated);
    toast.success('Redirect status updated');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Redirect Management</CardTitle>
        <CardDescription>
          Manage 301 and 302 redirects for your website
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Add New Redirect */}
          <div className="border rounded-lg p-4">
            <h3 className="font-medium mb-4">Add New Redirect</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Input
                placeholder="From URL (e.g., /old-page)"
                value={newRedirect.from}
                onChange={(e) => setNewRedirect(prev => ({ ...prev, from: e.target.value }))}
              />
              <Input
                placeholder="To URL (e.g., /new-page)"
                value={newRedirect.to}
                onChange={(e) => setNewRedirect(prev => ({ ...prev, to: e.target.value }))}
              />
              <Select value={newRedirect.type} onValueChange={(value: '301' | '302') => 
                setNewRedirect(prev => ({ ...prev, type: value }))
              }>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="301">301 Permanent</SelectItem>
                  <SelectItem value="302">302 Temporary</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={addRedirect}>
                <Plus className="h-4 w-4 mr-2" />
                Add Redirect
              </Button>
            </div>
          </div>

          {/* Redirects List */}
          <div className="space-y-3">
            {redirects.length === 0 ? (
              <p className="text-center text-gray-500 py-8">No redirects configured</p>
            ) : (
              redirects.map((redirect) => (
                <div key={redirect.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <code className="bg-gray-100 px-2 py-1 rounded text-sm">{redirect.from}</code>
                      <span>→</span>
                      <code className="bg-gray-100 px-2 py-1 rounded text-sm">{redirect.to}</code>
                      <Badge variant={redirect.type === '301' ? 'default' : 'secondary'}>
                        {redirect.type}
                      </Badge>
                      <Badge variant={redirect.active ? 'default' : 'secondary'}>
                        {redirect.active ? 'Active' : 'Inactive'}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-500">
                      Created: {new Date(redirect.created).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleRedirect(redirect.id)}
                    >
                      {redirect.active ? 'Deactivate' : 'Activate'}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(redirect.to, '_blank')}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => deleteRedirect(redirect.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
