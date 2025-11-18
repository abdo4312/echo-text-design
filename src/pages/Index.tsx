import Home from "./Home";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-background">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="flex flex-col md:flex-row gap-8">
          <aside className="md:w-48 flex-shrink-0">
            {/* Navigation will be added here */}
          </aside>
          <main className="flex-1 flex items-center justify-center pb-20 md:pb-0">
            <Home />
          </main>
        </div>
      </div>
    </div>
  );
};

export default Index;
