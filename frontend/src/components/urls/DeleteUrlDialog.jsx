import { Loader2, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const DeleteUrlDialog = ({
  url,
  open,
  onOpenChange,
  onConfirm,
  isDeleting,
}) => {
  if (!url) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Delete Short URL?</DialogTitle>

          <DialogDescription>
            This URL will be removed from your URL list. Your analytics and
            historical data may still remain in the system.
          </DialogDescription>
        </DialogHeader>

        <div className="rounded-lg border bg-muted/40 p-4">
          <p className="truncate font-medium">{url.shortUrl}</p>

          <p className="mt-1 truncate text-sm text-muted-foreground">
            {url.originalUrl}
          </p>
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isDeleting}
          >
            Cancel
          </Button>

          <Button
            type="button"
            variant="destructive"
            onClick={onConfirm}
            disabled={isDeleting}
          >
            {isDeleting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}

            {!isDeleting && <Trash2 className="mr-2 h-4 w-4" />}

            {isDeleting ? "Deleting..." : "Delete URL"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteUrlDialog;
