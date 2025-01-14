import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Product } from "@/types/product";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { MyLexicalEditor } from "@/components/ui/lexical-editor";
import { EditorState } from "lexical";

interface ProductFormProps {
  initialData?: Product | null;
}

export function ProductForm({ initialData }: ProductFormProps) {
  const [imageUrl, setImageUrl] = useState<string>("");
  const { register, handleSubmit, reset, setValue, watch } = useForm({
    defaultValues: {
      name: "",
      sku: "",
      description: "",
      price: "",
      salePrice: "",
      tax: "",
      stock: "",
      category: "",
      gender: [] as string[],
      published: false,
      taxIncluded: false
    }
  });

  useEffect(() => {
    if (initialData) {
      reset({
        name: initialData.name,
        sku: initialData.sku,
        description: initialData.description,
        price: initialData.price.toString(),
        stock: initialData.stock.toString(),
        category: initialData.category,
        published: initialData.status === "Published",
      });
      setImageUrl(initialData.image || "");
    }
  }, [initialData, reset]);

  const onSubmit = (data: Record<string, string | number | boolean | string[]>) => {
    console.log("Form data:", {
      ...data,
      image: imageUrl
    });
    toast.success(initialData ? "Product updated successfully" : "Product created successfully");
  };

  const handleImageDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      // Mock image upload
      setImageUrl("/lovable-uploads/mock-image.png");
    }
  };

  const handleImageClick = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files[0];
      if (file) {
        // Mock image upload
        setImageUrl("/lovable-uploads/mock-image.png");
      }
    };
    input.click();
  };

  const handleEditorChange = (editorState: EditorState) => {
    editorState.read(() => {
      const jsonString = JSON.stringify(editorState.toJSON());
      setValue("description", jsonString);
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Details</h3>
        <p className="text-sm text-muted-foreground">Title, short description, image...</p>
        
        <div className="space-y-2">
          <Label htmlFor="name">Product name</Label>
          <Input id="name" {...register("name")} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <MyLexicalEditor
            onChange={handleEditorChange}
            initialValue={watch("description")}
            className="bg-background"
          />
        </div>

        <div className="space-y-2">
          <Label>Images</Label>
          <div
            className="border-2 border-dashed rounded-lg p-12 text-center cursor-pointer hover:border-primary/50 transition-colors"
            onDrop={handleImageDrop}
            onDragOver={(e) => e.preventDefault()}
            onClick={handleImageClick}
          >
            {imageUrl ? (
              <img src={imageUrl} alt="Product" className="max-h-48 mx-auto" />
            ) : (
              <div className="space-y-4">
                <div className="mx-auto w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <div className="text-sm text-muted-foreground">
                  <p>Drop or select file</p>
                  <p className="text-xs">Drop files here or click to browse through your machine</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Properties</h3>
        <p className="text-sm text-muted-foreground">Additional features and attributes...</p>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="sku">Product Code</Label>
            <Input id="sku" {...register("sku")} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select onValueChange={(value) => setValue("category", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="t-shirts">T-Shirts</SelectItem>
                <SelectItem value="shoes">Shoes</SelectItem>
                <SelectItem value="accessories">Accessories</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Gender</Label>
          <div className="flex gap-4">
            <div className="flex items-center space-x-2">
              <Checkbox id="men" onCheckedChange={(checked) => {
                const current = watch("gender") as string[];
                if (checked) {
                  setValue("gender", [...current, "men"]);
                } else {
                  setValue("gender", current.filter(g => g !== "men"));
                }
              }} />
              <label htmlFor="men" className="text-sm">Men</label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="women" onCheckedChange={(checked) => {
                const current = watch("gender") as string[];
                if (checked) {
                  setValue("gender", [...current, "women"]);
                } else {
                  setValue("gender", current.filter(g => g !== "women"));
                }
              }} />
              <label htmlFor="women" className="text-sm">Women</label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="kids" onCheckedChange={(checked) => {
                const current = watch("gender") as string[];
                if (checked) {
                  setValue("gender", [...current, "kids"]);
                } else {
                  setValue("gender", current.filter(g => g !== "kids"));
                }
              }} />
              <label htmlFor="kids" className="text-sm">Kids</label>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Published</Label>
              <div className="text-sm text-muted-foreground">
                Show this product in your store
              </div>
            </div>
            <Switch
              checked={watch("published")}
              onCheckedChange={(checked) => setValue("published", checked)}
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Pricing</h3>
        <p className="text-sm text-muted-foreground">Recommended pricing</p>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Regular price</Label>
              <div className="relative">
                <span className="absolute left-3 top-2.5">$</span>
                <Input id="price" type="number" step="0.01" className="pl-6" {...register("price")} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="salePrice">Sale price</Label>
              <div className="relative">
                <span className="absolute left-3 top-2.5">$</span>
                <Input id="salePrice" type="number" step="0.01" className="pl-6" {...register("salePrice")} />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Price includes taxes</Label>
                <div className="text-sm text-muted-foreground">
                  Tax will be calculated automatically
                </div>
              </div>
              <Switch
                checked={watch("taxIncluded")}
                onCheckedChange={(checked) => setValue("taxIncluded", checked)}
              />
            </div>
            {watch("taxIncluded") && (
              <div className="space-y-2">
                <Label htmlFor="tax">Tax (%)</Label>
                <Input id="tax" type="number" step="0.01" {...register("tax")} />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <Button type="submit" className="px-8">
          {initialData ? "Update product" : "Create product"}
        </Button>
      </div>
    </form>
  );
}
