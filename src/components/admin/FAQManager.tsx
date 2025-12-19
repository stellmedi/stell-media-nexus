import React, { useState } from 'react';
import { useAllFaqItems, FaqItem } from '@/hooks/useAllFaqItems';
import { useFaqMutations, FaqItemInput } from '@/hooks/useFaqMutations';
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
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Plus, Edit, Trash2, Eye, EyeOff, Loader2, ArrowUp, ArrowDown } from 'lucide-react';

const PAGE_PATHS = [
  { value: '/', label: 'Home Page' },
  { value: '/services/seo', label: 'SEO Services' },
  { value: '/services/sem', label: 'SEM Services' },
  { value: '/services/lead-generation', label: 'Lead Generation' },
  { value: '/real-estate', label: 'Real Estate' },
  { value: '/e-commerce', label: 'E-Commerce' },
  { value: '/about', label: 'About' },
  { value: '/contact', label: 'Contact' },
];

const emptyFaq: FaqItemInput = {
  question: '',
  answer: '',
  page_path: '/',
  display_order: 0,
  is_active: true,
};

export default function FAQManager() {
  const { data: faqs, isLoading, error } = useAllFaqItems();
  const { createFaq, updateFaq, deleteFaq, toggleActive, reorderFaqs } = useFaqMutations();
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState<FaqItem | null>(null);
  const [formData, setFormData] = useState<FaqItemInput>(emptyFaq);
  const [filterPath, setFilterPath] = useState<string>('all');

  const handleOpenCreate = () => {
    setEditingFaq(null);
    setFormData({
      ...emptyFaq,
      page_path: filterPath !== 'all' ? filterPath : '/',
      display_order: filteredFaqs.length,
    });
    setIsDialogOpen(true);
  };

  const handleOpenEdit = (faq: FaqItem) => {
    setEditingFaq(faq);
    setFormData({
      question: faq.question,
      answer: faq.answer,
      page_path: faq.page_path,
      display_order: faq.display_order || 0,
      is_active: faq.is_active !== false,
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingFaq) {
      await updateFaq.mutateAsync({ id: editingFaq.id, ...formData });
    } else {
      await createFaq.mutateAsync(formData);
    }
    
    setIsDialogOpen(false);
    setFormData(emptyFaq);
    setEditingFaq(null);
  };

  const handleDelete = async (id: string) => {
    await deleteFaq.mutateAsync(id);
  };

  const handleToggleActive = async (faq: FaqItem) => {
    await toggleActive.mutateAsync({ id: faq.id, is_active: !faq.is_active });
  };

  const handleMoveUp = async (faq: FaqItem, index: number) => {
    if (index === 0) return;
    
    const currentPageFaqs = filteredFaqs.filter(f => f.page_path === faq.page_path);
    const currentIndex = currentPageFaqs.findIndex(f => f.id === faq.id);
    if (currentIndex <= 0) return;

    const updates = [
      { id: faq.id, display_order: (currentPageFaqs[currentIndex - 1].display_order || 0) },
      { id: currentPageFaqs[currentIndex - 1].id, display_order: faq.display_order || 0 },
    ];
    await reorderFaqs.mutateAsync(updates);
  };

  const handleMoveDown = async (faq: FaqItem, index: number) => {
    const currentPageFaqs = filteredFaqs.filter(f => f.page_path === faq.page_path);
    const currentIndex = currentPageFaqs.findIndex(f => f.id === faq.id);
    if (currentIndex >= currentPageFaqs.length - 1) return;

    const updates = [
      { id: faq.id, display_order: (currentPageFaqs[currentIndex + 1].display_order || 0) },
      { id: currentPageFaqs[currentIndex + 1].id, display_order: faq.display_order || 0 },
    ];
    await reorderFaqs.mutateAsync(updates);
  };

  const filteredFaqs = faqs?.filter(faq => 
    filterPath === 'all' || faq.page_path === filterPath
  ) || [];

  // Group FAQs by page path
  const groupedFaqs = filteredFaqs.reduce((acc, faq) => {
    const path = faq.page_path;
    if (!acc[path]) acc[path] = [];
    acc[path].push(faq);
    return acc;
  }, {} as Record<string, FaqItem[]>);

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
          Failed to load FAQ items. Please try again.
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>FAQ Management</CardTitle>
          <CardDescription>Manage frequently asked questions by page</CardDescription>
        </div>
        <div className="flex gap-2">
          <Select value={filterPath} onValueChange={setFilterPath}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by page" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Pages</SelectItem>
              {PAGE_PATHS.map(path => (
                <SelectItem key={path.value} value={path.value}>{path.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={handleOpenCreate}>
                <Plus className="h-4 w-4 mr-2" />
                New FAQ
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-xl">
              <DialogHeader>
                <DialogTitle>{editingFaq ? 'Edit FAQ' : 'Create New FAQ'}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="page_path">Page</Label>
                  <Select 
                    value={formData.page_path} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, page_path: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select page" />
                    </SelectTrigger>
                    <SelectContent>
                      {PAGE_PATHS.map(path => (
                        <SelectItem key={path.value} value={path.value}>{path.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="question">Question</Label>
                  <Input
                    id="question"
                    value={formData.question}
                    onChange={(e) => setFormData(prev => ({ ...prev, question: e.target.value }))}
                    placeholder="What is the question?"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="answer">Answer</Label>
                  <Textarea
                    id="answer"
                    value={formData.answer}
                    onChange={(e) => setFormData(prev => ({ ...prev, answer: e.target.value }))}
                    placeholder="Provide the answer..."
                    rows={4}
                    required
                  />
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
                    disabled={createFaq.isPending || updateFaq.isPending}
                  >
                    {(createFaq.isPending || updateFaq.isPending) && (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    )}
                    {editingFaq ? 'Update' : 'Create'}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        {Object.keys(groupedFaqs).length > 0 ? (
          <div className="space-y-6">
            {Object.entries(groupedFaqs).map(([path, pageFaqs]) => {
              const pageLabel = PAGE_PATHS.find(p => p.value === path)?.label || path;
              return (
                <div key={path} className="border rounded-lg p-4">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    {pageLabel}
                    <Badge variant="outline">{pageFaqs.length}</Badge>
                  </h3>
                  <Accordion type="single" collapsible className="space-y-2">
                    {pageFaqs.map((faq, index) => (
                      <AccordionItem key={faq.id} value={faq.id} className="border rounded-md px-3">
                        <div className="flex items-center gap-2">
                          <AccordionTrigger className="flex-1 text-left py-3">
                            <div className="flex items-center gap-2">
                              {!faq.is_active && (
                                <Badge variant="secondary" className="text-xs">Hidden</Badge>
                              )}
                              <span className="text-sm">{faq.question}</span>
                            </div>
                          </AccordionTrigger>
                          <div className="flex items-center gap-1 shrink-0">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => handleMoveUp(faq, index)}
                              disabled={index === 0 || reorderFaqs.isPending}
                            >
                              <ArrowUp className="h-3 w-3" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => handleMoveDown(faq, index)}
                              disabled={index === pageFaqs.length - 1 || reorderFaqs.isPending}
                            >
                              <ArrowDown className="h-3 w-3" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => handleToggleActive(faq)}
                              disabled={toggleActive.isPending}
                            >
                              {faq.is_active ? (
                                <EyeOff className="h-3 w-3" />
                              ) : (
                                <Eye className="h-3 w-3" />
                              )}
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => handleOpenEdit(faq)}
                            >
                              <Edit className="h-3 w-3" />
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <Trash2 className="h-3 w-3 text-destructive" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Delete FAQ</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to delete this FAQ item? This action cannot be undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => handleDelete(faq.id)}
                                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                  >
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </div>
                        <AccordionContent className="pb-3 text-sm text-muted-foreground">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            No FAQ items yet. Click "New FAQ" to create one.
          </div>
        )}
      </CardContent>
    </Card>
  );
}
