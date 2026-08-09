import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import CreateUrlForm from "../../components/urls/CreateUrlForm.jsx";

const UrlsPage = () => {
  const handleCreateSuccess = (url) => {
    console.log("Created URL:", url);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">My URLs</h1>

        <p className="mt-1 text-muted-foreground">
          Create and manage your shortened URLs.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Create Short URL</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="max-w-2xl">
            <CreateUrlForm onSuccess={handleCreateSuccess} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UrlsPage;
