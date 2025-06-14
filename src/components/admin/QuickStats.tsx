
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  Image, 
  Users, 
  Mail, 
  TrendingUp, 
  Search,
  Activity,
  Globe
} from "lucide-react";
import { getContactSubmissions, getConsultationSubmissions } from "@/services/adminService";

interface StatsData {
  totalPages: number;
  totalPosts: number;
  totalMedia: number;
  totalUsers: number;
  totalSubmissions: number;
  monthlyVisitors: string;
  seoScore: string;
  lastBackup: string;
}

const QuickStats: React.FC = () => {
  const [stats, setStats] = useState<StatsData>({
    totalPages: 12,
    totalPosts: 8,
    totalMedia: 45,
    totalUsers: 3,
    totalSubmissions: 0,
    monthlyVisitors: "2.4K",
    seoScore: "85%",
    lastBackup: "Never"
  });

  const [recentActivity] = useState([
    { action: "New blog post published", time: "2 hours ago", type: "content" },
    { action: "SEO meta tags updated", time: "4 hours ago", type: "seo" },
    { action: "Contact form submission", time: "6 hours ago", type: "form" },
    { action: "Media files uploaded", time: "1 day ago", type: "media" }
  ]);

  useEffect(() => {
    const loadSubmissions = async () => {
      try {
        const [contacts, consultations] = await Promise.all([
          getContactSubmissions(),
          getConsultationSubmissions()
        ]);
        
        setStats(prev => ({
          ...prev,
          totalSubmissions: (contacts?.length || 0) + (consultations?.length || 0)
        }));
      } catch (error) {
        console.error('Error loading submissions:', error);
      }
    };

    loadSubmissions();
  }, []);

  const statCards = [
    {
      title: "Website Pages",
      value: stats.totalPages,
      description: "Active pages",
      icon: FileText,
      color: "text-blue-600"
    },
    {
      title: "Blog Posts",
      value: stats.totalPosts,
      description: "Published posts",
      icon: FileText,
      color: "text-green-600"
    },
    {
      title: "Media Files",
      value: stats.totalMedia,
      description: "Images & documents",
      icon: Image,
      color: "text-purple-600"
    },
    {
      title: "Admin Users",
      value: stats.totalUsers,
      description: "Active users",
      icon: Users,
      color: "text-orange-600"
    },
    {
      title: "Form Submissions",
      value: stats.totalSubmissions,
      description: "Total inquiries",
      icon: Mail,
      color: "text-red-600"
    },
    {
      title: "Monthly Visitors",
      value: stats.monthlyVisitors,
      description: "Unique visitors",
      icon: TrendingUp,
      color: "text-indigo-600"
    },
    {
      title: "SEO Score",
      value: stats.seoScore,
      description: "Overall rating",
      icon: Search,
      color: "text-cyan-600"
    },
    {
      title: "Last Backup",
      value: stats.lastBackup,
      description: "System backup",
      icon: Globe,
      color: "text-gray-600"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {statCards.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks to get you started</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Button variant="outline" className="h-16 flex flex-col gap-1">
              <FileText className="h-5 w-5" />
              <span className="text-xs">New Page</span>
            </Button>
            <Button variant="outline" className="h-16 flex flex-col gap-1">
              <FileText className="h-5 w-5" />
              <span className="text-xs">New Post</span>
            </Button>
            <Button variant="outline" className="h-16 flex flex-col gap-1">
              <Image className="h-5 w-5" />
              <span className="text-xs">Upload Media</span>
            </Button>
            <Button variant="outline" className="h-16 flex flex-col gap-1">
              <Search className="h-5 w-5" />
              <span className="text-xs">SEO Check</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Recent Activity
          </CardTitle>
          <CardDescription>Latest changes to your website</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium">{activity.action}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  activity.type === 'content' ? 'bg-blue-100 text-blue-800' :
                  activity.type === 'seo' ? 'bg-green-100 text-green-800' :
                  activity.type === 'form' ? 'bg-orange-100 text-orange-800' :
                  'bg-purple-100 text-purple-800'
                }`}>
                  {activity.type}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuickStats;
