import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import useUrls from "../../hooks/useUrls.js";

import { createUrlSchema } from "../../validations/url.schema.js";

import { cleanUrlPayload } from "../../utils/url.utils.js";

const CreateUrlForm = ({ onSuccess }) => {
  const { createUrl, isCreating, error, clearError } = useUrls();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createUrlSchema),

    defaultValues: {
      originalUrl: "",
      customAlias: "",
      expiresAt: "",
    },
  });

  const onSubmit = async (values) => {
    clearError();

    const payload = cleanUrlPayload(values);

    /*
     * HTML datetime-local produces:     *
     *  1. 2026-08-10T19:30     *
     *  2. Zod datetime requires a valid
     *  3. datetime format.
     */
    if (payload.expiresAt) {
      payload.expiresAt = new Date(payload.expiresAt).toISOString();
    }

    const result = await createUrl(payload);

    if (result.success) {
      reset();

      onSuccess?.(result.data);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Original URL */}
      <div className="space-y-2">
        <Label htmlFor="originalUrl">Original URL</Label>

        <Input
          id="originalUrl"
          type="url"
          placeholder="https://example.com"
          disabled={isCreating}
          {...register("originalUrl", {
            onChange: () => clearError(),
          })}
        />

        {errors.originalUrl && (
          <p className="text-sm text-destructive">
            {errors.originalUrl.message}
          </p>
        )}
      </div>

      {/* Custom Alias */}
      <div className="space-y-2">
        <Label htmlFor="customAlias">
          Custom Alias
          <span className="ml-1 text-muted-foreground">(optional)</span>
        </Label>

        <Input
          id="customAlias"
          type="text"
          placeholder="my-link"
          disabled={isCreating}
          {...register("customAlias", {
            onChange: () => clearError(),
          })}
        />

        <p className="text-xs text-muted-foreground">
          3–20 characters. Letters, numbers, underscores and hyphens only.
        </p>

        {errors.customAlias && (
          <p className="text-sm text-destructive">
            {errors.customAlias.message}
          </p>
        )}
      </div>

      {/* Expiration */}
      <div className="space-y-2">
        <Label htmlFor="expiresAt">
          Expiration
          <span className="ml-1 text-muted-foreground">(optional)</span>
        </Label>

        <Input
          id="expiresAt"
          type="datetime-local"
          disabled={isCreating}
          {...register("expiresAt", {
            onChange: () => clearError(),
          })}
        />

        {errors.expiresAt && (
          <p className="text-sm text-destructive">{errors.expiresAt.message}</p>
        )}
      </div>

      {/* Server error */}
      {error && (
        <div className="rounded-md bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {/* Submit */}
      <Button type="submit" className="w-full" disabled={isCreating}>
        {isCreating ? "Creating..." : "Create Short URL"}
      </Button>
    </form>
  );
};

export default CreateUrlForm;
