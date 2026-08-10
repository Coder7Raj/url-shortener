import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import EditUrlForm from "./EditUrlForm.jsx";

const EditUrlDialog = ({ url, open, onOpenChange, onSubmit }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Short URL</DialogTitle>

          <DialogDescription>
            Update the destination, alias, metadata, expiration, or status of
            your shortened URL.
          </DialogDescription>
        </DialogHeader>

        <EditUrlForm
          url={url}
          onSuccess={onSubmit}
          onCancel={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
};

export default EditUrlDialog;
