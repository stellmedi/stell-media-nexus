import React, { useState } from 'react';
import { useAllServices, Service } from '@/hooks/useAllServices';
import { useServicesMutations, ServiceInput } from '@/hooks/useServicesMutations';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Edit, Trash2, Eye, EyeOff, Loader2, ArrowUp, ArrowDown, Search, Target, ShoppingCart, Building2, TrendingUp, BarChart3, Users, Globe, Zap, Shield, Heart, Star, type LucideIcon } from 'lucide-react';

const ICON_OPTIONS = [
  { value: 'Search', label: 'Search', icon: Search },
  { value: 'Target', label: 'Target', icon: Target },
  { value: 'ShoppingCart', label: 'Shopping Cart', icon: ShoppingCart },
  { value: 'Building2', label: 'Building', icon: Building2 },
  { value: 'TrendingUp', label: 'Trending Up', icon: TrendingUp },
  { value: 'BarChart3', label: 'Bar Chart', icon: BarChart3 },
  { value: 'Users', label: 'Users', icon: Users },
  { value: 'Globe', label: 'Globe', icon: Globe },
  { value: 'Zap', label: 'Zap', icon: Zap },
  { value: 'Shield', label: 'Shield', icon: Shield },
  { value: 'Heart', label: 'Heart', icon: Heart },
  { value: 'Star', label: 'Star', icon: Star },
];

const COLOR_OPTIONS = [
  { value: 'blue', label: 'Blue' },
  { value: 'purple', label: 'Purple' },
  { value: 'green', label: 'Green' },
  { value: 'orange', label: 'Orange' },
  { value: 'indigo', label: 'Indigo' },
  { value: 'teal', label: 'Teal' },
  { value: 'cyan', label: 'Cyan' },
  { value: 'pink', label: 'Pink' },
  { value: 'red', label: 'Red' },
  { value: 'emerald', label: 'Emerald' },
];

const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
};

const emptyService: ServiceInput = {
  title: '',
  slug: '',
  description: '',
  icon_name: 'Search',
  link: '',
  gradient_from: 'blue-500',
  gradient_to: 'blue-600',
  border_color: 'border-blue-200 hover:border-blue-400',
  display_order: 0,
  is_active: true,
};

