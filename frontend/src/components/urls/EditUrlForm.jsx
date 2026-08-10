import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const EditUrlForm = ({ url, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    originalUrl: "",
    customAlias: "",
    title: "",
    description: "",
    expiresAt: "",
    status: "ACTIVE",
  });

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!url) return;

    setFormData({
      originalUrl: url.originalUrl || "",
      customAlias: url.shortCode || "",
      title: url.title || "",
      description: url.description || "",
      expiresAt: url.expiresAt
        ? new Date(url.expiresAt).toISOString().slice(0, 16)
        : "",
      status: url.status || "ACTIVE",
    });
  }, [url]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    if (!formData.originalUrl.trim()) {
      setError("Original URL is required.");
      return;
    }

    if (formData.expiresAt) {
      const expirationDate = new Date(formData.expiresAt);

      if (expirationDate <= new Date()) {
        setError("Expiration date must be in the future.");
        return;
      }
    }

    setIsSubmitting(true);

    try {
      const payload = {
        originalUrl: formData.originalUrl.trim(),
        customAlias: formData.customAlias.trim() || undefined,
        title: formData.title.trim() || undefined,
        description: formData.description.trim() || undefined,
        expiresAt: formData.expiresAt
          ? new Date(formData.expiresAt).toISOString()
          : undefined,
        status: formData.status,
      };

      await onSuccess(payload);
    } catch (err) {
      setError(
        err?.response?.data?.message || err?.message || "Failed to update URL.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!url) {
    return null;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Original URL */}

      <div className="space-y-2">
        <Label htmlFor="originalUrl">Original URL</Label>

        <Input
          id="originalUrl"
          name="originalUrl"
          type="url"
          value={formData.originalUrl}
          onChange={handleChange}
          placeholder="https://example.com/your-long-url"
          disabled={isSubmitting}
        />
      </div>

      {/* Custom Alias */}

      <div className="space-y-2">
        <Label htmlFor="customAlias">Custom Alias</Label>

        <Input
          id="customAlias"
          name="customAlias"
          value={formData.customAlias}
          onChange={handleChange}
          placeholder="my-link"
          disabled={isSubmitting}
        />

        <p className="text-xs text-muted-foreground">
          3–20 characters. Letters, numbers, hyphens, and underscores only.
        </p>
      </div>

      {/* Title */}

      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>

        <Input
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="My important link"
          disabled={isSubmitting}
        />
      </div>

      {/* Description */}

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>

        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Describe this URL..."
          rows={4}
          disabled={isSubmitting}
        />
      </div>

      {/* Expiration */}

      <div className="space-y-2">
        <Label htmlFor="expiresAt">Expiration</Label>

        <Input
          id="expiresAt"
          name="expiresAt"
          type="datetime-local"
          value={formData.expiresAt}
          onChange={handleChange}
          disabled={isSubmitting}
        />

        <p className="text-xs text-muted-foreground">
          Leave empty if this URL should never expire.
        </p>
      </div>

      {/* Status */}

      <div className="space-y-2">
        <Label htmlFor="status">Status</Label>

        <Select
          value={formData.status}
          onValueChange={(value) =>
            setFormData((prev) => ({
              ...prev,
              status: value,
            }))
          }
          disabled={isSubmitting}
        >
          <SelectTrigger id="status">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="ACTIVE">Active</SelectItem>
            <SelectItem value="INACTIVE">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Error */}

      {error && (
        <div className="rounded-md border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {/* Actions */}

      <div className="flex justify-end gap-3 border-t pt-5">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancel
        </Button>

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}

          {isSubmitting ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </form>
  );
};

export default EditUrlForm;
