-- Fix RLS policies for consultation_submissions
-- Drop the overly permissive policy and create proper ones
DROP POLICY IF EXISTS "Allow all operations on consultation_submissions" ON public.consultation_submissions;

-- Public can INSERT (submit consultation requests)
CREATE POLICY "Anyone can submit consultation requests"
ON public.consultation_submissions
FOR INSERT
WITH CHECK (true);

-- Only admins can SELECT (view submissions)
CREATE POLICY "Admins can view consultation submissions"
ON public.consultation_submissions
FOR SELECT
USING (is_admin_user());

-- Only admins can UPDATE
CREATE POLICY "Admins can update consultation submissions"
ON public.consultation_submissions
FOR UPDATE
USING (is_admin_user());

-- Only admins can DELETE
CREATE POLICY "Admins can delete consultation submissions"
ON public.consultation_submissions
FOR DELETE
USING (is_admin_user());

-- Fix RLS policies for job_applications
-- Drop the overly permissive policy and create proper ones
DROP POLICY IF EXISTS "Allow all operations on job_applications" ON public.job_applications;

-- Public can INSERT (submit job applications)
CREATE POLICY "Anyone can submit job applications"
ON public.job_applications
FOR INSERT
WITH CHECK (true);

-- Only admins can SELECT (view applications)
CREATE POLICY "Admins can view job applications"
ON public.job_applications
FOR SELECT
USING (is_admin_user());

-- Only admins can UPDATE
CREATE POLICY "Admins can update job applications"
ON public.job_applications
FOR UPDATE
USING (is_admin_user());

-- Only admins can DELETE
CREATE POLICY "Admins can delete job applications"
ON public.job_applications
FOR DELETE
USING (is_admin_user());

-- Fix RLS policies for test_messages
-- Drop the overly permissive policy
DROP POLICY IF EXISTS "Allow all operations for testing" ON public.test_messages;

-- Only admins can access test_messages
CREATE POLICY "Admins can manage test messages"
ON public.test_messages
FOR ALL
USING (is_admin_user())
WITH CHECK (is_admin_user());