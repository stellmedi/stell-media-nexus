
-- Create a simple test table for verifying Supabase connection
CREATE TABLE public.test_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security (but make it permissive for testing)
ALTER TABLE public.test_messages ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows anyone to read and write (for testing purposes)
CREATE POLICY "Allow all operations for testing" 
  ON public.test_messages 
  FOR ALL 
  USING (true) 
  WITH CHECK (true);

-- Enable real-time updates for this table
ALTER TABLE public.test_messages REPLICA IDENTITY FULL;

-- Add the table to the realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE public.test_messages;
