
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Trash2, Wifi, WifiOff, Database, Clock } from 'lucide-react';

interface TestMessage {
  id: string;
  message: string;
  created_at: string;
}

const SupabaseTest: React.FC = () => {
  const [messages, setMessages] = useState<TestMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('Checking...');

  // Test database connection
  const testConnection = async () => {
    try {
      const { data, error } = await supabase.from('test_messages').select('count');
      if (error) {
        setConnectionStatus('Connection failed');
        setIsConnected(false);
        console.error('Connection test failed:', error);
      } else {
        setConnectionStatus('Connected');
        setIsConnected(true);
        console.log('Connection test successful');
      }
    } catch (error) {
      setConnectionStatus('Connection error');
      setIsConnected(false);
      console.error('Connection error:', error);
    }
  };

  // Load existing messages
  const loadMessages = async () => {
    try {
      const { data, error } = await supabase
        .from('test_messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error loading messages:', error);
        toast.error('Failed to load messages');
      } else {
        setMessages(data || []);
        console.log('Messages loaded:', data?.length || 0);
      }
    } catch (error) {
      console.error('Error in loadMessages:', error);
      toast.error('Error loading messages');
    }
  };

  // Add a new test message
  const addMessage = async () => {
    if (!newMessage.trim()) {
      toast.error('Please enter a message');
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('test_messages')
        .insert([{ message: newMessage.trim() }])
        .select();

      if (error) {
        console.error('Error adding message:', error);
        toast.error('Failed to add message');
      } else {
        console.log('Message added:', data);
        toast.success('Message added successfully!');
        setNewMessage('');
      }
    } catch (error) {
      console.error('Error in addMessage:', error);
      toast.error('Error adding message');
    } finally {
      setIsLoading(false);
    }
  };

  // Clear all test messages
  const clearMessages = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('test_messages')
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all

      if (error) {
        console.error('Error clearing messages:', error);
        toast.error('Failed to clear messages');
      } else {
        console.log('All messages cleared');
        toast.success('All messages cleared!');
      }
    } catch (error) {
      console.error('Error in clearMessages:', error);
      toast.error('Error clearing messages');
    } finally {
      setIsLoading(false);
    }
  };

  // Set up real-time subscription
  useEffect(() => {
    testConnection();
    loadMessages();

    // Set up real-time subscription
    console.log('Setting up real-time subscription...');
    const channel = supabase
      .channel('test_messages_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'test_messages'
        },
        (payload) => {
          console.log('Real-time update received:', payload);
          
          if (payload.eventType === 'INSERT') {
            const newMessage = payload.new as TestMessage;
            setMessages(prev => [newMessage, ...prev]);
            toast.success('New message received via real-time!');
          } else if (payload.eventType === 'DELETE') {
            const deletedId = payload.old.id;
            setMessages(prev => prev.filter(msg => msg.id !== deletedId));
            if (payload.old.message) {
              toast.info('Message deleted via real-time');
            }
          } else if (payload.eventType === 'UPDATE') {
            const updatedMessage = payload.new as TestMessage;
            setMessages(prev => prev.map(msg => 
              msg.id === updatedMessage.id ? updatedMessage : msg
            ));
            toast.info('Message updated via real-time');
          }
        }
      )
      .subscribe((status) => {
        console.log('Subscription status:', status);
        if (status === 'SUBSCRIBED') {
          toast.success('Real-time connection established!');
        } else if (status === 'CHANNEL_ERROR') {
          toast.error('Real-time connection failed');
        }
      });

    // Cleanup subscription on unmount
    return () => {
      console.log('Cleaning up real-time subscription...');
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Supabase Connection Test
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Connection Status */}
          <div className="flex items-center gap-2 p-3 rounded-lg bg-gray-50">
            {isConnected ? (
              <Wifi className="h-5 w-5 text-green-500" />
            ) : (
              <WifiOff className="h-5 w-5 text-red-500" />
            )}
            <span className={`font-medium ${isConnected ? 'text-green-700' : 'text-red-700'}`}>
              Status: {connectionStatus}
            </span>
          </div>

          {/* Add Message Form */}
          <div className="flex gap-2">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Enter a test message..."
              onKeyPress={(e) => e.key === 'Enter' && addMessage()}
              disabled={isLoading}
            />
            <Button 
              onClick={addMessage} 
              disabled={isLoading || !isConnected}
            >
              {isLoading ? 'Adding...' : 'Add'}
            </Button>
          </div>

          {/* Clear Messages Button */}
          <Button 
            variant="destructive" 
            onClick={clearMessages}
            disabled={isLoading || messages.length === 0}
            className="w-full"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Clear All Messages
          </Button>
        </CardContent>
      </Card>

      {/* Messages Display */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Test Messages ({messages.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {messages.length === 0 ? (
            <p className="text-gray-500 text-center py-4">
              No messages yet. Add a message above to test the database connection.
            </p>
          ) : (
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {messages.map((msg) => (
                <div key={msg.id} className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-gray-900">{msg.message}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(msg.created_at).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Test Instructions */}
      <Card>
        <CardHeader>
          <CardTitle>How to Test</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-gray-600">
          <p>• <strong>Database Connection:</strong> Check the status indicator above</p>
          <p>• <strong>Data Writing:</strong> Add a message using the input field</p>
          <p>• <strong>Data Reading:</strong> Messages appear in the list below</p>
          <p>• <strong>Real-time Updates:</strong> Open this page in multiple tabs and add messages - they should appear instantly in all tabs</p>
          <p>• <strong>Clean Up:</strong> Use "Clear All Messages" to remove test data</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SupabaseTest;
