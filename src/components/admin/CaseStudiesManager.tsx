import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Plus, Pencil, Trash2, Eye, EyeOff, GripVertical, X } from "lucide-react";
import { useAllCaseStudies, type CaseStudy } from "@/hooks/useCaseStudies";
import { useCaseStudiesMutations } from "@/hooks/useCaseStudiesMutations";
import { Skeleton } from "@/components/ui/skeleton";

type FormTestimonial = { quote: string; author: string; role: string; company: string };

const emptyCaseStudy = {
  slug: "",
  title: "",
  description: "",
  category: "",
  image: "",
  client: "",
  results: [] as Array<{ metric: string; label: string }>,
  challenge: "",
  solution: "",
  implementation: [] as string[],
  testimonial: { quote: "", author: "", role: "", company: "" } as FormTestimonial,
  is_published: false,
  display_order: 0,
};

export default function CaseStudiesManager() {
  const { data: caseStudies, isLoading } = useAllCaseStudies();
  const { createCaseStudy, updateCaseStudy, deleteCaseStudy, togglePublish } = useCaseStudiesMutations();
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingStudy, setEditingStudy] = useState<CaseStudy | null>(null);
  const [formData, setFormData] = useState(emptyCaseStudy);
  const [newResult, setNewResult] = useState({ metric: "", label: "" });
  const [newImplementation, setNewImplementation] = useState("");

  const handleOpenDialog = (study?: CaseStudy) => {
    if (study) {
      setEditingStudy(study);
      setFormData({
        slug: study.slug,
        title: study.title,
        description: study.description,
        category: study.category || "",
        image: study.image || "",
        client: study.client || "",
        results: study.results || [],
        challenge: study.challenge || "",
        solution: study.solution || "",
        implementation: study.implementation || [],
        testimonial: { 
          quote: study.testimonial?.quote || "", 
          author: study.testimonial?.author || "", 
          role: study.testimonial?.role || "", 
          company: study.testimonial?.company || "" 
        },
        is_published: study.is_published,
        display_order: study.display_order,
      });
    } else {
      setEditingStudy(null);
      setFormData({
        ...emptyCaseStudy,
        display_order: (caseStudies?.length || 0) + 1,
      });
    }
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingStudy(null);
    setFormData(emptyCaseStudy);
    setNewResult({ metric: "", label: "" });
    setNewImplementation("");
  };

  const handleSubmit = async () => {
    if (editingStudy) {
      await updateCaseStudy.mutateAsync({ id: editingStudy.id, ...formData });
    } else {
      await createCaseStudy.mutateAsync(formData);
    }
    handleCloseDialog();
  };

  const handleAddResult = () => {
    if (newResult.metric && newResult.label) {
      setFormData({
        ...formData,
        results: [...formData.results, newResult],
      });
      setNewResult({ metric: "", label: "" });
    }
  };

  const handleRemoveResult = (index: number) => {
    setFormData({
      ...formData,
      results: formData.results.filter((_, i) => i !== index),
    });
  };

  const handleAddImplementation = () => {
    if (newImplementation.trim()) {
      setFormData({
        ...formData,
        implementation: [...formData.implementation, newImplementation.trim()],
      });
      setNewImplementation("");
    }
  };

  const handleRemoveImplementation = (index: number) => {
    setFormData({
      ...formData,
      implementation: formData.implementation.filter((_, i) => i !== index),
    });
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-6 w-1/3" />
              <Skeleton className="h-4 w-1/2" />
            </CardHeader>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Case Studies</h2>
          <p className="text-muted-foreground">Manage your case studies and success stories</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => handleOpenDialog()}>
              <Plus className="mr-2 h-4 w-4" /> Add Case Study
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingStudy ? "Edit Case Study" : "Create Case Study"}</DialogTitle>
              <DialogDescription>
                Fill in the details for your case study
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-6 py-4">
              {/* Basic Info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Case study title"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="slug">Slug *</Label>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
                    placeholder="url-friendly-slug"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="e.g., Real Estate, E-Commerce"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="client">Client</Label>
                  <Input
                    id="client"
                    value={formData.client}
                    onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                    placeholder="Client name"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Brief description of the case study"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">Image URL</Label>
                <Input
                  id="image"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://..."
                />
              </div>

              {/* Results */}
              <div className="space-y-3">
                <Label>Key Results</Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Metric (e.g., 340%)"
                    value={newResult.metric}
                    onChange={(e) => setNewResult({ ...newResult, metric: e.target.value })}
                  />
                  <Input
                    placeholder="Label (e.g., Increase in Leads)"
                    value={newResult.label}
                    onChange={(e) => setNewResult({ ...newResult, label: e.target.value })}
                  />
                  <Button type="button" onClick={handleAddResult} variant="outline">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.results.map((result, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                      {result.metric} - {result.label}
                      <X className="h-3 w-3 cursor-pointer" onClick={() => handleRemoveResult(index)} />
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Challenge & Solution */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="challenge">Challenge</Label>
                  <Textarea
                    id="challenge"
                    value={formData.challenge}
                    onChange={(e) => setFormData({ ...formData, challenge: e.target.value })}
                    placeholder="Describe the client's challenge"
                    rows={4}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="solution">Solution</Label>
                  <Textarea
                    id="solution"
                    value={formData.solution}
                    onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
                    placeholder="Describe the solution provided"
                    rows={4}
                  />
                </div>
              </div>

              {/* Implementation Steps */}
              <div className="space-y-3">
                <Label>Implementation Steps</Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add implementation step"
                    value={newImplementation}
                    onChange={(e) => setNewImplementation(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddImplementation())}
                  />
                  <Button type="button" onClick={handleAddImplementation} variant="outline">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-2">
                  {formData.implementation.map((step, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 bg-muted rounded">
                      <GripVertical className="h-4 w-4 text-muted-foreground" />
                      <span className="flex-1 text-sm">{step}</span>
                      <X className="h-4 w-4 cursor-pointer text-muted-foreground hover:text-destructive" onClick={() => handleRemoveImplementation(index)} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Testimonial */}
              <div className="space-y-3">
                <Label>Testimonial</Label>
                <Textarea
                  placeholder="Client testimonial quote"
                  value={formData.testimonial.quote}
                  onChange={(e) => setFormData({ ...formData, testimonial: { ...formData.testimonial, quote: e.target.value } })}
                  rows={3}
                />
                <div className="grid grid-cols-3 gap-2">
                  <Input
                    placeholder="Author name"
                    value={formData.testimonial.author}
                    onChange={(e) => setFormData({ ...formData, testimonial: { ...formData.testimonial, author: e.target.value } })}
                  />
                  <Input
                    placeholder="Role/Title"
                    value={formData.testimonial.role}
                    onChange={(e) => setFormData({ ...formData, testimonial: { ...formData.testimonial, role: e.target.value } })}
                  />
                  <Input
                    placeholder="Company"
                    value={formData.testimonial.company}
                    onChange={(e) => setFormData({ ...formData, testimonial: { ...formData.testimonial, company: e.target.value } })}
                  />
                </div>
              </div>

              {/* Publish Status */}
              <div className="flex items-center space-x-2">
                <Switch
                  id="published"
                  checked={formData.is_published}
                  onCheckedChange={(checked) => setFormData({ ...formData, is_published: checked })}
                />
                <Label htmlFor="published">Published</Label>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={handleCloseDialog}>Cancel</Button>
              <Button 
                onClick={handleSubmit} 
                disabled={!formData.title || !formData.slug || !formData.description || createCaseStudy.isPending || updateCaseStudy.isPending}
              >
                {editingStudy ? "Update" : "Create"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Case Studies List */}
      <div className="space-y-4">
        {caseStudies && caseStudies.length > 0 ? (
          caseStudies.map((study) => (
            <Card key={study.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-start justify-between space-y-0">
                <div className="flex gap-4">
                  {study.image && (
                    <img 
                      src={study.image} 
                      alt={study.title} 
                      className="w-24 h-16 object-cover rounded"
                    />
                  )}
                  <div>
                    <CardTitle className="text-lg flex items-center gap-2">
                      {study.title}
                      {study.is_published ? (
                        <Badge variant="default" className="bg-green-500">Published</Badge>
                      ) : (
                        <Badge variant="secondary">Draft</Badge>
                      )}
                    </CardTitle>
                    <CardDescription className="mt-1">
                      {study.category && <span className="mr-2">{study.category}</span>}
                      {study.client && <span>• {study.client}</span>}
                    </CardDescription>
                    <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{study.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => togglePublish.mutate({ id: study.id, is_published: !study.is_published })}
                    title={study.is_published ? "Unpublish" : "Publish"}
                  >
                    {study.is_published ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleOpenDialog(study)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="ghost" size="icon" className="text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Case Study</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete "{study.title}"? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => deleteCaseStudy.mutate(study.id)}
                          className="bg-destructive text-destructive-foreground"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardHeader>
            </Card>
          ))
        ) : (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground mb-4">No case studies yet</p>
              <Button onClick={() => handleOpenDialog()}>
                <Plus className="mr-2 h-4 w-4" /> Create your first case study
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