export default function ServicesManager() {
  const { data: services, isLoading, error } = useAllServices();
  const { createService, updateService, deleteService, toggleActive, reorderServices } = useServicesMutations();
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [formData, setFormData] = useState<ServiceInput>(emptyService);
  const [selectedColor, setSelectedColor] = useState('blue');

  const handleOpenCreate = () => {
    setEditingService(null);
    setFormData({
      ...emptyService,
      display_order: services?.length || 0,
    });
    setSelectedColor('blue');
    setIsDialogOpen(true);
  };

  const handleOpenEdit = (service: Service) => {
    setEditingService(service);
    
    // Extract color from gradient_from (e.g., "blue-500" -> "blue")
    const color = service.gradient_from?.split('-')[0] || 'blue';
    setSelectedColor(color);
    
    setFormData({
      title: service.title,
      slug: service.slug,
      description: service.description,
      icon_name: service.icon_name || 'Search',
      link: service.link || '',
      gradient_from: service.gradient_from || 'blue-500',
      gradient_to: service.gradient_to || 'blue-600',
      border_color: service.border_color || 'border-blue-200 hover:border-blue-400',
      display_order: service.display_order || 0,
      is_active: service.is_active !== false,
    });
    setIsDialogOpen(true);
  };

  const handleTitleChange = (title: string) => {
    setFormData(prev => ({
      ...prev,
      title,
      slug: editingService ? prev.slug : generateSlug(title),
    }));
  };

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
    setFormData(prev => ({
      ...prev,
      gradient_from: `${color}-500`,
      gradient_to: `${color}-600`,
      border_color: `border-${color}-200 hover:border-${color}-400`,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingService) {
      await updateService.mutateAsync({ id: editingService.id, ...formData });
    } else {
      await createService.mutateAsync(formData);
    }
    
    setIsDialogOpen(false);
    setFormData(emptyService);
    setEditingService(null);
  };

  const handleDelete = async (id: string) => {
    await deleteService.mutateAsync(id);
  };

  const handleToggleActive = async (service: Service) => {
    await toggleActive.mutateAsync({ id: service.id, is_active: !service.is_active });
  };

  const handleMoveUp = async (service: Service, index: number) => {
    if (index === 0 || !services) return;
    
    const updates = [
      { id: service.id, display_order: services[index - 1].display_order || 0 },
      { id: services[index - 1].id, display_order: service.display_order || 0 },
    ];
    await reorderServices.mutateAsync(updates);
  };

  const handleMoveDown = async (service: Service, index: number) => {
    if (!services || index >= services.length - 1) return;
    
    const updates = [
      { id: service.id, display_order: services[index + 1].display_order || 0 },
      { id: services[index + 1].id, display_order: service.display_order || 0 },
    ];
    await reorderServices.mutateAsync(updates);
  };

  const getIconComponent = (iconName: string | null): LucideIcon => {
    const found = ICON_OPTIONS.find(opt => opt.value === iconName);
    return found?.icon || Search;
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="py-12 text-center text-destructive">
          Failed to load services. Please try again.
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Services Management</CardTitle>
          <CardDescription>Manage your service offerings</CardDescription>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleOpenCreate}>
              <Plus className="h-4 w-4 mr-2" />
              New Service
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-xl">
            <DialogHeader>
              <DialogTitle>{editingService ? 'Edit Service' : 'Create New Service'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="Service title"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="slug">Slug</Label>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                    placeholder="service-url-slug"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Service description..."
                  rows={3}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="link">Link (optional)</Label>
                <Input
                  id="link"
                  value={formData.link}
                  onChange={(e) => setFormData(prev => ({ ...prev, link: e.target.value }))}
                  placeholder="/services/my-service"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Icon</Label>
                  <Select 
                    value={formData.icon_name || 'Search'} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, icon_name: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select icon" />
                    </SelectTrigger>
                    <SelectContent>
                      {ICON_OPTIONS.map(option => {
                        const IconComponent = option.icon;
                        return (
                          <SelectItem key={option.value} value={option.value}>
                            <div className="flex items-center gap-2">
                              <IconComponent className="h-4 w-4" />
                              <span>{option.label}</span>
                            </div>
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Color Theme</Label>
                  <Select value={selectedColor} onValueChange={handleColorChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select color" />
                    </SelectTrigger>
                    <SelectContent>
                      {COLOR_OPTIONS.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          <div className="flex items-center gap-2">
                            <div 
                              className={`h-4 w-4 rounded-full bg-${option.value}-500`} 
                              style={{ backgroundColor: `var(--${option.value}-500, ${option.value})` }}
                            />
                            <span>{option.label}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="display_order">Display Order</Label>
                  <Input
                    id="display_order"
                    type="number"
                    value={formData.display_order}
                    onChange={(e) => setFormData(prev => ({ ...prev, display_order: parseInt(e.target.value) || 0 }))}
                    min={0}
                  />
                </div>
                <div className="flex items-end pb-2">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="is_active"
                      checked={formData.is_active}
                      onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_active: checked }))}
                    />
                    <Label htmlFor="is_active">Active</Label>
                  </div>
                </div>
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  disabled={createService.isPending || updateService.isPending}
                >
                  {(createService.isPending || updateService.isPending) && (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  )}
                  {editingService ? 'Update' : 'Create'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        {services && services.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">Order</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Icon</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {services.map((service, index) => {
                const IconComponent = getIconComponent(service.icon_name);
                return (
                  <TableRow key={service.id}>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => handleMoveUp(service, index)}
                          disabled={index === 0 || reorderServices.isPending}
                        >
                          <ArrowUp className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => handleMoveDown(service, index)}
                          disabled={index === services.length - 1 || reorderServices.isPending}
                        >
                          <ArrowDown className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{service.title}</div>
                        <div className="text-sm text-muted-foreground truncate max-w-xs">
                          {service.description}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className={`inline-flex items-center justify-center h-8 w-8 rounded-lg bg-gradient-to-r from-${service.gradient_from || 'blue-500'} to-${service.gradient_to || 'blue-600'}`}>
                        <IconComponent className="h-4 w-4 text-white" />
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={service.is_active ? 'default' : 'secondary'}>
                        {service.is_active ? 'Active' : 'Hidden'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleToggleActive(service)}
                          disabled={toggleActive.isPending}
                          title={service.is_active ? 'Hide' : 'Show'}
                        >
                          {service.is_active ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleOpenEdit(service)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Service</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete "{service.title}"? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(service.id)}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            No services yet. Click "New Service" to create one.
          </div>
        )}
      </CardContent>
    </Card>
  );
}
